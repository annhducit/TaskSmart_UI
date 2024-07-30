import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';

const databaseRag = async (payload: { projectId: string; context: string; question: string }) => {
  const { projectId, context, question } = payload;

  const { data } = await tsmAxios.post<DatabaseRAGResponse>(`/projects/${projectId}/database-rag`, {
    context,
    question,
  });
  return data;
};

export const useDatabaseRag = () => {
  return useMutation({
    mutationFn: databaseRag,
  });
};
