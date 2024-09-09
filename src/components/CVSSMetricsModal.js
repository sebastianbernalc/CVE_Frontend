import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './cvss.css';
import { IoCloseCircleOutline } from "react-icons/io5";

const CVSSMetricsModal = ({ onClose }) => {
    const [cvssData, setCvssData] = useState(null);

    useEffect(() => {
        // Llama a la API para obtener los datos
        const fetchData = async () => {
            const response = await fetch('/api/score-differences');
            const data = await response.json();
            setCvssData(data);
        };

        fetchData();
    }, []);

    if (!cvssData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close-button" onClick={onClose}><IoCloseCircleOutline/></button>
                <div className="modal-content">
                    {Object.keys(cvssData).map((metric) => (
                        <div key={metric} className="modal-section">
                            <h2>{metric}</h2>
                            <div className="modal-table">
                                <table>
                                    <thead>
                                        <tr>
                                            {Object.keys(cvssData[metric].summary).map((key) => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {Object.values(cvssData[metric].summary).map((value, index) => (
                                                <td key={index}>{value}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-chart">
                                <Plot
                                    data={JSON.parse(cvssData[metric].plot).data}
                                    layout={JSON.parse(cvssData[metric].plot).layout}
                                    config={{ responsive: true }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CVSSMetricsModal;
