import React from 'react';
import { DatePicker, Select, Table as TableContent, Tag } from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/shared/constant/date';
import { CalendarDays, Flag, LineChart, ListOrdered, Text, Users } from 'lucide-react';

interface DataType {
  key: string;
  name: string;
  notes: string;
  assignee: string;
  status: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'No.',

    dataIndex: 'key',
    key: 'key',
    render: (index) => <p>{index}</p>,
  },
  {
    title: (
      <div className='flex items-center gap-x-1'>
        <Text size={12} />
        Name
      </div>
    ),
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: (
      <div className='flex items-center gap-x-1'>
        <Users size={12} />
        Assignee
      </div>
    ),
    dataIndex: 'assignee',
    key: 'assignee',
  },

  {
    title: (
      <div className='flex items-center gap-x-1'>
        <LineChart size={12} />
        Status
      </div>
    ),
    key: 'status',
    dataIndex: 'status',
    render: () => (
      <>
        <Select
          style={{ width: 120, border: 'none', boxShadow: 'none' }}
          showSearch
          suffixIcon={null}
          removeIcon
          className='custom-select'
          placeholder='TODO'
          defaultValue={'1'}
          title='Status'
          options={[
            {
              value: '1',
              label: <Tag color='gray'>Todo</Tag>,
            },

            {
              value: '2',
              label: <Tag color='blue'>In Progress</Tag>,
            },
            {
              value: '3',
              label: <Tag color='green'>Complete</Tag>,
            },
          ]}
        />
      </>
    ),
  },
  {
    title: (
      <div className='flex items-center gap-x-1'>
        <CalendarDays size={12} />
        Due date
      </div>
    ),
    dataIndex: 'dueDate',
    key: 'dueDate',
    render: () => (
      <DatePicker defaultValue={dayjs('01/01/2024', DATE_FORMAT)} format={DATE_FORMAT} showTime />
    ),
  },
  {
    title: (
      <div className='flex items-center gap-x-1'>
        <Flag size={12} />
        Priority
      </div>
    ),
    dataIndex: 'priority',
    key: 'priority',
    render: () => (
      <Select
        style={{ width: 120 }}
        className='custom-select'
        placeholder='Choose a Priority'
        defaultValue={'1'}
        options={[
          {
            value: '1',
            label: (
              <div className='flex items-center gap-x-4'>
                <Flag size={14} color='red' />
                <span>Urgent</span>
              </div>
            ),
          },
          {
            value: '2',
            label: (
              <div className='flex items-center gap-x-4'>
                <Flag size={14} className='text-yellow-600' />
                <span>High</span>
              </div>
            ),
          },
          {
            value: '3',
            label: (
              <div className='flex items-center gap-x-4'>
                <Flag size={14} color='blue' />
                <span>Normal</span>
              </div>
            ),
          },
          {
            value: '4',
            label: (
              <div className='flex items-center gap-x-4'>
                <Flag size={14} color='gray' />
                <span>Low</span>
              </div>
            ),
          },
        ]}
      />
    ),
  },
  {
    title: (
      <div className='flex items-center gap-x-1'>
        <ListOrdered size={12} />
        Note
      </div>
    ),
    dataIndex: 'notes',
    key: 'notes',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Fig bug frontend',
    assignee: 'Trọng Đức',

    notes: 'notes',
    status: ['nice', 'developer'],
  },
  {
    key: '2',
    assignee: 'Đức Duy',
    notes: 'notes',
    name: 'Fix bug backend',
    status: ['loser'],
  },
  {
    key: '3',
    name: 'Fix modal bug',
    assignee: 'Trọng Đức',
    notes: 'notes',
    status: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Add new feature',
    assignee: 'Trọng Đức',
    notes: 'notes',
    status: ['nice', 'developer'],
  },
  {
    key: '5',
    name: 'Improve performance',
    assignee: 'Đức Duy',
    notes: 'notes',
    status: ['loser'],
  },
  {
    key: '6',
    name: 'Fix bug mobile',
    assignee: 'Trọng Đức',
    notes: 'notes',
    status: ['cool', 'teacher'],
  },
  {
    key: '7',
    name: 'Add new feature',
    assignee: 'Đức Duy',
    notes: 'notes',
    status: ['nice', 'developer'],
  },
  {
    key: '8',
    name: 'Improve performance',
    assignee: 'Trọng Đức',
    notes: 'notes',
    status: ['loser'],
  },
];

const Table: React.FC = () => (
  <div className='px-6'>
    <TableContent
      pagination={{ pageSize: 50, position: ['bottomLeft'] }}
      scroll={{ y: 470 }}
      columns={columns}
      dataSource={data}
    />
  </div>
);

export default Table;
