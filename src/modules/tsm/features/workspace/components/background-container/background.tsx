import { Button, Divider, Form, Input, Popover, Select, Typography } from 'antd';
import { Check, Ellipsis } from 'lucide-react';
import { useState } from 'react';

import dashboard from '@/assets/svgs/dashboard.svg';

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

  const [form] = Form.useForm();

  const handleChangeBackground = (value: string) => {
    setBackground(value);
  };

  const handleSubmitForm = () => {
    return;
  };

  return (
    <Form layout='vertical' form={form} name='create-project' onFinish={handleSubmitForm}>
      <div className='flex items-center gap-x-6'>
        {/* Temporary */}
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundColor: `${background}`,
            backgroundSize: 'cover',
          }}
          className='h-[120px] w-[246px] rounded'
        >
          <div className='mx-auto mt-2 h-[103px] w-[186px] rounded'>
            <img src={dashboard} alt='dashboard' className='h-full w-full rounded' />
          </div>
        </div>
        <div className='flex flex-col gap-y-1'>
          <Typography.Text>Background</Typography.Text>
          <div className='flex items-center gap-x-2'>
            {listBackground.map((item) => (
              <div
                className='h-[40px] w-[64px] cursor-pointer rounded transition-all hover:brightness-125'
                onClick={() => handleChangeBackground(item.url)}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className='h-full w-full rounded object-cover'
                />
              </div>
            ))}
          </div>
          <Divider className='my-1' />
          <div className='flex items-center gap-x-2'>
            {listColor.slice(0, 5).map((item) => (
              <div
                onClick={() => handleChangeBackground(item.color)}
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
          name='workspace'
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
            placeholder='My Workspace'
            allowClear
            options={[
              {
                value: 'my workspace',
                label: 'My Workspace',
              },
              {
                value: 'tasksmart workspace',
                label: 'Tasksmart Workspace',
              },
            ]}
          />
        </Form.Item>
      </div>
      <Form.Item
        name='privacy'
        className='w-full'
        label='Privacy'
        rules={[
          {
            required: true,
            message: 'Please choose privacy type',
          },
        ]}
      >
        <Select
          className='w-full'
          placeholder='Private'
          allowClear
          options={[
            {
              value: 'private',
              label: 'Private',
            },
            {
              value: 'public',
              label: 'Public',
            },
          ]}
        />
      </Form.Item>
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
        <Button type='primary' htmlType='submit'>
          Create
        </Button>
      </div>
    </Form>
  );
};

const SubBackgroundModal = ({
  handleChangeBackground,
  color,
}: {
  handleChangeBackground: (item: string) => void;
  color: string;
}) => {
  return (
    <>
      <div className='mx-auto mb-2 w-[9rem]'>
        <Typography.Text className='text-base font-semibold'>Project background</Typography.Text>
      </div>

      <div className='ml-4'>
        <Typography.Text className='text-sm'>Wallpaper</Typography.Text>
        <div className='mb-2 mt-1 flex w-[250px] flex-wrap items-center gap-2'>
          {listBackground.map((item) => (
            <div
              className='h-[40px] w-[64px] cursor-pointer rounded transition-all hover:brightness-125'
              onClick={() => handleChangeBackground(item.url)}
            >
              <img src={item.url} alt={item.name} className='h-full w-full rounded object-cover' />
            </div>
          ))}
        </div>
        <Divider className='my-1' />
        <Typography.Text className='text-sm'>Color</Typography.Text>
        <div className='mt-1 flex w-[250px] flex-wrap items-center gap-2'>
          {listColor.map((item) => (
            <div
              onClick={() => handleChangeBackground(item.color)}
              style={{
                backgroundColor: item.color,
              }}
              className={`relative h-[32px] w-[40px] cursor-pointer rounded transition-all hover:brightness-125`}
            >
              {item.color === color && (
                <Check className='absolute right-3 top-2 h-4 w-4 text-white' />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const listBackground = [
  {
    id: 1,
    name: 'Background 1',
    url: 'https://images.unsplash.com/photo-1487088678257-3a541e6e3922?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Background 2',
    url: 'https://images.unsplash.com/photo-1498612753354-772a30629934?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Background 3',
    url: 'https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Background 4',
    url: 'https://images.unsplash.com/photo-1492892132812-a00a8b245c45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const listColor = [
  {
    id: 1,
    name: 'Color 1',
    color: '#0079bf',
  },
  {
    id: 2,
    name: 'Color 2',
    color: '#d29034',
  },
  {
    id: 3,
    name: 'Color 3',
    color: '#519839',
  },
  {
    id: 4,
    name: 'Color 4',
    color: '#b04632',
  },
  {
    id: 5,
    name: 'Color 5',
    color: '#89609e',
  },
  {
    id: 6,
    name: 'Color 6',
    color: '#cd5a91',
  },
  {
    id: 7,
    name: 'Color 7',
    color: '#4bbf6b',
  },
  {
    id: 8,
    name: 'Color 8',
    color: '#00aecc',
  },
  {
    id: 9,
    name: 'Color 9',
    color: '#838c91',
  },
  {
    id: 10,
    name: 'Color 10',
    color: '#7f77f1',
  },
  {
    id: 11,
    name: 'Color 11',
    color: '#6985ff',
  },
  {
    id: 12,
    name: 'Color 12',
    color: '#1090e0',
  },
  {
    id: 13,
    name: 'Color 13',
    color: '#0f9d9f',
  },
  {
    id: 14,
    name: 'Color 14',
    color: '#3db88b',
  },
  {
    id: 15,
    name: 'Color 15',
    color: '#e16b16',
  },
  {
    id: 16,
    name: 'Color 16',
    color: '#ee5e99',
  },
  {
    id: 17,
    name: 'Color 17',
    color: '#b660e0',
  },
];
