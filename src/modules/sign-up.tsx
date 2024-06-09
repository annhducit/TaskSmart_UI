import { tsmAxios } from '@/configs/axios';
import { Button, Form, FormProps, Input, Typography } from 'antd';
import { Lock, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * @author Duc Nguyen
 * @return Signup page
 */

//sửa lại cái prefix của input
//password == confirmPassword
//time resend email 60s


type AuthType = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  timeZone: number;
  verifyCode: string;
};

type EmailVerify = {
  code: string;
};

type FormType = FormProps<AuthType>;
const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCodeSent, setHasCodeSent] = useState(false);

  const [formSignup] = Form.useForm<AuthType>();
  const [formVerifyEmail] = Form.useForm<EmailVerify>();

  const onFinish: FormType['onFinish'] = async (value) => {
    const signup = await tsmAxios.post(`/users`,value)
    console.log(signup)
    //   if(res.status === 201){
    //     //success
    //     console.log(res.data)
    //     setHasCodeSent(true);
    //   }else{
    //     //nof error
    //   }
    // }).catch(()=>{
    //   //nof error 
    // });

  };

  const sendVerifyEmailRequest = async () => {
    await tsmAxios.post(`/verify?email=${formSignup.getFieldValue('email')}`).then((res) => {
      if(res.status === 201){
        //success
        setHasCodeSent(true);
      }
      //nof error
    }).catch(()=>{
      //nof error
    });
    //set time to resend 60s
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
      <Form layout='vertical' form={formSignup} onFinish={onFinish}>
        <Form.Item
          name='name'
          label='Fullname'
          rules={[
            {
              required: true,
              message: 'Please enter your fullname',
            },
          ]}
        >
          <Input prefix={<Mail className='w-4 h-4 text-primary-default' />} size='large' />
        </Form.Item>

        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
              message: 'Please enter your email address',
            },
          ]}
        >
          <Input
            prefix={<Mail className='w-4 h-4 text-primary-default' />}
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
              prefix={<User className='w-4 h-4 text-primary-default' />}
              size='large'
              placeholder='annhducid'
            />
          </Form.Item>
          <Form.Item
            name='timeZone'
            label='Time Zone:'
            rules={[
              {
                required: true,
                message: 'Please enter timezone in your country',
              },
            ]}
          >
            <Input
              type='number'
              //phone -> time zone
              prefix='+'
              min={0}
              max={24}
            />
          </Form.Item>
        </div>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input
            prefix={<Lock className='w-4 h-4 text-primary-default' />}
            size='large'
            placeholder='*******'
          />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          label='Confirm password'
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input
            prefix={<Lock className='w-4 h-4 text-primary-default' />}
            size='large'
            placeholder='*******'
          />
        </Form.Item>
        <Button
          loading={isSubmitting}
          type='primary'
          size='large'
          htmlType='button'
          className='w-full'
        >
          Next
        </Button>

    
        <Form.Item
          name='verifyCode'
          label='Enter your code:'
          rules={[
            {
              required: true,
              message: 'Enter your code to verify email',
            },
          ]}
        >
          <div className='flex'>
            <Input disabled={!hasCodeSent} />
            <Button htmlType='button' onClick={sendVerifyEmailRequest}>Send</Button>
          </div>
          
        </Form.Item>
          {/* click to verify */}
          <Button type='primary' size='large' htmlType='submit' className='w-full'>
            Submit
          </Button>
      </Form>
    </div>
  );
};

export default Signup;
