import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';

const removeWorkspace = async (workspaceId: string) => {
  await tsmAxios.delete(`/workspaces/${workspaceId}`);
};

const useRemoveWorkspace = () => {
  return useMutation({
    mutationFn: (workspaceId: string) => removeWorkspace(workspaceId),
    onSuccess() {
      // Do something after removing workspace
    },
  });
};

export default useRemoveWorkspace;
