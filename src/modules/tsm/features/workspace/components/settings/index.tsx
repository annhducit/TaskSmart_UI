import { Button, Divider, GetProp, Input, message, Popover, Typography, UploadProps } from 'antd';
import useGetProject from '../project/hooks/query/use-get-project';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import useSearchParam from '@/shared/hooks/use-search-param';
import {
  Check,
  Ellipsis,
  Component,
  Image,
  Pencil,
  Info,
  FileInput,
  UploadCloud,
  FileUp,
  UploadIcon,
  Share2,
} from 'lucide-react';
import SubBackgroundModal from '../background-container/sub-background';
import useGetBackground from '../../hooks/query/use-get-background';
import useUpdateBackground from '../project/hooks/mutation/use-update-background';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useState } from 'react';
import { listColor } from '@/shared/data';
import dashboard from '@/assets/svgs/dashboard.svg';
import Dragger from 'antd/es/upload/Dragger';
import { useSelector } from '@/store';
import { tsmAxios } from '@/configs/axios';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function ProjectSetting() {
  const [, setModal] = useSearchParam(SEARCH_PARAMS.MODAL);
  const { data: project } = useGetProject();
  return (
    <div className='mx-10 h-[600px] overflow-y-scroll rounded-xl bg-white p-8 text-black'>
      <div className='flex justify-between px-[100px]'>
        <div className='flex justify-start'>
          <div>
            {project?.backgroundUnsplash ? (
              <img
                className='h-[80px] w-[80px]'
                src={project.backgroundUnsplash.urls.small}
                alt=''
              />
            ) : (
              <div
                style={{ backgroundColor: project?.backgroundColor }}
                className='h-[80px] w-[80px]'
              ></div>
            )}
          </div>
          <div className='flex flex-col'>
            <div className='ml-3 h-[50px] text-center text-2xl leading-[50px]'>
              {project?.name} <Pencil className='ml-3 cursor-pointer' size={16}></Pencil>
            </div>
            <div className='ml-3 align-middle text-2xl text-sm'>
              <Component size={13} />
              <span className='ml-2'>{project?.workspace.name}</span>
            </div>
          </div>
        </div>

        <div>
          <Button
            icon={<Share2 className='h-4 w-4' />}
            type='primary'
            onClick={() => setModal(SEARCH_PARAMS_VALUE.ADD_MEMBER)}
          >
            Share
          </Button>
        </div>
      </div>

      <Divider />

      <div className='px-[100px]'>
        <div className='text-xl font-semibold'>Project Settings</div>
        <div className='mt-3 align-middle'>
          <Typography.Text className='my-3 font-semibold'>
            <Info className='m-0 p-0' size={15} />
            <span className='ml-2 text-[15px]'>Desciption</span>
          </Typography.Text>
          <div>
            <Input.TextArea
              className='h-[100px]'
              defaultValue={project?.description}
            ></Input.TextArea>
            <div className='flex w-full justify-end'>
              <Button className='bottom-0 right-0 mt-2' type='primary' size='middle'>
                Update desciption
              </Button>
            </div>
          </div>
        </div>

        <Divider className='my-7 bg-[#c8d6e5]' />

        <div className='mt-3 align-middle'>
          <Typography.Text className='my-3 font-semibold'>
            <FileInput className='m-0 p-0' size={15} />
            <span className='ml-2 text-[15px]'>Project document</span>
          </Typography.Text>
          <div className='mt-3'>
            <UploadDocument project={project}></UploadDocument>
          </div>
        </div>

        <Divider className='my-7 bg-[#c8d6e5]' />

        <div className='mt-3 align-middle'>
          <Typography.Text className='my-3 font-semibold'>
            <Image className='m-0 p-0' size={15} />
            <span className='ml-2 text-[15px]'>Background</span>
          </Typography.Text>
          <UpdateBackground></UpdateBackground>
        </div>
        <Divider className='bg-[#c8d6e5]' />
      </div>
    </div>
  );
}

const UploadDocument = ({ project }: { project: Project | undefined }) => {
  const { btnColor } = useSelector((state) => state.theme);

  const [file, setFile] = useState<FileType | null>(null);

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: () => false,

    onChange(info) {
      setFile(info.file as FileType);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const uploadProjectDocument = () => {
    const UploadAsync = async () => {
      try {
        const formData = new FormData();
        formData.append('file', file as FileType);
        const res = await tsmAxios.post(`/projects/${project?.id}/document`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data) {
          console.log(res.data);
          message.success('Upload success');
        }
      } catch (error) {
        message.error(error as string);
      }
    };
    if (file) {
      UploadAsync();
    } else {
      message.error('Please select a file');
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div
        style={{
          borderColor: btnColor,
        }}
        className='flex w-[90%] flex-col gap-y-4  rounded-xl border-2 border-solid  bg-white p-4'
      >
        <div className='flex items-center justify-start'>
          <div className='flex items-center gap-x-2'>
            <FileUp size={22} color={btnColor} className='opacity-100 ' />
            <Typography.Text className='font-bold'>Upload file</Typography.Text>
          </div>
        </div>
        <Dragger
          {...props}
          style={{
            backgroundColor: '#eff4f8',
          }}
        >
          <div className='flex justify-center gap-5'>
            <div className='ant-upload-drag-icon'>
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
            <div className='flex flex-col gap-y-4 py-4 text-left'>
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
            onClick={uploadProjectDocument}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

const UpdateBackground = () => {
  const [background, setBackground] = useState<string>('#00aecc');
  const [backgroundUnsplash, setBackgroundUnsplash] = useState<UnsplashResponse>();

  const { data: listBackground } = useGetBackground();
  const { mutate: updateBackground, isPending: isLoading } = useUpdateBackground();
  const { data: project } = useGetProject();
  const handleUpdateBackground = () => {
    if (background.startsWith('#') && background.length === 7) {
      const color = background.replace('#', '');
      updateBackground({ image: color, projectId: getIdProjectFromUrl() });
    } else {
      updateBackground({
        image: backgroundUnsplash?.id as string,
        projectId: getIdProjectFromUrl(),
      });
    }
  };

  const handleChangeBackground = (value: UnsplashResponse) => {
    setBackgroundUnsplash(value);
    setBackground(value.urls.small);
  };

  const handleChangeBackgroundColor = (value: string) => {
    setBackground(value);
    console.log(value);
  };

  return (
    <>
      <div className='flex w-full flex-col items-center gap-x-6'>
        <div className='relative flex w-full justify-center'>
          <div
            style={{
              backgroundImage: `url(${backgroundUnsplash ? backgroundUnsplash.urls.regular : project?.backgroundUnsplash?.urls.regular})`,
              background: `${background ? background : project?.backgroundColor}`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className='h-[120px] w-[192px] rounded'
          >
            <div className='mx-auto mt-2 h-[103px] w-[160px] rounded'>
              <img src={dashboard} alt='dashboard' className='h-full w-full rounded' />
            </div>
          </div>
          <Button
            onClick={handleUpdateBackground}
            className='absolute bottom-0 right-0'
            type='primary'
            size='middle'
            disabled={!background && !backgroundUnsplash}
            loading={isLoading}
          >
            Update background
          </Button>
        </div>

        <div className='mt-3 flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2'>
            {listBackground?.map((item) => (
              <div
                key={item.id}
                className='h-[60px] w-[110px] cursor-pointer rounded transition-all hover:brightness-125'
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
                  background: item.color,
                }}
                className={`relative h-[45px] w-[76px] cursor-pointer rounded transition-all hover:brightness-125`}
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
                  color={background as string}
                  handleChangeBackground={handleChangeBackground}
                  handleChangeBackgroundColor={handleChangeBackgroundColor}
                  defaultBackgrounds={listBackground || []}
                />
              }
            >
              <Button className='flex items-center'>
                More
                <Ellipsis className='h-4 w-4 pl-1' />
              </Button>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};
