import { Button, Divider, Typography } from 'antd';
import {
  ArchiveRestore,
  Copy,
  Info,
  LogOut,
  PersonStanding,
  Rss,
  Settings,
  SquareGanttChart,
  TagIcon,
  X,
} from 'lucide-react';

const Setting = (props: { setVisible: (newOpen: boolean) => void }) => {
  return (
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
        icon={<Info className='h-4 w-4' />}
        type='text'
        size='large'
        className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
      >
        About project
      </Button>
      <Button
        icon={<SquareGanttChart className='h-4 w-4' />}
        type='text'
        size='large'
        className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
      >
        Activity
      </Button>
      <Button
        icon={<ArchiveRestore className='h-4 w-4' />}
        type='text'
        size='large'
        className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
      >
        Archived
      </Button>
      <Divider className='my-[1px]' />
      <Button
        icon={<Settings className='h-4 w-4' />}
        type='text'
        size='large'
        className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
      >
        Setting
      </Button>
      <Button
        icon={
          <div
            style={{
              backgroundImage: 'url(https://source.unsplash.com/random/800x600)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className='h-5 w-5 rounded'
          />
        }
        type='text'
        size='large'
        className='flex w-full -translate-x-1 items-center gap-x-2 rounded text-left text-sm opacity-80'
      >
        Change background
      </Button>
      <Button
        icon={<TagIcon className='h-4 w-4' />}
        type='text'
        size='large'
        className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
      >
        Label
      </Button>
      <Button
        icon={<PersonStanding className='h-4 w-4' />}
        type='text'
        size='large'
        className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
      >
        Utilities
      </Button>
      <Divider className='my-[1px]' />
      <Button
        icon={<Rss className='h-4 w-4' />}
        type='text'
        size='large'
        className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
      >
        Follow
      </Button>
      <Button
        icon={<Copy className='h-4 w-4' />}
        type='text'
        size='large'
        className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
      >
        Copy project
      </Button>
      <Button
        icon={<LogOut className='h-4 w-4' />}
        type='text'
        size='large'
        className='flex w-full items-center gap-x-2 rounded text-left text-sm opacity-90'
      >
        Leave project
      </Button>
    </div>
  );
};

export default Setting;
