import { App } from 'antd';
import { HelpCircleIcon } from 'lucide-react';
import useRemoveUser from '../mutation/use-remove-user';

export default function useRemoveAccountConfirm() {
  const { modal } = App.useApp();
  const deleteAccount = useRemoveUser();

  const handleDeleteItem = async (itemId: string) => {
    const instance = modal.confirm({
      title: 'Remove Account',
      content: 'Are you sure you want to remove this account',
      cancelText: 'Cancel',
      okText: 'Remove',
      okType: 'danger',
      icon: <HelpCircleIcon color='red' className='mr-2 mt-0.5 h-5 w-5' />,
    });

    instance.update({
      okButtonProps: { loading: deleteAccount.isPending },
      cancelButtonProps: { disabled: deleteAccount.isPending },
    });

    return await instance.then(
      (confirmed) => {
        confirmed && deleteAccount.mutate(itemId);

        return confirmed;
      },
      () => {}
    );
  };

  return handleDeleteItem;
}
