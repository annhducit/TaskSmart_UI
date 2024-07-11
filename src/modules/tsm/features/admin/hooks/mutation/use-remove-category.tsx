import { tsmAxios } from '@/configs/axios';
import { useInvalidateCategory } from '@/modules/tsm/components/hooks/use-get-categories';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const removeCategory = async (categoryId: string) => {
  const res = await tsmAxios.delete(`/categories/${categoryId}`);
  return res;
};

const useRemoveCategory = () => {
  const invalidateCategory = useInvalidateCategory();
  return useMutation({
    mutationFn: removeCategory,
    onSuccess: (data) => {
      if (isStatusCodeValid(data.status)) {
        toast.success('Category removed successfully');
        invalidateCategory();
      } else {
        toast.error('Failed to remove category');
      }
    },
  });
};

export default useRemoveCategory;
