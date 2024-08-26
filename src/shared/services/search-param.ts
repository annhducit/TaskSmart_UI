import { SEARCH_PARAMS } from '../constant/search-param';
import useSearchParam from '../hooks/use-search-param';

/**
 * SearchParamService
 * @author Duc Nguyen
 */
const SearchParamService = {
  useId() {
    return useSearchParam<string>(SEARCH_PARAMS.ID);
  },
  useState() {
    return useSearchParam<string>(SEARCH_PARAMS.STATE);
  },
  useKeyword() {
    return useSearchParam<string>(SEARCH_PARAMS.KEYWORD);
  },
  useType() {
    return useSearchParam<string>(SEARCH_PARAMS.TYPE);
  },
};

export default SearchParamService;
