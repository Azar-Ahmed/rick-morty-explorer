import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCharacters, fetchCharacterById } from '../../api/rickAndMortyAPI';

// Async thunks
export const loadCharacters = createAsyncThunk(
  'characters/loadCharacters',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchCharacters(params);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loadCharacter = createAsyncThunk(
  'characters/loadCharacter',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchCharacterById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    list: [],
    page: 1,
    totalPages: null,
    filters: {},
    search: '',
    status: 'idle',
    error: null,
    current: null,
    currentStatus: 'idle',
    currentError: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    nextPage(state) {
      if (state.page < state.totalPages) state.page += 1;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadCharacters.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.meta.arg.page > 1
          ? state.list.concat(action.payload.results)
          : action.payload.results;
        state.totalPages = action.payload.info.pages;
      })
      .addCase(loadCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loadCharacter.pending, state => {
        state.currentStatus = 'loading';
        state.currentError = null;
      })
      .addCase(loadCharacter.fulfilled, (state, action) => {
        state.currentStatus = 'succeeded';
        state.current = action.payload;
      })
      .addCase(loadCharacter.rejected, (state, action) => {
        state.currentStatus = 'failed';
        state.currentError = action.payload;
      });
  }
});

export const { setSearch, setFilters, nextPage } = charactersSlice.actions;
export default charactersSlice.reducer;

