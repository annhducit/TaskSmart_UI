import user from '@/assets/images/user.png';
import Dialog from '@/shared/components/dialog';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import { Button, Form, Input, Tabs, Typography, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/shared/hooks/use-redux';
import { UserType } from '@/configs/store/slices/userSlice';

import { UploadProps } from 'antd/lib';
import {
  Activity,
  CalendarDays,
  ChevronsRight,
  Layers3,
  NotebookPen,
  UserCog,
  UserRoundCheck,
} from 'lucide-react';
import { useState } from 'react';
import useSearchParam from '@/shared/hooks/use-search-param';
import { useDialogContext } from '@/shared/components/dialog/provider';

/**
 *
 * @param param0
 * @returns  ProfileFlyer
 * @author Anh duc
 */
const ProfileFlyer = ({ isVisible }: { isVisible: () => void }) => {
  const [, setDialog] = useSearchParam(SEARCH_PARAMS.MODAL);

  const userAuthenticated = useAppSelector((state) => state.user).data as UserType; 

  const items = [
    {
      label: 'Activity',
      key: 'activity',
      icon: <Activity className='h-[14px] w-[14px] opacity-80' />,
      children: <div>All your activities</div>,
    },
    {
      label: 'My work (0)',
      key: 'work',
      icon: <Layers3 className='h-[14px] w-[14px] opacity-80' />,
      children: <div>All your work</div>,
    },
    {
      label: 'Assigned (0)',
      key: 'task',
      icon: <UserRoundCheck className='h-[14px] w-[14px] opacity-80' />,
      children: <div>All your assigned tasks</div>,
    },
    {
      label: 'Calendar (0)',
      key: 'calendar',
      icon: <CalendarDays className='h-[14px] w-[14px] opacity-80' />,
      children: <div>All your calendar</div>,
    },
    {
      label: 'Notepad (0)',
      key: 'notepad',
      icon: <NotebookPen className='h-[14px] w-[14px] opacity-80' />,
      children: <div>All your notepad</div>,
    },
  ];

  return (
    <>
      <div
        className='absolute  right-0 top-0 z-[99999] h-screen w-[700px] -translate-y-10 bg-white'
        style={{
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.9)',
        }}
      >
        <div className='relative'>
          <div className='h-[4px] w-full bg-primary-default' />
          <div className='flex items-center w-full px-8 gap-x-6'>
            <div className='relative w-16 h-16 rounded-full'>
              <img src={userAuthenticated?.profileImage || user} alt='' className='w-full h-full rounded-full' />
              <span className='absolute right-1 top-1 rounded-full bg-[#1ad67b] p-[6px]'></span>
            </div>
            <div className='flex flex-col mt-6 gap-y-2'>
              <div className='flex items-center justify-between'>
                <p className='text-lg font-semibold text-black'>{userAuthenticated?.name || ""}</p>
                <Button
                  type='primary'
                  className='rounded-full'
                  icon={<UserCog className='w-3 h-3 ' />}
                  onClick={() => {
                    setDialog(SEARCH_PARAMS_VALUE.PROFILE);
                    isVisible();
                  }}
                >
                  Edit profile
                </Button>
              </div>
              <p className='text-sm text-gray-400'>{userAuthenticated?.username || ""}</p>
              <div className='flex items-center gap-10'>
                <div className='flex flex-col gap-y-1'>
                  <Typography.Text className='font-semibold'> Position </Typography.Text>
                  <Typography.Text> {userAuthenticated?.position || ""} </Typography.Text>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Typography.Text className='font-semibold'> Organization </Typography.Text>
                  <Typography.Text> {userAuthenticated?.organization || ""} </Typography.Text>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Typography.Text className='font-semibold'> Email </Typography.Text>
                  <Typography.Text> {userAuthenticated?.email || ""} </Typography.Text>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Typography.Text className='font-semibold'> Local time </Typography.Text>
                  <Typography.Text> 20:00 </Typography.Text>
                </div>
              </div>
            </div>
          </div>
          <div className='px-6 mt-6'>
            <Tabs items={items} />
          </div>
          <div
            onClick={isVisible}
            className='absolute left-0 top-[380px] rounded-br-full rounded-tr-full  px-[1px] py-1 opacity-50 transition-all hover:bg-slate-200 hover:opacity-100'
          >
            <ChevronsRight className='mt-1 h-[22px] w-[22px] text-primary-default' />
          </div>
        </div>
      </div>
      <ModifyProfile user={userAuthenticated} />
    </>
  );
};

export default ProfileFlyer;

const ModifyProfile = () => {
  return (
    <Dialog.Param
      paramKey={SEARCH_PARAMS.MODAL}
      paramValue={SEARCH_PARAMS_VALUE.PROFILE}
      size='xxs'
    >
      <ModalModifyProfile />
    </Dialog.Param>
  );
};

const ModalModifyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const { onClose } = useDialogContext();
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as File, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Dialog.CloseButton onClose={() => onClose()} />
      <div className='flex justify-center'>
        <Typography.Title level={4}>Edit profile</Typography.Title>
      </div>
      <div className='mt-2'>
        <Form layout='vertical'>
          <Form.Item
            name='image'
            className='flex items-center justify-center'
            label='Profile image'
          >
            <Upload
              name='avatar'
              listType='picture-circle'
              className='avatar-uploader'
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item label='Username'>
            <Input />
          </Form.Item>
          <Form.Item label='Email'>
            <Input />
          </Form.Item>
          <Form.Item label='Position'>
            <Input />
          </Form.Item>
          <Button type='primary' className='w-full'>
            {' '}
            Save{' '}
          </Button>
        </Form>
      </div>
    </>
  );
};

const getBase64 = (img: File, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
