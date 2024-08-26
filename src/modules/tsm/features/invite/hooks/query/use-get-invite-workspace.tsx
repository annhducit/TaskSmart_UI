import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const inviteWorkspace = async (payload: { workspaceId: string; inviteCode: string }) => {
  const { workspaceId, inviteCode } = payload;
  const { data } = await tsmAxios.get<{ data: Workspace }>(
    `/workspaces/invite/${workspaceId}/${inviteCode}`
  );
  return data;
};

const useInviteWorkspace = (payload: { workspaceId: string; inviteCode: string }) => {
  return useQuery({
    queryKey: ['invite/workspace', payload],
    queryFn: () => inviteWorkspace(payload),
  });
};

export default useInviteWorkspace;
