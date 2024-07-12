import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Button, Form, Input, Select, Steps, Tabs, Typography, Divider, List } from 'antd';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import type { SearchProps } from 'antd/es/input';
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
import TaskCard from '../../../components/card';
import useGetCategories from '@/modules/tsm/components/hooks/use-get-categories';
import { Check, ListChecks, Plus, Search, User } from 'lucide-react';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import useCollapse from '@/shared/hooks/use-collapse';
import PopoverX from '@/shared/components/popover';
import { tsmAxios } from '@/configs/axios';

import { createPortal } from 'react-dom';

import ColumnContainer from '../../../components/column';
import { set } from 'lodash';
import useGetBackground from '@/modules/tsm/features/workspace/hooks/query/use-get-background';

const CreateTemplate: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const [form1] = Form.useForm();

  const [template, setTemplate] = useState<TSMTemplateRequest>({
    name: '',
    description: '',
    categoryId: '',
    project: {
      name: '',
      backgroundColor: '',
      backgroundUnsplash: {
        id: '',
        color: '',
        urls: {
          raw: '',
          full: '',
          regular: '',
          small: '',
          thumb: '',
        },
      },
      description: '',
      listCards: [] as ListCardRequest[],
    },
    createdDate: '',
  });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { data: categories } = useGetCategories();

  const onSubmitStep1 = () => {
    form1.validateFields().then((values) => {
      setTemplate((prev) => ({ ...prev, ...values }));

      next();
    });
  };

  const steps = [
    {
      title: 'Overview',
      content: (
        <Form
          layout='vertical'
          className='p-10 my-4 rounded bg-slate-100'
          form={form1}
          onFinish={onSubmitStep1}
        >
          <Form.Item label='Name' name='name'>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input.TextArea rows={4} placeholder='Name' />
          </Form.Item>
          <Form.Item name='categoryId' label='Category'>
            <Select
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
      ),
    },
    {
      title: 'Detail',
      content: (
        <div>
          <div>
            <SubBackground
              color={template.project.backgroundColor || ''}
              setTemplate={setTemplate}
            ></SubBackground>
          </div>
          <section
            className='relative mx-auto my-4 h-[600px]  w-[calc(100vw-400px)] rounded-lg bg-cover bg-center bg-no-repeat'
            style={{
              backgroundPosition: 'center',
              backgroundColor: template.project.backgroundColor,
              backgroundImage: `url(${template.project.backgroundUnsplash?.urls.raw})`,
            }}
          >
            <div className='absolute inset-0 bg-black rounded-lg bg-opacity-40' />
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
                    },
                    {
                      key: 'Kaban',
                      label: 'Kaban',
                      children: <div className='px-6'>Overview</div>,
                    },
                  ]}
                  tabBarExtraContent={{
                    left: (
                      <div className='flex items-center mr-8'>
                        <p className='mr-4 max-w-48 truncate text-[18px] font-bold'>
                          {template?.name}
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
        </div>
      ),
    },
    {
      title: 'Preview',
      content: <Button onClick={() => console.log(template)}>Complete</Button>,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

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
            <Button type='primary' onClick={() => toast.success('Processing complete!')}>
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
  const [cards, setCards] = useState<CardRequest[]>(template.project.listCards.flatMap((col) => col.cards));

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

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className='inline-block min-h-screen px-6 '>
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
                  className='text-sm font-semibold rounded '
                  value={listCard.name}
                  onChange={(e) => {
                    setListCard((prev) => ({ ...prev, id: uuid(), name: e.target.value }));
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

const SubBackground = ({
  color,
  setTemplate,
}: {
  color: string;
  setTemplate: (value: React.SetStateAction<TSMTemplateRequest>) => void;
}) => {
  const [listBackground, setListBackground] = useState<UnsplashResponse[]>([]);
  const [backgroundSearch, setBackgroundSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const { data } = await tsmAxios.get<UnsplashResponse[]>(
          'unsplash/photos?page=1&per_page=4'
        );
        setListBackground(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBackground();
  }, []);

  const fetchBackgroundWithoutQuery = async () => {
    try {
      const response = await tsmAxios.get<UnsplashResponse[]>('unsplash/photos?page=1&per_page=4');
      setListBackground((res) => [...res, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBackground = async (query: string) => {
    try {
      const response = await tsmAxios.get<UnsplashResponse[]>(
        `unsplash/photos?query=${query}&page=${page}&per_page=4`
      );
      if (page === 1) setListBackground(response.data);
      else setListBackground((res) => [...res, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadMore = () => {
    if (backgroundSearch) {
      fetchBackground(backgroundSearch);
      setPage((pre) => pre + 1);
    } else {
      fetchBackgroundWithoutQuery();
    }
  };

  const loadMore = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>Load more</Button>
    </div>
  );

  const onSearch: SearchProps['onSearch'] = (value, _e, _info) => {
    if (value) {
      fetchBackground(value);
      setPage(2);
    }
  };

  const setBackground = (backgoundUns: UnsplashResponse) => {
    setTemplate((prev) => ({
      ...prev,
      project: {
        ...prev.project,
        backgroundUnsplash: backgoundUns,
      },
    }));
  };

  const setBackgroundColor = (color: string) => {
    setTemplate((prev) => ({
      ...prev,
      project: {
        ...prev.project,
        backgroundColor: color,
      },
    }));
  };

  return (
    <div className='w-full'>
      <div className='w-full mx-auto mb-2 transition-transform'>
        <Typography.Text className='text-base font-semibold'>Temlate background</Typography.Text>
      </div>

      <div className='w-full'>
        <Typography.Text className='text-sm'>Wallpaper</Typography.Text>
        <div>
          <Input.Search
            value={backgroundSearch}
            onChange={(e) => {
              setBackgroundSearch(e.target.value);
            }}
            placeholder='Search image ...'
            onSearch={onSearch}
          ></Input.Search>
        </div>
        <div className='items-center w-full gap-2 mt-1 mb-2'>
          <List
            grid={{ column: 4 }}
            loadMore={loadMore}
            dataSource={listBackground}
            renderItem={(item) => (
              <div
                className='ml-[auto] mr-[auto] mt-2 h-[100px] w-[200px] cursor-pointer rounded transition-all hover:brightness-125'
                onClick={() => setBackground(item)}
              >
                <img
                  src={item.urls.small}
                  alt='background'
                  className='object-cover w-full h-full rounded'
                />
              </div>
            )}
          ></List>
        </div>
        <Divider className='my-1' />
        <Typography.Text className='text-sm'>Color</Typography.Text>
        <div className='flex flex-wrap items-center w-full gap-2 mt-1 justify-evenly'>
          {listColor.map((item) => (
            <div
              onClick={() => setBackgroundColor(item.color)}
              style={{
                backgroundColor: item.color,
              }}
              className={`relative h-[32px] w-[50px] cursor-pointer rounded transition-all hover:brightness-125`}
            >
              {item.color === color && (
                <Check className='absolute w-4 h-4 text-white right-4 top-2' />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const listColor = [
  {
    id: 1,
    name: 'Color 1',
    color: '#0079bf',
  },
  {
    id: 2,
    name: 'Color 2',
    color: '#d29034',
  },
  {
    id: 3,
    name: 'Color 3',
    color: '#519839',
  },
  {
    id: 4,
    name: 'Color 4',
    color: '#b04632',
  },
  {
    id: 5,
    name: 'Color 5',
    color: '#89609e',
  },
  {
    id: 6,
    name: 'Color 6',
    color: '#cd5a91',
  },
  {
    id: 7,
    name: 'Color 7',
    color: '#4bbf6b',
  },
  {
    id: 8,
    name: 'Color 8',
    color: '#00aecc',
  },
  {
    id: 9,
    name: 'Color 9',
    color: '#838c91',
  },
  {
    id: 10,
    name: 'Color 10',
    color: '#7f77f1',
  },
  {
    id: 11,
    name: 'Color 11',
    color: '#6985ff',
  },
  {
    id: 12,
    name: 'Color 12',
    color: '#1090e0',
  },
  {
    id: 13,
    name: 'Color 13',
    color: '#0f9d9f',
  },
  {
    id: 14,
    name: 'Color 14',
    color: '#3db88b',
  },
  {
    id: 15,
    name: 'Color 15',
    color: '#e16b16',
  },
  {
    id: 16,
    name: 'Color 16',
    color: '#ee5e99',
  },
  {
    id: 17,
    name: 'Color 17',
    color: '#b660e0',
  },
];
