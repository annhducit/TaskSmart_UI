import Logo from '@/shared/components/logo';
import { Button, Divider, Input, MenuProps, Popover, Typography } from 'antd';
import {
  AlarmClock,
  Bell,
  CirclePlus,
  FolderKanban,
  HelpCircle,
  LogOut,
  MessageCircle,
  NotepadText,
  Settings,
  Sparkle,
  SwatchBook,
  User,
  Users,
  Video,
} from 'lucide-react';

import user from '@/assets/images/user.png';
import template from '@/assets/images/karban.png';
import Dropdown from '@/shared/components/dropdown';
import Tooltip from '@/shared/components/tooltip';
import useSearchParam from '@/shared/hooks/use-search-param';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import Notepad from './notepad';
import { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);

  const handleOpenPopover = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <>
      <header className='bg-[#2e3754] px-6 py-2 shadow'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-10'>
            <Logo type='SINGLE_LOGO' />
            <div className='flex items-center gap-x-4'>
              <Dropdown
                children={<div className='font-semibold text-white'>Workspaces</div>}
                trigger='click'
                items={workspaces}
              />
              <Dropdown
                children={<div className='font-semibold text-white'>Samples</div>}
                trigger='click'
                items={samples}
              />
              <Dropdown
                children={<div className='font-semibold text-white'>Projects</div>}
                trigger='click'
                items={projects}
              />
            </div>
          </div>
          <div className='flex items-center gap-x-4'>
            <Input.Search
              className='w-[300px] text-base font-semibold'
              placeholder='Enter keyword'
            />
            <Button
              className='font-semibold'
              icon={<Sparkle className='h-4 w-4 translate-y-[3px] text-primary-default' />}
            >
              Ask AI
            </Button>
          </div>
          <div className='flex items-center gap-x-4'>
            <Popover content={<Content />} trigger='click'>
              <Button
                icon={
                  <CirclePlus className='h-4 w-4 translate-y-[3px] font-bold text-primary-default' />
                }
                className='font-semibold'
              >
                Create new
              </Button>
            </Popover>
            <Tooltip placement='leftTop' title='Notepad'>
              <Popover
                open={open}
                onOpenChange={() => handleOpenPopover(true)}
                content={<Notepad visible={handleOpenPopover} />}
                style={{
                  borderRadius: '10px',
                }}
                trigger='click'
                overlayClassName='custom-popover'
              >
                <div
                  onClick={() => handleOpenPopover(!open)}
                  className='cursor-pointer rounded px-1 transition-all hover:bg-[#434b65]'
                >
                  <NotepadText className='mt-1 h-4 w-4 text-white' />
                </div>
              </Popover>
            </Tooltip>
            <Tooltip title='Reminder'>
              <div className='cursor-pointer rounded px-1 transition-all hover:bg-[#434b65]'>
                <AlarmClock className='mt-1 h-4 w-4 text-white' />
              </div>
            </Tooltip>
            <Tooltip title='Meeting'>
              <div className='cursor-pointer rounded px-1 transition-all hover:bg-[#434b65]'>
                <Video className='mt-1 h-4 w-4 text-white' />
              </div>
            </Tooltip>
            <Tooltip title='Notification'>
              <div className='cursor-pointer rounded p-1 transition-all hover:bg-[#434b65]'>
                <Bell className='mt-1 h-4 w-4 text-white' />
              </div>
            </Tooltip>
            <Popover
              title='Profile information'
              content={
                <>
                  <Divider className='my-1' />

                  <div className='flex flex-col gap-y-2'>
                    <Button
                      icon={<User className='h-4 w-4' />}
                      type='text'
                      className='flex w-full items-center text-left text-black'
                    >
                      Profile
                    </Button>
                    <Button
                      icon={<Settings className='h-4 w-4' />}
                      type='text'
                      className='flex w-full items-center text-left text-black'
                    >
                      Setting
                    </Button>
                    <Button
                      icon={<LogOut className='h-4 w-4' />}
                      type='text'
                      className='flex w-full items-center text-left text-black'
                    >
                      Logout
                    </Button>
                  </div>
                  <p className='mt-2'>Support</p>
                  <Divider className='my-1' />
                  <div className='flex flex-col gap-y-2'>
                    <Button
                      icon={<HelpCircle className='h-4 w-4' />}
                      type='text'
                      className='flex w-full items-center text-left text-black'
                    >
                      Help
                    </Button>
                    <Button
                      icon={<MessageCircle className='h-4 w-4' />}
                      type='text'
                      className='flex w-full items-center text-left text-black'
                    >
                      Feedback
                    </Button>
                  </div>
                </>
              }
              trigger='click'
            >
              <div className='h-6 w-6 rounded-full'>
                <img src={user} className='h-full w-full rounded-full' />
              </div>
            </Popover>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

const Content = () => {
  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);

  const showModalCreateWorkspace = () => {
    setDialog(SEARCH_PARAMS_VALUE.WORKSPACE);
  };
  const showModalCreateProject = () => {
    setDialog(SEARCH_PARAMS_VALUE.PROJECT);
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <div
        onClick={showModalCreateProject}
        className='flex w-[270px] cursor-pointer flex-col p-2 transition-all hover:bg-slate-100'
      >
        <div className='flex items-center gap-x-2'>
          <FolderKanban className='h-4 w-4' />
          <Typography.Text className='font-semibold'>Create project</Typography.Text>
        </div>
        <Typography.Text className='text-xs'>
          A board is made up of cards arranged in a list. Use the board to manage projects, track
          information, or organize anything.
        </Typography.Text>
      </div>
      <Divider className='my-1' />
      <div
        onClick={showModalCreateWorkspace}
        className='flex w-[270px] cursor-pointer flex-col p-2 transition-all hover:bg-slate-100'
      >
        <div className='flex items-center gap-x-2'>
          <Users className='h-4 w-4' />
          <Typography.Text className='font-semibold'>Create workspace</Typography.Text>
        </div>
        <Typography.Text className='text-xs'>
          A Workspace is a collection of boards and people. Use the Workspace to organize your
          company, support busy individuals, family, or friends
        </Typography.Text>
      </div>
      <Divider className='my-1' />
      <div className='flex w-[270px] cursor-pointer flex-col p-2 transition-all hover:bg-slate-100'>
        <div className='flex items-center gap-x-2'>
          <SwatchBook className='h-4 w-4' />
          <Typography.Text className='font-semibold'>Start with sample</Typography.Text>
        </div>
        <Typography.Text className='text-xs'>
          Get started faster with a board template
        </Typography.Text>
      </div>
    </div>
  );
};

// <div className='flex items-center gap-x-2'>
//   <Typography.Text>Create workspace</div>
// <div className='flex items-center gap-x-2'>
//   <Typography.Text>Start with samples</div>

const workspaces: MenuProps['items'] = [
  {
    label: 'Current workspace',
    key: '0',
    style: { fontSize: '12px' },
  },
  {
    label: 'Graduate Project',
    key: '1',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },
  {
    type: 'divider',
  },
  {
    label: 'All workspace',
    key: '2',
    style: { fontSize: '12px' },
  },
  {
    label: 'Projec Huddle',
    key: '3',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },

  {
    label: 'Project Management',
    key: '4',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },
  {
    label: 'Karban Template',
    key: '5',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },
];

const samples: MenuProps['items'] = [
  {
    label: 'Top templates',
    key: '0',
    style: { fontSize: '12px' },
  },
  {
    label: 'Company Overview',
    key: '1',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },
  {
    label: 'Design Huddle',
    key: '2',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },

  {
    label: 'Karban Template',
    key: '3',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },
  {
    label: 'Project Management',
    key: '4',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },
];

const projects: MenuProps['items'] = [
  {
    label: 'DoubleD Thesis',
    key: '0',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },
  {
    label: 'Design Table',
    key: '1',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },

  {
    label: 'Karban Project',
    key: '2',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },
  {
    label: 'Leader Board',
    key: '3',
    icon: <img src={template} className='h-10 w-10 rounded-lg' />,
  },
];
