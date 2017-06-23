export const INITIALIZE = 'INITIALIZE';
export const STEP = 'STEP';

export function initializeGame() {
  return { type: INITIALIZE };
}

export function evolve() {
  return { type: STEP };
}