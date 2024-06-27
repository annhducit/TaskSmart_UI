import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useQuery } from '@tanstack/react-query';

const getImage = (imagePath: string) => {
  return `http://localhost:8888/api/image/${imagePath}`;
};

const useGetImage = (imagePath: string) => {
  return useQuery({
    queryKey: ['tsm/image', imagePath],
    queryFn: () => getImage(imagePath),
  });
};

export default useGetImage;

export const useInvalidateProfileImage = (imagePath: string) => {
  return () => {
    return queryClient.invalidateQueries({
      type: 'all',
      queryKey: ['tsm/image', imagePath],
    });
  };
};
