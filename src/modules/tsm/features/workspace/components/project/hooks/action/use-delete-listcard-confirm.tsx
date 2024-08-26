import { App } from 'antd';
import { HelpCircleIcon } from 'lucide-react';
import useDeleteListCard from './use-delete-listcard';

export default function useRemoveListCardConfirm() {
  const { modal } = App.useApp();
  const deleteListCard = useDeleteListCard();

  const handleDeleteItem = async (itemId: string) => {
    const instance = modal.confirm({
      title: 'Remove List Card',
      content: 'Are you sure you want to remove this this list scard?',
      cancelText: 'Cancel',
      okText: 'Remove',
      okType: 'danger',
      icon: <HelpCircleIcon color='red' className='mr-2 mt-0.5 h-5 w-5' />,
    });

    instance.update({
      okButtonProps: { loading: deleteListCard.isPending },
      cancelButtonProps: { disabled: deleteListCard.isPending },
    });

    return await instance.then(
      (confirmed) => {
        confirmed && deleteListCard.mutate(itemId);

        return confirmed;
      },
      () => {}
    );
  };

  return handleDeleteItem;
}
