import { Outlet } from 'react-router-dom';
import SidebarAD from '../tsm/components/sidebar-admin';
import { useState } from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import HeaderAdmin from '../tsm/components/header-admin';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className='flex h-screen flex-col overflow-hidden'>
      <div className='flex flex-1 overflow-hidden'>
        <SidebarAD isCollapse={collapsed} toggleCollapsed={toggleCollapsed} />

        <Button
          type='primary'
          size='small'
          onClick={toggleCollapsed}
          className={`absolute ${collapsed ? 'left-16 right-0 text-white' : 'hidden'} top-14 z-50 w-8`}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined color='white' />}
        </Button>
        <div className='flex w-0 flex-1 flex-col overflow-hidden'>
          <HeaderAdmin />
          <div className='h-screen overflow-scroll bg-[#f9fafb] p-6'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
