import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LocationCard = ({ location }) => (
  <Card className="mb-3">
    <Card.Body>
      <Card.Title>
        <Link to={`/locations/${location.id}`}>{location.name}</Link>
      </Card.Title>
      <Card.Text>
        {location.type} — {location.dimension}
      </Card.Text>
      <Card.Text>
        Residents: {location.residents.length}
      </Card.Text>
    </Card.Body>
  </Card>
);
export default LocationCard;