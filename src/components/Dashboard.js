import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SentimentModal from './SentimentModal'; // Importa el componente del modal
import CVSSMetricsModal from './CVSSMetricsModal'; // Importa el componente del modal
import CweMetricsModal from './CweMetricsModal'; // Importa el componente del modal
import CweMetricsTopGraph from './CweMetricsTopGraph'; // Importa el componente del modal
import CweCveMetricsCorreGraphModal from './CweCveMetricsCorreGraphModal'; // Importa el componente del modal
import './Dashboard.css'; 

const Dashboard = () => {
  const [isSentimentModalOpen, setSentimentModalOpen] = useState(false);
  const [isCVSSModalOpen, setCVSSModalOpen] = useState(false);
  const [isCweModalOpen, setCweModalOpen] = useState(false);
  const [isCweTopGraphOpen, setCweTopGraphOpen] = useState(false);
  const [isCweCorreGraphOpen, setCweCorreGraphOpen] = useState(false);
  


  const openSentimentModal = () => setSentimentModalOpen(true);
  const closeSentimentModal = () => setSentimentModalOpen(false);

  const openCVSSModal = () => setCVSSModalOpen(true);
  const closeCVSSModal = () => setCVSSModalOpen(false);

  const openCweModal = () => setCweModalOpen(true);
  const closeCweModal = () => setCweModalOpen(false);

  const openCweTopGraph = () => setCweTopGraphOpen(true);
  const closeCweTopGraph = () => setCweTopGraphOpen(false);

  const openCweCorreGraph = () => setCweCorreGraphOpen(true);
  const closeCweCorreGraph = () => setCweCorreGraphOpen(false);



  return (
    <div className="bg-custom-background">
      <div className="bg-custom-gradient"></div>
      <div className="bg-custom-gradient bg-custom-gradient-right"></div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-wrap">
          <button
            className="bg-white-500 text-white px-4 py-2 rounded border border-white fade-in"
            style={{ marginTop: '10px', marginRight: '10px' }}
            onClick={openSentimentModal} // Abrir modal de métricas de descripción
          >
            Métricas de Descripción
          </button>
          <button
            className="bg-white-500 text-white px-4 py-2 rounded border border-white fade-in"
            style={{ marginTop: '10px', marginRight: '10px' }}
            onClick={openCVSSModal} // Abrir modal de métricas CVSS
          >
            Métricas CVSS
          </button>
          <button
            className="bg-white-500 text-white px-4 py-2 rounded border border-white fade-in"
            style={{ marginTop: '10px' }}
            onClick={openCweModal} // Abrir modal de CWE
          >
            CWE ID
          </button>
        </div>
        <div className="flex flex-wrap">
          <button
            className="bg-white-500 text-white px-4 py-2 rounded border border-white fade-in"
            style={{ marginTop: '10px', marginRight: '10px' }}
            onClick={openCweTopGraph} // Abrir modal de CWE
          >
            Top de métricas
          </button>
          <button
            className="bg-white-500 text-white px-4 py-2 rounded border border-white fade-in"
            style={{ marginTop: '10px', marginRight: '10px' }}
            onClick={openCweCorreGraph} // Abrir modal de CWE
          >
            Correlación entre Métricas
          </button>
        </div>
        <Link to="/">
          <button
            className="bg-white-500 text-white px-4 py-2 rounded border border-white fade-in"
            style={{ marginTop: '10px' }}
          >
            Go Back
          </button>
        </Link>
      </div>

      {/* Aquí están los modales que se renderizan condicionalmente */}
      <SentimentModal isOpen={isSentimentModalOpen} onRequestClose={closeSentimentModal} />
      {isCVSSModalOpen && <CVSSMetricsModal isOpen={isCVSSModalOpen} onClose={closeCVSSModal} />}
      {isCweModalOpen && <CweMetricsModal isOpen={isCweModalOpen} onClose={closeCweModal} />}
      {isCweTopGraphOpen && <CweMetricsTopGraph isOpen={isCweTopGraphOpen} onClose={closeCweTopGraph} />}
      {isCweCorreGraphOpen && <CweCveMetricsCorreGraphModal isOpen={isCweCorreGraphOpen} onClose={closeCweCorreGraph} />}
      
    </div>
  );
};

export default Dashboard;
