import {useSelector} from 'react-redux';

/**
 * @returns {{isLoading: Boolean, data: Array}}
 */
const useBusesWithStops = () => {
  return useSelector(state => state.buses_with_stops);
};

export default useBusesWithStops;
