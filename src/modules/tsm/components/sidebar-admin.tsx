import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FolderKanban, Home, Layers3, LayoutPanelTop, User, Users, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/images/logo-single.png';

type MenuItem = Required<MenuProps>['items'][number];

const SidebarAD = ({
  isCollapse,
  toggleCollapsed,
}: {
  isCollapse?: boolean;
  toggleCollapsed?: () => void;
}) => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'dashboard':
        navigate('../../../admin/dashboard');
        break;
      case 'account':
        navigate('../../../admin/account');
        break;
      case 'template':
        navigate('../../../admin/template');
        break;
      case 'category':
        navigate('../../../admin/category');
        break;
      default:
        break;
    }
  };

  return (
    <aside
      style={{
        width: isCollapse ? 80 : 256,
      }}
      className='relative flex flex-col h-screen bg-white border-r border-solid border-slate-200 border-y-transparent border-t-transparent'
    >
      <div className='flex flex-col items-center justify-center px-6 my-4 gap-y-2'>
        <div className='h-14 w-14'>
          <img src={logo} alt='' className='w-full h-full' />
        </div>
        <h1 className={`text-xl font-semibold ${isCollapse ? 'hidden' : 'block'}`}>Tasksmart</h1>
      </div>
      <Button
        type='primary'
        size='small'
        onClick={toggleCollapsed}
        className={`absolute ${isCollapse ? 'hidden' : 'right-1'} top-[15px] z-50 w-8`}
      >
        {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>

      <Menu
        className='w-full p-0 m-0 mt-4'
        onClick={onClick}
        defaultSelectedKeys={['dashboard']}
        inlineCollapsed={isCollapse}
        mode='inline'
        items={items}
      />
    </aside>
  );
};

export default SidebarAD;

const items: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <Home className='w-5 h-5 mr-3 opacity-70' />,
  },
  {
    key: 'account',
    label: 'Account Administration',
    type: 'group',
  },
  {
    key: 'account',
    label: 'Account',
    icon: <User className='w-5 h-5 mr-3 opacity-70' />,
  },
  {
    key: 'deAccount',
    label: 'Deactivated Account',
    icon: <UserX className='w-5 h-5 mr-3 opacity-70' />,
  },
  {
    key: 'account',
    label: 'Workspace',
    type: 'group',
  },
  {
    key: 'template',
    label: 'Template',
    icon: <LayoutPanelTop className='w-5 h-5 mr-3 opacity-70' />,
  },
  {
    key: 'category',
    label: 'Category',
    icon: <Layers3 className='w-5 h-5 mr-3 opacity-70' />,
  },
  {
    key: 'security',
    label: 'Security',
    type: 'group',
  },
  {
    key: 'wPermission',
    label: 'WorkSpace Permission',
    icon: <Users className='w-5 h-5 mr-3 opacity-70' />,
  },
  {
    key: 'pPermission',
    label: 'Project Permission',
    icon: <FolderKanban className='w-5 h-5 mr-3 opacity-70' />,
  },
];
