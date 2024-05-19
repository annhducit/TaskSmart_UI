import {
  AppstoreOutlined,
  MailOutlined,
  HomeOutlined,
  UserOutlined,
  SlackOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Divider, Menu } from 'antd';
import { FolderKanban, Rocket, SquarePlus } from 'lucide-react';

import wspImg from '@/assets/images/karban.png';
import Tooltip from './tooltip';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

type SidebarType = 'home' | 'public' | 'private' | 'workspace';

const SidebarComponent = ({
  typeSidebar,
  isCollapse,
  toggleCollapsed,
}: {
  typeSidebar: SidebarType;
  isCollapse?: boolean;
  toggleCollapsed?: () => void;
}) => {
  switch (typeSidebar) {
    case 'home':
      return <Sidebar type='home' isCollapse={isCollapse} toggleCollapsed={toggleCollapsed} />;
    case 'public':
      return <Sidebar type='public' isCollapse={isCollapse} toggleCollapsed={toggleCollapsed} />;
    case 'private':
      return <Sidebar type='private' isCollapse={isCollapse} toggleCollapsed={toggleCollapsed} />;
    case 'workspace':
      return <Sidebar type='workspace' isCollapse={isCollapse} toggleCollapsed={toggleCollapsed} />;
    default:
      return <Sidebar type='public' isCollapse={isCollapse} toggleCollapsed={toggleCollapsed} />;
  }
};

export default SidebarComponent;

const Sidebar = ({
  type,
  isCollapse,
  toggleCollapsed,
}: {
  type: SidebarType;
  isCollapse?: boolean;
  toggleCollapsed?: () => void;
}) => {
  const navigate = useNavigate();
  /**
   *
   * @param e
   * @returns page based on the key
   */
  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'home':
        navigate('tsm/home', { replace: true });
        break;
      case 'mail':
        navigate('tsm/mail', { replace: true });
        break;
      case 'members':
        navigate('../../tsm/members', { replace: true });

        break;
      case 'workspaces-settings':
        navigate('tsm/workspaces-settings', { replace: true });

        break;
      case 'sub5':
        console.log('Workspaces');
        break;
      case 'sub6':
        navigate('tsm/workspace', { replace: true });
        break;
      case 'sub7':
        console.log('Team Workspace');
        break;
      case 'sub8':
        console.log('Project DoubleD');
        break;
      case 'sub9':
        console.log('Project Design Table');
        break;
      case 'sub10':
        console.log('Personal Workspace');
        break;
      case 'sub11':
        console.log('Finace Management');
        break;
      case 'sub12':
        console.log('Create Workspace');
        break;
      case 'sub14':
        navigate('tsm/workspace/1/project/1', { replace: true });
        break;
      default:
        break;
    }
  };

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Home',
      icon: <HomeOutlined />,
    },
    {
      key: 'mail',
      label: 'Mail',
      icon: <MailOutlined />,
    },
    {
      key: 'members',
      label: 'Members',
      icon: <UserOutlined />,
    },
    {
      key: 'workspaces-settings',
      label: 'Workspaces settings',
      icon: <AppstoreOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'sub5',
      label: 'Workspaces',
      type: 'group',
    },
    {
      key: 'sub6',
      label: 'Everything',
      icon: <SlackOutlined />,
    },
    {
      key: 'sub7',
      label: 'Team Workspace',
      icon: <Rocket className='h-4 w-4' />,
      children: [
        {
          key: 'sub8',
          label: 'Project DoubleD',
          icon: <FolderKanban className='h-4 w-4' />,
        },
        {
          key: 'sub9',
          label: 'Project Design Table',
          icon: <FolderKanban className='h-4 w-4' />,
        },
      ],
    },
    {
      key: 'sub10',
      style: { display: type === 'private' ? 'none' : '' },
      label: 'Personal Workspace',
      icon: <Rocket className='h-4 w-4' />,
      children: [
        {
          key: 'sub11',
          label: 'Finace Management',
          icon: <FolderKanban className='h-4 w-4' />,
        },
      ],
    },

    {
      type: 'divider',
    },
    {
      key: 'sub12',
      label: 'Create Workspace',
      icon: <SquarePlus className='h-4 w-4' />,
    },
    {
      type: 'divider',
    },
    {
      key: 'sub13',
      label: 'Your projects',
      type: 'group',

      children: [
        {
          key: 'sub14',
          label: 'Double D Thesis',
          icon: <FolderKanban className='h-4 w-4' />,
        },
      ],
    },
  ];

  return (
    <aside
      style={{ width: isCollapse ? 80 : 256 }}
      className='relative h-[calc(100vh-80px)] overflow-y-auto bg-[#f7f8f9] pt-2'
    >
      {/* Workspace item */}
      <Tooltip title='TaskSmart Workspace'>
        <div className='flex items-center gap-x-2 p-2'>
          <div className={`${isCollapse ? 'ml-4 h-8 w-8' : 'h-10 w-10'} rounded-lg`}>
            <img src={wspImg} alt='' className='w-full rounded-lg object-contain' />
          </div>
          <div
            className='flex flex-col gap-y-1'
            style={{
              display: isCollapse ? 'none' : '',
            }}
          >
            <p className='w-[150px] truncate text-sm font-semibold'>TaskSmart Workspace</p>
            <p className='text-xs'> Team workspace</p>
          </div>
        </div>
      </Tooltip>

      {/* End Workspace item */}

      <Divider className='my-1' />
      {/* Collapse */}
      <Button
        type='primary'
        size='small'
        onClick={toggleCollapsed}
        className={`absolute ${isCollapse ? 'hidden' : 'right-1'} top-[15px] z-50 w-8`}
      >
        {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {/* End Collapse */}

      <Menu
        className='bg-[#f7f8f9] pt-2'
        onClick={onClick}
        defaultSelectedKeys={['home']}
        inlineCollapsed={isCollapse}
        mode='inline'
        items={items}
      />
    </aside>
  );
};
