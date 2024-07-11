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
            className='text-base font-bold transition-all border-none cursor-pointer rounded-xl'
          />
        </div>
        <Popover
          placement='rightTop'
          trigger='click'
          title={<div className='font-semibold text-center'>Behavior</div>}
          content={
            <div className='flex flex-col gap-y-2'>
              <Button type='default' className='text-xs text-left'>
                Add Card
              </Button>
              <Button type='default' className='text-xs text-left '>
                Add List
              </Button>
              <Button type='default' className='text-xs text-left '>
                Copy List
              </Button>
              <Button type='default' className='text-xs text-left '>
                Move List
              </Button>
              <Button type='default' className='text-xs text-left '>
                Archive List
              </Button>
            </div>
          }
        >
          <div className='rounded px-1 transition-all hover:bg-[#091E4224]'>
            <Ellipsis className='w-5 h-5 mt-1 text-slate-500' />
          </div>
        </Popover>
      </div>

      {/* Column list card content */}

      <div className='flex max-h-[420px]  flex-col gap-y-2 overflow-y-scroll'>
        {listCard.cards?.map((card, index) => <CardAIItem card={card} key={index} />)}
      </div>
      <div className='flex items-center gap-x-2'>
        <Popover
          trigger='click'
          //   onOpenChange={setVisible}
          //   open={visible}
          content={
            <div className='flex flex-col gap-y-2'>
              <Typography.Text className='text-xs'>Create new card</Typography.Text>
              <Input
                // onChange={(e) => setCardCreationName(e.target.value)}
                // value={cardCreation.name}
                placeholder='Enter card title'
                // onPressEnter={
                //   createCard &&
                //   (() => {
                //     createCard(column.id, cardCreation);
                //     setVisible(false);
                //     setCardCreationName('');
                //   })
                // }
              />
              <Button
                type='primary'
                size='small'
                className='w-full'
                // onClick={
                //   createCard &&
                //   (() => {
                //     createCard(column.id, cardCreation);
                //     setVisible(false);
                //     setCardCreationName('');
                //   })
                // }
              >
                Add Card
              </Button>
            </div>
          }
        >
          <Button
            type='dashed'
            icon={<Plus className='w-4 h-4' />}
            className='flex items-center w-full rounded-xl'
          >
            Add Card
          </Button>
        </Popover>
        <Tooltip title='Remove card'>
          <div className='cursor-pointer rounded px-1 transition-all hover:bg-[#091E4224]'>
            <Trash2
              //   onClick={
              //     deleteColumn &&
              //     (() => {
              //       deleteColumn(column.id);
              //     })
              //   }
              className='w-4 h-4 mt-1 text-slate-500'
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ListCardAI;
