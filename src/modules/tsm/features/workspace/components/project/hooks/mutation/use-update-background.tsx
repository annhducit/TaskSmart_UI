import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateProject } from '../query/use-get-project';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { toast } from 'sonner';
import { useDialogContext } from '@/shared/components/dialog/provider';

const updateBackground = async (payload: { image: string; projectId: string }) => {
  const { image, projectId } = payload;

  const param = image ? `?background=${image}` : '';

  const data = await tsmAxios.put<string>(`projects/${projectId}/background${param}`);
  return data;
};

const useUpdateBackground = () => {
  const projectId = getIdProjectFromUrl();

  const { onClose } = useDialogContext();

  const invalidateProject = useInvalidateProject(projectId);
  return useMutation({
    mutationFn: (payload: { image: string; projectId: string }) => updateBackground(payload),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        toast.success('Background updated successfully');
        invalidateProject();
        onClose();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateBackground;
