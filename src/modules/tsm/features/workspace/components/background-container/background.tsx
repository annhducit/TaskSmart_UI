import { Button, Divider, Form, Input, Popover, Select, Spin, Typography } from 'antd';
import { Check, Ellipsis } from 'lucide-react';
import { useState } from 'react';

import dashboard from '@/assets/svgs/dashboard.svg';
import { useSelector } from '@/store';
import useCreateProject from '../project/hooks/mutation/use-create-project';
import useGetBackground from '../../hooks/query/use-get-background';
import { listColor } from '@/shared/data';
import SubBackgroundModal from './sub-background';

/**
 * @description Project background component
 * @returns JSX.Element
 * @author Duc Nguyen
 */
const ProjectBackground = () => {
  return (
    <>
      <BackgroundReview />
    </>
  );
};

export default ProjectBackground;

const BackgroundReview = () => {
  const { TextArea } = Input;
  const [background, setBackground] = useState<string>('#00aecc');
  const [backgroundUnsplash, setBackgroundUnsplash] = useState<UnsplashResponse>();

  const [form] = Form.useForm<TSMProjectRequest>();
  const { mutate: createProject, isPending } = useCreateProject();

  const userAuthenticated = useSelector((state) => state.user.data);
  const userWorkspaces = [userAuthenticated.personalWorkSpace, ...userAuthenticated.workspaces];

  const handleChangeBackground = (value: UnsplashResponse) => {
    setBackgroundUnsplash(value);
    setBackground(value.urls.small);
  };

  const handleChangeBackgroundColor = (value: string) => {
    setBackground(value);
  };

  const handleSubmitForm = (value: TSMProjectRequest) => {
    if (background.startsWith('#') && background.length === 7) {
      createProject({ ...value, background });
    } else {
      createProject({ ...value, background: backgroundUnsplash?.id || '' });
    }
  };

  const { data: listBackground, isLoading } = useGetBackground();

  return (
    <Form
      layout='vertical'
      className='w-full'
      form={form}
      name='create-project'
      onFinish={handleSubmitForm}
    >
      <div className='flex w-full flex-col items-center gap-x-6'>
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundColor: `${background}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className='h-[120px] w-[192px] rounded'
        >
          <div className='mx-auto mt-2 h-[103px] w-[160px] rounded'>
            <img src={dashboard} alt='dashboard' className='h-full w-full rounded' />
          </div>
        </div>
        <div className='flex flex-col gap-y-1'>
          <Typography.Text>Background</Typography.Text>
          <div className='flex items-center gap-x-2'>
            {listBackground?.map((item) => (
              <div
                key={item.id}
                className='h-[40px] w-[64px] cursor-pointer rounded transition-all hover:brightness-125'
                onClick={() => handleChangeBackground(item)}
              >
                <img
                  src={item.urls.small}
                  alt='background'
                  className='h-full w-full rounded object-cover'
                />
              </div>
            ))}
            {isLoading && (
              <div className='flex items-center justify-center'>
                <Spin size='small' />
              </div>
            )}
          </div>
          <Divider className='my-1' />
          <div className='flex items-center justify-center gap-x-2'>
            {listColor.slice(0, 10).map((item) => (
              <div
                key={item.id}
                onClick={() => handleChangeBackgroundColor(item.color)}
                style={{
                  backgroundColor: item.color,
                }}
                className={`relative h-[32px] w-[40px] cursor-pointer rounded transition-all hover:brightness-125`}
              >
                {item.color === background && (
                  <Check className='absolute right-3 top-2 h-4 w-4 text-white' />
                )}
              </div>
            ))}
            <Popover
              trigger='click'
              placement='right'
              content={
                <SubBackgroundModal
                  color={background}
                  handleChangeBackground={handleChangeBackground}
                  handleChangeBackgroundColor={handleChangeBackgroundColor}
                  defaultBackgrounds={listBackground || []}
                />
              }
            >
              <Button className='flex items-center'>
                <Ellipsis className='h-4 w-4' />
              </Button>
            </Popover>
          </div>
        </div>
      </div>
      <div className='mt-4 flex items-center'>
        <Form.Item
          name='name'
          className='w-full'
          label='Project name'
          rules={[
            {
              required: true,
              message: 'Please enter project name',
            },
          ]}
        >
          <Input allowClear className='w-[246px]' placeholder='Graphic Design Project' />
        </Form.Item>
        <Form.Item
          name='workspaceId'
          className='mr-1 w-full'
          label='Workspace'
          rules={[
            {
              required: true,
              message: 'Please choose workspace',
            },
          ]}
        >
          <Select
            className='w-full'
            allowClear
            options={userWorkspaces.map((item) => ({ value: item.id, label: item.name }))}
          />
        </Form.Item>
      </div>

      <Form.Item name='description' className='w-full' label='Description'>
        <TextArea
          className='w-full'
          rows={3}
          placeholder='Something about your project'
          allowClear
        />
      </Form.Item>

      <div className='float-right mt-[6px] flex items-center gap-x-4'>
        <Button type='default'>Start with samples</Button>
        <Button type='primary' htmlType='submit' loading={isPending}>
          Create
        </Button>
      </div>
    </Form>
  );
};
