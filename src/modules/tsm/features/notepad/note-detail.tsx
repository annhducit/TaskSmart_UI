import TextEditor from '@/shared/components/text-editor';
import useLocalStorage from '@/shared/hooks/use-local-storage';

const NoteDetails = () => {
  const [value] = useLocalStorage('noteId', 0);

  return (
    <div className='flex flex-col gap-y-1'>
      <p>{`This is note have ID: ${value}`}</p>
      <TextEditor />
    </div>
  );
};

export default NoteDetails;
