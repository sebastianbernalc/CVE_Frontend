// components/ScoreDifferencesChart.jsx
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const ScoreDifferencesChart = () => {
  const [chartsData, setChartsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/score-differences');
        const data = await response.json();
        setChartsData(data);
      } catch (error) {
        console.error('Error fetching score differences:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {Object.keys(chartsData).length === 0 ? (
        <p>Cargando gráficos...</p>
      ) : (
        Object.entries(chartsData).map(([title, { plot, summary }]) => (
          <div key={title} style={{ marginBottom: '20px' }}>
            <h3>{title}</h3>
            <Plot
              data={[JSON.parse(plot).data[0]]}
              layout={JSON.parse(plot).layout}
              config={{ responsive: true }}
            />
            <pre>{JSON.stringify(summary, null, 2)}</pre>
          </div>
        ))
      )}
    </div>
  );
};

export default ScoreDifferencesChart;
