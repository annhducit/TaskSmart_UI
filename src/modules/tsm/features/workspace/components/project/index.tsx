import { Button, Input } from 'antd';
import ModifyCard from './modify-card/modify-card';
import { Plus } from 'lucide-react';
import useCollapse from '@/shared/hooks/use-collapse';
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

import ColumnContainer from './move-card/column-container';
import { useMemo, useState, useEffect } from 'react';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { TaskCard } from './move-card';
import PopoverX from '@/shared/components/popover';
import useGetProject from './hooks/query/use-get-project';
import useCreateListCard from './hooks/mutation/use-create-listcard';
import useCreateCard from './hooks/mutation/use-create-card';
import useUpdateListCard from './hooks/mutation/use-update-listcard';
import useSetColumnMove from './hooks/action/use-set-column-move';
import useSetCardMove from './hooks/action/use-set-card-move';
import Loading from '@/shared/components/loading';
import useRemoveListCardConfirm from './hooks/action/use-delete-listcard-confirm';

const Project = () => {
  const [visible, setVisible] = useCollapse<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setVisible(open);
  };

  const [listCardCreationName, setListCardCreationName] = useState('');
  const [activeColumn, setActiveColumn] = useState<ListCard | null>(null);
  const [activeTask, setActiveTask] = useState<Card | null>(null);
  const [columns, setColumns] = useState<ListCard[]>([]);
  const [tasks, setTasks] = useState<Card[]>([]);

  /**
   * Tanstack React Query
   */
  const { data: project, isLoading } = useGetProject();

  const { mutate: createListCardMutate } = useCreateListCard();
  const { mutate: updateListCardMutate } = useUpdateListCard();
  const { mutate: createCardMutate } = useCreateCard();
  const { mutate: moveColumn } = useSetColumnMove();
  const { mutate: moveCard } = useSetCardMove();

  const onDelete = useRemoveListCardConfirm();

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    const listCardIterator: Card[] = [];
    project?.listCards.forEach((listCard) => {
      listCard.cards.forEach((card) => {
        listCardIterator.push({ ...card, listCardId: listCard.id });
      });
    });
    project?.listCards && setColumns(project?.listCards);
    setTasks(listCardIterator);
  }, [project]);

  const createListCard = () => {
    createListCardMutate({
      name: listCardCreationName,
    });
    setVisible(false);
  };

  const updateListCard = (listCard: ListCard) => {
    updateListCardMutate(listCard);
  };

  const deleteListCard = (listCardId: String) => {
    onDelete(listCardId as string);
  };

  const createCard = (columnId: string, card: Card) => {
    createCardMutate({
      columnId,
      card,
    });
  };

  const setColumnsMoved = (columns: ListCard[]) => {
    moveColumn(columns);
    setColumns(columns);
  };

  const setCardsMoved = (cards: Card[]) => {
    moveCard({ columns, cards });
    setTasks(cards);
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        {isLoading ? (
          <Loading.Page size='full' />
        ) : (
          <div className='inline-block min-h-screen px-6 '>
            <div className='flex items-start gap-x-3'>
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    cards={tasks.filter((task) => task.listCardId === col.id)}
                    updateColumn={updateListCard}
                    deleteColumn={deleteListCard}
                    createCard={createCard}
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
                      value={listCardCreationName}
                      onChange={(e) => setListCardCreationName(e.target.value)}
                      onPressEnter={() => {
                        createListCard();
                        setListCardCreationName('');
                      }}
                    />
                    <div className='flex items-center ml-auto gap-x-2'>
                      <Button
                        onClick={() => {
                          createListCard();
                          setListCardCreationName('');
                        }}
                        type='primary'
                        className='text-xs font-semibold rounded '
                      >
                        Add list
                      </Button>
                      <Button
                        type='default'
                        className='w-16 text-xs font-semibold rounded'
                        onClick={() => handleOpenChange(false)}
                      >
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
        )}

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                cards={tasks.filter((task) => task.listCardId === activeColumn.id)}
              />
            )}
            {activeTask && <TaskCard card={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      {project?.users && <ModifyCard members={project?.users} />}
    </div>
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
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      if (tasks[activeIndex].listCardId != tasks[overIndex].listCardId) {
        tasks[activeIndex].listCardId = tasks[overIndex].listCardId;
        setCardsMoved(arrayMove(tasks, activeIndex, overIndex - 1));
      }

      setCardsMoved(arrayMove(tasks, activeIndex, overIndex));
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);

      tasks[activeIndex].listCardId = overId.toString();
      setCardsMoved(arrayMove(tasks, activeIndex, activeIndex));
    }
  }
};

export default Project;
