import { DATE_TIME_FORMAT } from '@/shared/constant/date';
import { Button, DatePicker, Typography } from 'antd';

/**
 *
 * @returns   SetTimeToCard component
 * @author Duc Nguyen
 */
const SetTimeToCard = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <Typography.Text className='text-center text-base font-semibold'>Set time</Typography.Text>
      <DatePicker
        format={{
          format: DATE_TIME_FORMAT,
          type: 'mask',
        }}
        showTime
        onChange={(value, dateString) => {
          console.log('Selected Time: ', value);
          console.log('Formatted Selected Time: ', dateString);
        }}
      />

      <Button type='primary' className='ml-auto w-[90px]'>
        Save
      </Button>
    </div>
  );
};

export default SetTimeToCard;
