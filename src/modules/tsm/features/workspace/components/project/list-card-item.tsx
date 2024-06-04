import Tooltip from '@/shared/components/tooltip';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';
import { Avatar, Button, Input, Popover, Typography } from 'antd';
import { Ellipsis, Paperclip, Plus, Rss, Text, Trash2, User } from 'lucide-react';

const ListCardItem = () => {
  return (
    <div className='flex h-[520px] w-[275px] flex-col gap-y-2 rounded-xl bg-white p-2 shadow-lg'>
      <div className='flex items-center justify-between'>
        <div>
          <Input
            allowClear
            type='text'
            defaultValue='Backlog'
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

      <div className='flex h-[420px] flex-col gap-y-2 overflow-y-scroll'>
        {[0, 1, 2].map((item) => (
          <CardItem key={item} />
        ))}
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
        <Tooltip title='Remove card'>
          <div className='cursor-pointer rounded px-1 transition-all hover:bg-[#091E4224]'>
            <Trash2 className='mt-1 h-4 w-4 text-slate-500' />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ListCardItem;

function CardItem() {
  const searhParams = useSearchParams();

  return (
    <>
      <div
        onClick={() =>
          searhParams.set({
            [SEARCH_PARAMS.DIALOG]: SEARCH_PARAMS_VALUE.CARD,
            [SEARCH_PARAMS.ID]: '1',
          })
        }
        className='flex cursor-pointer flex-col rounded-xl border border-solid border-slate-300 shadow-lg transition-all hover:border-[2px] hover:border-primary-default'
      >
        <div
          className='h-[115px] w-full rounded-t-[10px]'
          style={{
            backgroundColor: '#ee5e99',
          }}
        />
        <div className='flex items-center justify-between p-2'>
          <div className='flex flex-col gap-y-1'>
            <div className='flex flex-col gap-y-1'>
              <Typography.Text className='text-xs font-semibold'>Technologies Task</Typography.Text>
              <div className='flex items-center gap-x-1'>
                <Tooltip
                  title='The card already has a description'
                  color='black'
                  placement='bottom'
                >
                  <div className='flex items-center rounded-sm  p-1 transition-all hover:bg-[#091E4224]'>
                    <Text className='h-3 w-3 text-slate-500' />
                  </div>
                </Tooltip>
                <Tooltip color='black' title='Followed' placement='bottom'>
                  <div className='flex items-center rounded-sm p-1 transition-all hover:bg-[#091E4224]'>
                    <Rss className='h-3 w-3 text-slate-500' />
                  </div>
                </Tooltip>
                <Tooltip
                  color='black'
                  title='Attactments'
                  className='text-[10px]'
                  placement='bottom'
                >
                  <div className='flex items-center rounded-sm p-[2px] transition-all hover:bg-[#091E4224]'>
                    <Paperclip className='h-3 w-3 text-slate-500' />
                    <Typography.Text className='ml-[1px] text-xs'>3</Typography.Text>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          <Avatar.Group maxCount={2} size='small'>
            <Tooltip title='Đức Duy' placement='top'>
              <Avatar style={{ backgroundColor: '#f56a00' }} icon={<User size='12' />} />
            </Tooltip>
            <Tooltip title='Trọng Đức' placement='top'>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<User size='12' />} />
            </Tooltip>
          </Avatar.Group>
        </div>
      </div>
    </>
  );
}
