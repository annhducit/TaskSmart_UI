import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const getBackground = async () => {
  const { data } = await tsmAxios.get<UnsplashResponse[]>('unsplash/photos?page=1&per_page=8');
  return data;
};

const useGetBackground = () => {
  return useQuery({
    queryKey: ['tsm/workspace/background'],
    queryFn: getBackground,
  });
};

export default useGetBackground;
