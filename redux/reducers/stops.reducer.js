import {createSlice} from '@reduxjs/toolkit';

const stopsReducer = createSlice({
  name: 'stops',
  initialState: {
    timings: [],
    stops: [],
    isLoading: false,
  },
  reducers: {
    setStops(state, {payload}) {
      const mappedStops = payload.map((v, i) => ({
        coords: {
          latitude: v.stop.coords.latitude,
          longitude: v.stop.coords.longitude,
        },
        latitude: v.stop.coords.latitude,
        longitude: v.stop.coords.longitude,
        serial_number: v.serial_number,
        title: v.stop.title,
      }));

      return {
        timings: payload,
        stops: mappedStops,
      };
    },

    setLoading(state, {payload}) {
      state.isLoading = payload;
    },

    reverseStops(state, {payload}) {
      state.stops.sort((a, b) => {
        //if payload value is false, then sort it asc
        if (!payload) {
          console.log('asc');
          return a.serial_number - b.serial_number;
        } else {
          return b.serial_number - a.serial_number;
        }
      });

      state.timings.sort((a, b) => {
        //if payload value is false, then sort it asc
        if (!payload) {
          return a.serial_number - b.serial_number;
        } else {
          return b.serial_number - a.serial_number;
        }
      });
    },

    reset() {
      return {
        timings: [],
        stops: [],
        isLoading: false,
      };
    },
  },
});

export const {setStops, setLoading, reverseStops, reset} = stopsReducer.actions;

export default stopsReducer.reducer;
