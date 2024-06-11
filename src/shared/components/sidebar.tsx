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
import { useState, useEffect } from 'react';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '../constant/search-param';

import { useAppSelector } from '../hooks/use-redux';
import { UserType, UserWrapperType } from '@/configs/store/slices/userSlice';
import { tsmAxios } from '@/configs/axios';


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

  const userAuthenticated = useAppSelector((state) => state.user).data as UserType; 
  const navigate = useNavigate();
  /**
   *
   * @param e
   * @returns page based on the key
   */

  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);

  const handleOpenModal = () => {
    setDialog(SEARCH_PARAMS_VALUE.WORKSPACE);
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await tsmAxios.get('/categories');
        setCategories([{id: "all", name: "All"},...res.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  
  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'home':
        navigate('tsm/home', { replace: true });
        break;
      case 'workspace':
        navigate('tsm/workspace', { replace: true });
        break;
      case 'mail':
        navigate('tsm/mail', { replace: true });
        break;
        // case 'members':
        //   navigate('../../tsm/members', { replace: true });

        //   break;
        // case 'workspaces-settings':
        //   navigate('tsm/workspaces-settings', { replace: true });

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
      key: 'workspace',
      label: 'Workspace',
      icon: <FolderKanban className='w-4 h-4' />,
    },
    {
      key: 'mail',
      label: 'Mail',
      icon: <MailOutlined />,
    },
    // {
    //   key: 'members',
    //   label: 'Members',
    //   icon: <UserOutlined />,
    // },
    // {
    //   key: 'workspaces-settings',
    //   label: 'Workspaces settings',
    //   icon: <AppstoreOutlined />,
    // },
    {
      type: 'divider',
    },
    {
      key: 'template',
      label: 'Templates',
      icon: <LayoutTemplate className='w-4 h-4' />,
      children: categories.map(item =>{ return {key: item.id, label: item.name, icon: <LayoutTemplate className='w-4 h-4' />}})
      // [
      //   {
      //     key: 'business',
      //     label: 'Business Template',
      //     icon: <LayoutTemplate className='w-4 h-4' />,
      //   },
      //   {
      //     key: 'Design',
      //     label: 'Design Template',
      //     icon: <LayoutTemplate className='w-4 h-4' />,
      //   },
      // ],
    },

    {
      type: 'divider',
    },
    {
      key: 'sub5',
      label: 'All Workspaces',
      type: 'group',
    },
    // {
    //   key: 'sub6',
    //   label: 'Everything',
    //   icon: <SlackOutlined />,
    // },
    {
      key: 'sub10',
      style: { display: type === 'private' ? 'none' : '' },
      label: userAuthenticated?.personalWorkSpace?.name || 'Personal Workspace',
      icon: <Rocket className='w-4 h-4' />,
    },
    {
      key: 'sub7',
      label: 'Team Workspace',
      icon: <Rocket className='w-4 h-4' />,
      children: userAuthenticated.workspaces?.map((workspace) => ({
        key: workspace.id,
        label: workspace.name,
        icon: <FolderKanban className='w-4 h-4' />,
      })),
    },
    {
      type: 'divider',
    },
    {
      key: 'sub12',
      label: 'Create Workspace',
      icon: <SquarePlus className='w-4 h-4' />,
      onClick: handleOpenModal,
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
          icon: <FolderKanban className='w-4 h-4' />,
        },
      ],
    },
  ];

  return (
    <aside
      style={{ width: isCollapse ? 80 : 256 }}
      className='relative h-[calc(100vh-50px)] overflow-y-auto bg-[#f7f8f9] pb-4'
    >
      {/* Workspace item */}
      {type === 'workspace' && (
        <Tooltip title='TaskSmart Workspace'>
          <div className='flex items-center p-2 pt-3 gap-x-2'>
            <div className={`${isCollapse ? 'ml-4 h-8 w-8' : 'h-10 w-10'} rounded-lg`}>
              <img src={wspImg} alt='' className='object-contain w-full rounded-lg' />
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
