import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import { Typography } from 'antd';

const TemplateDetail = () => {
  const { onClose } = useDialogContext();
  const handleClose = () => {
    onClose((searchParam) => {
      if (searchParam.has(SEARCH_PARAMS.ID)) {
        searchParam.delete(SEARCH_PARAMS.ID);
      }
    });
  };
  return (
    <>
      <Dialog.CloseButton onClose={handleClose} />
      <div>
        <Typography.Title level={4}>Template Detail</Typography.Title>
      </div>
    </>
  );
};

const TemplateDetailModal = () => {
  return (
    <Dialog.Param
      size='md'
      paramKey={SEARCH_PARAMS.MODAL}
      paramValue={SEARCH_PARAMS_VALUE.TEMPLATE}
    >
      <TemplateDetail />
    </Dialog.Param>
  );
};

export default TemplateDetailModal;
