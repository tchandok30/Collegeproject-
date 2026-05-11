import { FiDownload, FiMap } from 'react-icons/fi';
import './Result.css';

const Result = () => {
  const roommates = [
    {
      id: 1,
      name: 'Arjun Sharma',
      batch: '#12',
      avatar: 'AS',
      role: 'YOU',
    },
    {
      id: 2,
      name: 'Priya Mohta',
      batch: '#12',
      avatar: 'PM',
    },
    {
      id: 3,
      name: 'Rohan Das',
      batch: '#12',
      avatar: 'RD',
    },
    {
      id: 4,
      name: 'Public Pool',
      batch: 'UNASSIGNED',
      avatar: '👤',
    },
  ];

  return (
    <div className="result-container">
      {/* Top Navigation */}
      <div className="result-topnav">
        <div className="topnav-logo">UNI-ALLOCATE</div>
        <div className="topnav-menu">
          <a href="#" className="topnav-item">Allocation</a>
          <a href="#" className="topnav-item">Squads</a>
          <a href="#" className="topnav-item">Preferences</a>
          <a href="#" className="topnav-item active">Results</a>
        </div>
        <div className="topnav-actions">
          <span className="live-status">🔴 LIVE STATUS</span>
          <button className="topnav-icon">🔔</button>
          <button className="topnav-icon">👤</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="result-content">
        <div className="content-left">
          {/* Success Message */}
          <div className="success-header">
            <h1>Allocation Complete</h1>
            <p className="success-message">Your room assignment has been finalized.</p>
          </div>

          {/* The allocation details */}
          <div className="allocation-success">
            <div className="success-label-section">
              <p className="success-label">ALLOCATION SUCCESSFUL</p>
              <h2 className="room-number-large">C-312</h2>
            </div>

            <div className="allocation-brief">
              <div className="brief-item">
                <p className="brief-label">BLOCK</p>
                <p className="brief-value">C</p>
              </div>
              <div className="brief-item">
                <p className="brief-label">FLOOR</p>
                <p className="brief-value">3rd</p>
              </div>
              <div className="brief-item">
                <p className="brief-label">TYPE</p>
                <p className="brief-value">4-Seater</p>
              </div>
              <div className="brief-item">
                <p className="brief-label">ASSIGNED</p>
                <p className="brief-value">3/4</p>
              </div>
            </div>
          </div>

          {/* Roommates Section */}
          <div className="roommates-section">
            <h3 className="roommates-title">Roommates</h3>

            <div className="roommates-grid">
              {roommates.map((mate) => (
                <div key={mate.id} className="roommate-card">
                  <div className="roommate-avatar">
                    {mate.avatar === '👤' ? (
                      <span>{mate.avatar}</span>
                    ) : (
                      <span className="avatar-initials">{mate.avatar}</span>
                    )}
                  </div>
                  <div className="roommate-info">
                    <p className="roommate-name">{mate.name}</p>
                    <p className="roommate-batch">{mate.batch}</p>
                    {mate.role && (
                      <span className="roommate-badge">{mate.role}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <button className="btn-download">
            <FiDownload />
            DOWNLOAD ALLOTMENT LETTER
          </button>
        </div>

        {/* Right Sidebar */}
        <aside className="content-right">
          <div className="details-card">
            <h3 className="details-title">ALLOCATION DETAILS</h3>

            <div className="details-grid">
              <div className="detail-row">
                <p className="detail-label">Method</p>
                <p className="detail-value">Live Selection</p>
              </div>
              <div className="detail-row">
                <p className="detail-label">Batch</p>
                <p className="detail-value">#12</p>
              </div>
              <div className="detail-row">
                <p className="detail-label">Round</p>
                <p className="detail-value">3</p>
              </div>
              <div className="detail-row">
                <p className="detail-label">Preference</p>
                <p className="detail-value">#1</p>
              </div>
            </div>

            <button className="btn-view-map">
              <FiMap />
              VIEW ROOM ON MAP
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Result;
