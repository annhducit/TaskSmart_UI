import { useSelector } from '@/stores';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckRole = (props: PropsWithChildren) => {
  const { children } = props;

  const navigate = useNavigate();
  const role = useSelector((store) => store.user?.data?.role)?.toString();

  useEffect(() => {
    if (role.includes('ADMIN')) {
      navigate('/admin/dashboard');
      return;
    }
  }, [role, navigate]);

  return children;
};

export default CheckRole;
