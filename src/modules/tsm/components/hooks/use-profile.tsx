import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useQuery } from '@tanstack/react-query';

const getProfile = async () => {
  const res = await tsmAxios.get<UserData>(`users/profile`);
  return res.data;
};

const useGetProfile = () => {
  const { queryKey } = useUserQueryKey();
  return useQuery({
    queryKey,
    queryFn: getProfile,
  });
};

export default useGetProfile;

function useUserQueryKey() {
  const queryKey = ['tsm/profile'];
  return {
    queryKey,
  };
}

export const useInvalidateProfile = () => {
  const { queryKey } = useUserQueryKey();
  return () =>
    queryClient.invalidateQueries({
      type: 'all',
      queryKey,
    });
};
