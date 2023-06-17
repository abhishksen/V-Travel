import {useEffect, useState} from 'react';

import useBusStatus from './useBusStatus';
import useFetchStops from './useFetchStops';
import {haversine} from '../utils/location.utils';

/**
 * @returns {{isLoading: Boolean, stops: Array, is_running: Boolean}}
 */
const useLiveStatus = (bus_number = 0) => {
  const {is_reverse, reached_stop_index, current_location, is_running} =
    useBusStatus(bus_number);
  const {stops, isLoading: isStopsLoading} = useFetchStops(bus_number);

  const [isLoading, setLoading] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    setLoading(true);
    const directedStops = reverseStops(stops, is_reverse);

    const dt = directedStops.map((v, i) => ({
      title: v.stop.title,
      status: i <= reached_stop_index ? 'completed' : 'pending',
    }));

    const data_card_index = reached_stop_index + 1;
    let formattedStops = [];

    if (stops.length === 0) {
      return;
    }

    if (data_card_index === stops.length) {
      formattedStops = [...dt, {km: '3', status: 'final'}];
    } else {
      formattedStops = [
        ...dt.slice(0, data_card_index),
        {
          distance: Number(
            haversine(
              current_location.latitude,
              current_location.longitude,
              stops[data_card_index].stop.coords.latitude,
              stops[data_card_index].stop.coords.longitude,
            ),
          ).toFixed(2),
          status: 'reaching',
        },
        ...dt.slice(data_card_index),
      ];
    }

    setdata(formattedStops);
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
