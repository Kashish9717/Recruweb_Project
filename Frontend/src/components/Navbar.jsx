import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');

    if (searchParam) {
      setSearchQuery(searchParam);
    } else if (location.pathname !== '/jobs') {
      setSearchQuery('');
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen && window.innerWidth <= 1024 ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
      closeMenu();
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs', hasMegaDropdown: true },
    { name: 'Services', path: '/services', hasMegaDropdown: true },
    { name: 'Companies', path: '/companies' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Job Types Column
  const jobTypeFilters = [
    { name: 'Full Time', path: '/jobs?jobType=full-time', icon: '💼', count: '50+' },
    { name: 'Part Time', path: '/jobs?jobType=part-time', icon: '⏰', count: '20+' },
    { name: 'Remote', path: '/jobs?jobType=remote', icon: '🏠', count: '30+' },
    { name: 'Internship', path: '/jobs?jobType=internship', icon: '🎓', count: '15+' },
    { name: 'Contract', path: '/jobs?jobType=contract', icon: '📄', count: '10+' },
  ];

  // Quick Links Column (As seen in your screenshot)
  const quickLinksFilters = [
    { name: 'Browse All Jobs', sub: 'View all open positions', path: '/jobs', icon: '📋' },
    { name: 'Find Jobs', sub: 'Search and apply for jobs', path: '/jobs', icon: '🔍' },
    { name: 'Post a Job', sub: 'Find your next hire', path: '/post-job', icon: '✨' },
    { name: 'Companies', sub: 'Explore hiring companies', path: '/companies', icon: '🏢' },
    { name: 'Schedule Interview', sub: 'Book your slot', path: '/schedule-interview', icon: '📅' },
  ];

  const servicesFilters = [
    { name: 'HR Outsourcing', path: '/contact?service=hro', icon: '👥' },
    { name: 'Recruitment', path: '/contact?service=recruitment', icon: '🔍' },
    { name: 'Hospitality', path: '/contact?service=hospitality', icon: '🏨' },
    { name: 'Contract Hiring', path: '/contact?service=contractual', icon: '📄' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`premium-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">

          <Link to="/" className="logo">
            <img
              src="/images/RW_LOGO_Black_page-0001-removebg-preview.png"
              alt="logo"
              className="logo-img"
            />
          </Link>

          <form className="nav-search" onSubmit={handleSearch}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li
                key={link.path}
                className="nav-item"
                onMouseEnter={() => link.hasMegaDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.hasMegaDropdown && setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.name}
                  {link.hasMegaDropdown && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="dropdown-arrow"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </Link>

                {/* ENHANCED JOBS MEGA DROPDOWN */}
                {link.name === 'Jobs' && activeDropdown === 'Jobs' && (
                  <div className="mega-dropdown jobs-mega">
                    <div className="mega-layout">
                      
                      {/* Column 1: Job Types */}
                      <div className="mega-column">
                        <span className="column-title">Job Types</span>
                        <div className="column-list">
                          {jobTypeFilters.map((item) => (
                            <Link key={item.name} to={item.path} className="mega-row-item" onClick={closeMenu}>
                              <div className="item-left">
                                <span className="row-icon">{item.icon}</span>
                                <span className="row-name">{item.name}</span>
                              </div>
                              <span className="row-count">{item.count}</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Quick Links */}
                      <div className="mega-column">
                        <span className="column-title">Quick Links</span>
                        <div className="column-list">
                          {quickLinksFilters.map((item) => (
                            <Link key={item.name} to={item.path} className="mega-row-item complex" onClick={closeMenu}>
                              <span className="row-icon large">{item.icon}</span>
                              <div className="item-text">
                                <h4>{item.name}</h4>
                                <p>{item.sub}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Feature Promo Banner */}
                      <div className="mega-banner-column">
                        <div className="recruiter-card">
                          <div className="card-overlay-shapes">
                            <div className="overlay-circle-1"></div>
                            <div className="overlay-circle-2"></div>
                          </div>
                          <div className="card-content">
                            <span className="card-tag">Looking to hire?</span>
                            <div className="card-icon-wrap">✨</div>
                            <h3>Post a Job</h3>
                            <p>Find your next superstar hire instantly.</p>
                            <Link to="/post-job" className="card-cta-btn" onClick={closeMenu}>
                              Get Started <span>➔</span>
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* SERVICES DROPDOWN */}
                {link.name === 'Services' && activeDropdown === 'Services' && (
                  <div className="mega-dropdown standard-mega">
                    <div className="mega-grid">
                      {servicesFilters.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="mega-item"
                          onClick={closeMenu}
                        >
                          <span className="mega-icon">{item.icon}</span>
                          <div>
                            <h4>{item.name}</h4>
                            <p>Professional staffing solutions</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <Link to="/form" className="nav-secondary-btn">Register</Link>
            <Link to="/admin" className="nav-admin-btn">Admin</Link>
          </div>

          <button
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu} />

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className="mobile-link" onClick={closeMenu}>
            {link.name}
          </Link>
        ))}
        <Link to="/form" className="mobile-link" onClick={closeMenu}>REGISTER HERE</Link>
        <Link to="/admin" className="mobile-link" onClick={closeMenu}>Admin</Link>
      </div>

      {/* STYLES */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .premium-nav {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          max-width: 1450px;
          z-index: 1000;
          background: linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.75)) padding-box,
                      linear-gradient(135deg, rgba(59,130,246,0.35), rgba(168,85,247,0.25)) border-box;
          border: 1px solid transparent;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 24px;
          transition: all .35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .premium-nav.scrolled {
          background: linear-gradient(rgba(15,23,42,0.92), rgba(15,23,42,0.92)) padding-box,
                      linear-gradient(135deg, rgba(59,130,246,0.45), rgba(168,85,247,0.40)) border-box;
          top: 10px;
        }

        .nav-inner {
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 0 24px;
        }

        .logo-img {
          width: 120px;
          filter: brightness(0) invert(1);
        }

        .nav-search {
          position: relative;
          width: 280px;
        }

        .search-icon {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .nav-search input {
          width: 100%;
          height: 44px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 0 16px 0 46px;
          color: white;
          outline: none;
          transition: all .3s ease;
          font-size: 14px;
        }

        .nav-search input:focus {
          border-color: rgba(59,130,246,0.5);
          box-shadow: 0 0 0 4px rgba(59,130,246,0.12), 0 0 25px rgba(59,130,246,0.15);
          background: rgba(255,255,255,0.09);
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          border-radius: 14px;
          transition: all .3s ease;
        }

        .dropdown-arrow {
          transition: transform 0.3s ease;
          opacity: 0.7;
        }

        .nav-item:hover .dropdown-arrow {
          transform: rotate(180deg);
          opacity: 1;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .nav-link.active {
          color: white;
          background: rgba(59,130,246,0.12);
          border: 1px solid rgba(59,130,246,0.18);
          box-shadow: 0 0 20px rgba(59,130,246,0.15);
        }

        /* DYNAMIC MEGA DROPDOWN OVERHAUL */
        .mega-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-35%);
          background: rgba(10, 16, 30, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 28px;
          animation: dropdownReveal .3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 30px 70px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.05);
        }

        .jobs-mega {
          width: 860px; /* Expansive layout to match layout structures */
        }

        .standard-mega {
          width: 520px;
          transform: translateX(0);
          left: 0;
        }

        @keyframes dropdownReveal {
          from { opacity: 0; transform: translate(var(--tw-translate-x, -35%), 12px) scale(.97); }
          to { opacity: 1; transform: translate(var(--tw-translate-x, -35%), 0) scale(1); }
        }

        .mega-layout {
          display: flex;
          gap: 28px;
        }

        .mega-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .column-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #64748b;
          font-weight: 700;
          padding-left: 6px;
        }

        .column-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* Modern list rows */
        .mega-row-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.02);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .mega-row-item .item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .row-icon {
          font-size: 16px;
        }

        .row-icon.large {
          font-size: 20px;
          background: rgba(255,255,255,0.05);
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          transition: all 0.25s ease;
        }

        .row-name {
          color: #e2e8f0;
          font-size: 14px;
          font-weight: 500;
        }

        .row-count {
          font-size: 11px;
          font-weight: 700;
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          padding: 3px 8px;
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        /* Complex rows with descriptions */
        .mega-row-item.complex {
          justify-content: flex-start;
          gap: 14px;
          padding: 12px;
        }

        .item-text h4 {
          margin: 0;
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .item-text p {
          margin: 4px 0 0 0;
          color: #94a3b8;
          font-size: 12px;
        }

        /* Hover States */
        .mega-row-item:hover {
          background: rgba(59, 130, 246, 0.08);
          border-color: rgba(59, 130, 246, 0.2);
          transform: translateX(4px);
        }

        .mega-row-item.complex:hover .row-icon.large {
          background: #3b82f6;
          transform: scale(1.05);
        }

        /* Premium Recruiter Banner Card */
        .mega-banner-column {
          width: 240px;
          display: flex;
        }

        .recruiter-card {
          width: 100%;
          background: linear-gradient(145deg, #1e1b4b, #0f172a);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          padding: 24px;
          display: flex;
          align-items: center;
          text-align: center;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
        }

        .card-content {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .card-tag {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #a5b4fc;
          font-weight: 700;
          display: block;
          margin-bottom: 12px;
        }

        .card-icon-wrap {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px auto;
          font-size: 20px;
        }

        .recruiter-card h3 {
          color: white;
          margin: 0 0 6px 0;
          font-size: 16px;
          font-weight: 700;
        }

        .recruiter-card p {
          color: #94a3b8;
          font-size: 12px;
          margin: 0 0 18px 0;
          line-height: 1.5;
        }

        .card-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: white;
          color: #0f172a;
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .card-cta-btn span {
          transition: transform 0.2s ease;
        }

        .card-cta-btn:hover {
          background: #f1f5f9;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .card-cta-btn:hover span {
          transform: translateX(3px);
        }

        /* Decorative Abstract Glowing shapes inside banner */
        .card-overlay-shapes .overlay-circle-1 {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
          top: -20px;
          right: -20px;
          border-radius: 50%;
        }

        .card-overlay-shapes .overlay-circle-2 {
          position: absolute;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
          bottom: -40px;
          left: -40px;
          border-radius: 50%;
        }

        /* Standard Mega Grid (For services) */
        .mega-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .mega-item {
          display: flex;
          gap: 14px;
          padding: 14px;
          border-radius: 16px;
          text-decoration: none;
          transition: all .3s ease;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.02);
        }

        .mega-item:hover {
          transform: translateY(-2px);
          background: rgba(59,130,246,0.08);
          border-color: rgba(59,130,246,0.2);
        }

        .mega-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          font-size: 18px;
        }

        .mega-item h4 {
          color: white;
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        .mega-item p {
          margin: 4px 0 0 0;
          color: #94a3b8;
          font-size: 12px;
        }

        /* ACTIONS & OTHER NAV BUTTONS */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-secondary-btn {
          padding: 10px 18px;
          border-radius: 14px;
          text-decoration: none;
          color: #cbd5e1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 14px;
          font-weight: 600;
          transition: all .3s ease;
        }

        .nav-secondary-btn:hover {
          background: rgba(255,255,255,0.08);
          color: white;
          transform: translateY(-1px);
        }

        .nav-admin-btn {
          padding: 10px 20px;
          border-radius: 14px;
          text-decoration: none;
          color: white;
          font-size: 14px;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          transition: all .3s ease;
        }

        .nav-admin-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(59,130,246,0.35);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .hamburger span {
          width: 26px;
          height: 2px;
          background: white;
          transition: all .3s ease;
        }

        .hamburger.active span:nth-child(1) { transform: rotate(45deg) translateY(10px); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: rotate(-45deg) translateY(-10px); }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          opacity: 0;
          pointer-events: none;
          transition: all .3s ease;
          z-index: 900;
        }

        .mobile-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100vh;
          background: rgba(10,16,30,0.98);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255,255,255,0.08);
          padding: 120px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all .35s ease;
          z-index: 1001;
        }

        .mobile-menu.active {
          right: 0;
        }

        .mobile-link {
          padding: 14px 16px;
          border-radius: 14px;
          text-decoration: none;
          color: #cbd5e1;
          font-weight: 600;
          transition: all .3s ease;
        }

        .mobile-link:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        /* MEDIA QUERIES */
        @media(max-width: 1200px) {
          .jobs-mega {
            width: 760px;
            transform: translateX(-45%);
          }
          .mega-banner-column {
            display: none; /* Hide preview card on smaller screens */
          }
        }

        @media(max-width: 1024px) {
          .nav-menu, .nav-search, .nav-actions { display: none; }
          .hamburger { display: flex; }
          .nav-inner { height: 70px; }
        }

        @media(max-width: 640px) {
          .premium-nav { width: calc(100% - 20px); top: 10px; }
          .nav-inner { padding: 0 16px; }
          .logo-img { width: 105px; }
          .mobile-menu { width: 100%; }
        }
      `}</style>
    </>
  );
};

export default Navbar;