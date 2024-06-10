import { Typography } from 'antd';
import { Outlet } from 'react-router-dom';
import banner from '@/assets/images/banner-sigin.png';
import { CircleX } from 'lucide-react';
import Logo from '@/shared/components/logo';
/**
 *
 * @returns Authenticate layout component
 * @author Duc Nguyen
 */
const AuthenticateLayout = () => {
  return (
    <div className='relative flex h-screen flex-col'>
      <div className='h-1/2 bg-primary-default p-6'>
        <div className='flex items-center gap-x-2'>
          <div className='rounded bg-white p-2'>
            {' '}
            <Logo type='SINGLE_LOGO' />
          </div>
          <Typography.Text className='text-xl font-semibold text-white'>TaskSmart</Typography.Text>
        </div>
        <div className='flex items-start gap-x-10'>
          <div className='mt-10 flex flex-col gap-2 px-4'>
            <Typography.Text className='text-2xl font-semibold text-white'>
              Welcome to
            </Typography.Text>
            <Typography.Text className='text-4xl font-normal text-white'>TaskSmart</Typography.Text>
            <Typography.Text className='w-[300px] pt-6  font-normal text-white '>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s,
            </Typography.Text>
          </div>
          <div className='h-[385px] w-[385px] -translate-y-10'>
            <img loading='lazy' src={banner} className='h-full w-full object-contain' />
          </div>
        </div>
      </div>
      <div className='h-1/2 bg-white'>
        <div className='p-10'>
          <Typography.Text className='text-[16px] font-semibold'>Login as</Typography.Text>
          <div className='mt-6 flex items-center gap-x-4'>
            {[0, 1, 2].map((item) => (
              <RecentUser key={item} />
            ))}
          </div>
        </div>
      </div>
      {/* Outlet */}

      <Outlet />

      {/* Reserved */}
      <div className='absolute -bottom-4 left-0 p-6'>
        <Typography.Text className='text-xs font-normal opacity-60'>
          © 2024 TaskSmart. All rights reserved by D2D.
        </Typography.Text>
      </div>
    </div>
  );
};

export default AuthenticateLayout;

const RecentUser = () => {
  return (
    <div className='relative block h-[164px] w-[145px] rounded bg-[#EFF8FF]'>
      <div className='absolute right-1 top-1 opacity-65'>
        <CircleX size='16px' />
      </div>
      <div className='mx-auto mt-4 h-[76px] w-[76px] rounded-full'>
        <img
          src='https://theguycornernyc.com/wp-content/uploads/2021/03/style.jpeg'
          className='h-full w-full rounded-full object-cover'
        />
      </div>
      <div>
        <Typography.Text className='block pt-2 text-center text-base font-semibold'>
          John Doe
        </Typography.Text>
        <Typography.Text className='block text-center text-xs font-normal opacity-60'>
          Active 2 day ago
        </Typography.Text>
      </div>
    </div>
  );
};
