import { Divider, Empty, Menu, MenuProps, Spin, Tag, Typography } from 'antd';
import ProjectItem from '../components/project-item';

import myBackgroundImage from '@/assets/images/karban.png';
import useGetWorkspaces from '../hooks/query/use-get-workspaces';
import useGetProfile from '@/modules/tsm/components/hooks/use-profile';
import useGetWorkspace from '../hooks/query/use-get-workspace';
import { useNavigate } from 'react-router-dom';

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

  const items: MenuItem[] =
    workspaces?.map((item) =>
      getItem(
        item.name,
        item.id.toString(),
        <img className='h-10 w-10 rounded' src={item.backgroundUnsplash || myBackgroundImage} />
      )
    ) || [];

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`../../../tsm/workspaces/${e.key}`);
  };
  return (
    <div className='flex h-screen flex-col gap-y-2 overflow-y-scroll'>
      <Typography.Title level={3}>Recent viewed</Typography.Title>
      <div className='grid grid-cols-4 gap-6'>
        {profile?.projects.slice(0, 2).map((item) => <ProjectItem key={item.id} project={item} />)}
      </div>
      <Divider className='my-[4px]' />
      <Typography.Title level={3}>Your workspace</Typography.Title>
      <div className='grid grid-cols-4 gap-x-6'>
        <div className='col-span-1 h-[330px] overflow-y-scroll'>
          <Menu
            mode='inline'
            onClick={onClick}
            activeKey='1'
            className='flex flex-col gap-y-1'
            style={{ width: 280 }}
            defaultSelectedKeys={['1']}
            items={items}
          />
        </div>
        {workspace?.projects ? (
          <div className='col-span-3'>
            {isPending && <Spin />}
            <div className='grid grid-cols-2 gap-4 '>
              {workspace?.projects.map((item) => <ProjectItem key={item.id} project={item} />)}
            </div>
          </div>
        ) : (
          <div className='col-span-3 '>
            <Typography.Title level={4}>All projects</Typography.Title>
            <div className='grid grid-cols-2 gap-4 '>
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
