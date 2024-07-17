import { Button, Form, FormInstance, Input, Popover, Select, Tooltip, Typography } from 'antd';
import SQLEditor from './code-editor';
import { useState } from 'react';
import { useSelector } from '@/store';
import { Ellipsis } from 'lucide-react';

const SQLGenerate = () => {
  const [form] = Form.useForm();
  const { btnColor } = useSelector((state) => state.theme);

  const [sql, setSql] = useState<string>(sqlQuery);
  return (
    <section className='flex h-[calc(100vh-190px)] w-full flex-col gap-y-6 overflow-y-scroll rounded bg-[#f8f9fc] p-6'>
      <div className='grid grid-cols-3 gap-x-6'>
        <div className='card-ai flex flex-col gap-y-2 bg-white p-6'>
          <Typography.Text>SQL Query Generated </Typography.Text>
          <Typography.Text className='text-xl font-semibold'>0 </Typography.Text>
        </div>
        <div className='card-ai flex flex-col gap-y-2 bg-white p-6'>
          <Typography.Text>SQL Query Explainer </Typography.Text>
          <Typography.Text className='text-xl font-semibold'>0 </Typography.Text>
        </div>
        <div className='card-ai flex flex-col gap-y-2 bg-white p-6'>
          <Typography.Text>Total </Typography.Text>
          <Typography.Text className='text-xl font-semibold'>0 </Typography.Text>
        </div>
      </div>

      <div className='card-ai flex flex-col gap-y-10 rounded-lg bg-white p-6'>
        <Form form={form} layout='vertical'>
          <Form.Item name='content' label='Write here what you want from your document:'>
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
                className='flex items-center rounded-xl'
              >
                Generate SQL
              </Button>
            </Form.Item>
            <Form.Item>
              <Select
                showSearch
                allowClear
                style={{ width: 150 }}
                size='large'
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                defaultValue={'8'}
                options={[
                  { value: '1', label: 'MariaDB' },
                  { value: '2', label: 'MySQL' },
                  { value: '3', label: 'PostgreSQL' },
                  { value: '4', label: 'SQLite' },
                  { value: '5', label: 'Oracle' },
                  { value: '6', label: 'SQL Server' },
                  { value: '7', label: 'IBM DB2' },
                  { value: '8', label: 'Standard SQL' },
                  { value: '9', label: 'Snowflake' },
                  { value: '10', label: 'Google BigQuery' },
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
                  icon={<Ellipsis className='h-3 w-3' color={btnColor} />}
                  className='mt-1 rounded-full'
                />
              </Popover>
            </Tooltip>
          </div>
        </Form>
      </div>
      <SQLEditor code={sql} onChange={setSql} />
    </section>
  );
};

export default SQLGenerate;

const sqlQuery = `
SELECT 
    o.order_id,
    o.order_date,
    o.shipping_date,
    o.shipping_status,
    c.customer_id,
    c.first_name AS customer_first_name,
    c.last_name AS customer_last_name,
    c.email AS customer_email,
    p.product_id,
    p.product_name,
    p.product_description,
    p.price AS product_price,
    p.stock_quantity,
    pc.category_id,
    pc.category_name,
    od.quantity AS ordered_quantity,
    (od.quantity * p.price) AS total_product_price,
    COUNT(DISTINCT o.order_id) OVER() AS total_orders_count,
    SUM(od.quantity * p.price) OVER() AS total_revenue,
    AVG(p.price) OVER() AS average_product_price,
    MAX(p.price) OVER() AS max_product_price,
    MIN(p.price) OVER() AS min_product_price
FROM 
    orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN order_details od ON o.order_id = od.order_id
    JOIN products p ON od.product_id = p.product_id
    JOIN product_categories pc ON p.category_id = pc.category_id
WHERE 
    o.order_date BETWEEN '2023-01-01' AND '2023-12-31'
    AND o.shipping_status = 'Delivered'
    AND p.stock_quantity > 0
    AND c.email LIKE '%@example.com'
GROUP BY 
    o.order_id,
    o.order_date,
    o.shipping_date,
    o.shipping_status,
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    p.product_id,
    p.product_name,
    p.product_description,
    p.price,
    p.stock_quantity,
    pc.category_id,
    pc.category_name,
    od.quantity
HAVING 
    COUNT(od.quantity) > 1
ORDER BY 
    o.order_date DESC,
    c.last_name ASC,
    p.product_name ASC
LIMIT 1000;
`;

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

const ItemRecommend = ({ label, form }: { label: string; form: FormInstance<any> }) => {
  const { btnColor } = useSelector((state) => state.theme);

  return (
    <Button
      className='my-1 flex items-center gap-x-2 rounded-xl text-white'
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
