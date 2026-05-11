import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import './Live.css';

const Live = () => {
  const [cart, setCart] = useState([
    { id: 'B-205', type: '3-Seater', floor: '2nd FL', block: 'B' },
    { id: 'C-110', type: '4-Seater', floor: 'Ground', block: 'C' },
    { id: 'D-401', type: '2-Seater', floor: '4th FL', block: 'D' },
  ]);

  const rooms = [
    { id: 'C-312', block: 'C-BLOCK', seater: '4-Seater', floor: '3rd Floor', vacancy: '4 / 4', status: 'available' },
    { id: 'B-205', block: 'B-BLOCK', seater: '3-Seater', floor: '2nd Floor', vacancy: '3 / 3', status: 'available' },
    { id: 'A-101', block: 'A-BLOCK', seater: '2-Seater', floor: 'Ground', vacancy: '0 / 2', status: 'unavailable' },
    { id: 'D-401', block: 'D-BLOCK', seater: '2-Seater', floor: '4th Floor', vacancy: '1 / 2', status: 'available' },
    { id: 'E-220', block: 'E-BLOCK', seater: '4-Seater', floor: '2nd Floor', vacancy: '2 / 4', status: 'available' },
    { id: 'F-115', block: 'F-BLOCK', seater: '3-Seater', floor: '1st Floor', vacancy: '3 / 3', status: 'available' },
  ];

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="live-container">
      {/* Sidebar */}
      <aside className="live-sidebar">
        <div className="sidebar-logo">UNI-ALLOCATE</div>
        
        <div className="sidebar-section">
          <p className="sidebar-label">Selection Phase</p>
          <p className="sidebar-batch">Batch 2024-A</p>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">⊞</span>
            <span>OVERVIEW</span>
          </a>
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">👥</span>
            <span>MY SQUAD</span>
          </a>
          <a href="#" className="sidebar-item active">
            <span className="sidebar-icon">⊞</span>
            <span>ROOM GRID</span>
          </a>
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">⏱</span>
            <span>TIMELINE</span>
          </a>
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">?</span>
            <span>SUPPORT</span>
          </a>
        </nav>

        <button className="sidebar-action">LOCK SELECTION</button>

        <div className="sidebar-footer">
          <a href="#" className="sidebar-footer-item">⚙ SETTINGS</a>
          <a href="#" className="sidebar-footer-item">→ LOGOUT</a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="live-main">
        {/* Top Navigation */}
        <div className="live-topnav">
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

        {/* Content Area */}
        <div className="live-content">
          <div className="content-left">
            <div className="allocation-header">
              <p className="allocation-label">LIVE ALLOCATION</p>
              <h1 className="allocation-title">Round 3 of 6</h1>
              <div className="allocation-bar"></div>
            </div>

            {/* Room Tabs */}
            <div className="room-tabs">
              {['R1', 'R2', 'R3', 'R4', 'R5', 'R6'].map((r, i) => (
                <button
                  key={r}
                  className={`room-tab ${i === 2 ? 'active' : ''}`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Room Type Filters */}
            <div className="room-filters">
              {['ALL', '4-SEATER', '3-SEATER', '2-SEATER', 'GROUND', '1ST FL', '2ND FL'].map((filter) => (
                <button
                  key={filter}
                  className={`room-filter ${filter === 'ALL' ? 'active' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Room Grid */}
            <div className="room-grid">
              {rooms.map((room, idx) => (
                <div key={room.id} className={`room-card ${room.status}`}>
                  <div className="room-header">
                    <p className="room-block">{room.block}</p>
                    <h3 className="room-number">{room.id}</h3>
                  </div>

                  <div className="room-info">
                    <p><strong>{room.seater}</strong></p>
                    <p>{room.floor}</p>
                    <p>Vacancy {room.vacancy}</p>
                  </div>

                  <button className={`room-action ${room.status}`}>
                    {room.status === 'available' ? '+ ADD TO CART' : 'UNAVAILABLE'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <aside className="live-cart">
            <div className="cart-header">
              <h3>Cart</h3>
              <span className="cart-count">{cart.length}/10</span>
            </div>

            <div className="cart-items">
              {cart.map((item, idx) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-number">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="cart-item-content">
                    <p className="cart-item-id">{item.id}</p>
                    <p className="cart-item-details">{item.type} • {item.floor}</p>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FiX />
                  </button>
                </div>
              ))}

              {cart.length < 10 && (
                <div className="cart-empty-slot">
                  0{cart.length + 1} EMPTY SLOT
                </div>
              )}
            </div>

            <button className="cart-submit">SUBMIT PREFERENCES</button>
            <p className="cart-note">requires 10 selections</p>

            <div className="cart-history">
              <h4>ROUND HISTORY</h4>
              <div className="history-item">
                <p>R1 No Allocation</p>
              </div>
              <div className="history-item">
                <p>R2 Waitlisted (Pos: 42)</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Live;
