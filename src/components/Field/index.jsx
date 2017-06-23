import React from 'react';
import range from 'lodash/range';
import { connect } from 'react-redux';
import { getCells, getHeight, getWidth } from '../../reducer';
import CellRow from '../CellRow';
import { evolve } from '../../actions';

function Field({ height, width, cells, evolve }) {
  return (
    <div>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
        {range(height).map((n, rowIndex) => <CellRow key={rowIndex}
                                                     cells={cells.slice(rowIndex * width, width * (rowIndex + 1))} />)}
        </tbody>
      </table>

      <div>
        <button onClick={evolve}>Evolve</button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    height: getHeight(state),
    width: getWidth(state),
    cells: getCells(state),
  };
}

function mapDipatchToProps(dispatch) {
  return {
    evolve: () => dispatch(evolve()),
  };
}

export default connect(mapStateToProps, mapDipatchToProps)(Field);