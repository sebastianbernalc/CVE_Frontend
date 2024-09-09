import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './corre.css'; // Asegúrate de tener este archivo CSS

const CweCveMetricsCorreGraphModal = ({ isOpen, onClose }) => {
    const [charts, setCharts] = useState({ correlation_heatmap: null });

    useEffect(() => {
        if (isOpen) {
            const fetchCharts = async () => {
                try {
                    const response = await fetch('/api/cwe-cve-metrics_corre_graph');
                    const data = await response.json();
                    setCharts(data);
                } catch (error) {
                    console.error('Error fetching chart data:', error);
                }
            };

            fetchCharts();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close-button" onClick={onClose}><IoCloseCircleOutline /></button>
                <div className="modal-content">
                    <h2>Métricas CVSS y Correlación</h2>
                    {charts.correlation_heatmap ? (
                        <Plot
                            data={JSON.parse(charts.correlation_heatmap).data}
                            layout={JSON.parse(charts.correlation_heatmap).layout}
                            config={{ responsive: true }}
                        />
                    ) : <div>Loading correlation heatmap...</div>}
                </div>
            </div>
        </div>
    );
};

export default CweCveMetricsCorreGraphModal;
