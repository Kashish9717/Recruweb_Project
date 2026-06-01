import { useState, useEffect } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';
import '../pages/Contact.css'

const serviceSubjectMap = {
  'industry': { subject: 'services', label: 'Industry Manpower' },
  'facility': { subject: 'services', label: 'Facility Management' },
  'hro': { subject: 'services', label: 'HR Outsourcing' },
  'recruitment': { subject: 'services', label: 'Only Recruitment' },
  'hospitality': { subject: 'services', label: 'Hospitality' },
  'contractual': { subject: 'services', label: 'Contractual Hiring' }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('form');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service && serviceSubjectMap[service]) {
      const { subject, label } = serviceSubjectMap[service];
      setFormData(prev => ({
        ...prev,
        subject,
        message: `I'm interested in ${label} services. Please provide more information.`
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      localStorage.setItem(`contact_${Date.now()}`, JSON.stringify({
        ...formData,
        submittedAt: new Date().toISOString()
      }));
      setSuccessMessage('Message sent successfully! We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again.');
    }
    setIsSubmitting(false);
  };

  const contactCards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: 'Phone',
      primary: '+91 9336532636',
      secondary: 'Mon-Sat, 9:30 AM - 6:30 PM',
      color: '#3b82f6'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      title: 'Email',
      primary: 'info@recruweb.com',
      secondary: 'We reply within 24 hours',
      color: '#6366f1'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: 'Office',
      primary: 'H-112, Sector 63, Noida',
      secondary: 'Nearby Electronic City Metro, UP',
      color: '#0ea5e9'
    }
  ];

  const quickActions = [
    { icon: '💼', title: 'Post a Job', desc: 'Find your next hire', link: '/post-job' },
    { icon: '📄', title: 'Apply for Jobs', desc: 'Browse opportunities', link: '/jobs' },
    { icon: '📅', title: 'Schedule Interview', desc: 'Book a slot', link: '/schedule-interview' },
    { icon: '🤝', title: 'Partner With Us', desc: 'Business inquiries', link: '/contact' }
  ];

  const faqs = [
    { q: 'What services does Recruweb offer?', a: 'We offer end-to-end recruitment solutions including staffing, executive search, HR consulting, and interview scheduling services.' },
    { q: 'How quickly can you fill a position?', a: 'Most positions are filled within 2-4 weeks, depending on the seniority and specialization required.' },
    { q: 'Do you charge for job postings?', a: 'Basic job postings are free. Premium features like featured listings are available with our paid plans.' },
    { q: 'Can I schedule an interview online?', a: 'Yes! Use our Schedule Interview feature to book a convenient time slot with our team.' }
  ];

  return (
    <div className="contact-page-wrapper">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-shapes">
          <div className="contact-shape contact-shape-1"></div>
          <div className="contact-shape contact-shape-2"></div>
        </div>
        <div className="contact-container">
          <div className="contact-header">
            <span className="contact-tag">Contact Us</span>
            <h1 className="contact-title">Let's Start a Conversation</h1>
            <p className="contact-subtitle">
              Have questions? We'd love to hear from you. Reach out and our team will get back to you promptly.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Main Sections Body Wrapper */}
      <div className="contact-sections-body">
        
        {/* Quick Actions Panel */}
        <section className="contact-body-section">
          <div className="contact-container">
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <a href={action.link} key={index} className="quick-action-card">
                  <span className="quick-action-icon">{action.icon}</span>
                  <div className="quick-action-text">
                    <h4>{action.title}</h4>
                    <p>{action.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Core Direct Communication Cards */}
        <section className="contact-body-section">
          <div className="contact-container">
            <div className="contact-cards-grid">
              {contactCards.map((card, index) => (
                <div key={index} className="contact-card" style={{ '--card-accent': card.color }}>
                  <div className="contact-card-icon" style={{ background: `${card.color}12`, color: card.color }}>
                    {card.icon}
                  </div>
                  <div className="contact-card-content">
                    <h3>{card.title}</h3>
                    <p className="contact-card-primary">{card.primary}</p>
                    <p className="contact-card-secondary">{card.secondary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Forms, Maps, and Supplemental Info Area */}
        <section className="contact-body-section final-section-padding">
          <div className="contact-container">
            <div className="contact-main-grid">
              
              {/* Form & Tab Control Column */}
              <div className="contact-grid-left">
                <div className="contact-tabs">
                  <button 
                    className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
                    onClick={() => setActiveTab('form')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Send Message
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                    onClick={() => setActiveTab('faq')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    FAQs
                  </button>
                </div>

                {activeTab === 'form' ? (
                  <form className="contact-form-card" onSubmit={handleSubmit}>
                    <h3>Send us a message</h3>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          placeholder="John Doe"
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          placeholder="john@example.com"
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div className="form-group">
                        <label>Subject *</label>
                        <select name="subject" value={formData.subject} onChange={handleChange} required>
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="services">Services</option>
                          <option value="industry-manpower">Industry Manpower</option>
                          <option value="facility-management">Facility Management</option>
                          <option value="hr-outsourcing">HR Outsourcing</option>
                          <option value="only-recruitment">Only Recruitment</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="contractual-hiring">Contractual Hiring</option>
                          <option value="pricing">Pricing</option>
                          <option value="support">Support</option>
                          <option value="careers">Careers</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Message *</label>
                      <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        placeholder="Tell us how we can help you..."
                        rows="5"
                        required
                      ></textarea>
                    </div>
                    
                    {successMessage && (
                      <div className="form-alert success">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        {successMessage}
                      </div>
                    )}
                    {errorMessage && (
                      <div className="form-alert error">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {errorMessage}
                      </div>
                    )}
                    
                    <button type="submit" className="submit-action-btn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="btn-spinner"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="faq-list-wrapper">
                    <h3>Frequently Asked Questions</h3>
                    <div className="faq-items-container">
                      {faqs.map((faq, index) => (
                        <div key={index} className="faq-item-card">
                          <h4>{faq.q}</h4>
                          <p>{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Side Info Panel Column */}
              <div className="contact-grid-right">
                <div className="map-frame-holder">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5478!2d77.3815!3d28.6272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5456e8c2555%3A0x5a5c7c8b9f3e4d!2sH-112%2C%20Sector%2063%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%" 
                    height="280" 
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen="" 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Recruweb Office Location - H-112, Sector 63, Noida"
                  ></iframe>
                </div>

                <div className="info-meta-card response-speed">
                  <div className="meta-card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div className="meta-card-text">
                    <h4>Quick Response Time</h4>
                    <p>We typically respond within <strong>2-4 hours</strong> during business hours.</p>
                  </div>
                </div>

                <div className="info-meta-card social-connect">
                  <h4>Follow Us</h4>
                  <div className="social-links-flex">
                    <a href="#" className="social-icon-btn linkedin" title="LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-icon-btn twitter" title="Twitter">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-icon-btn facebook" title="Facebook">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://wa.me/919336532636" className="social-icon-btn whatsapp" title="WhatsApp">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="info-meta-card direct-call-cta">
                  <h4>Need immediate assistance?</h4>
                  <p>Call us directly for urgent matters</p>
                  <a href="tel:+919336532636" className="call-btn-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;