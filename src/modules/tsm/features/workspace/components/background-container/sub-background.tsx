import { tsmAxios } from '@/configs/axios';
import { listColor } from '@/shared/data';
import { Button, Divider, List, Typography } from 'antd';
import type { SearchProps } from 'antd/es/input';
import { Input } from 'antd/lib';
import { Check } from 'lucide-react';
import { useState } from 'react';

const SubBackgroundModal = ({
  handleChangeBackground,
  handleChangeBackgroundColor,
  color,
  defaultBackgrounds,
}: {
  handleChangeBackground: (item: UnsplashResponse) => void;
  handleChangeBackgroundColor: (color: string) => void;
  color: string;
  defaultBackgrounds: UnsplashResponse[];
}) => {
  const [listBackground, setListBackground] = useState<UnsplashResponse[]>(defaultBackgrounds);
  const [backgroundSearch, setBackgroundSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const fetchBackgroundWithoutQuery = async () => {
    try {
      const response = await tsmAxios.get<UnsplashResponse[]>('unsplash/photos?page=1&per_page=8');
      setListBackground((res) => [...res, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBackground = async (query: string) => {
    try {
      const response = await tsmAxios.get<UnsplashResponse[]>(
        `unsplash/photos?query=${query}&page=${page}&per_page=8`
      );
      if (page === 1) setListBackground(response.data);
      else setListBackground((res) => [...res, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadMore = () => {
    if (backgroundSearch) {
      fetchBackground(backgroundSearch);
      setPage((pre) => pre + 1);
    } else {
      fetchBackgroundWithoutQuery();
    }
  };

  const loadMore = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>Load more</Button>
    </div>
  );

  const onSearch: SearchProps['onSearch'] = (value, _e, _info) => {
    if (value) {
      fetchBackground(value);
      setPage(2);
    }
  };

  return (
    <>
      <div className='mx-auto mb-2 w-[9rem] transition-transform'>
        <Typography.Text className='text-base font-semibold'>Project background</Typography.Text>
      </div>

      <div className=''>
        <Typography.Text className='text-sm'>Wallpaper</Typography.Text>
        <div>
          <Input.Search
            value={backgroundSearch}
            onChange={(e) => {
              setBackgroundSearch(e.target.value);
            }}
            placeholder='Search image ...'
            onSearch={onSearch}
          ></Input.Search>
        </div>
        <div className='mb-2 mt-1 flex max-h-[400px] w-[320px] flex-wrap items-center gap-2 overflow-y-scroll'>
          <List
            grid={{ column: 4 }}
            loadMore={loadMore}
            dataSource={listBackground}
            renderItem={(item) => (
              <div
                className='ml-[auto] mr-[auto] mt-2 h-[40px] w-[64px] cursor-pointer rounded transition-all hover:brightness-125'
                onClick={() => handleChangeBackground(item)}
              >
                <img
                  src={item.urls.small}
                  alt='background'
                  className='h-full w-full rounded object-cover'
                />
              </div>
            )}
          />
        </div>
        <Divider className='my-1' />
        <Typography.Text className='text-sm'>Color</Typography.Text>
        <div className='mt-1 flex w-[320px] flex-wrap items-center gap-2'>
          {listColor.map((item) => (
            <div
              onClick={() => handleChangeBackgroundColor(item.color)}
              style={{
                backgroundColor: item.color,
              }}
              key={item.id}
              className={`relative h-[32px] w-[40px] cursor-pointer rounded transition-all hover:brightness-125`}
            >
              {item.color === color && (
                <Check className='absolute right-3 top-2 h-4 w-4 text-white' />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubBackgroundModal;
