import { App } from 'antd';
import { HelpCircleIcon } from 'lucide-react';
import useRemoveTemplate from '../mutation/use-remove-template';

export default function useRemoveTemplateConfirm() {
  const { modal } = App.useApp();
  const deleteTemplate = useRemoveTemplate();

  const handleDeleteItem = async (itemId: string) => {
    const instance = modal.confirm({
      title: 'Remove Template',
      content: 'Are you sure you want to remove this template?',
      cancelText: 'Cancel',
      okText: 'Remove',
      okType: 'danger',
      icon: <HelpCircleIcon color='red' className='mr-2 mt-0.5 h-5 w-5' />,
    });

    instance.update({
      okButtonProps: { loading: deleteTemplate.isPending },
      cancelButtonProps: { disabled: deleteTemplate.isPending },
    });

    return await instance.then(
      (confirmed) => {
        confirmed && deleteTemplate.mutate(itemId);

        return confirmed;
      },
      () => {}
    );
  };

  return handleDeleteItem;
}
