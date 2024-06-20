import Tooltip from '@/shared/components/tooltip';
import useLocalStorage from '@/shared/hooks/use-local-storage';
import { Avatar, Typography } from 'antd';
import { LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectItem = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  const [, setProjectId] = useLocalStorage('project_id', '');
  return (
    <div
      onClick={() => {
        navigate(`/tsm/project/${project.id}`, {
          replace: true,
        });
        setProjectId(project.id);
      }}
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1716251642302-72006415465b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='relative flex cursor-pointer flex-col gap-y-3 rounded-lg border border-solid border-slate-200 p-4 transition-all hover:border-primary-default hover:text-primary-default'
    >
      <div className='absolute inset-0 rounded-lg bg-black opacity-40' />
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
