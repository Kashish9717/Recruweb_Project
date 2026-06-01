import { useState, useRef, useEffect } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';
import { api } from '../utils/api';

const GetStarted = () => {
  const formRef = useRef(null);
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    employees: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Contextual Interactive Particle Ambient Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 45; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlanSelection = (planName) => {
    let targetedService = 'other';
    if (planName === 'Starter') targetedService = 'hrms';
    if (planName === 'Professional') targetedService = 'payroll';
    if (planName === 'Enterprise') targetedService = 'outsourcing';

    setFormData((prev) => ({ ...prev, service: targetedService }));
    
    // Smooth scrolling alignment configuration
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    const submitData = {
      contactPerson: `${formData.firstName} ${formData.lastName}`,
      companyName: formData.company,
      email: formData.email,
      phone: formData.phone,
      employees: formData.employees,
      services: formData.service ? [formData.service] : [], 
      message: formData.message
    };

    try {
      const response = await api.getStarted.submit(submitData);
      if (response.success) {
        setSuccessMessage(response.message || 'Thank you! Your strategic request has been systematically compiled.');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', employees: '', service: '', message: '' });
      } else {
        setErrorMessage(response.message || 'Submission infrastructure timed out. Please retry.');
      }
    } catch (error) {
      setErrorMessage('Failed to submit request. Please verify connection and try again.');
    }
    setIsSubmitting(false);
  };

  const plans = [
    {
      name: 'Starter',
      price: 'Custom',
      description: 'Essential core framework built for agile groups seeking unified structural compliance operational tracks.',
      features: ['Basic HR ecosystem protocols', 'Automated centralized payroll orchestration', 'Optimized up to 5 identities', 'Iterative email ticketing assistance'],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: 'Custom',
      description: 'Comprehensive functional engine configured specifically to control exponential multi-region team scaling scaling.',
      features: ['Enterprise core feature catalog', 'Deep execution programmatic payroll pipelines', 'Scalable up to 50 active records', 'Guaranteed high-priority routing support', 'Dynamic workforce development modules'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Fully customizable structural designs optimized for sophisticated global systems needing highly specific localized setups.',
      features: ['Tailored bespoke structural systems', 'Granular deep REST API configuration tools', 'Unlimited database transaction scales', 'Continuous Dedicated Response Squad access', 'On-site continuous optimization engineering'],
      highlighted: false,
    }
  ];

  return (
    <>
      <style>{`
        :root {
          --core-primary: #6366f1;
          --core-primary-hover: #4f46e5;
          --core-primary-gradient: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
          --core-secondary: #0ea5e9;
          --ui-dark: #090d16;
          --ui-light-bg: #fafafa;
          --ui-border: #f1f5f9;
          --ui-border-hover: #e2e8f0;
          --txt-main: #334155;
          --txt-muted: #64748b;
        }

        /* Ambient Keyframes Animators */
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.4; }
          50% { transform: scale(1.08) translate(15px, -20px); opacity: 0.6; }
        }
        @keyframes slideUpReveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .layout-hero {
          position: relative;
          min-height: 85vh;
          padding-top: 140px;
          display: flex;
          align-items: center;
          background: #030712; 
          overflow: hidden;
        }

        .ambient-glow-1 {
          position: absolute; top: -10%; right: -5%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
          animation: subtlePulse 8s infinite ease-in-out; pointer-events: none;
        }
        .ambient-glow-2 {
          position: absolute; bottom: -5%; left: -5%; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%);
          animation: subtlePulse 12s infinite ease-in-out alternate; pointer-events: none;
        }

        .hero-canvas {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;
        }

        .animate-reveal {
          animation: slideUpReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .ui-tag-badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #93c5fd;
          font-weight: 600;
          font-size: 12px;
          border-radius: 9999px;
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .layout-display-heading {
          font-size: 64px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
        }
        .text-gradient {
          background: linear-gradient(to right, #ffffff, #93c5fd, #6366f1);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerGlow 6s linear infinite;
        }

        .layout-body-lead {
          font-size: 19px;
          color: #94a3b8;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .layout-container-section {
          padding: 120px 24px;
          background: #ffffff;
        }

        .layout-container-section-alt {
          padding: 120px 24px;
          background: #f8fafc;
          position: relative;
        }

        .layout-cards-flexbox {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 60px auto 0 auto;
        }

        .ui-interactive-card {
          background: #ffffff;
          border: 1px solid var(--ui-border);
          border-radius: 24px;
          padding: 48px 36px;
          position: relative;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.01);
        }

        .ui-interactive-card:hover {
          transform: translateY(-8px);
          border-color: var(--ui-border-hover);
          box-shadow: 0 30px 60px -15px rgba(15, 23, 42, 0.08);
        }

        .ui-interactive-card-featured {
          border: none;
          background: linear-gradient(#fff, #fff) padding-box,
                      linear-gradient(135deg, #6366f1, #0ea5e9) border-box;
          border: 2px solid transparent;
          box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.12);
        }
        .ui-interactive-card-featured:hover {
          box-shadow: 0 35px 70px -15px rgba(99, 102, 241, 0.2);
        }

        .ui-floating-ribbon {
          position: absolute;
          top: -14px; right: 36px;
          background: var(--core-primary-gradient);
          color: #ffffff;
          padding: 4px 16px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
        }

        .ui-action-trigger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 28px;
          font-weight: 600;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          font-size: 15px;
          letter-spacing: -0.01em;
        }

        .ui-action-trigger-solid {
          background: #0f172a;
          color: #ffffff;
        }
        .ui-interactive-card-featured .ui-action-trigger-solid {
          background: var(--core-primary-gradient);
          box-shadow: 0 8px 20px -6px rgba(79, 70, 229, 0.3);
        }
        .ui-action-trigger-solid:hover { transform: scale(1.02); opacity: 0.95; }
        .ui-action-trigger-solid:disabled { background: #cbd5e1; cursor: not-allowed; transform: none; box-shadow: none; }

        .ui-action-trigger-hollow {
          background: transparent;
          color: #0f172a;
          border: 1px solid #e2e8f0;
        }
        .ui-action-trigger-hollow:hover { background: #f8fafc; border-color: #cbd5e1; transform: scale(1.01); }

        .layout-form-block {
          max-width: 800px;
          margin: 60px auto 0 auto;
          background: #ffffff;
          padding: 56px;
          border-radius: 32px;
          box-shadow: 0 40px 80px -20px rgba(15, 23, 42, 0.05);
          border: 1px solid rgba(15, 23, 42, 0.03);
        }

        .ui-form-input-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .ui-input-field-group {
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
        }

        .ui-input-field-group label {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .ui-input-field-group input, .ui-input-field-group select, .ui-input-field-group textarea {
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 15px;
          color: var(--ui-dark);
          background-color: #f8fafc;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .ui-input-field-group input:focus, .ui-input-field-group select:focus, .ui-input-field-group textarea:focus {
          border-color: var(--core-primary);
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
          transform: translateY(-1px);
        }

        .ui-input-field-group textarea { min-height: 130px; resize: vertical; }

        .ui-alert-notice {
          padding: 16px 20px;
          border-radius: 12px;
          font-weight: 500;
          margin-bottom: 28px;
          font-size: 14px;
          animation: slideUpReveal 0.4s ease;
        }
        .ui-alert-notice-success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
        .ui-alert-notice-error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

        @media (max-width: 768px) {
          .ui-form-input-split { grid-template-columns: 1fr; gap: 0; }
          .layout-display-heading { font-size: 42px; }
          .layout-form-block { padding: 32px 24px; border-radius: 24px; }
          .layout-container-section, .layout-container-section-alt { padding: 80px 20px; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="layout-hero">
        <div className="ambient-glow-1"></div>
        <div className="ambient-glow-2"></div>
        <canvas ref={canvasRef} className="hero-canvas" />
        
        <div className="animate-reveal" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center', zIndex: 2 }}>
          <span className="ui-tag-badge">Operational Scale v2.6</span>
          <h1 className="layout-display-heading">Transform Your Business<br /><span className="text-gradient">Operational Efficiency</span></h1>
          <p className="layout-body-lead">
            Take the first proactive step toward modernizing your background operations with beautiful, clean, automated workflows.
          </p>
        </div>
        <ScrollIndicator />
      </section>

      {/* Pricing/Architecture Section */}
      <section className="layout-container-section">
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <span className="ui-tag-badge" style={{ background: '#f1f5f9', color: '#475569' }}>Pricing Architecture</span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--ui-dark)', marginBottom: '14px', letterSpacing: '-0.02em' }}>Choose Your Infrastructure Plan</h2>
          <p className="layout-body-lead" style={{ color: 'var(--txt-muted)' }}>Flexible custom-fit operational setups scaled precisely to your current internal headcount.</p>
        </div>

        <div className="layout-cards-flexbox">
          {plans.map((plan, index) => (
            <div className={`ui-interactive-card ${plan.highlighted ? 'ui-interactive-card-featured' : ''}`} key={index}>
              {plan.highlighted && <div className="ui-floating-ribbon">Most Popular</div>}
              
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ui-dark)', marginBottom: '10px' }}>{plan.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--txt-muted)', marginBottom: '32px', minHeight: '44px', lineHeight: '1.6' }}>{plan.description}</p>
              
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
                <span style={{ fontSize: '44px', fontWeight: 800, color: 'var(--ui-dark)', letterSpacing: '-0.03em' }}>{plan.price}</span>
                <span style={{ fontSize: '14px', color: 'var(--txt-muted)', marginLeft: '8px', fontWeight: 500 }}>/ customized projection</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flexGrow: 1 }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ fontSize: '14px', color: 'var(--txt-main)', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px', lineHeight: '1.5' }}>
                    <span style={{ color: 'var(--core-primary)', fontWeight: 'bold', fontSize: '16px' }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                type="button" 
                className={`ui-action-trigger ${plan.highlighted ? 'ui-action-trigger-solid' : 'ui-action-trigger-hollow'}`}
                onClick={() => handlePlanSelection(plan.name)}
              >
                Select {plan.name} Architecture
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Form Submission Section */}
      <section className="layout-container-section-alt" ref={formRef}>
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <span className="ui-tag-badge" style={{ background: '#e0e7ff', color: '#4f46e5' }}>Contact Core</span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--ui-dark)', marginBottom: '14px', letterSpacing: '-0.02em' }}>Request a Structured Proposal</h2>
          <p className="layout-body-lead" style={{ color: 'var(--txt-muted)' }}>Provide details below and an operations strategist will coordinate standard evaluation options within 24 hours.</p>
        </div>

        <div className="layout-form-block">
          <form onSubmit={handleSubmit}>
            <div className="ui-form-input-split">
              <div className="ui-input-field-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" required />
              </div>
              <div className="ui-input-field-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" required />
              </div>
            </div>

            <div className="ui-input-field-group">
              <label>Business Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="corporate@company.com" required />
            </div>

            <div className="ui-form-input-split">
              <div className="ui-input-field-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 000-0000" />
              </div>
              <div className="ui-input-field-group">
                <label>Company Identity</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Enterprise name" />
              </div>
            </div>

            <div className="ui-form-input-split">
              <div className="ui-input-field-group">
                <label>Employee Capacity Scale</label>
                <select name="employees" value={formData.employees} onChange={handleChange}>
                  <option value="">Select range...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="100+">100+ employees</option>
                </select>
              </div>
              <div className="ui-input-field-group">
                <label>Primary Area of Inquiry</label>
                <select name="service" value={formData.service} onChange={handleChange}>
                  <option value="">Select requirement focus...</option>
                  <option value="recruitment">Talent Acquisition</option>
                  <option value="payroll">Payroll Management</option>
                  <option value="hrms">HRMS Software Systems</option>
                  <option value="training">Training & Development</option>
                  <option value="outsourcing">Full HR Outsourcing</option>
                  <option value="other">Other Unique Options</option>
                </select>
              </div>
            </div>

            <div className="ui-input-field-group" style={{ marginBottom: '36px' }}>
              <label>Additional Specification Details</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe targeted timelines or core operational bottlenecks..."></textarea>
            </div>

            {successMessage && <div className="ui-alert-notice ui-alert-notice-success">{successMessage}</div>}
            {errorMessage && <div className="ui-alert-notice ui-alert-notice-error">{errorMessage}</div>}

            <button type="submit" className="ui-action-trigger ui-action-trigger-solid" style={{ background: 'var(--core-primary-gradient)', boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }} disabled={isSubmitting}>
              {isSubmitting ? 'Verifying Credentials...' : 'Submit Request Structure'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default GetStarted;