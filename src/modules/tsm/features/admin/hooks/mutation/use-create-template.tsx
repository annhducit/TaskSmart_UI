import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateTemplates } from '../../../templates/hooks/use-get-templates';

const createTemplate = async (value: Partial<TSMTemplateDetail>) => {
  const data = await tsmAxios.post('/api/templates', value);
  return data;
};

const useCreateTemplate = () => {
  const invalidateTemplates = useInvalidateTemplates();
  return useMutation({
    mutationFn: createTemplate,

    onSuccess: (data) => {
      if (isStatusCodeValid(data.status)) {
        toast.success('Template created successfully');
        invalidateTemplates();
      } else {
        toast.error('Failed to create template');
      }
    },
  });
};

export default useCreateTemplate;
