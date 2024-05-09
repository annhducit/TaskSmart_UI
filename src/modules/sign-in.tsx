import { Button, Form, FormProps, Input, Typography } from 'antd';
import { Lock, User } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * @author Duc Nguyen
 * @return Signin page
 */

type AuthType = {
  userName: string;
  password: string;
};

type FormType = FormProps<AuthType>;
const Signin = () => {
  const [form] = Form.useForm<AuthType>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish: FormType['onFinish'] = async (value) => {
    console.log(value);
  };
  return (
    <div className='flex flex-col gap-y-12'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-y-2'>
          <Typography.Text className='text-2xl font-semibold'>
            Welcome to <span className='capitalize text-[#0089ED]'>TaskSmart</span>
          </Typography.Text>
          <Typography.Text className='text-5xl font-semibold'>Sign up</Typography.Text>
        </div>
        <div className='flex flex-col'>
          <Typography.Text className='text-sm'>No Account ?</Typography.Text>
          <Link to={'../sign-up'}>
            <Typography.Text className='cursor-pointer font-semibold text-[#0089ED] transition-all hover:underline'>
              Sign up
            </Typography.Text>
          </Link>
        </div>
      </div>
      <GoogleButton />

      <Form layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item
          name='username'
          label='Enter your username or email address'
          rules={[
            {
              required: true,
              message: 'Please enter your email address or username',
            },
          ]}
        >
          <Input
            prefix={<User className='h-4 w-4 text-primary-default' />}
            size='large'
            placeholder='example@gmail.com'
          />
        </Form.Item>
        <Form.Item
          name='password'
          label='Enter your Password'
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
            placeholder='******'
          />
        </Form.Item>
        <Button
          loading={isSubmitting}
          type='primary'
          size='large'
          htmlType='submit'
          className='w-full'
        >
          Sign in
        </Button>
      </Form>
    </div>
  );
};

const GoogleButton = (props: {
  isSubmitting?: boolean;
  setIsSubmitting?: Dispatch<SetStateAction<boolean>>;
}) => {
  // const { isSubmitting, setIsSubmitting } = props;

  // const dispatch = useDispatch();

  // const login = useGoogleLogin({
  //   flow: 'implicit',
  //   async onSuccess(res) {
  //     try {
  //       setIsSubmitting(true);
  //       await dispatch(signInGoogleAction(res));
  //     } catch (error) {
  //       console.log('🚀 ~ file: sign-in.tsx:112 ~ onSuccess ~ error:', error);
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   },
  // });

  return (
    <Button
      size='large'
      className='flex items-center justify-center rounded-md bg-[#fafbff] text-sm hover:border'
      block
      icon={<GoogleIcon />}
      htmlType='button'
      // onClick={() => login()}
      // loading={isSubmitting}
    >
      Sign in with Google
    </Button>
  );
};

const GoogleIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='20'
      height='20'
      viewBox='0 0 48 48'
    >
      <path
        fill='#fbc02d'
        d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
      ></path>
      <path
        fill='#e53935'
        d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
      ></path>
      <path
        fill='#4caf50'
        d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
      ></path>
      <path
        fill='#1565c0'
        d='M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
      ></path>
    </svg>
  );
};

export default Signin;
