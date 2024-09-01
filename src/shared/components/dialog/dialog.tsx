import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import { useDialogContext } from './provider';

const dialogVars = cva(undefined, {
  variants: {
    size: {
      xxs: '400px',
      xs: '500px',
      sm: '600px',
      normal: '800px',
      md: '1000px',
      lg: '1400px',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type DialogProps = ModalProps & VariantProps<typeof dialogVars>;

export default function Dialog(props: DialogProps) {
  const { size, ...rest } = props;
  const { open } = useDialogContext();

  return (
    <Modal
      open={open}
      centered
      width={dialogVars({ size })}
      closeIcon={false}
      footer={<></>}
      destroyOnClose
      {...rest}
    />
  );
}
