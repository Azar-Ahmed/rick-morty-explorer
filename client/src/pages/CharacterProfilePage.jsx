import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCharacter } from '../features/characters/charactersSlice';
import Loader from '../components/Loader';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { fetchLocationByUrl, fetchEpisodeByUrl } from '../api/rickAndMortyAPI';

const CharacterProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, currentStatus, currentError } = useSelector(state => state.characters);
  const [originInfo, setOriginInfo] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [episodeNames, setEpisodeNames] = useState([]);

  useEffect(() => {
    dispatch(loadCharacter(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (current && current.origin.url) {
      fetchLocationByUrl(current.origin.url).then(res => setOriginInfo(res.data));
    }
    if (current && current.location.url) {
      fetchLocationByUrl(current.location.url).then(res => setLocationInfo(res.data));
    }
    if (current) {
      Promise.all(
        current.episode.map(url => fetchEpisodeByUrl(url).then(res => res.data.name))
      ).then(names => setEpisodeNames(names));
    }
  }, [current]);

  if (currentStatus === 'loading') return <Loader />;
  if (currentStatus === 'failed') return <p className="text-danger">{currentError}</p>;

  return current ? (
    <div className="container my-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={current.image} />
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{current.name}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Status:</strong> {current.status}</ListGroup.Item>
                <ListGroup.Item><strong>Species:</strong> {current.species}</ListGroup.Item>
                <ListGroup.Item><strong>Gender:</strong> {current.gender}</ListGroup.Item>
                <ListGroup.Item><strong>Type:</strong> {current.type || 'N/A'}</ListGroup.Item>
                <ListGroup.Item>
                  <strong>Origin:</strong> {current.origin.name}
                  {originInfo && ` — ${originInfo.dimension} (${originInfo.residents.length} residents)`}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Location:</strong> {current.location.name}
                  {locationInfo && ` — ${locationInfo.dimension} (${locationInfo.residents.length} residents)`}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Episodes:</strong>
                  <ul className="mb-0">
                    {episodeNames.map((name, idx) => (
                      <li key={idx}>{name}</li>
                    ))}
                  </ul>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  ) : null;
};

export default CharacterProfilePage;
