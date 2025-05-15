import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadEpisode } from '../features/episodes/episodesSlice'
import Loader from '../components/Loader'
import { Card, ListGroup, Row, Col } from 'react-bootstrap'
import { fetchCharacterById } from '../api/rickAndMortyAPI'

const EpisodeDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { current, currentStatus, currentError } = useSelector(
    (s) => s.episodes,
  )
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    dispatch(loadEpisode(id))
  }, [dispatch, id])
  useEffect(() => {
    if (current) {
      Promise.all(
        current.characters.map((url) =>
          fetchCharacterById(url.split('/').pop()).then((r) => r.data),
        ),
      ).then(setCharacters)
    }
  }, [current])

  if (currentStatus === 'loading') return <Loader />
  if (currentStatus === 'failed')
    return <p className="text-danger">{currentError}</p>

  return current ? (
    <div className="container my-4">
      <Card>
        <Card.Body>
          <Card.Title>{current.name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Air Date:</strong> {current.air_date}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Episode:</strong> {current.episode}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <h3 className="mt-4">Characters in this Episode</h3>
      <Row>
        {characters.map((c) => (
          <Col key={c.id} xs={6} md={4} lg={3} className="mt-3">
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
  ) : null
}
export default EpisodeDetailPage
