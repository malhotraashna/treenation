import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const DEFAULT_REQUEST_COUNTER = '50';

const getRequestCounterValue = (): number => {
  return parseInt(localStorage.getItem('requestCounter') ?? DEFAULT_REQUEST_COUNTER);
};

const initialState = {
  status: 'idle',
  counter: getRequestCounterValue()
};

export const setRequestCounter = createAsyncThunk('request/setRequestCounter', (counter: number) => {
  localStorage.setItem('requestCounter', counter.toString());
  return counter;
});

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setRequestStatus: (state, action) => {
      state.status = action.payload;
    },
    updateRequestCounter: (state, action) => {
      state.counter = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(setRequestCounter.fulfilled, (state, action) => {
        state.counter = action.payload;
      });
  }
});

export default requestSlice.reducer;

// actions
export const { setRequestStatus, updateRequestCounter } = requestSlice.actions;
