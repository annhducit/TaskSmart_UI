import { Outlet } from 'react-router-dom';
import Header from '../tsm/components/header';
import SidebarComponent from '@/shared/components/sidebar';
import { Suspense, lazy, useState } from 'react';
import { Avatar, Badge, Button, Popover, Tabs } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SubHeader from '../tsm/components/sub-header';
import useGetPath from '@/shared/hooks/use-get-path';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
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
} from 'lucide-react';
import { TabsProps } from 'antd/lib';
import Setting from '../tsm/features/workspace/components/project/modify-card/popover/setting';
import useCollapse from '@/shared/hooks/use-collapse';
import useGetProject from '../tsm/features/workspace/components/project/hooks/query/use-get-project';

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
    <div className='flex flex-col h-screen overflow-hidden'>
      <Header />
      <div className='relative flex flex-row flex-1'>
        <div className='block'>
          <SidebarComponent
            typeSidebar={isProject ? 'workspace' : 'home'}
            isCollapse={collapsed}
            toggleCollapsed={toggleCollapsed}
          />
        </div>
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
          {isProject && <ProjectContainer layoutControl={collapsed} />}
          <div className={`max-h-[92vh] overflow-y-scroll ${!isProject ? 'p-4' : ''}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

export const ProjectContainer = (props: { layoutControl: boolean }) => {
  const { data: project } = useGetProject();

  const [viewParam, setView] = useSearchParam(SEARCH_PARAMS.VIEW, {
    defaultValue: 'overview',
  });

  const [visible, setVisible] = useCollapse<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setVisible(open);
  };
  const tabList = items?.map((item) => ({
    ...item,
    children: item.children ? (
      <Suspense fallback={<Loading.Page size='4/5' />}>{item.children}</Suspense>
    ) : undefined,
  }));

  const userDefault = (
    <Avatar size={28} style={{ backgroundColor: '#f56a00' }} icon={<User size='12' />} />
  );

  return (
    <>
      <section
        className='relative w-full h-screen bg-center bg-no-repeat bg-cover'
        style={{
          backgroundPosition: 'center',
          backgroundImage: `url(https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1717719405874-441f212902a0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >
        <div className='absolute inset-0 bg-black bg-opacity-40' />
        <div className='flex items-start gap-x-2'>
          <div>
            <Tabs
              defaultActiveKey={viewParam}
              tabBarGutter={12}
              onChange={setView}
              items={tabList}
              className={`custom-tabs mb-0 ${props.layoutControl ? 'w-[calc(100vw-80px)]' : 'w-[calc(100vw-256px)]'} text-white`}
              tabBarExtraContent={{
                left: (
                  <p className='m-0 w-40 truncate text-[18px] font-bold'>{project?.name || ''}</p>
                ),
              }}
            />
          </div>

          <div className='absolute right-5 top-[10px] flex items-center gap-x-4'>
            <Button size='middle' type='default' icon={<Search className='mt-1' size='14' />}>
              Search
            </Button>
            <Button size='middle' type='primary' icon={<ListChecks className='mt-1' size='14' />}>
              Add task
            </Button>
            <Avatar.Group maxCount={2} className='flex items-center'>
              {project?.users.map((user) => (
                <Tooltip title={user.name} placement='top' key={user.userId}>
                  {user.profileImagePath ? (
                    <div
                      style={{ width: '28px', height: '28px' }}
                      className='relative rounded-full'
                    >
                      <img
                        src={`http://localhost:8888/api/image/${user.profileImagePath}`}
                        className='object-cover rounded-full'
                        style={{ width: '28px', height: '28px' }}
                      ></img>
                      <Badge status='success' className='absolute -right-[2px] -top-1 z-[99999]' />
                    </div>
                  ) : (
                    userDefault
                  )}
                </Tooltip>
              ))}
            </Avatar.Group>

            <Popover
              trigger='click'
              content={<Setting setVisible={setVisible} />}
              open={visible}
              onOpenChange={handleOpenChange}
            >
              <div className='px-1 transition-all rounded cursor-pointer hover:bg-primary-default hover:text-white'>
                <Ellipsis size='20' color='white' className='mt-1' />
              </div>
            </Popover>
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
  {
    key: 'kanban',
    label: 'Karban',
    icon: <Kanban size='15' className='translate-x-[6px] translate-y-[2px]' />,
    children: <KarbanFeature />,
  },
];
