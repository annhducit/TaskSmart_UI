import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useInviteProject from '../hooks/query/use-get-invite-project';
import { useSelector } from '@/store';

const Invite = () => {
  const navigate = useNavigate();
  const { projectId, inviteCode } = useParams<{ projectId: string; inviteCode: string }>();

  const user = useSelector((state) => state.user.data);

  if (!projectId || !inviteCode) {
    return <div>Invalid Link</div>;
  }

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
};

export default Invite;
