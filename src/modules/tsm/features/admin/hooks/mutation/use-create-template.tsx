import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateTemplates } from '../../../templates/hooks/use-get-templates';
import { redirect } from 'react-router-dom';

const createTemplate = async (value: TSMTemplateRequest) => {
  const data = await tsmAxios.post('/templates', value);
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
        redirect('/admin/templates');
      } else {
        toast.error('Failed to create template');
      }
    },
  });
};

export default useCreateTemplate;
