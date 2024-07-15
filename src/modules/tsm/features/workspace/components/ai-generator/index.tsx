import { useSelector } from '@/store';
import { App, Button, Tabs, TabsProps, Typography, Upload, UploadProps } from 'antd';
import { FileUp, Trash, UploadCloud } from 'lucide-react';
import TaskGenerate from './components/task-generate';
import { dataGenerate } from './components/file';
import SQLGenerate from './components/sql-generate';

const AIFeature = () => {
  const { btnColor } = useSelector((state) => state.theme);

  const { message } = App.useApp();

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => false,

    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const onChangeTab = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'AI Generate',
      children: <TaskGenerate dataGenerate={dataGenerate as unknown as any} />,
    },
    {
      key: '2',
      label: 'SQL Generate',
      children: <SQLGenerate />,
    },
  ];

  return (
    <section className='flex h-screen flex-col gap-y-6 overflow-y-scroll'>
      <div className='flex items-center justify-center'>
        <div
          style={{
            borderColor: btnColor,
          }}
          className='flex w-[90%] flex-col gap-y-4 rounded border-2 border-solid  bg-white p-4'
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <FileUp size={22} color={btnColor} className='opacity-100 ' />
              <Typography.Text className='font-bold'>Upload files</Typography.Text>
            </div>
            <Button
              icon={<Trash className='flex h-3 w-3 items-center gap-x-2 text-red-500' />}
              className='flex items-center'
            >
              Remove all
            </Button>
          </div>
          <Dragger
            {...props}
            height={180}
            style={{
              backgroundColor: '#eff4f8',
            }}
          >
            <div className='ant-upload-drag-icon mx-auto'>
              <div
                style={{
                  borderColor: btnColor,
                }}
                className='mx-auto flex h-14 w-14 items-center justify-center rounded-lg border-2 border-dashed bg-transparent'
              >
                <UploadCloud
                  size={24}
                  className=''
                  style={{
                    color: btnColor,
                  }}
                />
              </div>
            </div>
            <div className='py-4'>
              <Typography.Text
                className='block font-semibold '
                style={{
                  color: btnColor,
                }}
              >
                Select files on your computer
              </Typography.Text>
              <Typography.Text className='block text-slate-400'>
                Or transfer files by dragging and dropping them into the area
              </Typography.Text>
            </div>
          </Dragger>
          <div className='ml-auto flex items-center gap-x-2'>
            <Button danger>Cancel</Button>
            <Button type='primary'>Upload</Button>
          </div>
        </div>
      </div>

      <Tabs
        onChange={onChangeTab}
        tabBarGutter={12}
        className={`custom-tabs-ai mb-0 text-white`}
        type='card'
        items={items}
      />
    </section>
  );
};

export default AIFeature;
