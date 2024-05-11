import { Outlet } from 'react-router-dom';
import Header from '../tsm/components/header';

/**
 *
 * @returns  Dashboard layout component
 * @author Duc Nguyen
 */
const DashboardLayout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default DashboardLayout;
