import useGetProfile from '@/modules/tsm/components/hooks/use-profile';
import { Button, Form, Input, Select, Typography } from 'antd';
import useApplyTemplate from '../hooks/use-apply-template';
import { useParams } from 'react-router-dom';

const CreateProjectBySample = () => {
  const [form] = Form.useForm();

  const { templateId } = useParams();

  const { mutate: applyTemplate, isPending: isLoading } = useApplyTemplate();
  const { data: profile } = useGetProfile();

  const handleCreateProject = (value: { workspaceId: string; projectName: string }) => {
    applyTemplate({
      templateId: templateId as string,
      payload: {
        workspaceId: value.workspaceId as string,
        projectName: value.projectName as string,
      },
    });
  };

  return (
    <div className='flex w-[250px] flex-col gap-y-2'>
      <Typography.Text className='block text-center text-base font-semibold'>
        Apply template
      </Typography.Text>
      <Form layout='vertical' onFinish={handleCreateProject} name='project' form={form}>
        <Form.Item label='Project name' name='projectName'>
          <Input placeholder='Graduated thesis' />
        </Form.Item>

        <Form.Item
          name='workspaceId'
          className='w-full'
          label='Workspace'
          rules={[
            {
              required: true,
              message: 'Please choose workspace',
            },
          ]}
        >
          <Select
            showSearch
            className='w-full'
            allowClear
            options={[...(profile?.workspaces || []), profile?.personalWorkSpace].map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
        <Form.Item name='description' className='w-full' label='Description'>
          <Input.TextArea rows={3} placeholder='Something about your project' allowClear />
        </Form.Item>

        <div className='float-right flex w-full items-center gap-x-4'>
          <Button loading={isLoading} className='w-full' type='primary' htmlType='submit'>
            Apply
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateProjectBySample;
