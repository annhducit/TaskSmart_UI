import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import { useSelector } from '@/store';
import { Button, Divider, Popover, Typography } from 'antd';
import {
  ArchiveRestore,
  Check,
  Copy,
  Ellipsis,
  Info,
  LogOut,
  PersonStanding,
  Rss,
  Settings,
  SquareGanttChart,
  TagIcon,
  X,
} from 'lucide-react';
import useGetBackground from '../../../../hooks/query/use-get-background';
import { useState } from 'react';
import { listColor } from '@/shared/data';
import SubBackgroundModal from '../../../background-container/sub-background';
import useUpdateBackground from '../../hooks/mutation/use-update-background';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import useGetProject from '../../hooks/query/use-get-project';
import useSearchParam from '@/shared/hooks/use-search-param';
import CloseButton from '@/shared/components/dialog/close-button';
import dashboard from '@/assets/svgs/dashboard.svg';
const Setting = (props: { setVisible: (newOpen: boolean) => void }) => {
  const { data: project } = useGetProject();

  const { btnColor } = useSelector((state) => state.theme);

  const [, setParam] = useSearchParam(SEARCH_PARAMS.MODAL);
  return (
    <>
      <div className='flex w-[250px] flex-col gap-1'>
        <div className='flex items-center'>
          <Typography.Text className='text-center text-base font-semibold'>
            Project settings
          </Typography.Text>
          <div
            className='ml-auto flex items-center rounded px-[6px] py-1 transition-all hover:bg-primary-default hover:text-white'
            onClick={() => props.setVisible(false)}
          >
            <X className='h-5 w-5' />
          </div>
        </div>
        <Button
          icon={<Info className='h-4 w-4' color={btnColor} />}
          type='text'
          size='large'
          className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
        >
          About project
        </Button>
        <Button
          icon={<SquareGanttChart className='h-4 w-4' color={btnColor} />}
          type='text'
          size='large'
          className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
        >
          Activity
        </Button>
        <Button
          icon={<ArchiveRestore className='h-4 w-4' color={btnColor} />}
          type='text'
          size='large'
          className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
        >
          Archived
        </Button>
        <Divider className='my-[1px]' />
        <Button
          icon={<Settings className='h-4 w-4' color={btnColor} />}
          type='text'
          size='large'
          className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
        >
          Setting
        </Button>
        <Button
          type='text'
          size='large'
          onClick={() => setParam(SEARCH_PARAMS_VALUE.BACKGROUND)}
          className='flex w-full -translate-x-1 items-center gap-x-2 rounded text-left text-sm opacity-80'
        >
          <div className='flex items-center gap-x-4'>
            <div className='h-8 w-8 rounded'>
              <img
                src={project?.backgroundUnsplash?.urls?.small}
                alt=''
                className='h-full w-full rounded'
              />
            </div>
            <p> Change background</p>
          </div>
        </Button>
        <Button
          icon={<TagIcon className='h-4 w-4' color={btnColor} />}
          type='text'
          size='large'
          className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
        >
          Label
        </Button>
        <Button
          icon={<PersonStanding className='h-4 w-4' color={btnColor} />}
          type='text'
          size='large'
          className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
        >
          Utilities
        </Button>
        <Divider className='my-[1px]' />
        <Button
          icon={<Rss className='h-4 w-4' color={btnColor} />}
          type='text'
          size='large'
          className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
        >
          Follow
        </Button>
        <Button
          icon={<Copy className='h-4 w-4' color={btnColor} />}
          type='text'
          size='large'
          className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
        >
          Copy project
        </Button>
        <Button
          icon={<LogOut className='h-4 w-4' color={btnColor} />}
          type='text'
          size='large'
          className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
        >
          Leave project
        </Button>
      </div>
      <ModalUpdateBackground />
    </>
  );
};

export default Setting;

const ModalUpdateBackground = () => {
  return (
    <Dialog.Param
      size='sm'
      paramKey={SEARCH_PARAMS.MODAL}
      paramValue={SEARCH_PARAMS_VALUE.BACKGROUND}
    >
      <UpdateBackground />
    </Dialog.Param>
  );
};

const UpdateBackground = () => {
  const [background, setBackground] = useState<string>('#00aecc');
  const [backgroundUnsplash, setBackgroundUnsplash] = useState<UnsplashResponse>();

  const { data: listBackground } = useGetBackground();
  const { mutate: updateBackground, isPending: isLoading } = useUpdateBackground();
  const { data: project } = useGetProject();
  const { onClose } = useDialogContext();
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
      <CloseButton onClose={() => onClose()}></CloseButton>
      <div className='flex w-full flex-col items-center gap-x-6'>
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
        <div className='flex flex-col gap-y-1'>
          <Typography.Text>Background</Typography.Text>
          <div className='flex items-center gap-x-2'>
            {listBackground?.map((item) => (
              <div
                key={item.id}
                className='h-[40px] w-[64px] cursor-pointer rounded transition-all hover:brightness-125'
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
                className={`relative h-[32px] w-[40px] cursor-pointer rounded transition-all hover:brightness-125`}
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
                <Ellipsis className='h-4 w-4' />
              </Button>
            </Popover>
          </div>
        </div>

        <Button
          onClick={handleUpdateBackground}
          className='ml-0 mt-6 w-full'
          type='primary'
          size='large'
          disabled={!background && !backgroundUnsplash}
          loading={isLoading}
        >
          Update
        </Button>
      </div>
    </>
  );
};
