import { Typography } from 'antd';
import { LockKeyhole } from 'lucide-react';

const ProjectItem = (prop?: { id?: string }) => {
  return (
    <div
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1716251642302-72006415465b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='relative flex cursor-pointer flex-col gap-y-3 rounded border border-solid border-slate-200 p-4 transition-all hover:border-primary-default hover:text-primary-default'
    >
      <div className='absolute inset-0 rounded bg-black opacity-40' />
      <div className='flex flex-col justify-between'>
        <Typography.Text className='z-10 font-semibold text-white'>
          Double 2D Thesis
        </Typography.Text>
        <div className='z-10 flex items-center'>
          <LockKeyhole className='mr-1 h-3 w-3 text-white' />
          <Typography.Text className='text-xs font-semibold text-white'>
            Tasksmart workspace
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
