import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const inviteProject = async (payload: { projectId: string; inviteCode: string }) => {
  const { projectId, inviteCode } = payload;
  const { data } = await tsmAxios.get<{ data: Project }>(
    `/projects/invite/${projectId}/${inviteCode}`
  );
  return data;
};

const useInviteProject = (payload: { projectId: string; inviteCode: string }) => {
  return useQuery({
    queryKey: ['invite', payload],
    queryFn: () => inviteProject(payload),
  });
};

export default useInviteProject;
