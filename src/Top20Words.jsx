import React, { useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
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

      const sortedWords = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);

      const histogramData = [['Word', 'Frequency']];
      sortedWords.forEach(([word, frequency]) => {
        histogramData.push([word, frequency]);
      });

      setWordFrequency(histogramData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + wordFrequency.map(row => row.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'word_frequency.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <Button className="mt-2 btn btn-primary" onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
      {wordFrequency.length > 0 ? (
        <div>
          <h2 className="mt-4 mb-3">Top 20 Words</h2>
          <Chart
            width={'1100px'}
            height={'450px'}
            style={{ boxShadow: "0 3px 20px rgba(0, 0, 0, 0.5)" }}
            chartType="Histogram"
            data={wordFrequency}
            options={{
              title: 'Top 20 Words',
              titleTextStyle:{color: '#c8c7c7'},
              legend: { position: 'none' },
              hAxis: {
                title: 'Words',
                textStyle:{color: '#c8c7c7'},
                titleTextStyle:{color: '#c8c7c7'},
              },
              vAxis: {
                title: 'Frequency',
                textStyle: {color: '#c8c7c7'},
                titleTextStyle:{color: '#c8c7c7'},
              },
              backgroundColor: "#0d1117",
              colors: ['blue'], 
              histogram: {
                bucketSize: 1,
              },
            }}
          />
          <Button className="mt-4 btn btn-success" onClick={handleExport}>Export To CSV</Button>
        </div>
      ) : null}
    </div>
  );
};

export default Top20Words;