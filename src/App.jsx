import React, { useState } from 'react';
import Bottle3D from './components/Bottle3D';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleExploreClick = () => {
    alert("Welcome to the wonderful world of bolly! Explore our full organic collections below.");
  };

  return (
    <>
      {/* Visual background accents */}
      <div className="bg-grid-overlay"></div>
      <div className="bg-radial-glow"></div>
      
      {/* Floating physical decor bubbles */}
      <div className="decor-bubble decor-bubble-1"></div>
      <div className="decor-bubble decor-bubble-2"></div>
      <div className="decor-bubble decor-bubble-3"></div>

      <header className="header container">
        {/* Logo */}
        <a href="/" className="logo">
          bolly<span>.</span>
        </a>

        {/* Center navigation pill */}
        <nav className="nav-menu-pill">
          <a href="#shop" className="nav-link active">
            Shop
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#about" className="nav-link">About</a>
          <a href="#blog" className="nav-link">Blog</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Right side cart & search */}
        <div className="header-actions">
          <button className="btn-cart-text" onClick={() => alert("Your cart is currently empty.")}>
            Cart {cartCount > 0 && `(${cartCount})`}
          </button>
          
          <button className="btn-icon-circle" onClick={() => alert("Search functionality coming soon!")} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Simple hamburger toggle for mobile responsive layouts */}
          <button className="menu-toggle" onClick={() => alert("Mobile menu navigation coming soon!")} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <main className="hero container">
        {/* Left Side: Headings & Badge */}
        <section className="hero-left">
          <div className="badge-wrapper">
            <span className="badge-text">FROM BOLLY</span>
            <span className="badge-pill">ITS GOOD</span>
          </div>
          <h1 className="hero-heading">
            Knock<br />
            Out<br />
            Flakes
          </h1>
        </section>

        {/* Center Side: 3D Interactive Model */}
        <section className="hero-center" aria-label="Interactive 3D Product View">
          <Bottle3D />
        </section>

        {/* Right Side: Descriptions & Calls to Action */}
        <section className="hero-right">
          <p className="hero-description">
            Journey in to the wonderful world of shampoo
          </p>
          
          <div className="action-block">
            <button className="btn-primary-pill" onClick={handleExploreClick}>
              Explore Now
            </button>
            
            <button 
              className="btn-circle-3d" 
              onClick={() => alert("Drag, swipe, or move your mouse around to spin the 3D bottle and inspect details!")}
              title="Interactive 3D View Instructions"
            >
              3D
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
