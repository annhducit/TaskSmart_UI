import { Navigate, useLocation } from 'react-router-dom';

const AuthNavigate = () => {
  const { pathname, search } = useLocation();

  return <Navigate replace to='/auth/sign-in' state={{ url: pathname + search }} />;
};

export default AuthNavigate;
