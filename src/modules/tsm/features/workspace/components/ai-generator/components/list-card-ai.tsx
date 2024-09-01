import { Button, Input, Popover, Tooltip, Typography } from 'antd';
import { Ellipsis, Plus, Trash2 } from 'lucide-react';
import CardAIItem from './card-ai';

const ListCardAI = ({ listCard }: { listCard: Partial<ListCard> }) => {
  return (
    <div className='flex max-h-[520px] w-[275px] cursor-move flex-col gap-y-2 rounded-xl bg-white p-2 shadow-lg'>
      <div className='flex items-center justify-between'>
        <div>
          <Input
            allowClear
            type='text'
            defaultValue={listCard.name}
            className='cursor-pointer rounded-xl border-none text-base font-bold transition-all'
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
              <Button type='default' className='text-left text-xs'>
                Add List
              </Button>
              <Button type='default' className='text-left text-xs'>
                Copy List
              </Button>
              <Button type='default' className='text-left text-xs'>
                Move List
              </Button>
              <Button type='default' className='text-left text-xs'>
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

      <div className='flex max-h-[420px] flex-col gap-y-2 overflow-y-scroll'>
        {listCard.cards?.map((card, index) => <CardAIItem card={card} key={index} />)}
      </div>
      <div className='flex items-center gap-x-2'>
        <Popover
          trigger='click'
          content={
            <div className='flex flex-col gap-y-2'>
              <Typography.Text className='text-xs'>Create new card</Typography.Text>
              <Input placeholder='Enter card title' />
              <Button type='primary' size='small' className='w-full'>
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
        <Tooltip title='Remove list card'>
          <div className='cursor-pointer rounded px-1 transition-all hover:bg-[#091E4224]'>
            <Trash2 className='mt-1 h-4 w-4 text-slate-500' />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ListCardAI;
