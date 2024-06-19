import { Avatar, Button, ConfigProvider, Input, List, Typography } from 'antd';
import { color } from 'framer-motion';
import { create } from 'lodash';
import { MessageCircle } from 'lucide-react';
import { useSelector } from '@/store';

const CommentCard = ({ color }: { color: string }) => {
  
  const userAuthenticated = useSelector((state) => state.user.data);
  
  const theme = {
    components: {
      Button: {
        defaultBg: color,
      },
    },
  };
  const data = [
    {
      user: {
        name: 'John Doe',
        profileImage: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
        createdAt: '2021-09-01',
      },
      comment: 'Ant Design Title 1',
    },
    // {
    //   user: {
    //     name: 'John Doe',
    //     profileImage: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    //     createdAt: '2021-09-01',
    //   },
    //   comment: 'Ant Design Title 2',
    // },
    // {
    //   user: {
    //     name: 'John Doe',
    //     profileImage: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    //     createdAt: '2021-09-01',
    //   },
    //   comment: 'Ant Design Title 3',
    // },
    // {
    //   user: {
    //     name: 'John Doe',
    //     profileImage: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    //     createdAt: '2021-09-01',
    //   },
    //   comment: 'Ant Design Title 4',
    // },
    // {
    //   user: {
    //     name: 'John Doe',
    //     profileImage: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    //     createdAt: '2021-09-01',
    //   },
    //   comment: 'Ant Design Title 4',
    // },
    // {
    //   user: {
    //     name: 'John Doe',
    //     profileImage: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    //     createdAt: '2021-09-01',
    //   },
    //   comment: 'Ant Design Title 4',
    // },
    // {
    //   user: {
    //     name: 'John Doe',
    //     profileImage: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    //     createdAt: '2021-09-01',
    //   },
    //   comment: 'Ant Design Title 4',
    // },
    // {
    //   user: {
    //     name: 'John Doe',
    //     profileImage: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    //     createdAt: '2021-09-01',
    //   },
    //   comment: 'Ant Design Title 4',
    // },
    // {
    //   user: {
    //     name: 'John Doe',
    //     profileImage: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    //     createdAt: '2021-09-01',
    //   },
    //   comment: 'Ant Design Title 4',
    // },
  ];
  return (
    <div className='flex flex-col gap-2 mt-5'>
      <div className='flex items-center gap-x-2'>
        <MessageCircle color={color} className='mt-[2px] h-5 w-5 opacity-40' />
        <Typography.Text className='text-base font-semibold'>Comment</Typography.Text>
      </div>
      <List
        className='max-h-[200px] px-3 overflow-x-scroll'
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.user.profileImage}`} />}
              title={<div className='flex justify-between gap-x-2'>
                  <span>{item.user.name}</span>
                  <span className='text-xs font-light'>{item.user.createdAt}</span>
                </div>}
              description={item.comment}
            />
          </List.Item>
        )}
      />
      <div className='flex items-center gap-x-2'>
        <Avatar className='w-10' src={userAuthenticated.profileImage} />
        <Input placeholder='Add a comment...' className='bg-white' />
        <ConfigProvider theme={theme}>
          <Button>Comment</Button>
        </ConfigProvider>
      </div>
    </div>
  );
};


export default CommentCard;
