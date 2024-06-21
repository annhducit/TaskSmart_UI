import useGetProfile from '@/modules/tsm/components/hooks/use-profile';
import { Button, Form, Input, Select, Typography } from 'antd';

const CreateProjectBySample = () => {
  const [form] = Form.useForm();

  const { data: profile } = useGetProfile();
  const handleCreateProject = (value: any) => {
    console.log(value);
    /**
     * Add logic to create project
     */
  };
  return (
    <div className='flex w-[250px] flex-col gap-y-2'>
      <Typography.Text className='block text-center text-base font-semibold'>
        Create project
        <Form layout='vertical' onFinish={handleCreateProject} name='project' form={form}>
          <Form.Item label='Title' name='name'>
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
            <Button className='w-full' type='primary' htmlType='submit'>
              Create
            </Button>
          </div>
        </Form>
      </Typography.Text>
    </div>
  );
};

export default CreateProjectBySample;
