import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateNote } from '../query/use-get-notes';

const editNote = async (note: Partial<TSMNote>) => {
  const { data } = await tsmAxios.patch<BaseResponseType<TSMNote>>(`/note/${note.id}`, note);
  return data;
};

const useEditNote = () => {
  const invalidateNote = useInvalidateNote();
  return useMutation({
    mutationFn: (note: Partial<TSMNote>) => editNote(note),
    onSuccess(data) {
      if (data.status !== 200) {
        toast.error(data.message);
      } else {
        invalidateNote();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useEditNote;
