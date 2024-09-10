import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useInviteProject from '../hooks/query/use-get-invite-project';
import useInviteWorkspace from '../hooks/query/use-get-invite-workspace';
import { useSelector } from '@/stores';

export default function InviteHandler() {
  const { projectId, inviteCode, workspaceId } = useParams<{
    projectId?: string;
    inviteCode?: string;
    workspaceId?: string;
  }>();

  if (projectId && inviteCode) {
    return <InviteProject projectId={projectId} inviteCode={inviteCode} />;
  }

  if (workspaceId && inviteCode) {
    return <InviteWorkspace workspaceId={workspaceId} inviteCode={inviteCode} />;
  }

  return <div>Invalid Link</div>;
}

function InviteProject({ projectId, inviteCode }: { projectId: string; inviteCode: string }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);

  const { data, isPending: isLoading } = useInviteProject({ projectId, inviteCode });

  useEffect(() => {
    if (isLoading) return;

    if (data && user) {
      navigate(`/tsm/project/${projectId}`);
    } else {
      navigate('/auth/sign-in');
    }
  }, [data, user, isLoading, navigate, projectId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Invalid Link</div>;
}

function InviteWorkspace({ workspaceId, inviteCode }: { workspaceId: string; inviteCode: string }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);

  const { data, isPending: isLoading } = useInviteWorkspace({ workspaceId, inviteCode });

  useEffect(() => {
    if (isLoading) return;

    if (data && user) {
      navigate(`/tsm/workspace/${workspaceId}`);
    } else {
      navigate('/auth/sign-in');
    }
  }, [data, user, isLoading, navigate, workspaceId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Invalid Link</div>;
}
