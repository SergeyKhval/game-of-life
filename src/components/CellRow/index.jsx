import React from 'react';
import Cell from '../Cell';

function CellRow({ cells }) {
  return (
    <tr>
      {cells.map((c, n) => <Cell key={n} isAlive={c} />)}
    </tr>
  );
}

export default CellRow;