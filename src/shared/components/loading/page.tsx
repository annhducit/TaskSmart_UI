import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/router/cn';
import { Spin } from 'antd';

const loadingPageVars = cva(
  'flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 overflow-y-auto',
  {
    variants: {
      size: {
        full: 'h-screen',
        '4/5': 'h-[80vh] ml-60',
        '1/2': 'h-[50vh]',
      },
    },
    defaultVariants: {
      size: 'full',
    },
  }
);
type Props = VariantProps<typeof loadingPageVars>;

export default function LoadingPage(props: Props) {
  const { size } = props;

  return (
    <div className={cn(loadingPageVars({ size }))}>
      <Spin size='default' />
    </div>
  );
}
