import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { loadEpisodes, setEpisodeSearch, nextEpisodePage } from '../features/episodes/episodesSlice';
import EpisodeCard from '../components/EpisodeCard';
import Loader from '../components/Loader';

const EpisodesListPage = () => {
  const dispatch = useDispatch();
  const { list, status, error, page, totalPages, search } = useSelector(s => s.episodes);

  useEffect(() => {
    dispatch(loadEpisodes({ page, name: search }));
  }, [dispatch, page, search]);

  return (
    <div className="container my-4">
      <h1>Episodes</h1><Form className="mb-3">
        <Row>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={e => dispatch(setEpisodeSearch(e.target.value))}
            />
          </Col>
        </Row>
      </Form>
      {status === 'loading' && <Loader />}
      {status === 'failed' && <p className="text-danger">{error}</p>}
      <Row>
        {list.map(ep => (
          <Col key={ep.id} xs={12} md={6} lg={4}>
            <EpisodeCard episode={ep} />
          </Col>
        ))}
      </Row>
      {status === 'succeeded' && page < totalPages && (
        <div className="text-center my-4">
          <Button onClick={() => dispatch(nextEpisodePage())}>Load More</Button>
        </div>
      )}
    </div>
  );
};
export default EpisodesListPage;