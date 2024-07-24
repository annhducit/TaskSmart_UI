import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-sql';
import './index.css';
import { useState } from 'react';
import { Button, Select, Space, Typography } from 'antd';

/**
 * Import the theme css
 */
import 'prismjs/themes/prism.css'; // Default theme
import 'prismjs/themes/prism-tomorrow.css'; // Tomorrow theme
import 'prismjs/themes/prism-okaidia.css'; // Okaidia theme
import 'prismjs/themes/prism-solarizedlight.css'; // Solarized Light theme
import 'prismjs/themes/prism-coy.css'; // Coy theme
import 'prismjs/themes/prism-twilight.css'; // Twilight theme
import 'prismjs/themes/prism-dark.css'; // Dark theme
import 'prismjs/themes/prism-funky.css'; // Funky theme
import { CheckIcon, FileCode2, Trash } from 'lucide-react';
import Tooltip from '@/shared/components/tooltip';
import { cn } from '@/shared/router/cn';
import { useSelector } from '@/store';

const SqlEditor = ({ statement }: { statement: Statement}) => {
  const [theme, setTheme] = useState<string>('prism');

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  const editorStyle = {
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: 14,
    backgroundColor:
      theme === 'prism-tomorrow'
        ? '#2d2d2d'
        : theme === 'prism-okaidia'
          ? '#272822'
          : theme === 'prism-solarizedlight'
            ? '#fdf6e3'
            : theme === 'prism-coy'
              ? '#f5f2f0'
              : theme === 'prism-twilight'
                ? '#141414'
                : theme === 'prism-dark'
                  ? '#1e1e1e'
                  : '#f5f2f0',
    color:
      theme === 'prism-tomorrow'
        ? '#f8f8f2'
        : theme === 'prism-okaidia'
          ? '#f8f8f2'
          : theme === 'prism-solarizedlight'
            ? '#657b83'
            : theme === 'prism-coy'
              ? '#000'
              : theme === 'prism-twilight'
                ? '#f8f8f2'
                : theme === 'prism-dark'
                  ? '#f8f8f2'
                  : '#000',
  }

  return (
    <div className='flex flex-col mb-4 gap-y-2'>
      <div className='flex items-center justify-between'>
        <Typography.Text className='block'>{statement.title}</Typography.Text>{' '}
        <div className='flex items-center justify-end gap-x-2'>
          <Typography.Text className='block'>Theme</Typography.Text>
          <Select onChange={handleThemeChange} className='w-[200px]' defaultValue='prism'>
            <Select.Option value='prism'>Default</Select.Option>
            <Select.Option value='prism-tomorrow'>Tomorrow</Select.Option>
            <Select.Option value='prism-okaidia'>Okaidia</Select.Option>
            <Select.Option value='prism-solarizedlight'>Solarized Light</Select.Option>
            <Select.Option value='prism-coy'>Coy</Select.Option>
            <Select.Option value='prism-twilight'>Twilight</Select.Option>
            <Select.Option value='prism-dark'>Dark</Select.Option>
          </Select>
        </div>
      </div>
      <div className={`${theme}`}>
        <Editor
          value={statement.statement}
          onValueChange={()=>{console.log('onValueChange')}}
          className='p-4 rounded-lg card-ai'
          highlight={(code) => highlight(code, languages.sql, 'sql')}
          padding={10}
          style={editorStyle}
        />
      </div>
      <Space className='flex justify-end'>
        <CopyUrlButton link={statement.statement} />
        <Button
          type='default'
          danger
          icon={<Trash size={12} />}
          onClick={() => {
            // onChange('');
          }}
        >
          Clear
        </Button>
      </Space>
    </div>
  );
};

export default SqlEditor;

type Props = {
  className?: string;
  link: string;
};

function CopyUrlButton(props: Props) {
  const { className, link } = props;

  const [isCopied, setIsCopied] = useState(false);

  const { btnColor } = useSelector((state) => state.theme);

  const handleClick = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const Icon = isCopied ? CheckIcon : FileCode2;

  return (
    <Tooltip title={isCopied ? 'Copied' : 'Copy'}>
      <Button
        htmlType='button'
        type='text'
        onClick={handleClick}
        disabled={isCopied}
        icon={<Icon className={cn('size-4', { 'text-green-500': isCopied })} />}
        className={cn('z-10 flex items-center justify-center', className)}
      >
        <Typography.Text
          className='font-semibold'
          style={isCopied ? { color: '#52c41a' } : { color: btnColor }}
        >
          {isCopied ? 'Copied SQL to clipboard' : 'Copy SQL to clipboard'}
        </Typography.Text>
      </Button>
    </Tooltip>
  );
}
