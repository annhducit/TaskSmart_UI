import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
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
import type { ColorPickerProps, TableProps, UploadProps, TabsProps, GetProp } from 'antd';
import { green, presetPalettes, red, gold, blue, cyan, purple, magenta } from '@ant-design/colors';
import { DATE_TIME_FORMAT, DB_DATE_TIME_FORMAT } from '@/shared/constant/date';
import { DatePicker } from 'antd';

import {
  LayoutList,
  Plus,
  Text,
  Upload as UploadIcon,
  User,
  Eye,
  Download,
  Trash,
  List,
  EyeOff,
  Minus,
  ChevronDown,
  Trash2,
} from 'lucide-react';
import Activity from './activity';
import CommentCard from './comment';
import CheckList from './check-list';
import MemberInfo from './popover/member-info';
import Tooltip from '@/shared/components/tooltip';
import { useEffect, useState } from 'react';
import { tsmAxios } from '@/configs/axios';
import type { MenuProps } from 'antd';
import useGetCard from '../hooks/query/use-get-card';
import useUpdateCard from '../hooks/mutation/use-update-card';
import useUpdateCardImplementer from '../hooks/mutation/use-update-card-implementer';
import dayjs from 'dayjs';
import { getTextColor } from '@/utils/customText';
import { Badge } from '@/shared/components/badge';
import useRemoveCardConfirm from '../hooks/action/use-delete-card-confirm';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ModifyCard = ({ members }: { members: UserRelation[] }) => {
  return (
    <Dialog.Param
      className='custom-modal-content'
      size='normal'
      paramKey={SEARCH_PARAMS.DIALOG}
      paramValue={SEARCH_PARAMS_VALUE.CARD}
    >
      <ModifyCardModal members={members} />
    </Dialog.Param>
  );
};

export default ModifyCard;

type PreviewImage = {
  visible: boolean;
  src: string;
};

const ModifyCardModal = ({ members }: { members: UserRelation[] }) => {
  const { onClose } = useDialogContext();

  const [_cards, setCard] = useState<Card>({
    id: '',
    name: '',
    color: '',
    description: '',
    status: 'none',
    priority: 'none',
    risk: 'none',
    effort: 'none',
    estimate: new Date(),
    startTime: new Date(),
    checkLists: [],
    attachments: [],
    comments: [],
    implementers: [],
  });

  const defaultCardColor = '1677ff';

  /**
   * Get card by id
   * @description Tanstack React Query
   */
  const { data: card } = useGetCard();
  const { mutate: updateCard } = useUpdateCard();

  const handleClose = () => {
    onClose((searchParam) => {
      if (searchParam.has(SEARCH_PARAMS.ID)) {
        searchParam.delete(SEARCH_PARAMS.ID);
      }
    });
  };

  const updateCardOverView = (data: Partial<Card>) => {
    updateCard({
      id: card?.id,
      ...data,
    });
    card && setCard({ ...card, ...data });
  };

  const operations = card && (
    <ColorAndMembers
      card={card}
      color={card.color || defaultCardColor}
      updateCard={updateCardOverView}
      setCard={setCard}
      members={members}
    />
  );

  const tabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'Overview',
      children: (
        <>
          {card && (
            <OverviewCardTab
              card={card}
              color={card.color || defaultCardColor}
              setCard={setCard}
              updateCard={updateCardOverView}
            />
          )}
        </>
      ),
    },
    {
      key: '2',
      label: 'Attachments',
      children: (
        <> {card && <AttachmentTab card={card} color={card.color || defaultCardColor} />}</>
      ),
    },
    {
      key: '3',
      label: 'Activity',
      children: <ActivityTab />,
    },
  ];

  const deleteCard = useRemoveCardConfirm();
  const textColor = getTextColor(card?.color as string);
  return (
    <>
      <div className='relative'>
        <Dialog.CloseButton onClose={handleClose} color={textColor} />
        <Tooltip title='Remove card'>
          <div className='absolute right-14 top-6 cursor-pointer rounded px-1 transition-all hover:bg-[#091E4224]'>
            <Trash2
              onClick={() => deleteCard(card?.id as string)}
              className='mt-1 h-4 w-4'
              color='red'
            />
          </div>
        </Tooltip>
      </div>

      <div className='w-[auto]'>
        <div
          style={{ backgroundColor: `#${card?.color || defaultCardColor}` }}
          className={`flex min-h-[100px] items-center justify-between overflow-hidden rounded-t-lg px-10`}
        >
          <div className='flex items-center gap-x-3'>
            <LayoutList className={`text-${textColor} h-6 w-6`} />
            <div className={`flex flex-col`}>
              <Typography.Text className={`text-${textColor} text-xl font-semibold`}>
                {card?.name}
              </Typography.Text>
              <Typography.Text className={`text-${textColor} text-xs underline`}>
                in <b>Backlog</b> list
              </Typography.Text>
            </div>
          </div>
        </div>

        <div className='flex px-5 py-0'>
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  itemActiveColor: `#${card?.color || defaultCardColor}`,
                  itemHoverColor: `#${card?.color || defaultCardColor}`,
                  itemSelectedColor: `#${card?.color || defaultCardColor}`,
                  inkBarColor: `#${card?.color || defaultCardColor}`,
                },
              },
            }}
          >
            <Tabs
              defaultActiveKey='1'
              items={tabs}
              tabBarExtraContent={operations}
              className='w-full'
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

const OverviewCardTab = ({
  card,
  color,
  setCard,
  updateCard,
}: {
  card: Card;
  color: string;
  setCard: React.Dispatch<React.SetStateAction<Card>>;
  updateCard: (data: Partial<Card>) => void;
}) => {
  const status: MenuProps['items'] = EStatusArray;
  const priority: MenuProps['items'] = ELevelArray;
  const effort: MenuProps['items'] = ELevelArray;
  const risk: MenuProps['items'] = ELevelArray;

  const [description, setDescription] = useState(card.description);

  const getLabel = (key: string, array: any[]): string => {
    return array.find((item) => item.key === key)?.label || 'Not Set';
  };

  const handleStatusClick: MenuProps['onClick'] = (e) => {
    updateCard({ status: e.key as EStatus });
  };

  const handlePriorityClick: MenuProps['onClick'] = (e) => {
    updateCard({ priority: e.key as ELevel });
  };

  const handleRiskClick: MenuProps['onClick'] = (e) => {
    updateCard({ risk: e.key as ELevel });
  };

  const handleEffortClick: MenuProps['onClick'] = (e) => {
    updateCard({ effort: e.key as ELevel });
  };

  const handleSaveDescriptionClick = () => {
    updateCard({ ...card, description });
  };

  const btnTheme = {
    components: {
      Button: {
        defaultBg: `#${color}`,
      },
    },
  };

  const textColor = getTextColor(color);

  return (
    <div className='flex min-h-[400px] w-full flex-col justify-between pb-5'>
      <div className='flex-col px-0 py-0'>
        <div className='flex items-center justify-between gap-x-1'>
          <div className='mt-1 flex flex-col gap-y-3'>
            <Typography.Text className='text-xs font-semibold'>Status</Typography.Text>
            <Dropdown
              placement='bottom'
              className='w-[150px] cursor-pointer text-left'
              menu={{
                items: status,
                onClick: handleStatusClick,
                selectable: true,
                defaultSelectedKeys: [card?.status || 'none'],
              }}
            >
              <Space className='gap-x-10' size='large'>
                {getLabel(card.status, EStatusArray)}
                <ChevronDown className='mt-1 h-4 w-4 opacity-40' />
              </Space>
            </Dropdown>
          </div>

          <div className='mt-1 flex flex-col gap-y-3'>
            <Typography.Text className='text-xs font-semibold'>Priority</Typography.Text>
            <Dropdown
              placement='bottom'
              className='w-[150px] cursor-pointer text-left'
              menu={{
                items: priority,
                onClick: handlePriorityClick,
                selectable: true,
                defaultSelectedKeys: [card.priority || 'none'],
              }}
            >
              <Space className='gap-x-10' size='large'>
                {getLabel(card.priority, ELevelArray)}
                <ChevronDown className='mt-1 h-4 w-4 opacity-40' />
              </Space>
            </Dropdown>
          </div>

          <div className='mt-1 flex flex-col gap-y-3'>
            <Typography.Text className='text-xs font-semibold'>Risk</Typography.Text>
            <Dropdown
              placement='bottom'
              className='w-[150px] cursor-pointer text-left'
              menu={{
                items: risk,
                onClick: handleRiskClick,
                selectable: true,
                defaultSelectedKeys: [card.risk || 'none'],
              }}
            >
              <Space className='gap-x-10' size='large'>
                {getLabel(card.risk, ELevelArray)}
                <ChevronDown className='mt-1 h-4 w-4 opacity-40' />
              </Space>
            </Dropdown>
          </div>

          <div className='mt-1 flex flex-col gap-y-3'>
            <Typography.Text className='text-xs font-semibold'>Effort</Typography.Text>
            <Dropdown
              placement='bottom'
              className='w-[150px] cursor-pointer text-left'
              menu={{
                items: effort,
                onClick: handleEffortClick,
                selectable: true,
                defaultSelectedKeys: [card.effort || 'none'],
              }}
            >
              <Space className='gap-x-10' size='large'>
                {getLabel(card.effort, ELevelArray)}
                <ChevronDown className='mt-1 h-4 w-4 opacity-40' />
              </Space>
            </Dropdown>
          </div>
        </div>
        <div className='mt-4 flex items-center justify-start gap-x-4'>
          <div className='flex flex-col gap-y-1'>
            <Typography.Text className='text-xs font-semibold'>Start time</Typography.Text>
            <DatePicker
              format={{
                format: DATE_TIME_FORMAT,
                type: 'mask',
              }}
              placeholder='Start time'
              showTime
              value={card.estimate && dayjs(card.startTime)}
              onChange={(value, _dateString) => {
                updateCard({ startTime: dayjs(value).format(DB_DATE_TIME_FORMAT) });
              }}
              className='w-[160px]'
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <Typography.Text className='text-xs font-semibold'>Estimate</Typography.Text>
            <DatePicker
              format={{
                format: DATE_TIME_FORMAT,
                type: 'mask',
              }}
              placeholder='Estimate time'
              showTime
              value={card.estimate && dayjs(card.estimate)}
              onChange={(value, _dateString) => {
                updateCard({ estimate: dayjs(value).format(DB_DATE_TIME_FORMAT) });
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
            <Input.TextArea
              className='mt-1 h-[auto]'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className='flex justify-end'>
              <div className='flex gap-2'>
                <ConfigProvider theme={btnTheme}>
                  <Button
                    onClick={handleSaveDescriptionClick}
                    className={`text-${textColor} w-[90px]`}
                  >
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
        <CheckList
          list={card.checkLists}
          setCheckList={(checkLists: CheckListGroup[]) => {
            setCard({ ...card, checkLists });
          }}
          color={`#${color}`}
        />
      </div>

      {/* Comment */}
      <div className='mt-4'>
        <CommentCard
          comments={card.comments}
          setCard={(cards: Card) => {
            setCard(cards);
          }}
          color={`#${color}`}
        />
      </div>
    </div>
  );
};

const AttachmentTab = (props: { card: Card; color: string }) => {
  const [attachments, setAttachments] = useState<Attachment[]>(props.card.attachments);

  const handleUpload = (fileList: FileType[]) => {
    if (fileList.length === 0) {
      console.log('No files to upload');
      return;
    }

    const formData = new FormData();
    fileList.forEach((file, _index) => {
      formData.append(`files`, file as FileType);
    });

    const UploadAsync = async () => {
      try {
        console.log(formData.get('files'));
        const res = await tsmAxios.post(`/cards/${props.card.id}/attachment`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setAttachments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    UploadAsync();
  };

  const uploadProp: UploadProps = {
    beforeUpload: (_file, fileList) => {
      console.log(fileList as FileType[]);
      handleUpload(fileList as FileType[]);
      return false;
    },
  };

  return (
    <div className='flex min-h-[400px] w-full flex-col px-0 py-0'>
      <div className='mt-6 w-full'>
        <div className='flex items-center justify-center'>
          <Upload multiple {...uploadProp}>
            <Button icon={<UploadIcon />}>Upload</Button>
          </Upload>
        </div>
        <AttachmentFile data={attachments} />
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
            <List className='mt-1 h-5 w-5 opacity-40' />
            <Typography.Text className='text-base font-semibold'>Recent activities</Typography.Text>
          </div>
          <Button icon={<EyeOff className='mt-1 h-3 w-3' />} className='w-[90px]' type='default'>
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
          className='h-7 w-full cursor-pointer rounded-xl border-none px-3 text-base font-bold transition-all'
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
          className='h-7 w-full cursor-pointer rounded-xl border-none px-3 text-sm font-bold transition-all'
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space className='flex w-full justify-end'>
          <Eye
            className={`${record.type !== 'image' ? 'invisible' : ''} h-3 w-3`}
            onClick={() =>
              setPreviewImage({
                visible: true,
                src: `http://localhost:8888/api/projects/6673a8a81fbe68659d504d85/assets/${record.fileId}`,
              })
            }
          />
          <Download className='h-3 w-3' />
          <Trash className='h-3 w-3' />
        </Space>
      ),
    },
  ];

  return (
    <div className='mt-2 flex w-full gap-y-1'>
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
  updateCard,
  members,
  setCard,
}: {
  card: Card;
  color: string;
  updateCard: (data: Partial<Card>) => void;
  members: UserRelation[];
  setCard: React.Dispatch<React.SetStateAction<Card>>;
}) => {
  const presets = genPresets({ red, green, gold, blue, cyan, purple, magenta });
  const customPanelRender: ColorPickerProps['panelRender'] = (_, { components: { Presets } }) => (
    <div>
      <Presets />
    </div>
  );

  const { mutate: updateCardImplementer, data } = useUpdateCardImplementer();
  const updateImplementers = (implementers: UserRelation[]) => {
    updateCardImplementer(implementers);
    setCard(data as Card);
  };

  return (
    <div className='flex items-center justify-end gap-x-6 py-1'>
      <div className='flex gap-y-1'>
        <Typography.Text className='mr-1 text-sm font-semibold'>Color:</Typography.Text>
        <ColorPicker
          value={`#${color}`}
          presets={presets}
          panelRender={customPanelRender}
          size='small'
          onChange={(color) => {
            updateCard({ color: color.toHex() });
          }}
        />
      </div>
      <div className='flex gap-y-1'>
        <Typography.Text className='mr-1 text-sm font-semibold'>Members:</Typography.Text>
        <Avatar.Group size='small' maxCount={2}>
          {card.implementers?.map((user) => (
            <Tooltip title={user.name} key={user.userId}>
              <Popover
                trigger='click'
                placement='bottom'
                overlayClassName='custom-popover-member-info'
                content={<MemberInfo />}
              >
                <Avatar
                  src={`http://localhost:8888/api/image/${user.profileImagePath}`}
                  icon={<User size='12' />}
                />
              </Popover>
            </Tooltip>
          ))}
          <Popover
            trigger='click'
            placement='bottomRight'
            content={
              <MemberInviteCard
                color={color}
                members={members}
                implementers={card.implementers}
                updateImplementers={updateImplementers}
              />
            }
            className='p-0'
          >
            <Avatar className='bg-[#b2bec3] hover:bg-[#636e72]' icon={<Plus size='12' />} />
          </Popover>
        </Avatar.Group>
      </div>
    </div>
  );
};

const MemberInviteCard = ({
  members,
  color,
  implementers,
  updateImplementers,
}: {
  color: string;
  members: UserRelation[];
  implementers: UserRelation[];
  updateImplementers: (implementers: UserRelation[]) => void;
}) => {
  const [impls, setImpls] = useState<UserRelation[]>(implementers);
  const [notImplementer, setNotImplementer] = useState<UserRelation[]>([]);
  useEffect(() => {
    setNotImplementer(
      members.filter((member) => !impls.find((impl) => impl.userId === member.userId))
    );
  }, [impls]);

  return (
    <div className='flex flex-col gap-y-1 rounded-none p-0'>
      <span>Implementers:</span>
      {impls.map((member) => (
        <div
          key={member.userId}
          className='flex items-center gap-x-2 rounded px-2 py-1 hover:bg-[#ecf0f1]'
        >
          <div className='flex gap-x-2'>
            <Avatar
              src={`http://localhost:8888/api/image/${member.profileImagePath}`}
              icon={<User size='12' />}
            />
            <Typography.Text>{member.name}</Typography.Text>
          </div>
          <div className='w-5'>
            <Minus
              onClick={() => {
                setImpls((prev) => prev.filter((impl) => impl.userId !== member.userId));
              }}
              className='h-3 w-3 cursor-pointer hover:h-4 hover:w-4'
            ></Minus>
          </div>
        </div>
      ))}
      <div className='h-[1px] w-full bg-[#7f8c8d]'></div>
      {notImplementer.map((member) => (
        <div
          key={member.userId}
          className='flex items-center gap-x-2 rounded px-2 py-1 hover:bg-[#ecf0f1]'
        >
          <div className='flex gap-x-2'>
            <Avatar
              src={`http://localhost:8888/api/image/${member.profileImagePath}`}
              icon={<User size='12' />}
            />
            <Typography.Text>{member.name}</Typography.Text>
          </div>
          <div className='w-5'>
            <Plus
              onClick={() => {
                setImpls((prev) => [...prev, member]);
              }}
              className='h-3 w-3 cursor-pointer hover:h-4 hover:w-4'
            ></Plus>
          </div>
        </div>
      ))}
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultBg: `${color}`,
            },
          },
        }}
      >
        <Button
          onClick={() => {
            updateImplementers(impls);
          }}
          className='h-[30px] w-[60px] p-0'
        >
          Save
        </Button>
      </ConfigProvider>
    </div>
  );
};

type Presets = Required<ColorPickerProps>['presets'][number];
const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors }));

const EStatusArray: { key: EStatus; label: React.ReactNode }[] = [
  {
    key: 'ToDo',
    label: (
      <div className='flex items-center gap-x-4'>
        <Badge color='#0089ED' />
        <span>To do</span>
      </div>
    ),
  },
  {
    key: 'InProgress',
    label: (
      <div className='flex items-center gap-x-4'>
        <Badge color='#FFA500' />
        <span>In progress</span>
      </div>
    ),
  },
  {
    key: 'Done',
    label: (
      <div className='flex items-center gap-x-4'>
        <Badge color='#008000' />
        <span>Done</span>
      </div>
    ),
  },
  {
    key: 'InReview',
    label: (
      <div className='flex items-center gap-x-4'>
        <Badge color='#800080' />
        <span>In review</span>
      </div>
    ),
  },
  {
    key: 'Approved',
    label: (
      <div className='flex items-center gap-x-4'>
        <Badge color='#90EE90' />
        <span>Approved</span>
      </div>
    ),
  },
  {
    key: 'NotSure',
    label: (
      <div className='flex items-center gap-x-4'>
        <Badge color='#D3D3D3' />
        <span>Not sure</span>
      </div>
    ),
  },
  {
    key: 'none',
    label: (
      <div className='flex items-center gap-x-4'>
        <Badge color='#D3D3D3' />
        <span>Not set</span>
      </div>
    ),
  },
];

const ELevelArray: { key: ELevel; label: React.ReactNode }[] = [
  {
    key: 'Highest',
    label: (
      <div className='flex items-center gap-x-2'>
        <Badge color='#FF0000' />
        <span>Highest</span>
      </div>
    ),
  },
  {
    key: 'High',
    label: (
      <div className='flex items-center gap-x-2'>
        <Badge color='#FFA500' />
        <span>High</span>
      </div>
    ),
  },
  {
    key: 'Medium',
    label: (
      <div className='flex items-center gap-x-2'>
        <Badge color='#FFFF00' />
        <span>Medium</span>
      </div>
    ),
  },
  {
    key: 'Low',
    label: (
      <div className='flex items-center gap-x-2'>
        <Badge color='#90EE90' />
        <span>Low</span>
      </div>
    ),
  },
  {
    key: 'Lowest',
    label: (
      <div className='flex items-center gap-x-2'>
        <Badge color='#008000' />
        <span>Lowest</span>
      </div>
    ),
  },
  {
    key: 'NotSure',
    label: (
      <div className='flex items-center gap-x-2'>
        <Badge color='#808080' />
        <span>Not sure</span>
      </div>
    ),
  },
  {
    key: 'none',
    label: (
      <div className='flex items-center gap-x-2'>
        <Badge color='#D3D3D3' />
        <span>Not set</span>
      </div>
    ),
  },
];
