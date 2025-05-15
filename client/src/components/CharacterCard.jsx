import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => (
  <Card className="mb-3">
    <Link to={`/characters/${character.id}`}>
      <Card.Img variant="top" src={character.image} />
    </Link>
    <Card.Body>
      <Card.Title>
        <Link to={`/characters/${character.id}`}>{character.name}</Link>
      </Card.Title>
      <Card.Text>{character.status} - {character.species}</Card.Text>
    </Card.Body>
  </Card>
);

export default CharacterCard;

