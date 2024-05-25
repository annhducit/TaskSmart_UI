import { createRouters } from '@/shared/router/utils';
import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import useSearchParam from '@/shared/hooks/use-search-param';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import Loading from '@/shared/components/loading';
import { Avatar, Button, Tabs, TabsProps } from 'antd';
import Tooltip from '@/shared/components/tooltip';
import {
  CalendarDays,
  Ellipsis,
  FolderKanban,
  GanttChart,
  Kanban,
  PanelsTopLeft,
  SquareKanban,
  User,
  UserPlus,
} from 'lucide-react';

const WorkspaceDetail = lazy(() => import('./page/workspace-detail'));
const OverviewFeature = lazy(() => import('./components/overview'));
const ProjectFeature = lazy(() => import('./components/project'));
const TableFeature = lazy(() => import('./components/table'));
const BoardFeature = lazy(() => import('./components/board'));
const CalendarFeature = lazy(() => import('./components/calendar-timeline'));
const KarbanFeature = lazy(() => import('./components/karban'));

const ProjectDetail = () => {
  const [viewParam, setView] = useSearchParam(SEARCH_PARAMS.VIEW, {
    defaultValue: 'project',
  });

  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);

  const showModal = () => {
    setDialog(SEARCH_PARAMS_VALUE.PROJECT_DETAIL);
  };
  const tabList = items?.map((item) => ({
    ...item,
    children: item.children ? (
      <Suspense fallback={<Loading.Page size='1/2' />}>{item.children}</Suspense>
    ) : undefined,
  }));

  return (
    <>
      <header className='border-b-slate-500 bg-white pl-0 pr-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-start gap-x-2'>
            <Tabs
              style={{ width: '100%' }}
              defaultActiveKey={viewParam}
              onChange={setView}
              items={tabList}
              className='ml-6 w-full'
              tabBarExtraContent={{
                left: (
                  <p className='m-0 mr-4 w-40 truncate text-[16px] font-bold'>Double D Thesis</p>
                ),
              }}
            />
          </div>
          <div className='flex -translate-y-4 items-center gap-x-4'>
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
            <Button type='primary' icon={<UserPlus size='14' />}>
              Share
            </Button>
            <div>
              <Ellipsis size='18' />
            </div>
          </div>
        </div>
      </header>
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

const workspaceDetailRoutes = createRouters([
  {
    path: '/',
    element: <WorkspaceDetail />,
  },
  {
    path: 'project/:projectId',
    element: <ProjectDetail />,
  },
]);

export const WorkspaceDetailFeature = () => {
  return useRoutes(workspaceDetailRoutes);
};

export default WorkspaceDetailFeature;
