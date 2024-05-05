import { UNKNOWN_ERROR } from '@/shared/constant/text';
import { Alert, Button } from 'antd';
import { get } from 'lodash';
import type { FC } from 'react';
import type { FallbackProps } from 'react-error-boundary';

const FallbackErrorBoundary: FC<FallbackProps> = (props) => {
  const { error } = props;
  const message = get(error, 'message', '');

  const handleReset = () => {
    window.location.reload();
  };

  if (message.includes('dynamically imported module')) {
    return (
      <Alert
        showIcon
        type='info'
        message='Thông báo'
        className='m-10'
        description='Đã có bản cập nhật mới!'
        action={
          <Button
            type='link'
            htmlType='button'
            onClick={handleReset}
            className='[&>span]:font-medium'
          >
            Cập nhật
          </Button>
        }
      />
    );
  }

  return (
    <Alert
      showIcon
      type='error'
      message='Cảnh báo'
      className='m-10'
      description={UNKNOWN_ERROR}
      action={
        <Button
          type='link'
          danger
          htmlType='button'
          onClick={handleReset}
          className='[&>span]:font-medium'
        >
          Tải lại
        </Button>
      }
    />
  );
};

export default FallbackErrorBoundary;
