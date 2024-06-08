import { Avatar, Tabs, TabsProps, Typography } from 'antd';
import Activity from '../components/activity';
import CardTable from '../components/card-table';
import useSearchParam from '@/shared/hooks/use-search-param';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';

const ProfileMember = () => {
  const [viewParam, setView] = useSearchParam(SEARCH_PARAMS.VIEW, {
    defaultValue: 'activity',
  });

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='rounded-lg bg-primary-default p-4'>
        <div className='flex items-center gap-x-4'>
          <div className='rounded-full border border-solid border-slate-400 border-opacity-40'>
            <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' size={100} />
          </div>
          <div className='flex flex-col'>
            <Typography.Text className='text-xl font-bold text-white'>Đức Duy</Typography.Text>
            <Typography.Text className='text-base text-white'>@hducduy21</Typography.Text>
          </div>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-start'>
        <Tabs
          onChange={setView}
          className='w-full'
          defaultActiveKey={viewParam}
          items={tabContent}
        />
      </div>
    </div>
  );
};

export default ProfileMember;

const tabContent: TabsProps['items'] = [
  {
    key: 'activity',
    label: 'Activity',
    children: (
      <>
        <Activity />
      </>
    ),
  },
  {
    key: 'card',
    label: 'Card',
    children: <CardTable />,
  },
];
