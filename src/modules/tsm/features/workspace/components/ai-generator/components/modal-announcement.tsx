import { Modal, Typography } from 'antd';
import { FileWarning } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  project?: Project;
  content?: string;
}

const ModalAnnouncement = ({ showModal, content, setShowModal = () => {}, project }: Props) => {
  return (
    <Modal
      title={
        <div className='flex items-center gap-x-2'>
          <FileWarning size={24} className='text-yellow-500' />
          <Typography.Text strong>No File Uploaded</Typography.Text>
        </div>
      }
      open={showModal}
      cancelText='Cancel'
      onCancel={() => setShowModal(false)}
      onOk={() => {
        setShowModal(false);
        window.open(`/tsm/project/${project?.id}?view=setting`, '_blank');
      }}
      okText='Upload File'
    >
      <Typography.Text>{content}</Typography.Text>
    </Modal>
  );
};

export default ModalAnnouncement;
