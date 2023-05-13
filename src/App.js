import React from 'react';
import Top20Words from './Top20Words';

const App = () => {
  return (
    <div className="container">
      <h1 className="mt-3">Finding Top 20 most occurring words.</h1>
      <Top20Words />
    </div>
  );
};

export default App;
