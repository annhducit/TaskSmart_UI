import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
import TextEditor from '@/shared/components/text-editor';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import {
  Avatar,
  Button,
  Image,
  Popover,
  Typography,
  ColorPicker,
  Input,
  Dropdown,
  Space,
  Table,
  Upload,
  Tabs,
  ConfigProvider,
} from 'antd';
import type { ColorPickerProps, TableProps, UploadProps, TabsProps } from 'antd';
import { green, presetPalettes, red, gold, blue, cyan, purple, magenta } from '@ant-design/colors';
import { DATE_TIME_FORMAT } from '@/shared/constant/date';
import { DatePicker } from 'antd';

import {
  LayoutList,
  Pencil,
  Plus,
  Text,
  Upload as UploadIcon,
  User,
  Eye,
  Download,
  Trash,
  List,
  EyeOff,
} from 'lucide-react';
import Activity from './activity';
import CommentCard from './comment';
import CheckList from './check-list';
import MemberInfo from './popover/member-info';
import Tooltip from '@/shared/components/tooltip';
import useSearchParams from '@/shared/hooks/use-search-params';
import { useEffect, useState } from 'react';
import { tsmAxios } from '@/configs/axios';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

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

const cardUndefine: Card = {
  id: '',
  name: '',
  color: '',
  description: '',
  status: 'none',
  priority: 'none',
  risk: 'none',
  effort: 'none',
  estimate: new Date(),
  checkLists: [],
  attachments: [],
};

type PreviewImage = {
  visible: boolean;
  src: string;
};

const ModifyCardModal = () => {
  const { onClose } = useDialogContext();

  const searhParams = useSearchParams();

  const [card, setCard] = useState<Card>(cardUndefine);

  const defaultCardColor = '1677ff';

  const tabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'Overview',
      children: (
        <OverviewCardTab card={card} color={card.color || defaultCardColor} setCard={setCard} />
      ),
    },
    {
      key: '2',
      label: 'Attachments',
      children: <AttachmentTab card={card} color={card.color || defaultCardColor} />,
    },
    {
      key: '3',
      label: 'Activity',
      children: <ActivityTab />,
    },
  ];

  useEffect(() => {
    const cardId = searhParams.get(SEARCH_PARAMS.ID);
    const createCardAsync = async () => {
      try {
        const res = await tsmAxios.get(`/cards/${cardId}`);
        setCard(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (cardId) {
      createCardAsync();
    }
  }, []);

  const handleClose = () => {
    onClose((searchParam) => {
      if (searchParam.has(SEARCH_PARAMS.ID)) {
        searchParam.delete(SEARCH_PARAMS.ID);
      }
    });
  };

  const operations = (
    <ColorAndMembers
      card={card}
      color={card.color || defaultCardColor}
      setCard={setCard}
    ></ColorAndMembers>
  );

  return (
    <>
      <Dialog.CloseButton onClose={handleClose} />
      {/* Left content */}
      {/* <div className='col-span-2'>
            <Typography.Text className='text-xs'>Action</Typography.Text>
            <Button
              icon={<Move className='w-3 h-3' />}
              type='default'
              className='flex items-center text-left bg-slate-100 text-slate-500'
            >
              Move
            </Button>
            <Button
              icon={<Copy className='w-3 h-3' />}
              type='default'
              className='flex items-center text-left bg-slate-100 text-slate-500'
            >
              Copy
            </Button>
            <Divider className='my-[1px]' />
            <Button
              icon={<Archive className='w-3 h-3' />}
              type='default'
              className='flex items-center text-left bg-slate-100 text-slate-500'
            >
              Archive
            </Button>
            <Button
              icon={<Share className='w-3 h-3' />}
              type='default'
              className='flex items-center text-left bg-slate-100 text-slate-500'
            >
              Share
            </Button>
          </div>
        </div> */}

      <div className='w-[auto]'>
        <div
          style={{ backgroundColor: `#${card.color || defaultCardColor}` }}
          className={`flex min-h-[100px] items-center justify-between overflow-hidden rounded-t-lg px-10`}
        >
          <div className='flex items-start gap-x-2'>
            <LayoutList className='mt-[2px] h-5 w-5 opacity-40' />
            <div className={`flex flex-col`}>
              <Typography.Text className='text-xl font-semibold'>{card.name}</Typography.Text>
              <Typography.Text className='text-xs underline'>
                in <b>Backlog</b> list
              </Typography.Text>
            </div>
          </div>
        </div>

        <div className='flex px-5 py-0'>
          <Tabs
            defaultActiveKey='1'
            items={tabs}
            tabBarExtraContent={operations}
            className='w-full'
          />
        </div>
      </div>
    </>
  );
};

const OverviewCardTab = ({
  card,
  color,
  setCard,
}: {
  card: Card;
  color: string;
  setCard: React.Dispatch<React.SetStateAction<Card>>;
}) => {
  const status: MenuProps['items'] = EStatusArray;
  const priority: MenuProps['items'] = ELevelArray;
  const effort: MenuProps['items'] = ELevelArray;
  const risk: MenuProps['items'] = ELevelArray;

  const getLabel = (key: string, array: any[]): string => {
    return array.find((item) => item.key === key)?.label || 'Not Set';
  };

  const handleStatusClick: MenuProps['onClick'] = (e) => {
    setCard({ ...card, status: e.key as EStatus });
  };

  const handlePriorityClick: MenuProps['onClick'] = (e) => {
    setCard({ ...card, priority: e.key as ELevel });
  };

  const handleRiskClick: MenuProps['onClick'] = (e) => {
    setCard({ ...card, risk: e.key as ELevel });
  };

  const handleEffortClick: MenuProps['onClick'] = (e) => {
    setCard({ ...card, effort: e.key as ELevel });
  };

  const btnTheme  = {
    components: {
      Button: {
        defaultBg: color,
      },
    },
  };

  return (
    <div className='flex min-h-[400px] w-full flex-col justify-between pb-5'>
      <div className='flex-col px-0 py-0'>
        <div className='flex items-center justify-evenly gap-x-6'>
          <div className='flex flex-col mt-1 gap-y-1'>
            <Typography.Text className='text-xs font-semibold'>Status</Typography.Text>
            <Dropdown
              placement='bottom'
              menu={{
                items: status,
                onClick: handleStatusClick,
                selectable: true,
                defaultSelectedKeys: [card.status || 'none'],
              }}
            >
              <Button className='w-[125px]'>
                <Space>
                  {getLabel(card.status, EStatusArray)}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          <div className='flex flex-col mt-1 gap-y-1'>
            <Typography.Text className='text-xs font-semibold'>Priority</Typography.Text>
            <Dropdown
              placement='bottom'
              menu={{
                items: priority,
                onClick: handlePriorityClick,
                selectable: true,
                defaultSelectedKeys: [card.priority || 'none'],
              }}
            >
              <Button className='w-[125px]'>
                <Space>
                  {getLabel(card.priority, ELevelArray)}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          <div className='flex flex-col mt-1 gap-y-1'>
            <Typography.Text className='text-xs font-semibold'>Risk</Typography.Text>
            <Dropdown
              placement='bottom'
              menu={{
                items: risk,
                onClick: handleRiskClick,
                selectable: true,
                defaultSelectedKeys: [card.risk || 'none'],
              }}
            >
              <Button className='w-[125px]'>
                <Space>
                  {getLabel(card.risk, ELevelArray)}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          <div className='flex flex-col mt-1 gap-y-1'>
            <Typography.Text className='text-xs font-semibold'>Effort</Typography.Text>
            <Dropdown
              placement='bottom'
              menu={{
                items: effort,
                onClick: handleEffortClick,
                selectable: true,
                defaultSelectedKeys: [card.effort || 'none'],
              }}
            >
              <Button className='w-[125px]'>
                <Space>
                  {getLabel(card.effort, ELevelArray)}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          <div className='flex flex-col mt-1 gap-y-1'>
            <Typography.Text className='text-xs font-semibold'>Estimate</Typography.Text>
            <DatePicker
              format={{
                format: DATE_TIME_FORMAT,
                type: 'mask',
              }}
              placeholder='Estimate time'
              showTime
              onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
              }}
              className='w-[160px]'
            />
          </div>
        </div>

        {/* Description */}
        <div className='mt-6'>
          <div className='flex items-center gap-x-2'>
            <Text className='mt-[2px] h-5 w-5 opacity-40' color={`#${color}`} />
            <Typography.Text className='text-base font-semibold'>Description</Typography.Text>
          </div>
          <div className='flex flex-col gap-2 px-6'>
            <Input.TextArea className='mt-1 h-[auto]' value={card.description} />
            <div className='flex justify-end'>
              <div className='flex gap-2'>
                <ConfigProvider
                  theme={btnTheme}
                >
                  <Button className='w-[90px]'>
                    Save
                  </Button>
                </ConfigProvider>
                <Button className='w-[90px]' type='default'>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Check list */}
        <CheckList list={card.checkLists} color={`#${color}`} />
      </div>

      {/* Comment */}
      <div className='mt-4'>
        <CommentCard color={`#${color}`} />
      </div>
    </div>
  );
};

const AttachmentTab = (props: { card: Card; color: string }) => {
  const uploadProps: UploadProps = {
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
      } else if (status === 'error') {
      }
    },
  };

  const file: Attachment[] = [
    {
      resourceId: '1',
      title: 'Image 1',
      type: 'image',
      description: 'This is a image 1, it is a beautiful image.',
    },
    {
      resourceId: '2',
      title: 'File 1',
      type: 'file',
    },
    {
      resourceId: '3',
      title: 'Image 1',
      type: 'image',
    },
  ];

  return (
    <div className='flex min-h-[400px] w-full flex-col px-0 py-0'>
      <div className='w-full mt-6'>
        <div className='flex items-center justify-center'>
          {/* <Button
                    icon={<Upload className='w-3 h-3 mt-1' />}
                    className='w-[90px]'
                    type='default'
                  >
                    Upload
                  </Button> */}
          <Upload {...uploadProps}>
            <Button icon={<UploadIcon />}>Upload</Button>
          </Upload>
        </div>
        <AttachmentFile data={file} />
      </div>
    </div>
  );
};

const ActivityTab = () => {
  return (
    <div className='flex min-h-[400px] w-full flex-col px-0 py-0'>
      {/* Recent activities */}

      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-4'>
            <List className='w-5 h-5 mt-1 opacity-40' />
            <Typography.Text className='text-base font-semibold'>Recent activities</Typography.Text>
          </div>
          <Button icon={<EyeOff className='w-3 h-3 mt-1' />} className='w-[90px]' type='default'>
            Hide
          </Button>
        </div>

        <div className='ml-6'>
          <Activity />
        </div>
      </div>
    </div>
  );
};

const AttachmentFile = ({ data }: { data: Attachment[] }) => {
  const [previewImage, setPreviewImage] = useState<PreviewImage>({ visible: false, src: '' });

  const attachmentColumns: TableProps<Attachment>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150,
      render: (text) => (
        <Input
          allowClear
          type='text'
          defaultValue={text}
          className='w-full px-3 text-base font-bold transition-all border-none cursor-pointer h-7 rounded-xl'
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Input
          allowClear
          type='text'
          defaultValue={text}
          className='w-full px-3 text-sm font-bold transition-all border-none cursor-pointer h-7 rounded-xl'
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space className='flex justify-end w-full'>
          <Eye
            className={`${record.type !== 'image' ? 'invisible' : ''} h-3 w-3`}
            onClick={() =>
              setPreviewImage({
                visible: true,
                src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              })
            }
          />
          <Download className='w-3 h-3' />
          <Trash className='w-3 h-3' />
        </Space>
      ),
    },
  ];

  return (
    <div className='flex w-full mt-2 gap-y-1'>
      {/* Table of file */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellPaddingBlock: 5,
            },
          },
        }}
      >
        <Table
          className='w-full'
          dataSource={data}
          columns={attachmentColumns}
          pagination={false}
          scroll={{ y: 300 }}
        />
      </ConfigProvider>

      {/* Preview click image */}
      <Image
        style={{ display: 'none' }}
        alt='Preview'
        preview={{
          visible: previewImage.visible,
          src: previewImage.src,
          onVisibleChange: (value) => {
            setPreviewImage((prev) => ({ ...prev, visible: value }));
          },
        }}
      />
    </div>
  );
};

const ColorAndMembers = ({
  card,
  color,
  setCard,
}: {
  card: Card;
  color: string;
  setCard: React.Dispatch<React.SetStateAction<Card>>;
}) => {
  const presets = genPresets({ red, green, gold, blue, cyan, purple, magenta });
  const customPanelRender: ColorPickerProps['panelRender'] = (_, { components: { Presets } }) => (
    <div>
      <Presets />
    </div>
  );
  return (
    <div className='flex items-center justify-end py-1 gap-x-6'>
      <div className='flex gap-y-1'>
        <Typography.Text className='mr-1 text-sm font-semibold'>Color:</Typography.Text>
        <ColorPicker
          value={`#${color}`}
          presets={presets}
          panelRender={customPanelRender}
          size='small'
          onChange={(color) => {
            setCard({ ...card, color: color.toHex() });
          }}
        />
      </div>
      <div className='flex gap-y-1'>
        <Typography.Text className='mr-1 text-sm font-semibold'>Members:</Typography.Text>
        <Avatar.Group size='small' maxCount={2}>
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
          <Avatar className='bg-[#b2bec3] hover:bg-[#636e72]' icon={<Plus size='12' />} />
        </Avatar.Group>
      </div>
    </div>
  );
};

type Presets = Required<ColorPickerProps>['presets'][number];
const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors }));

const EStatusArray: { key: EStatus; label: string }[] = [
  { key: 'ToDo', label: 'To Do' },
  { key: 'InProgress', label: 'In Progress' },
  { key: 'Done', label: 'Done' },
  { key: 'InReview', label: 'In Review' },
  { key: 'Approved', label: 'Approved' },
  { key: 'NotSure', label: 'Not Sure' },
  { key: 'none', label: 'Not Set' },
];

const ELevelArray: { key: ELevel; label: string }[] = [
  { key: 'Highest', label: 'Highest' },
  { key: 'High', label: 'High' },
  { key: 'Medium', label: 'Medium' },
  { key: 'Low', label: 'Low' },
  { key: 'Lowest', label: 'Lowest' },
  { key: 'NotSure', label: 'Not Sure' },
  { key: 'none', label: 'Not Set' },
];
