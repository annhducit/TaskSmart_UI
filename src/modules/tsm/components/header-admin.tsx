import { Button, Divider, Input, Popover, Typography } from 'antd';
import { Bell, LogOut, Mail, Settings, User } from 'lucide-react';
import admin from '@/assets/images/user.png';

const HeaderAdmin = () => {
  return (
    <header className='relative px-6 py-3 bg-white border border-solid border-b-slate-200 border-l-transparent border-r-transparent border-t-transparent'>
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
                        icon={<User className='w-4 h-4' />}
                        type='text'
                        onClick={() => {}}
                        className='flex items-center w-full text-left text-black'
                      >
                        Profile
                      </Button>
                      <Button
                        icon={<Settings className='w-4 h-4' />}
                        type='text'
                        className='flex items-center w-full text-left text-black'
                      >
                        Setting
                      </Button>
                      <Divider className='my-[1px]' />
                      <Button
                        icon={<LogOut className='w-4 h-4' />}
                        type='text'
                        className='flex items-center w-full text-left text-black'
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                }
                trigger='hover'
              >
                <div className='rounded-full h-9 w-9'>
                  <img src={admin} className='w-full h-full rounded-full' />
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
