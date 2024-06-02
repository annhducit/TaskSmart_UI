import { Outlet } from 'react-router-dom';
import Header from '../tsm/components/header';
import SidebarComponent from '@/shared/components/sidebar';
import { Suspense, lazy, useState } from 'react';
import { Avatar, Button, Tabs } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SubHeader from '../tsm/components/sub-header';
import useGetPath from '@/shared/hooks/use-get-path';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import useSearchParam from '@/shared/hooks/use-search-param';
import Loading from '@/shared/components/loading';
import Tooltip from '@/shared/components/tooltip';
import {
  CalendarDays,
  Ellipsis,
  FolderKanban,
  GanttChart,
  Kanban,
  ListChecks,
  PanelsTopLeft,
  Search,
  SquareKanban,
  User,
  UserPlus,
} from 'lucide-react';
import { TabsProps } from 'antd/lib';

const ProjectFeature = lazy(() => import('../tsm/features/workspace/components/project'));
const TableFeature = lazy(() => import('../tsm/features/workspace/components//table'));
const BoardFeature = lazy(() => import('../tsm/features/workspace/components//board'));
const CalendarFeature = lazy(
  () => import('../tsm/features/workspace/components//calendar-timeline')
);
const KarbanFeature = lazy(() => import('../tsm/features/workspace/components//karban'));
const OverviewFeature = lazy(() => import('../tsm/features/workspace/components//overview'));
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
    <div className='flex h-screen flex-col overflow-hidden'>
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
        <div className={`flex-1`}>
          <div>
            <SubHeader />
          </div>
          {isProject && <ProjectContainer />}
          <div className={`max-h-[92vh] overflow-y-scroll ${!isProject ? 'p-4' : ''}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

export const ProjectContainer = () => {
  const [viewParam, setView] = useSearchParam(SEARCH_PARAMS.VIEW, {
    defaultValue: 'overview',
  });

  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);

  const showModal = () => {
    setDialog(SEARCH_PARAMS_VALUE.PROJECT_DETAIL);
  };
  const tabList = items?.map((item) => ({
    ...item,
    children: item.children ? (
      <Suspense fallback={<Loading.Page size='4/5' />}>{item.children}</Suspense>
    ) : undefined,
  }));

  return (
    <>
      <section
        className='relative h-screen w-full border-b-slate-500'
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1710011116416-265827e3da9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: 'cover',
          backgroundPosition: 'right',
        }}
      >
        <div className='flex items-start gap-x-2'>
          <Tabs
            style={{ width: '100%' }}
            defaultActiveKey={viewParam}
            tabBarGutter={12}
            tabBarStyle={{ background: 'transparent' }}
            onChange={setView}
            items={tabList}
            className='custom-tabs mb-0 w-full pb-0 text-white'
            tabBarExtraContent={{
              left: <p className='m-0 w-40 truncate text-[18px] font-bold'>Double D Thesis</p>,
            }}
          />

          <div className='absolute right-5 top-[10px] flex items-center gap-x-4'>
            <Button size='middle' type='default' icon={<Search className='mt-1' size='14' />}>
              Search
            </Button>
            <Button size='middle' type='primary' icon={<ListChecks className='mt-1' size='14' />}>
              Add task
            </Button>
            <Avatar.Group maxCount={2} className='flex items-center'>
              <Tooltip title='Đức Duy' placement='top'>
                <Avatar style={{ backgroundColor: '#f56a00' }} icon={<User size='12' />} />
              </Tooltip>
              <Tooltip title='Trọng Đức' placement='top'>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<User size='12' />} />
              </Tooltip>
              <Tooltip title='Đức Duy' placement='top'>
                <Avatar className='bg-cyan-500 text-white' icon={<User size='12' />} />
              </Tooltip>
              <Tooltip title='Trọng Đức' placement='top'>
                <Avatar className='bg-red-500 text-white' icon={<User size='12' />} />
              </Tooltip>
            </Avatar.Group>

            <div className='rounded px-1 transition-all hover:bg-primary-default hover:text-white'>
              <Ellipsis size='20' color='white' className='mt-1' />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const items: TabsProps['items'] = [
  {
    key: 'overview',
    label: 'Overview',
    icon: <PanelsTopLeft size='15' className='translate-x-[6px] translate-y-[2px]' />,
    children: <OverviewFeature />,
  },
  {
    key: 'project',
    label: 'Project',
    icon: <FolderKanban size='15' className='translate-x-[6px] translate-y-[2px]' />,
    children: <ProjectFeature />,
  },
  {
    key: 'table',
    label: 'Table',
    icon: <GanttChart size='15' className='translate-x-[6px] translate-y-[2px]' />,
    children: <TableFeature />,
  },
  {
    key: 'board',
    label: 'Board',
    icon: <SquareKanban size='15' className='translate-x-[6px] translate-y-[2px]' />,
    children: <BoardFeature />,
  },
  {
    key: 'calendar',
    label: 'Calendar',
    icon: <CalendarDays size='15' className='translate-x-[6px] translate-y-[2px]' />,
    children: <CalendarFeature />,
  },
  // {
  //   key: 'kanban',
  //   label: 'Karban',
  //   icon: <Kanban size='15' className='translate-x-[6px] translate-y-[2px]' />,
  //   children: <KarbanFeature />,
  // },
];
