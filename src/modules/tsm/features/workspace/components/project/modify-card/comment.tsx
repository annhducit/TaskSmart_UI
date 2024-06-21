import { Avatar, Button, ConfigProvider, Input, List, Typography } from 'antd';
import { MessageCircle } from 'lucide-react';
import { useSelector } from '@/store';
import { useState } from 'react';
import { tsmAxios } from '@/configs/axios';
import convertDateFormat from '@/utils/dateFormat';

const CommentCard = ({ color, cardId, comments, setCard }: { 
  color: string;
  cardId: string;
  comments: CommentType[];
  setCard: (card: Card) => void;
 }) => {

  console.log(comments);
  
  const userAuthenticated = useSelector((state) => state.user.data);

  const [commentCreation, setCommentCreation] = useState<string>('');
  
  const theme = {
    components: {
      Button: {
        defaultBg: color,
      },
    },
  };

  const createComment = () => {
    const createCommentAsync = async () => {
      try {
        const res = await tsmAxios.post(`/cards/${cardId}/comment`, {
          content: commentCreation,
        });
        setCard(res.data as Card);
        setCommentCreation('');
      } catch (error) {
        console.log(error);
      }
    };
    createCommentAsync();
  }
  return (
    <div className='flex flex-col gap-2 mt-5'>
      <div className='flex items-center gap-x-2'>
        <MessageCircle color={color} className='mt-[2px] h-5 w-5 opacity-40' />
        <Typography.Text className='text-base font-semibold'>Comment</Typography.Text>
      </div>
      <List
        className='max-h-[200px] px-3 overflow-x-scroll'
        itemLayout='horizontal'
        dataSource={comments}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`http://localhost:8888/api/img/${item.user.profileImageId}`} />}
              title={<div className='flex justify-between gap-x-2'>
                  <span>{item.user.name}</span>
                  <span className='text-xs font-light'>{convertDateFormat(item.createdAt) || ""}</span>
                </div>}
              description={item.content}
            />
          </List.Item>
        )}
      />
      <div className='flex items-center gap-x-2'>
        <Avatar className='w-10' src={userAuthenticated.profileImage} />
        <Input value={commentCreation} onChange={(e)=>{setCommentCreation(e.target.value)}} placeholder='Add a comment...' className='bg-white' />
        <ConfigProvider theme={theme}>
          <Button onClick={createComment}>Comment</Button>
        </ConfigProvider>
      </div>
    </div>
  );
};


export default CommentCard;
