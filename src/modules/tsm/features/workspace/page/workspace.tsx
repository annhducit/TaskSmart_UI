import type { MenuProps } from 'antd';
import { Divider, Menu, Spin, Typography } from 'antd';
import ProjectItem from '../components/project/project-item';

import useGetWorkspaces from '../hooks/query/use-get-workspaces';
import useGetProfile from '@/modules/tsm/components/hooks/use-profile';
import useGetWorkspace from '../hooks/query/use-get-workspace';
import { useNavigate } from 'react-router-dom';
import { listColor } from '@/shared/data';
import useGetRecentActivity from '../hooks/query/use-get-recent-activity';

/**
 *
 * @returns  {JSX.Element}
 * @author Duc Nguyen
 */
const Workspace = () => {
  const navigate = useNavigate();

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const { data: workspaces } = useGetWorkspaces();
  const { data: workspace, isPending } = useGetWorkspace();
  const { data: profile } = useGetProfile();
  const { data: recentActivities, isLoading } = useGetRecentActivity();

  const items: MenuItem[] = [
    {
      key: 'all',
      label: 'All workspace',
      icon: (
        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white'>
          All
        </div>
      ),
    },

    ...(workspaces?.map((item) => {
      const colorRandom = listColor[Math.floor(Math.random() * listColor.length)].color;
      return getItem(
        item.name,
        item.id.toString(),
        <div
          style={{
            backgroundColor: colorRandom,
            color: 'white',
          }}
          className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white'
        >
          {item?.name.charAt(0).toUpperCase()}
        </div>
      );
    }) || []),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'all') {
      navigate('../../tsm/home');
    } else {
      navigate(`../../../tsm/workspaces/${e.key}`);
    }
  };
  return (
    <div className='mb-10 flex flex-col gap-y-2'>
      <Typography.Title level={3}>Recent viewed</Typography.Title>
      <div className='grid grid-cols-4 gap-4'>
        {recentActivities?.map((item) => (
          <ProjectItem key={item.id} project={item} type='RECENT' recent={item.lastAccessed} />
        ))}
        {isLoading && <Spin />}
      </div>
      <Divider className='my-[4px]' />
      <Typography.Title level={3}>Your workspace</Typography.Title>
      <div className='grid grid-cols-4 gap-x-6'>
        <div className='col-span-1 h-[calc(100vh-200px)] overflow-y-scroll'>
          <Menu
            mode='inline'
            onClick={onClick}
            activeKey='1'
            className='flex flex-col gap-y-1'
            style={{ width: 280 }}
            defaultSelectedKeys={['all']}
            items={items}
          />
        </div>
        {workspace?.projects ? (
          <div className='col-span-3'>
            {isPending && <Spin />}
            <div className='grid grid-cols-2 gap-4'>
              {workspace?.projects.map((item) => <ProjectItem key={item.id} project={item} />)}
            </div>
          </div>
        ) : (
          <div className='col-span-3 h-[calc(100vh-200px)] overflow-y-scroll'>
            <Typography.Title level={4}>All projects</Typography.Title>
            <div className='grid grid-cols-2 gap-4'>
              {profile?.projects.map((item) => <ProjectItem key={item.id} project={item} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;

type MenuItem = Required<MenuProps>['items'][number];
