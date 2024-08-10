import Tooltip from '@/shared/components/tooltip';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';
import { useSortable } from '@dnd-kit/sortable';
import { Avatar, Popover, Typography } from 'antd';
import { Paperclip, Rss, Text, Trash, User } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';
import useRemoveCardConfirm from '../hooks/action/use-delete-card-confirm';

interface Props {
  card: Card;
  deleteTask?: (id: Id) => void;
  updateTask?: (id: Id, content: string) => void;
}

function TaskCard({ card }: Props) {
  const searchParams = useSearchParams();

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: {
      type: 'Task',
      card,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const defaultCardColor = '1677ff';

  const removeCard = useRemoveCardConfirm();
  return (
    <>
      <>
        {isDragging && (
          <div
            ref={setNodeRef}
            style={style}
            className='relative flex h-[120px] min-h-[120px] cursor-grab items-start rounded-xl bg-black/50 p-2.5 text-left opacity-30 hover:ring-2 hover:ring-inset hover:ring-primary-default'
          />
        )}
      </>
      {!isDragging && (
        <>
          <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() =>
              searchParams.set({
                [SEARCH_PARAMS.DIALOG]: SEARCH_PARAMS_VALUE.CARD,
                [SEARCH_PARAMS.ID]: card.id,
              })
            }
            className='flex cursor-pointer flex-col rounded-lg border border-solid border-slate-300 shadow-lg transition-all hover:border-[2px] hover:border-primary-default'
          >
            <div
              className='h-[70px] w-full rounded-t-[6px]'
              style={{
                backgroundColor: `#${card.color || defaultCardColor}`,
              }}
            />
            <div className='flex items-center justify-between rounded-b-xl bg-white p-2'>
              <div className='flex flex-col gap-y-1'>
                <div className='flex flex-col gap-y-1'>
                  <Typography.Text className='w-[140px] truncate text-xs font-semibold'>
                    {card.name}
                  </Typography.Text>

                  <div className='flex items-center gap-x-1'>
                    <Tooltip
                      title='The card already has a description'
                      color='black'
                      placement='bottom'
                    >
                      <div className='flex items-center rounded-sm  p-1 transition-all hover:bg-[#091E4224]'>
                        <Text className='h-3 w-3 text-slate-500' />
                      </div>
                    </Tooltip>
                    <Tooltip color='black' title='Followed' placement='bottom'>
                      <div className='flex items-center rounded-sm p-1 transition-all hover:bg-[#091E4224]'>
                        <Rss className='h-3 w-3 text-slate-500' />
                      </div>
                    </Tooltip>
                    <Tooltip
                      color='black'
                      title='Attactments'
                      className='text-[10px]'
                      placement='bottom'
                    >
                      <div className='flex items-center rounded-sm p-[2px] transition-all hover:bg-[#091E4224]'>
                        <Paperclip className='h-3 w-3 text-slate-500' />
                        <Typography.Text className='ml-[1px] text-xs'>3</Typography.Text>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                <div className='flex items-center'>
                  {card.implementers?.map((user) => (
                    <Avatar.Group maxCount={2} size='small' key={user.userId}>
                      <Tooltip title={user.name} key={user.userId}>
                        <Popover trigger='click' placement='bottom'>
                          <Avatar
                            src={`http://localhost:8888/api/image/${user.profileImagePath}`}
                            icon={<User size='12' />}
                          />
                        </Popover>
                      </Tooltip>
                    </Avatar.Group>
                  ))}
                </div>
                <Tooltip title='Remove card'>
                  <div
                    onClick={() => removeCard(card.id)}
                    className='flex items-center rounded-sm  p-1 transition-all hover:bg-[#091E4224]'
                  >
                    <Trash className='h-3 w-3 text-red-500 opacity-70' />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TaskCard;
