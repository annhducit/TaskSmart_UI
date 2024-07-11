import { useSelector } from '@/store';
import { App, Button, Typography, Upload, UploadProps } from 'antd';
import { FileUp, Trash, UploadCloud } from 'lucide-react';
import { dataGenerate } from './components/file';
import ListCardAI from './components/list-card-ai';

const AIGenerationTask = () => {
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

  return (
    <section className='flex flex-col h-screen overflow-y-scroll gap-y-10'>
      <div className='flex items-center justify-center'>
        <div className=' flex w-[900px] flex-col gap-y-4 rounded border border-solid border-primary-default bg-white p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <FileUp size={18} className='opacity-100 text-primary-default' />
              <Typography.Text className='font-bold'>Upload files</Typography.Text>
            </div>
            <Button
              icon={<Trash className='flex items-center w-3 h-3 text-red-500 gap-x-2' />}
              className='flex items-center'
            >
              Remove all
            </Button>
          </div>
          <Dragger
            {...props}
            height={250}
            style={{
              backgroundColor: '#eff4f8',
            }}
          >
            <div className='mx-auto ant-upload-drag-icon'>
              <div className='flex items-center justify-center w-20 h-20 mx-auto bg-transparent border-2 border-dashed rounded-lg border-primary-default'>
                <UploadCloud size={24} className='text-primary-default' />
              </div>
            </div>
            <div className='py-4'>
              <Typography.Text className='block font-semibold text-primary-default'>
                Select files on your computer
              </Typography.Text>
              <Typography.Text className='block text-slate-400'>
                Or transfer files by dragging and dropping them into the area
              </Typography.Text>
            </div>
          </Dragger>
          <div className='flex items-center ml-auto gap-x-2'>
            <Button danger>Cancel</Button>
            <Button type='primary'>Upload</Button>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className='inline-block min-h-screen px-6 '>
        <div className='flex items-start justify-center gap-x-3'>
          {dataGenerate.map((item, index) => (
            <ListCardAI key={index} listCard={item as unknown as any} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIGenerationTask;
