import useGetPath from '@/shared/hooks/use-get-path';
import { useSelector } from '@/stores';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Divider } from 'antd';

import { Link } from 'react-router-dom';

/**
 *
 * @returns SubHeader component
 * @author Duc Nguyen
 */

const SubHeader = () => {
  const { path } = useGetPath();

  const { btnColor } = useSelector((state) => state.theme);

  return (
    <>
      <header className='flex items-center justify-between bg-transparent px-4 py-[6px] pl-6 backdrop:fill-transparent'>
        <div className='flex items-center justify-between bg-transparent'>
          <Breadcrumb className='bg-transparent'>
            <Breadcrumb.Item>
              <Link to='/'>
                <HomeOutlined
                  style={{
                    color: btnColor,
                  }}
                />
              </Link>
            </Breadcrumb.Item>
            {path?.slice(1).map((segment, index) => (
              <Breadcrumb.Item key={index}>
                <Link
                  to={`/${path.slice(0, index + 1).join('/')}`}
                  className='font-semibold capitalize'
                  style={{ color: btnColor }}
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
