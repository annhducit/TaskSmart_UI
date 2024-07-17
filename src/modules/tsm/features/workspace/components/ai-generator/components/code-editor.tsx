import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-sql';
import './index.css';
import { useState } from 'react';
import { Select, Typography } from 'antd';

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

const SqlEditor = ({ code, onChange }: { code: string; onChange: (code: string) => void }) => {
  const [theme, setTheme] = useState<string>('prism');

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  return (
    <div className='mb-60 flex flex-col gap-y-1'>
      <div className='flex items-center justify-between'>
        <Typography.Text className='block'>Your AI-generated SQL query:</Typography.Text>{' '}
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
          value={code}
          onValueChange={onChange}
          className='card-ai rounded-lg p-4'
          highlight={(code) => highlight(code, languages.sql, 'sql')}
          padding={10}
          style={{
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
          }}
        />
      </div>
    </div>
  );
};

export default SqlEditor;
