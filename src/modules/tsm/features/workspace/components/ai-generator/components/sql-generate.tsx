import { Button, Divider, Form, Input, Menu, MenuProps, Typography } from 'antd';
import SQLEditor from './code-editor';
import { useState } from 'react';
import { useSelector } from '@/store';
import { FileSymlink, FileText, Link2, Loader, Send } from 'lucide-react';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { tsmAxios } from '@/configs/axios';
import sql from '@/assets/images/sql.png';
import blink from '@/assets/images/blink-ai.png';
import useSearchParam from '@/shared/hooks/use-search-param';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useGetProject from '../../project/hooks/query/use-get-project';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAnnouncement from './modal-announment';

const SQLGenerate = () => {
  const [form] = Form.useForm();

  const { btnColor } = useSelector((state) => state.theme);
  const staInit: Statement = {
    statement: `CREATE TABLE boards(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  description TEXT,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE lists(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  board_id INTEGER NOT NULL,\n  position INTEGER NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (board_id) REFERENCES boards (id)\n);\n\nCREATE TABLE cards(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  description TEXT,\n  list_id INTEGER NOT NULL,\n  position INTEGER NOT NULL,\n  due_date TIMESTAMP,\n  assigned_to INTEGER,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (list_id) REFERENCES lists (id),\n  FOREIGN KEY (assigned_to) REFERENCES users (id)\n);\n\nCREATE TABLE users(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  email VARCHAR(255) NOT NULL UNIQUE,\n  password_digest VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE board_members(\n  board_id INTEGER NOT NULL,\n  user_id INTEGER NOT NULL,\n  role VARCHAR(255) NOT NULL,\n  PRIMARY KEY (board_id, user_id),\n  FOREIGN KEY (board_id) REFERENCES boards (id),\n  FOREIGN KEY (user_id) REFERENCES users (id)\n);\n\nCREATE TABLE card_comments(\n  id SERIAL PRIMARY KEY,\n  card_id INTEGER NOT NULL,\n  user_id INTEGER NOT NULL,\n  comment TEXT NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (card_id) REFERENCES cards (id),\n  FOREIGN KEY (user_id) REFERENCES users (id)\n);\n\nCREATE TABLE card_labels(\n  id SERIAL PRIMARY KEY,\n  card_id INTEGER NOT NULL,\n  label VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (card_id) REFERENCES cards (id)\n);\n\nCREATE TABLE card_attachments(\n  id SERIAL PRIMARY KEY,\n  card_id INTEGER NOT NULL,\n  file_name VARCHAR(255) NOT NULL,\n  file_type VARCHAR(255) NOT NULL,\n  file_size BIGINT NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (card_id) REFERENCES cards (id)\n);\n\nCREATE TABLE integrations(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  type VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE board_integrations(\n  board_id INTEGER NOT NULL,\n  integration_id INTEGER NOT NULL,\n  PRIMARY KEY (board_id, integration_id),\n  FOREIGN KEY (board_id) REFERENCES boards (id),\n  FOREIGN KEY (integration_id) REFERENCES integrations (id)\n);`,
    title: 'Create table',
  };

  const exampleQuery = `SELECT * FROM customers WHERE orders > 10 AND order_date > DATE_SUB(NOW(), INTERVAL 6 MONTH)`;

  const [statements, setStatements] = useState<Statement[]>([staInit]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [, setValue, view] = useSearchParam(SEARCH_PARAMS.TAB);

  const onFinish = async (value: any) => {
    try {
      setIsSubmitting(true);
      const projectId = getIdProjectFromUrl();

      value.database = value.database ?? 'SQL';
      const { data } = await tsmAxios.get<DatabaseRAGResponse>(
        `/project/${projectId}/database-rag?question=${value.question}&database=${value.database}`
      );

      setStatements(data.statements);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '1':
        setValue('uri');
        break;
      case '2':
        setValue('srs');
        break;
      case '3':
        setValue('file');
        break;

      default:
        break;
    }
  };

  return (
    <section className='flex h-[calc(100vh-170px)] w-full flex-col gap-y-6  rounded bg-[#f8f9fc] p-6'>
      <div className='grid grid-cols-12 gap-x-2'>
        <div className='col-span-2'>
          <div className={`flex items-center gap-x-2 p-2 py-3 pb-2 pt-3 shadow-md `}>
            <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded text-lg font-bold'>
              <img src={sql} className='h-full w-full rounded object-cover' alt='' />
            </div>
            <div className='flex flex-col gap-y-1'>
              <Typography.Text className='w-[150px] truncate text-sm font-semibold '>
                SQL Generate Tool
              </Typography.Text>
              <Typography.Text className='w-[150px] truncate text-xs'>
                By{' '}
                <b className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent'>
                  TaskSmart AI
                </b>
              </Typography.Text>
            </div>
          </div>
          <Divider />
          <Menu
            defaultSelectedKeys={['1']}
            onClick={onClick}
            defaultValue={view}
            activeKey='1'
            mode='inline'
            className='rounded-lg  bg-[#f8f9fc] '
          >
            <Menu.Item accessKey='1' icon={<Link2 className='h-4 w-4' />} key='1'>
              By URI
            </Menu.Item>
            <Menu.Item icon={<FileSymlink className='h-4 w-4' />} key='2'>
              By SRS
            </Menu.Item>
            <Menu.Item icon={<FileText className='h-4 w-4' />} key='3'>
              By SQL File
            </Menu.Item>
          </Menu>
        </div>
        <div className='col-span-10 mx-2 flex h-[calc(100vh-200px)] flex-col gap-y-4 overflow-y-scroll pr-2'>
          {view === 'uri' && <URIView />}
          {view === 'srs' && <SRSView />}

          {statements.length > 0 &&
            statements.map((statement, index) => (
              <SQLEditor key={`statements_${index}`} statement={statement} />
            ))}
          <div className='card-ai flex flex-col gap-y-10 rounded-lg bg-white p-6'>
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
                  prefix={<img src={blink} className='absolute left-4 top-3 h-5 w-5' alt='' />}
                  size='large'
                  placeholder='Find all customers who have ordered more than 10 products in the last 6 months'
                  className='rounded-xl py-3 pl-12'
                />
              </Form.Item>

              <div className='float-right flex items-center justify-center gap-x-2'>
                <Form.Item className='flex w-full flex-shrink'>
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

          <SQLEditor statement={{ statement: exampleQuery, title: 'Result' }} />
        </div>
      </div>
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
      className='-ml-1 mr-2 h-6 w-6 text-gray-100'
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
            className='m-0 flex-1 p-0'
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
            <Send className='h-4 w-4 text-white' />
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
    <div className='my-2 mb-6 flex items-center justify-between gap-x-4'>
      <Button
        type='primary'
        className='flex w-[150px] items-center justify-center'
        icon={<Loader className='h-4 w-4' />}
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
