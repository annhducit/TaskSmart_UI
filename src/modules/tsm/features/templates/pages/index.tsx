import { Divider, Input, Spin, Typography } from 'antd';
import { Search } from 'lucide-react';
import TemplateItem from '../components/template-item';
import TemplateDetailModal from '../components/template-detail';
import useGetTemplates from '../../workspace/components/project/hooks/query/use-get-templates';

const Template = () => {
  const { data: templates, isLoading } = useGetTemplates();
  return (
    <>
      <div className='flex flex-col gap-y-2 px-2'>
        <div className='flex items-center justify-between'>
          <Typography.Title level={4}>Templates</Typography.Title>
          <div>
            <Input prefix={<Search className='mr-2 h-4 w-4' />} placeholder='Search templates' />
          </div>
        </div>
        <Divider className='my-[1px]' />
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <Typography.Text className='text-base'>Highlight</Typography.Text>
            <div className='flex items-center rounded bg-yellow-400 p-[2px]'>
              <HighlightIcon />
            </div>
          </div>
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <Spin />
            </div>
          ) : (
            <div className='grid grid-cols-4 gap-4'>
              {templates?.map((item, index) => <TemplateItem template={item} key={index} />)}
            </div>
          )}
        </div>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <Typography.Text className='text-base'>New</Typography.Text>
            <div className='flex items-center rounded bg-primary-default p-[2px]'>
              <NewIcon />
            </div>
          </div>{' '}
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <Spin />
            </div>
          ) : (
            <div className='grid grid-cols-4 gap-4'>
              {templates?.map((item, index) => <TemplateItem template={item} key={index} />)}
            </div>
          )}
        </div>
        <div className='flex flex-col gap-y-2'>
          <Typography.Text className='text-base'>All template</Typography.Text>
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <Spin />
            </div>
          ) : (
            <div className='grid grid-cols-4 gap-4'>
              {templates?.map((item, index) => <TemplateItem template={item} key={index} />)}
            </div>
          )}
        </div>
      </div>
      <TemplateDetailModal />
    </>
  );
};

export default Template;

const HighlightIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      className='size-5 text-white'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z'
      />
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z'
      />
    </svg>
  );
};

const NewIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      className='size-5 text-white'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z'
      />
    </svg>
  );
};
