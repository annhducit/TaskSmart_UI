import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu, Typography } from 'antd';
import {
  FolderKanban,
  Home,
  LayoutTemplate,
  Mail,
  Rocket,
  SquarePlus,
  SwatchBook,
} from 'lucide-react';

import wspImg from '@/assets/images/karban.png';
import Tooltip from './tooltip';
import { useNavigate } from 'react-router-dom';
import useSearchParam from '../hooks/use-search-param';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '../constant/search-param';

import useGetProfile from '@/modules/tsm/components/hooks/use-profile';
import useGetProject from '@/modules/tsm/features/workspace/components/project/hooks/query/use-get-project';
import useGetCategories from '@/modules/tsm/components/hooks/use-get-categories';
import useGetPath from '../hooks/use-get-path';
import { useSelector } from '@/store';

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
  const { path } = useGetPath();

  const isProject = path.includes('project');

  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);
  const [, setCategory] = useSearchParam(SEARCH_PARAMS.CATEOGORY);

  const handleOpenModal = () => {
    setDialog(SEARCH_PARAMS_VALUE.WORKSPACE);
  };

  const { btnColor } = useSelector((state) => state.theme);

  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'home':
        navigate('../../../tsm/home');
        break;
      case 'workspaces':
        navigate('../../../tsm/workspaces');
        break;
      case 'mail':
        navigate('../../../tsm/mail');
        break;
      case 'template':
        navigate('../../../tsm/template');
        break;

      default:
        break;
    }
  };

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Home',
      icon: <Home className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
    },
    {
      key: 'workspaces',
      label: 'General',
      icon: <SwatchBook className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
    },
    {
      key: 'mail',
      label: 'Mail',
      icon: <Mail className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
    },
    {
      type: 'divider',
    },
    {
      key: 'template',
      label: 'Templates',
      icon: <LayoutTemplate className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
      children: [
        {
          key: 'all',
          label: 'All templates',
          icon: <LayoutTemplate className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
          onClick: () => {
            navigate(`../../../tsm/template`);
          },
        },
        ...(categories?.map((item) => ({
          key: item.id,
          label: item.name,
          icon: <LayoutTemplate className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
          onClick: () => {
            navigate(`../../../tsm/template`);
            setCategory(item.id);
          },
        })) || []),
      ],
    },

    {
      type: 'divider',
    },
    {
      key: 'sub5',
      label: (
        <Typography.Text className={`${isProject ? 'text-white' : 'text-black'}`}>
          Your Workspaces
        </Typography.Text>
      ),
      className: `${isProject ? 'text-white font-semibold' : 'text-black'}`,
      type: 'group',
    },

    {
      key: 'sub10',
      style: { display: type === 'private' ? 'none' : '' },
      label: data?.personalWorkSpace?.name || 'Personal Workspace',
      icon: <Rocket className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,

      onClick: () => navigate(`../../../tsm/workspace/${data?.personalWorkSpace?.id}`),
    },
    {
      key: 'workspace',
      label: 'Team Workspace',
      icon: <Rocket className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
      children: data?.workspaces?.map((workspace) => ({
        key: workspace.id,
        label: workspace.name,
        icon: <FolderKanban className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
        onClick: () => navigate(`../../../tsm/workspace/${workspace.id}`),
      })),
    },
    {
      type: 'divider',
    },
    {
      key: 'sub12',
      label: 'Create Workspace',
      icon: <SquarePlus className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
      onClick: handleOpenModal,
    },
    {
      type: 'divider',
    },
    {
      key: 'sub13',
      label: (
        <Typography.Text className={`${isProject ? 'text-white' : 'text-black'}`}>
          Your projects
        </Typography.Text>
      ),
      type: 'group',
      className: `${isProject ? 'block  font-semibold' : 'hidden'}`,
      children: data?.projects?.map((project) => ({
        key: project.id,
        label: project.name,
        icon: <FolderKanban className='h-4 w-4' color={`${isProject ? 'white' : btnColor}`} />,
        onClick: () => navigate(`../../../tsm/project/${project.id}`),
      })),
    },
  ];

  const { data: project } = useGetProject();

  return (
    <aside
      style={{
        width: isCollapse ? 80 : 256,
        backgroundImage: `${isProject && `url(${project?.backgroundUnsplash?.urls?.full})`}`,
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className={`relative z-50 flex h-[calc(100vh-40px)] flex-col ${isProject && 'bg-black/50 bg-gray-900 bg-opacity-50  text-white shadow-lg backdrop-blur-lg backdrop-filter'}`}
    >
      {/* Workspace item */}
      {type === 'workspace' && (
        <Tooltip title={project?.workspace.name}>
          <div
            className={`flex items-center gap-x-2  p-2 pt-3 shadow-lg ${isProject && 'bg-black/50 bg-gray-900 bg-opacity-50 backdrop-blur-lg backdrop-filter'}`}
          >
            <div className={`${isCollapse ? 'ml-4 h-8 w-8' : 'h-10 w-10'} rounded-lg `}>
              <img src={wspImg} alt='' className='w-full rounded-lg object-contain' />
            </div>
            <div
              className='flex flex-col gap-y-1'
              style={{
                display: isCollapse ? 'none' : '',
              }}
            >
              <p className='w-[150px] truncate text-sm font-semibold'>TaskSmart Workspace</p>
              <p className='text-xs'>{project?.workspace.name}</p>
            </div>
          </div>
        </Tooltip>
      )}

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
        className={`${isProject && 'custom-aside'} ${type === 'workspace' ? 'pt-2' : 'pt-0'} ${isProject ? 'h-[calc(100vh-90px)]' : 'h-[calc(100vh-40px)]'} overflow-y-scroll`}
        onClick={onClick}
        defaultSelectedKeys={['home']}
        inlineCollapsed={isCollapse}
        mode='inline'
        items={items}
      />
    </aside>
  );
};
