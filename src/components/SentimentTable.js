// components/SentimentTable.jsx
import React from 'react';
import './SentimentTable.css';

const SentimentTable = ({ data }) => {
  // Filtra y limita los datos a 5 elementos por clase de sentimiento
  const filteredData = {
    Positiva: data.filter(item => item.sentiment_class === 'Positiva').slice(0, 5),
    Neutra: data.filter(item => item.sentiment_class === 'Neutra').slice(0, 5),
    Negativa: data.filter(item => item.sentiment_class === 'Negativa').slice(0, 5),
  };

  // Combina los datos filtrados en una sola lista
  const combinedData = [
    ...filteredData.Positiva,
    ...filteredData.Neutra,
    ...filteredData.Negativa,
  ];

  return (
    <div className="modal-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sentiment Score</th>
            <th>Sentiment Class</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.sentiment_en.toFixed(2)}</td>
              <td>{item.sentiment_class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SentimentTable;
