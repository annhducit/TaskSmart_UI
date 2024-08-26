import React from 'react';
import { DatePicker, Table as TableContent } from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/shared/constant/date';
import LabelItem from '@/modules/tsm/components/label';
import ProjectItem from './project';

interface DataType {
  key: string;
  card: string;
  listCard: string;
  label: React.ReactNode;
  deadline: string[];
  project: React.ReactNode;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'No.',
    width: 100,
    dataIndex: 'key',
    key: 'key',
    render: (index) => <p>{index}</p>,
  },
  {
    title: 'Card',
    dataIndex: 'card',
    key: 'card',
  },
  {
    title: 'List Card',
    dataIndex: 'listCard',
    key: 'listCard',
  },
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    render: (deadline) => <DatePicker value={dayjs(deadline[0])} format={DATE_FORMAT} />,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
  },
];

const data: DataType[] = [
  {
    key: '1',
    card: 'Research and Planning',
    listCard: 'Design and Development',
    label: <LabelItem color='#7f77f1' />,
    deadline: ['2022-01-01'],
    project: <ProjectItem />,
  },
];

const CardTable: React.FC = () => (
  <div className='px-6'>
    <TableContent
      pagination={{ pageSize: 50, position: ['bottomLeft'] }}
      scroll={{ y: 470 }}
      columns={columns}
      dataSource={data}
    />
  </div>
);

export default CardTable;
