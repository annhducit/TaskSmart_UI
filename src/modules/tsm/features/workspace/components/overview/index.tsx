import { Card, Divider, Spin, Tag, Typography } from 'antd';
import { LockKeyhole } from 'lucide-react';
import useGetProject from '../project/hooks/query/use-get-project';

const Overview = () => {
  5;

  const { data: project, isLoading } = useGetProject();
  return (
    <div className='max-w-[1440px]'>
      <div className='flex flex-col gap-y-4 px-6'>
        <div className='flex items-center gap-x-5'>
          <div className='h-20 w-20 rounded'>
            {isLoading ? (
              <Spin size='small' />
            ) : (
              <img
                src={project?.backgroundUnsplash.urls.small}
                alt=''
                className='h-full w-full rounded-lg object-cover'
              />
            )}
          </div>
          <div className='flex flex-col gap-y-4'>
            {isLoading ? (
              <Spin size='small' />
            ) : (
              <Typography.Text className='text-2xl text-white'>{project?.name}</Typography.Text>
            )}
            <div className='flex items-center gap-x-4'>
              <Tag color='yellow'>Premium</Tag>
              <div className='flex items-center'>
                <Tag
                  icon={<LockKeyhole className='mr-1 h-3 w-3' />}
                  color='red-inverse'
                  className='flex items-center text-white'
                >
                  Private
                </Tag>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Typography.Text className='mb-2 block text-lg text-white'>
            Recent activities
          </Typography.Text>
          <div className='grid grid-cols-3 gap-4'>
            <Card title='Recent Activities' className='rounded-lg' bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>

            <Card title='Docs' className='rounded-lg' bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card title='Resources' className='rounded-lg' bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
          <Typography.Text className='my-2 block text-lg text-white'>
            Recent activities
          </Typography.Text>
          <div className='grid grid-cols-3 gap-4'>
            <Card title='Recent Activities' className='rounded-lg' bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>

            <Card title='Docs' className='rounded-lg' bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card title='Resources' className='rounded-lg' bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default Overview;
