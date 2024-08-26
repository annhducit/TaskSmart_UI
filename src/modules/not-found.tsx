import { useNavigate } from 'react-router-dom';
import notFoundGif from '@/assets/gifs/not-found.gif';
import { Button, Typography } from 'antd';
import Logo from '@/shared/components/logo';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClickToGoBack = () => {
    navigate('../');
  };

  return (
    <div className='my-auto grid place-content-center'>
      <div className='mx-auto mt-28 h-[300px] w-[400px] rounded shadow-xl'>
        <div className='flex flex-col items-center justify-center gap-y-8 p-6'>
          <IconNotFound />
          <div className='flex flex-col gap-y-2 text-center'>
            <Typography.Text className='text-xl font-semibold'>
              This page is unavailable
            </Typography.Text>
            <Typography.Text className='text-center text-sm'>
              You don't have access to this Workspace or it doesn't exist anymore.
            </Typography.Text>
          </div>
          <Button type='primary' onClick={handleClickToGoBack} className='w-full'>
            Go back
          </Button>
        </div>
      </div>
      <div className='mx-auto mt-36 flex items-center gap-x-2'>
        <Logo type='SINGLE_LOGO' />
        <Typography.Text>
          Productivity by <span className='text-primary-default'>TaskSmart</span>
        </Typography.Text>
      </div>
    </div>
  );
};

export default NotFound;

const IconNotFound = () => {
  return (
    <div className='h-20 w-20 cursor-pointer rounded-2xl border-2 border-primary-default transition-all'>
      <img
        src={notFoundGif}
        alt=''
        className='h-full w-full rounded-2xl border-2 border-primary-default'
      />
    </div>
  );
};
