import Tooltip from '@/shared/components/tooltip';
import { Avatar, Typography } from 'antd';
import { LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectItem = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`../../../tsm/project/${project.id}`);
      }}
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${project?.backgroundUnsplash?.urls?.full})`,
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
      <div className='z-10'>
        <Typography.Text className='text-xs text-white'>Created at: 20/5/2024</Typography.Text>
      </div>
    </div>
  );
};

export default ProjectItem;
