import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-sql';
import './index.css';
import { useEffect, useState } from 'react';
import { Button, message, Select, Space, Typography } from 'antd';

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
import { CheckIcon, FileCode2, Play, Trash } from 'lucide-react';
import Tooltip from '@/shared/components/tooltip';
import { cn } from '@/shared/router/cn';
import { tsmAxios } from '@/configs/axios';
import { d } from 'node_modules/@tanstack/react-query-devtools/build/modern/devtools-9h89nHJX';

const SqlEditor = ({
  statement,
  className,
  setStatement,
  disabled,
  uri
}: {
  statement: Statement;
  className?: string;
  setStatement?: (statement: Statement) => void;
  disabled?: boolean;
  uri?: string;
}) => {
  const [theme, setTheme] = useState<string>('prism');
  const [code, setCode] = useState<string>(statement.statement);
  const [result, setResult] = useState<string>('');

  const setCodeChange = (value: string) => {
    setCode(value);
    if (setStatement) {
      setStatement({ ...statement, statement: value });
    }
  };
  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  useEffect(() => {
    setCode(statement.statement);
  }, [statement]);

  useEffect(() => {setResult(statement.result || '')}, [statement]);

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
  };

  const runStatement = async () => {
    try {
      if (!uri) return;
      const { data } = await tsmAxios.post<{result: string}>(
        `/pyhelper/run-statement`,
        {statement: code, uri},
      );
      message.info(data.result);
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div className={`flex flex-col gap-y-2`}>
      <div className='flex items-center justify-between'>
        <Typography.Text className='block'>{statement.title}</Typography.Text>{' '}
        <div className='flex items-center justify-end gap-x-2'>
          <Typography.Text className='block'>Theme</Typography.Text>
          <Select onChange={handleThemeChange} size='small' className='w-[200px]' defaultValue='prism'>
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
      <div className={`${theme} ${className} relative`}>
        <Editor
          value={code}
          onValueChange={setCodeChange}
          className={`card-ai rounded-lg p-4 h-full`}
          highlight={(code) => highlight(code, languages.sql, 'sql')}
          padding={10}
          style={editorStyle}
          disabled={disabled}
        />
        <div className='absolute right-2 top-2'>
          { uri && <RunStatementButton onClick={runStatement} /> }
          <CopyUrlButton link={code} />
        </div>
      </div>
      {result && (
        <div><span>Result: {result}</span></div>
      )}
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
        type='default'
        onClick={handleClick}
        disabled={isCopied}
        icon={<Icon className={cn('size-4 text-black', { 'text-green-500': isCopied })} />}
        className={cn('z-10 flex items-center justify-center bg-white ', className)}
      />
    </Tooltip>
  );
}

function RunStatementButton({ className, onClick }: { className?: string, onClick?: () => void }) {

  return (
    <Tooltip title={'Run statement'} className='mr-2'>
      <Button
        htmlType='button'
        type='default'
        onClick={onClick}
        icon={<Play className={cn('size-4 text-black')} />}
        className={cn('z-10 flex items-center justify-center bg-white ', className)}
      />
    </Tooltip>
  );
}
