import Tooltip from '@/shared/components/tooltip';
import useLocalStorage from '@/shared/hooks/use-local-storage';
import { Divider, Typography } from 'antd';
import { Archive, CalendarClock, Pen, Trash } from 'lucide-react';

type NoteListProps = {
  data: TSMNote;
  view: number;
  setView: (value: number) => void;
};
const NoteList = ({ props }: { props: NoteListProps }) => {
  const { data, setView } = props;
  const [, setNote] = useLocalStorage<number>('noteId', 0);
  const handleClickNote = (id: number) => {
    id && setNote(id);
    setView(1);
  };

  return (
    <div className='group flex flex-col px-4 transition-all'>
      <div className='flex items-center justify-between'>
        <div
          className='flex w-[230px] cursor-pointer flex-col'
          onClick={() => handleClickNote(data.id)}
        >
          <div className='flex items-center gap-x-2'>
            <Typography.Text className='text-sm font-semibold'>{data.title}</Typography.Text>
          </div>
          <div className='flex items-center gap-x-2 opacity-60'>
            <CalendarClock className='h-3 w-3' />
            <Typography.Text className='text-xs'>{data.createdAt}</Typography.Text>
          </div>
        </div>
        <div className='hidden items-center gap-x-3 group-hover:flex '>
          <Tooltip title='Rename' color='black'>
            <div className='cursor-pointer rounded px-1 hover:bg-slate-200'>
              <Pen className='h-[14px] w-[14px] ' />
            </div>
          </Tooltip>
          <Tooltip title='Archive' color='black'>
            <div className='cursor-pointer rounded px-1 hover:bg-slate-200'>
              <Archive className='h-[14px] w-[14px] ' />
            </div>
          </Tooltip>
          <Tooltip title='Delete' color='black'>
            <div className='cursor-pointer rounded px-1 hover:bg-slate-200'>
              <Trash className='h-[14px] w-[14px] text-red-500' />
            </div>
          </Tooltip>
        </div>
      </div>

      <div>
        <Divider className='my-2' />
      </div>
    </div>
  );
};

export default NoteList;
