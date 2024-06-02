/**
 *
 * @returns  AddLabelToCard component
 * @author Duc Nguyen
 */

import { Button, Checkbox, ColorPicker, Typography } from 'antd';

const AddLabelToCard = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <Typography.Text className='text-center text-base font-semibold'>Add label</Typography.Text>
      {listColor.map((item) => (
        <LabelItem key={item.id} color={item.color} />
      ))}
      <Button type='default' className='mt-2 w-full bg-slate-200'>
        Save
      </Button>
    </div>
  );
};

export default AddLabelToCard;

const LabelItem = (props: { color: string }) => {
  return (
    <div className='flex items-center gap-x-2'>
      <Checkbox />
      <div
        className='h-8 w-[170px] rounded'
        style={{
          backgroundColor: props.color,
        }}
      />
      <ColorPicker defaultValue={props.color} />
    </div>
  );
};

const listColor = [
  {
    id: 1,
    color: '#7f77f1',
  },
  {
    id: 2,
    color: '#6985ff',
  },
  {
    id: 3,
    color: '#4cc9f0',
  },
  {
    id: 4,
    color: '#f6a623',
  },
  {
    id: 5,
    color: '#519839',
  },
  {
    id: 6,
    color: '#f47060',
  },
  {
    id: 7,
    color: '#0079bf',
  },
  {
    id: 8,
    color: '#b660e0',
  },
  {
    id: 9,
    color: '#ee5e99',
  },
  {
    id: 10,
    color: '#0f9d9f',
  },
];
