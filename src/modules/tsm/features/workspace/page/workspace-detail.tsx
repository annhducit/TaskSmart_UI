import { useParams } from 'react-router-dom';
import projectImg from '@/assets/images/karban.png';
import { Button, Card, Divider, Form, Input, Mentions, Select, Tag, Typography } from 'antd';
import { LockKeyhole, PlusCircle } from 'lucide-react';
import Search from 'antd/es/input/Search';
import ProjectItem from '../components/project-item';
import useSearchParam from '@/shared/hooks/use-search-param';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
import ProjectBackground from '../components/background-container/background';
import { useState, useEffect } from 'react';


import createWps from '@/assets/gifs/create-workspace.gif';
import CopyUrlButton from '@/shared/components/dialog/copy-button';
import { tsmAuthAxios, tsmAxios } from '@/configs/axios';
const WorkspaceDetail = () => {
  const { workspaceId } = useParams();

  console.log(workspaceId);

  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);

  const showModal = () => {
    setDialog(SEARCH_PARAMS_VALUE.PROJECT);
  };

  const handleChange = (value: { value: string; label: string }) => console.log(value);

  const onSearch = (value: string) => console.log(value);
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex items-center gap-x-5'>
          <div className='w-20 h-20 rounded'>
            <img src={projectImg} alt='' className='w-full h-full rounded-lg' />
          </div>
          <div className='flex flex-col'>
            <Typography.Title level={3}>TaskSmart Workspace</Typography.Title>
            <div className='flex items-center gap-x-4'>
              <Tag color='gold'>Premium</Tag>
              <div className='flex items-center'>
                <LockKeyhole color='red' className='w-4 h-4 mr-1' />
                <Tag color='red'>Private</Tag>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <Typography.Title level={5}>
            <b>Recent activities</b>
          </Typography.Title>
          <div className='grid grid-cols-3 gap-4'>
            <Card title='Recent Activities' className='rounded-lg' bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>

            <Card title='Docs' className='rounded-lg' bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card title='Resources' className='rounded-lg' bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
        </div>
        <Divider />
        <div>
          <Typography.Title level={5} className='mb-6'>
            <b> Project</b>
          </Typography.Title>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-4'>
              <div className='flex flex-col gap-1'>
                <Typography.Text>Sort by</Typography.Text>
                <Select
                  title='Sort by'
                  showSearch
                  style={{ width: 250 }}
                  defaultValue={{
                    value: '1',
                    label: 'Most recent activity',
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: '1',
                      label: 'Most recent activity',
                    },
                    {
                      value: '2',
                      label: 'Least recent activity',
                    },
                    {
                      value: '3',
                      label: 'Sort by date ascending',
                    },
                    {
                      value: '4',
                      label: 'Sort by name descending',
                    },
                  ]}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Typography.Text>Filter by</Typography.Text>
                <Select
                  showSearch
                  style={{ width: 230 }}
                  placeholder='Filter by collection'
                  onChange={handleChange}
                  options={[
                    {
                      value: '1',
                      label: 'Collection one',
                    },
                    {
                      value: '2',
                      label: 'Collection two',
                    },
                  ]}
                />
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <Typography.Text>Search</Typography.Text>
              <Search
                placeholder='Search project'
                allowClear
                onSearch={onSearch}
                style={{ width: 270 }}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4 my-6'>
            <Button
              className='flex items-center justify-center w-full h-32 mx-auto'
              icon={<PlusCircle className='w-4 h-4' />}
              type='dashed'
              onClick={showModal}
            >
              Create project
            </Button>
            {[1, 2, 3, 4, 5].map((item) => (
              <ProjectItem key={item} />
            ))}
          </div>
        </div>
      </div>
      <ModalAddProject />
      <ModalAddWorkspace />
    </>
  );
};

export default WorkspaceDetail;

export const ModalAddWorkspace = () => {
  return (
    <Dialog.Param
      size='md'
      paramKey={SEARCH_PARAMS.DIALOG}
      paramValue={SEARCH_PARAMS_VALUE.WORKSPACE}
    >
      <ModalCreateWorkspace />
    </Dialog.Param>
  );
};

type WorkspaceRequest = {
  name: string;
  categoryId: string;
  description: string;
};

const ModalCreateWorkspace = () => {
  const { onClose } = useDialogContext();
  const [form] = Form.useForm<WorkspaceRequest>();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await tsmAxios.get('/categories');
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const handleSubmit = (value: WorkspaceRequest) => {
    const createWorkSpace = async () => {
      try {
        const res = await tsmAuthAxios.post('/workspaces', value);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    createWorkSpace();
  };
  return (
    <>
      <Dialog.CloseButton onClose={() => onClose()} />
      <div className='flex flex-col gap-y-4'>
        <div className='mx-auto text-center'>
          <Typography.Text className='text-base font-semibold'>Create workspace</Typography.Text>
        </div>

        <div className='grid grid-cols-2 gap-20'>
          <div className='col-span-1'>
            <Form
              form={form}
              layout='vertical'
              onFinish={handleSubmit}
              name='create-workspace'
              className='flex flex-col w-full'
            >
              <Form.Item>
                <Form.Item
                  name='name'
                  label='Name of workspace'
                  rules={[{ required: true, message: 'Please enter name of workspace!' }]}
                >
                  <Input allowClear placeholder='My workspace' />
                </Form.Item>
                <Form.Item
                  name='categoryId'
                  label='Category of workspace'
                  rules={[{ required: true, message: 'Please enter description of workspace!' }]}
                >
                  <Select
                    placeholder='Select type of workspace'
                    allowClear
                    options={categories.map((item) => {return {value: item.id, label: item.name}})}
                    // {[
                    //   {
                    //     value: 'it',
                    //     label: 'Information Technology',
                    //   },
                    //   {
                    //     value: 'finance',
                    //     label: 'Finance',
                    //   },
                    //   {
                    //     value: 'marketing',
                    //     label: 'Marketing',
                    //   },
                    //   {
                    //     value: 'hr',
                    //     label: 'Human Resource',
                    //   },
                    // ]}
                  />
                </Form.Item>
                <Form.Item name='description' label='Description of workspace'>
                  <Input.TextArea allowClear rows={4} placeholder='Description' />
                </Form.Item>
                {/* <Form.Item
                  name='share'
                  label={
                    <Typography.Text className='text-base font-semibold'>
                      Invite your team
                    </Typography.Text>
                  }
                >
                  <div className='flex items-center justify-between'>
                    <Typography.Text>Members in the workspace</Typography.Text>
                    <CopyUrlButton />
                  </div>
                  <Mentions
                    style={{ width: '100%' }}
                    className='mt-1'
                    defaultValue='@annhducit'
                    options={[
                      {
                        value: 'annhducit',
                        label: 'Nguyễn Trọng Đức',
                      },
                      {
                        value: 'hducduy21',
                        label: 'Hoàng Đức Duy',
                      },
                    ]}
                    allowClear
                  />
                </Form.Item> */}
              </Form.Item>
              <Button
                htmlType='submit'
                size='large'
                className='w-full font-semibold text-white'
                type='primary'
              >
                Create workspace
              </Button>
            </Form>
          </div>
          <div className='flex flex-col col-span-1'>
            <img loading='lazy' src={createWps} className='h-[360px] w-[350px]' />
          </div>
        </div>
      </div>
    </>
  );
};

export const ModalAddProject = () => {
  return (
    <Dialog.Param
      size='sm'
      paramKey={SEARCH_PARAMS.DIALOG}
      paramValue={SEARCH_PARAMS_VALUE.PROJECT}
    >
      <ModalCreateProject />
    </Dialog.Param>
  );
};

export const ModalCreateProject = () => {
  const { onClose } = useDialogContext();
  return (
    <>
      <Dialog.CloseButton onClose={() => onClose()} />
      <div className='flex flex-col gap-y-4'>
        <div className='mx-auto text-center'>
          <Typography.Text className='text-base font-semibold'>Create project</Typography.Text>
        </div>

        <div className='flex items-center gap-x-6'>
          <ProjectBackground />
        </div>
      </div>
    </>
  );
};
