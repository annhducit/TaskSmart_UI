import { DATE_TIME_FORMAT } from '@/shared/constant/date';
import { Avatar, Typography } from 'antd';
import dayjs from 'dayjs';
import { LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Context = 'NORMAL' | 'RECENT';
const ProjectItem = ({
  project,
  type = 'NORMAL',
  recent,
}: {
  project: Project;
  type?: Context;
  recent?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`../../../tsm/project/${project.id}`);
      }}
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${project?.backgroundUnsplash?.urls?.regular})`,
        backgroundColor: `${project?.backgroundColor}`,
      }}
      className='relative flex cursor-pointer flex-col gap-y-3 rounded-lg border border-solid border-slate-200 object-cover p-4 transition-all hover:border-primary-default hover:text-primary-default'
    >
      <div className='absolute inset-0 rounded-lg bg-black opacity-50' />
      <div className='flex items-center justify-between'>
        <Typography.Text className='z-10 font-semibold text-white'>{project.name}</Typography.Text>
        <div className='z-10 flex items-center'>
          <LockKeyhole className='mr-1 h-4 w-4 text-white' />
          <Typography.Text className='font-semibold text-white'>Private</Typography.Text>
        </div>
      </div>
      <div>
        <Avatar.Group maxCount={2} className='flex items-center'>
          {project?.users?.map((member) => (
            <Avatar
              key={member.userId}
              src={`http://localhost:8888/api/image/${member?.profileImagePath}`}
              size='small'
              className='border border-solid border-white'
            />
          ))}
        </Avatar.Group>
      </div>
      <div className='z-10'>
        {type === 'NORMAL' && <></>}
        {type === 'RECENT' && (
          <Typography.Text className='text-xs text-white'>
            Last viewed: {dayjs(recent).format(DATE_TIME_FORMAT)}
          </Typography.Text>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
