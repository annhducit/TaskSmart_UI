import { useMemo, useState } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import TaskCard from './task-card';
import { Button, Input, Popover, Typography } from 'antd';
import { Ellipsis, Plus, Trash2 } from 'lucide-react';
import Tooltip from '@/shared/components/tooltip';

interface Props {
  column: ListCard;
  cards: Card[];
  deleteColumn?: (id: String) => void;
  updateColumn?: (column: ListCard) => void;
  createCard?: (columnId: String, card: Card) => void;
  updateCard?: (id: Id, content: string) => void;
  deleteCard?: (id: Id) => void;
}

const ColumnContainer = ({ column, cards, updateColumn, deleteColumn, createCard }: Props) => {
  const tasksIds = useMemo(() => {
    return cards.map((card) => card.id);
  }, [cards]);

  const cardUndefine: Card = {
    id: '',
    name: '',
    color: '',
    description: '',
    status: 'none',
    priority: 'none',
    risk: 'none',
    effort: 'none',
    estimate: new Date(),
    checkLists: [],
  };

  const [cardCreation, setCardCreation] = useState<Card>(cardUndefine);

  const setCardCreationName = (name: string) => {
    setCardCreation({ ...cardCreation, name });
  };

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='flex h-[520px] w-[275px] flex-col items-center rounded-xl border-none bg-[#ffffff3d]'
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex max-h-[520px] w-[275px] cursor-move flex-col gap-y-2 rounded-xl bg-white p-2 shadow-lg'
    >
      <div {...attributes} {...listeners} className='flex items-center justify-between'>
        <div>
          <Input
            allowClear
            type='text'
            defaultValue={column.name}
            className='cursor-pointer rounded-xl border-none text-base font-bold transition-all'
            onBlur={(e) => updateColumn({ ...column, name: e.target.value })}
          />
        </div>
        <Popover
          placement='rightTop'
          trigger='click'
          title={<div className='text-center font-semibold'>Behavior</div>}
          content={
            <div className='flex flex-col gap-y-2'>
              <Button type='default' className='text-left text-xs'>
                Add Card
              </Button>
              <Button type='default' className='text-left text-xs '>
                Add List
              </Button>
              <Button type='default' className='text-left text-xs '>
                Copy List
              </Button>
              <Button type='default' className='text-left text-xs '>
                Move List
              </Button>
              <Button type='default' className='text-left text-xs '>
                Archive List
              </Button>
            </div>
          }
        >
          <div className='rounded px-1 transition-all hover:bg-[#091E4224]'>
            <Ellipsis className='mt-1 h-5 w-5 text-slate-500' />
          </div>
        </Popover>
      </div>

      {/* Column list card content */}

      <div className='flex max-h-[420px] flex-col gap-y-2 overflow-y-scroll'>
        <SortableContext items={tasksIds}>
          {cards.map((card) => (
            <TaskCard key={card.id} card={card} />
          ))}
        </SortableContext>
      </div>
      <div className='flex items-center gap-x-2'>
        <Popover
          trigger='click'
          content={
            <div className='flex flex-col gap-y-2'>
              <Typography.Text className='text-xs'>Create new card</Typography.Text>
              <Input
                onChange={(e) => setCardCreationName(e.target.value)}
                value={cardCreation.name}
                placeholder='Enter card title'
              />
              <Button
                type='primary'
                size='small'
                className='w-full'
                onClick={() => {
                  createCard(column.id, cardCreation);
                }}
              >
                Add Card
              </Button>
            </div>
          }
        >
          <Button
            type='dashed'
            icon={<Plus className='h-4 w-4' />}
            className='flex w-full items-center rounded-xl'
          >
            Add Card
          </Button>
        </Popover>
        <Tooltip title='Remove card'>
          <div className='cursor-pointer rounded px-1 transition-all hover:bg-[#091E4224]'>
            {/* hiện modal xác nhận xóa */}
            <Trash2
              onClick={() => deleteColumn(column.id)}
              className='mt-1 h-4 w-4 text-slate-500'
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ColumnContainer;
