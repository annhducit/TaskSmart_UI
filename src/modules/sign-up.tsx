import { Button, Form, FormProps, Input, Typography } from 'antd';
import { Lock, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * @author Duc Nguyen
 * @return Signup page
 */

type AuthType = {
  username: string;
  password: string;
  email: string;
  phone: string;
};

type FormType = FormProps<AuthType>;
const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm<AuthType>();

  const onFinish: FormType['onFinish'] = async (value) => {
    console.log(value);
  };
  return (
    <div className='flex flex-col gap-y-10'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-y-2'>
          <Typography.Text className='text-2xl font-semibold'>
            Welcome to <span className='capitalize text-[#0089ED]'>TaskSmart</span>
          </Typography.Text>
          <Typography.Text className='text-5xl font-semibold '>Sign up</Typography.Text>
        </div>
        <div className='flex flex-col'>
          <Typography.Text className='text-sm'>Have an Account ?</Typography.Text>
          <Link to={'../sign-in'}>
            <Typography.Text className='cursor-pointer font-semibold text-[#0089ED] transition-all hover:underline'>
              Sign in
            </Typography.Text>
          </Link>
        </div>
      </div>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item
          name='email'
          label='Enter your username or email address'
          rules={[
            {
              required: true,
              message: 'Please enter your email address or username',
            },
          ]}
        >
          <Input
            prefix={<Mail className='h-4 w-4 text-primary-default' />}
            size='large'
            placeholder='example@gmail.com'
          />
        </Form.Item>
        <div className='flex items-center gap-6'>
          <Form.Item
            name='username'
            label='User name'
            rules={[
              {
                required: true,
                message: 'Please enter your username',
              },
            ]}
          >
            <Input
              prefix={<User className='h-4 w-4 text-primary-default' />}
              size='large'
              placeholder='annhducid@'
            />
          </Form.Item>
          <Form.Item
            name='phone'
            label='Contact number'
            rules={[
              {
                required: true,
                message: 'Please enter your phone number',
              },
            ]}
          >
            <Input
              type='number'
              prefix={<Phone className='h-4 w-4 text-primary-default' />}
              size='large'
              placeholder='0987452114'
            />
          </Form.Item>
        </div>
        <Form.Item
          name='password'
          label='Enter your password'
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input
            prefix={<Lock className='h-4 w-4 text-primary-default' />}
            size='large'
            placeholder='*******'
          />
        </Form.Item>
        <Button
          loading={isSubmitting}
          type='primary'
          size='large'
          htmlType='submit'
          className='w-full'
        >
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
