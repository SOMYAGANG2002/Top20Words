import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from 'react-bootstrap';

const WordFrequencyCounter = () => {
  const [wordFrequency, setWordFrequency] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      const text = response.data;

      const words = text.split(/\s+/);
      const wordCount = {};
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });

      const wordFrequencyData = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([word, frequency]) => ({ word, frequency }));

      setWordFrequency(wordFrequencyData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + wordFrequency.map(item => `${item.word},${item.frequency}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'word_frequency.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <Button className="mt-3" variant="primary" onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
      {wordFrequency.length > 0 && (
        <div>
          <h2 className="mt-3">Top 20 Words</h2>
          <BarChart width={1000} height={500} data={wordFrequency}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="frequency" fill="#0cc2f5" />
          </BarChart>
          <Button variant="danger" onClick={handleExport}>Export</Button>
        </div>
      )}
    </div>
  );
};

export default WordFrequencyCounter;