import type { FC, ReactNode } from 'react';
import type { PopoverProps } from 'antd';
import { Popover } from 'antd';

type CustomPopoverProps = PopoverProps & {
  content: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  visible?: boolean;
  handleVisibleChange?: (visible: boolean) => void;
};

/**
 *
 * @description Custom Popover component
 * Using Popover from antd with custom trigger and content auto collapse when click inside
 * @author Duc Nguyen
 */
const PopoverX: FC<CustomPopoverProps> = ({ children, visible, handleVisibleChange, ...rest }) => {
  return (
    <Popover trigger='click' open={visible} onOpenChange={handleVisibleChange} {...rest}>
      {children}
    </Popover>
  );
};

export default PopoverX;
