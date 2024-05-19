import useGetPath from '@/shared/hooks/use-get-path';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Divider } from 'antd';

import { Link } from 'react-router-dom';

/**
 *
 * @returns SubHeader component
 * @author Duc Nguyen
 */

type SubHeaderType = 'normal' | 'workspace' | 'project';
const SubHeader = ({ type }: { type?: SubHeaderType }) => {
  const { path } = useGetPath();

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
    </>
  );
};

export default SubHeader;
