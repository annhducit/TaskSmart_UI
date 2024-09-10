import Dialog from '@/shared/components/dialog';
import CopyUrlButton from '@/shared/components/dialog/copy-button';
import { useDialogContext } from '@/shared/components/dialog/provider';
import Tooltip from '@/shared/components/tooltip';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import useCollapse from '@/shared/hooks/use-collapse';
import { Avatar, Button, Divider, Switch, Tag, Typography } from 'antd';
import { ChevronDown, ChevronRight, User } from 'lucide-react';
import useGetProject from '../hooks/query/use-get-project';
import { createContext, useContext, useEffect, useState } from 'react';
import useGetInviteProject from '@/modules/tsm/features/invite/hooks/mutation/use-invite-project';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';

const ProjectContext = createContext<Project>({} as Project);
export default function ModifyMemberProject() {
  return (
    <Dialog.Param
      paramKey={SEARCH_PARAMS.MODAL}
      size='xs'
      paramValue={SEARCH_PARAMS_VALUE.ADD_MEMBER_PROJECT}
    >
      <ModalModifyMember />
    </Dialog.Param>
  );
}

const ModalModifyMember = () => {
  const { onClose } = useDialogContext();
  const [link, setLink] = useState<string>('');

  const projectId = getIdProjectFromUrl();

  /**
   * Refresh link when click refresh button
   */
  const { mutate: refresh } = useGetInviteProject({ isPublic: true, refresh: true });
  const { mutate: isPublic } = useGetInviteProject({ isPublic: true, refresh: false });
  const { mutate: isPrivate } = useGetInviteProject({ isPublic: false, refresh: false });

  const { data: project } = useGetProject();

  /**
   * Set link when project invite code is available for the first time
   */
  useEffect(() => {
    if (project?.inviteCode) {
      setLink(`${window.location.origin}/tsm/invite/${projectId}/${project?.inviteCode}`);
    }
    return;
  }, [project]);

  const handleChangeSwitch = (value: boolean) => {
    if (value) {
      isPublic();
      setLink(`${window.location.origin}/tsm/invite/${projectId}/${project?.inviteCode}`);
    } else {
      isPrivate();
      setLink('');
    }
  };

  return (
    <>
      <Dialog.CloseButton onClose={() => onClose()} />
      <div className='flex flex-col gap-y-2'>
        <Typography.Text className='my-2 text-xl font-semibold'>Share this Project</Typography.Text>
        <div className='flex items-center gap-x-1'>
          <Typography.Text className='flex items-center text-xs text-black'>
            Sharing
          </Typography.Text>
          <Tooltip title={project?.name}>
            <Typography.Text className='flex items-center underline'>
              <EarthIcon /> this project
            </Typography.Text>
          </Tooltip>
          <Typography.Text className='flex items-center text-xs text-black'>
            with all views
          </Typography.Text>
        </div>

        <div className='flex items-center justify-between'>
          {project?.inviteCode && <CopyUrlButton link={link} />}
          <div className='flex items-center gap-x-2'>
            <Tooltip
              title={
                project?.inviteCode
                  ? 'Anyone with the link can view this project'
                  : 'Only workspace members can view this project'
              }
            >
              <Switch
                defaultChecked={project?.inviteCode !== '' ? true : false}
                size='small'
                onChange={(value) => {
                  handleChangeSwitch(value);
                }}
              />
            </Tooltip>
            <Button type='text' onClick={() => refresh()}>
              Refresh
            </Button>
          </div>
        </div>
        <Typography.Text className='text-sm font-semibold'>Share with</Typography.Text>

        <ProjectContext.Provider value={project as Project}>
          <div className='mt-1 flex flex-col gap-3'>
            <MemberAlready type='WORKSPACE' />
            <MemberAlready type='PERSON' />
          </div>
        </ProjectContext.Provider>
      </div>
    </>
  );
};

const EarthIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      className='mr-1 size-4 opacity-40'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64'
      />
    </svg>
  );
};

type MemberType = 'WORKSPACE' | 'PERSON';

const MemberAlready = (props: { type?: MemberType }) => {
  const [checked, setChecked] = useCollapse<boolean>(false);
  const [visible, setVisible] = useCollapse<boolean>(false);
  const handleChangeSwitch = (
    checked: boolean,
    even: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    even.stopPropagation();
    setChecked(checked);
  };

  const handleViewMemberDetail = () => {
    setVisible(!visible);
  };

  const project = useContext(ProjectContext);

  const ownerName = project?.users?.find((user) => user.role === 'Owner')?.name;
  return (
    <>
      {props.type === 'WORKSPACE' && (
        <div
          className='flex cursor-pointer items-center justify-between'
          onClick={handleViewMemberDetail}
        >
          <div className='flex items-center gap-x-2'>
            {visible ? (
              <ChevronDown className='h-4 w-4 opacity-50' />
            ) : (
              <ChevronRight className='h-4 w-4 opacity-50' />
            )}

            <Avatar size='small' style={{ backgroundColor: 'blue' }}>
              G
            </Avatar>
            <Typography.Text className='text-xs font-semibold'>
              {project?.workspace?.name}
            </Typography.Text>
            <Tag color='green'>Workspace</Tag>
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <Tooltip title={ownerName}>
                <Avatar size='small' style={{ backgroundColor: '#b660e0' }}>
                  {ownerName?.charAt(0)}
                </Avatar>
              </Tooltip>
              <Tooltip title={`${checked ? 'Make private' : 'Make public'}`}>
                <Switch
                  size='small'
                  onChange={(value, even) => {
                    handleChangeSwitch(value, even);
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      )}
      {props.type === 'PERSON' && (
        <div
          className='flex cursor-pointer items-center justify-between'
          onClick={handleViewMemberDetail}
        >
          <div className='flex items-center gap-x-2'>
            {visible ? (
              <ChevronDown className='h-4 w-4 opacity-50' />
            ) : (
              <ChevronRight className='h-4 w-4 opacity-50' />
            )}

            <Avatar size='small'>
              <User className='h-4 w-4' />
            </Avatar>
            <Typography.Text className='text-xs font-semibold'>Person</Typography.Text>
          </div>
          <div>
            <div className='flex items-center'>
              {project?.users?.map((member) => (
                <Tooltip key={member.userId} title={member.name}>
                  <Avatar
                    size='small'
                    src={`http://localhost:8888/api/image/${member.profileImagePath}`}
                    className={`${member.profileImagePath ? '' : 'bg-blue-500'}`}
                  >
                    {member.name.charAt(0)}
                  </Avatar>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      )}
      {visible && <Members />}
    </>
  );
};

const Members = () => {
  const project = useContext(ProjectContext);

  return (
    <>
      <Divider className='my-[1px] mb-2' />
      <Typography.Text className='text-sm font-semibold'>1 invited person</Typography.Text>
      <div className='flex flex-col gap-y-2'>
        {project?.users?.map((user) => (
          <div key={user.userId} className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <Avatar size='small' src={`http://localhost:8888/api/image/${user.profileImagePath}`}>
                {user.name.charAt(0)}
              </Avatar>
              <Typography.Text className='text-xs font-semibold'>{user.name}</Typography.Text>
              <Tag color={user.role === 'Owner' ? 'blue' : 'green'}>
                {user.role === 'Owner' ? 'Workspace Owner' : 'Member'}
              </Tag>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
