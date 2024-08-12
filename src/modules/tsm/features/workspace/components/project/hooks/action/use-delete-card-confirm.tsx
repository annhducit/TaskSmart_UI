import { App } from 'antd';
import useDeleteCard from './use-delete-card';
import { HelpCircleIcon } from 'lucide-react';

export default function useRemoveCardConfirm() {
  const { modal } = App.useApp();
  const deleteCard = useDeleteCard();

  const handleDeleteItem = async (itemId: string) => {
    const instance = modal.confirm({
      title: 'Remove Card',
      content: 'Are you sure you want to remove this this card?',
      cancelText: 'Cancel',
      okText: 'Remove',
      okType: 'danger',
      icon: <HelpCircleIcon color='red' className='mr-2 mt-0.5 h-5 w-5' />,
    });

    instance.update({
      okButtonProps: { loading: deleteCard.isPending },
      cancelButtonProps: { disabled: deleteCard.isPending },
    });

    return await instance.then(
      (confirmed) => {
        confirmed && deleteCard.mutate(itemId);

        return confirmed;
      },
      () => {}
    );
  };

  return handleDeleteItem;
}
