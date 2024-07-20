import { tsmAxios } from '@/configs/axios';
import Loading from '@/shared/components/loading';
import { useDispatch } from '@/store';
import { signInGoogleAction } from '@/store/auth/action';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function OAuthGoogleCallBack() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];
      tsmAxios.post(`/auth/oauth/google?code=${authCode}`).then((response) => {
        dispatch(signInGoogleAction(response)).then((res) => {
          if (res.meta.requestStatus === 'rejected') {
            toast.error('Sign in failed', {
              description: 'Please check your username or password again',
            });
          } else {
            toast.success('Sign in successfully');
            navigate('/tsm/home');
          }
        });
      });
    }
  }, []);
  return <Loading.Page size='full' />;
}

function OAuthGitHubCallBack() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];
      tsmAxios.post(`/auth/oauth/github?code=${authCode}`).then((response) => {
        dispatch(signInGoogleAction(response)).then((res) => {
          if (res.meta.requestStatus === 'rejected') {
            toast.error('Sign in failed', {
              description: 'Please check your username or password again',
            });
          } else {
            toast.success('Sign in successfully');
            navigate('/tsm/home');
          }
        });
      });
    }
  }, []);
  return <Loading.Page size='full' />;
}
export { OAuthGoogleCallBack, OAuthGitHubCallBack };
