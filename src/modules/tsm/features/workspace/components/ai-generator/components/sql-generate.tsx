import { Button, Divider, Form, Input, Select, Typography } from 'antd';
import SQLEditor from './code-editor';
import { useRef, useState } from 'react';
import { useSelector } from '@/store';
import { Save, UploadCloud } from 'lucide-react';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { tsmAxios } from '@/configs/axios';
import blink from '@/assets/images/blink-ai.png';
import { Radio } from 'antd';
import { useEffect } from 'react';
import Dragger from 'antd/es/upload/Dragger';
import { UploadProps } from 'antd/lib';
import { scrollToResult } from '@/utils/scroll-to-result';
import { useDatabaseRag } from '../hook/mutation/use-database-rag';
import { useDatabaseRagURI } from '../hook/mutation/use-database-rag-uri';
import useSaveDbStructure from '../hook/mutation/use-save-db-structure';
import useConnectDb from '../hook/mutation/use-connect-db';
import useUploadSqlFile from '../hook/mutation/use-upload-sql-file';
import { toast } from 'sonner';

const SQLLanguage = ['MySQL', 'SQLite', 'PostgreSQL', 'Oracle', 'SQLServer'];

const DatabaseConnection: { [key: string]: TSM_SQLConnectType } = {
  MySQL: {
    label: 'My SQL',
    value: 'MySQL',
    before: 'mysql+mysqlconnector://',
    placeholder: '<username>:<password>@<host>/<database>',
  },
  SQLite: {
    label: 'SQLite',
    value: 'SQLite',
    before: 'sqlite://',
    placeholder: '<path>',
  },
};

const SQLGenerate = () => {
  const [form] = Form.useForm();

  const [dbStructure, setDbStructure] = useState<Statement>({ statement: '', title: '' });
  const [SQLSelectGenerate, setSQLSelectGenerate] = useState<string>('MySQL');
  const [isGenerateStructure, setIsGenerateStructure] = useState(false);
  const [connectionString, setConnectionString] = useState<string>('');
  const [disabledSaveButton, setDisabledSaveButton] = useState(true);
  const [statements, setStatements] = useState<Statement[]>([]);
  const [SQLType, setSQLType] = useState<string>('MySQL');
  const containerRef = useRef<HTMLDivElement>(null);
  const resultDOM = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<number>(2);

  const projectId = getIdProjectFromUrl();
  const { btnColor } = useSelector((state) => state.theme);
  /**
   *
   * Tanstack/react-query
   */
  const { mutate: databaseRag, isPending: isLoadingDBR } = useDatabaseRag();
  const { mutate: databaseRagURI, isPending: isLoadingDBR_URI } = useDatabaseRagURI();
  const { mutate: saveDBStructure, isPending: isLoadingSaveDB } = useSaveDbStructure();
  const { mutate: connectDb, isPending: isLoadingConnectDb } = useConnectDb();
  const { mutate: uploadSqlFile } = useUploadSqlFile();

  const onFinish = async (value: any) => {
    try {
      if (view !== 3) {
        value.database = value.database ?? 'MySQL';
        databaseRag(
          { projectId, context: dbStructure.statement, question: value.question },
          {
            onSuccess: (data) => {
              scrollToResult({ resultDOM });
              setStatements(data.statements);
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      } else {
        databaseRagURI(
          {
            projectId,
            uri: `${DatabaseConnection[SQLType].before}${connectionString}`,
            question: value.question,
          },
          {
            onSuccess: (data) => {
              scrollToResult({ resultDOM });
              setStatements([data]);
            },

            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      }
    } finally {
    }
  };

  const saveDbStructure = async () => {
    saveDBStructure({ projectId, statement: dbStructure.statement });
  };

  const connectSQL_DB = async () => {
    connectDb(
      { projectId, uri: `${DatabaseConnection[SQLType].before}${connectionString}` },
      {
        onSuccess: (data) => {
          setDbStructure({ ...dbStructure, statement: data.schema });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const getSQLStructureGenerate = async () => {
    setIsGenerateStructure(true);
    try {
      const { data } = await tsmAxios.get<{ statement: string; database: string }>(
        `/projects/${projectId}/generate-structure?database=${SQLSelectGenerate}`
      );
      console.log(data);
      setDbStructure({ ...dbStructure, statement: data.statement });
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        toast.error((error as any).response.data.message);
      }
    } finally {
      setIsGenerateStructure(false);
    }
  };

  useEffect(() => {
    if (!dbStructure.statement) {
      setDisabledSaveButton(true);
    } else if ('#Enter your SQL Structure here'.includes(dbStructure.statement.trim())) {
      setDisabledSaveButton(true);
    } else {
      setDisabledSaveButton(false);
    }
  }, [dbStructure]);

  useEffect(() => {
    const getDbStructureAsync = async () => {
      try {
        const { data } = await tsmAxios.get<{ statement: string }>(
          `/projects/${projectId}/get-db-structure`
        );
        setDbStructure({ ...dbStructure, statement: data.statement });
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
          toast.error((error as any).response.data.message);
        }
      }
    };
    getDbStructureAsync();
  }, []);

  useEffect(() => {
    if (view === 3) {
      setDbStructure({ ...dbStructure, statement: '' });
    }
  }, [view]);

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.sql',
    beforeUpload: async (e) => {
      uploadSqlFile(e, {
        onSuccess: (data) => {
          setDbStructure({ ...dbStructure, statement: data.result });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
      return false;
    },
    listType: 'text',
  };

  return (
    <section
      ref={containerRef}
      className='flex h-[calc(100vh-170px)] w-full flex-col overflow-y-scroll rounded bg-[#f8f9fc] px-6 py-3'
    >
      <div>
        <div className='text-xl text-black'>Database Structure:</div>
        <div className='grid grid-cols-2 gap-x-2'>
          <div className='flex flex-col col-span-1 mx-2 gap-y-2'>
            <SQLEditor
              className='max-h-[300px] min-h-[120px] overflow-y-scroll'
              statement={dbStructure}
              setStatement={setDbStructure}
            />
            <div className='flex justify-end w-full my-2'>
              <Button
                type='text'
                style={{
                  backgroundColor: btnColor,
                  color: '#fff',
                }}
                className='flex items-center'
                disabled={view === 3 || disabledSaveButton}
                loading={isLoadingSaveDB}
                icon={<Save size={16} />}
                onClick={saveDbStructure}
              >
                Save
              </Button>
            </div>
          </div>

          <div className='flex flex-col col-span-1 gap-2 pl-3 text-black border border-r-0 border-solid border-y-0 border-l-slate-200'>
            <Typography.Text>
              Or you can get the database based on the following ways:
            </Typography.Text>
            <div>
              <Radio.Group
                className='flex w-full'
                defaultValue={2}
                onChange={(e) => {
                  setView(e.target.value);
                }}
              >
                <Radio.Button className='w-full text-center' value={1}>
                  Upload file (.sql)
                </Radio.Button>
                <Radio.Button className='w-full text-center' value={2}>
                  Generate by SRS
                </Radio.Button>
                <Radio.Button className='w-full text-center' value={3}>
                  Connect to database
                </Radio.Button>
              </Radio.Group>
            </div>
            <div className='mt-4 max-h-[250px]'>
              {view === 1 && (
                <Dragger
                  {...props}
                  style={{
                    backgroundColor: '#eff4f8',
                  }}
                >
                  <div className='flex items-center justify-center gap-5'>
                    <div className='ant-upload-drag-icon'>
                      <div
                        style={{
                          borderColor: btnColor,
                        }}
                        className='flex items-center justify-center w-16 h-16 mx-auto bg-transparent border-2 border-dashed rounded-lg'
                      >
                        <UploadCloud
                          size={24}
                          className=''
                          style={{
                            color: btnColor,
                          }}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col py-3 text-left gap-y-4'>
                      <Typography.Text
                        className='block font-semibold '
                        style={{
                          color: btnColor,
                        }}
                      >
                        Select files on your computer
                      </Typography.Text>
                      <Typography.Text className='block text-slate-400'>
                        Or transfer files by dragging and dropping them into the area
                      </Typography.Text>
                    </div>
                  </div>
                </Dragger>
              )}
              {view === 2 && (
                <div className='flex items-center justify-center w-full h-full my-4 gap-x-4'>
                  <Select
                    value={SQLSelectGenerate}
                    onChange={(e) => {
                      setSQLSelectGenerate(e);
                    }}
                    size='large'
                    allowClear
                    className='min-w-[200px]'
                  >
                    {SQLLanguage.map((item) => {
                      return (
                        <Select.Option value={item} key={`select_sql_generate`}>
                          {item}
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <Button
                    loading={isGenerateStructure}
                    size='large'
                    icon={<IconQuery />}
                    style={{
                      backgroundColor: btnColor,
                      color: '#fff',
                    }}
                    className='flex items-center text-center rounded-xl'
                    onClick={getSQLStructureGenerate}
                  >
                    Generate DB Structure
                  </Button>
                </div>
              )}
              {view === 3 && (
                <div className='flex flex-col w-full gap-4'>
                  <div>
                    <span>SQL Type: </span>
                    <Select
                      value={DatabaseConnection[SQLType].value}
                      onChange={(e) => {
                        setSQLType(e);
                      }}
                      className='ml-2 w-[150px]'
                    >
                      {Object.values(DatabaseConnection).map((item) => {
                        return (
                          <Select.Option value={item.value} key={item.value}>
                            {item.label}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </div>

                  <Input.Search
                    className='w-full my-4 text-xs'
                    addonBefore={DatabaseConnection[SQLType].before}
                    placeholder={DatabaseConnection[SQLType].placeholder}
                    allowClear
                    value={connectionString}
                    onChange={(e) => setConnectionString(e.target.value)}
                    onSearch={connectSQL_DB}
                    enterButton='Connect'
                    loading={isLoadingConnectDb}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Divider className='m-0 my-4' />
      <div className='flex flex-col p-6 bg-white rounded-lg card-ai gap-y-10'>
        <Form name='sql-query' form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            name='question'
            label='Write here what you want from your document:'
            rules={[
              {
                required: true,
                message: 'Please input your question!',
              },
            ]}
          >
            <Input
              prefix={<img src={blink} className='absolute w-5 h-5 left-4 top-3' alt='' />}
              size='large'
              allowClear
              placeholder='Find all customers who have ordered more than 10 products in the last 6 months'
              className='py-3 pl-12 rounded-xl'
            />
          </Form.Item>

          <div className='float-right flex h-[auto] items-center justify-center'>
            <Form.Item className='flex flex-shrink w-full'>
              <Button
                icon={<IconQuery />}
                style={{
                  backgroundColor: btnColor,
                  color: '#fff',
                  width: '100%',
                }}
                size='large'
                htmlType='submit'
                loading={isLoadingDBR || isLoadingDBR_URI}
                className='flex items-center rounded-xl'
                disabled={isLoadingDBR || isLoadingDBR_URI}
              >
                Generate SQL
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <Divider />
      <div className='w-full text-black'>
        {statements.map((statement, index) => (
          <div key={index}>
            <Typography.Text className='text-lg'>Result:</Typography.Text>
            <SQLEditor
              key={index}
              statement={statement}
              uri={
                connectionString ? `${DatabaseConnection[SQLType].before}${connectionString}` : ''
              }
            />
          </div>
        ))}
      </div>
      <div ref={resultDOM} className='h-60' />
    </section>
  );
};

export default SQLGenerate;

const IconQuery = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      aria-hidden='true'
      data-slot='icon'
      className='w-6 h-6 mr-2 -ml-1 text-gray-100'
    >
      <path
        fillRule='evenodd'
        d='M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};
