import {useSelector, useDispatch} from 'react-redux';
import {
  setDest as setDestAction,
  setSource as setsrcAction,
  setResults,
  reset,
} from '../redux/reducers/internalSearchData.reducer';

const useSearchData = () => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.internalSearchData);

  const setDest = v => dispatch(setDestAction(v));
  const setSource = v => dispatch(setsrcAction(v));
  const setSearchResults = v => dispatch(setResults(v));
  const setreset = () => dispatch(reset());

  return {
    data,
    setDest,
    setSource,
    setSearchResults,
    setreset,
  };
};

export default useSearchData;
