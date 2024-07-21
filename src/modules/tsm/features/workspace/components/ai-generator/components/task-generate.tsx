import { Button, message } from 'antd';
import ListCardAI from './list-card-ai';
import { useState } from 'react';
import { tsmAxios } from '@/configs/axios';
import useGetProject from '../../project/hooks/query/use-get-project';
import { AxiosError } from 'axios';

const TaskGenerate = () => {
  const [taskGenerate, setTaskGenerate] = useState<any[]>([]);
  const { data: project } = useGetProject();

  const [loading, setLoading] = useState(false);

  const generateTask = () => {
    const generateAsync = async () => {
      setLoading(true);
      try {
        const res = await tsmAxios.get(`/projects/${project?.id}/generate-task`);
        if (res.status>=200 && res.status<300) {
          setTaskGenerate(res.data.listCards);
          console.log(res.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        const errorAxios = error as AxiosError;
        if(errorAxios.response?.status == 404){
          const data = errorAxios.response?.data as TsmError;
          message.error(data.message);
        }else{
          message.error(errorAxios.message);
        }
      }
    };
    generateAsync();
  }
  return (
    <div className='inline-block min-h-screen px-6 '>
      {taskGenerate.length > 0 ? (
        <div>
          <div className='flex items-start justify-start gap-x-3'>
            {taskGenerate.map((item, index) => (
              <ListCardAI key={index} listCard={item as unknown as any} />
            ))}
          </div>
          <div className='flex items-start justify-start w-full h-full mt-3 gap-x-3'>
            <Button type='primary'>Save</Button>
            <Button>Cancel</Button>
            </div>
        </div>
      ) : (
        <div className='flex items-start justify-start w-full h-full gap-x-3'>
          <Button loading={loading} onClick={generateTask}>Generate Task</Button>
        </div>
      )}
    </div>
  );
};

export default TaskGenerate;
