import { Button, Divider, Dropdown, Input, Typography } from 'antd';
import TextEditor from '@/shared/components/text-editor';
import { Archive, CalendarClock, Ellipsis, Pen, Search, Trash, X } from 'lucide-react';
import { useState } from 'react';
import Tooltip from '@/shared/components/tooltip';

export const Notepad = ({ visible }: { visible: (newOpen: boolean) => void }) => {
  const [note, setNote] = useState<string>('');
  return (
    <div className='mt-2 flex  w-full flex-col gap-y-6 rounded-[12px]'>
      <div className='relative flex items-center justify-between rounded-tl-lg rounded-tr-lg bg-primary-default p-3'>
        <>
          <div className='mt-1'>
            <Search className='h-5 w-5 text-white' />
          </div>
          <div>
            <Typography.Text className='text-md font-semibold text-white'>Notepad</Typography.Text>
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: [
                    {
                      key: '1',
                      label: 'Rename',
                      onClick: () => console.log('Edit'),
                      icon: <Pen className='h-3 w-3 text-blue-500' />,
                    },
                    {
                      key: '2',
                      label: 'Archive',
                      onClick: () => console.log('Delete'),
                      icon: <Archive className='h-3 w-3 text-blue-500' />,
                    },
                    {
                      key: '3',
                      label: 'Delete',
                      onClick: () => console.log('Delete'),
                      icon: <Trash className='h-3 w-3 text-red-500' />,
                    },
                  ],
                }}
              >
                <div className='flex items-center rounded px-[6px] py-1 transition-all hover:bg-[#35a3e8]'>
                  <Ellipsis className='h-5 w-5 text-white' />
                </div>
              </Dropdown>
              <div
                className='flex items-center rounded px-[6px] py-1 transition-all hover:bg-[#35a3e8]'
                onClick={() => visible(false)}
              >
                <X className='h-5 w-5 text-white' />
              </div>
            </div>
          </div>
        </>
        {/* <SearchNote /> */}
      </div>
      <>
        <div>
          {[0, 1, 2].map((index, _item) => (
            <NoteList key={index} />
          ))}
        </div>
      </>
      <div className='absolute bottom-0 flex w-full gap-y-2'>
        <Input
          size='middle'
          placeholder='Create new note...'
          onChange={(e) => setNote(e.target.value)}
          className='border-none py-2 pl-6 outline-none focus-within:border-none focus:border-none focus:outline-none focus:ring-0'
        />

        {note.length > 0 && (
          <Button type='primary' className='h-10 w-28 rounded-none rounded-br-[4px] border-none'>
            Create
          </Button>
        )}
      </div>
    </div>
  );
};

export default Notepad;

const SearchNote = () => {
  return (
    <div className='absolute -bottom-10 flex w-[355px]  items-center gap-x-6'>
      <Input placeholder='Search note...' allowClear className='w-full' />
    </div>
  );
};

const NoteDetails = () => {
  return (
    <div className='flex flex-col gap-y-1'>
      <div>
        <TextEditor />
      </div>
      <div>
        <Divider />
      </div>
    </div>
  );
};

{
  /* <TextEditor className='h-full overflow-hidden ' /> */
}

const NoteList = () => {
  return (
    <div className='group flex flex-col px-4 transition-all'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-x-2'>
            <Typography.Text className='text-sm font-semibold'>Note of Anh Duc</Typography.Text>
          </div>
          <div className='flex items-center gap-x-2'>
            <CalendarClock className='h-3 w-3' />
            <Typography.Text className='text-xs'>12:00 PM</Typography.Text>
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
