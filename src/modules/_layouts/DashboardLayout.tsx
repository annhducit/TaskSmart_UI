import { Outlet } from 'react-router-dom';
import Header from '../tsm/components/header';
import SidebarComponent from '@/modules/tsm/components/sidebar';
import { Suspense, lazy, useState } from 'react';
import { Avatar, Badge, Button, Popover, Tabs, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SubHeader from '../tsm/components/sub-header';
import useGetPath from '@/shared/hooks/use-get-path';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import useSearchParam from '@/shared/hooks/use-search-param';
import Loading from '@/shared/components/loading';
import Tooltip from '@/shared/components/tooltip';
import {
  BrainCircuit,
  CalendarDays,
  Ellipsis,
  FolderKanban,
  PanelsTopLeft,
  Search,
  User,
  UserPlus,
} from 'lucide-react';
import { TabsProps } from 'antd/lib';
import Setting from '../tsm/features/workspace/components/project/modify-card/popover/setting';
import useCollapse from '@/shared/hooks/use-collapse';
import useGetProject from '../tsm/features/workspace/components/project/hooks/query/use-get-project';
import { ModifyMember } from '../tsm/features/workspace/components/project/modify-member';
import { useSelector } from '@/store';

const AIGenerator = lazy(() => import('../tsm/features/workspace/components/ai-generator'));
const ProjectFeature = lazy(() => import('../tsm/features/workspace/components/project'));
const CalendarFeature = lazy(
  () => import('../tsm/features/workspace/components//calendar-timeline')
);
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

  const { btnColor, inpColor } = useSelector((state) => state.theme);

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
          style={{
            backgroundColor: inpColor,
          }}
          size='small'
          onClick={toggleCollapsed}
          className={`absolute ${collapsed ? 'left-16 right-0 text-white' : 'hidden'} top-[15px] z-50 w-8`}
        >
          {collapsed ? <MenuUnfoldOutlined color={btnColor} /> : <MenuFoldOutlined color='white' />}
        </Button>
        <div className={`flex-1`}>
          {!isProject && (
            <div>
              <SubHeader />
            </div>
          )}
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

  const [, setModal] = useSearchParam(SEARCH_PARAMS.MODAL);

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

  const { btnColor } = useSelector((state) => state.theme);

  return (
    <>
      <section
        className='relative object-contain w-full h-screen bg-center bg-no-repeat bg-cover'
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${project?.backgroundUnsplash?.urls?.full})`,
          backgroundColor: `${project?.backgroundColor}`,
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
                  <Tooltip title={project?.name}>
                    <p className='m-0 mr-6 max-w-40 truncate text-[18px] font-bold'>
                      {project?.name}
                    </p>
                  </Tooltip>
                ),
              }}
            />
          </div>

          <div className='absolute right-5 top-[10px] flex items-center gap-x-4'>
            <Button
              size='middle'
              style={{
                color: btnColor,
              }}
              className='flex items-center'
              type='default'
              icon={
                <Search
                  size='14'
                  style={{
                    color: btnColor,
                  }}
                />
              }
            >
              Search
            </Button>
            <Button
              style={{
                backgroundColor: btnColor,
                color: 'white',
              }}
              onClick={() => setModal(SEARCH_PARAMS_VALUE.ADD_MEMBER)}
              icon={<UserPlus size='14' className='text-white' />}
            >
              Share
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
                      />
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
      <ModifyMember />
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
    key: 'calendar',
    label: 'Calendar',
    icon: <CalendarDays size='15' className='translate-x-[6px] translate-y-[2px]' />,
    children: <CalendarFeature />,
  },
  {
    key: 'ai-generator',
    label: (
      <Typography.Text className='text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text'>
        AI Generator
      </Typography.Text>
    ),
    // label: (
    //   <Typography.Text className='text-transparent bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text'>
    //     AI Generator
    //   </Typography.Text>
    // ),

    icon: <BrainCircuit size='15' className='translate-x-[6px] translate-y-[2px]' />,
    children: <AIGenerator />,
  },
  // {
  //   key: 'sql',
  //   label: 'SQL Generator',
  //   icon: <FolderKanban size='15' className='translate-x-[6px] translate-y-[2px]' />,
  //   children: <ProjectFeature />,
  // },
];
