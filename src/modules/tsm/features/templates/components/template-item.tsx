import { Divider, Tag, Typography } from 'antd';
import Logo from '@/shared/components/logo';
import { useNavigate } from 'react-router-dom';

const TemplateItem = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`../../../tsm/template/${1}`)}
      className='flex cursor-pointer flex-col rounded-lg bg-white shadow-xl transition-all'
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.3)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0px 0px 8px rgba(0,0,0,0.1)')}
    >
      <div className='relative h-[150px]  rounded-t'>
        <img
          className='h-full w-full rounded-t-lg object-cover'
          src='https://images.unsplash.com/photo-1713970700051-556d05c59fce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='template'
        />
        <div className='absolute right-2 top-2 rounded border-[3px] border-solid border-primary-default bg-white p-2'>
          <Logo type='SINGLE_LOGO' size='w-6 h-6' />
        </div>
      </div>
      <div className='flex flex-col gap-y-1 p-3 py-4'>
        <div className='flex items-center justify-between'>
          <Typography.Text className='block text-lg font-semibold'>
            New Hire Onboarding
          </Typography.Text>
          <Tag color='blue'>Business</Tag>
        </div>
        <Divider className='my-[1px]' />
        <Typography.Text className='block text-xs font-normal'>
          by <span className='font-semibold text-primary-default'>Tasksmart</span> team
        </Typography.Text>
        <Typography.Text className='line-clamp-2 block truncate text-sm font-normal'>
          This template provides a centralized space for every new hire to tackle all the
          job-related logistical items and business requirements to get onboarded.
        </Typography.Text>
      </div>
    </div>
  );
};

export default TemplateItem;
