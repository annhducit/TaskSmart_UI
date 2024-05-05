import { Outlet } from 'react-router-dom';

const LandingLayout = () => {
  return (
    <div>
      This is landing layout
      <Outlet />
    </div>
  );
};

export default LandingLayout;
