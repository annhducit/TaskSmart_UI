import ListCardAI from './list-card-ai';

const TaskGenerate = ({ dataGenerate }: { dataGenerate: ListCard[] }) => {
  return (
    <div className='inline-block min-h-screen px-6 '>
      <div className='flex items-start justify-start gap-x-3'>
        {dataGenerate.map((item, index) => (
          <ListCardAI key={index} listCard={item as unknown as any} />
        ))}
      </div>
    </div>
  );
};

export default TaskGenerate;
