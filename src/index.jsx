import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Field from './components/Field';

const App = () => (
  <Provider store={store}>
    <div className="root">
      Game of life

      <Field />
    </div>
  </Provider>
);

render(<App />, document.getElementById('root'));