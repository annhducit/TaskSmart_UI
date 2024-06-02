import { Avatar, Button, Input } from 'antd';

const CommentCard = () => {
  return (
    <div className='flex items-center gap-x-2'>
      <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' />
      <Input placeholder='Add a comment...' className='bg-white' />
      <Button type='primary'>Comment</Button>
    </div>
  );
};

export default CommentCard;
