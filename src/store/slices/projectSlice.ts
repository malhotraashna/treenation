/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '../../services/services';
import { ProjectInterface } from '../../type';
import { setRequestCounter, setRequestStatus } from './requestSlice';

interface initialStateInterface {
  all: ProjectInterface[];
  currentProjectId: string | undefined;
  error: string;
}

const initialState: initialStateInterface = {
  all: [],
  currentProjectId: '',
  error: ''
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (arg, { getState, dispatch }) => {
  dispatch(setRequestStatus('loading'));
  const response = await services.getProjects();
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

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProjectId = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.all = action.payload?.data;
        // helps to maintain current project when navigating back
        if (!state.currentProjectId) {
          state.currentProjectId = action.payload?.data[0]?.id;
        }
        state.error = '';
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.error = action?.error?.message ?? 'Something went wrong!';
      });
  }
});

export default projectSlice.reducer;

// actions
export const { setCurrentProject } = projectSlice.actions;
