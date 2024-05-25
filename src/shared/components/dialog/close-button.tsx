import Tooltip from '../tooltip';
import { Button } from 'antd';
import { XIcon } from 'lucide-react';

type Props = {
  onClose?: () => void;
};
const CloseButton = (props: Props) => {
  const { onClose } = props;
  return (
    <div>
      <Tooltip title='Đóng'>
        <Button
          htmlType='button'
          type='text'
          onClick={onClose}
          icon={<XIcon className='h-5 w-5' />}
          className='absolute right-5 top-5 z-10 flex items-center justify-center'
        />
      </Tooltip>
    </div>
  );
};

export default CloseButton;
