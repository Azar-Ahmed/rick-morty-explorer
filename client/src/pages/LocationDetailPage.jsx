import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadLocation } from '../features/locations/locationsSlice';
import Loader from '../components/Loader';
import { Row, Col, Card } from 'react-bootstrap';
import { fetchCharacterById } from '../api/rickAndMortyAPI';

const LocationDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, currentStatus, currentError } = useSelector(s => s.locations);
  const [residents, setResidents] = useState([]);

  useEffect(() => { dispatch(loadLocation(id)); }, [dispatch, id]);
  useEffect(() => {
    if (current) {
      Promise.all(
        current.residents.map(url => fetchCharacterById(url.split('/').pop()).then(r => r.data))
      ).then(setResidents);
    }
  }, [current]);

  if (currentStatus === 'loading') return <Loader />;
  if (currentStatus === 'failed') return <p className="text-danger">{currentError}</p>;

  return current ? (
    <div className="container my-4">
      <h1>{current.name}</h1>
      <p><strong>Type:</strong> {current.type}</p>
      <p><strong>Dimension:</strong> {current.dimension}</p>
      <h3>Residents</h3>
      <Row>
        {residents.map(c => (
          <Col key={c.id} xs={6} md={4} lg={3} className='mt-3'>
            <Card>
              <Link to={`/characters/${c.id}`}>
                  <Card.Img src={c.image} />
              </Link>
              <Card.Body>
                <Card.Title>
                   <Link to={`/characters/${c.id}`}>{c.name}</Link>
                  </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  ) : null;
};
export default LocationDetailPage;