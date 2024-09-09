import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './cwe.css'; // Asegúrate de importar el archivo CSS
import { IoCloseCircleOutline } from "react-icons/io5";

const CweMetricsModal = ({ isOpen, onClose }) => {
    const [cweData, setCweData] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    // Llama a las APIs para obtener los datos de las tablas y gráficos
                    const responseTables = await fetch('/api/cwe-cve-metrics_table');
                    const tableData = await responseTables.json();
                    setCweData(tableData);

                    const responseChart = await fetch('/api/cwe-vulnerabilities');
                    const chartData = await responseChart.json();
                    setChartData(chartData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [isOpen]);

    if (!cweData || !chartData) {
        return <div>Loading...</div>;
    }

    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close-button" onClick={onClose}><IoCloseCircleOutline /></button>
          <div className="modal-content">
            
            <div className="modal-section">
              <h2>Top Base Score v2</h2>
              <div className="modal-table">
              <table>
                <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>Base Score</th>
                </tr>
                </thead>
                <tbody>
                {cweData.top_baseScore_v2.map((item, index) => (
                  <tr key={index} >
                  <td style={{ textAlign: "center" }}>{item.baseScore_v2}</td>
                  <td style={{ textAlign: "center" }}>{item.cwe_id}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              </div>
            </div>
            <div className="modal-section">
              <h2>Top Base Score v3.1</h2>
              <div className="modal-table">
              <table>
                <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>Base Score</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                {cweData.top_baseScore_v31.map((item, index) => (
                  <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.baseScore_v31}</td>
                  <td style={{ textAlign: "center" }}>{item.cwe_id}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              </div>
            </div>
            <div className="modal-section">
              <h2>Top CWE</h2>
              <div className="modal-table">
              <table>
                <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>CWE ID</th>
                  <th style={{ textAlign: "center" }}>Count</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                {cweData.top_cwe.map((item, index) => (
                  <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.count}</td>
                  <td style={{ textAlign: "center" }}>{item.cwe_id}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              </div>
            </div>
            <div className="modal-section">
              <h2>Top Exploitability Score v2</h2>
              <div className="modal-table">
              <table>
                <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>Exploitability Score</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                {cweData.top_exploitabilityScore_v2.map((item, index) => (
                  <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.exploitabilityScore_v2}</td>
                  <td style={{ textAlign: "center" }}>{item.cwe_id}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              </div>
            </div>
            <div className="modal-section">
              <h2>Top Exploitability Score v3.1</h2>
              <div className="modal-table">
              <table>
                <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>Exploitability Score</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                {cweData.top_exploitabilityScore_v31.map((item, index) => (
                  <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.exploitabilityScore_v31}</td>
                  <td style={{ textAlign: "center" }}>{item.cwe_id}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              </div>
            </div>
            <div className="modal-section">
              <h2>Top Impact Score v2</h2>
              <div className="modal-table">
              <table>
                <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>Impact Score</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                {cweData.top_impactScore_v2.map((item, index) => (
                  <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.impactScore_v2}</td>
                  <td style={{ textAlign: "center" }}>{item.cwe_id}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              </div>
            </div>
            <div className="modal-section">
              <h2>Top Impact Score v3.1</h2>
              <div className="modal-table">
              <table>
                <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>Impact Score</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                {cweData.top_impactScore_v31.map((item, index) => (
                  <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.impactScore_v31}</td>
                  <td style={{ textAlign: "center" }}>{item.cwe_id}</td>
                  </tr>
                ))}
                </tbody>
              </table>
              </div>
            </div>
           
            <div className="modal-section">
              <h2>Vulnerabilidades por CWE ID</h2>
              <Plot
                data={JSON.parse(chartData.figure).data}
                layout={JSON.parse(chartData.figure).layout}
                config={{ responsive: true }}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default CweMetricsModal;
