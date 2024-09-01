import { tsmAxios } from '@/configs/axios';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { toast } from 'sonner';

const moveCard = async (projectId: string, columns: ListCard[], cards: Card[]) => {
  const ids = columns.map((col) => ({
    listCardId: col.id,
    cardIds: cards.filter((card) => card.listCardId === col.id).map((card) => card.id),
  }));
  return tsmAxios.post(`/projects/${projectId}/move/card`, { ids });
};

const useSetCardMove = () => {
  const projectId = getIdProjectFromUrl();
  return useMutation<AxiosResponse<any>, Error, { columns: ListCard[]; cards: Card[] }>({
    mutationFn: ({ columns, cards }) => moveCard(projectId, columns, cards),
    onSuccess() {
      toast.success('Card moved successfully');
    },
  });
};
export default useSetCardMove;
