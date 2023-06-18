import {useSelector} from 'react-redux';

/**
 * @returns {{isLoading: Boolean, stops: Array}}
 */
const useOnlyStops = () => {
  return useSelector(state => state.stops);
};

export default useOnlyStops;
