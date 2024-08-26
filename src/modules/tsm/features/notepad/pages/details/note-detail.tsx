import TextEditor from '@/shared/components/text-editor';
import useLocalStorage from '@/shared/hooks/use-local-storage';
import useGetNote from '../../hooks/query/use-get-note';
import useEditNote from '../../hooks/mutation/use-edit-note';
import { useEffect } from 'react';

const NoteDetails = () => {
  const [value] = useLocalStorage('noteId', 0);

  const { data: note, refetch } = useGetNote(String(value));
  const { mutate: editNote } = useEditNote();

  const handleEditNote = (content: string) => {
    editNote({
      id: note?.id || '',
      content: content,
    });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className='flex flex-col gap-y-1'>
      <TextEditor
        onChange={(value) => {
          handleEditNote(value as string);
        }}
        initialContent={note?.content || ''}
      />
    </div>
  );
};

export default NoteDetails;
