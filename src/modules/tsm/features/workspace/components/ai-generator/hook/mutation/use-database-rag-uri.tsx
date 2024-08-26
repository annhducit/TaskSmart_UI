import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';

const databaseRagURI = async (payload: { projectId: string; uri: string; question: string }) => {
  const { projectId, uri, question } = payload;

  const { data } = await tsmAxios.post<Statement>(`/projects/${projectId}/database-rag-by-uri`, {
    uri,
    question,
  });
  return data;
};

export const useDatabaseRagURI = () => {
  return useMutation({
    mutationFn: databaseRagURI,
  });
};
