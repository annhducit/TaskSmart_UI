import useGetPath from '@/shared/hooks/use-get-path';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Divider, Tabs, TabsProps, Typography } from 'antd';
import { Link } from 'react-router-dom';

/**
 *
 * @returns SubHeader component
 * @author Duc Nguyen
 */

type SubHeaderType = 'normal' | 'workspace' | 'project';
const SubHeader = ({ type }: { type?: SubHeaderType }) => {
  const { path, pageName } = useGetPath();

  return (
    <>
      <header className='border-b-slate-500 bg-white px-4 py-2 pl-6'>
        <div className='flex items-center justify-between'>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/'>
                <HomeOutlined />
              </Link>
            </Breadcrumb.Item>
            {path?.slice(1).map((segment, index) => (
              <Breadcrumb.Item key={index}>
                <Link
                  to={`/${path.slice(0, index + 1).join('/')}`}
                  className='font-semibold capitalize'
                >
                  {segment}
                </Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      </header>
      <Divider className='my-[1px]' />
      <div className='relative'>
        {pageName === 'project' && (
          <div>
            <HeaderProject />
          </div>
        )}
        <Divider className='absolute bottom-3 my-1' />
      </div>
    </>
  );
};

export default SubHeader;

const HeaderProject = () => {
  return (
    <>
      <header className='border-b-slate-500 bg-white px-4 pl-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-start gap-x-6'>
            <Typography.Text className='mt-[10px] text-[16px] font-bold'>
              Double D Thesis
            </Typography.Text>
            <Tabs defaultActiveKey='2' items={items} />
          </div>
          <div className='flex items-center'></div>
        </div>
      </header>
    </>
  );
};

const items: TabsProps['items'] = [
  { key: '1', label: 'Project' },
  { key: '2', label: 'Table' },
  { key: '3', label: 'Calendar' },
  { key: '4', label: 'Karban' },
];
