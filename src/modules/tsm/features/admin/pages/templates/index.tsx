import { Button, Popover, Select, Space, Table as TableContent, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
import { Eye, FileDigit, Hand, Image, PawPrint, Pen, Plus, Text, Trash } from 'lucide-react';
import useGetTemplates from '../../../templates/hooks/use-get-templates';
import useRemoveTemplateConfirm from '../../hooks/action/use-remove-template.-confirm';
import SearchParam from '@/shared/components/search-param';
import useGetCategories from '@/modules/tsm/components/hooks/use-get-categories';
import { useEffect, useState } from 'react';
import useSearchParam from '@/shared/hooks/use-search-param';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useSearchTemplate from '../../hooks/query/use-search-template';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@/shared/components/tooltip';
const Template = () => {
  const columns: TableProps<TSMTemplate>['columns'] = [
    {
      title: 'No.',
      width: 60,
      dataIndex: 'id',
      key: 'key',
      render: (_, _record, index) => <p>{index + 1}</p>,
    },
    {
      title: (
        <div className='flex items-center gap-x-2'>
          <Image size={12} />
          Background Image
        </div>
      ),
      key: 'imageUrl',
      width: 180,
      render: (_imageUrl, record) => (
        <div className='flex items-center justify-center'>
          <img className='h-10 w-10 rounded' src={record.image?.urls?.small} />
        </div>
      ),
    },
    {
      title: (
        <div className='flex items-center gap-x-2'>
          <Text size={12} />
          Name
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Tooltip color='black' title='Click to view detail'>
          <Typography.Text onClick={() => navigate(`../template-detail/${record.id}`)}>
            {text}
          </Typography.Text>
        </Tooltip>
      ),
    },
    {
      title: (
        <div className='flex items-center gap-x-2'>
          <Text size={12} />
          Description
        </div>
      ),
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Popover overlayClassName='w-96' content={text}>
          <p className='w-32 truncate'>{text}</p>
        </Popover>
      ),
    },

    {
      title: (
        <div className='flex items-center gap-x-2'>
          <Eye size={12} />
          View Count
        </div>
      ),
      key: 'viewCount',
      dataIndex: 'viewCount',
      render: (viewCount) => <Tag color='green'>{viewCount}</Tag>,
    },
    {
      title: (
        <div className='flex items-center gap-x-2'>
          <FileDigit size={12} />
          Use Count
        </div>
      ),
      dataIndex: 'useCount',
      key: 'useCount',
      render(useCount) {
        return <Tag color='blue'>{useCount}</Tag>;
      },
    },

    {
      title: (
        <div className='flex items-center gap-x-2'>
          <PawPrint size={12} />
          Category
        </div>
      ),
      key: 'category',
      render: (_category, record) => <p>{record?.category?.name}</p>,
    },
    {
      title: (
        <div className='flex items-center gap-x-2'>
          <Hand size={12} />
          Action
        </div>
      ),
      width: 200,
      key: 'action',
      render: (_item, record) => (
        <Space>
          <Button icon={<Pen className='h-3 w-3 text-primary-default' />} size='small'>
            Edit
          </Button>
          <Button
            onClick={() => onRemove(record.id as string)}
            icon={<Trash color='red' className='h-3 w-3' />}
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

  const navigate = useNavigate();

  const [type, setType] = useState<string>('');

  const {
    data: templates,
    refetch,
    isPending: isLoading,
  } = useGetTemplates({
    categoryId: type,
  });
  const { data: result, isPending: isLoadingSearch } = useSearchTemplate(keyword as string);

  useEffect(() => {
    refetch();
  }, [type]);

  const { data: categories } = useGetCategories();
  const onRemove = useRemoveTemplateConfirm();

  return (
    <div className='flex flex-col gap-y-4 px-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Templates</h1>
        <div className='flex items-end gap-x-4'>
          <div className='flex flex-col gap-y-1'>
            <span className='text-sm opacity-70'>Search</span>
            <SearchParam.Keyword />
          </div>
          <div className='flex flex-col gap-y-1'>
            <span className='text-sm opacity-70'>Filter</span>
            <Select
              className='w-[150px]'
              defaultValue={'All'}
              onChange={(value) => setType(value as string)}
              options={[
                { label: 'All', value: '' },
                ...(categories?.map((category) => ({
                  label: category.name,
                  value: category.id,
                })) || []),
              ]}
            />
          </div>
          <Button
            onClick={() => navigate('../create/template')}
            type='primary'
            size='middle'
            icon={<Plus className='h-3 w-3' />}
          >
            Add
          </Button>
        </div>
      </div>
      <TableContent
        pagination={{ pageSize: 50, position: ['bottomLeft'] }}
        columns={columns}
        loading={keyword ? isLoadingSearch : isLoading}
        dataSource={keyword ? result : templates}
      />
    </div>
  );
};

export default Template;
