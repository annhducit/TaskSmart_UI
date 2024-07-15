import { tsmAxios } from '@/configs/axios';
import { Button, Divider, Form, List, Typography } from 'antd';
import { SearchProps } from 'antd/es/input';
import { Input } from 'antd/lib';
import { useEffect, useState } from 'react';

type Context = 'FIRST_STEP' | 'SECOND_STEP';
const BackgroundProject = ({
  setTemplate,
  context,
}: {
  setTemplate: (value: React.SetStateAction<TSMTemplateRequest>) => void;
  context: Context;
}) => {
  const [listBackground, setListBackground] = useState<UnsplashResponse[]>([]);
  const [backgroundSearch, setBackgroundSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const { data } = await tsmAxios.get<UnsplashResponse[]>(
          'unsplash/photos?page=1&per_page=6'
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
      const response = await tsmAxios.get<UnsplashResponse[]>('unsplash/photos?page=1&per_page=6');
      setListBackground((res) => [...res, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBackground = async (query: string) => {
    try {
      const response = await tsmAxios.get<UnsplashResponse[]>(
        `unsplash/photos?query=${query}&page=${page}&per_page=6`
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
    if (context === 'FIRST_STEP') {
      setTemplate((prev) => ({
        ...prev,
        imageUnsplashId: backgroundUnsplash.id,
      }));
    } else {
      setTemplate((prev) => ({
        ...prev,
        project: {
          ...prev.project,
          background: backgroundUnsplash.id,
        },
      }));
    }
  };

  return (
    <div className='w-full my-4'>
      <div className='w-full mx-auto mb-2 transition-transform'>
        <Typography.Text className='text-base font-semibold'>
          {context === 'FIRST_STEP'
            ? 'Choose a background for your template'
            : 'Choose a background for your project'}
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
            column: 6,
          }}
          loadMore={loadMore}
          dataSource={listBackground}
          renderItem={(item) => (
            <div
              className='relative w-full cursor-pointer h-52 hover:brightness-125'
              onClick={() => setBackground(item)}
            >
              <img
                src={item.urls.small}
                alt='background'
                className='object-cover w-full h-full rounded'
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
