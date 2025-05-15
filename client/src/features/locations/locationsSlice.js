import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/rickAndMortyAPI';

export const loadLocations = createAsyncThunk(
  'locations/loadLocations',
  async (params, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/location', { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loadLocation = createAsyncThunk(
  'locations/loadLocation',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/location/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    list: [], page: 1, totalPages: null,
    search: '', filters: {}, status: 'idle', error: null,
    current: null, currentStatus: 'idle', currentError: null
  },
  reducers: {
    setSearch(state, action) { state.search = action.payload; state.page = 1; },
    nextPage(state) { if (state.page < state.totalPages) state.page += 1; }
  },
  extraReducers: builder => {
    builder
      .addCase(loadLocations.pending, state => { state.status = 'loading'; state.error = null; })
      .addCase(loadLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.meta.arg.page > 1
          ? state.list.concat(action.payload.results)
          : action.payload.results;
        state.totalPages = action.payload.info.pages;
      })
      .addCase(loadLocations.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(loadLocation.pending, state => { state.currentStatus = 'loading'; state.currentError = null; })
      .addCase(loadLocation.fulfilled, (state, action) => { state.currentStatus = 'succeeded'; state.current = action.payload; })
      .addCase(loadLocation.rejected, (state, action) => { state.currentStatus = 'failed'; state.currentError = action.payload; });
  }
});
export const { setSearch: setLocationSearch, nextPage: nextLocationPage } = locationsSlice.actions;
export default locationsSlice.reducer;
