import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateNote } from '../query/use-get-notes';

const createNote = async (note: Partial<TSMNote>) => {
  const { data } = await tsmAxios.post<BaseResponseType<TSMNote>>('/note', note);
  return data;
};

const useCreateNote = () => {
  const invalidateNote = useInvalidateNote();

  return useMutation({
    mutationFn: (note: Partial<TSMNote>) => createNote(note),
    onSuccess(data) {
      if (data.status !== 201) {
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
export default useCreateNote;
