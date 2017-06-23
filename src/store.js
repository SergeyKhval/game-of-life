import { createStore } from 'redux';
import game from './reducer';

const store = createStore(game);

export default store;