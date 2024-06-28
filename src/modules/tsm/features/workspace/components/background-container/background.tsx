import { Button, Divider, Form, Input, Popover, Select, Typography, List } from 'antd';
import { Check, Ellipsis } from 'lucide-react';
import { useState } from 'react';

import dashboard from '@/assets/svgs/dashboard.svg';
import { useSelector } from '@/store';
import { tsmAxios } from '@/configs/axios';
import useCreateProject from '../project/hooks/mutation/use-create-project';
import type { SearchProps } from 'antd/es/input';
import useGetBackground from '../../hooks/query/use-get-background';

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

  const { data: listBackground } = useGetBackground();

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

const SubBackgroundModal = ({
  handleChangeBackground,
  handleChangeBackgroundColor,
  color,
  defaultBackgrounds,
}: {
  handleChangeBackground: (item: UnsplashResponse) => void;
  handleChangeBackgroundColor: (color: string) => void;
  color: string;
  defaultBackgrounds: UnsplashResponse[];
}) => {
  const [listBackground, setListBackground] = useState<UnsplashResponse[]>(defaultBackgrounds);
  const [backgroundSearch, setBackgroundSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const fetchBackgroundWithoutQuery = async () => {
    try {
      const response = await tsmAxios.get<UnsplashResponse[]>('unsplash/photos?page=1&per_page=8');
      setListBackground((res) => [...res, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBackground = async (query: string) => {
    try {
      const response = await tsmAxios.get<UnsplashResponse[]>(
        `unsplash/photos?query=${query}&page=${page}&per_page=8`
      );
      if (page === 1) setListBackground(response.data);
      else setListBackground((res) => [...res, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadMore = () => {
    if (backgroundSearch) {
      fetchBackground(backgroundSearch);
      setPage((pre) => pre + 1);
    } else {
      fetchBackgroundWithoutQuery();
    }
  };

  const loadMore = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>Load more</Button>
    </div>
  );

  const onSearch: SearchProps['onSearch'] = (value, _e, _info) => {
    if (value) {
      fetchBackground(value);
      setPage(2);
    }
  };

  return (
    <>
      <div className='mx-auto mb-2 w-[9rem] transition-transform'>
        <Typography.Text className='text-base font-semibold'>Project background</Typography.Text>
      </div>

      <div className=''>
        <Typography.Text className='text-sm'>Wallpaper</Typography.Text>
        <div>
          <Input.Search
            value={backgroundSearch}
            onChange={(e) => {
              setBackgroundSearch(e.target.value);
            }}
            placeholder='Search image ...'
            onSearch={onSearch}
          ></Input.Search>
        </div>
        <div className='mb-2 mt-1 flex w-[320px] flex-wrap items-center gap-2'>
          <List
            grid={{ column: 4 }}
            loadMore={loadMore}
            dataSource={listBackground}
            renderItem={(item) => (
              <div
                className='ml-[auto] mr-[auto] mt-2 h-[40px] w-[64px] cursor-pointer rounded transition-all hover:brightness-125'
                onClick={() => handleChangeBackground(item)}
              >
                <img
                  src={item.urls.small}
                  alt='background'
                  className='h-full w-full rounded object-cover'
                />
              </div>
            )}
          ></List>
        </div>
        <Divider className='my-1' />
        <Typography.Text className='text-sm'>Color</Typography.Text>
        <div className='mt-1 flex w-[320px] flex-wrap items-center gap-2'>
          {listColor.map((item) => (
            <div
              onClick={() => handleChangeBackgroundColor(item.color)}
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
