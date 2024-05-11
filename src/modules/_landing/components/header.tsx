import Dropdown from '@/shared/components/dropdown';
import Logo from '@/shared/components/logo';
import { Button, Typography } from 'antd';
import { MenuProps } from 'antd/lib';
import { Globe } from 'lucide-react';

import vnFlag from '@/assets/images/vietnam.png';
import engFlag from '@/assets/images/english.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const naviagte = useNavigate();
  return (
    <header className='fixed inset-0 z-[999] flex h-16 items-center justify-between border-b bg-white pl-8 pr-10'>
      <div className='flex items-center gap-x-6'>
        <Logo type='LOGO' />
        <Dropdown items={data} children={<div>Products</div>} />
        <Dropdown items={data} children={<div>Solutions</div>} />
        <Dropdown items={data} children={<div>Resources</div>} />
        <Dropdown items={data} children={<div>Enterprise</div>} />
        <Dropdown items={data} children={<div>Pricing</div>} />
      </div>
      <div className='flex items-center gap-x-4'>
        <Dropdown
          items={languages}
          icon={<Globe className='mt-[6px] h-4 w-4' />}
          children={<div>English</div>}
          trigger='hover'
        />
        <Button type='default' onClick={() => naviagte('../auth/sign-in')}>
          Sign In
        </Button>
        <Button type='primary' onClick={() => naviagte('../auth/sign-up')}>
          Sign Up Free
        </Button>
      </div>
    </header>
  );
};

export default Header;

const data: MenuProps['items'] = [
  {
    label: '1rd menu item',
    key: '0',
  },
  {
    label: '2rd menu item',
    key: '1',
  },

  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '2',
  },
];
const languages: MenuProps['items'] = [
  {
    label: <Typography.Text>English</Typography.Text>,
    key: '0',
    icon: <img src={engFlag} alt='eng-flag' className='h-3 w-4' />,
  },
  {
    type: 'divider',
  },
  {
    label: <Typography.Text>Vietnamese</Typography.Text>,
    icon: <img src={vnFlag} alt='vn-flag' className='h-3 w-4' />,
    key: '1',
  },
];
