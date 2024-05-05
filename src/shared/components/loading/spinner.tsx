import { cn } from '@/shared/router/cn';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import {  LoaderCircle } from 'lucide-react';
import type { CSSProperties } from 'react';

const spinnerVars = cva('pointer-events-none animate-spin select-none text-[#0089ED]', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  
  },
  defaultVariants: {
    size: 'md',
  },
});

type SpinnerProps = VariantProps<typeof spinnerVars> & {
  className?: string;
  style?: CSSProperties;
};

export default function LoadingSpinner(props: SpinnerProps) {
  const { size, className, style } = props;

  return <LoaderCircle className={cn(spinnerVars({ size }), className)} style={style} />;
}
