import Logo from '@/shared/components/logo';
import { Avatar, Button, Divider, Input, Popover, Spin, Tabs, Tag, Typography } from 'antd';
import { AudioWaveform, ListChecks, Plus, Search, User } from 'lucide-react';
import CreateProjectBySample from '../../components/create-project-by-sample';
import TemplateItem from '../../components/template-item';
import useGetTemplates from '../../hooks/use-get-templates';
import useGetTemplate from '../../hooks/use-get-template';

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
import Loading from '@/shared/components/loading';
import { useEffect, useMemo, useState } from 'react';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import ColumnContainer from '../../../workspace/components/project/move-card/column-container';
import PopoverX from '@/shared/components/popover';
import useCollapse from '@/shared/hooks/use-collapse';
import { createPortal } from 'react-dom';
import { TaskCard } from '../../../workspace/components/project/move-card';
import ModifyCard from '../../../workspace/components/project/modify-card/modify-card';
import { useSelector } from '@/store';
const TemplateDetail = () => {
  const { data: template, isLoading: isLoadingDT } = useGetTemplate();
  const { data: templates, isLoading } = useGetTemplates();

  const { btnColor } = useSelector((state) => state.theme);
  return (
    <div className='flex flex-col gap-y-4 px-8 pb-20'>
      <div className='flex items-center justify-between'>
        {isLoadingDT ? (
          <Spin />
        ) : (
          <>
            <div className='flex items-center gap-x-6'>
              <div className='rounded bg-white'>
                <Logo type='SINGLE_LOGO' size='w-16 h-16' />
              </div>
              <div className='flex flex-col gap-y-1'>
                <Typography.Text className='text-xl font-semibold'>
                  {template?.name}
                </Typography.Text>

                <Typography.Text className='block text-xs font-normal'>
                  by <span className='font-semibold text-primary-default'>Tasksmart</span> team
                </Typography.Text>
                <Typography.Text className='block text-xs font-normal'>
                  @Double2D Corp
                </Typography.Text>
              </div>{' '}
            </div>
            <Popover trigger='click' placement='leftBottom' content={<CreateProjectBySample />}>
              <Button
                style={{
                  backgroundColor: btnColor,
                  color: 'white',
                }}
                size='large'
                type='primary'
                icon={<AudioWaveform className='flex items-center' size='14' />}
              >
                Use template
              </Button>
            </Popover>
          </>
        )}
      </div>
      <Divider className='my-[1px]' />
      <div className='my-2'>
        <div className='mb-6 flex items-center gap-x-4'>
          <span className='h-7 w-[6px] bg-primary-default'></span>
          <Typography.Text className='block text-lg font-semibold'>
            {' '}
            About this template
          </Typography.Text>
        </div>
        <Typography.Text className='block text-sm font-normal'>
          This template provides a centralized space for every new hire to tackle all the
          job-related logistical items and business requirements to get onboarded.
        </Typography.Text>
        <br />
        <Typography.Text className='block text-sm font-normal'>
          {template?.description}
        </Typography.Text>
      </div>
      <section
        className='relative mx-auto h-[600px] w-[calc(100vw-400px)]  rounded-lg bg-cover bg-center bg-no-repeat'
        style={{
          backgroundPosition: 'center',
          backgroundImage: `url(${template?.image.urls?.full})`,
        }}
      >
        <div className='absolute inset-0 rounded-lg bg-black bg-opacity-40' />
        <div className='flex items-start gap-x-2'>
          <div>
            <Tabs
              tabBarGutter={20}
              className={`custom-tabs-template mb-0 w-[calc(100vw-400px)] text-white`}
              items={[
                {
                  key: 'project',
                  label: 'Project',
                  children: <ProjectContent />,
                },
                {
                  key: 'Kaban',
                  label: 'Kaban',
                  children: <div className='px-6'>Overview</div>,
                },
              ]}
              tabBarExtraContent={{
                left: (
                  <div className='mr-8 flex items-center'>
                    {isLoadingDT ? (
                      <Spin />
                    ) : (
                      <>
                        <p className='mr-4 max-w-48 truncate text-[18px] font-bold'>
                          {template?.name}
                        </p>
                        <Tag color={btnColor}>Template</Tag>
                      </>
                    )}
                  </div>
                ),
              }}
            />
          </div>

          <div className='absolute right-6 top-[10px] flex items-center gap-x-4 rounded-lg'>
            <Button
              size='middle'
              style={{
                color: btnColor,
              }}
              className='flex items-center'
              type='default'
              icon={
                <Search
                  size='14'
                  style={{
                    color: btnColor,
                  }}
                />
              }
            >
              Search
            </Button>
            <Button
              style={{
                backgroundColor: btnColor,
                color: 'white',
              }}
              size='middle'
              className='flex items-center gap-x-2'
              icon={<ListChecks size='14' />}
            >
              Add task
            </Button>
            <Avatar.Group maxCount={2} className='flex items-center'>
              <Avatar style={{ backgroundColor: '#f56a00' }} icon={<User size='12' />} />
              <Avatar style={{ backgroundColor: '#7265e6' }} icon={<User size='12' />} />
              <Avatar style={{ backgroundColor: '#ffbf00' }} icon={<User size='12' />} />
            </Avatar.Group>
          </div>
        </div>
      </section>
      {/* Relative templates */}
      <div className='mb-6 flex items-center gap-x-4'>
        <span className='h-7 w-[6px] bg-primary-default'></span>
        <Typography.Text className='block text-lg font-semibold'>
          {' '}
          Relative templates
        </Typography.Text>
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center'>
          {' '}
          <Spin />
        </div>
      ) : (
        <div className='mx-auto grid grid-cols-3 gap-6'>
          {templates?.map((item, index) => <TemplateItem template={item} key={index} />)}
        </div>
      )}
    </div>
  );
};

export default TemplateDetail;

const ProjectContent = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const [visible, setVisible] = useCollapse<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setVisible(open);
  };

  const [columns, setColumns] = useState<ListCard[]>([]);
  const [tasks, setTasks] = useState<Card[]>([]);
  const [activeColumn, setActiveColumn] = useState<ListCard | null>(null);
  const [activeTask, setActiveTask] = useState<Card | null>(null);

  const { data: template, isLoading } = useGetTemplate();

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  useEffect(() => {
    const listCardIterator: Card[] = [];
    template?.project.listCards.forEach((listCard) => {
      listCard.cards.forEach((card) => {
        listCardIterator.push({ ...card, listCardId: listCard.id });
      });
    });
    template?.project.listCards && setColumns(template?.project.listCards);
    setTasks(listCardIterator);
  }, [template]);

  const setCardsMoved = (cards: Card[]) => {
    setTasks(cards);
  };
  const setColumnsMoved = (columns: ListCard[]) => {
    setColumns(columns);
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
                    />
                    <div className='ml-auto flex items-center gap-x-2'>
                      <Button type='primary' className='rounded text-xs font-semibold '>
                        Add list
                      </Button>
                      <Button type='default' className='w-16 rounded text-xs font-semibold'>
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
      <ModifyCard members={[]} />
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
