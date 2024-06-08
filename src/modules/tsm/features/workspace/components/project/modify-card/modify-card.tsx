import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
import TextEditor from '@/shared/components/text-editor';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import { Avatar, Button, Divider, Popover, Typography } from 'antd';
import {
  Archive,
  Clock,
  Copy,
  EyeOff,
  File,
  ImagePlus,
  LayoutList,
  List,
  ListTodo,
  Move,
  Paperclip,
  Pencil,
  Plus,
  Rss,
  Share,
  Tag,
  Text,
  Upload,
  User,
  Users,
} from 'lucide-react';
import Activity from './activity';
import CommentCard from './comment';
import CheckList from './check-list';
import AddMemberToCard from './popover/add-member-to-card';
import SetTimeToCard from './popover/set-time-to-card';
import AddTodoToCard from './popover/add-todo-to-card';
import AddLabelToCard from './popover/add-label-to-card';
import MemberInfo from './popover/member-info';
import Tooltip from '@/shared/components/tooltip';

const ModifyCard = () => {
  return (
    <Dialog.Param
      className='custom-modal-content'
      size='normal'
      paramKey={SEARCH_PARAMS.DIALOG}
      paramValue={SEARCH_PARAMS_VALUE.CARD}
    >
      <ModifyCardModal />
    </Dialog.Param>
  );
};

export default ModifyCard;

const ModifyCardModal = () => {
  const { onClose } = useDialogContext();
  const handleClose = () => {
    onClose((searchParam) => {
      if (searchParam.has(SEARCH_PARAMS.ID)) {
        searchParam.delete(SEARCH_PARAMS.ID);
      }
    });
  };

  return (
    <>
      <div
        className='relative h-[160px] rounded-t-xl bg-[#ee5e99]'
        style={{
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature,water)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Button
          type='text'
          icon={<ImagePlus className='h-4 w-4' />}
          className='absolute bottom-0 right-0 flex items-center rounded-none text-white'
        >
          Cover Image
        </Button>
      </div>
      <Dialog.CloseButton onClose={handleClose} />
      <div className='grid grid-cols-8 gap-x-6 p-6'>
        {/* Left content */}
        <div className='col-span-2'>
          <div className='flex flex-col gap-y-2'>
            <Typography.Text className='text-xs'>Add to card</Typography.Text>
            <Popover trigger='click' placement='left' content={<AddMemberToCard />}>
              <Button
                icon={<Users className='h-3 w-3' />}
                type='default'
                className='flex items-center bg-slate-100 text-left text-slate-500'
              >
                Member
              </Button>
            </Popover>
            <Popover trigger='click' placement='left' content={<AddLabelToCard />}>
              <Button
                icon={<Tag className='h-3 w-3' />}
                type='default'
                className='flex items-center bg-slate-100 text-left text-slate-500'
              >
                Label
              </Button>
            </Popover>
            <Popover trigger='click' placement='left' content={<SetTimeToCard />}>
              <Button
                icon={<Clock className='h-3 w-3' />}
                type='default'
                className='flex items-center bg-slate-100 text-left text-slate-500'
              >
                Set time
              </Button>
            </Popover>
            <Popover trigger='click' placement='left' content={<AddTodoToCard />}>
              <Button
                icon={<ListTodo className='h-3 w-3' />}
                type='default'
                className='flex items-center bg-slate-100 text-left text-slate-500'
              >
                Todo
              </Button>
            </Popover>
            <Button
              icon={<Paperclip className='h-3 w-3' />}
              type='default'
              className='flex items-center bg-slate-100 text-left text-slate-500'
            >
              Attactments
            </Button>

            <Typography.Text className='text-xs'>Action</Typography.Text>
            <Button
              icon={<Move className='h-3 w-3' />}
              type='default'
              className='flex items-center bg-slate-100 text-left text-slate-500'
            >
              Move
            </Button>
            <Button
              icon={<Copy className='h-3 w-3' />}
              type='default'
              className='flex items-center bg-slate-100 text-left text-slate-500'
            >
              Copy
            </Button>
            <Divider className='my-[1px]' />
            <Button
              icon={<Archive className='h-3 w-3' />}
              type='default'
              className='flex items-center bg-slate-100 text-left text-slate-500'
            >
              Archive
            </Button>
            <Button
              icon={<Share className='h-3 w-3' />}
              type='default'
              className='flex items-center bg-slate-100 text-left text-slate-500'
            >
              Share
            </Button>
          </div>
        </div>

        {/* Right content */}
        <div className='col-span-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-x-2'>
              <LayoutList className='mt-[2px] h-5 w-5 opacity-40' />
              <div className='flex flex-col'>
                <Typography.Text className='text-base font-semibold'>
                  Design and Research
                </Typography.Text>
                <Typography.Text className='text-xs text-slate-500 underline'>
                  in <b>Backlog</b> list
                </Typography.Text>
              </div>
            </div>

            <div className='flex flex-col gap-y-2'>
              <Typography.Text className='text-xs font-semibold'>Notifications</Typography.Text>
              <Button
                icon={<Rss className='mt-1 h-3 w-3 text-primary-default' />}
                className='w-[90px]'
                type='default'
              >
                Follow
              </Button>
            </div>
          </div>

          {/*  Members and label */}
          <div className='flex items-center gap-x-6'>
            <div className='mt-4 flex flex-col gap-y-1'>
              <Typography.Text className='text-xs font-semibold'>Members</Typography.Text>
              <Avatar.Group maxCount={2}>
                <Tooltip title='Anh Duc'>
                  <Popover
                    trigger='click'
                    placement='bottom'
                    overlayClassName='custom-popover-member-info'
                    content={<MemberInfo />}
                  >
                    <Avatar style={{ backgroundColor: '#f56a00' }} icon={<User size='12' />} />
                  </Popover>
                </Tooltip>
              </Avatar.Group>
            </div>
            <div className='mt-4 flex flex-col gap-y-1'>
              <Typography.Text className='text-xs font-semibold'>Label</Typography.Text>
              <div className='flex items-center gap-x-1'>
                <div className='flex h-8 w-16 items-center rounded-sm bg-[#FADDDC] p-1' />
                <Popover trigger='click' placement='right' content={<AddLabelToCard />}>
                  <Button
                    icon={<Plus className='h-3 w-3 ' />}
                    className='flex w-[90px] items-center'
                    type='default'
                  />
                </Popover>
              </div>
            </div>
          </div>
          {/* Description */}

          <div className='mt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-2'>
                <Text className='mt-[2px] h-5 w-5 opacity-40' />
                <Typography.Text className='text-base font-semibold'>Description</Typography.Text>
              </div>
              <Button
                icon={<Pencil className='mt-1 h-3 w-3 text-primary-default' />}
                className='w-[90px]'
                type='default'
              >
                Edit
              </Button>
            </div>
            <TextEditor className='mt-1' />
          </div>

          {/* Check list */}
          <CheckList />

          {/* Attachments */}
          <div className='mt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-2'>
                <File className='h-5 w-5 opacity-40' />
                <Typography.Text className='text-base font-semibold'>Attachments</Typography.Text>
              </div>
              <Button
                icon={<Upload className='mt-1 h-3 w-3' />}
                className='w-[90px]'
                type='default'
              >
                Upload
              </Button>
            </div>
            <div className='ml-6 mt-2 flex flex-col gap-y-1'>
              <AttachmentItem />
              <AttachmentItem />
            </div>
          </div>
          {/* Recent activities */}

          <div className='mt-6 flex flex-col gap-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-4'>
                <List className='mt-1 h-5 w-5 opacity-40' />
                <Typography.Text className='text-base font-semibold'>
                  Recent activities
                </Typography.Text>
              </div>
              <Button
                icon={<EyeOff className='mt-1 h-3 w-3' />}
                className='w-[90px]'
                type='default'
              >
                Hide
              </Button>
            </div>

            <div className='ml-6'>
              <Activity />
            </div>
          </div>

          {/* Comment */}
          <div className='mt-4'>
            <CommentCard />
          </div>
        </div>
      </div>
    </>
  );
};

const AttachmentItem = () => {
  return (
    <div className='flex items-center gap-x-2'>
      <ImagePlus className='h-5 w-5' />
      <Typography.Text className='text-xs'>image.png</Typography.Text>
    </div>
  );
};
