import React, { useState } from 'react';
import Bottle3D from './components/Bottle3D';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleExploreClick = () => {
    // Increment cart count as a fun micro-interaction!
    setCartCount(prev => prev + 1);
    alert("Adding 1 bottle of bolly Clarify Shampoo to your cart! Check the cart icon in the top right.");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    setFormSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setFormSubmitted(false);
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
          <a href="#shop" className="nav-link">
            Shop
          </a>
          <a href="#about" className="nav-link">About</a>
          <a href="#blog" className="nav-link">Blog</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Right side cart & search */}
        <div className="header-actions">
          <button className="btn-cart-icon" onClick={() => alert(`You have ${cartCount} items in your cart. Proceeding to checkout coming soon!`)} aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cart-svg">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-label">Cart</span>
            <span className="cart-badge">{cartCount}</span>
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

      {/* Hero / Shop Section */}
      <main id="shop" className="hero container">
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
            Made by Shlok Katiyar for Toposel
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

      {/* About Section */}
      <section id="about" className="about-section container">
        <div className="section-header">
          <span className="section-subtitle">OUR VALUES</span>
          <h2 className="section-title">The Science of Clean</h2>
          <div className="section-divider"></div>
        </div>

        <div className="about-grid">
          <div className="about-card glass">
            <div className="about-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>100% Organic Extracts</h3>
            <p>
              We use therapeutic-grade, cold-pressed tea tree and peppermint oil. No parabens, no synthetic sulfates, and zero compromise.
            </p>
          </div>

          <div className="about-card glass">
            <div className="about-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3>Tingle Tech Formula</h3>
            <p>
              Our active peppermint micro-circulation formula triggers scalp stimulation, waking up dormant follicles and promoting thicker hair growth.
            </p>
          </div>

          <div className="about-card glass">
            <div className="about-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 2 22 22 22" />
              </svg>
            </div>
            <h3>Dermatologist Cleared</h3>
            <p>
              Tested on all hair types. Formulated to neutralize pH levels, dissolve flaky buildup, and preserve natural protective sebum oils.
            </p>
          </div>
        </div>

        <div className="about-sourcing glass">
          <div className="sourcing-content">
            <h3>Sourced Responsibly. Packaged Elegantly.</h3>
            <p>
              Every single bottle of bolly is crafted using 100% Post-Consumer Recycled (PCR) ocean plastic. Our ingredients are harvested under fair-trade protocols from organic farms in southeastern Australia and Oregon, USA.
            </p>
          </div>
          <div className="sourcing-stats">
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Vegan & Cruelty Free</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0%</span>
              <span className="stat-label">Chemical Flakes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">250ml</span>
              <span className="stat-label">Concentrated Dose</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blog-section container">
        <div className="section-header">
          <span className="section-subtitle">THE JOURNAL</span>
          <h2 className="section-title">Scalp Education & News</h2>
          <div className="section-divider"></div>
        </div>

        <div className="blog-grid">
          <article className="blog-card glass">
            <div className="blog-image-placeholder blog-img-1">
              <span className="blog-tag">HAIR SCIENCE</span>
            </div>
            <div className="blog-content">
              <div className="blog-meta">July 19, 2026 • 4 min read</div>
              <h3>Why Tea Tree Oil is Nature's Best Antifungal</h3>
              <p>Understanding the microbiology of dandruff and how natural essential oils dissolve flakes without irritating delicate skin cells.</p>
              <a href="#blog" className="blog-link" onClick={() => alert("Full blog reader coming soon!")}>
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </article>

          <article className="blog-card glass">
            <div className="blog-image-placeholder blog-img-2">
              <span className="blog-tag">SCALP HEALTH</span>
            </div>
            <div className="blog-content">
              <div className="blog-meta">July 12, 2026 • 6 min read</div>
              <h3>The Tingle Factor: Peppermint & Hair Vitality</h3>
              <p>Exploring the science of micro-circulation and why that fresh cooling sensation is key to delivery of scalp-nourishing vitamins.</p>
              <a href="#blog" className="blog-link" onClick={() => alert("Full blog reader coming soon!")}>
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </article>

          <article className="blog-card glass">
            <div className="blog-image-placeholder blog-img-3">
              <span className="blog-tag">ECO-LIVING</span>
            </div>
            <div className="blog-content">
              <div className="blog-meta">June 28, 2026 • 5 min read</div>
              <h3>Inside our 100% Recycled Bottle Design</h3>
              <p>How we collaborated with industrial designers to create a gorgeous shelf-worthy shape using exclusively recycled materials.</p>
              <a href="#blog" className="blog-link" onClick={() => alert("Full blog reader coming soon!")}>
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section container">
        <div className="section-header">
          <span className="section-subtitle">CONNECT WITH US</span>
          <h2 className="section-title">Reach Out to bolly.</h2>
          <div className="section-divider"></div>
        </div>

        <div className="contact-grid">
          {/* Left side: Contact Info */}
          <div className="contact-info">
            <div className="info-card glass">
              <h4>Customer Care</h4>
              <p>Have questions about your order or shipping?</p>
              <a href="mailto:hello@bollyshampoo.com" className="neon-link">hello@bollyshampoo.com</a>
            </div>

            <div className="info-card glass">
              <h4>Headquarters</h4>
              <p>bolly Cosmetics Inc.</p>
              <p>720 Melrose Avenue</p>
              <p>Los Angeles, CA 90046</p>
            </div>

            <div className="info-card glass">
              <h4>Follow the Journey</h4>
              <div className="social-links">
                <a href="#contact" onClick={() => alert("Instagram link coming soon!")}>Instagram</a>
                <a href="#contact" onClick={() => alert("TikTok link coming soon!")}>TikTok</a>
                <a href="#contact" onClick={() => alert("Pinterest link coming soon!")}>Pinterest</a>
              </div>
            </div>
          </div>

          {/* Right side: Contact Form */}
          <div className="contact-form-container glass">
            {formSubmitted ? (
              <div className="form-success-message">
                <div className="success-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3>Thank You, {formData.name}!</h3>
                <p>Your message has been sent successfully. Our team will get back to you within 24 hours.</p>
                <button className="btn-primary-pill" onClick={resetForm}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us what you're thinking..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary-pill btn-block">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer container">
        <div className="footer-content">
          <a href="/" className="logo">
            bolly<span>.</span>
          </a>
          <p>© 2026 bolly Cosmetics Inc. All rights reserved. Made with love for your scalp.</p>
          <nav className="footer-nav">
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default App;
