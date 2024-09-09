// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'; // Asegúrate de que este sea el archivo CSS correcto

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
