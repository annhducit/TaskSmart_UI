import Dropdown from '@/shared/components/dropdown';
import Logo from '@/shared/components/logo';
import { App, Button, Popover, Typography } from 'antd';
import type { MenuProps } from 'antd/lib';
import { Globe, LogOut, Settings } from 'lucide-react';

import vnFlag from '@/assets/images/vietnam.png';
import engFlag from '@/assets/images/english.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@/stores';
import useGetProfile from '@/modules/tsm/components/hooks/use-profile';
import userImageDefault from '@/assets/images/user.png';
import { forceSignOut } from '@/stores/auth';
import { toast } from 'sonner';
const Header = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const isLoaded = useSelector((state) => state.auth.isLoaded);

  const { data: user } = useGetProfile();
  const { modal } = App.useApp();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userProfileImage = user?.profileImagePath
    ? `http://localhost:8888/api/image/${user?.profileImagePath}`
    : userImageDefault;

  const handleSignout = () => {
    modal.confirm({
      title: 'Do you want to sign out?',
      onOk: () => {
        dispatch(forceSignOut());
        toast.success('Sign out successfully');
        navigate('/auth/sign-in');

        if (!isSignedIn || !isLoaded) {
          return null;
        }
      },
      onCancel: () => {},
    });
  };
  return (
    <header className='fixed inset-0 z-[999] flex h-16 items-center justify-between border-b bg-white pl-8 pr-10'>
      <div className='flex items-center gap-x-6'>
        <Logo type='LOGO' />
        <Dropdown items={data} children={<div>Products</div>} />
        <Dropdown items={data} children={<div>Solutions</div>} />
        <Dropdown items={data} children={<div>Resources</div>} />
        <Dropdown items={data} children={<div>Enterprise</div>} />
        <Dropdown items={data} children={<div>Pricing</div>} />
      </div>
      <div className='flex items-center gap-x-4'>
        <Dropdown
          items={languages}
          icon={<Globe className='mt-[6px] h-4 w-4' />}
          children={<div>English</div>}
          trigger='hover'
        />
        <div className='h-5 w-[1px] bg-slate-400 opacity-40'></div>
        {!isSignedIn && (
          <>
            <Button type='default' onClick={() => navigate('../auth/sign-in')}>
              Sign In
            </Button>
            <Button type='primary' onClick={() => navigate('../auth/sign-up')}>
              Sign Up Free
            </Button>
          </>
        )}

        {isSignedIn && (
          <Popover
            content={
              <div className='flex flex-col gap-y-2'>
                <Button
                  icon={<Settings className='h-4 w-4' />}
                  type='text'
                  onClick={() => navigate('')}
                  className='flex w-full items-center text-left text-black'
                >
                  Settings
                </Button>
                <Button
                  icon={<LogOut className='h-4 w-4' />}
                  type='text'
                  onClick={handleSignout}
                  className='flex w-full items-center text-left text-black'
                >
                  Logout
                </Button>
              </div>
            }
          >
            <div className='flex items-center gap-x-2'>
              <Typography.Text>{user?.name}</Typography.Text>
              <div className='relative'>
                <div className='h-8 w-8 rounded-full'>
                  <img src={userProfileImage} className='h-full w-full rounded-full' />
                </div>
                <span className='absolute right-0 top-0 rounded-full bg-[#3db88b] p-1' />
              </div>
            </div>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default Header;

const data: MenuProps['items'] = [
  {
    label: '1rd menu item',
    key: '0',
  },
  {
    label: '2rd menu item',
    key: '1',
  },

  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '2',
  },
];
const languages: MenuProps['items'] = [
  {
    label: <Typography.Text>English</Typography.Text>,
    key: '0',
    icon: <img src={engFlag} alt='eng-flag' className='h-3 w-4' />,
  },
  {
    type: 'divider',
  },
  {
    label: <Typography.Text>Vietnamese</Typography.Text>,
    icon: <img src={vnFlag} alt='vn-flag' className='h-3 w-4' />,
    key: '1',
  },
];
