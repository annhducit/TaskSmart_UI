import { Button, Form, FormProps, Input, Select, Typography } from 'antd';
import { ArrowLeft, ArrowRight, Lock, Mail, Plus, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import opt from '@/assets/images/otp.png';
import { useRegister } from './tsm/components/hooks/use-register';
import { tsmAxios } from '@/configs/axios';
import { toast } from 'sonner';

/**
 * @author Duc Nguyen
 * @return Signup page
 */

export type AuthType = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: string;
  timeZone: number;
  verifyCode: string;
};

type FormType = FormProps<AuthType>;
const Signup = () => {
  const [step, setStep] = useState<number>(1);

  const [count, setCount] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);

  const { mutate: register, isPending: isLoading } = useRegister();

  const [data, setData] = useState<AuthType>({} as AuthType);
  const [hasCodeSent, setHasCodeSent] = useState<boolean>(false);

  const [form] = Form.useForm<AuthType>();

  const onFinish: FormType['onFinish'] = async (values) => {
    const { verifyCode } = values;
    register({ ...data, verifyCode });
  };

  const sendVerifyEmailRequest = async () => {
    const email = form.getFieldValue('email');
    await tsmAxios
      .post(`/verify?email=${email}`)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setHasCodeSent(true);
          toast.success('Email was send successfully');
        }
      })
      .catch(() => {
        toast.error('Email sent failed');
      });
  };

  const handleCheckFormBeforeSend = () => {
    form.validateFields().then((item) => {
      setData(item as AuthType);
      if (form.getFieldValue('password') !== form.getFieldValue('confirmPassword')) {
        form.setFields([
          {
            name: 'confirmPassword',
            errors: ['Password and confirm password must be the same'],
          },
        ]);
        return;
      }
      sendVerifyEmailRequest();
      setStep(2);
      setIsDisabled(true);

      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 0) {
            clearInterval(interval);
            setIsDisabled(false);
            return 60;
          }
          return prevCount - 1;
        });
      }, 1000);
    });
  };
  return (
    <div
      className={`${step === 1 ? 'top-6 w-[600px]' : 'top-10 w-[450px]'} absolute right-24  rounded-lg bg-white shadow-lg`}
    >
      <div className='p-10'>
        <div className='flex flex-col gap-y-10'>
          {step === 1 && (
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
          )}
          {step === 2 && (
            <div className='flex flex-col gap-y-2'>
              <div className='mx-auto h-32 w-32'>
                <img src={opt} alt='opt' className='h-full w-full' />
              </div>
              <Typography.Text className='text-center text-2xl font-semibold text-blue-600'>
                Check your email
              </Typography.Text>
              <Typography.Text className='text-center text-sm text-gray-500'>
                We have sent a code to
                <p className='font-semibold'>{form.getFieldValue('email')}</p>
              </Typography.Text>
              <Typography.Text className='text-center text-sm text-gray-500'>
                Please check your email and enter the code below
              </Typography.Text>
            </div>
          )}
          <Form layout='vertical' form={form} name='signin' onFinish={onFinish}>
            {step === 1 && (
              <>
                <Form.Item
                  name='email'
                  label='Email'
                  initialValue='@gmail.com'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your email',
                    },
                    {
                      type: 'email',
                      message: 'Email is not valid',
                    },
                  ]}
                >
                  <Input
                    prefix={<Mail className='mr-2 h-4 w-4 text-primary-default' />}
                    size='large'
                    placeholder='example@gmail.com'
                  />
                </Form.Item>
                <div className='flex flex-1 items-center gap-x-4'>
                  <Form.Item
                    name='name'
                    label='Fullname'
                    className='flex-1'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your fullname',
                      },
                    ]}
                  >
                    <Input
                      placeholder='John Doe'
                      prefix={<User className='mr-2 h-4 w-4 text-primary-default' />}
                      size='large'
                    />
                  </Form.Item>
                  <Form.Item name='gender' className='flex-1' label='Gender'>
                    <Select
                      placeholder='Male'
                      defaultValue='male'
                      options={[
                        {
                          value: 'male',
                          label: 'Male',
                        },
                        {
                          value: 'female',
                          label: 'Female',
                        },
                        {
                          value: 'other',
                          label: 'Other',
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className='flex flex-1 items-center gap-x-4'>
                  <Form.Item
                    name='username'
                    label='Username'
                    className='flex-1'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your username',
                      },
                    ]}
                  >
                    <Input
                      prefix={<User className='w-full`mr-2 h-4 w-4 text-primary-default' />}
                      size='large'
                      placeholder='hducduy21'
                    />
                  </Form.Item>
                  <Form.Item
                    name='timeZone'
                    label='Time Zone:'
                    className='flex-1'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter timezone in your country',
                      },
                    ]}
                  >
                    <Input
                      type='number'
                      defaultValue={7}
                      prefix={<Plus className='mr-2 h-3 w-3' />}
                      min={0}
                      max={24}
                    />
                  </Form.Item>
                </div>
                <div className='item-center flex gap-x-4'>
                  <Form.Item
                    name='password'
                    label='Password'
                    className='flex-1'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your password',
                      },
                      {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message:
                          'Password must contain at least 8 characters, including letters and numbers',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<Lock className='mr-2 h-4 w-4 text-primary-default' />}
                      size='large'
                      placeholder='*******'
                    />
                  </Form.Item>

                  <Form.Item
                    name='confirmPassword'
                    label='Confirm password'
                    className='flex-1'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your password',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<Lock className='mr-2 h-4 w-4 text-primary-default' />}
                      size='large'
                      placeholder='*******'
                    />
                  </Form.Item>
                </div>
                <Button
                  onClick={handleCheckFormBeforeSend}
                  icon={<ArrowRight className='absolute right-5 top-3 h-4 w-4' />}
                  type='primary'
                  size='large'
                  htmlType='button'
                  className='relative float-right mt-2 w-[30%]'
                >
                  Next
                </Button>
              </>
            )}

            {step === 2 && (
              <>
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
                  <Input.OTP disabled={!hasCodeSent} length={6} inputMode='numeric' />
                </Form.Item>

                <div className='flex flex-col gap-y-4'>
                  <Button
                    type='primary'
                    size='large'
                    loading={isLoading}
                    htmlType='submit'
                    className='w-full'
                  >
                    Submit
                  </Button>

                  <div className='flex items-center justify-center'>
                    <Typography.Text className='text-center text-sm text-gray-500'>
                      Didn't receive the code?
                    </Typography.Text>
                    <Button
                      type='text'
                      className='text-sm font-semibold text-blue-600'
                      onClick={() => {
                        sendVerifyEmailRequest();
                      }}
                      disabled={isDisabled}
                    >
                      {isDisabled ? `${count}s` : 'Resend'}
                    </Button>
                  </div>
                  <Button
                    onClick={() => {
                      setStep(1);
                    }}
                    type='text'
                    icon={<ArrowLeft className='h-4 w-4' />}
                    size='large'
                    className='flex w-full items-center justify-center gap-x-2'
                    htmlType='button'
                  >
                    Back to sign up
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
