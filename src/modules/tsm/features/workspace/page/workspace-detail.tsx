import { Button, Divider, Form, Input, Select, Spin, Tag, Typography } from 'antd';
import { LockKeyhole, PlusCircle, Share2 } from 'lucide-react';
import ProjectItem from '../components/project/project-item';
import useSearchParam from '@/shared/hooks/use-search-param';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
import ProjectBackground from '../components/background-container/background';

import createWps from '@/assets/gifs/create-workspace.gif';
import useGetWorkspace from '../hooks/query/use-get-workspace';
import useCreateWorkspace from '../hooks/mutation/use-create-workspace';
import useGetCategories from '@/modules/tsm/components/hooks/use-get-categories';
import { listColor } from '@/shared/data';
import SearchParam from '@/shared/components/search-param';
import useSearchProject from '../components/project/hooks/query/use-search-project';
import { useSelector } from '@/stores';
import ModifyMemberWorkspace from '../components/modify-member-workspace';

const WorkspaceDetail = () => {
  const { data: workspace, isPending } = useGetWorkspace();
  const [, , keyword] = useSearchParam(SEARCH_PARAMS.KEYWORD);

  const [, setModal] = useSearchParam(SEARCH_PARAMS.MODAL);

  const { data: result, isPending: isLoading } = useSearchProject(keyword as string);

  const [, setDialog] = useSearchParam(SEARCH_PARAMS.DIALOG);

  const showModal = () => {
    setDialog(SEARCH_PARAMS_VALUE.PROJECT);
  };

  const colorRadom = listColor[Math.floor(Math.random() * listColor.length)].color;
  const btnColor = useSelector((state) => state.theme.btnColor);
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-5'>
            <div
              style={{
                backgroundColor: colorRadom,
              }}
              className='flex items-center justify-center flex-shrink-0 w-20 h-20 text-2xl font-bold text-white rounded-xl'
            >
              {workspace?.name.charAt(0).toUpperCase()}
            </div>

            {isPending ? (
              <Spin size='small' />
            ) : (
              <>
                <div className='flex items-center justify-between'>
                  <div>
                    <Typography.Title level={3}>{workspace?.name}</Typography.Title>
                    <div className='flex items-center gap-x-4'>
                      <Tag color='gold'>{workspace?.category?.name}</Tag>
                      <div className='flex items-center'>
                        <LockKeyhole color='red' className='w-4 h-4 mr-1' />
                        <Tag color='red'>{workspace?.type}</Tag>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </>
            )}
          </div>
          <Button
            icon={<Share2 className='w-4 h-4 color-white' />}
            type='text'
            className='flex items-center text-white'
            style={{
              backgroundColor: btnColor,
            }}
            onClick={() => setModal(SEARCH_PARAMS_VALUE.ADD_MEMBER_WORKSPACE)}
          >
            Share
          </Button>
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
              <SearchParam.Keyword />
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
            {isPending ? (
              <div className='mx-auto mt-6'>
                <Spin />
              </div>
            ) : keyword ? (
              isLoading ? (
                <div className='mx-auto mt-6'>
                  <Spin />
                </div>
              ) : (
                result?.map((item) => <ProjectItem key={item.id} project={item} />)
              )
            ) : (
              workspace?.projects.map((item) => <ProjectItem key={item.id} project={item} />)
            )}
          </div>
        </div>
      </div>
      <ModalAddProject />
      <ModalAddWorkspace />
      <ModifyMemberWorkspace />
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

  const { mutate: createWorkspace, isPending } = useCreateWorkspace();
  const { data: categories } = useGetCategories();

  const handleSubmit = (value: Partial<Workspace>) => {
    createWorkspace(value);
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
                    options={categories?.map((item) => {
                      return { value: item.id, label: item.name };
                    })}
                  />
                </Form.Item>
                <Form.Item name='description' label='Description of workspace'>
                  <Input.TextArea allowClear rows={4} placeholder='Description' />
                </Form.Item>
              </Form.Item>
              <Button
                htmlType='submit'
                size='large'
                className='w-full font-semibold text-white'
                type='primary'
                loading={isPending}
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

        <div className='flex items-center w-full gap-x-6'>
          <ProjectBackground />
        </div>
      </div>
    </>
  );
};
