import { Outlet } from 'react-router-dom';

/**
 *
 * @returns  Dashboard layout component
 * @author Duc Nguyen
 */
const DashboardLayout = () => {
  return (
    <div>
      <div> This is dashboard layout</div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
