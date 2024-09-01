import { Button, Divider, Input, Popover, Typography } from 'antd';
import { Bell, LogOut, Mail, Settings, User } from 'lucide-react';
import admin from '@/assets/images/user.png';
import { useDispatch, useSelector } from '@/stores';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { forceSignOut } from '@/stores/auth';

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const isLoaded = useSelector((state) => state.auth.isLoaded);
  const handleSignout = () => {
    dispatch(forceSignOut());
    toast.success('You have been signed out successfully');
    navigate('/auth/sign-in');
    if (!isSignedIn || !isLoaded) {
      return null;
    }
  };
  return (
    <header className='relative border border-solid border-b-slate-200 border-l-transparent border-r-transparent border-t-transparent bg-white px-6 py-3'>
      <div className='flex items-center justify-between'>
        <div>
          <Typography.Text className='text-xl font-semibold'>Header Admin</Typography.Text>
        </div>
        <div className='flex items-center gap-x-6'>
          <Input.Search placeholder='Search...' size='large' />

          <Bell size={34} className='relative font-semibold text-primary-default opacity-70' />

          <Mail size={34} className='font-semibold text-primary-default opacity-70' />

          <div className='relative flex items-center gap-x-4'>
            <div className='h-6 w-[1px] bg-slate-300' />
            <div className='flex items-center gap-x-2'>
              <Typography.Text className='block truncate text-sm font-semibold text-[#4b5563]'>
                Admin
              </Typography.Text>
              <Popover
                content={
                  <div className='flex flex-col gap-y-3'>
                    <div className='flex flex-col gap-y-2'>
                      <Button
                        icon={<User className='h-4 w-4' />}
                        type='text'
                        onClick={() => {}}
                        className='flex w-full items-center text-left text-black'
                      >
                        Profile
                      </Button>
                      <Button
                        icon={<Settings className='h-4 w-4' />}
                        type='text'
                        className='flex w-full items-center text-left text-black'
                      >
                        Setting
                      </Button>
                      <Divider className='my-[1px]' />
                      <Button
                        icon={<LogOut className='h-4 w-4' />}
                        type='text'
                        onClick={handleSignout}
                        className='flex w-full items-center text-left text-black'
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                }
                trigger='hover'
              >
                <div className='h-9 w-9 rounded-full'>
                  <img src={admin} className='h-full w-full rounded-full' />
                </div>
              </Popover>
            </div>
            <span className='absolute right-0 top-0 rounded-full bg-[#3db88b] p-1' />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
