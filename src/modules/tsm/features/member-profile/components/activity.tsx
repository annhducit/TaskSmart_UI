import { Avatar, Tag, Typography } from 'antd';
import { ActivityIcon, LockKeyhole, Users } from 'lucide-react';

import projectImg from '@/assets/images/karban.png';

const Activity = () => {
  return (
    <div className='grid grid-cols-2 gap-x-6'>
      <div className='col-span-1 flex flex-col gap-y-2'>
        <div className='flex items-center gap-x-2 py-2'>
          <ActivityIcon size={18} className='opacity-40' />
          <Typography.Text className='text-base font-semibold'>Activities</Typography.Text>
        </div>
        <ActivityItem />
        <ActivityItem />
        <ActivityItem />
      </div>
      <div className='col-span-1 flex flex-col gap-y-2'>
        <div className='flex items-center gap-x-2 py-2'>
          <Users size={18} className='opacity-40' />
          <Typography.Text className='text-base font-semibold'>Workspaces</Typography.Text>
        </div>
        <div className='flex flex-col gap-y-2'>
          <WorkspaceItem />
          <WorkspaceItem />
        </div>
      </div>
    </div>
  );
};

export default Activity;

const ActivityItem = () => {
  return (
    <div className='p2 flex items-center gap-x-4 gap-y-1 rounded'>
      <div className='h-8 w-8 rounded-full'>
        <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' />
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center gap-x-1'>
          <p className='text-base font-semibold'>Đức Duy </p>
          <Typography.Text className='text-sm'>
            Move technology card from Doing list to Done list
          </Typography.Text>
        </div>
        <div className='flex items-center gap-x-1'>
          <Typography.Text className='text-xs text-slate-500'>2 hours ago in</Typography.Text>
          <Typography.Text className='text-primary-default'>Double 2D Thesis board</Typography.Text>
        </div>
      </div>
    </div>
  );
};

const WorkspaceItem = () => {
  return (
    <div className='flex cursor-pointer items-center gap-x-5 rounded-lg bg-slate-100 p-4 transition-all hover:border-solid hover:border-opacity-30 hover:bg-slate-200'>
      <div className='h-12 w-12 rounded'>
        <img src={projectImg} alt='' className='h-full w-full rounded-lg' />
      </div>
      <div className='flex flex-col'>
        <Typography.Title level={5}>TaskSmart Workspace</Typography.Title>

        <div className='flex items-center gap-x-4'>
          <Tag color='gold'>Premium</Tag>
          <div className='flex items-center'>
            <LockKeyhole color='red' className='mr-1 h-4 w-4' />
            <Tag color='red'>Private</Tag>
          </div>
        </div>
      </div>
    </div>
  );
};
