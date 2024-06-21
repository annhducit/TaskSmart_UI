import { tsmAxios } from '@/configs/axios';
import useCollapse from '@/shared/hooks/use-collapse';
import { Button, Checkbox, ConfigProvider, Input, Typography } from 'antd';
import { List, Plus, SquareCheckBig, Trash } from 'lucide-react';
import { useState } from 'react';


const CheckList = ({
  cardId,
  list,
  color,
  setCheckList,
}: {
  cardId: string;
  list: CheckListGroup[];
  color: string;
  setCheckList: (list: CheckListGroup[]) => void;
}) => {
  console.log(list)
  const [checkListNameCreation, setCheckListNameCreation] = useState<string>('');
  const [visible, setVisible] = useCollapse<boolean>(false);

  const [checkListItemCreation, setCheckListItemCreation] = useState<Record<string, string>>({});

  const createCheckListGroup = () => {
    const createCheckListGroupAsync = async () => {
      try {
        const res = await tsmAxios.post(`/cards/${cardId}/checklists`, {
          name: checkListNameCreation,
        });
        console.log(res.data);
        setCheckList([...list, res.data as CheckListGroup]);
        setCheckListNameCreation('');
      } catch (error) {
        console.log(error);
      }
    };
    createCheckListGroupAsync();
  };

  const removeListCardGroup = (id: string) => {
    const removeListCardGroupAsync = async () => {
      try {
        const res = await tsmAxios.delete(`/cards/${cardId}/checklists/${id}`);
        console.log(res.data);
        setCheckList(list.filter((item) => item.id !== id));
      } catch (error) {
        console.log(error);
      }
    };
    removeListCardGroupAsync();
  };

  const createCheckListItem = (id: string) => {
    const createCheckListItemAsync = async () => {
      try {
        const res = await tsmAxios.post(`/cards/${cardId}/checklists/${id}`, {
          name: checkListItemCreation[id],
        });
        console.log(res.data);
        const newList = list.map((item) => {
          if (item.id === id) {
            return res.data as CheckListGroup;
          }
          return item;
        });
        setCheckList(newList);
        setCheckListItemCreation({...checkListItemCreation, [id]: ''});
      } catch (error) {
        console.log(error);
      }
    };
    createCheckListItemAsync();
  }

  const updateItemChecked = (checked: boolean, listId: string, itemId: string) => {
    const updateItemCheckedAsync = async () => {
      try {
        const res = await tsmAxios.patch(`/cards/${cardId}/checklists/${listId}/${itemId}`, {
          checked,
        });
        console.log(res.data);
        const newList = list.map((item) => {
          if (item.id === listId) {
            return res.data as CheckListGroup;
          }
          return item;
        });
        setCheckList(newList);
      } catch (error) {
        console.log(error);
      }
    };
    updateItemCheckedAsync();
  }

  const deleteItemChecked = (listId: string, itemId: string) => {
    const deleteItemCheckedAsync = async () => {
      try {
        const res = await tsmAxios.delete(`/cards/${cardId}/checklists/${listId}/${itemId}`);
        console.log(res.data);
        const newList = list.map((item) => {
          if (item.id === listId) {
            return res.data as CheckListGroup;
          }
          return item;
        });
        setCheckList(newList);
      } catch (error) {
        console.log(error);
      }
    };
    deleteItemCheckedAsync();
  }
  return (
    <div className='flex flex-col gap-2 mt-5'>
      <div className='flex items-center gap-x-2'>
        <SquareCheckBig color={color} className='mt-[2px] h-5 w-5 opacity-40' />
        <Typography.Text className='text-base font-semibold '>Check list</Typography.Text>
      </div>
      <div className='flex flex-col px-6 gap-y-4'>
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
                icon={<Trash className='w-3 h-3' />}
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
                <div className='flex items-center flex-1 ml-6 gap-x-2'>
                  <Input
                    value={checkListItemCreation[item.id] || ""}
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
                      onClick={() => {createCheckListItem(item.id)}}
                      icon={<Plus className='w-3 h-3 mt-1' />}
                      className='w-[90px]'
                    >
                    </Button>
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
          <div className='flex items-center ml-6 gap-x-2'>
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
                icon={<Plus className='w-3 h-3 mt-1' />}
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
  updateChecked: (checked: boolean,listId: string, itemId: string) => void;
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
          <Checkbox defaultChecked={checked} onChange={e=>{updateChecked(e.target.checked,listId, itemId)}} />
        </ConfigProvider>

        <span className='flex-1 min-w-20'>{title}</span>
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

        <Button onClick={()=>{deleteItem(listId,itemId)}} danger type='text' icon={<Trash className='w-3 h-3' />}></Button>
      </div>
    </div>
  );
};
