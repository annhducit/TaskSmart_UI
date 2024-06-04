import { useState } from 'react';
import { Button, Dropdown, Input, Typography } from 'antd';
import { Archive, ChevronLeft, Ellipsis, Pen, Search, Trash, X } from 'lucide-react';
import NoteDetails from './note-detail';
import NoteList from './list-note';
import { noteSample } from './data';
import useCollapse from '@/shared/hooks/use-collapse';
import NotepadEmpty from './note-empty';
import { toast } from 'sonner';

export const Notepad = ({ visible }: { visible: (newOpen: boolean) => void }) => {
  const [note, setNote] = useState<string>('');

  const [view, setView] = useCollapse<number>(0);
  const [search, setSearch] = useCollapse<boolean>(false);

  const openToast = () => {
    toast.success('Create note successfully!');
  };
  return (
    <div className='z-[99999] mt-2 flex flex-col gap-y-6 rounded-[12px]'>
      {/* Header note */}
      <div className='relative flex items-center justify-between rounded-tl-lg rounded-tr-lg bg-[#263e50] p-3'>
        <>
          {view === 0 && (
            <div className='flex items-center gap-x-2'>
              {!search ? (
                <div
                  className='rounded px-[6px] hover:bg-[#33607e]'
                  onClick={() => setSearch(true)}
                >
                  <Search className='mt-1 h-5 w-5 text-white' />
                </div>
              ) : (
                <div
                  className='rounded px-[6px] hover:bg-[#33607e]'
                  onClick={() => setSearch(false)}
                >
                  <X className='mt-1 h-5 w-5 text-white' />
                </div>
              )}
              <> {search && <SearchNote />}</>
            </div>
          )}
          {!search && (
            <>
              {view === 1 && (
                <div className='rounded px-[6px] hover:bg-[#33607e]' onClick={() => setView(0)}>
                  <ChevronLeft className='mt-1 h-5 w-5 text-white' />
                </div>
              )}
              <div>
                <Typography.Text className='text-md font-semibold text-white'>
                  Notepad
                </Typography.Text>
              </div>
              <div>
                <div className='flex items-center gap-x-2'>
                  {view === 0 && (
                    <Dropdown
                      trigger={['click']}
                      menu={{
                        items: [
                          {
                            key: '1',
                            label: 'Show archived',
                            onClick: () => console.log('Delete'),
                            icon: <Archive className='h-3 w-3 text-blue-500' />,
                          },
                        ],
                      }}
                    >
                      <div className='flex items-center rounded px-[6px] py-1 transition-all hover:bg-[#33607e]'>
                        <Ellipsis className='h-5 w-5 text-white' />
                      </div>
                    </Dropdown>
                  )}
                  {view === 1 && (
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
                      <div className='flex items-center rounded px-[6px] py-1 transition-all hover:bg-[#33607e]'>
                        <Ellipsis className='h-5 w-5 text-white' />
                      </div>
                    </Dropdown>
                  )}

                  <div
                    className='flex items-center rounded px-[6px] py-1 transition-all hover:bg-[#33607e]'
                    onClick={() => visible(false)}
                  >
                    <X className='h-5 w-5 text-white' />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      </div>
      {/* Header note */}

      {/* Body note */}
      {noteSample.length > 0 ? (
        <>
          {view === 0 && (
            <div className='h-[310px] overflow-y-scroll'>
              {noteSample.map((note) => (
                <NoteList
                  props={{
                    data: note,
                    view: view,
                    setView: setView,
                  }}
                  key={note.id}
                />
              ))}
            </div>
          )}
          {view === 1 && (
            <div className='h-[310px] overflow-y-scroll'>
              <NoteDetails />
            </div>
          )}
        </>
      ) : (
        <NotepadEmpty />
      )}
      {/* Body note */}

      {/* Footer note */}
      <div className='absolute bottom-0 flex w-full gap-y-2'>
        <Input
          size='middle'
          placeholder='Create new note...'
          onChange={(e) => setNote(e.target.value)}
          className='border-none py-2 pl-6 outline-none focus-within:border-none focus:border-none focus:outline-none focus:ring-0'
        />

        {note.length > 0 && (
          <Button
            type='primary'
            onClick={openToast}
            className='h-10 w-28 rounded-none rounded-br-[4px] border-none'
          >
            Create
          </Button>
        )}
      </div>
      {/* Footer note */}
    </div>
  );
};

export default Notepad;

const SearchNote = () => {
  return (
    <div className='w-[290px] items-center gap-x-6 '>
      <Input
        size='middle'
        placeholder='Search note...'
        allowClear
        className='rounded-lg border-none bg-[#33607e] pl-6 text-[14px] font-semibold  text-black outline-none focus-within:border-none focus:border-none focus:outline-none focus:ring-0'
      />
    </div>
  );
};
