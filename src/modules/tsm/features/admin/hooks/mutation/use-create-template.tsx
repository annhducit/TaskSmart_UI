import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateTemplates } from '../../../templates/hooks/use-get-templates';
import { useNavigate } from 'react-router-dom';

const createTemplate = async (value: TSMTemplateRequest) => {
  console.log(value)
  const data = await tsmAxios.post('/templates', value);
  return data;
};

const useCreateTemplate = () => {
  const invalidateTemplates = useInvalidateTemplates();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createTemplate,

    onSuccess: (data) => {
      if (isStatusCodeValid(data.status)) {
        toast.success('Template created successfully');
        invalidateTemplates();
        navigate('/admin/template', { replace: true });
      } else {
        toast.error('Failed to create template');
      }
    },
  });
};

export default useCreateTemplate;
