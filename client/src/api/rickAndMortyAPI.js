import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const fetchCharacters = (params) => instance.get('/character', { params });
export const fetchCharacterById = (id) => instance.get(`/character/${id}`);
export const fetchLocationByUrl = (url) => axios.get(url);
export const fetchEpisodeByUrl = (url) => axios.get(url);

export default instance;