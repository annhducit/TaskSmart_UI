import Logo from '@/shared/components/logo';
import { Button, Typography } from 'antd';
import { Outlet } from 'react-router-dom';

type LayoutType = 'LANDING' | 'NORMAL';
const LandingLayout = ({ type }: { type: LayoutType }) => {
  return (
    <div>
      {type === 'NORMAL' && (
        <div>
          <header className='flex items-center justify-between p-6'>
            <Logo type='LOGO' />
            <div className='flex items-center gap-x-4'>
              <div className='flex items-center gap-x-2'>
                <div className='h-7 w-7 rounded-full'>
                  <img
                    src='https://theguycornernyc.com/wp-content/uploads/2021/03/style.jpeg'
                    className='h-full w-full rounded-full object-cover'
                  />
                </div>
                <Typography.Text className='text-sm'>Nguyễn Anh Đức</Typography.Text>
              </div>
              <Button type='default'>Sign Out</Button>
            </div>
          </header>
          <Outlet />
        </div>
      )}
      {type === 'LANDING' && (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default LandingLayout;
