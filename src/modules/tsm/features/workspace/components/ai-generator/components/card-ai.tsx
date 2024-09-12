import Tooltip from '@/shared/components/tooltip';
import { Avatar, Popover, Typography } from 'antd';
import { Paperclip, Rss, Text, User } from 'lucide-react';

const CardAIItem = ({ card }: { card: Partial<Card> }) => {
  return (
    <>
      <div className='flex cursor-grabbing flex-col rounded-lg border border-solid border-slate-300 shadow-lg transition-all hover:border-[2px] hover:border-primary-default'>
        <div
          className='h-[115px] w-full rounded-t-[6px]'
          style={{
            backgroundColor: 'red',
          }}
        />
        <div className='flex items-center justify-between rounded-b-xl bg-white p-2'>
          <div className='flex flex-col gap-y-1'>
            <div className='flex flex-col gap-y-1'>
              <Typography.Text className='w-[140px] truncate text-xs font-semibold'>
                {card.name}
              </Typography.Text>
              <div className='flex items-center gap-x-1'>
                <Tooltip
                  title='The card already has a description'
                  color='black'
                  placement='bottom'
                >
                  <div className='flex items-center rounded-sm p-1 transition-all hover:bg-[#091E4224]'>
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
          <div className='flex items-center'>
            <Avatar.Group maxCount={2} size='small'>
              <Tooltip title='Anh Duc'>
                <Popover trigger='click' placement='bottom'>
                  <Avatar
                    //   src={`http://localhost:8888/api/image/${user.profileImagePath}`}
                    icon={<User size='12' />}
                  />
                </Popover>
              </Tooltip>
            </Avatar.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardAIItem;
