import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateNote } from '../query/use-get-notes';

const removeNote = async (noteId: string) => {
  const { data } = await tsmAxios.delete(`/note/${noteId}`);
  return data;
};

const useRemoveNote = () => {
  const invalidateNote = useInvalidateNote();

  return useMutation({
    mutationFn: (noteId: string) => removeNote(noteId),
    onSuccess() {
      invalidateNote();
    },
  });
};

export default useRemoveNote;
