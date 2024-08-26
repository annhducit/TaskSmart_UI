import { tsmAxios } from "@/configs/axios";
import { isStatusCodeValid } from "@/shared/components/status";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useInvalidateProject } from "../query/use-get-project";
import { getIdProjectFromUrl } from "@/shared/components/getIdByUrl";
import { useDialogContext } from "@/shared/components/dialog/provider";

const deleteCard = async ( cardId: String) => {
    const data = await tsmAxios.delete(`/cards/${cardId}`);
    return data;
  };
  
  const useDeleteCard = () => {
    const projectId = getIdProjectFromUrl();

    const invalidateProject = useInvalidateProject(projectId);
    const {onClose } = useDialogContext();
    return useMutation({
      mutationFn: (cardId: String) => deleteCard(cardId),
      onSuccess(data) {
        if (isStatusCodeValid(data.status)) {
          invalidateProject();
          toast.success('Card deleted successfully');
            onClose();
        } else {
          toast.error('Failed to delete card');
        }
      },
      onError(data) {
        toast.error(data.message);
      },
    });
  };
  
  export default useDeleteCard;