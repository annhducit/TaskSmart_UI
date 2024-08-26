import { Avatar, Typography } from 'antd';
import { Link } from 'react-router-dom';

const Activity = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <ActivityItem />
      <ActivityItem />
      <ActivityItem />
    </div>
  );
};

export default Activity;

export const ActivityItem = () => {
  return (
    <div className='p2 flex items-center gap-x-4 gap-y-1 rounded'>
      <div className='h-8 w-8 rounded-full'>
        <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' />
      </div>
      <div className='flex flex-col'>
        <Typography.Text className='text-sm'>
          <Link to='.' className='hover:underline'>
            Trọng Đức{' '}
          </Link>
          added a new card
        </Typography.Text>
        <Typography.Text className='text-xs text-slate-500'>2 hours ago</Typography.Text>
      </div>
    </div>
  );
};
