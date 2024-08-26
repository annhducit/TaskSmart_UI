import React from 'react';
import { Tooltip as AntTooltip, TooltipProps } from 'antd';

export default function Tooltip(
  props: {
    children: React.ReactNode;
    color?: string;
    placement?:
      | 'top'
      | 'left'
      | 'right'
      | 'bottom'
      | 'topLeft'
      | 'topRight'
      | 'bottomLeft'
      | 'bottomRight'
      | 'leftTop'
      | 'leftBottom'
      | 'rightTop'
      | 'rightBottom';
  } & TooltipProps
) {
  const { children, placement = 'top', color = '#2db7f5' } = props;

  return (
    <AntTooltip placement={placement} color={color} {...props}>
      {children}
    </AntTooltip>
  );
}
