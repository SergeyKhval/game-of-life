import React from 'react';
import { render } from 'react-dom';


const App = () => (
  <div className="root">
    Game of life
  </div>
);

render(<App />, document.getElementById('root'));