import { Button, Form, Input, Select, Typography } from 'antd';
import SQLEditor from './code-editor';
import { useState } from 'react';

const SQLGenerate = () => {
  const [form] = Form.useForm();

  const [sql, setSql] = useState<string>(sqlQuery);
  return (
    <section className='mx-auto mb-60 flex w-[98%] flex-col gap-y-6 rounded bg-[#f8f9fc] p-6'>
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
          <Form.Item label='SQL Type'>
            <Select
              showSearch
              allowClear
              className='w-full'
              size='large'
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              placeholder='My SQL'
              options={[
                { value: '1', label: 'MariaDB' },
                { value: '2', label: 'MySQL' },
                { value: '3', label: 'PostgreSQL' },
                { value: '4', label: 'SQLite' },
                { value: '5', label: 'Oracle' },
                { value: '6', label: 'SQL Server' },
                { value: '7', label: 'IBM DB2' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea rows={8} placeholder='Enter your SQL Query here...'></Input.TextArea>
          </Form.Item>

          <Button type='primary' size='large' className='w-full'>
            Generate SQL
          </Button>
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
