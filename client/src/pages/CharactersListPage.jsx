import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { loadCharacters, setSearch, setFilters, nextPage } from '../features/characters/charactersSlice';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';

const CharactersListPage = () => {
  const dispatch = useDispatch();
  const { list, status, error, page, totalPages, search, filters } = useSelector(state => state.characters);

  // Client-side filters for location and episode
  const [locationFilter, setLocationFilter] = useState('');
  const [episodeFilter, setEpisodeFilter] = useState('');

  // Fetch whenever page, search, or API filters change
  useEffect(() => {
    dispatch(loadCharacters({ page, name: search, ...filters }));
  }, [dispatch, page, search, filters]);

  // Derived options
  const uniqueLocations = useMemo(() => {
    const locs = list.map(c => c.location.name).filter(Boolean);
    return Array.from(new Set(locs));
  }, [list]);
  const uniqueEpisodeIds = useMemo(() => {
    const ids = list.flatMap(c => c.episode.map(url => url.split('/').pop()));
    return Array.from(new Set(ids));
  }, [list]);

  // Client-side filter application
  const displayedList = useMemo(() => 
    list.filter(c => {
      if (locationFilter && c.location.name !== locationFilter) return false;
      if (episodeFilter && !c.episode.some(url => url.endsWith(`/${episodeFilter}`))) return false;
      return true;
    }), [list, locationFilter, episodeFilter]
  );

  return (
    <div className="container my-4">
      <h1>Rick & Morty Characters</h1>
      <Form className="mb-3">
        <Row className="g-2">
          <Col md={3}>
            <Form.Control placeholder="Search by name" value={search} onChange={e => dispatch(setSearch(e.target.value))} />
          </Col>
          <Col md={2}>
            <Form.Select value={filters.status || ''} onChange={e => dispatch(setFilters({ status: e.target.value }))}>
              <option value="">All Status</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select value={filters.gender || ''} onChange={e => dispatch(setFilters({ gender: e.target.value }))}>
              <option value="">All Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Control placeholder="Species" value={filters.species || ''} onChange={e => dispatch(setFilters({ species: e.target.value }))} />
          </Col>
          <Col md={2}>
            <Form.Control placeholder="Type" value={filters.type || ''} onChange={e => dispatch(setFilters({ type: e.target.value }))} />
          </Col>
        </Row>
        <Row className="g-2 mt-2">
          <Col md={3}>
            <Form.Select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
              <option value="">All Locations</option>
              {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={episodeFilter} onChange={e => setEpisodeFilter(e.target.value)}>
              <option value="">All Episodes</option>
              {uniqueEpisodeIds.map(id => <option key={id} value={id}>Episode {id}</option>)}
            </Form.Select>
          </Col>
        </Row>
      </Form>
      {status === 'loading' && <Loader />}
      {status === 'failed' && <p className="text-danger">{error}</p>}
      <Row>
        {displayedList.map(c => (
          <Col key={c.id} xs={12} sm={6} md={4} lg={3}>
            <CharacterCard character={c} />
          </Col>
        ))}
      </Row>
      {status === 'succeeded' && page < totalPages && <div className="text-center my-4"><Button onClick={() => dispatch(nextPage())}>Load More</Button></div>}
    </div>
  );
};

export default CharactersListPage;
