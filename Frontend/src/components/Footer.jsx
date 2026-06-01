import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');
    setStatusType('');
    
    if (!email) return;

    try {
      const response = await api.subscribers.subscribe(email);
      setMessage(response.message);
      if (response.success) {
        setStatusType('success');
        setEmail('');
      } else {
        setStatusType('error');
      }
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
      setStatusType('error');
    }
  };

  return (
    <>
      <footer className="footer-premium">
        <div className="container">
          <div className="footer-grid-layout">
            
            {/* Brand Information Column */}
            <div className="footer-brand-column">
              <Link to="/" className="footer-brand-logo" aria-label="Go to homepage">
                <img 
                  src="/images/RW_LOGO_Black_page-0001-removebg-preview.png" 
                  alt="Recruweb Logo" 
                  className="footer-logo-graphic"
                />
              </Link>
              <p className="footer-brand-desc">
                Transforming businesses through innovative, AI-powered HR solutions. Partner with us to unleash your team's full potential.
              </p>
              
              <div className="footer-contact-directory">
                <div className="footer-directory-item">
                  <div className="directory-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <a href="tel:+919336532636" className="directory-link">+91 9336532636</a>
                </div>

                <div className="footer-directory-item">
                  <div className="directory-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <a href="mailto:info@recruweb.com" className="directory-link">info@recruweb.com</a>
                </div>

                <div className="footer-directory-item align-top">
                  <div className="directory-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span className="directory-text">
                    H-112, Sector 63, Nearby Electronic City Metro Station, Noida, Uttar Pradesh
                  </span>
                </div>
              </div>

              <div className="footer-social-cluster">
                <a href="#" aria-label="Follow Recruweb on X/Twitter" className="social-icon-anchor">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Follow Recruweb on LinkedIn" className="social-icon-anchor">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Follow Recruweb on Facebook" className="social-icon-anchor">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Follow Recruweb on Instagram" className="social-icon-anchor">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Link Navigation Configurations */}
            <div className="footer-links-column">
              <h4 className="column-heading">Services</h4>
              <ul className="links-listing">
                <li><Link to="/services" className="navigation-anchor">Recruitment</Link></li>
                <li><Link to="/services" className="navigation-anchor">Payroll Solutions</Link></li>
                <li><Link to="/services" className="navigation-anchor">HRMS Software</Link></li>
                <li><Link to="/services" className="navigation-anchor">Training & Upskilling</Link></li>
                <li><Link to="/services" className="navigation-anchor">HR Outsourcing</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h4 className="column-heading">Company</h4>
              <ul className="links-listing">
                <li><Link to="/about" className="navigation-anchor">About Us</Link></li>
                <li><Link to="/team" className="navigation-anchor">Our Team</Link></li>
                <li><Link to="/careers" className="navigation-anchor">Careers</Link></li>
                <li><Link to="/contact" className="navigation-anchor">Contact Us</Link></li>
                <li><Link to="/testimonials" className="navigation-anchor">Testimonials</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h4 className="column-heading">Resources</h4>
              <ul className="links-listing">
                <li><Link to="/blog" className="navigation-anchor">Industry Blog</Link></li>
                <li><Link to="/case-studies" className="navigation-anchor">Case Studies</Link></li>
                <li><Link to="/faq" className="navigation-anchor">Help & FAQ</Link></li>
                <li><Link to="/privacy" className="navigation-anchor">Privacy Policy</Link></li>
                <li><Link to="/terms" className="navigation-anchor">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="footer-links-column newsletter-column-span">
              <h4 className="column-heading">Newsletter</h4>
              <p className="newsletter-explainer">Stay updated with our latest operational trends, news and insights.</p>
              
              <form className="modernized-newsletter-form" onSubmit={handleSubscribe}>
                <div className="input-wrapper-context">
                  <input 
                    type="email" 
                    placeholder="Enter business email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-text-field"
                    required
                    aria-label="Business Email for Subscription"
                  />
                </div>
                <button type="submit" className="newsletter-submit-trigger">
                  Subscribe
                </button>
              </form>
              
              {message && (
                <div className={`subscription-feedback-alert ${statusType === 'error' ? 'alert-error' : 'alert-success'}`}>
                  <span className="feedback-status-bullet"></span>
                  <p className="feedback-text-message">{message}</p>
                </div>
              )}
            </div>

          </div>

          {/* Sub Footer Border & Attribution */}
          <div className="footer-bottom-baseline">
            <p className="copyright-attribution">&copy; {new Date().getFullYear()} Recruweb. All rights reserved.</p>
            <div className="baseline-links-row">
              <Link to="/privacy" className="baseline-anchor">Privacy Policy</Link>
              <Link to="/terms" className="baseline-anchor">Terms of Service</Link>
              <Link to="/cookies" className="baseline-anchor">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        /* --- Premium Base Stylesheet Integration --- */
        .footer-premium {
          background-color: #0f172a;
          color: #94a3b8;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          padding: 80px 0 30px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          overflow: hidden;
        }

        .footer-grid-layout {
          display: grid;
          grid-template-columns: 1.3fr repeat(3, 0.6fr) 1.1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        /* --- Brand Mechanics --- */
        .footer-brand-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-brand-logo {
          display: inline-block;
          max-width: 160px;
        }

        .footer-logo-graphic {
          width: 100%;
          height: auto;
          display: block;
          /* Automatically adjusts black branded logo vectors for white/transparent on slate grids */
          filter: brightness(0) invert(1); 
          opacity: 0.95;
        }

        .footer-brand-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #94a3b8;
          margin: 0;
        }

        /* --- Contact Framework --- */
        .footer-contact-directory {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 5px;
        }

        .footer-directory-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-directory-item.align-top {
          align-items: flex-start;
        }

        .directory-icon-box {
          color: #0ea5e9;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .directory-icon-box svg {
          width: 100%;
          height: 100%;
        }

        .directory-link {
          font-size: 14px;
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .directory-link:hover {
          color: #4f46e5;
        }

        .directory-text {
          font-size: 14px;
          line-height: 1.5;
          color: #cbd5e1;
        }

        /* --- Social Cluster Configuration --- */
        .footer-social-cluster {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .social-icon-anchor {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #94a3b8;
          transition: all 0.25s ease;
        }

        .social-icon-anchor svg {
          width: 16px;
          height: 16px;
        }

        .social-icon-anchor:hover {
          color: #ffffff;
          background: #4f46e5;
          border-color: #4f46e5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
        }

        /* --- Structured Column Formats --- */
        .footer-links-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .column-heading {
          font-size: 15px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: 0.03em;
          margin: 0;
          position: relative;
          text-transform: uppercase;
        }

        .links-listing {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .navigation-anchor {
          font-size: 14px;
          color: #94a3b8;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s ease;
        }

        .navigation-anchor:hover {
          color: #0ea5e9;
          transform: translateX(3px);
        }

        /* --- Newsletter Module Architecture --- */
        .newsletter-column-span {
          gap: 16px;
        }

        .newsletter-explainer {
          font-size: 14px;
          line-height: 1.5;
          color: #94a3b8;
          margin: 0;
        }

        .modernized-newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 4px;
        }

        .input-wrapper-context {
          position: relative;
          width: 100%;
        }

        .newsletter-text-field {
          width: 100%;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 14px;
          color: #f8fafc;
          outline: none;
          transition: all 0.2s ease;
        }

        .newsletter-text-field:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
          background: #0f172a;
        }

        .newsletter-submit-trigger {
          background: #4f46e5;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          padding: 14px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
        }

        .newsletter-submit-trigger:hover {
          background: #4338ca;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
        }

        /* --- Live Subscriptions Status Alert UI --- */
        .subscription-feedback-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 10px;
          margin-top: 4px;
          animation: slideInUp 0.3s ease;
        }

        .subscription-feedback-alert.alert-success {
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .subscription-feedback-alert.alert-error {
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .feedback-status-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .alert-success .feedback-status-bullet { background-color: #10b981; }
        .alert-error .feedback-status-bullet { background-color: #ef4444; }

        .feedback-text-message {
          font-size: 13px;
          line-height: 1.4;
          margin: 0;
          font-weight: 500;
        }

        .alert-success .feedback-text-message { color: #34d399; }
        .alert-error .feedback-text-message { color: #f87171; }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- Footer Bottom Baseline --- */
        .footer-bottom-baseline {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .copyright-attribution {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .baseline-links-row {
          display: flex;
          gap: 24px;
        }

        .baseline-anchor {
          font-size: 13px;
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .baseline-anchor:hover {
          color: #cbd5e1;
        }

        /* --- Responsive Viewport Adaptation Layout Breakpoints --- */
        @media (max-width: 1200px) {
          .footer-grid-layout {
            grid-template-columns: 1.5fr repeat(3, 1fr);
          }
          .newsletter-column-span {
            grid-column: span 4;
            max-width: 480px;
            margin-top: 10px;
          }
        }

        @media (max-width: 768px) {
          .footer-premium {
            padding: 60px 0 30px 0;
          }
          .footer-grid-layout {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 24px;
          }
          .footer-brand-column {
            grid-column: span 2;
            margin-bottom: 10px;
          }
          .newsletter-column-span {
            grid-column: span 2;
            max-width: 100%;
          }
          .footer-bottom-baseline {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 16px;
          }
          .baseline-links-row {
            flex-wrap: wrap;
            gap: 16px 24px;
          }
        }

        @media (max-width: 480px) {
          .footer-grid-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .footer-brand-column, .newsletter-column-span {
            grid-column: span 1;
          }
          .modernized-newsletter-form {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;