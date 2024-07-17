import { useSelector } from '@/store';
import { App, Button, Tabs, TabsProps, Typography, Upload, UploadProps } from 'antd';
import { FileUp, Trash, UploadCloud, UploadIcon } from 'lucide-react';
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
    <section className=''>
      <div className='grid grid-cols-7'>
        <div className='col-span-2'>
          <div className='flex items-center justify-center'>
            <div
              style={{
                borderColor: btnColor,
              }}
              className='flex w-[90%] flex-col gap-y-4  rounded-xl border-2 border-solid  bg-white p-4'
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
                style={{
                  backgroundColor: '#eff4f8',
                }}
                className='h-[calc(100vh-260px)]'
              >
                <div className='ant-upload-drag-icon mx-auto'>
                  <div
                    style={{
                      borderColor: btnColor,
                    }}
                    className='mx-auto flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed bg-transparent'
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
                <div className='flex flex-col gap-y-4 py-4'>
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
                <Button
                  icon={<UploadIcon size={14} />}
                  type='text'
                  className='flex items-center'
                  style={{
                    backgroundColor: btnColor,
                    color: '#fff',
                  }}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-5 mr-2'>
          <Tabs
            onChange={onChangeTab}
            tabBarGutter={12}
            className={`custom-tabs-ai mb-0 text-white`}
            type='card'
            items={items}
          />
        </div>
      </div>
    </section>
  );
};

export default AIFeature;
