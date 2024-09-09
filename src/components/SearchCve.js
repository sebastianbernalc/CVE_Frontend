import React, { useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './Search.css';
import { Link } from 'react-router-dom';

const CVEInfo = () => {
  const [cveId, setCveId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/get_cve_info_detail', { id: cveId });
      setData(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching data');
      setData(null);
    }
  };

  // Columns for the CVE Data table
  const cveColumns = React.useMemo(
    () => [
      { Header: 'Field', accessor: 'field' },
      { Header: 'Value', accessor: 'value' }
    ],
    []
  );

  // Transform cveData into the format required for react-table
  const cveDataTable = React.useMemo(
    () =>
      data
        ? Object.entries(data.cve_data).map(([key, value]) => ({
            field: key,
            value: value
          }))
        : [],
    [data]
  );

  // Transform cvss_metrics_v2 and cvss_metrics_v31 into the format required for react-table
  const cvssV2DataTable = React.useMemo(
    () =>
      data && data.cvss_metrics_v2
        ? data.cvss_metrics_v2.flatMap((metric) =>
            Object.entries(metric).map(([key, value]) => ({
              field: key,
              value: value
            }))
          )
        : [],
    [data]
  );

  const cvssV31DataTable = React.useMemo(
    () =>
      data && data.cvss_metrics_v31
        ? data.cvss_metrics_v31.flatMap((metric) =>
            Object.entries(metric).map(([key, value]) => ({
              field: key,
              value: value
            }))
          )
        : [],
    [data]
  );


  const cweDataTable = React.useMemo(
    () =>
      data && data.cwe
        ? data.cwe.map((cwe) => ({
            cve_id: cwe.cve_id,
            cwe_id: cwe.cwe_id
          }))
        : [],
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: cveColumns,
    data: cveDataTable
  });

  return (
    <div className="bg-custom-background">
      <div className="bg-custom-gradient"></div>
      <div className="bg-custom-gradient bg-custom-gradient-right"></div>
      <div className="cve-info-container">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={cveId}
            onChange={(e) => setCveId(e.target.value)}
            placeholder="Enter CVE ID"
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {data && (
          <div>
            <h2>CVE Data</h2>
            <div className="table-container">
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <h2>CVSS Metrics v2</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {cvssV2DataTable.map((metric, index) => (
                    <tr key={index}>
                      <td>{metric.field}</td>
                      <td>{metric.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>CVSS Metrics v3.1</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {cvssV31DataTable.map((metric, index) => (
                    <tr key={index}>
                      <td>{metric.field}</td>
                      <td>{metric.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>CWE Data</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>CVE ID</th>
                    <th>CWE ID</th>
                  </tr>
                </thead>
                <tbody>
                  {cweDataTable.map((cwe, index) => (
                    <tr key={index}>
                      <td>{cwe.cve_id}</td>
                      <td>{cwe.cwe_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="center-link">
        <Link to="/">
          <button
            className="bg-white-500 text-white px-4 rounded border border-white fade-in"
            
          >
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CVEInfo;
