import { Typography } from 'antd';
import emptyNote from '@/assets/images/note-empty.png';

export default function NotepadEmpty() {
  return (
    <div className='mx-0 flex flex-col gap-y-4 text-center'>
      <div className='mx-auto h-[120px] w-[120px]'>
        <img src={emptyNote} alt='' className='h-full w-full' />
      </div>
      <div>
        <Typography.Text className='mx-auto block w-56 text-base font-semibold'>
          This is your own personal note taking machine
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className='text-xs'>
          Sugession: Start by creating a new note
        </Typography.Text>
        <ul className='mt-1 list-none text-xs'>
          <li>Plan for today</li>
          <li>Things I'm thinking about</li>
          <li>New ideas</li>
        </ul>
      </div>
    </div>
  );
}
