/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '../../services/services';
import { SpeciesInterface, SpeciesListInterface } from '../../type';
import { setRequestCounter, setRequestStatus } from './requestSlice';

interface initialStateInterface {
  all: SpeciesListInterface[];
  currentSpecies: SpeciesInterface;
  error: string;
}

const initialState: initialStateInterface = {
  all: [],
  currentSpecies: {},
  error: ''
};

export const fetchSpecies = createAsyncThunk('species/fetchSpecies', async (projectId: string, { getState, dispatch }) => {
  dispatch(setRequestStatus('loading'));
  const response = await services.getSpecies(projectId);
  // update status
  dispatch(setRequestStatus('idle'));
  const currentState: any = getState();
  if (!response?.isFromCache) {
    // update request counter
    void dispatch(setRequestCounter(currentState.request.counter - 1));
  }
  if (response?.error) {
    throw new Error(response.error);
  }
  return response;
});

export const fetchSpeciesDetails = createAsyncThunk('species/fetchSpeciesDetails', async (speciesId: string, { getState, dispatch }) => {
  dispatch(setRequestStatus('loading'));
  const response = await services.getSpeciesDetails(speciesId);
  // update status
  dispatch(setRequestStatus('idle'));
  const currentState: any = getState();
  if (!response?.isFromCache) {
    // update request counter
    void dispatch(setRequestCounter(currentState.request.counter - 1));
  }
  if (response?.error) {
    throw new Error(response.error);
  }
  return response;
});

const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.all = action.payload?.data;
        state.error = '';
      })
      .addCase(fetchSpecies.rejected, (state, action) => {
        state.error = action?.error?.message ?? 'Something went wrong!';
      })
      .addCase(fetchSpeciesDetails.fulfilled, (state, action) => {
        state.currentSpecies = action.payload?.data;
        state.error = '';
      })
      .addCase(fetchSpeciesDetails.rejected, (state, action) => {
        state.error = action?.error?.message ?? 'Something went wrong!';
      });
  }
});

export default speciesSlice.reducer;
