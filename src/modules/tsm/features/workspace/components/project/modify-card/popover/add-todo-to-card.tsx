import { Button, Input, Typography } from 'antd';

/**
 *
 * @returns  addTodoToCard component
 * @author Duc Nguyen
 */
const AddTodoToCard = () => {
  return (
    <div className='flex w-[250px] flex-col gap-y-4'>
      <Typography className='text-center text-base font-semibold'>Add todo</Typography>
      <div>
        <Typography.Text className='mb-1 block text-sm font-normal'>Title</Typography.Text>
        <Input allowClear defaultValue='Todo list' />
      </div>
      <Button type='primary' className='w-full'>
        Add
      </Button>
    </div>
  );
};

export default AddTodoToCard;
