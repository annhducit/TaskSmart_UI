import { Card, Typography } from 'antd';

/**
 *
 * @returns Home page
 * @@author Duc Nguyen
 */
const Home = () => {
  return (
    <div className='flex flex-col gap-y-6'>
      <Typography.Text className='text-2xl font-semibold'>Hello Boss!</Typography.Text>
      <div className='grid grid-cols-2 gap-6'>
        <Card title='Recent Activities' bordered={true}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>

        <Card title='All Workspace' bordered={true}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title='Recent Activities' bordered={true}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>

        <Card title='All Workspace' bordered={true}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </div>
  );
};

export default Home;
