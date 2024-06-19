import useCollapse from '@/shared/hooks/use-collapse';
import { Button, Checkbox, Input, Typography } from 'antd';
import { List, Plus, SquareCheckBig, Trash } from 'lucide-react';

const CheckList = ({ color }: { list: CheckListGroup[]; color: string }) => {
  const list: CheckListGroup[] = [
    {
      name: 'Checklist 1',
      checklist: [
        {
          name: 'Task 1',
          checked: true,
        },
        {
          name: 'Task 2',
          checked: false,
        },
        {
          name: 'Task 3',
          checked: true,
        },
      ],
    },
    {
      name: 'Checklist 2',
      checklist: [
        {
          name: 'Task 1',
          checked: true,
        },
        {
          name: 'Task 2',
          checked: false,
        },
        {
          name: 'Task 3',
          checked: true,
        },
      ],
    },
  ];
  const [visible, setVisible] = useCollapse<boolean>(false);
  return (
    <div className='flex flex-col gap-2 mt-5'>
        <div className='flex items-center gap-x-2'>
          <SquareCheckBig color={color} className='mt-[2px] h-5 w-5 opacity-40' />
          <Typography.Text className='text-base font-semibold'>Check list</Typography.Text>
        </div>
      <div className='flex flex-col px-6 gap-y-4'>
        {list.map((item, index) => (
          <div key={index} className='flex flex-col gap-y-2 '>
            <div  className='flex items-center justify-between'>
              <div className='flex items-center gap-x-2'>
                <List color={color} className='mt-[2px] h-5 w-5 opacity-40' />
                <Typography.Text className='text-sm font-semibold'>{item.name}</Typography.Text>
              </div>
              <Button danger type='text' icon={<Trash className='w-3 h-3' />}></Button>
            </div>
            <div className='flex flex-col gap-2 pl-3'>
              {item.checklist.map((check, index) => (
                <CheckListItem key={index} title={check.name} checked={check.checked} />
              ))}
            </div>
          </div>
        ))}
        {!visible ? (
          <div className='flex'>
            <Button
              onClick={() => setVisible(true)}
              icon={<Plus className='w-3 h-3' />}
              type='text'
              className='flex items-center'
            ></Button>
          </div>
        ) : (
          <div className='flex items-center ml-6 gap-x-2'>
            <Input placeholder='Enter task' className='bg-white' />
            <Button icon={<Plus className='w-3 h-3 mt-1' />} type='primary' className='w-[90px]'>
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
    </div>
  );
};

export default CheckList;

const CheckListItem = ({ title, checked }: { title: string; checked: boolean }) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex items-center gap-x-2'>
        <Checkbox defaultChecked={checked} />
        <Input defaultValue={title} className='bg-white' />
        <Button danger type='text' icon={<Trash className='w-3 h-3' />}></Button>
      </div>
    </div>
  );
};
