import Logo from '@/shared/components/logo';
import { Button, Divider, Form, Input, List, Typography } from 'antd';
import { Facebook, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='p-20 px-24 pb-6 shadow-md'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-y-4'>
          <Logo type='LOGO' />
          <Typography.Text className='w-60'>
            Empower your management with TaskSmart System's AI-driven insights, optimizing
            decision-making for enhanced productivity and success.
          </Typography.Text>
          {/* <Typography.Text className=''>© 2024 TaskSmart. All rights reserved.</Typography.Text> */}
          <div className='mt-6 flex items-center gap-4'>
            <Facebook size={24} />
            <Instagram size={24} />
            <Linkedin size={24} />
            <Twitter size={24} />
          </div>
        </div>
        <div>
          <List>
            <Typography.Text className='text-lg font-bold'>Product</Typography.Text>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Home
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                About
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Project Template
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Services
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Pricing
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Realease
              </Typography.Text>
            </List.Item>
          </List>
        </div>
        <div>
          <List>
            <Typography.Text className='text-lg font-bold'>Company</Typography.Text>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                About us
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Careers
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Press
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                News
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Media Kit
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Contact
              </Typography.Text>
            </List.Item>
          </List>
        </div>
        <div>
          <List>
            <Typography.Text className='text-lg font-bold'>Resouces</Typography.Text>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Blog
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Buy Items
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Event
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Documentation
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Instruction
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text className='transition-all hover:text-primary-default hover:underline'>
                Support
              </Typography.Text>
            </List.Item>
          </List>
        </div>
        <div className=''>
          <div className='flex flex-col gap-6'>
            <Typography.Text className='text-lg font-bold'>Stay up to date</Typography.Text>
            <Form>
              <Form.Item
                name='email'
                rules={[{ required: true, message: 'Please enter your email!' }]}
                className='w-[300px]'
              >
                <Input
                  prefix={<Mail className='mr-1 h-4 w-4 text-primary-default' />}
                  placeholder='Enter your email'
                  size='large'
                />
              </Form.Item>
              <Button
                htmlType='submit'
                className='w-full text-[14px] font-semibold'
                size='large'
                type='primary'
              >
                Subscribe
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Divider className='my-1' />
      <div className='mt-4 flex items-center justify-between'>
        <Typography.Text className='opacity-70'>
          © 2024 TaskSmart. All rights reserved.
        </Typography.Text>

        <div className='flex items-center gap-x-4'>
          <Typography.Text className='underline opacity-70'>Privacy Policy</Typography.Text>
          <Typography.Text className='underline opacity-70'>Terms of Service</Typography.Text>
          <Typography.Text className='underline opacity-70'>Cookies</Typography.Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
