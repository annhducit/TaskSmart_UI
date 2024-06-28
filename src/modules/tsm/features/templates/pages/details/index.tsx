import Logo from '@/shared/components/logo';
import { Avatar, Button, Divider, Input, Popover, Spin, Tabs, Tag, Typography } from 'antd';
import { AudioWaveform, ListChecks, Plus, Search, User } from 'lucide-react';
import CreateProjectBySample from '../../components/create-project-by-sample';
import TemplateItem from '../../components/template-item';
import useGetTemplates from '../../hooks/use-get-templates';
import useGetTemplate from '../../hooks/use-get-template';

const TemplateDetail = () => {
  const { data: template, isLoading: isLoadingDT } = useGetTemplate();
  const { data: templates, isLoading } = useGetTemplates();

  return (
    <div className='flex flex-col gap-y-4 px-8 pb-20'>
      <div className='flex items-center justify-between'>
        {isLoadingDT ? (
          <Spin />
        ) : (
          <>
            <div className='flex items-center gap-x-6'>
              <div className='rounded bg-white'>
                <Logo type='SINGLE_LOGO' size='w-16 h-16' />
              </div>
              <div className='flex flex-col gap-y-1'>
                <Typography.Text className='text-xl font-semibold'>
                  {template?.name}
                </Typography.Text>

                <Typography.Text className='block text-xs font-normal'>
                  by <span className='font-semibold text-primary-default'>Tasksmart</span> team
                </Typography.Text>
                <Typography.Text className='block text-xs font-normal'>
                  @Double2D Corp
                </Typography.Text>
              </div>{' '}
            </div>
            <Popover trigger='click' placement='leftBottom' content={<CreateProjectBySample />}>
              <Button
                size='large'
                type='primary'
                icon={<AudioWaveform className='flex items-center' size='14' />}
              >
                Use template
              </Button>
            </Popover>
          </>
        )}
      </div>
      <Divider className='my-[1px]' />
      <div className='my-2'>
        <div className='mb-6 flex items-center gap-x-4'>
          <span className='h-7 w-[6px] bg-primary-default'></span>
          <Typography.Text className='block text-lg font-semibold'>
            {' '}
            About this template
          </Typography.Text>
        </div>
        <Typography.Text className='block text-sm font-normal'>
          This template provides a centralized space for every new hire to tackle all the
          job-related logistical items and business requirements to get onboarded.
        </Typography.Text>
        <br />
        <Typography.Text className='block text-sm font-normal'>
          {template?.description}
        </Typography.Text>
      </div>
      <section
        className='relative mx-auto h-[600px] w-[calc(100vw-400px)]  rounded-lg bg-cover bg-center bg-no-repeat'
        style={{
          backgroundPosition: 'center',
          backgroundImage: `url(https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >
        <div className='absolute inset-0 rounded-lg bg-black bg-opacity-40' />
        <div className='flex items-start gap-x-2'>
          <div>
            <Tabs
              tabBarGutter={20}
              className={`custom-tabs-template mb-0 w-[calc(100vw-400px)] text-white`}
              items={[
                {
                  key: 'overview',
                  label: 'Overview',
                  children: <ProjectContent />,
                },
                {
                  key: 'project',
                  label: 'Project',
                  children: <div className='px-6'>Overview</div>,
                },
                {
                  key: 'Kaban',
                  label: 'Kaban',
                  children: <div className='px-6'>Overview</div>,
                },
              ]}
              tabBarExtraContent={{
                left: (
                  <div className='mr-8 flex items-center'>
                    {isLoadingDT ? (
                      <Spin />
                    ) : (
                      <>
                        <p className='mr-4 max-w-48 truncate text-[18px] font-bold'>
                          {template?.name}
                        </p>
                        <Tag color='cyan'>Sample</Tag>
                      </>
                    )}
                  </div>
                ),
              }}
            />
          </div>

          <div className='absolute right-6 top-[10px] flex items-center gap-x-4 rounded-lg'>
            <Button size='middle' type='default' icon={<Search className='mt-1' size='14' />}>
              Search
            </Button>
            <Button size='middle' type='primary' icon={<ListChecks className='mt-1' size='14' />}>
              Add task
            </Button>
            <Avatar.Group maxCount={2} className='flex items-center'>
              <Avatar style={{ backgroundColor: '#f56a00' }} icon={<User size='12' />} />
              <Avatar style={{ backgroundColor: '#7265e6' }} icon={<User size='12' />} />
              <Avatar style={{ backgroundColor: '#ffbf00' }} icon={<User size='12' />} />
            </Avatar.Group>
          </div>
        </div>
      </section>
      {/* Relative templates */}
      <div className='mb-6 flex items-center gap-x-4'>
        <span className='h-7 w-[6px] bg-primary-default'></span>
        <Typography.Text className='block text-lg font-semibold'>
          {' '}
          Relative templates
        </Typography.Text>
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center'>
          {' '}
          <Spin />
        </div>
      ) : (
        <div className='mx-auto grid grid-cols-3 gap-6'>
          {templates?.map((item, index) => <TemplateItem template={item} key={index} />)}
        </div>
      )}
    </div>
  );
};

export default TemplateDetail;

const ProjectContent = () => {
  return (
    <div className='inline-block min-h-screen px-6 '>
      <div className='flex items-start gap-x-3'>
        <Popover
          placement='bottom'
          content={
            <div className='flex w-[250px] flex-col gap-4'>
              <Input
                placeholder='Enter list title'
                allowClear
                size='large'
                className='rounded text-sm font-semibold '
              />
              <div className='ml-auto flex items-center gap-x-2'>
                <Button type='primary' className='w-20 rounded text-xs font-semibold'>
                  Add list
                </Button>
                <Button type='default' className='w-16 rounded text-xs font-semibold'>
                  Cancel
                </Button>
              </div>
            </div>
          }
        >
          <Button
            icon={<Plus className='h-4 w-4 opacity-65' />}
            size='large'
            className='flex w-[275px] items-center rounded-xl border-none bg-[#ffffff3d] text-sm font-semibold text-white'
          >
            Add new list
          </Button>
        </Popover>
      </div>
    </div>
  );
};
