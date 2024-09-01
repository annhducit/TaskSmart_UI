import Logo from '@/shared/components/logo';
import { App, Button, Divider, Typography } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../_landing/components/header';
import Footer from '../_landing/components/footer';
import useGetProfile from '../tsm/components/hooks/use-profile';
import { useDispatch, useSelector } from '@/stores';
import { forceSignOut } from '@/stores/auth';
import { toast } from 'sonner';
import userImageDefault from '@/assets/images/user.png';

type LayoutType = 'LANDING' | 'NORMAL';
const LandingLayout = ({ type }: { type: LayoutType }) => {
  const { isSignedIn, isLoaded } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { modal } = App.useApp();

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
  const { data: user } = useGetProfile();

  const userProfileImage = user?.profileImagePath
    ? `http://localhost:8888/api/image/${user?.profileImagePath}`
    : userImageDefault;

  return (
    <div>
      {type === 'NORMAL' && (
        <div>
          <header className='flex items-center justify-between p-6'>
            <Logo type='LOGO' />
            <div className='flex items-center gap-x-4'>
              <div className='flex items-center gap-x-2'>
                <div className='h-7 w-7 rounded-full'>
                  <img src={userProfileImage} className='h-full w-full rounded-full object-cover' />
                </div>
                <Typography.Text className='text-sm'>{user?.name}</Typography.Text>
              </div>
              <Button type='default' danger onClick={handleSignout}>
                Sign Out
              </Button>
            </div>
          </header>
          <Outlet />
        </div>
      )}
      {type === 'LANDING' && (
        <div>
          <Header />
          <Outlet />
          <Divider className='my-1' />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default LandingLayout;
