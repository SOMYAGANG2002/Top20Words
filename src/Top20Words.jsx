import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Button } from 'react-bootstrap';

const Top20Words = () => {
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
      <Button className="mt-2" variant="primary" onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
      {wordFrequency.length > 0 && (
        <div>
          <h2 className="mt-4 mb-3">Top 20 Words</h2>
          <BarChart width={900} height={450} data={wordFrequency} style={{background:"black", boxShadow:"0 3px 20px rgba(0, 0, 0, 1)"}}>
            <XAxis dataKey="word" tick={{ fill: 'white' }}/>
            <YAxis tick={{ fill: 'white' }}/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="frequency"  fill="#0cc2f5" />
          </BarChart>
          <Button className="mt-4" variant="danger" onClick={handleExport}>Export</Button>
        </div>
      )}
    </div>
  );
};

export default Top20Words;