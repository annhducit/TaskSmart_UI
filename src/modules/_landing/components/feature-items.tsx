import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Typography } from 'antd';

import image1 from '@/assets/images/8.png';
import image2 from '@/assets/images/9.png';
import image3 from '@/assets/images/10.png';
import image4 from '@/assets/images/11.png';
import image5 from '@/assets/images/12.png';
import image6 from '@/assets/images/13.png';
import image7 from '@/assets/images/14.png';
import image8 from '@/assets/images/15.png';

interface Props {
  isVisible: boolean;
}

const FeaturesItem: React.FC<Props> = ({ isVisible }) => {
  const [itemRefs, setItemRefs] = useState<HTMLDivElement[]>([]);
  const [itemsInView, setItemsInView] = useState<number[]>([]);

  const addToRefs = useCallback(
    (el: HTMLDivElement | null) => {
      if (el && !itemRefs.includes(el)) {
        setItemRefs((prev) => [...prev, el]);
      }
    },
    [itemRefs]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inViewIndexes = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            const index = itemRefs.findIndex((ref) => ref === entry.target);
            return index !== -1 ? index : undefined;
          })
          .filter((index) => index !== undefined) as number[];
        setItemsInView(inViewIndexes);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px 500px 0px',
      }
    );

    if (isVisible) {
      itemRefs.forEach((itemRef) => observer.observe(itemRef));
    }

    return () => {
      itemRefs.forEach((itemRef) => observer.unobserve(itemRef));
    };
  }, [isVisible, itemRefs]);

  return (
    <>
      {data.map((item, index) => (
        <motion.div
          key={item.id}
          ref={addToRefs}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: itemsInView.includes(index) ? 1 : 0,
            y: itemsInView.includes(index) ? 0 : 50,
          }}
          transition={{ duration: 0.8, delay: 0.2 * index }}
          className='flex w-[300px] flex-col gap-2'
        >
          <div className='flex items-center gap-x-4'>
            <div className='h-[40px] w-[40px] '>
              <img src={item.image} alt='' className='h-full w-full object-contain' />
            </div>
            <Typography.Title level={3} className='text-2xl font-semibold'>
              {item.title}
            </Typography.Title>
          </div>
          <div>
            <Typography.Text className='text-base'>{item.description}</Typography.Text>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default FeaturesItem;

const data: FeatureType[] = [
  {
    id: 1,
    title: 'CRM',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    image: image1,
  },
  {
    id: 2,
    title: 'Task Board',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    image: image2,
  },
  {
    id: 3,
    title: 'Project Template',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    image: image3,
  },
  {
    id: 4,
    title: 'Karban',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    image: image4,
  },
  {
    id: 5,
    title: 'Time Tracking',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    image: image5,
  },
  {
    id: 6,
    title: 'Meeting',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    image: image6,
  },
  {
    id: 7,
    title: 'Task Automation',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    image: image7,
  },
  {
    id: 8,
    title: 'Specification-Based SQL Commands',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    image: image8,
  },
];
type FeatureType = {
  id: number;
  title: string;
  description: string;
  image: string;
};
