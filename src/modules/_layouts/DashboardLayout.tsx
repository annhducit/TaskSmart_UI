import { Outlet, useLocation } from 'react-router-dom';
import Header from '../tsm/components/header';
import SidebarComponent from '@/shared/components/sidebar';
import { useState } from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SubHeader from '../tsm/components/sub-header';

/**
 *
 * @returns  Dashboard layout component
 * @author Duc Nguyen
 */
const DashboardLayout = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <div className='relative flex flex-1 flex-row'>
        <SidebarComponent
          typeSidebar='public'
          isCollapse={collapsed}
          toggleCollapsed={toggleCollapsed}
        />
        {/* Button to collapse sidebar */}
        <Button
          type='text'
          size='small'
          onClick={toggleCollapsed}
          className={`absolute ${collapsed ? 'left-16 right-0' : 'hidden'} top-[15px] z-50 w-8`}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <div className='flex-1'>
          <p>
            <SubHeader />
          </p>
          <div className='px-6'>{location.pathname === '/tsm/project' && <Outlet />}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
