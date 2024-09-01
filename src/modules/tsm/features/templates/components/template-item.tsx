import { Divider, Tag, Typography } from 'antd';
import Logo from '@/shared/components/logo';
import { useNavigate } from 'react-router-dom';
import { Copy, Eye } from 'lucide-react';
import { useSelector } from '@/stores';

const TemplateItem = ({ template }: { template: TSMTemplate }) => {
  const navigate = useNavigate();

  const { btnColor } = useSelector((state) => state.theme);

  return (
    <div
      onClick={() => {
        navigate(`../../../tsm/template/${template.id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className='flex cursor-pointer flex-col rounded-lg bg-white shadow-xl transition-all'
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.3)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0px 0px 8px rgba(0,0,0,0.1)')}
    >
      <div className='relative h-[150px] rounded-t'>
        <img
          className='h-full w-full rounded-t-lg object-cover'
          src={
            template.image?.urls?.regular ||
            'https://images.unsplash.com/photo-1720442238401-8436967064f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MjM3MTF8MHwxfGFsbHx8fHx8fHx8fDE3MjA5MjI1NDl8&ixlib=rb-4.0.3&q=85'
          }
          alt='template'
        />
        <div
          style={{
            borderColor: btnColor,
          }}
          className={`absolute right-2 top-2 rounded border-[3px] border-solid bg-white p-2`}
        >
          <Logo type='SINGLE_LOGO' size='w-6 h-6' />
        </div>
      </div>
      <div className='flex flex-col gap-y-1 p-3 py-4'>
        <div className='flex items-center justify-between'>
          <Typography.Text className='block text-lg font-semibold'>{template.name}</Typography.Text>
          <Tag color={btnColor}>{template.category.name}</Tag>
        </div>
        <Divider className='my-[1px]' />
        <Typography.Text className='block text-xs font-normal'>
          by <span className='font-semibold text-primary-default'>Tasksmart</span> team
        </Typography.Text>
        <Typography.Text className='line-clamp-2 block truncate text-sm font-normal'>
          {template.description}
        </Typography.Text>
        <div className='flex items-center justify-end gap-x-2 pt-1 opacity-65'>
          <div className='flex items-center gap-x-[2px]'>
            <Copy className='h-3 w-3' color={btnColor} />
            <Typography.Text className='text-xs font-semibold text-[#455570]'>
              {template.useCount}
            </Typography.Text>
          </div>
          <div className='flex items-center gap-x-[2px]'>
            <Eye className='h-3 w-3' color={btnColor} />
            <Typography.Text className='text-xs font-semibold text-[#455570]'>
              {template.viewCount}
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateItem;
