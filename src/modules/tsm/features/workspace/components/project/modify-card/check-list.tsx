import useCollapse from '@/shared/hooks/use-collapse';
import { Button, Checkbox, Input, Typography } from 'antd';
import { Plus, SquareCheckBig, Trash } from 'lucide-react';

const CheckList = () => {
  const [visible, setVisible] = useCollapse<boolean>(false);
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <SquareCheckBig className='mt-[2px] h-5 w-5 opacity-40' />
          <Typography.Text className='text-base font-semibold'>Check list</Typography.Text>
        </div>
        <Button icon={<Trash className='h-3 w-3' color='red' />}>Delete</Button>
      </div>
      <CheckListItem />
      <CheckListItem />
      <CheckListItem />
      {!visible ? (
        <div className='ml-6'>
          <Button
            onClick={() => setVisible(true)}
            icon={<Plus className='h-4 w-4' />}
            type='primary'
            className='flex w-[120px] items-center'
          >
            Add task
          </Button>
        </div>
      ) : (
        <div className='ml-6 flex items-center gap-x-2'>
          <Input placeholder='Enter task' className='bg-white' />
          <Button icon={<Plus className='mt-1 h-3 w-3' />} type='primary' className='w-[90px]'>
            Add
          </Button>
          <Button
            onClick={() => setVisible(false)}
            type='default'
            className='0 w-[90px] bg-red-500 text-white'
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckList;

const CheckListItem = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex items-center gap-x-2'>
        <Checkbox />
        <Input defaultValue='Reading API documentation' className='bg-white' />
      </div>
    </div>
  );
};
