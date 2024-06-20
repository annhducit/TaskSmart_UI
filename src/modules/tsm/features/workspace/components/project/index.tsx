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
import { tsmAxios } from '@/configs/axios';
import PopoverX from '@/shared/components/popover';

const Project = () => {
  const projectId = '6673f675a96d32783bd68d9c';
  const [project, setProject] = useState<Project>({
    id: '',
    name: '',
    description: '',
    background: '',
    inviteCode: '',
    listCards: [],
    users: [],
  } as Project);

  const [visible, setVisible] = useCollapse<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setVisible(open);
  };

  const [columns, setColumns] = useState<ListCard[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [listCardCreationName, setListCardCreationName] = useState('');

  const [tasks, setTasks] = useState<Card[]>([]);

  const [activeColumn, setActiveColumn] = useState<ListCard | null>(null);

  const [activeTask, setActiveTask] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const createListCard = async () => {
    const fetchProject = async () => {
      try {
        const res = await tsmAxios.post(`/projects/${projectId}`, { name: listCardCreationName });
        setProject((prev) => {
          return { ...prev, listCards: [...prev.listCards, res.data] };
        });
        setListCardCreationName('');
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
    setVisible(false);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await tsmAxios.get(`/projects/${projectId}`);
        setProject(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, []);

  useEffect(() => {
    const listCardIterator: Card[] = [];
    project.listCards.forEach((listCard) => {
      listCard.cards.forEach((card) => {
        listCardIterator.push({ ...card, listCardId: listCard.id });
      });
    });
    setColumns(project.listCards);
    setTasks(listCardIterator);
  }, [project]);

  const updateListCard = async (listCard: ListCard) => {
    const updateListCard = async () => {
      try {
        const res = await tsmAxios.put(`/projects/${projectId}/${listCard.id}`, listCard);
        const columnUpdated: ListCard = res.data;
        setColumns((prev) => {
          return prev.map((col) => {
            if (col.id === columnUpdated.id) {
              return columnUpdated;
            }
            return col;
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    updateListCard();
  };

  const deleteListCard = async (listCardId: String) => {
    const deleteListCardAsync = async () => {
      try {
        await tsmAxios.delete(`/projects/${projectId}/${listCardId}`);
        setColumns((prev) => {
          return prev.filter((col) => col.id !== listCardId);
        });
      } catch (error) {
        console.log(error);
      }
    };
    deleteListCardAsync();
  };

  const createCard = async (columnId: String, card: Card) => {
    const createCardAsync = async () => {
      try {
        const res = await tsmAxios.post(`/projects/${projectId}/${columnId}`, card);
        const cardCreated: Card = res.data;
        setColumns((prev) => {
          return prev.map((col) => {
            if (col.id === columnId) {
              return { ...col, cards: [...col.cards, cardCreated] };
            }
            return col;
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    createCardAsync();
  };

  const setColumnsMoved = (columns: ListCard[]) => {
    const moveColumnsAsync = async () => {
      try {
        await tsmAxios.post(`/projects/${projectId}/move/listcard`, {
          ids: columns.map((col) => col.id),
        });
      } catch (error) {
        console.log(error);
      }
    };
    moveColumnsAsync();
    setColumns(columns);
  };

  const setCardsMoved = (cards: Card[]) => {
    const ids = columns.map((col) => ({
      listCardId: col.id,
      cardIds: cards.filter((card) => card.listCardId === col.id).map((card) => card.id),
    }));
    console.log(ids);
    const moveCardsAsync = async () => {
      try {
        await tsmAxios.post(`/projects/${projectId}/move/card`, { ids }).then((res) => {
          console.log(res);
        });
      } catch (error) {
        console.log(error);
      }
    };
    moveCardsAsync();
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
                    className='rounded text-sm font-semibold '
                    value={listCardCreationName}
                    onChange={(e) => setListCardCreationName(e.target.value)}
                    onPressEnter={createListCard}
                  />
                  <div className='ml-auto flex items-center gap-x-2'>
                    <Button
                      onClick={createListCard}
                      type='primary'
                      className='w-20 rounded text-xs font-semibold'
                    >
                      Add list
                    </Button>
                    <Button
                      type='default'
                      className='w-16 rounded text-xs font-semibold'
                      onClick={() => handleOpenChange(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              }
            >
              <Button
                icon={<Plus className='h-4 w-4 opacity-65' />}
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
      <ModifyCard />
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
