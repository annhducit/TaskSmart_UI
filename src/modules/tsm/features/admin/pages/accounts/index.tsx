import { Button, Space, Table as TableContent, Tag } from 'antd';
import type { TableProps } from 'antd';
import { CalendarDays, Flag, LineChart, Pen, Text, Trash, Users } from 'lucide-react';
import useGetUsers from '../../hooks/query/use-users';
import useRemoveAccountConfirm from '../../hooks/action/use-remove-account-confirm';
import SearchParam from '@/shared/components/search-param';
import useSearchUser from '../../hooks/query/use-search-user';
import useSearchParam from '@/shared/hooks/use-search-param';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';

const Account = () => {
  const columns: TableProps<Partial<UserData>>['columns'] = [
    {
      title: 'No.',
      width: 80,
      dataIndex: 'id',
      key: 'key',
      render: (_, _record, index) => <p>{index + 1}</p>,
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
          Username
        </div>
      ),
      dataIndex: 'username',
      key: 'username',
    },

    {
      title: (
        <div className='flex items-center gap-x-1'>
          <LineChart size={12} />
          Email
        </div>
      ),
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: (
        <div className='flex items-center gap-x-1'>
          <CalendarDays size={12} />
          Gender
        </div>
      ),
      dataIndex: 'role',
      key: 'role',
      render: (roles) => (
        <>
          {roles?.map((role: string) => (
            <Tag key={role} color={colorMap[role]}>
              {role}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: (
        <div className='flex items-center gap-x-1'>
          <Flag size={12} />
          Organization
        </div>
      ),
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_item, record) => (
        <Space>
          <Button icon={<Pen className='w-3 h-3 text-primary-default' />} size='small'>
            Edit
          </Button>
          <Button
            onClick={() => onRemove(record.id as string)}
            icon={<Trash color='red' className='w-3 h-3' />}
            size='small'
            type='text'
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [, , keyword] = useSearchParam(SEARCH_PARAMS.KEYWORD);

  const { data: accounts, isLoading } = useGetUsers();
  const onRemove = useRemoveAccountConfirm();

  const { data: result, isLoading: isLoadingSearch } = useSearchUser(keyword as string);
  return (
    <div className='flex flex-col px-6 gap-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Accounts</h1>
        <div className='flex items-end gap-x-4'>
          <div className='flex flex-col gap-y-1'>
            <span className='text-sm opacity-70'>Search</span>
            <SearchParam.Keyword />
          </div>
        </div>
      </div>
      <TableContent
        pagination={{ pageSize: 50, position: ['bottomLeft'] }}
        columns={columns}
        loading={keyword ? isLoadingSearch : isLoading}
        dataSource={keyword ? result : accounts}
      />
    </div>
  );
};

export default Account;

const colorMap: Record<string, string> = {
  ADMIN: 'yellow',
  USER: 'green',
};
