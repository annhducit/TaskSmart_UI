import { tsmAxios } from '@/configs/axios';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useMutation } from '@tanstack/react-query';
import { isStatusCodeValid } from '@/shared/components/status';
import { toast } from 'sonner';

import type { AxiosResponse } from 'axios';
import { useInvalidateProject } from '../../../project/hooks/query/use-get-project';

const applyGenerate = async (projectId: string, taskGenerate: TasksGenerate) => {
  const handleGen: TasksGenerateRequest = {
    listCards: taskGenerate.listCards.map((listCard) => {
      return {
        ...listCard,
        cards: listCard.cards.map((card) => {
          return {
            ...card,
            startTime: card.startTime?new Date(card.startTime) : null,
            estimate: card.estimate?new Date(card.estimate) : null,
          };
        }),
      };
    }) as ListCardGenerateRequest[],
  }
  const data = await tsmAxios.post(`/projects/${projectId}/apply-generate`, handleGen);
  return data;
};

const useApplyGenerate = () => {
  const projectId = getIdProjectFromUrl();

  const invalidateProject = useInvalidateProject(projectId);

  return useMutation<AxiosResponse<any>, Error, { taskGenerate: TasksGenerate }>({
    mutationFn: ({ taskGenerate }) => applyGenerate(projectId, taskGenerate),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        toast.success('Apply generate successfully');

        invalidateProject();

        window.location.replace(`tsm/project/${projectId}?view=project`);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useApplyGenerate;
