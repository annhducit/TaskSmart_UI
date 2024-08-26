import { tsmAxios } from '@/configs/axios';
import { MULTIPART_FORM_DATA } from '@/shared/constant';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateProfile } from './use-profile';
import { useDialogContext } from '@/shared/components/dialog/provider';
async function uploadImage(payload: { image: File }) {
  const formData = new FormData();
  payload.image && formData.append('file', payload.image);

  await tsmAxios.post('/users/profileImage', formData, {
    headers: {
      'Content-Type': MULTIPART_FORM_DATA,
    },
  });
}

export const useUploadProfileImage = () => {
  const invalidateProfile = useInvalidateProfile();

  const { onClose } = useDialogContext();
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      invalidateProfile();
      onClose();
      toast.success('Upload image success');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
