import Dialog from '@/shared/components/dialog';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import type { GetProp, UploadFile } from 'antd';
import { Button, Form, Input, Modal, Select, Tabs, Typography, Upload } from 'antd';

import type { UploadProps } from 'antd/lib';
import {
  Activity,
  CalendarDays,
  ChevronsRight,
  FilePenLine,
  Layers3,
  Mail,
  NotebookPen,
  ShieldCheck,
  UploadCloud,
  UploadIcon,
  UserCog,
  UserRoundCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import useSearchParam from '@/shared/hooks/use-search-param';
import { useDialogContext } from '@/shared/components/dialog/provider';
import useGetProfile from './hooks/use-profile';
import useUpdateProfile from './hooks/use-update-profile';

import ImgCrop from 'antd-img-crop';
import Tooltip from '@/shared/components/tooltip';
import { useUploadProfileImage } from './hooks/use-upload-profile-image';
import useGetImage from './hooks/use-get-image';
import { tsmAxios } from '@/configs/axios';
import useCollapse from '@/shared/hooks/use-collapse';
import { toast } from 'sonner';
import type { AuthType } from '@/modules/sign-up';
import opt from '@/assets/images/otp.png';
import useUpdateEmail from './hooks/use-update-email';
/**
 *
 * @param param0
 * @returns  ProfileFlyer
 * @author Anh duc
 */

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

/**
 *
 * @param file
 * @description Preview image crop
 * @author Duc Nguyen
 */

const onPreview = async (file: UploadFile) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as FileType);
      reader.onload = () => resolve(reader.result as string);
    });
  }

  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const ProfileFlyer = ({ isVisible }: { isVisible: () => void }) => {
  const [, setDialog] = useSearchParam(SEARCH_PARAMS.MODAL);

  const { data } = useGetProfile();
  const { data: profileImage } = useGetImage(data?.profileImagePath as string);
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
        className='absolute right-0 top-0 z-[99999] h-screen w-[700px] -translate-y-10 bg-white'
        style={{
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.9)',
        }}
      >
        <div className='relative'>
          <div className='h-[4px] w-full bg-primary-default' />
          <div className='flex w-full items-center gap-x-4 px-8 pt-6'>
            <div className='relative flex flex-col rounded-full'>
              {profileImage && (
                <div className='h-[100px] w-[100px]'>
                  <img
                    src={profileImage}
                    alt='avatar'
                    className='h-full w-full rounded-full object-cover'
                    style={{ width: '100%' }}
                  />
                </div>
              )}

              <Tooltip trigger='hover' placement='bottom' title='Upload image'>
                <UploadCloud
                  onClick={() => {
                    setDialog(SEARCH_PARAMS_VALUE.PROFILE_IMAGE);
                    isVisible();
                  }}
                  size={18}
                  className='absolute -bottom-3 right-1 cursor-pointer text-primary-default transition-all hover:opacity-60'
                />
              </Tooltip>

              <span className='absolute right-1 top-1 rounded-full bg-[#1ad67b] p-[6px]'></span>
            </div>

            <div className='flex flex-col'>
              <div className='flex items-center justify-between'>
                <p className='text-lg font-semibold text-black'>{data?.name || ''}</p>
                <Button
                  type='primary'
                  className='rounded-full'
                  icon={<UserCog className='h-3 w-3' />}
                  onClick={() => {
                    setDialog(SEARCH_PARAMS_VALUE.PROFILE);
                    isVisible();
                  }}
                >
                  Edit profile
                </Button>
              </div>
              <p className='text-sm text-gray-400'>{data?.username || ''}</p>
              <div className='flex items-center gap-x-3'>
                <div className='flex flex-col gap-y-1'>
                  <Typography.Text className='font-semibold'> Position </Typography.Text>
                  <Typography.Text className='w-32 truncate text-xs font-semibold opacity-60'>
                    {' '}
                    {data?.position || ''}{' '}
                  </Typography.Text>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Typography.Text className='font-semibold'> Organization </Typography.Text>
                  <Typography.Text className='w-32 truncate text-xs font-semibold opacity-60'>
                    {' '}
                    {data?.organization || ''}{' '}
                  </Typography.Text>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <div className='flex items-center gap-x-2'>
                    <Typography.Text className='font-semibold'> Email </Typography.Text>
                    <FilePenLine
                      onClick={() => {
                        setDialog(SEARCH_PARAMS_VALUE.UPDATE_EMAIL);
                        isVisible();
                      }}
                      size={14}
                      className='cursor-pointer text-primary-default transition-all hover:opacity-60'
                    />
                  </div>
                  <Typography.Text className='w-32 truncate text-xs font-semibold opacity-60'>
                    {data?.email || ''}
                  </Typography.Text>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Typography.Text className='font-semibold'> Local time </Typography.Text>
                  <Typography.Text className='text-center text-xs font-semibold opacity-60'>
                    {data?.timeZone}
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 px-6'>
            <Tabs items={items} />
          </div>
          <div
            onClick={isVisible}
            className='absolute left-0 top-[380px] rounded-br-full rounded-tr-full px-[1px] py-1 opacity-50 transition-all hover:bg-slate-200 hover:opacity-100'
          >
            <ChevronsRight className='mt-1 h-[22px] w-[22px] text-primary-default' />
          </div>
        </div>
      </div>
      <ModifyProfile />
      <ModifyEmail />
      <ModifyProfileImage />
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

const ModifyEmail = () => {
  return (
    <Dialog.Param
      paramKey={SEARCH_PARAMS.MODAL}
      paramValue={SEARCH_PARAMS_VALUE.UPDATE_EMAIL}
      size='xxs'
    >
      <ModalModifyEmail />
    </Dialog.Param>
  );
};

const ModifyProfileImage = () => {
  return (
    <Dialog.Param
      paramKey={SEARCH_PARAMS.MODAL}
      paramValue={SEARCH_PARAMS_VALUE.PROFILE_IMAGE}
      size='xxs'
    >
      <UploadProfileImg />
    </Dialog.Param>
  );
};
const ModalModifyProfile = () => {
  const { data: user } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      username: user?.username,
      position: user?.position,
      organization: user?.organization,
      gender: user?.gender,
    });
  }, [form, user]);

  const onFinish = (values: Partial<UserData>) => {
    updateProfile(values);
  };

  const { onClose } = useDialogContext();

  return (
    <>
      <Dialog.CloseButton onClose={() => onClose()} />
      <div className='flex justify-center'>
        <Typography.Title level={4}>Edit profile</Typography.Title>
      </div>
      <div className='mt-2'>
        <Form layout='vertical' form={form} onFinish={onFinish}>
          <Form.Item label='Fullname' name='name'>
            <Input />
          </Form.Item>
          <Form.Item label='Username' name='username'>
            <Input />
          </Form.Item>

          <Form.Item label='Position' name='position'>
            <Input />
          </Form.Item>
          <Form.Item label='Organization' name='organization'>
            <Input />
          </Form.Item>
          <Form.Item name='gender' className='flex-1' label='Gender'>
            <Select
              placeholder='Male'
              options={[
                {
                  value: 'male',
                  label: 'Male',
                },
                {
                  value: 'female',
                  label: 'Female',
                },
                {
                  value: 'other',
                  label: 'Other',
                },
              ]}
            />
          </Form.Item>
          <Button loading={isPending} type='primary' htmlType='submit' className='w-full'>
            Save
          </Button>
        </Form>
      </div>
    </>
  );
};

const ModalModifyEmail = () => {
  const [form] = Form.useForm();
  const { onClose } = useDialogContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isSendCode, setIsSendCode] = useCollapse<boolean>(false);
  const [count, setCount] = useState(60);

  const { data: profile } = useGetProfile();
  const { mutate: updateEmail, isPending } = useUpdateEmail();

  useEffect(() => {
    form.setFieldsValue({
      email: profile?.email,
    });
  }, [form, profile]);

  const sendVerifyEmailRequest = async () => {
    const email = form.getFieldValue('email');
    if (!email) {
      form.setFields([
        {
          name: 'email',
          errors: ['Please input your Email!'],
        },
      ]);
    } else {
      setLoading(true);
      await tsmAxios
        .post(`/verify?email=${email}`)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setIsSendCode(true);
            toast.success('Email was send successfully');
            setLoading(false);
          }
          const interval = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount === 0) {
                clearInterval(interval);

                return 60;
              }
              return prevCount - 1;
            });
          }, 1000);
        })

        .catch(() => {
          toast.error('Email sent failed');
        });
    }
  };

  const hideModal = () => {
    setOpen(false);
  };
  const onFinish = (values: Partial<AuthType>) => {
    updateEmail(values);
  };
  return (
    <>
      <Dialog.CloseButton onClose={() => onClose()} />
      <div className='flex justify-center'>
        <Typography.Title level={4}>Update email</Typography.Title>
      </div>
      <div className='mt-2'>
        <Form layout='vertical' form={form} onFinish={onFinish}>
          <div className='flex items-end justify-between gap-x-2'>
            <Form.Item
              label='Email'
              className='flex-1'
              name='email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid Email!',
                },
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input
                prefix={<Mail className='mr-2 flex h-3 w-3 items-center text-primary-default' />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='default'
                size='small'
                icon={<ShieldCheck className='h-3 w-3' />}
                className='flex items-center text-xs font-semibold text-primary-default'
                loading={loading}
                onClick={() => {
                  sendVerifyEmailRequest();
                  setOpen(true);
                }}
                disabled={isSendCode}
              >
                {isSendCode ? `${count}s` : 'Verify'}
              </Button>
            </Form.Item>
          </div>
          <Form.Item
            label='Enter your code'
            name='verifyCode'
            className={isSendCode ? 'w-full' : 'hidden'}
            rules={[
              {
                required: true,
                message: 'Please input your code!',
              },
            ]}
          >
            <Input.OTP className='w-full' />
          </Form.Item>

          <Form.Item>
            <Button loading={isPending} type='primary' htmlType='submit' className='w-full'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal open={open} onOk={hideModal} cancelText='' okText='Ok'>
        <div className='flex flex-col gap-y-2'>
          <div className='mx-auto h-32 w-32'>
            <img src={opt} alt='opt' className='h-full w-full' />
          </div>
          <Typography.Text className='text-center text-2xl font-semibold text-blue-600'>
            Check your email
          </Typography.Text>
          <Typography.Text className='text-center text-sm text-gray-500'>
            We have sent a code to
            <p className='font-semibold'>{form.getFieldValue('email')}</p>
          </Typography.Text>
          <Typography.Text className='text-center text-sm text-gray-500'>
            Please check your email and enter the code below
          </Typography.Text>
        </div>
      </Modal>
    </>
  );
};

const UploadProfileImg = () => {
  const { mutate: uploadImage, isPending } = useUploadProfileImage();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUploadImage = () => {
    if (fileList.length > 0) {
      uploadImage({ image: fileList[0].originFileObj as File });
    }
  };
  const { onClose } = useDialogContext();

  return (
    <>
      <Dialog.CloseButton onClose={() => onClose()} />
      <div className='flex flex-col gap-y-2'>
        <div className='flex justify-center'>
          <Typography.Title level={4}>Upload image</Typography.Title>
        </div>
        <div className='mx-auto mt-2'>
          <ImgCrop
            rotationSlider
            onModalCancel={() => {
              setFileList([]);
            }}
            modalClassName='z-[9999]'
          >
            <Upload
              name='avatar'
              listType='picture-circle'
              className='avatar-uploader flex w-full items-center border-none border-transparent object-cover'
              beforeUpload={() => false}
              showUploadList={true}
              onPreview={onPreview}
              onChange={(e) => {
                setFileList(e?.fileList);
              }}
            >
              {fileList.length < 1 && (
                <Button
                  type='default'
                  size='small'
                  className='flex w-20 items-center justify-center text-xs'
                  icon={<UploadIcon className='flex h-4 w-4 items-center text-xs' />}
                >
                  Upload
                </Button>
              )}
            </Upload>
          </ImgCrop>
        </div>
        <Button
          type='primary'
          onClick={handleUploadImage}
          disabled={fileList.length < 1}
          className='mt-4 w-full'
          loading={isPending}
        >
          Save
        </Button>
      </div>
    </>
  );
};
