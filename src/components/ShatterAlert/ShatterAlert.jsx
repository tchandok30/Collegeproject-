import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import './ShatterAlert.css';

const ShatterAlert = () => {
  return (
    <div className="shatter-alert-container">
      <div className="alert-wrapper">
        <div className="alert-icon-wrapper">
          <div className="alert-icon">
            <FiAlertTriangle size={40} />
          </div>
        </div>

        <h1 className="alert-title">Squad Dissolved</h1>
        <p className="alert-subtitle">SHATTER & UNLOCK PROTOCOL TRIGGERED</p>

        <div className="alert-divider"></div>

        <p className="alert-description">
          No 4-seater rooms remain available in the current allocation block.
          Your squad has been unlocked.
        </p>

        <div className="alert-divider"></div>

        <h3 className="alert-section-title">What happens now</h3>

        <div className="steps-list">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4 className="step-title">Squad Disbanded</h4>
              <p className="step-description">
                All members are now free agents and can join new squads or form
                smaller groups.
              </p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4 className="step-title">Priority Retained</h4>
              <p className="step-description">
                Your original CGPA ranking priority remains intact for the next available
                room sizes.
              </p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4 className="step-title">Target Update</h4>
              <p className="step-description">
                You must now target 3-seater or 2-seater configurations based on
                available inventory.
              </p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4 className="step-title">Time Limit</h4>
              <p className="step-description">
                You have 15 minutes to reconfigure before your priority window closes.
              </p>
            </div>
          </div>
        </div>

        <div className="alert-divider"></div>

        <div className="alert-buttons">
          <button className="btn btn-primary">Create New Squad</button>
          <button className="btn btn-secondary">Browse Open Squads</button>
        </div>
      </div>
    </div>
  );
};

export default ShatterAlert;
