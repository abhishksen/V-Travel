import {useSelector} from 'react-redux';

/**
 * @returns {{isLoading: Boolean, data: Array}}
 */
const useBuses = () => {
  return useSelector(state => state.buses);
};

export default useBuses;
