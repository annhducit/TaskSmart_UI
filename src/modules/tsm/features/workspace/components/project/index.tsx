import { Button, Input, Popover } from 'antd';
import ListCardItem from './list-card-item';
import ModifyCard from './modify-card/modify-card';
import { Plus } from 'lucide-react';
import useCollapse from '@/shared/hooks/use-collapse';
import { toast } from 'sonner';

const Project = () => {
  const [visible, setVisible] = useCollapse<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setVisible(open);
  };
  return (
    <>
      <div className='px-6'>
        <div className='flex items-start gap-x-3'>
          <ListCardItem />
          <ListCardItem />
          <Popover
            trigger='click'
            open={visible}
            onOpenChange={handleOpenChange}
            placement='bottom'
            content={
              <div className='flex w-[250px] flex-col gap-4'>
                <Input
                  placeholder='Enter list title'
                  allowClear
                  size='large'
                  className='rounded text-sm font-semibold '
                />
                <div className='ml-auto flex items-center gap-x-2'>
                  <Button
                    onClick={() => toast.success('Add list successfully!')}
                    type='primary'
                    className='w-20 rounded text-xs font-semibold'
                  >
                    Add list
                  </Button>
                  <Button
                    type='default'
                    className='w-16 rounded text-xs font-semibold'
                    onClick={() => handleOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            }
          >
            <Button
              icon={<Plus className='h-4 w-4 opacity-65' />}
              size='large'
              className='flex w-[275px] items-center rounded-xl border-none bg-[#ffffff3d] text-sm font-semibold text-white'
            >
              Add new list
            </Button>
          </Popover>
        </div>
      </div>
      <ModifyCard />
    </>
  );
};

export default Project;
