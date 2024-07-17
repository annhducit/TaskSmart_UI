import Logo from '@/shared/components/logo';
import { Button, Divider, Dropdown, Empty, Popover, Typography } from 'antd';
import type { MenuProps } from 'antd';
import {
  Activity,
  AlarmClock,
  Bell,
  ChevronDown,
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
import Tooltip from '@/shared/components/tooltip';
import useSearchParam from '@/shared/hooks/use-search-param';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import { ModalAddProject, ModalAddWorkspace } from '../features/workspace/page';
import ProfileFlyer from './profile-flyer';
import useCollapse from '@/shared/hooks/use-collapse';
import { useDispatch, useSelector } from '@/store';
import { toast } from 'sonner';
import { forceSignOut } from '@/store/auth';
import { useNavigate } from 'react-router-dom';
import Notepad from '../features/notepad/pages';
import useGetProject from '../features/workspace/components/project/hooks/query/use-get-project';
import useGetPath from '@/shared/hooks/use-get-path';
import useGetTemplates from '../features/templates/hooks/use-get-templates';
import useGetProfile from './hooks/use-profile';
import { isEmpty } from 'lodash';
import ChangeTheme from '../features/workspace/components/project/modify-card/popover/change-theme';
import ModalSearch from './search';

const Header = () => {
  const [open, setOpen] = useCollapse<boolean>(false);
  const [openFlyer, setOpenFlyer] = useCollapse<boolean>(false);
  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const isLoaded = useSelector((state) => state.auth.isLoaded);
  const handleOpenPopover = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleOpenFlyer = () => {
    setOpenFlyer(!openFlyer);
  };

  const handleSignout = () => {
    dispatch(forceSignOut());
    toast.success('You have been signed out successfully');
    navigate('/auth/sign-in');
    if (!isSignedIn || !isLoaded) {
      return null;
    }
  };
  const { path } = useGetPath();
  const isProject = path.includes('project');

  const { data: project } = useGetProject();
  const { data: profile } = useGetProfile();
  const { data: templates } = useGetTemplates();
  const userAuthenticated = useSelector((state) => state.user.data);

  const userProfileImage = userAuthenticated?.profileImagePath
    ? `http://localhost:8888/api/image/${userAuthenticated?.profileImagePath}`
    : user;

  const workspaces: MenuProps['items'] = [
    {
      label: 'Current workspace',
      key: '0',
      style: { display: isProject ? 'flex' : 'none', fontSize: '12px' },
    },
    {
      label: project?.workspace.name,
      style: { display: isProject ? 'flex' : 'none' },
      key: '1',
      icon: <img src={template} className='w-10 h-10 rounded-lg' />,
      className: 'gap-x-1',
      onClick: () => navigate(`../../../tsm/workspace/${project?.workspace.id}`),
    },
    {
      type: 'divider',
      style: { display: isProject ? 'flex' : 'none' },
    },
    {
      label: 'All workspace',
      key: '2',
      style: { fontSize: '12px', display: 'flex' },
      className: 'gap-x-1',
    },
    ...(profile?.workspaces || []).map((workspace) => ({
      label: workspace.name,
      style: { display: 'flex' },
      className: 'gap-x-1',
      key: workspace.id,
      icon: <img src={template as string} className='w-10 h-10 rounded-lg' />,
      onClick: () => navigate(`../../../tsm/workspace/${workspace.id}`),
    })),
    {
      label: profile?.personalWorkSpace.name,
      key: '3',
      icon: <img src={template} className='w-10 h-10 rounded-lg' />,
      onClick: () => navigate(`../../../tsm/workspace/${profile?.personalWorkSpace.id}`),
    },
  ];

  const samples: MenuProps['items'] =
    templates?.map((template) => ({
      label: template.name,
      key: template.id,
      icon: <img src={template.image?.urls?.small} className='w-10 h-10 rounded-lg' />,
    })) || [];

  const { btnColor, inpColor, color } = useSelector((state) => state.theme);

  return (
    <>
      <header
        className='relative px-6 py-1 shadow'
        style={{
          backgroundColor: color,
        }}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-10'>
            <Logo type='SINGLE_LOGO' />
            <div className='flex items-center gap-x-6'>
              <Dropdown
                trigger={['click']}
                children={
                  <div className='flex items-center gap-x-2'>
                    <div className='font-semibold text-white'>Workspaces</div>
                    <ChevronDown className='w-3 h-3 text-white' />
                  </div>
                }
                className='flex items-center cursor-pointer'
                menu={{ items: workspaces }}
              />
              <Dropdown
                trigger={['click']}
                children={
                  <div className='flex items-center gap-x-2'>
                    <div className='font-semibold text-white'>Samples</div>
                    <ChevronDown className='w-3 h-3 text-white' />
                  </div>
                }
                menu={{
                  items:
                    isEmpty(samples) || !samples.length
                      ? [
                          {
                            label: (
                              <div className='p-2'>
                                <Empty />
                              </div>
                            ),
                            key: 'empty',
                          },
                        ]
                      : samples,
                }}
              />
              <Dropdown
                trigger={['click']}
                children={
                  <div className='flex items-center gap-x-2'>
                    <div className='font-semibold text-white'>Projects</div>
                    <ChevronDown className='w-3 h-3 text-white' />
                  </div>
                }
                menu={{
                  items: profile?.projects?.map((project) => ({
                    label: project.name,
                    key: project.id,
                    icon: (
                      <img
                        src={project.backgroundUnsplash?.urls.full}
                        className='w-10 h-10 rounded-lg'
                      />
                    ),
                  })),
                }}
              />
            </div>
          </div>
          <div className='flex items-center gap-x-4'>
            <Button
              icon={<SearchIcon className='w-4 h-4 ' />}
              onClick={() => setDialog(SEARCH_PARAMS_VALUE.SEARCH_ALL)}
              style={{
                backgroundColor: inpColor,
              }}
              className='flex h-[28px] w-[390px]  items-center justify-center  border border-solid border-[#618096]  text-sm font-normal text-white'
            >
              Search...
            </Button>
            <Button
              style={{
                backgroundColor: btnColor,
                border: `1px solid ${btnColor}`,
              }}
              className='flex h-[28px] items-center border border-solid text-sm font-semibold text-white'
              icon={<Sparkles className='w-4 h-4 text-white' />}
            >
              <Typography.Text className='text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text'>
                Ask AI
              </Typography.Text>
            </Button>
          </div>
          <div className='flex items-center gap-x-4'>
            <Popover content={<Content />} trigger='click'>
              <Button
                style={{
                  backgroundColor: btnColor,
                  border: `1px solid ${btnColor}`,
                }}
                icon={<CirclePlus className='w-4 h-4 font-bold text-white' />}
                className='flex h-[28px] items-center rounded border border-solid border-[#33607e]  text-sm font-semibold text-white'
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
                  <NotepadText className='w-4 h-4 mt-1 text-white' />
                </div>
              </Popover>
            </Tooltip>
            <Tooltip title='Reminder'>
              <div className='cursor-pointer rounded px-1 transition-all hover:bg-[#434b65]'>
                <AlarmClock className='w-4 h-4 mt-1 text-white' />
              </div>
            </Tooltip>
            <Tooltip title='Meeting'>
              <div className='cursor-pointer rounded px-1 transition-all hover:bg-[#434b65]'>
                <Video className='w-4 h-4 mt-1 text-white' />
              </div>
            </Tooltip>
            <Tooltip title='Notification'>
              <div className='cursor-pointer rounded p-1 transition-all hover:bg-[#434b65]'>
                <Bell className='w-4 h-4 mt-1 text-white' />
              </div>
            </Tooltip>
            <Popover
              title='Account'
              style={{ width: '400px' }}
              content={
                <>
                  <div className='flex items-center gap-x-3'>
                    <div className='relative rounded-full h-9 w-9'>
                      <img src={userProfileImage} alt='' className='w-full h-full rounded-full' />
                      <span className='absolute bottom-1 right-0 rounded-full bg-[#1ad67b] p-1' />
                    </div>
                    <div className='flex flex-col opacity-75'>
                      <Typography.Text className='font-semibold'>
                        {userAuthenticated?.name || ''}
                      </Typography.Text>
                      <Typography.Text className='text-xs'> Online</Typography.Text>
                    </div>
                  </div>
                  <p className='mt-4'>Tasksmart</p>
                  <Divider className='my-1' />

                  <div className='flex flex-col gap-y-2'>
                    <Button
                      icon={<User className='w-4 h-4' color={btnColor} />}
                      type='text'
                      onClick={handleOpenFlyer}
                      className='flex items-center w-full text-left text-black'
                    >
                      Profile
                    </Button>
                    <Button
                      icon={<Activity className='w-4 h-4' color={btnColor} />}
                      type='text'
                      className='flex items-center w-full text-left text-black'
                    >
                      Activities
                    </Button>
                    <Popover trigger='click' placement='bottomLeft' content={<ChangeTheme />}>
                      <Button
                        icon={<Palette className='w-4 h-4' color={btnColor} />}
                        type='text'
                        className='flex items-center w-full text-left text-black'
                      >
                        Theme
                      </Button>
                    </Popover>
                    <Button
                      icon={<Settings className='w-4 h-4' color={btnColor} />}
                      type='text'
                      className='flex items-center w-full text-left text-black'
                    >
                      Setting
                    </Button>
                  </div>
                  <p className='mt-2'>Support</p>
                  <Divider className='my-1' />
                  <div className='flex flex-col gap-y-2'>
                    <Button
                      icon={<HelpCircle className='w-4 h-4' color={btnColor} />}
                      type='text'
                      className='relative flex items-center w-full text-left text-black'
                    >
                      Help
                      <SquareArrowOutUpRightIcon
                        className='absolute w-4 h-4 right-1'
                        color={btnColor}
                      />
                    </Button>
                    <Button
                      icon={<MessageCircle className='w-4 h-4' color={btnColor} />}
                      type='text'
                      className='flex items-center w-full text-left text-black'
                    >
                      Feedback
                    </Button>
                  </div>
                  <Divider className='my-1' />
                  <Button
                    icon={<LogOut className='w-4 h-4' color={btnColor} />}
                    type='text'
                    onClick={handleSignout}
                    className='flex items-center w-full text-left text-black'
                  >
                    Logout
                  </Button>
                </>
              }
              trigger='click'
            >
              <div className='relative'>
                <div className='w-6 h-6 rounded-full'>
                  <img src={userProfileImage} className='w-full h-full rounded-full' />
                </div>
                <span className='absolute right-0 top-0 rounded-full bg-[#3db88b] p-1' />
              </div>
            </Popover>
          </div>
        </div>
      </header>
      <div
        className={`z-[99] transition-transform duration-300 ease-in-out ${
          openFlyer ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transform: `translateX(${openFlyer ? '0' : '100%'})` }}
      >
        <ProfileFlyer isVisible={handleOpenFlyer} />
      </div>
      <ModalSearch />
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
          <FolderKanban className='w-4 h-4' />
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
          <Users className='w-4 h-4' />
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
          <SwatchBook className='w-4 h-4' />
          <Typography.Text className='font-semibold'>Start with sample</Typography.Text>
        </div>
        <Typography.Text className='text-xs'>
          Get started faster with a board template
        </Typography.Text>
      </div>
    </div>
  );
};
