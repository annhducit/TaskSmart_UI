import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';

const ModifyCard = () => {
  return (
    <Dialog.Param size='md' paramKey={SEARCH_PARAMS.DIALOG} paramValue={SEARCH_PARAMS_VALUE.CARD}>
      <ModifyCardModal />
    </Dialog.Param>
  );
};

export default ModifyCard;

const ModifyCardModal = () => {
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
    </>
  );
};
