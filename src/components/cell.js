import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ alive, click }) => (
  <div className={`cell ${alive === 1 ? 'alive' : 'dead'}`} onClick={click} role="button" />
);

Cell.propTypes = {
  alive: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired,
};

export default Cell;
