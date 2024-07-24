import {
  Button,
  Form,
  FormInstance,
  FormProps,
  Input,
  Popover,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import SQLEditor from './code-editor';
import { useState } from 'react';
import { useSelector } from '@/store';
import { Ellipsis } from 'lucide-react';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { tsmAxios } from '@/configs/axios';

type FormType = FormProps<DatabaseRAGRequest>;

const SQLGenerate = () => {
  const [form] = Form.useForm<DatabaseRAGRequest>();
  const { btnColor } = useSelector((state) => state.theme);
  const staInit :Statement = {
    statement:`CREATE TABLE boards(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  description TEXT,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE lists(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  board_id INTEGER NOT NULL,\n  position INTEGER NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (board_id) REFERENCES boards (id)\n);\n\nCREATE TABLE cards(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  description TEXT,\n  list_id INTEGER NOT NULL,\n  position INTEGER NOT NULL,\n  due_date TIMESTAMP,\n  assigned_to INTEGER,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (list_id) REFERENCES lists (id),\n  FOREIGN KEY (assigned_to) REFERENCES users (id)\n);\n\nCREATE TABLE users(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  email VARCHAR(255) NOT NULL UNIQUE,\n  password_digest VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE board_members(\n  board_id INTEGER NOT NULL,\n  user_id INTEGER NOT NULL,\n  role VARCHAR(255) NOT NULL,\n  PRIMARY KEY (board_id, user_id),\n  FOREIGN KEY (board_id) REFERENCES boards (id),\n  FOREIGN KEY (user_id) REFERENCES users (id)\n);\n\nCREATE TABLE card_comments(\n  id SERIAL PRIMARY KEY,\n  card_id INTEGER NOT NULL,\n  user_id INTEGER NOT NULL,\n  comment TEXT NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (card_id) REFERENCES cards (id),\n  FOREIGN KEY (user_id) REFERENCES users (id)\n);\n\nCREATE TABLE card_labels(\n  id SERIAL PRIMARY KEY,\n  card_id INTEGER NOT NULL,\n  label VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (card_id) REFERENCES cards (id)\n);\n\nCREATE TABLE card_attachments(\n  id SERIAL PRIMARY KEY,\n  card_id INTEGER NOT NULL,\n  file_name VARCHAR(255) NOT NULL,\n  file_type VARCHAR(255) NOT NULL,\n  file_size BIGINT NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (card_id) REFERENCES cards (id)\n);\n\nCREATE TABLE integrations(\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  type VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE board_integrations(\n  board_id INTEGER NOT NULL,\n  integration_id INTEGER NOT NULL,\n  PRIMARY KEY (board_id, integration_id),\n  FOREIGN KEY (board_id) REFERENCES boards (id),\n  FOREIGN KEY (integration_id) REFERENCES integrations (id)\n);`,
    title: ''
  }

  const [statements, setStatements] = useState<Statement[]>([staInit]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish: FormType['onFinish'] = async (value) => {
    try {
      setIsSubmitting(true);
      const projectId = getIdProjectFromUrl();

      value.database = value.database ?? 'SQL';
      const { data } = await tsmAxios.get<DatabaseRAGResponse>(
        `/projects/${projectId}/database-rag?question=${value.question}&database=${value.database}`
      );
      console.log(data);
      setStatements(data.statements);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className='flex h-[calc(100vh-180px)] w-full flex-col gap-y-6 overflow-y-scroll rounded bg-[#f8f9fc] p-6'>
      <div className='grid grid-cols-3 gap-x-6'>
        <div className='flex flex-col p-6 bg-white card-ai gap-y-2'>
          <Typography.Text>SQL Query Generated </Typography.Text>
          <Typography.Text className='text-xl font-semibold'>0 </Typography.Text>
        </div>
        <div className='flex flex-col p-6 bg-white card-ai gap-y-2'>
          <Typography.Text>SQL Query Explainer </Typography.Text>
          <Typography.Text className='text-xl font-semibold'>0 </Typography.Text>
        </div>
        <div className='flex flex-col p-6 bg-white card-ai gap-y-2'>
          <Typography.Text>Total </Typography.Text>
          <Typography.Text className='text-xl font-semibold'>0 </Typography.Text>
        </div>
      </div>

      <div className='flex flex-col p-6 bg-white rounded-lg card-ai gap-y-10'>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item name='question' label='Write here what you want from your document:'>
            <Input.TextArea
              rows={6}
              placeholder='Find all customers who have ordered more than 10 products in the last 6 months'
              className='rounded-xl'
              style={{
                resize: 'none',
                outline: `1px solid ${btnColor}`,
                border: `1px solid ${btnColor}`,
              }}
            />
          </Form.Item>

          <div className='flex items-center justify-center float-right gap-x-2'>
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
              >
                Generate SQL
              </Button>
            </Form.Item>
            <Form.Item name='database'>
              <Select
                showSearch
                allowClear
                style={{ width: 150 }}
                size='large'
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                defaultValue={'SQL'}
                options={[
                  { value: 'SQL', label: 'Standard SQL' },
                  { value: 'MongoDb', label: 'MongoDb' },
                  { value: 'MySQL', label: 'MySQL' },
                  { value: 'Postgre', label: 'PostgreSQL' },
                  { value: 'SQLite', label: 'SQLite' },
                  { value: 'Oracle', label: 'Oracle' },
                  { value: 'SQL Server', label: 'SQL Server' },
                  { value: 'IBM DB2', label: 'IBM DB2' },
                  { value: 'Snow flake', label: 'Snowflake' },
                  { value: 'Google BigQuery', label: 'Google BigQuery' },
                ]}
              />
            </Form.Item>
          </div>

          <Typography.Text className='block'>Recommendations:</Typography.Text>
          <div className=''>
            {recommendQuery.slice(0, 3).map((item) => (
              <ItemRecommend key={item.id} label={item.label} form={form} />
            ))}
            <Tooltip title='More'>
              <Popover
                title={
                  <Typography.Text className='flex items-center justify-center text-center'>
                    More recommendations
                  </Typography.Text>
                }
                trigger='click'
                content={
                  <div className='flex h-[300px] w-[350px] flex-col gap-y-2 overflow-y-scroll'>
                    {recommendQuery.slice(3).map((item) => (
                      <ItemRecommend key={item.id} label={item.label} form={form} />
                    ))}
                  </div>
                }
              >
                <Button
                  size='small'
                  icon={<Ellipsis className='w-3 h-3' color={btnColor} />}
                  className='mt-1 rounded-full'
                />
              </Popover>
            </Tooltip>
          </div>
        </Form>
      </div>

      {statements.length > 0 &&
        statements.map((statement, index) => (
          <SQLEditor key={`statements_${index}`} statement={statement} />
        ))}
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

const ItemRecommend = ({ label, form }: { label: string; form: FormInstance<any> }) => {
  const { btnColor } = useSelector((state) => state.theme);

  return (
    <Button
      className='flex items-center my-1 text-white gap-x-2 rounded-xl'
      style={{
        backgroundColor: btnColor,
        color: '#fff',
      }}
      onClick={() => {
        form.setFieldsValue({ content: label });
      }}
    >
      <Typography.Text color='#fff' className='text-white'>
        {label}
      </Typography.Text>
    </Button>
  );
};

const recommendQuery = [
  {
    id: 1,
    label: 'Base on file content create database schema',
  },
  {
    id: 2,
    label: 'SQL query to select data from database',
  },
  {
    id: 3,
    label: 'SQL query to update data in database',
  },
  {
    id: 4,
    label: 'Create SQL query to delete data from database',
  },
  {
    id: 5,
    label: 'Create SQL query to insert data to database',
  },
  {
    id: 6,
    label: 'Create SQL query to join data from multiple tables',
  },
  {
    id: 7,
    label: 'Create SQL query to group data',
  },
  {
    id: 8,
    label: 'Create SQL query to sort data',
  },
  {
    id: 9,
    label: 'Create SQL query to filter data',
  },
  {
    id: 10,
    label: 'Create SQL query to aggregate data',
  },
  {
    id: 11,
    label: 'Create SQL query to calculate data',
  },
  {
    id: 12,
    label: 'Create SQL query to search data',
  },
  {
    id: 13,
    label: 'Create SQL query to limit data',
  },
  {
    id: 14,
    label: 'Create SQL query to offset data',
  },
  {
    id: 15,
    label: 'Create SQL query to count data',
  },
  {
    id: 16,
    label: 'Create SQL query to sum data',
  },
  {
    id: 17,
    label: 'Create SQL query to average data',
  },
  {
    id: 18,
    label: 'Create SQL query to max data',
  },
  {
    id: 19,
    label: 'Create SQL query to min data',
  },
  {
    id: 20,
    label: 'Create SQL query to distinct data',
  },
  {
    id: 21,
    label: 'Create SQL query to having data',
  },
  {
    id: 22,
    label: 'Create SQL query to order data',
  },
  {
    id: 23,
    label: 'Create SQL query to limit data',
  },
  {
    id: 24,
    label: 'Create SQL query to offset data',
  },
  {
    id: 25,
    label: 'Create SQL query to count data',
  },
  {
    id: 26,
    label: 'Create SQL query to sum data',
  },
  {
    id: 27,
    label: 'Create SQL query to average data',
  },
  {
    id: 28,
    label: 'Create SQL query to max data',
  },
  {
    id: 29,
    label: 'Create SQL query to min data',
  },
];
