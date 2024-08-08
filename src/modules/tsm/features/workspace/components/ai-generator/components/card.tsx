import Tooltip from '@/shared/components/tooltip';
import useSearchParams from '@/shared/hooks/use-search-params';
import { useSortable } from '@dnd-kit/sortable';
import { Typography } from 'antd';
import { Paperclip, Rss, Text, Trash2 } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  card: CardGenerate;
  deleteTask?: (id: string) => void;
  updateTask?: (id: Id, content: string) => void;
}

function TaskCardAI({ card, deleteTask }: Props) {
  const searhParams = useSearchParams();

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

  // if (isDragging) {
  //   return (
     
  //   );
  // }

  const defaultCardColor = '1677ff';

  return (
    <>
    <>
    {isDragging && (
       <div
       ref={setNodeRef}
       style={style}
       className='relative flex h-[100px] min-h-[170px] cursor-grab items-start rounded-xl bg-black/50 p-2.5 text-left opacity-30 hover:ring-2 hover:ring-inset hover:ring-primary-default'
     />
    )}
    </>
    {!isDragging && (

      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() =>
          searhParams.set({})
        }
        className='flex cursor-pointer flex-col rounded-lg border border-solid border-slate-300 shadow-lg transition-all hover:border-[2px] hover:border-primary-default'
      >
        <div
          className='h-[115px] w-full rounded-t-[6px]'
          style={{
            backgroundColor: `#${defaultCardColor}`,
          }}
        />
        <div className='flex items-center justify-between p-2 bg-white rounded-b-xl'>
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
                    <Text className='w-3 h-3 text-slate-500' />
                  </div>
                </Tooltip>
                <Tooltip color='black' title='Followed' placement='bottom'>
                  <div className='flex items-center rounded-sm p-1 transition-all hover:bg-[#091E4224]'>
                    <Rss className='w-3 h-3 text-slate-500' />
                  </div>
                </Tooltip>
                <Tooltip
                  color='black'
                  title='Attactments'
                  className='text-[10px]'
                  placement='bottom'
                >
                  <div className='flex items-center rounded-sm p-[2px] transition-all hover:bg-[#091E4224]'>
                    <Paperclip className='w-3 h-3 text-slate-500' />
                    <Typography.Text className='ml-[1px] text-xs'>3</Typography.Text>
                  </div>
                </Tooltip>
                   <div className='z-10 ml-2 flex items-center rounded-sm p-[2px] transition-all hover:bg-[#091E4224]' onClick={() =>
                  deleteTask &&  deleteTask(card.id)
           
          }>
          <Trash2 className='w-3 h-3 text-slate-500' />

          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default TaskCardAI;
