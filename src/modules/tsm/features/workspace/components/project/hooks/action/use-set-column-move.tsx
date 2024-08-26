import { tsmAxios } from '@/configs/axios';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const columnMove = async (projectId: string, column: ListCard[]) => {
  await tsmAxios.post(`/projects/${projectId}/move/listcard`, {
    ids: column.map((col) => col.id),
  });
};

const useSetColumnMove = () => {
  const projectId = getIdProjectFromUrl();
  return useMutation({
    mutationFn: (column: ListCard[]) => columnMove(projectId, column),
    onSuccess() {
      toast.success('Column moved successfully');
    },
  });
};

export default useSetColumnMove;
