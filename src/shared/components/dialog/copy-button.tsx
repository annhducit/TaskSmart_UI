import { cn } from '@/shared/router/cn';
import { Button, Tooltip, Typography } from 'antd';
import { CheckIcon, Link } from 'lucide-react';
import { useState } from 'react';

type Props = {
  className?: string;
};

export default function CopyUrlButton(props: Props) {
  const { className } = props;

  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const Icon = isCopied ? CheckIcon : Link;

  return (
    <Tooltip title={isCopied ? 'Đã Copy' : 'Copy URL'}>
      <Button
        htmlType='button'
        type='text'
        onClick={handleClick}
        disabled={isCopied}
        icon={<Icon className={cn('size-4', { 'text-green-500': isCopied })} />}
        className={cn('z-10 flex items-center justify-center', className)}
      >
        <Typography.Text className='text-primary-default'>
          {isCopied ? 'Copied link to clipboard' : 'Invite member by link'}
        </Typography.Text>
      </Button>
    </Tooltip>
  );
}
