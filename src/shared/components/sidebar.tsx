import {
  MailOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Divider, Menu } from 'antd';
import { FolderKanban, LayoutTemplate, Rocket, SquarePlus } from 'lucide-react';

import wspImg from '@/assets/images/karban.png';
import Tooltip from './tooltip';
import { useNavigate } from 'react-router-dom';
import useSearchParam from '../hooks/use-search-param';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '../constant/search-param';

import useGetProfile from '@/modules/tsm/components/hooks/use-profile';
import useGetCategories from '@/modules/tsm/features/workspace/hooks/query/use-get-categories';
import useGetWorkspace from '@/modules/tsm/features/workspace/hooks/query/use-get-workspace';
import { useState } from 'react';

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

  const { data: categories } = useGetCategories();

  const { data } = useGetProfile();

  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);

  const handleOpenModal = () => {
    setDialog(SEARCH_PARAMS_VALUE.WORKSPACE);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'home':
        navigate('tsm/home', { replace: true });
        break;
      case 'workspace':
        navigate('../../../tsm/workspace');
        break;
      case 'mail':
        navigate('../../../tsm/mail');
        break;
      case 'template':
        navigate('../../../tsm/template');
        break;
      case 'sub6':
        navigate('../../../tsm/workspace');
        break;
      case 'sub11':
        navigate(`../../tsm/workspace/${e.key}`);
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
      key: 'workspace',
      label: 'Workspace',
      icon: <FolderKanban className='h-4 w-4' />,
    },
    {
      key: 'mail',
      label: 'Mail',
      icon: <MailOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'template',
      label: 'Templates',
      icon: <LayoutTemplate className='h-4 w-4' />,
      children: categories?.map((item) => {
        return {
          key: item.id,
          label: item.name,
          icon: <LayoutTemplate className='h-4 w-4' />,
          onClick: () => {
            navigate(`../../../tsm/template`);
          },
        };
      }),
    },

    {
      type: 'divider',
    },
    {
      key: 'sub5',
      label: 'All Workspaces',
      type: 'group',
    },

    {
      key: 'sub10',
      style: { display: type === 'private' ? 'none' : '' },
      label: data?.personalWorkSpace?.name || 'Personal Workspace',
      icon: <Rocket className='h-4 w-4' />,

      onClick: () => navigate(`../../../tsm/workspace/${data?.personalWorkSpace?.id}`),
    },
    {
      key: 'workspace',
      label: 'Team Workspace',
      icon: <Rocket className='h-4 w-4' />,
      children: data?.workspaces?.map((workspace) => ({
        key: workspace.id,
        label: workspace.name,
        icon: <FolderKanban className='h-4 w-4' />,
        onClick: () => navigate(`../../../tsm/workspace/${workspace.id}`),
      })),
    },
    {
      type: 'divider',
    },
    {
      key: 'sub12',
      label: 'Create Workspace',
      icon: <SquarePlus className='h-4 w-4' />,
      onClick: handleOpenModal,
    },
    {
      type: 'divider',
    },
    {
      key: 'sub13',
      label: 'Your projects',
      type: 'group',
      className: 'hidden',
      children: data?.projects?.map((project) => ({
        key: project.id,
        label: project.name,
        icon: <FolderKanban className='h-4 w-4' />,
        onClick: () => navigate(`../../project/${project.id}`, { replace: true }),
      })),
    },
  ];

  /**
   * Need to fix again
   */
  const { data: workspace } = useGetWorkspace();

  return (
    <aside
      style={{ width: isCollapse ? 80 : 256 }}
      className='relative h-[calc(100vh-50px)] overflow-y-auto bg-[#f7f8f9] pb-4'
    >
      {/* Workspace item */}
      {type === 'workspace' && (
        <Tooltip title='TaskSmart Workspace'>
          <div className='flex items-center gap-x-2 p-2 pt-3'>
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
              <p className='text-xs'>{workspace?.name}</p>
            </div>
          </div>
        </Tooltip>
      )}

      {/* End Workspace item */}

      {type === 'workspace' && <Divider className='my-1' />}
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
        className={`'bg-[#f7f8f9] ${type === 'workspace' ? 'pt-2' : 'pt-0'}`}
        onClick={onClick}
        defaultSelectedKeys={['home']}
        inlineCollapsed={isCollapse}
        mode='inline'
        items={items}
      />
    </aside>
  );
};
