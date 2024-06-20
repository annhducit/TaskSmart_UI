import { Navigate, useLocation } from 'react-router-dom';
import { get } from 'lodash';

const SignInNavigate = () => {
  const { state } = useLocation();

  return (
    <Navigate
      replace
      to={get(state, 'url', '/tsm/home')}
      state={{ redirectByLoginUrl: Boolean(get(state, 'url', '')) }}
    />
  );
};

export default SignInNavigate;
