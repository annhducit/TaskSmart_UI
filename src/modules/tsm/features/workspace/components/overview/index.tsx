import { Card, Divider, Typography } from 'antd';
import { LockKeyhole } from 'lucide-react';

const Overview = () => {
  return (
    <div className='max-w-[1440px]'>
      <div className='flex flex-col gap-y-4 px-6'>
        <div className='flex items-center gap-x-5'>
          <div className='h-20 w-20 rounded'>
            <img
              src='https://images.unsplash.com/photo-1492892132812-a00a8b245c45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              className='h-full w-full rounded-lg'
            />
          </div>
          <div className='flex flex-col'>
            <Typography.Text className='text-2xl text-white'>Double 2D Thesis</Typography.Text>
            <div className='flex items-center gap-x-4'>
              <Typography.Text className='text-white'>Premium</Typography.Text>
              <div className='flex items-center'>
                <LockKeyhole className='mr-1 h-4 w-4' />
                <Typography.Text className='text-white'>Private</Typography.Text>
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
