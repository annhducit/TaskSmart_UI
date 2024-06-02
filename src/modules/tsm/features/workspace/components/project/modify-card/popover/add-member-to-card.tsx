import { Avatar, Input, Typography } from 'antd';

/**
 *
 * @returns  AddMemberToCard component
 * @author Duc Nguyen
 */
const AddMemberToCard = () => {
  return (
    <div className='flex w-[250px] flex-col gap-y-4'>
      <Typography className='text-center text-base font-semibold'>Add member</Typography>
      <Input allowClear placeholder='Search member' className='bg-white' />

      <div className='flex flex-col gap-y-2'>
        <Typography.Text className='text-sm font-normal'>Members</Typography.Text>
        <MemberItem />
        <MemberItem />
      </div>
    </div>
  );
};

export default AddMemberToCard;

const MemberItem = () => {
  return (
    <div className='flex cursor-pointer items-center gap-x-2 rounded px-2 py-1 transition-all hover:bg-slate-200'>
      <Avatar size={30} src='https://i.pravatar.cc/300' />
      <Typography.Text className='text-xs'>John Doe</Typography.Text>
    </div>
  );
};
