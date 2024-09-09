// components/SentimentModal.jsx
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Plot from 'react-plotly.js';
import SentimentTable from './SentimentTable';
import { IoCloseCircleOutline } from "react-icons/io5";

Modal.setAppElement('#root'); // Para accesibilidad

const SentimentModal = ({ isOpen, onRequestClose }) => {
  const [sentimentData, setSentimentData] = useState([]);
  const [wordFrequencyFigure, setWordFrequencyFigure] = useState(null);

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const response = await fetch('/api/sentiment');
        const data = await response.json();
        setSentimentData(data.data);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      }
    };

    const fetchWordFrequencyData = async () => {
      try {
        const response = await fetch('/api/word-frequency');
        const data = await response.json();
        setWordFrequencyFigure(JSON.parse(data.figure));
      } catch (error) {
        console.error('Error fetching word frequency data:', error);
      }
    };

    fetchSentimentData();
    fetchWordFrequencyData();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sentiment and Word Frequency"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button onClick={onRequestClose} className="modal-close-button"><IoCloseCircleOutline/></button>
      <h2>Sentiment Analysis and Word Frequency</h2>
      <div className="modal-content">
        <SentimentTable data={sentimentData} />
        <div className="modal-chart">
          {wordFrequencyFigure ? (
            <Plot
              data={wordFrequencyFigure.data}
              layout={wordFrequencyFigure.layout}
              config={{ displayModeBar: false }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SentimentModal;
