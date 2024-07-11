import { tsmAxios } from '@/configs/axios';
import { useInvalidateCategory } from '@/modules/tsm/components/hooks/use-get-categories';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const updateCategory = async (category: Category) => {
  const data = await tsmAxios.put(`/categories/${category.id}`, category);
  return data;
};

const useUpdateCategory = () => {
  const invalidateCategory = useInvalidateCategory();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      if (isStatusCodeValid(data.status)) {
        toast.success('Category updated successfully');
        invalidateCategory();
      } else {
        toast.error('Failed to update category');
      }
    },
  });
};

export default useUpdateCategory;
