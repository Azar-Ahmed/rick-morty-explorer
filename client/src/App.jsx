import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import CharactersListPage from './pages/CharactersListPage';
import CharacterProfilePage from './pages/CharacterProfilePage';
import LocationsListPage from './pages/LocationsListPage';
import LocationDetailPage from './pages/LocationDetailPage';
import EpisodesListPage from './pages/EpisodesListPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage';

const App = () => (
  <>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<Navigate to="/characters" />} />
      <Route path="/characters" element={<CharactersListPage />} />
      <Route path="/characters/:id" element={<CharacterProfilePage />} />
      <Route path="/locations" element={<LocationsListPage />} />
      <Route path="/locations/:id" element={<LocationDetailPage />} />
      <Route path="/episodes" element={<EpisodesListPage />} />
      <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
    </Routes>
  </>
);
export default App;