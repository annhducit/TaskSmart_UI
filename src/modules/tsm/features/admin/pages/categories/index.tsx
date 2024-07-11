import { Button, Form, Input, Space, Table as TableContent, Tag } from 'antd';
import type { TableProps } from 'antd';

import { BarChart2, Hand, Pen, Plus, Text, Trash } from 'lucide-react';
import useGetCategories from '@/modules/tsm/components/hooks/use-get-categories';
import Dialog from '@/shared/components/dialog';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import { useDialogContext } from '@/shared/components/dialog/provider';
import useCreateCategory from '../../hooks/mutation/use-create-category';
import SearchParamService from '@/shared/services/search-param';
import { useEffect } from 'react';
import useGetCategory from '@/modules/tsm/components/hooks/use-get-category';
import useUpdateCategory from '../../hooks/mutation/use-update-category';
import useSearchParams from '@/shared/hooks/use-search-params';
import useRemoveCategoryConfirm from '../../hooks/action/use-remove-category-confirm';
import SearchParam from '@/shared/components/search-param';
import useSearchCategory from '../../hooks/query/use-search-category';
import useSearchParam from '@/shared/hooks/use-search-param';

const Category = () => {
  const columns: TableProps<Category>['columns'] = [
    {
      title: 'No.',
      width: 80,
      dataIndex: 'id',
      key: 'key',
      render: (_, _record, index) => <p>{index + 1}</p>,
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: (
        <div className='flex items-center gap-x-2'>
          <BarChart2 size={12} />
          Status
        </div>
      ),
      dataIndex: 'active',
      key: 'active',
      render: (status) => (
        <Tag color={status === true ? 'green' : 'red'}>{status ? 'Active' : 'Un Active'}</Tag>
      ),
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
          <Button
            onClick={() => {
              searchParam.set({
                [SEARCH_PARAMS.MODAL]: SEARCH_PARAMS_VALUE.MODIFY_CATEGORY,
                [SEARCH_PARAMS.ID]: record.id,
              });
            }}
            icon={<Pen className='w-3 h-3 text-primary-default' />}
            size='small'
          >
            Edit
          </Button>
          <Button
            onClick={() => removeCategory(record.id as string)}
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

  const { data: categories, isPending: isLoading } = useGetCategories();

  const { data: result, isPending: isLoadingSearch } = useSearchCategory(keyword as string);

  const removeCategory = useRemoveCategoryConfirm();

  const searchParam = useSearchParams();
  return (
    <>
      <div className='flex flex-col px-6 gap-y-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Categories</h1>
          <div className='flex items-end gap-x-4'>
            <div className='flex flex-col gap-y-1'>
              <span className='text-sm opacity-70'>Search</span>
              <SearchParam.Keyword />
            </div>
            <Button
              onClick={() =>
                searchParam.set({
                  [SEARCH_PARAMS.MODAL]: SEARCH_PARAMS_VALUE.MODIFY_CATEGORY,
                })
              }
              type='primary'
              size='middle'
              icon={<Plus className='w-3 h-3' />}
            >
              Add
            </Button>
          </div>
        </div>
        <TableContent
          loading={keyword ? isLoadingSearch : isLoading}
          pagination={{ pageSize: 50, position: ['bottomLeft'] }}
          columns={columns}
          dataSource={keyword ? result : categories}
        />
      </div>
      <ModifyCategoryModal />
    </>
  );
};

export default Category;

const ModifyCategory = () => {
  const { onClose } = useDialogContext();

  const [idParam] = SearchParamService.useId();

  const edit = Boolean(idParam);

  const [form] = Form.useForm<Category>();

  const { data: category } = useGetCategory(idParam as string);
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: addCategory } = useCreateCategory();

  const onFinish = (values: Category) => {
    if (edit) {
      updateCategory({
        ...values,
        id: idParam as string,
      });
    } else {
      addCategory(values);
    }
    handleClose();
  };

  const handleClose = () => {
    onClose((searchParam) => {
      if (searchParam.has(SEARCH_PARAMS.ID)) {
        searchParam.delete(SEARCH_PARAMS.ID);
      }
    });
  };

  useEffect(() => {
    if (edit) {
      form.setFieldsValue({
        name: category?.name,
      });
    }
  }, [form, category, edit]);

  return (
    <div className='flex flex-col gap-y-4'>
      <Dialog.CloseButton onClose={handleClose} />

      <h1 className='text-2xl font-semibold'>{edit ? 'Edit Category' : 'Add Category'}</h1>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className='float-right'>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const ModifyCategoryModal = () => {
  return (
    <Dialog.Param
      paramKey={SEARCH_PARAMS.MODAL}
      paramValue={SEARCH_PARAMS_VALUE.MODIFY_CATEGORY}
      size='xxs'
    >
      <ModifyCategory />
    </Dialog.Param>
  );
};
