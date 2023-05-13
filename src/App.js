import React from 'react';
import WordFrequencyCounter from './WordFrequencyCounter';

const App = () => {
  return (
    <div className="container">
      <h1 className="mt-3">Finding Top 20 most occurring words.</h1>
      <WordFrequencyCounter />
    </div>
  );
};

export default App;
