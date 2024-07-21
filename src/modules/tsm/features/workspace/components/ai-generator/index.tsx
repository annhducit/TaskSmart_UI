import {
  Tabs,
  TabsProps,
} from 'antd';
import TaskGenerate from './components/task-generate';
import SQLGenerate from './components/sql-generate';


const AIFeature = () => {

  const onChangeTab = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'AI Generate',
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
        <div className='col-span-5 mr-2'>
          <Tabs
            onChange={onChangeTab}
            tabBarGutter={12}
            className={`custom-tabs-ai mb-0 text-white`}
            type='card'
            items={items}
          />
      </div>
    </section>
  );
};

export default AIFeature;
