import Tooltip from '@/shared/components/tooltip';
import { Avatar, Typography } from 'antd';
import { LockKeyhole } from 'lucide-react';

import myBackgroundImage from '@/assets/images/17.png';

const ProjectItem = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${myBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='flex cursor-pointer flex-col gap-y-3 rounded border border-solid border-slate-200 p-4 transition-all hover:border-primary-default hover:text-primary-default'
    >
      <div className='flex items-center justify-between'>
        <Typography.Text className='font-semibold'>Double 2D Thesis</Typography.Text>
        <div className='flex items-center'>
          <LockKeyhole className='mr-1 h-4 w-4' />
          <Typography.Text>Private</Typography.Text>
        </div>
      </div>
      <div>
        <Avatar.Group maxCount={2} className='flex items-center'>
          <Tooltip title='Anh Đức'>
            <Avatar size='small' style={{ backgroundColor: '#f56a00' }}>
              Đ
            </Avatar>
          </Tooltip>
          <Tooltip title='Đức Duy'>
            <Avatar size='small' style={{ backgroundColor: '#87d068' }}>
              D
            </Avatar>
          </Tooltip>
        </Avatar.Group>
      </div>
      <div>
        <Typography.Text className='text-xs'>Created at: 20/5/2024</Typography.Text>
      </div>
    </div>
  );
};

export default ProjectItem;
