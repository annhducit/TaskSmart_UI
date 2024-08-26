import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import {
  Button,
  ColorPicker,
  ColorPickerProps,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';

import FormItem from 'antd/es/form/FormItem';
import dayjs from 'dayjs';
import { DB_DATE_TIME_FORMAT } from '@/shared/constant/date';
import useGetProject from '../project/hooks/query/use-get-project';
import useCreateCard from '../project/hooks/mutation/use-create-card';
import { useContext, useState } from 'react';
import { EventContext } from '.';

import { green, presetPalettes, red, gold, blue } from '@ant-design/colors';
import { CalendarIcon, XIcon } from 'lucide-react';
import { Badge } from '@/shared/components/badge';

const CreateNewEvent = () => {
  const [form] = Form.useForm();
  const { onClose } = useDialogContext();
  const [color, setColor] = useState<string>('#4096ff');

  const event = useContext(EventContext);

  const { data: project } = useGetProject();
  const { mutate: createCard, isPending } = useCreateCard();

  const onFinish = (value: any) => {
    value.startTime = dayjs(value.startTime).format(DB_DATE_TIME_FORMAT);
    value.estimate = dayjs(value.estimate).add(7, 'hours').format(DB_DATE_TIME_FORMAT);

    createCard(
      {
        columnId: value.listCardId,
        card: {
          name: value.name,
          startTime: dayjs(event?.start).format(DB_DATE_TIME_FORMAT),
          estimate: value.estimate,
          description: '',
          color: color,
          status: value.status,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const listCard = project?.listCards.map((listCard) => ({
    label: listCard.name,
    value: listCard.id,
  }));

  const customPanelRender: ColorPickerProps['panelRender'] = (_, { components: { Presets } }) => (
    <div>
      <Presets />
    </div>
  );

  return (
    <>
      <Dialog.CloseButton onClose={() => onClose()} />
      <Typography.Text className='text-xl font-semibold'>Create new event</Typography.Text>
      <Form onFinish={onFinish} form={form} layout='vertical' name='create-event' className='mt-2'>
        <div className='flex items-center gap-x-2'>
          <Form.Item
            name='name'
            label='Title'
            className='flex-1'
            rules={[{ required: true, message: 'Please input name' }]}
          >
            <Input placeholder='Reading book,...' allowClear />
          </Form.Item>

          <Form.Item name='color' label='Color'>
            <ColorPicker
              defaultValue={'#4096ff'}
              presets={presets}
              value={color}
              onChange={(color) => setColor(color.toHexString())}
              panelRender={customPanelRender}
              allowClear
            />
          </Form.Item>
        </div>
        <div className='flex w-full items-center gap-x-2'>
          <Form.Item name='startTime' className='flex-1' label='Start'>
            <DatePicker
              suffixIcon={<CalendarIcon className='h-4 w-4' />}
              allowClear={{ clearIcon: <XIcon className='-mr-0.5 h-5 w-5' /> }}
              showTime
              needConfirm={false}
              defaultValue={dayjs(event?.start)}
            />
          </Form.Item>
          <Form.Item name='estimate' label='Estimate' className='w-full flex-1'>
            <DatePicker
              suffixIcon={<CalendarIcon className='h-4 w-4' />}
              allowClear={{ clearIcon: <XIcon className='-mr-0.5 h-4 w-4' /> }}
              showTime
              needConfirm={false}
              onChange={(date) => {
                if (date && dayjs(date).isBefore(dayjs(event?.start), 'day')) {
                  form.setFields([
                    {
                      name: 'estimate',
                      errors: ['Estimate time must after start time'],
                    },
                  ]);
                }
              }}
            />
          </Form.Item>
        </div>
        <div className='flex items-center gap-x-2'>
          <Form.Item
            name='listCardId'
            className='flex-1'
            label='List card'
            rules={[{ required: true, message: 'Please select card' }]}
          >
            <Select placeholder='Select card' options={listCard} />
          </Form.Item>
          <Form.Item name='status' label='Status' className='w-[150px]'>
            <Select
              placeholder='Select status'
              options={EStatusArray.map((status) => ({
                label: status.label,
                value: status.key,
              }))}
              defaultValue={{ value: 'none' }}
              allowClear
            />
          </Form.Item>
        </div>
        <FormItem>
          <Button loading={isPending} type='primary' className='float-right' htmlType='submit'>
            Add event
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export default CreateNewEvent;

export const DialogCreateEvent = () => {
  return (
    <Dialog.Param
      paramKey={SEARCH_PARAMS.MODAL}
      paramValue={SEARCH_PARAMS_VALUE.CREATE_EVENT}
      size='xs'
    >
      <CreateNewEvent />
    </Dialog.Param>
  );
};

type Presets = Required<ColorPickerProps>['presets'][number];

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors }));

const presets = genPresets({ red, green, gold, blue });

const EStatusArray = [
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
    key: 'Approved',
    label: (
      <div className='flex items-center gap-x-4'>
        <Badge color='#90EE90' />
        <span>Approved</span>
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
