import {useSelector, useDispatch} from 'react-redux';
import {
  setDest as setDestAction,
  setSource as setsrcAction,
} from '../redux/reducers/searchReducer';

const useSearchData = () => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.search);

  const setDest = v => dispatch(setDestAction(v));
  const setSource = v => dispatch(setsrcAction(v));

  return {
    data,
    setDest,
    setSource,
  };
};

export default useSearchData;
