import { tsmAxios } from '@/configs/axios';
import { Button, Divider, Form, List, Typography } from 'antd';
import type { SearchProps } from 'antd/es/input';
import { Input } from 'antd/lib';
import { useEffect, useState } from 'react';

const BackgroundProject = ({
  setTemplate,
  setBackgroundImage,
}: {
  setTemplate: (value: React.SetStateAction<TSMTemplateRequest>) => void;
  setBackgroundImage: (backgroundUnsplash: React.SetStateAction<string>) => void;
}) => {
  const [listBackground, setListBackground] = useState<UnsplashResponse[]>([]);
  const [backgroundSearch, setBackgroundSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const { data } = await tsmAxios.get<UnsplashResponse[]>(
          'unsplash/photos?page=1&per_page=5'
        );
        setListBackground(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBackground();
  }, []);

  const fetchBackgroundWithoutQuery = async () => {
    try {
      const response = await tsmAxios.get<UnsplashResponse[]>('unsplash/photos?page=1&per_page=5');
      setListBackground((res) => [...res, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBackground = async (query: string) => {
    try {
      const response = await tsmAxios.get<UnsplashResponse[]>(
        `unsplash/photos?query=${query}&page=${page}&per_page=5`
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

  const setBackground = (backgroundUnsplash: UnsplashResponse) => {
    setBackgroundImage(backgroundUnsplash.urls.regular);
    setTemplate((prev) => ({
      ...prev,
      imageUnsplashId: backgroundUnsplash.id,
      project: {
        ...prev.project,
        background: backgroundUnsplash.id,
      },
    }));
  };

  return (
    <div className='my-4 w-full'>
      <div className='mx-auto mb-2 w-full transition-transform'>
        <Typography.Text className='text-base font-semibold'>
          Choose a background for your project
        </Typography.Text>
      </div>

      <div className='w-full'>
        <Form layout='vertical'>
          <Form.Item label='Wallpaper'>
            <div>
              <Input.Search
                value={backgroundSearch}
                onChange={(e) => {
                  setBackgroundSearch(e.target.value);
                }}
                placeholder='Nature, building, ...'
                onSearch={onSearch}
              />
            </div>
          </Form.Item>
        </Form>

        <List
          className='w-full'
          grid={{
            gutter: 16,
            column: 5,
          }}
          loadMore={loadMore}
          dataSource={listBackground}
          renderItem={(item) => (
            <div
              className='relative mb-3 h-[100px] w-full cursor-pointer px-3 hover:brightness-125'
              onClick={() => setBackground(item)}
            >
              <img
                src={item.urls.small}
                alt='background'
                className='h-full w-full rounded object-cover'
              />
            </div>
          )}
        />

        <Divider className='my-1' />
      </div>
    </div>
  );
};

export default BackgroundProject;
