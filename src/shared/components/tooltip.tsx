import React from 'react';
import { Tooltip as AntTooltip } from 'antd';

export default function Tooltip(props: {
  title: React.ReactNode;
  children: React.ReactNode;
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
}) {
  const { title, children, placement = 'top' } = props;

  return (
    <AntTooltip title={title} placement={placement} color='#2db7f5'>
      {children}
    </AntTooltip>
  );
}
