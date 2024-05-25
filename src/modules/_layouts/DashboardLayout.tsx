import { Outlet } from 'react-router-dom';
import Header from '../tsm/components/header';
import SidebarComponent from '@/shared/components/sidebar';
import { useState } from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SubHeader from '../tsm/components/sub-header';
import useGetPath from '@/shared/hooks/use-get-path';

/**
 *
 * @returns  Dashboard layout component
 * @author Duc Nguyen
 */
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { path } = useGetPath();

  const isProject = path.includes('project');

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
        <div className='max-h-[92vh] flex-1 overflow-y-scroll'>
          <div>
            <SubHeader />
          </div>

          <div className={`${!isProject ? 'p-4' : ''}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
