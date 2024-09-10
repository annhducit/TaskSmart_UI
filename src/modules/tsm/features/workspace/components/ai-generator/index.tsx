import type { TabsProps } from 'antd';
import { Tabs } from 'antd';

import TaskGenerate from './components/task-generate';
import SQLGenerate from './components/sql-generate';

const AIFeature = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Task Generate',
      children: <TaskGenerate />,
    },
    {
      key: '2',
      label: 'SQL Generate',
      children: <SQLGenerate />,
    },
  ];

  return (
    <section className=''>
      <div className='col-span-5 mx-2 -translate-y-5'>
        <Tabs tabBarGutter={12} className={`custom-tabs-ai mb-0 text-white`} items={items} />
      </div>
    </section>
  );
};

export default AIFeature;
