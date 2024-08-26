import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useQuery } from '@tanstack/react-query';

const getNotes = async (archived: boolean) => {
  const query = archived === true ? `?archived=${true}` : ``;
  const { data } = await tsmAxios.get<BaseResponseType<TSMNote[]>>(`/note${query}`);
  return data.data;
};

const useGetNotes = (archived: boolean) => {
  const { queryKey } = useNoteQueryKey();
  return useQuery({
    queryKey,
    queryFn: () => getNotes(archived),
  });
};

export default useGetNotes;

function useNoteQueryKey() {
  const queryKey = ['tsm/note'];
  return {
    queryKey,
  };
}

export const useInvalidateNote = () => {
  const { queryKey } = useNoteQueryKey();
  return () =>
    queryClient.invalidateQueries({
      type: 'all',
      queryKey,
    });
};
