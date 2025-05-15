import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { loadLocations, setLocationSearch, nextLocationPage } from '../features/locations/locationsSlice';
import LocationCard from '../components/LocationCard';
import Loader from '../components/Loader';

const LocationsListPage = () => {
  const dispatch = useDispatch();
  const { list, status, error, page, totalPages, search } = useSelector(s => s.locations);

  useEffect(() => {
    dispatch(loadLocations({ page, name: search }));
  }, [dispatch, page, search]);

  return (
    <div className="container my-4">
      <h1>Locations</h1>
      <Form className="mb-3">
        <Row>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={e => dispatch(setLocationSearch(e.target.value))}
            />
          </Col>
        </Row>
      </Form>
      {status === 'loading' && <Loader />}
      {status === 'failed' && <p className="text-danger">{error}</p>}
      <Row>
        {list.map(loc => (
          <Col key={loc.id} xs={12} md={6} lg={4}>
            <LocationCard location={loc} />
          </Col>
        ))}
      </Row>
      {status === 'succeeded' && page < totalPages && (
        <div className="text-center my-4">
          <Button onClick={() => dispatch(nextLocationPage())}>Load More</Button>
        </div>
      )}
    </div>
  );
};
export default LocationsListPage;