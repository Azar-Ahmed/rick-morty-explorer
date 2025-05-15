import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../features/characters/charactersSlice';
import locationsReducer from '../features/locations/locationsSlice';
import episodesReducer from '../features/episodes/episodesSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    locations: locationsReducer,
    episodes: episodesReducer
  }
});
export default store;