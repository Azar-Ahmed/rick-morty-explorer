import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => (
  <div className="d-flex justify-content-center my-4">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default Loader;