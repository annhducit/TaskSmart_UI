import { Button, Divider, Form, Input, message, Select, Typography } from 'antd';
import SQLEditor from './code-editor';
import { useRef, useState } from 'react';
import { useSelector } from '@/store';
import { Loader, Send, UploadCloud } from 'lucide-react';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { tsmAxios } from '@/configs/axios';
import blink from '@/assets/images/blink-ai.png';
import useGetProject from '../../project/hooks/query/use-get-project';
import { Radio } from 'antd';
import { useEffect } from 'react';
import ModalAnnouncement from './modal-announment';
import Dragger from 'antd/es/upload/Dragger';
import { UploadProps } from 'antd/lib';
type SQLConnectType = {
  label: string;
  value: string;
  before: string;
  placeholder: string;
};

const SQLLanguage = ['MySQL', 'SQLite', 'PostgreSQL', 'Oracle', 'SQLServer'];

const DatabaseConnection: { [key: string]: SQLConnectType } = {
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

  const { btnColor } = useSelector((state) => state.theme);

  const [SQLType, setSQLType] = useState<string>('MySQL');

  const [view, setView] = useState<number>();

  const [statements, setStatements] = useState<Statement[]>([]);

  const [dbStructure, setDbStructure] = useState<Statement>({statement: '', title: ''});

  const [connectionString, setConnectionString] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerateStruture, setIsGenerateStruture] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const resultDOM = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToResult = () => {
    resultDOM.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  const [disabledSaveButton, setDisabledSaveButton] = useState(true);

  const [SQLSelectGenerate, setSQLSelectGenerate] = useState<string>('MySQL');
  
  const projectId = getIdProjectFromUrl();

  const onFinish = async (value: any) => {
    try {
      setIsSubmitting(true);
      if(view !== 3){
        value.database = value.database ?? 'MySQL';
        const { data } = await tsmAxios.post<DatabaseRAGResponse>(
          `/projects/${projectId}/database-rag`,
          { context: dbStructure.statement, question: value.question, database: value.database }
        );
        scrollToResult()
        setStatements(data.statements);
      }else{
        const { data } = await tsmAxios.post<Statement>(
          `/projects/${projectId}/database-rag-by-uri`,
          { question: value.question, uri: `${DatabaseConnection[SQLType].before}${connectionString}` }
        );
        scrollToResult()
        setStatements([data]);
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSQLStructureGenerate = async () => {
    setIsGenerateStruture(true);
    try {
      const { data } = await tsmAxios.get<{statement: string, database: string}>(
        `/projects/${projectId}/generate-structure?database=${SQLSelectGenerate}`
      );
      setDbStructure({ ...dbStructure, statement: data.statement });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerateStruture(false);
    }
  }

  const saveDbStructure = async () => {
    setIsSaving(true);
    try {
      await tsmAxios.post(`/projects/${projectId}/save-db-structure`, {statement: dbStructure.statement});
      message.success('Save successfully');
    } catch (error) {
      console.log(error);
    } finally{
      setIsSaving(false);
    }
  }

  const connectSQLDB = async () => {
    setIsConnecting(true);
    try {
      const {data} =  await tsmAxios.post<{schema: string}>(`/projects/${projectId}/get-structure-by-uri`, {uri: `${DatabaseConnection[SQLType].before}${connectionString}`});
      setDbStructure({ ...dbStructure, statement: data.schema });
    } catch (error) {
      console.log(error);
    } finally{
      setIsConnecting(false);
    }
  }

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
        const {data} = await tsmAxios.get<{statement: string}>(`/projects/${projectId}/get-db-structure`);
        setDbStructure({ ...dbStructure, statement: data.statement });
      } catch (error) {
        console.log(error);
      } 
    }
    getDbStructureAsync()
  }, []);

  useEffect(() => {
    if(view === 3){
      setDbStructure({ ...dbStructure, statement: '' });
    }
  }, [view]);

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: async (e) => {
      const formData = new FormData();
      formData.append(`file`, e as File);
      const { data } = await tsmAxios.post<{result: string}>(`/pyhelper/file-handler`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDbStructure({ ...dbStructure, statement: data.result });
      return false;
    },
    listType: 'text',
  };

  return (
    <section ref={containerRef} className='flex h-[calc(100vh-170px)] w-full flex-col overflow-scroll rounded bg-[#f8f9fc] px-6 py-3'>
      <div>
        <div className='text-xl text-black'>Database Structure:</div>
        <div className='grid grid-cols-12 gap-x-2'>
          <div className='flex flex-col col-span-6 pr-2 mx-2 gap-y-2 '>
            {/* {view === 'uri' && <URIView />}
          {view === 'srs' && <SRSView />} */}

            <SQLEditor
              className='max-h-[300px] min-h-[120px] overflow-scroll'
              statement={dbStructure}
              setStatement={setDbStructure}
            />
            <div className='flex justify-end w-full'>
              <Button
                type='primary'
                className='flex items-center rounded-xl'
                disabled={view === 3 || disabledSaveButton}
                loading={isSaving}
                onClick={saveDbStructure}
              >
                Save
              </Button>
            </div>
          </div>
          <div className='flex flex-col col-span-6 gap-2 text-black'>
            <span>Or you can get the database based on the following ways</span>
            <div>
              <Radio.Group
                className='flex w-full'
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
            <div className='mt-4 max-h-[200px]'>
              {view === 1 && (
                <Dragger
                  {...props}
                  style={{
                    backgroundColor: '#eff4f8',
                  }}
                >
                  <div className='flex justify-center gap-5'>
                    <div className='ant-upload-drag-icon'>
                      <div
                        style={{
                          borderColor: btnColor,
                        }}
                        className='flex items-center justify-center w-20 h-20 mx-auto bg-transparent border-2 border-dashed rounded-lg'
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
                    <div className='flex flex-col py-4 text-left gap-y-4'>
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
                <div className='flex items-center justify-center w-full h-full'>
                  <Select
                      value={SQLSelectGenerate}
                      onChange={(e) => {
                        setSQLSelectGenerate(e);
                      }}
                      className='ml-2 min-w-[120px]'
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
                    loading={isGenerateStruture}
                    style={{
                      backgroundColor: btnColor,
                      color: '#fff',
                    }}
                    onClick={getSQLStructureGenerate}
                  >
                    Generate database structure
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
                      className='ml-2'
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
                    className='w-full text-[10px]'
                    addonBefore={DatabaseConnection[SQLType].before}
                    placeholder={DatabaseConnection[SQLType].placeholder}
                    allowClear
                    value={connectionString}
                    onChange={(e) => setConnectionString(e.target.value)}
                    onSearch={connectSQLDB}
                    enterButton='Connect'
                    loading={isConnecting}
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
                loading={isSubmitting}
                className='flex items-center rounded-xl'
                disabled={isSubmitting}
              >
                Generate SQL
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <Divider />
      <div className='w-full text-black'>
        <div className='text-xl'>Result:</div>
        {statements.map((statement, index) => (
          <SQLEditor key={index} statement={statement} uri={connectionString?`${DatabaseConnection[SQLType].before}${connectionString}`:''} />
        ))}
      </div>
      <div ref={resultDOM} className='h-8'></div>
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
        fill-rule='evenodd'
        d='M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z'
        clip-rule='evenodd'
      ></path>
    </svg>
  );
};

const URIView = () => {
  const [form] = Form.useForm();
  const btnColor = useSelector((state) => state.theme.btnColor);

  const onFinish = (value: string) => {
    console.log(value);
  };
  return (
    <div className='flex flex-col gap-y-1'>
      <Typography.Text className='text-xs'>Enter the URI of the SQL Database:</Typography.Text>
      <Form layout='horizontal' form={form} onFinish={onFinish}>
        <div className='mx-auto my-1 mb-6 flex w-[900px] items-start justify-between gap-x-4 rounded-xl bg-white p-2'>
          <Form.Item
            name='uri'
            className='flex-1 p-0 m-0'
            rules={[
              {
                required: true,
                message: 'Please input your URI!',
              },
            ]}
          >
            <Input
              size='large'
              className='border-none outline-none'
              placeholder='mysql+mysqlconnector://<Username>:<Password>@<Host>/<Database Name>'
            />
          </Form.Item>

          <Button
            type='text'
            htmlType='submit'
            style={{ backgroundColor: btnColor }}
            className='flex h-10 w-[50px] items-center justify-center rounded-lg'
          >
            <Send className='w-4 h-4 text-white' />
          </Button>
        </div>
      </Form>
    </div>
  );
};
const SRSView = () => {
  const [showModal, setShowModal] = useState(false);

  const { data: project } = useGetProject();

  useEffect(() => {
    if (!project?.speDocPath) {
      setShowModal(true);
    }
  }, [project]);

  return (
    <div className='flex items-center justify-between my-2 mb-6 gap-x-4'>
      <Button
        type='primary'
        className='flex w-[150px] items-center justify-center'
        icon={<Loader className='w-4 h-4' />}
      >
        Generate
      </Button>

      <ModalAnnouncement
        content='
      You have not uploaded the SRS document yet. Please upload the SRS document to generate the SQL query.'
        project={project}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};
