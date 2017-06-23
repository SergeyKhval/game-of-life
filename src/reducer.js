import range from 'lodash/range';
import { INITIALIZE, STEP } from './actions';

function initialize(width = 50, height = 50) {
  return {
    width,
    height,
    cells: (range(width * height)).map(() => Math.round(Math.random() * 0.75)),
    running: true,
    steps: 0,
  };
}

const initialState = initialize();

function getCellRow(index, width) {
  return Math.floor(index / width);
}

function getCellColumn(index, width) {
  return index % width;
}

function getRowMinIndex(row, width) {
  return row * width;
}

function getRowMaxIndex(row, width) {
  return row * width + width - 1;
}

function getColumnMinIndex(column) {
  return column;
}

function getColumnMaxIndex(column, width, height) {
  return column + width * height - width;
}

function processCell(width, height) {
  return (cell, index, cells) => {
    const row = getCellRow(index, width);
    const rowMinIndex = getRowMinIndex(row, width);
    const rowMaxIndex = getRowMaxIndex(row, width);
    const column = getCellColumn(index, width);
    const columnMinIndex = getColumnMinIndex(column);
    const columnMaxIndex = getColumnMaxIndex(column, width, height);

    const leftCellIndex = index === rowMinIndex ? rowMaxIndex : index - 1;
    const rightCellIndex = index === rowMaxIndex ? rowMinIndex : index + 1;
    const upperCellIndex = index === columnMinIndex ? columnMaxIndex : index - width;
    const bottomCellIndex = index === columnMaxIndex ? columnMinIndex : index + width;

    const upperCellRow = getCellRow(upperCellIndex, width);
    const upperCellRowMinIndex = getRowMinIndex(upperCellRow, width);
    const upperCellRowMaxIndex = getRowMaxIndex(upperCellRow, width);

    const bottomCellRow = getCellRow(bottomCellIndex, width);
    const bottomCellRowMinIndex = getRowMinIndex(bottomCellRow, width);
    const bottomCellRowMaxIndex = getRowMaxIndex(bottomCellRow, width);

    const upperLeftCellIndex = upperCellIndex === upperCellRowMinIndex ? upperCellRowMaxIndex : upperCellIndex - 1;
    const upperRightCellIndex = upperCellIndex === upperCellRowMaxIndex ? upperCellRowMinIndex : upperCellIndex + 1;

    const bottomLeftCellIndex = bottomCellIndex === bottomCellRowMinIndex ? bottomCellRowMaxIndex : bottomCellIndex - 1;
    const bottomRightCellIndex = bottomCellIndex === bottomCellRowMinIndex ? bottomCellRowMinIndex : bottomCellIndex + 1;

    const adjacentCells = [cells[upperLeftCellIndex], cells[upperCellIndex], cells[upperRightCellIndex], cells[leftCellIndex], cells[rightCellIndex], cells[bottomLeftCellIndex], cells[bottomCellIndex], cells[bottomRightCellIndex]];
    const aliveAdjacentCellsCount = adjacentCells.filter(cell => cell === 1).length;

    if (aliveAdjacentCellsCount === 3) return 1;
    if (aliveAdjacentCellsCount === 2 && cell === 1) return 1;

    return 0;
  };
}

export default function gameReducer(game = initialState, action) {
  const cellProcessor = processCell(game.width, game.height);

  switch (action.type) {
    case INITIALIZE:
      return { ...game, cells: initialize(game.width, game.height) };
    case STEP:
      return {
        ...game,
        cells: game.cells.map(cellProcessor),
        steps: game.steps + 1,
      };
    case 'PAUSE':
      return { ...game, running: false };
    case 'PLAY':
      return { ...game, running: true };
    default:
      return game;
  }
}

export const getWidth = (state) => state.width;
export const getHeight = (state) => state.height;
export const getCells = (state) => state.cells;