import { Button, Divider, List, Typography } from 'antd';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { useInView } from 'react-intersection-observer';

import image1 from '@/assets/images/img1-section1.png';
import image2 from '@/assets/images/img2-section1.png';

import collaboration from '@/assets/gifs/collaboration.gif';
import saveTime from '@/assets/gifs/save-time.gif';
import levelUp from '@/assets/gifs/level-up.gif';

import siginFree from '@/assets/images/try-for-free.png';
import FeaturesItem from '../components/feature-items';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  return (
    <body className='mt-20 px-20 py-20'>
      <SectionOne />
      <Divider className='my-1 -translate-y-6' />
      <SectionTwo />
      <Divider className='my-1 mt-20' />
      <SectionThree />
      <Divider className='my-1 mt-20' />
      <SectionFour />
      <Divider className='my-1 mt-20' />
      <SectionFive />
    </body>
  );
};

export default LandingPage;

const SectionOne = () => {
  const navigate = useNavigate();

  return (
    <div className='grid grid-cols-2 gap-x-20'>
      <motion.div
        className='col-span-1 flex flex-col gap-y-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeInOut' }}
      >
        <Typography.Text className='w-[400px] text-6xl font-semibold'>
          New Home for Collaboration
        </Typography.Text>
        <Typography.Text className='text-base'>
          Welcome to our online collaborative whiteboard platform—a space where teams unite, ideas
          flow, and creativity thrives, regardless of distance. With intuitive tools and seamless
          communication, we empower you to collaborate effectively, anytime, anywhere. Join us and
          experience the future of teamwork today!
        </Typography.Text>
        <Button
          className='relative flex w-40 items-center'
          icon={<ArrowRight className='absolute right-4 top-[10px] h-5 w-5' />}
          type='primary'
          size='large'
          onClick={() => navigate('tsm/home')}
        >
          Get Started
        </Button>
        <Typography.Text> Free forever — no credit card required.</Typography.Text>
        <div className='h-[600px] w-[600px] -translate-y-2'>
          <img loading='lazy' src={image2} className='h-full w-full' alt='' />
        </div>
      </motion.div>
      <motion.div
        className='col-span-1 flex flex-col gap-y-2'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
      >
        <div className='h-[600px] w-[600px] -translate-y-20'>
          <img loading='lazy' src={image1} className='h-full w-full' />
        </div>
        <motion.div
          className='flex flex-col gap-y-6'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeInOut' }}
        >
          <Typography.Text className='w-[460px] text-5xl font-semibold'>
            Stay organized and connected
          </Typography.Text>
          <Typography.Text className='text-base'>
            Boost creativity and productivity with our all-in-one platform. From brainstorming to
            project management, streamline collaboration effortlessly. Join now to transform how you
            work!
          </Typography.Text>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SectionTwo = () => {
  const [, setIsVisible] = useState(false);
  const animationControls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      animationControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      });
    }
  }, [inView, animationControls]);

  return (
    <section className='my-10 flex flex-col gap-y-10'>
      <motion.div
        ref={ref}
        animate={animationControls}
        initial={{ opacity: 0, y: 50 }}
        className='mx-auto w-[540px] text-center text-5xl font-semibold'
      >
        The first truly intelligent Project Management
      </motion.div>
      <motion.div
        ref={ref}
        animate={animationControls}
        initial={{ opacity: 0, y: 50 }}
        className='text-center text-base'
      >
        Revolutionize your project management experience with our AI-powered system, seamlessly
        guiding you through every phase of your project. From intelligent task allocation to
        predictive analytics, unleash the power of AI to streamline your workflow, boost
        productivity, and achieve unparalleled success.
      </motion.div>
      <motion.div
        ref={ref}
        animate={animationControls}
        initial={{ opacity: 0, y: 60 }}
        className='mx-auto h-[435px] w-[960px] rounded-lg bg-slate-200'
      >
        {/* Image of system here */}
      </motion.div>
      <motion.div
        className='flex flex-col gap-y-4'
        ref={ref}
        animate={animationControls}
        initial={{ opacity: 0, y: 60 }}
      >
        <div ref={ref} className='text-center text-xs'>
          Ready to experience the future of project management?{' '}
        </div>
        <div ref={ref} className='mx-auto flex items-center gap-x-6'>
          <Button type='dashed'>Request Demo</Button>
          <Button type='primary'>Ask Question</Button>
        </div>
      </motion.div>
    </section>
  );
};
const SectionThree = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <section className='my-20 flex flex-col gap-y-10'>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className='mx-auto w-[600px] text-center text-5xl font-semibold'
      >
        Get everything done with our AI-powered system
      </motion.div>
      <div className='my-10 grid grid-cols-3'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='col-span-1 gap-y-4'
        >
          <div className='mx-auto h-[160px] w-[160px]'>
            {' '}
            <img loading='lazy' src={saveTime} alt='' className='h-full w-full' />
          </div>
          <div className='mx-auto'>
            <Typography.Title level={3} className='text-center text-base font-semibold'>
              {' '}
              Save time to Work
            </Typography.Title>
            <p className='text-center text-base'>
              {' '}
              Save time and streamline your workflow with our efficient collaboration tools,
              ensuring seamless teamwork and productivity.
            </p>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='col-span-1 gap-y-4'
        >
          <div className='mx-auto h-[160px] w-[160px]'>
            {' '}
            <img loading='lazy' src={collaboration} alt='' className='h-full w-full' />
          </div>
          <div className='mx-auto'>
            <Typography.Title level={3} className='text-center text-base font-semibold'>
              {' '}
              Improve collaboration
            </Typography.Title>
            <p className='text-center text-base'>
              Revolutionize collaboration through cutting-edge AI technology, empowering teams to
              work smarter, faster, and more effectively than ever before{' '}
            </p>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='col-span-1 gap-y-4'
        >
          <div className='mx-auto h-[160px] w-[160px]'>
            {' '}
            <img loading='lazy' src={levelUp} alt='' className='h-full w-full' />
          </div>
          <div className='mx-auto'>
            <Typography.Title level={3} className='text-center text-base font-semibold'>
              {' '}
              Improve project quality
            </Typography.Title>
            <p className='text-center text-base'>
              {' '}
              Unlock unparalleled project excellence with our proven methods to elevate quality,
              ensuring every aspect exceeds expectations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SectionFour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  return (
    <section className='my-20'>
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className='mx-auto my-20 w-[600px] text-center text-5xl font-semibold'
      >
        Our system is chock–full of features!
      </motion.p>
      <div className='flex flex-wrap items-center justify-between gap-12'>
        <FeaturesItem isVisible={isVisible} />
      </div>
    </section>
  );
};

const SectionFive = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3 });

  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <div className='my-20'>
      <div
        ref={ref}
        className='relative mx-auto rounded-3xl bg-gradient-to-r from-[#8ebff0] to-[#4cb4ff] p-12'
      >
        <div className='flex items-center justify-between'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className='flex flex-col gap-y-6'
          >
            <Typography.Text className='w-[400px] text-5xl font-semibold text-white'>
              Try TaskSmart For Free!
            </Typography.Text>
            <Button size='large' type='primary' onClick={() => navigate('../auth-sign-up')}>
              Sign up now
            </Button>
            <List>
              <List.Item>
                <Typography.Text className='text-base text-white'>
                  Free forever — no credit card required.
                </Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text className='text-base text-white'>
                  Unlimited projects and users
                </Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text className='text-base text-white'>
                  Advanced project management tools
                </Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text className='text-base text-white'>
                  AI-powered system for intelligent task allocation
                </Typography.Text>
              </List.Item>
              <List.Item>
                <Typography.Text className='text-base text-white'>
                  Real-time collaboration and communication
                </Typography.Text>
              </List.Item>
            </List>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
            transition={{ duration: 0.8 }}
            className='absolute right-0 h-[650px] w-[721px]'
          >
            <img src={siginFree} alt='' className='h-full w-full' />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
