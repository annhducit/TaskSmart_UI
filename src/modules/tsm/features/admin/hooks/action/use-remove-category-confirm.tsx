import { App } from 'antd';
import { HelpCircleIcon } from 'lucide-react';
import useRemoveCategory from '../mutation/use-remove-category';

export default function useRemoveCategoryConfirm() {
  const { modal } = App.useApp();
  const deleteCategory = useRemoveCategory();

  const handleDeleteItem = async (itemId: string) => {
    const instance = modal.confirm({
      title: 'Remove Category',
      content: 'Are you sure you want to remove this category?',
      cancelText: 'Cancel',
      okText: 'Remove',
      okType: 'danger',
      icon: <HelpCircleIcon color='red' className='mr-2 mt-0.5 h-5 w-5' />,
    });

    instance.update({
      okButtonProps: { loading: deleteCategory.isPending },
      cancelButtonProps: { disabled: deleteCategory.isPending },
    });

    return await instance.then(
      (confirmed) => {
        confirmed && deleteCategory.mutate(itemId);

        return confirmed;
      },
      () => {}
    );
  };

  return handleDeleteItem;
}
