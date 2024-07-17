import Tooltip from '@/shared/components/tooltip';
import useLocalStorage from '@/shared/hooks/use-local-storage';
import { Divider, Input, InputRef, Typography } from 'antd';
import { Archive, ArchiveIcon, CalendarClock, Pen, Save, Trash } from 'lucide-react';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/shared/constant/date';
import useRemoveNote from '../hooks/action/use-remove-note';
import useEditNote from '../hooks/mutation/use-edit-note';
import { useEffect, useRef, useState } from 'react';
import TextEditor from '@/shared/components/text-editor';

type NoteListProps = {
  data: TSMNote[];
  view: number;
  setView: (value: number) => void;
  setNoteTitle: (value: string) => void;
};

const NoteList = ({ data, setView, setNoteTitle }: NoteListProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editNoteId, setEditNoteId] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const inpRef = useRef<InputRef>(null);

  const [, setNoteId] = useLocalStorage<string>('noteId', '');
  const { mutate: removeNote } = useRemoveNote();
  const { mutate: editNote } = useEditNote();

  const handleClickNote = (id: string, title: string) => {
    setNoteTitle(title);
    if (id) {
      setNoteId(id);
      setView(1);
    }
  };

  const handleEditNote = (item: TSMNote) => {
    if (isEdit && editNoteId === item.id) {
      editNote({
        id: item.id,
        title,
      });
      setIsEdit(false);
      setTitle('');
    } else {
      setTitle(item.title);
      setIsEdit(true);
      setEditNoteId(item.id);
    }
  };
  useEffect(() => {
    if (isEdit && inpRef.current && editNoteId) {
      inpRef.current?.focus();
    }
  }, [isEdit, editNoteId]);

  return (
    <>
      {data?.map((item) => (
        <div key={item.id} className='flex flex-col px-4 transition-all group'>
          <div className='flex items-center justify-between'>
            <div
              className='flex w-[230px] cursor-pointer flex-col gap-y-1'
              onClick={() => {
                if (!isEdit || editNoteId !== item.id) {
                  handleClickNote(item.id, item.title);
                }
              }}
            >
              <div className='flex items-center gap-x-2'>
                {item.archived && <ArchiveIcon className='w-3 h-3 opacity-40' />}
                {isEdit && editNoteId === item.id ? (
                  <Input
                    ref={inpRef}
                    className='my-1 w-[230px] border-none bg-transparent text-sm font-semibold'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onPressEnter={() => handleEditNote(item)}
                  />
                ) : (
                  <Typography.Text className='text-sm font-semibold'>{item.title}</Typography.Text>
                )}
              </div>

              <TextEditor
                className='w-64 text-xs truncate'
                style={{
                  fontSize: '8px',
                }}
                initialContent={item.content as string}
              />

              <div className='flex items-center float-right gap-x-2 opacity-40 '>
                <Typography.Text className='text-xs italic'>
                  {dayjs(item.createdAt).format(DATE_TIME_FORMAT)}
                </Typography.Text>
                <CalendarClock className='w-3 h-3' />
              </div>
            </div>
            <div className='items-center hidden gap-x-3 group-hover:flex'>
              {isEdit && editNoteId === item.id ? (
                <Tooltip title='Save' color='black'>
                  <div
                    onClick={() => handleEditNote(item)}
                    className='px-1 rounded cursor-pointer hover:bg-slate-200'
                  >
                    <Save className='h-[14px] w-[14px]' />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title='Rename' color='black'>
                  <div
                    onClick={() => handleEditNote(item)}
                    className='px-1 rounded cursor-pointer hover:bg-slate-200'
                  >
                    <Pen className='h-[14px] w-[14px]' />
                  </div>
                </Tooltip>
              )}
              <Tooltip title={item.archived ? 'Unarchive' : 'Archive'} color='black'>
                <div
                  onClick={() =>
                    editNote({
                      id: item.id,
                      archived: !item.archived,
                    })
                  }
                  className='px-1 rounded cursor-pointer hover:bg-slate-200'
                >
                  <Archive className='h-[14px] w-[14px]' />
                </div>
              </Tooltip>
              <Tooltip title='Delete' color='black'>
                <div
                  onClick={() => removeNote(item.id)}
                  className='px-1 rounded cursor-pointer hover:bg-slate-200'
                >
                  <Trash className='h-[14px] w-[14px] text-red-500' />
                </div>
              </Tooltip>
            </div>
          </div>
          <Divider className='my-2' />
        </div>
      ))}
    </>
  );
};

export default NoteList;
