import React from 'react';
import './style.css';

function Cell({ isAlive }) {
  return (
    <td className={isAlive ? 'cell cell_alive' : 'cell'} />
  );
}

export default Cell;