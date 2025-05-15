import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EpisodeCard = ({ episode }) => (
  <Card className="mb-3">
    <Card.Body>
      <Card.Title>
        <Link to={`/episodes/${episode.id}`}>{episode.name}</Link>
      </Card.Title>
      <Card.Text>
        Air Date: {episode.air_date}
      </Card.Text>
      <Card.Text>
        Episode: {episode.episode}
      </Card.Text>
    </Card.Body>
  </Card>
);
export default EpisodeCard;
