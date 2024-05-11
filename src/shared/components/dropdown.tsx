import { Dropdown as DropdownAnt, MenuProps, Space } from 'antd';
import React, { FC, MouseEventHandler } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  icon?: React.ReactNode;
  items?: MenuProps['items'];
  trigger?: 'click' | 'hover';
}

const Dropdown: FC<DropdownProps> = ({ items, children, onClick, icon, trigger = 'click' }) => {
  return (
    <DropdownAnt menu={{ items }} trigger={[trigger]}>
      <a onClick={onClick}>
        <Space className='text-md flex items-center text-[#5F5A6E] transition-all hover:text-primary-default'>
          {children}
          {icon || <ChevronDown className='mt-[6px] h-4 w-4' />}
        </Space>
      </a>
    </DropdownAnt>
  );
};

export default Dropdown;
