import { tsmAxios } from '@/configs/axios';
import { useInvalidateCategory } from '@/modules/tsm/components/hooks/use-get-categories';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const createCategory = async (category: Partial<Category>) => {
  const data = await tsmAxios.post('/categories', category);
  return data;
};

const useCreateCategory = () => {
  const invalidateCategory = useInvalidateCategory();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      if (isStatusCodeValid(data.status)) {
        toast.success('Category created successfully');
        invalidateCategory();
      } else {
        toast.error('Failed to create category');
      }
    },
  });
};

export default useCreateCategory;
