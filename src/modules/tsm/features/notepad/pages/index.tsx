import { useEffect, useState } from 'react';
import { Button, Dropdown, Input, Typography } from 'antd';
import { Archive, ChevronLeft, Ellipsis, Pen, Search, Trash, X } from 'lucide-react';
import NoteDetails from './details/note-detail';
import NoteList from '../components/list-note';
import NotepadEmpty from '../components/note-empty';
import useCollapse from '@/shared/hooks/use-collapse';
import Loading from '@/shared/components/loading';
import useGetNotes from '../hooks/query/use-get-notes';
import useCreateNote from '../hooks/mutation/use-create-note';
import useSearchNote from '../hooks/query/use-search-note';

export const Notepad = ({ visible }: { visible: (newOpen: boolean) => void }) => {
  const [note, setNote] = useState<string>('');
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [searchNote, setSearchNote] = useState<string>('');
  const [noteTitle, setNoteTitle] = useState<string>('');

  const [view, setView] = useCollapse<number>(0);
  const [search, setSearch] = useCollapse<boolean>(false);

  const { mutate: createNote } = useCreateNote();
  const { data: result, refetch: refetchSearch } = useSearchNote(searchNote);
  const { data: notes, refetch, isPending: isLoading } = useGetNotes(isArchived);

  const handleCreateNote = () => {
    createNote({ title: note });
    setNote('');
  };

  useEffect(() => {
    refetch();
  }, [isArchived, refetch]);

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
                  onClick={() => {
                    setSearch(false);
                    setSearchNote('');
                    refetch();
                  }}
                >
                  <X className='mt-1 h-5 w-5 text-white' />
                </div>
              )}
              <>
                {search && (
                  <SearchNote
                    onChange={(value) => {
                      setSearchNote(value);
                      refetchSearch();
                    }}
                  />
                )}
              </>
            </div>
          )}
          {!search && (
            <>
              {view === 1 && (
                <div
                  className='rounded px-[6px] hover:bg-[#33607e]'
                  onClick={() => {
                    setView(0);
                    setNoteTitle('Notepad');
                  }}
                >
                  <ChevronLeft className='mt-1 h-5 w-5 text-white' />
                </div>
              )}
              <div>
                <Typography.Text className='text-md font-semibold text-white'>
                  {view === 0 ? 'Notepad' : noteTitle}
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
                            label: `${isArchived ? 'Hide archived' : 'Show archived'}`,
                            onClick: () => setIsArchived((prev) => !prev),
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
                            icon: <Pen className='h-3 w-3 text-blue-500' />,
                          },
                          {
                            key: '2',
                            label: ` ${isArchived ? 'Unarchive' : 'Archive'}`,
                            icon: <Archive className='h-3 w-3 text-blue-500' />,
                          },
                          {
                            key: '3',
                            label: 'Delete',
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
      {notes && notes?.length > 0 ? (
        <>
          {view === 0 && (
            <div className='h-[310px] overflow-y-scroll'>
              {isLoading ? (
                <div className='flex h-full items-center justify-center'>
                  <Loading.Spinner />
                </div>
              ) : (
                <NoteList
                  data={searchNote.length > 0 ? result ?? [] : notes ?? []}
                  setView={setView}
                  setNoteTitle={setNoteTitle}
                  view={view}
                />
              )}
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
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onPressEnter={handleCreateNote}
          className='border-none py-2 pl-6 outline-none focus-within:border-none focus:border-none focus:outline-none focus:ring-0'
        />

        {note.length > 0 && (
          <Button
            type='primary'
            onClick={handleCreateNote}
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

const SearchNote = ({ onChange }: { onChange: (value: string) => void }) => {
  return (
    <div className='w-[290px] items-center gap-x-6 '>
      <Input
        size='middle'
        placeholder='Search note...'
        onChange={(e) => onChange(e.target.value)}
        allowClear
        className='rounded-lg border-none bg-[#33607e] pl-6 text-[14px] font-semibold  text-black outline-none focus-within:border-none focus:border-none focus:outline-none focus:ring-0'
      />
    </div>
  );
};
