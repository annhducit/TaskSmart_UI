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
      className='relative flex h-screen flex-col border-r border-solid border-slate-200 border-y-transparent border-t-transparent bg-white'
    >
      <div className='my-4 flex flex-col items-center justify-center gap-y-2 px-6'>
        <div className='h-14 w-14'>
          <img src={logo} alt='' className='h-full w-full' />
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
        className='m-0 mt-4 w-full p-0'
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
    icon: <Home className='mr-3 h-5 w-5 opacity-70' />,
  },
  {
    key: 'account',
    label: 'Account Administration',
    type: 'group',
  },
  {
    key: 'account',
    label: 'Account',
    icon: <User className='mr-3 h-5 w-5 opacity-70' />,
  },
  {
    key: 'deAccount',
    label: 'Deactivated Account',
    icon: <UserX className='mr-3 h-5 w-5 opacity-70' />,
  },
  {
    key: 'account',
    label: 'Workspace',
    type: 'group',
  },
  {
    key: 'template',
    label: 'Template',
    icon: <LayoutPanelTop className='mr-3 h-5 w-5 opacity-70' />,
  },
  {
    key: 'category',
    label: 'Category',
    icon: <Layers3 className='mr-3 h-5 w-5 opacity-70' />,
  },
  {
    key: 'security',
    label: 'Security',
    type: 'group',
  },
  {
    key: 'wPermission',
    label: 'WorkSpace Permission',
    icon: <Users className='mr-3 h-5 w-5 opacity-70' />,
  },
  {
    key: 'pPermission',
    label: 'Project Permission',
    icon: <FolderKanban className='mr-3 h-5 w-5 opacity-70' />,
  },
];
