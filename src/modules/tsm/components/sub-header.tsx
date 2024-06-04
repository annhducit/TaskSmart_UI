import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import useGetPath from '@/shared/hooks/use-get-path';
import useSearchParam from '@/shared/hooks/use-search-param';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Divider } from 'antd';
import { UserPlus } from 'lucide-react';

import { Link } from 'react-router-dom';
import { ModifyMember } from '../features/workspace/components/project/modify-member';

/**
 *
 * @returns SubHeader component
 * @author Duc Nguyen
 */

const SubHeader = () => {
  const { path } = useGetPath();

  const isProject = path.includes('project');

  const [, setModal] = useSearchParam(SEARCH_PARAMS.MODAL);

  return (
    <>
      <header className='flex items-center justify-between bg-transparent  px-4 py-[6px] pl-6 backdrop:fill-transparent'>
        <div className='flex items-center justify-between bg-transparent'>
          <Breadcrumb className='bg-transparent'>
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
        {isProject && (
          <Button
            type='primary'
            onClick={() => setModal(SEARCH_PARAMS_VALUE.ADD_MEMBER)}
            icon={<UserPlus size='14' />}
          >
            Share
          </Button>
        )}
      </header>
      <Divider className='my-[1px]' />
      <ModifyMember />
    </>
  );
};

export default SubHeader;
