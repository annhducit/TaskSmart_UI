import { Input } from 'antd';
import { debounce } from 'lodash';
import { SearchIcon } from 'lucide-react';
import useSearchParam from '../hooks/use-search-param';
import FormItem from 'antd/lib/form/FormItem';
import { SEARCH_PARAMS } from '../constant/search-param';

const SearchParam = {
  Keyword() {
    const [, setKeyword, keyword] = useSearchParam(SEARCH_PARAMS.KEYWORD);

    return (
      <div>
        <Input
          suffix={<SearchIcon className='w-4 h-4 text-gray-400' />}
          size='middle'
          placeholder='Something...'
          defaultValue={keyword}
          onChange={debounce((e) => setKeyword(e.target.value), 500)}
          allowClear
        />
      </div>
    );
  },
};

export default SearchParam;
