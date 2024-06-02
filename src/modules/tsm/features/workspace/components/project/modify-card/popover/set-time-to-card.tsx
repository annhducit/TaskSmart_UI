import { DATE_FORMAT } from '@/shared/constant/date';
import { Button, DatePicker, Select, Typography } from 'antd';

/**
 *
 * @returns   SetTimeToCard component
 * @author Duc Nguyen
 */
const SetTimeToCard = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <Typography.Text className='text-center text-base font-semibold'>Set time</Typography.Text>
      <DatePicker.RangePicker
        format={{
          format: DATE_FORMAT,
          type: 'mask',
        }}
        showTime
        onChange={(value, dateString) => {
          console.log('Selected Time: ', value);
          console.log('Formatted Selected Time: ', dateString);
        }}
      />
      <div className='mt-1 flex items-center justify-between'>
        <div className='flex flex-col gap-y-1'>
          <Typography.Text className='text-xs font-normal'>Set up reminders</Typography.Text>
          <Select
            allowClear
            defaultValue='5 minutes before'
            options={[
              { value: '5 minutes before', label: '5 minutes before' },
              { value: '10 minutes before', label: '10 minutes before' },
              { value: '15 minutes before', label: '15 minutes before' },
              { value: '30 minutes before', label: '30 minutes before' },
              { value: '1 hour before', label: '1 hour before' },
              { value: '2 hours before', label: '2 hours before' },
              { value: '1 day before', label: '1 day before' },
            ]}
            className='w-[200px]'
          />
          <Typography.Text className='mt-1 w-56 text-xs font-normal opacity-40'>
            Reminder will be sent to all members of the card
          </Typography.Text>
        </div>
      </div>
      <Button type='primary' className='ml-auto w-[90px]'>
        Save
      </Button>
    </div>
  );
};

export default SetTimeToCard;
