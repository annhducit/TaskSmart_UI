import { Avatar, Divider, Menu, MenuProps, Tag, Typography } from 'antd';
import ProjectItem from '../components/project-item';
import projectImg from '@/assets/images/karban.png';

import myBackgroundImage from '@/assets/images/karban.png';
import { LockKeyhole } from 'lucide-react';
import Tooltip from '@/shared/components/tooltip';

/**
 *
 * @returns  {JSX.Element}
 * @author Duc Nguyen
 */
const Workspace = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    /**
     * @todo handle click event
     */
  };

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

  const items: MenuItem[] =
    workspaces?.map((item) => getItem(item.name, item.id.toString(), item.icon)) || [];

  return (
    <div className='flex h-screen flex-col gap-y-2 overflow-y-scroll'>
      <Typography.Title level={3}>Recent viewed</Typography.Title>
      <div className='grid grid-cols-4 gap-6'>
        {/* <ProjectItem />
        <ProjectItem /> */}
      </div>
      <Divider className='my-[4px]' />
      <Typography.Title level={3}>Your workspace</Typography.Title>
      <div className='grid grid-cols-4 gap-x-6'>
        <div className='col-span-1 h-[330px] overflow-y-scroll'>
          <Menu
            mode='inline'
            onClick={onClick}
            className='flex flex-col gap-y-1'
            style={{ width: 280 }}
            defaultSelectedKeys={['1']}
            items={items}
          />
        </div>
        <div className='col-span-3 flex flex-col gap-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-5'>
              <div className='h-12 w-12 rounded'>
                <img src={projectImg} alt='' className='h-full w-full rounded-lg' />
              </div>
              <div className='flex flex-col'>
                <Typography.Title level={5}>TaskSmart Workspace</Typography.Title>

                <div className='flex items-center gap-x-4'>
                  <Tag color='gold'>Premium</Tag>
                  <div className='flex items-center'>
                    <LockKeyhole color='red' className='mr-1 h-4 w-4' />
                    <Tag color='red'>Private</Tag>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-x-2'>
              <Typography.Text>Member: </Typography.Text>
              <Avatar.Group maxCount={2} className='flex items-center'>
                <Tooltip title='Anh Đức'>
                  <Avatar size='default' style={{ backgroundColor: '#f56a00' }}>
                    Đ
                  </Avatar>
                </Tooltip>
                <Tooltip title='Đức Duy'>
                  <Avatar size='default' style={{ backgroundColor: '#87d068' }}>
                    D
                  </Avatar>
                </Tooltip>
              </Avatar.Group>
            </div>
          </div>
          <Divider className='my-[1px]' />
          <div className='grid grid-cols-2 gap-6'>
            {/* <ProjectItem />
            <ProjectItem />
            <ProjectItem />
            <ProjectItem /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;

type MenuItem = Required<MenuProps>['items'][number];

const WorkspaceItem = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${myBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='mr-6 flex h-6 w-6 rounded'
    />
  );
};

const workspaces = [
  {
    id: 1,
    name: 'Workspace OOP',
    icon: <WorkspaceItem />,
  },
  {
    id: 2,
    name: 'Workspace math',
    icon: <WorkspaceItem />,
  },
  {
    id: 3,
    name: 'Team Space',
    icon: <WorkspaceItem />,
  },
  {
    id: 4,
    name: 'Class space',
    icon: <WorkspaceItem />,
  },
  {
    id: 5,
    name: 'Group space',
    icon: <WorkspaceItem />,
  },
  {
    id: 6,
    name: 'Tasksmart space',
    icon: <WorkspaceItem />,
  },
];
