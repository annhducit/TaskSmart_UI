import { Avatar, Button, Divider, Typography } from 'antd';

/**
 *
 * @returns MemberInfo component
 * @author Duc Nguyen
 */
const MemberInfo = () => {
  /*
   * Add your code here
   */
  return (
    <div className='relative h-64 w-[250px] rounded-lg'>
      <div className=' h-[100px] w-full rounded-t-lg bg-primary-default' />
      <div className='mx-auto flex -translate-y-12 flex-col items-center justify-center p-4 '>
        <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' size={64} />
        <Typography.Text className='text-sm font-semibold'>Duc Nguyen</Typography.Text>
        <Typography.Text className='text-sm text-slate-400'>annhducit</Typography.Text>
      </div>
      <div className='mt-1 flex -translate-y-16 flex-col '>
        <Button type='text' className='rounded-none text-left text-sm text-black'>
          View profile
        </Button>
        <Divider className='my-[4px]' />
        <Button type='text' className='rounded-none text-left text-sm text-black'>
          Remove from card
        </Button>
      </div>
    </div>
  );
};

export default MemberInfo;
