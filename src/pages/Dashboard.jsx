import { useState } from 'react';
import ShatterAlert from '../components/ShatterAlert/ShatterAlert';
import Live from '../components/Live/Live';
import Result from '../components/Result/Result';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('shatter');

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-nav">
        <div className="nav-container">
          <div className="nav-logo">UNI-ALLOCATE</div>
          <div className="nav-links">
            <button
              className={`nav-link ${activeSection === 'shatter' ? 'active' : ''}`}
              onClick={() => setActiveSection('shatter')}
            >
              Shatter Alerts
            </button>
            <button
              className={`nav-link ${activeSection === 'live' ? 'active' : ''}`}
              onClick={() => setActiveSection('live')}
            >
              Live Allocation
            </button>
            <button
              className={`nav-link ${activeSection === 'result' ? 'active' : ''}`}
              onClick={() => setActiveSection('result')}
            >
              Results
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        {activeSection === 'shatter' && <ShatterAlert />}
        {activeSection === 'live' && <Live />}
        {activeSection === 'result' && <Result />}
      </div>
    </div>
  );
};

export default Dashboard;
