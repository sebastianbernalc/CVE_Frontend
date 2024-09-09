import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './top.css'; // Asegúrate de que este archivo CSS exista
import { IoCloseCircleOutline } from 'react-icons/io5';

const CweMetricsTopGraph = ({ isOpen, onClose }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const fetchChartData = async () => {
                try {
                    const response = await fetch('/api/cwe-cve-metrics_top_graph');
                    const data = await response.json();
                    setChartData(data.plot);
                } catch (error) {
                    console.error('Error fetching chart data:', error);
                }
            };

            fetchChartData();
        }
    }, [isOpen]);

    if (!isOpen) {
        return null; // No renderizar el modal si no está abierto
    }

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close-button" onClick={onClose}><IoCloseCircleOutline /></button>
                <div className="modal-content">
                    <h2>Top 10 CWE por Métricas de CVSS</h2>
                    <Plot
                        data={JSON.parse(chartData).data}
                        layout={JSON.parse(chartData).layout}
                        config={{ responsive: true }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CweMetricsTopGraph;
