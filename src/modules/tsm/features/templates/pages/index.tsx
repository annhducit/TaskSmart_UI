import { Divider, Empty, Spin, Typography } from 'antd';
import TemplateItem from '../components/template-item';
import useGetTemplates from '../hooks/use-get-templates';
import useSearchParam from '@/shared/hooks/use-search-param';
import { useEffect } from 'react';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useGetCategory from '@/modules/tsm/components/hooks/use-get-category';
import { useSelector } from '@/store';
import useSearchTemplate from '../../admin/hooks/query/use-search-template';
import SearchParam from '@/shared/components/search-param';

const Template = () => {
  const [, , categoryId] = useSearchParam(SEARCH_PARAMS.CATEGORY);
  const [, , keyword] = useSearchParam(SEARCH_PARAMS.KEYWORD);

  const { data: category } = useGetCategory(categoryId as string);
  const {
    data: templates,
    isLoading,
    refetch,
  } = useGetTemplates({
    categoryId,
  });

  const { data: result, isPending: isLoadingSearch } = useSearchTemplate(keyword as string);

  useEffect(() => {
    refetch();
  }, [categoryId]);

  const { btnColor } = useSelector((state) => state.theme);
  return (
    <>
      <div className='flex flex-col px-2 pb-6 gap-y-2'>
        <div className='flex items-center justify-between'>
          <Typography.Title level={4}>
            {categoryId ? `${category?.name} Templates` : 'All Templates'}
          </Typography.Title>
          <div>
            <SearchParam.Keyword />
          </div>
        </div>
        <Divider className='my-[1px]' />
        {!categoryId && (
          <>
            {keyword && result && result.length > 0 && (
              <>
                <div className='flex flex-col gap-y-8'>
                  <TemplateSection title='Search Result' templates={result} />
                </div>
                {isLoadingSearch && <Spin />}
              </>
            )}
            {!keyword && (
              <div className='flex flex-col gap-y-8'>
                <TemplateSection
                  title={
                    <div className='flex items-center gap-x-2'>
                      <HighlightIcon color={btnColor} />
                      <Typography.Text className='text-base'>Highlight</Typography.Text>
                    </div>
                  }
                  templates={templates?.slice(0, 4) || []}
                />
                <TemplateSection
                  title={
                    <div className='flex items-center gap-x-2'>
                      <NewIcon color={btnColor} />
                      <Typography.Text className='text-base'>New</Typography.Text>
                    </div>
                  }
                  templates={templates?.slice(4, 8) || []}
                />
                {templates && <TemplateSection title='All' templates={templates} />}
              </div>
            )}
          </>
        )}

        {categoryId && (
          <>
            {keyword && result && result.length > 0 && (
              <>
                {result && result.length > 0 && (
                  <>
                    <div className='flex flex-col gap-y-8'>
                      <TemplateSection title='Search Result' templates={result} />
                    </div>
                  </>
                )}
                {isLoadingSearch && <Spin />}
              </>
            )}
            {!keyword && (
              <div className='flex flex-col gap-y-8'>
                <TemplateSection
                  title={
                    <div className='flex items-center gap-x-2'>
                      <Typography.Text className='text-base'>{category?.name}</Typography.Text>
                    </div>
                  }
                  templates={templates || []}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className='flex justify-center'>
        {isLoading && <Spin />}
        {templates?.length === 0 && <Empty description='Data empty' />}
        {keyword && (
          <>
            {result?.length === 0 && <Empty description='Not found' />}
            {isLoadingSearch && <Spin />}
          </>
        )}
      </div>
    </>
  );
};

export default Template;

const TemplateSection = ({
  title,
  templates,
}: {
  title: React.ReactNode;
  templates: TSMTemplate[];
}) => {
  return (
    <div className='flex flex-col mb-2 gap-y-2'>
      <Typography.Text className='text-base'>{title}</Typography.Text>
      <div className='grid grid-cols-4 gap-4'>
        {templates?.map((item, index) => <TemplateItem template={item} key={index} />)}
      </div>
    </div>
  );
};
const HighlightIcon = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      color={color}
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      className='size-5 '
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z'
      />
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z'
      />
    </svg>
  );
};

const NewIcon = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      color={color}
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      className='size-5 '
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z'
      />
    </svg>
  );
};
