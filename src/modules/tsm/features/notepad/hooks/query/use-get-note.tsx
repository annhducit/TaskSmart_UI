import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const getNote = async (noteId: string) => {
  const { data } = await tsmAxios.get<BaseResponseType<TSMNote>>(`/note/${noteId}`);
  return data.data;
};

const useGetNote = (noteId: string) => {
  return useQuery({
    queryKey: ['tsm/note/detail', noteId],
    queryFn: () => getNote(noteId),
  });
};

export default useGetNote;
