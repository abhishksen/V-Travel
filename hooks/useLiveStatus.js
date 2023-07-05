import {useEffect, useState} from 'react';

import useBusStatus from './useBusStatus';
import useFetchStops from './useFetchStops';
import {haversine} from '../utils/location.utils';

/**
 * @returns {{isLoading: Boolean, stops: Array, is_running: Boolean}}
 */
const useLiveStatus = (bus_number = 0) => {
  const {
    is_reverse,
    reached_stop_index,
    is_running,
    is_halted_at_stop,
    distance_km,
    time_min,
  } = useBusStatus(bus_number);
  const {stops, isLoading: isStopsLoading} = useFetchStops(bus_number);

  const [isLoading, setLoading] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    setLoading(true);
    const directedStops = reverseStops(stops, is_reverse);

    let live_data = [];

    if (is_halted_at_stop) {
      live_data = directedStops.map((v, i) => {
        return {
          title: v.stop.title,
          is_halted: reached_stop_index === i,
          stop: {
            ...v.stop,
          },
        };
      });
    } else {
      let data_card_index = reached_stop_index + 1;
      let dt = [
        ...directedStops.slice(0, data_card_index),
        {
          status: 'reaching',
          distance_km,
          time_min,
        },
        ...directedStops.slice(data_card_index),
      ];

      live_data = dt.map(v => ({title: v?.stop?.title, ...v}));
    }

    setdata(live_data);
    setLoading(false);
  }, [stops, reached_stop_index, is_reverse]);

  return {
    data,
    isLoading: isStopsLoading || isLoading,
    is_running,
  };
};

export default useLiveStatus;

function reverseStops(stops, is_reverse) {
  const newStops = [...stops];
  newStops.sort((a, b) => {
    //if is_reverse value is false, then sort it asc
    if (!is_reverse) {
      return a.serial_number - b.serial_number;
    } else {
      return b.serial_number - a.serial_number;
    }
  });

  return newStops;
}
