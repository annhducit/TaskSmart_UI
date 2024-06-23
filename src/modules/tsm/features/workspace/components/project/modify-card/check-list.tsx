import useCollapse from '@/shared/hooks/use-collapse';
import { Button, Checkbox, ConfigProvider, Input, Typography } from 'antd';
import { List, Plus, SquareCheckBig, Trash } from 'lucide-react';
import { useState } from 'react';
import useCreateCheckListGroup from '../hooks/mutation/use-create-checklist-group';
import useDeleteCheckListGroup from '../hooks/action/use-delete-checklist-group';
import useCreateChecklistItem from '../hooks/mutation/use-create-checklist-item';
import useDeleteItemChecked from '../hooks/action/use-delete-item-checked';
import useUpdateItemChecked from '../hooks/mutation/use-update-item-checked';

const CheckList = ({
  list,
  color,
  setCheckList,
}: {
  list: CheckListGroup[];
  color: string;
  setCheckList: (list: CheckListGroup[]) => void;
}) => {
  const [checkListNameCreation, setCheckListNameCreation] = useState<string>('');
  const [visible, setVisible] = useCollapse<boolean>(false);

  const [checkListItemCreation, setCheckListItemCreation] = useState<Record<string, string>>({});

  /**
   * Tanstack React Query
   */
  const { mutate: createCheckListGR, data } = useCreateCheckListGroup();
  const { mutate: createCheckListIT, data: CKitem } = useCreateChecklistItem();
  const { mutate: updateItemCheckedCK, data: IIemCK } = useUpdateItemChecked();
  const { mutate: deleteCheckListGR } = useDeleteCheckListGroup();
  const { mutate: deleteCheckListItem, data: IItem } = useDeleteItemChecked();

  const createCheckListGroup = () => {
    createCheckListGR(checkListNameCreation);
    setCheckList([...list, data as CheckListGroup]);
    setCheckListNameCreation('');
  };

  const removeListCardGroup = (id: string) => {
    deleteCheckListGR(id);
    setCheckList(list.filter((item) => item.id !== id));
  };

  const createCheckListItem = (id: string) => {
    createCheckListIT({
      listId: id,
      name: checkListItemCreation[id],
    });
    const newList = list.map((item) => {
      if (item.id === id) {
        return CKitem as CheckListGroup;
      }
      return item;
    });
    setCheckList(newList);
    setCheckListItemCreation({ ...checkListItemCreation, [id]: '' });
  };

  const updateItemChecked = (checked: boolean, listId: string, itemId: string) => {
    updateItemCheckedCK({ listId, itemId, checked });
    const newList = list.map((item) => {
      if (item.id === listId) {
        return IIemCK as CheckListGroup;
      }
      return item;
    });
    setCheckList(newList);
  };

  const deleteItemChecked = (listId: string, itemId: string) => {
    deleteCheckListItem({ listId, itemId });
    const newList = list.map((item) => {
      if (item.id === listId) {
        return IItem as CheckListGroup;
      }
      return item;
    });
    setCheckList(newList);
  };

  return (
    <div className='mt-5 flex flex-col gap-2'>
      <div className='flex items-center gap-x-2'>
        <SquareCheckBig color={color} className='mt-[2px] h-5 w-5 opacity-40' />
        <Typography.Text className='text-base font-semibold '>Check list</Typography.Text>
      </div>
      <div className='flex flex-col gap-y-4 px-6'>
        {list.map((item, index) => (
          <div key={index} className='flex flex-col gap-y-2 '>
            <div className='flex items-center justify-between hover:text-base'>
              <div className='flex items-center gap-x-2'>
                <List color={color} className='mt-[2px] h-5 w-5 opacity-40' />
                <span className='font-semibold'>{item.name}</span>
              </div>
              <Button
                onClick={() => {
                  removeListCardGroup(item.id);
                }}
                danger
                type='text'
                icon={<Trash className='h-3 w-3' />}
              ></Button>
            </div>
            <div className='flex flex-col gap-2 pl-3'>
              {item?.checkList.map((check, index) => (
                <CheckListItem
                  key={index}
                  itemId={check.id}
                  listId={item.id}
                  title={check.name}
                  color={color}
                  checked={check.checked}
                  updateChecked={updateItemChecked}
                  deleteItem={deleteItemChecked}
                />
              ))}
              <div className='flex'>
                <Checkbox disabled defaultChecked={false} />
                <div className='ml-6 flex flex-1 items-center gap-x-2'>
                  <Input
                    value={checkListItemCreation[item.id] || ''}
                    onChange={(e) => {
                      setCheckListItemCreation({
                        ...checkListItemCreation,
                        [item.id]: e.target.value,
                      });
                    }}
                    placeholder='Enter name'
                    className='bg-white'
                  />
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultBg: `${color}`,
                        },
                      },
                    }}
                  >
                    <Button
                      onClick={() => {
                        createCheckListItem(item.id);
                      }}
                      icon={<Plus className='mt-1 h-3 w-3' />}
                      className='w-[90px]'
                    ></Button>
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!visible ? (
          <div className='flex'>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: `${color}`,
                  },
                },
              }}
            >
              <Button onClick={() => setVisible(true)} className='flex items-center'>
                Create a check list group
              </Button>
            </ConfigProvider>
          </div>
        ) : (
          <div className='ml-6 flex items-center gap-x-2'>
            <Input
              value={checkListNameCreation}
              onChange={(e) => {
                setCheckListNameCreation(e.target.value);
              }}
              placeholder='Enter name'
              className='bg-white'
            />
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: `${color}`,
                  },
                },
              }}
            >
              <Button
                onClick={createCheckListGroup}
                icon={<Plus className='mt-1 h-3 w-3' />}
                className='w-[90px]'
              >
                Add
              </Button>
            </ConfigProvider>

            <Button
              onClick={() => setVisible(false)}
              type='default'
              className='0 w-[90px] bg-red-500 text-white'
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckList;

const CheckListItem = ({
  itemId,
  listId,
  title,
  checked,
  color,
  updateChecked,
  deleteItem,
}: {
  itemId: string;
  listId: string;
  title: string;
  checked: boolean;
  color: string;
  updateChecked: (checked: boolean, listId: string, itemId: string) => void;
  deleteItem: (listId: string, itemId: string) => void;
}) => {
  return (
    <div className='flex flex-col gap-y-2 '>
      <div className='flex items-center gap-x-5 hover:text-base'>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: color,
            },
          }}
        >
          <Checkbox
            defaultChecked={checked}
            onChange={(e) => {
              updateChecked(e.target.checked, listId, itemId);
            }}
          />
        </ConfigProvider>

        <span className='min-w-20 flex-1'>{title}</span>
        {/* <ConfigProvider
          theme={{
            components: {
              Input: {
                activeBorderColor: color,
                hoverBorderColor: color,
              }
            },
          }}
        ><Input defaultValue={title} disabled className='bg-white' /></ConfigProvider> */}

        <Button
          onClick={() => {
            deleteItem(listId, itemId);
          }}
          danger
          type='text'
          icon={<Trash className='h-3 w-3' />}
        ></Button>
      </div>
    </div>
  );
};
