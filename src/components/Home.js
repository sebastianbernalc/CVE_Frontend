
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Images/logo.png'; // PNG Logo
import '../index.css';

const Home = () => (
  <div className="bg-custom-background">
    <div className="bg-custom-gradient"></div>
    <div className="bg-custom-gradient bg-custom-gradient-right"></div>
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={Logo} alt="Logo" className="mb-6 filter invert fade-in" />
      <div className="flex flex-col gap-4">
        <Link to="/dashboard">
          <button className="bg-white-500 text-white px-4 py-2 rounded border border-white fade-in">
            Dashboard
          </button>
        </Link>
        <Link to="/search-cve">
          <button className="bg-white-500 text-white px-4 py-2 rounded border border-white fade-in">
            Search CVE
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
