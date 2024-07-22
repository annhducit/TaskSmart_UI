import { tsmAxios } from '@/configs/axios';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useMutation } from '@tanstack/react-query';
import { isStatusCodeValid } from '@/shared/components/status';
import { toast } from 'sonner';

import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const applyGenerate = async (projectId: string, taskGenerate: TasksGenerate) => {
  const data = await tsmAxios.post(`/projects/${projectId}/apply-generate`, taskGenerate);
  console.log(data);
  return data;
};

const useApplyGenerate = () => {
  const projectId = getIdProjectFromUrl();
  
//   const navigate = useNavigate();

  return useMutation<AxiosResponse<any>, Error, {  taskGenerate: TasksGenerate }>({
    mutationFn: ({ taskGenerate }) => applyGenerate(projectId, taskGenerate),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        toast.success('Apply generate successfully');
        // navigate();
      } else {
        toast.error('Failed to create card');
      }
    },
  });
};

export default useApplyGenerate;