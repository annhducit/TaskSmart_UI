import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateTemplates } from '../../../templates/hooks/use-get-templates';

const removeTemplate = async (id: string) => {
  const res = await tsmAxios.put(`/templates/${id}/status`);
  return res;
};

const useRemoveTemplate = () => {
  const invalidateTemplates = useInvalidateTemplates();
  return useMutation({
    mutationFn: removeTemplate,
    onSuccess: (data) => {
      if (isStatusCodeValid(data.status)) {
        toast.success('Template removed successfully');
        invalidateTemplates();
      } else {
        toast.error('Failed to remove template');
      }
    },
  });
};

export default useRemoveTemplate;
