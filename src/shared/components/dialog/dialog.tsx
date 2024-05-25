import { VariantProps, cva } from 'class-variance-authority';
import { Modal, ModalProps } from 'antd';
import { useDialogContext } from './provider';

const dialogVars = cva(undefined, {
  variants: {
    size: {
      xxs: '400px',
      xs: '500px',
      sm: '600px',
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
