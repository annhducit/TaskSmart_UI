import { App, Button, Input, Space } from 'antd';
import { useMemo, useState } from 'react';
import { tsmAxios } from '@/configs/axios';
import useGetProject from '../../project/hooks/query/use-get-project';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import ColumnContainerAI from './column';
import PopoverX from '@/shared/components/popover';
import { createPortal } from 'react-dom';
import TaskCardAI from './card';
import { Plus, Save } from 'lucide-react';
import useCollapse from '@/shared/hooks/use-collapse';
import useApplyGenerate from '../hook/mutation/use-apply-generate';
import blink from '@/assets/images/blink.png';
import LoadingSkeletonHome from '@/shared/components/skeleton/loading-skeleton-task';
import ModalAnnouncement from './modal-announcement';
import { useSelector } from '@/store';
import { toast } from 'sonner';
const TaskGenerate = () => {
  const [taskGenerate, setTaskGenerate] = useState<TasksGenerate>({ listCards: [] });
  const { data: project } = useGetProject();

  const [loading, setLoading] = useState(false);

  const { mutate: applyGenerate, isPending } = useApplyGenerate();

  const [showModal, setShowModal] = useState(false);

  const btnColor = useSelector((state) => state.theme.btnColor);

  const { modal } = App.useApp();

  const generateTask = () => {
    if (!project?.speDocPath) {
      setShowModal(true);
    }

    const generateAsync = async () => {
      try {
        setLoading(true);
        const res = await tsmAxios.get(`/projects/${project?.id}/generate-task`);
        if (res.status >= 200 && res.status < 300) {
          setTaskGenerate(res.data as TasksGenerate);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (typeof error === 'object' && error !== null && 'response' in error) {
          toast.error((error as any).response.data.message || 'An error occurred');
        }
      }
    };
    generateAsync();
  };
  const saveListCardToProject = () => {
    applyGenerate(
      { taskGenerate },
      {
        onSuccess: () => {
          setTaskGenerate({ listCards: [] });
        },
      }
    );
  };

  const handleRejectResult = async () => {
    const confirm = modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to remove the generated tasks?',
      cancelText: 'Cancel',
      okText: 'Remove',
      okType: 'danger',
    });

    confirm.update({
      okButtonProps: {
        onClick: () => {
          setTaskGenerate({ listCards: [] });
          confirm.destroy();
        },
      },
      cancelButtonProps: { disabled: isPending },
    });
  };

  return (
    <>
      <div className='flex flex-col min-h-screen px-6'>
        {taskGenerate.listCards.length > 0 ? (
          <div>
            <div className='flex items-start justify-start gap-x-3'>
              <TaskGenerateHandler taskGenerate={taskGenerate} setTaskGenerate={setTaskGenerate} />
            </div>
          </div>
        ) : (
          <div className='flex items-start gap-x-10'>
            {!loading && (
              <button
                onClick={generateTask}
                className='relative border-none cursor-pointer btn-generate-ai'
              >
                Generate Task
                <span className='absolute left-4 top-3'>
                  <img src={blink} className='w-5 h-5' />
                </span>
              </button>
            )}
            {loading && <LoadingSkeletonHome />}
          </div>
        )}

        {taskGenerate.listCards.length > 0 && (
          <div className='flex items-center justify-end float-right w-full mt-2'>
            <Space>
              <Button
                type='default'
                className='flex items-center text-white rounded'
                icon={<Save className='w-4 h-4' />}
                style={{ backgroundColor: btnColor }}
                loading={isPending}
                onClick={saveListCardToProject}
              >
                Save
              </Button>
              <Button danger onClick={handleRejectResult}>
                Cancel
              </Button>
            </Space>
          </div>
        )}
      </div>
      <ModalAnnouncement
        content='
        You have not uploaded any specification document yet. Please upload the document to generate tasks.'
        project={project}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

const TaskGenerateHandler = ({
  taskGenerate,
  setTaskGenerate,
}: {
  taskGenerate: TasksGenerate;
  setTaskGenerate: React.Dispatch<React.SetStateAction<TasksGenerate>>;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const [activeColumn, setActiveColumn] = useState<ListCardGenerate | null>(null);
  const [activeTask, setActiveTask] = useState<CardGenerate | null>(null);
  const [visible, setVisible] = useCollapse<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setVisible(open);
  };

  const [columns, setColumns] = useState<ListCardGenerate[]>(taskGenerate.listCards);

  const columnsId = useMemo(() => columns.map((col) => col?.id), [columns]);
  const [cards, setCards] = useState<CardGenerate[]>(() => {
    const listCardIterator: CardGenerate[] = [];
    taskGenerate.listCards.forEach((listCard) => {
      listCard?.cards?.forEach((card) => {
        listCardIterator.push({ ...card, listCardId: listCard.id });
      });
    });
    return listCardIterator;
  });

  const [listCard, setListCard] = useState<ListCardGenerate>({
    id: '',
    name: '',
    cards: [],
  });

  const migrateListCard = (cardsChange: CardGenerate[]) => {
    const columnFilterCard = columns.map((col) => ({
      ...col,
      cards: cardsChange.filter((card) => card.listCardId === col.id),
    }));
    setTaskGenerate({ listCards: columnFilterCard });
  };

  const handleAddListCard = () => {
    setColumns((prev) => [...prev, listCard]);

    setTaskGenerate((prev) => ({
      listCards: [...prev.listCards, listCard],
    }));
  };

  const createCard = async (columnId: string, card: CardGenerate) => {
    card.listCardId = columnId;

    setCards((prev) => [...prev, card]);

    migrateListCard([...cards, card]);
  };

  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    migrateListCard(cards.filter((card) => card.id !== id));
  }

  const setColumnsMoved = (columns: ListCardGenerate[]) => {
    setColumns(columns);
    migrateListCard(cards);
  };

  const setCardsMoved = (cardsMoved: CardGenerate[]) => {
    setCards(cardsMoved);
    migrateListCard(cardsMoved);
  };
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className='inline-block px-6'>
        <div className='flex items-start gap-x-3'>
          <SortableContext items={columnsId}>
            {columns.map((col, index) => (
              <ColumnContainerAI
                createCard={createCard}
                key={index}
                column={col}
                cards={cards?.filter((card) => card.listCardId === col.id) || []}
                deleteColumn={(id: string) => {
                  setColumns((prev) => prev.filter((col) => col.id !== id));
                }}
              />
            ))}
          </SortableContext>

          <PopoverX
            visible={visible}
            onOpenChange={handleOpenChange}
            content={
              <div className='flex w-[250px] flex-col gap-4'>
                <Input
                  placeholder='Enter list title'
                  allowClear
                  size='large'
                  className='text-sm font-semibold rounded '
                  value={listCard.name}
                  onChange={(e) => {
                    setListCard((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />
                <div className='flex items-center ml-auto gap-x-2'>
                  <Button
                    onClick={handleAddListCard}
                    type='primary'
                    className='text-xs font-semibold rounded '
                  >
                    Add list
                  </Button>
                  <Button type='default' className='w-16 text-xs font-semibold rounded'>
                    Cancel
                  </Button>
                </div>
              </div>
            }
          >
            <Button
              icon={<Plus className='w-4 h-4 opacity-65' />}
              size='large'
              className='flex w-[275px] items-center rounded-xl border-none bg-[#ffffff3d] text-sm font-semibold text-white'
            >
              Add new list
            </Button>
          </PopoverX>
        </div>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainerAI
              column={activeColumn}
              cards={cards.filter((card) => card.listCardId === activeColumn.id)}
            />
          )}
          {activeTask && <TaskCardAI card={activeTask} deleteTask={
            () => {
              deleteCard(activeTask.id);
              
            }
          } />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (!isActiveAColumn) return;

    const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
    const overColumnIndex = columns.findIndex((col) => col.id === overId);
    const movedColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);

    setColumnsMoved(movedColumns);
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      const activeIndex = cards.findIndex((t) => t.id === activeId);
      const overIndex = cards.findIndex((t) => t.id === overId);

      if (cards[activeIndex].listCardId != cards[overIndex].listCardId) {
        cards[activeIndex].listCardId = cards[overIndex].listCardId;
        setCardsMoved(arrayMove(cards, activeIndex, overIndex - 1));
      }

      setCardsMoved(arrayMove(cards, activeIndex, overIndex));
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      const activeIndex = cards.findIndex((t) => t.id === activeId);

      cards[activeIndex].listCardId = overId.toString();
      setCardsMoved(arrayMove(cards, activeIndex, activeIndex));
    }
  }
};

export default TaskGenerate;
