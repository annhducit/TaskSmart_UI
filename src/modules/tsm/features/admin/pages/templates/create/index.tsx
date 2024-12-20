import React, { useMemo, useState } from 'react';
import { Avatar, Button, Form, Input, Select, Steps, Tabs, Tooltip, Typography } from 'antd';

import { v4 as uuid } from 'uuid';
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import TaskCard from '../../../components/card';
import useGetCategories from '@/modules/tsm/components/hooks/use-get-categories';
import { ListChecks, Pen, Plus, Search, User } from 'lucide-react';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import useCollapse from '@/shared/hooks/use-collapse';
import PopoverX from '@/shared/components/popover';

import { createPortal } from 'react-dom';

import ColumnContainer from '../../../components/column';
import useCreateTemplate from '../../../hooks/mutation/use-create-template';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/shared/constant/date';
import BackgroundProject from './components/background-project';
import { useSelector } from '@/stores';

const CreateTemplate: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const [form] = Form.useForm();

  const [template, setTemplate] = useState<TSMTemplateRequest>({
    name: '',
    description: '',
    categoryId: '',
    imageUnsplashId: '',
    project: {
      name: 'Project sample',
      background: '',
      description: '',
      listCards: [] as ListCardRequest[],
    },
    createdDate: dayjs().format(DATE_TIME_FORMAT),
  });

  const [background, setBackground] = useState<string>('');

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { data: categories } = useGetCategories();

  const onSubmitStep1 = () => {
    if (current === 0) {
      form.validateFields().then((values) => {
        if (values.name && values.description && values.categoryId) {
          setTemplate((prev) => ({ ...prev, ...values }));

          next();
        } else {
          form.setFields([
            {
              name: 'name',
              errors: ['Name is required'],
            },
            {
              name: 'description',
              errors: ['Description is required'],
            },
            {
              name: 'categoryId',
              errors: ['Category is required'],
            },
          ]);
        }
      });
    } else {
      next();
    }
  };

  const steps = [
    {
      title: 'Overview',
      content: (
        <>
          <Form
            layout='vertical'
            className='my-4 rounded bg-slate-100 p-10'
            form={form}
            onFinish={onSubmitStep1}
          >
            <Form.Item label='Name' name='name'>
              <Input placeholder='Name' allowClear />
            </Form.Item>
            <Form.Item label='Description' name='description'>
              <Input.TextArea rows={4} placeholder='Name' allowClear />
            </Form.Item>
            <Form.Item name='categoryId' label='Category'>
              <Select
                allowClear
                className='w-[150px]'
                placeholder='Select category'
                options={[
                  ...(categories?.map((category) => ({
                    label: category.name,
                    value: category.id,
                  })) || []),
                ]}
              />
            </Form.Item>
          </Form>
        </>
      ),
    },
    {
      title: 'Detail',
      content: (
        <div>
          <div>
            <BackgroundProject setTemplate={setTemplate} setBackgroundImage={setBackground} />
          </div>
          <section
            className='relative mx-auto my-4 h-[650px] w-[calc(100vw-400px)] rounded-lg bg-cover bg-center bg-no-repeat'
            style={{
              backgroundPosition: 'center',
              backgroundImage: `url(${background})`,
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
                      children: <CreateContent template={template} setTemplate={setTemplate} />,
                      className: 'overflow-x-scroll overflow-y-hidden h-[calc(100vh-140px)]',
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
                        <div className='flex max-w-[180px] items-center gap-x-2 truncate'>
                          <Tooltip title='Edit name'>
                            <div
                              className='cursor-pointer p-1 hover:brightness-200'
                              onClick={() => {
                                const input = document.querySelector(
                                  '#input-name'
                                ) as HTMLInputElement;
                                if (input) {
                                  input.focus();
                                }
                              }}
                            >
                              <Pen size='16' color='#fff' className='text-white' />
                            </div>
                          </Tooltip>
                          <input
                            id='input-name'
                            value={template.project?.name}
                            onChange={(e) =>
                              setTemplate((prev) => ({
                                ...prev,
                                project: {
                                  ...prev.project,
                                  name: e.target.value,
                                },
                              }))
                            }
                            className='border-none bg-transparent p-2 text-lg font-semibold text-white outline-none'
                          />
                        </div>
                      </div>
                    ),
                  }}
                />
              </div>

              <div className='absolute right-6 top-[10px] flex items-center gap-x-4 rounded-lg'>
                <Button
                  size='middle'
                  className='flex items-center'
                  type='default'
                  icon={<Search size='14' />}
                >
                  Search
                </Button>
                <Button
                  type='primary'
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
        </div>
      ),
    },
    {
      title: 'Preview',
      content: (
        <section
          className='relative mx-auto my-4 h-[600px] w-[calc(100vw-400px)] rounded-lg bg-cover bg-center bg-no-repeat'
          style={{
            backgroundPosition: 'center',
            backgroundImage: `url(${background})`,
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
                    disabled: true,
                    children: <CreateContent template={template} setTemplate={setTemplate} />,
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
                      <p className='mr-4 max-w-48 truncate text-[18px] font-bold'>
                        {template?.project.name}
                      </p>
                    </div>
                  ),
                }}
              />
            </div>

            <div className='absolute right-6 top-[10px] flex items-center gap-x-4 rounded-lg'>
              <Button
                size='middle'
                className='flex items-center'
                type='default'
                icon={<Search size='14' />}
              >
                Search
              </Button>
              <Button
                type='primary'
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
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const { mutate: createTemplate, isPending: isLoading } = useCreateTemplate();

  const handleCreateTemplate = () => {
    createTemplate(template);
  };
  return (
    <>
      <Typography.Title level={3}>Create Template</Typography.Title>
      <div className='p-6 px-10'>
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>

        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type='primary' onClick={onSubmitStep1}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button loading={isLoading} type='primary' onClick={handleCreateTemplate}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateTemplate;

const CreateContent = ({
  template,
  setTemplate,
}: {
  template: TSMTemplateRequest;
  setTemplate: (value: React.SetStateAction<TSMTemplateRequest>) => void;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const [activeColumn, setActiveColumn] = useState<ListCardRequest | null>(null);
  const [activeTask, setActiveTask] = useState<CardRequest | null>(null);
  const [visible, setVisible] = useCollapse<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setVisible(open);
  };

  const [columns, setColumns] = useState<ListCardRequest[]>(template.project.listCards);

  const columnsId = useMemo(() => columns.map((col) => col?.id), [columns]);
  const [cards, setCards] = useState<CardRequest[]>(
    template.project.listCards.flatMap((col) => col.cards)
  );

  const [listCard, setListCard] = useState<ListCardRequest>({
    id: '',
    name: '',
    cards: [],
  });

  const migrateListCard = (cardsChange: CardRequest[]) => {
    const columnFilterCard = columns.map((col) => ({
      ...col,
      cards: cardsChange.filter((card) => card.listCardId === col.id),
    }));
    setTemplate((prev) => ({
      ...prev,
      project: {
        ...prev.project,
        listCards: columnFilterCard,
      },
    }));
  };

  const handleAddListCard = () => {
    setColumns((prev) => [...prev, listCard]);

    setTemplate((prev) => ({
      ...prev,
      project: {
        ...prev.project,
        listCards: [...prev.project.listCards, listCard],
      },
    }));
  };

  const createCard = async (columnId: string, card: CardRequest) => {
    card.listCardId = columnId;
    card.id = uuid();

    setCards((prev) => [...prev, card]);

    migrateListCard([...cards, card]);
  };

  const setColumnsMoved = (columns: ListCardRequest[]) => {
    setColumns(columns);
    migrateListCard(cards);
  };

  const setCardsMoved = (cardsMoved: CardRequest[]) => {
    setCards(cardsMoved);
    migrateListCard(cardsMoved);
  };

  const btnColor = useSelector((state) => state.theme.btnColor);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className='inline-block min-h-screen px-6'>
        <div className='flex items-start gap-x-3'>
          <SortableContext items={columnsId}>
            {columns.map((col, index) => (
              <ColumnContainer
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
                  className='rounded text-sm font-semibold'
                  value={listCard.name}
                  onChange={(e) => {
                    setListCard((prev) => ({ ...prev, id: uuid(), name: e.target.value }));
                  }}
                />
                <div className='ml-auto flex items-center gap-x-2'>
                  <Button
                    onClick={handleAddListCard}
                    type='text'
                    style={{
                      backgroundColor: btnColor,
                      color: '#fff',
                    }}
                    className='rounded text-xs font-semibold text-white'
                  >
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
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              cards={cards.filter((card) => card.listCardId === activeColumn.id)}
            />
          )}
          {activeTask && <TaskCard card={activeTask} />}
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
