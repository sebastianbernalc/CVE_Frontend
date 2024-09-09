import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js'; 
import './WordFrequencyChart.css'; 

const WordFrequencyChart = () => {
  const [figureData, setFigureData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/word-frequency');
        const data = await response.json();
        setFigureData(JSON.parse(data.figure));
      } catch (error) {
        console.error('Error fetching word frequency data:', error);
      }
    };

    fetchData();
  }, []);

  if (!figureData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chart-container">
      <Plot
        data={figureData.data}
        layout={figureData.layout}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

export default WordFrequencyChart;
