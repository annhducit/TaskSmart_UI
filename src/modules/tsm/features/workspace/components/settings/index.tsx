import type { GetProp, UploadProps } from 'antd';
import { Button, Divider, Input, message, Popover, Typography } from 'antd';
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
  Save,
  Eye,
  FileWarning,
} from 'lucide-react';
import SubBackgroundModal from '../background-container/sub-background';
import useGetBackground from '../../hooks/query/use-get-background';
import useUpdateBackground from '../project/hooks/mutation/use-update-background';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useState } from 'react';
import { listColor } from '@/shared/data';
import dashboard from '@/assets/svgs/dashboard.svg';
import Dragger from 'antd/es/upload/Dragger';
import { useSelector } from '@/stores';
import { tsmAxios } from '@/configs/axios';
import Tooltip from '@/shared/components/tooltip';
import { useNavigate } from 'react-router-dom';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function ProjectSetting() {
  const navigate = useNavigate();

  const [, setModal] = useSearchParam(SEARCH_PARAMS.MODAL);
  const { data: project } = useGetProject();

  const { btnColor } = useSelector((state) => state.theme);
  return (
    <div className='mx-4 flex h-[calc(100vh-130px)] flex-col gap-y-6 overflow-y-scroll rounded bg-[#f8f9fc] p-6 text-black'>
      <div className='flex justify-between px-[100px]'>
        <div className='flex justify-start'>
          <div>
            {project?.backgroundUnsplash ? (
              <img
                className='h-[80px] w-[80px] rounded object-cover'
                src={project.backgroundUnsplash.urls.small}
                alt=''
              />
            ) : (
              <div
                style={{ backgroundColor: project?.backgroundColor }}
                className='h-[80px] w-[80px]'
              />
            )}
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-x-4'>
              <Typography.Text className='ml-3 text-center text-2xl leading-[50px]'>
                {project?.name}
              </Typography.Text>
              <Tooltip title='Rename'>
                <Pencil
                  className='cursor-pointer transition-all hover:opacity-25'
                  style={{
                    color: btnColor,
                  }}
                  size={16}
                />
              </Tooltip>
            </div>
            <div className='ml-3 flex items-center align-middle text-2xl text-sm'>
              <Component size={13} color={btnColor} />
              <span className='ml-2'>{project?.workspace.name}</span>
            </div>
          </div>
        </div>

        <div>
          <Button
            icon={<Share2 className='color-white h-4 w-4' />}
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
      </div>

      <Divider
        style={{
          backgroundColor: btnColor,
          opacity: 0.3,
        }}
      />

      <div className='px-24'>
        <div className='text-xl font-semibold'>Project Settings</div>
        <div className='mt-3 align-middle'>
          <div className='my-3 flex items-center gap-x-2 font-semibold'>
            <Info size={15} color={btnColor} />
            <Typography.Text className='text-sm'>Description</Typography.Text>
          </div>
          <div>
            <Input.TextArea className='h-[100px]' defaultValue={project?.description} />
            <div className='flex w-full justify-end'>
              <Button
                icon={<Save className='h-4 w-4' />}
                className='my-2 flex items-center text-white'
                type='text'
                size='middle'
                style={{
                  backgroundColor: btnColor,
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        <Divider
          className='my-7'
          style={{
            backgroundColor: btnColor,
            opacity: 0.3,
          }}
        />

        <div className='mt-3 align-middle'>
          <div className='flex items-center justify-between'>
            <div className='my-3 flex items-center gap-x-2 font-semibold'>
              <FileInput size={15} color={btnColor} />
              <Typography.Text className='text-sm'>Project document</Typography.Text>
            </div>
            {project?.speDocPath ? (
              <div className='flex items-center gap-x-2'>
                <Tooltip title='View file'>
                  <Button
                    icon={<Eye className='h-4 w-4' />}
                    type='primary'
                    size='small'
                    className='flex items-center text-white'
                    style={{
                      backgroundColor: btnColor,
                    }}
                    onClick={() => navigate(`/tsm/source/doc/${project?.id}`)}
                  />
                </Tooltip>
              </div>
            ) : (
              <Tooltip title='Please upload document file!'>
                <div className='flex items-center gap-x-2'>
                  <FileWarning size={15} color='red' />
                  <Typography.Text className='text-sm'>No document</Typography.Text>
                </div>
              </Tooltip>
            )}
          </div>
          <div className='mt-3'>
            <UploadDocument project={project}></UploadDocument>
          </div>
        </div>

        <Divider
          className='my-7'
          style={{
            backgroundColor: btnColor,
            opacity: 0.3,
          }}
        />

        <div className='mt-3 align-middle'>
          <div className='my-3 flex items-center gap-x-2 font-semibold'>
            <Image size={15} color={btnColor} />
            <Typography.Text className='text-sm'>Background</Typography.Text>
          </div>
          <UpdateBackground />
        </div>
        <Divider
          style={{
            backgroundColor: btnColor,
            opacity: 0.3,
          }}
        />
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
        className='flex w-[90%] flex-col gap-y-4 rounded-xl border-2 border-solid bg-white p-4'
      >
        <div className='flex items-center justify-start'>
          <div className='flex items-center gap-x-2'>
            <FileUp size={22} color={btnColor} className='opacity-100' />
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
                className='block font-semibold'
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
    setBackgroundUnsplash(undefined);
  };

  const btnColor = useSelector((state) => state.theme.btnColor);

  return (
    <>
      <div className='flex w-full flex-col items-center gap-x-6 gap-y-2'>
        <div className='relative flex w-full justify-center'>
          <div
            style={{
              backgroundImage: `url(${backgroundUnsplash ? backgroundUnsplash.urls.regular : project?.backgroundUnsplash?.urls.regular})`,
              background: `${background ? background : project?.backgroundColor}`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className='h-[150px] w-[222px] rounded'
          >
            <div className='mx-auto mt-2 h-[110px] w-[167px] rounded'>
              <img src={dashboard} alt='dashboard' className='h-full w-full rounded' />
            </div>
          </div>
        </div>

        <div className='mt-3 flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2'>
            {listBackground?.map((item) => (
              <div
                key={item.id}
                className='relative h-[60px] w-[110px] cursor-pointer rounded transition-all hover:brightness-125'
                onClick={() => handleChangeBackground(item)}
              >
                <img
                  src={item.urls.small}
                  alt='background'
                  className={`h-full w-full rounded object-cover object-center ${
                    item.id === backgroundUnsplash?.id
                      ? 'border-2 border-solid border-blue-500'
                      : ''
                  }`}
                />
                {item.id === backgroundUnsplash?.id && (
                  <Check className='absolute right-11 top-4 h-5 w-5 text-white' />
                )}
              </div>
            ))}
          </div>
          <Divider className='my-4' />
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
                  <Check className='absolute right-7 top-3 h-4 w-4 text-white' />
                )}
              </div>
            ))}
            <Tooltip color='black' title='More'>
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
                <Button
                  className='flex items-center justify-center'
                  style={{
                    width: '76px',
                    height: '45px',
                  }}
                >
                  <Ellipsis className='h-5 w-5' />
                </Button>
              </Popover>
            </Tooltip>
          </div>
        </div>
        <Button
          onClick={handleUpdateBackground}
          type='text'
          icon={<Save className='h-4 w-4' />}
          style={{
            backgroundColor: btnColor,
            color: '#fff',
          }}
          className='float-right ml-auto mt-6 flex w-[120px] items-center justify-center text-white'
          size='middle'
          disabled={!background || !backgroundUnsplash}
          loading={isLoading}
        >
          Update
        </Button>
      </div>
    </>
  );
};
