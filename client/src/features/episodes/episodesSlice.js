import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/rickAndMortyAPI';

export const loadEpisodes = createAsyncThunk(
  'episodes/loadEpisodes',
  async (params, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/episode', { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loadEpisode = createAsyncThunk(
  'episodes/loadEpisode',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/episode/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const episodesSlice = createSlice({
  name: 'episodes',
  initialState: {
    list: [], page: 1, totalPages: null,
    search: '', status: 'idle', error: null,
    current: null, currentStatus: 'idle', currentError: null
  },
  reducers: {
    setSearch(state, action) { state.search = action.payload; state.page = 1; },
    nextPage(state) { if (state.page < state.totalPages) state.page += 1; }
  },
  extraReducers: builder => {
    builder
      .addCase(loadEpisodes.pending, state => { state.status = 'loading'; state.error = null; })
      .addCase(loadEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.meta.arg.page > 1
          ? state.list.concat(action.payload.results)
          : action.payload.results;
        state.totalPages = action.payload.info.pages;
      })
      .addCase(loadEpisodes.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(loadEpisode.pending, state => { state.currentStatus = 'loading'; state.currentError = null; })
      .addCase(loadEpisode.fulfilled, (state, action) => { state.currentStatus = 'succeeded'; state.current = action.payload; })
      .addCase(loadEpisode.rejected, (state, action) => { state.currentStatus = 'failed'; state.currentError = action.payload; });
  }
});
export const { setSearch: setEpisodeSearch, nextPage: nextEpisodePage } = episodesSlice.actions;
export default episodesSlice.reducer;
