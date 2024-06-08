import Logo from '@/shared/components/logo';
import { Button, Divider, MenuProps, Popover, Typography } from 'antd';
import {
  Activity,
  AlarmClock,
  Bell,
  CirclePlus,
  FolderKanban,
  HelpCircle,
  LogOut,
  MessageCircle,
  NotepadText,
  Palette,
  SearchIcon,
  Settings,
  Sparkles,
  SquareArrowOutUpRightIcon,
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
import { Notepad } from '../features/notepad';
import { ModalAddProject, ModalAddWorkspace } from '../features/workspace/page';
import ProfileFlyer from './profile-flyer';
import useCollapse from '@/shared/hooks/use-collapse';

const Header = () => {
  const [open, setOpen] = useCollapse<boolean>(false);
  const [openFlyer, setOpenFlyer] = useCollapse<boolean>(false);

  const handleOpenPopover = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleOpenFlyer = () => {
    setOpenFlyer(!openFlyer);
  };

  return (
    <>
      <header className='relative bg-[#263e50] px-6 py-1 shadow'>
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
            <Button
              icon={<SearchIcon className='h-4 w-4 ' />}
              className='flex h-[28px] w-[390px]  items-center justify-center  border border-solid border-[#618096] bg-[#3c5262] text-sm font-normal text-white'
            >
              Search...
            </Button>
            <Button
              className='flex h-[28px] items-center border border-solid border-[#33607e] bg-[#306a91] text-sm font-semibold text-white'
              icon={<Sparkles className='h-4 w-4 text-[#3db88b]' />}
            >
              Ask AI
            </Button>
          </div>
          <div className='flex items-center gap-x-4'>
            <Popover content={<Content />} trigger='click'>
              <Button
                icon={<CirclePlus className='h-4 w-4 font-bold text-[#3db88b]' />}
                className='flex h-[28px] items-center border border-solid border-[#33607e] bg-[#306a91] text-sm font-semibold text-white'
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
              title='Account'
              style={{ width: '400px' }}
              content={
                <>
                  <div className='flex items-center gap-x-3'>
                    <div className='relative h-9 w-9 rounded-full'>
                      <img src={user} alt='' className='h-full w-full rounded-full' />
                      <span className='absolute bottom-1 right-0 rounded-full bg-[#1ad67b] p-1' />
                    </div>
                    <div className='flex flex-col opacity-75'>
                      <Typography.Text className='font-semibold'>Nguyễn Trọng Đức</Typography.Text>
                      <Typography.Text className='text-xs'> Online</Typography.Text>
                    </div>
                  </div>
                  {/* <Divider className='my-1' /> */}
                  <p className='mt-4'>Tasksmart</p>
                  <Divider className='my-1' />

                  <div className='flex flex-col gap-y-2'>
                    <Button
                      icon={<User className='h-4 w-4' />}
                      type='text'
                      onClick={handleOpenFlyer}
                      className='flex w-full items-center text-left text-black'
                    >
                      Profile
                    </Button>
                    <Button
                      icon={<Activity className='h-4 w-4' />}
                      type='text'
                      className='flex w-full items-center text-left text-black'
                    >
                      Activities
                    </Button>
                    <Button
                      icon={<Palette className='h-4 w-4' />}
                      type='text'
                      className='flex w-full items-center text-left text-black'
                    >
                      Theme
                    </Button>
                    <Button
                      icon={<Settings className='h-4 w-4' />}
                      type='text'
                      className='flex w-full items-center text-left text-black'
                    >
                      Setting
                    </Button>
                  </div>
                  <p className='mt-2'>Support</p>
                  <Divider className='my-1' />
                  <div className='flex flex-col gap-y-2'>
                    <Button
                      icon={<HelpCircle className='h-4 w-4' />}
                      type='text'
                      className='relative flex w-full items-center text-left text-black'
                    >
                      Help
                      <SquareArrowOutUpRightIcon className='absolute right-1 h-4 w-4' />
                    </Button>
                    <Button
                      icon={<MessageCircle className='h-4 w-4' />}
                      type='text'
                      className='flex w-full items-center text-left text-black'
                    >
                      Feedback
                    </Button>
                  </div>
                  <Divider className='my-1' />
                  <Button
                    icon={<LogOut className='h-4 w-4' />}
                    type='text'
                    className='flex w-full items-center text-left text-black'
                  >
                    Logout
                  </Button>
                </>
              }
              trigger='click'
            >
              <div className='relative'>
                <div className='h-6 w-6 rounded-full'>
                  <img src={user} className='h-full w-full rounded-full' />
                </div>
                <span className='absolute right-0 top-0 rounded-full bg-[#3db88b] p-1' />
              </div>
            </Popover>
          </div>
        </div>
      </header>
      <div
        className={`z-[999999] transition-transform duration-300 ease-in-out ${
          openFlyer ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transform: `translateX(${openFlyer ? '0' : '100%'})` }}
      >
        <ProfileFlyer isVisible={handleOpenFlyer} />
      </div>

      <ModalAddProject />
      <ModalAddWorkspace />
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
