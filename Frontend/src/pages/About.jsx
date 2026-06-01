import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';

const About = () => {
  const canvasRef = useRef(null);

  // High-performance canvas interactive backdrop array execution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = -(Math.random() * 0.6 + 0.2);
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.y += this.speedY;
        if (this.y < -10) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(129, 140, 248, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 35; i++) {
      particles.push(new Particle());
    }

    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const stats = [
    { number: '500+', label: 'Corporate Clients', icon: '😊' },
    { number: '10,000+', label: 'Talent Placements', icon: '🎯' },
    { number: '50+', label: 'Domain Consultants', icon: '👥' },
    { number: '98%', label: 'Retention Success', icon: '⭐' },
  ];

  const teamMembers = [
    { 
      name: 'Saurabh Kumar', 
      position: 'CEO & Founder', 
      description: 'Over two decades architecting enterprise HR infrastructure and direct executive recruitment search pipelines across global landscapes.',
      color: '#4f46e5'
    },
    { 
      name: 'Nitin Dourbi & Harshit Keshari', 
      position: 'Principal Enterprise Full Stack Engineers', 
      description: 'Core systems architects managing programmatic workflow design layouts, scaling Recruweb digital architecture infrastructures.',
      color: '#0ea5e9'
    },
  ];

  const values = [
    { icon: '🎯', title: 'Excellence', description: 'Setting pristine operational milestones that completely outpace classic traditional legacy benchmarks.' },
    { icon: '🤝', title: 'Integrity', description: 'Fostering radical transparency and absolute data compliance with every scaling enterprise partnership.' },
    { icon: '💡', title: 'Innovation', description: 'Deploying algorithmic pipelines to pair specialized skill records with deep cultural profiles.' },
    { icon: '⚡', title: 'Efficiency', description: 'Accelerating traditional turnaround windows down to precise, single-digit enterprise fulfillment cycles.' },
    { icon: '🌍', title: 'Pan-India Scale', description: 'Delivering uncompromised local, regional, and national talent solutions through modular physical networks.' },
    { icon: '📈', title: 'Shared Growth', description: 'Investing continuous architectural frameworks into our client partnerships and active workforce.' },
  ];

  const milestones = [
    { year: '2023', title: 'Architectural Inception', description: 'Founded with a core systemic roadmap to revolutionize human workforce pipelines across India.', icon: '🚀' },
    { year: '2024', title: 'Subcontinental Scale', description: 'Expanded logistics and structural operations globally to fulfill high-volume Pan-India requests.', icon: '🌏' },
    { year: '2025', title: 'SaaS Platform Deployment', description: 'Rolled out fully integrated, high-capacity digital HRMS suites for enterprise operations management.', icon: '💻' },
    { year: '2026', title: 'Continuous Acceleration', description: 'Scaled our internal core expert workforce layout to match accelerating commercial client pipelines.', icon: '📈' },
  ];

  return (
    <>
      <style>{`
        :root {
          --brand-dark: #070a13;
          --brand-accent: #4f46e5;
          --brand-gradient: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
          --brand-glow: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 65%);
          --ui-border: #f1f5f9;
          --txt-main: #334155;
          --txt-muted: #64748b;
          --transition-smooth: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes globalFadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes backgroundPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        .premium-container {
          width: 100%; max-width: 1240px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 5;
        }

        /* Hero Layout Styling */
        .about-hero-section {
          position: relative; background: var(--brand-dark); min-height: 90vh; display: flex; align-items: center; overflow: hidden; padding-top: 120px; padding-bottom: 80px;
        }
        .hero-canvas-wrap {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;
        }
        .about-hero-grid {
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center;
        }
        .ui-premium-badge {
          display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 9999px; color: #93c5fd; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 24px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        }
        .ui-premium-badge-dot {
          width: 6px; height: 6px; background: #38bdf8; border-radius: 50%; box-shadow: 0 0 10px #38bdf8;
        }
        .about-hero-title {
          font-size: 60px; font-weight: 800; color: #ffffff; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 24px; animation: globalFadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gradient-span {
          background: linear-gradient(135deg, #a5b4fc 0%, #6366f1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .about-hero-description {
          font-size: 19px; color: #94a3b8; line-height: 1.6; margin-bottom: 40px; max-width: 580px;
        }

        /* Micro Inline Stat Elements */
        .inline-stats-row {
          display: flex; gap: 40px; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 32px; margin-bottom: 40px;
        }
        .inline-stat-node {
          display: flex; flex-direction: column;
        }
        .inline-stat-num {
          font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;
        }
        .inline-stat-lbl {
          font-size: 13px; color: #64748b; font-weight: 500; margin-top: 4px;
        }

        /* Button Architecture */
        .action-flex-group {
          display: flex; gap: 16px;
        }
        .btn-premium-solid {
          display: inline-flex; align-items: center; gap: 10px; background: var(--brand-gradient); color: #ffffff; padding: 14px 28px; font-weight: 600; border-radius: 12px; transition: var(--transition-smooth); font-size: 15px; box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
        }
        .btn-premium-solid:hover { transform: translateY(-2px); box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5); }
        .btn-premium-hollow {
          display: inline-flex; align-items: center; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.12); color: #ffffff; padding: 14px 28px; font-weight: 600; border-radius: 12px; transition: var(--transition-smooth); font-size: 15px; backdrop-filter: blur(4px);
        }
        .btn-premium-hollow:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.25); transform: translateY(-2px); }

        /* Dynamic Visual Floating Composite */
        .about-hero-visual {
          position: relative; width: 100%; height: 450px; display: flex; align-items: center; justify-content: center;
        }
        .visual-glowing-backplate {
          position: absolute; width: 350px; height: 350px; background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%); animation: backgroundPulse 6s infinite ease-in-out; pointer-events: none;
        }
        .visual-glass-center {
          width: 180px; height: 180px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(16px); border-radius: 36px; display: flex; align-items: center; justify-content: center; font-size: 48px; box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        .floating-glass-card {
          position: absolute; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-radius: 20px; padding: 18px 22px; display: flex; align-items: center; gap: 14px; box-shadow: 0 20px 40px rgba(0,0,0,0.25); animation: subtleFloat 6s infinite ease-in-out;
        }
        .fg-card-1 { top: 15%; left: 0; animation-delay: 0s; }
        .fg-card-2 { bottom: 15%; left: -5%; animation-delay: 1.5s; }
        .fg-card-3 { top: 40%; right: -5%; animation-delay: 3s; }
        .fg-icon-box {
          width: 42px; height: 42px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px;
        }
        .fg-txt-wrap { display: flex; flex-direction: column; }
        .fg-title { color: #ffffff; font-size: 14px; font-weight: 600; }
        .fg-subtitle { color: #94a3b8; font-size: 12px; margin-top: 2px; }

        /* Unified Light Section Configuration */
        .section-generic-padding {
          padding: 120px 0; background: #6d7691; position: relative;
        }
        .section-generic-padding-alt {
          padding: 120px 0; background: #b6c4d1; position: relative;
        }
        .center-section-header {
          text-align: center; max-width: 650px; margin: 0 auto 64px auto;
        }
        .center-section-header h2 {
          font-size: 38px; font-weight: 800; color: var(--brand-dark); letter-spacing: -0.02em; margin-top: 14px;
        }
        .center-section-header p {
          font-size: 16px; color: var(--txt-muted); line-height: 1.6; margin-top: 14px;
        }
        .light-badge {
          background: #25141e; color: #d8e0ec; display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .light-badge-dot { width: 5px; height: 5px; background: var(--brand-accent); border-radius: 50%; }

        /* Standalone Grid Architectures */
        .stats-infographic-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;
        }
        .metric-premium-card {
          background: #ffffff; border: 1px solid var(--ui-border); border-radius: 24px; padding: 40px 32px; text-align: center; transition: var(--transition-smooth); box-shadow: 0 10px 30px rgba(0,0,0,0.01);
        }
        .metric-premium-card:hover { transform: translateY(-6px); border-color: #cbd5e1; box-shadow: 0 20px 40px -10px rgba(15,23,42,0.05); }
        .metric-icon-sphere {
          width: 56px; height: 56px; background: #f0fdf4; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 20px auto;
        }
        .metric-premium-card:nth-child(2) .metric-icon-sphere { background: #eff6ff; }
        .metric-premium-card:nth-child(3) .metric-icon-sphere { background: #f5f3ff; }
        .metric-premium-card:nth-child(4) .metric-icon-sphere { background: #fff7ed; }
        .metric-value-string { font-size: 40px; font-weight: 800; color: var(--brand-dark); letter-spacing: -0.02em; }
        .metric-label-string { font-size: 14px; color: var(--txt-muted); font-weight: 500; margin-top: 6px; }

        /* Double Flex Story Structure */
        .story-split-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .story-text-container p { font-size: 16px; color: var(--txt-main); line-height: 1.7; margin-bottom: 24px; }
        .story-inline-features { display: flex; flex-direction: column; gap: 16px; margin-top: 32px; }
        .story-feature-row { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 600; color: var(--brand-dark); }
        .story-feature-circle { width: 28px; height: 28px; background: rgba(79, 70, 229, 0.08); color: var(--brand-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; }

        /* Story Visual Element block */
        .story-composite-visual {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 32px; padding: 48px; position: relative; box-shadow: 0 30px 60px -15px rgba(15,23,42,0.15); display: flex; flex-direction: column; gap: 32px;
        }
        .story-embedded-box { display: flex; align-items: center; gap: 18px; }
        .story-emb-icon { width: 50px; height: 50px; background: rgba(255,255,255,0.05); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .story-embedded-box h3 { color: #ffffff; font-size: 20px; font-weight: 700; }
        .story-embedded-box p { color: #94a3b8; font-size: 14px; margin-top: 4px; }
        .story-stat-mini-row { display: flex; gap: 40px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 28px; }

        /* Mission / Vision Component Cards */
        .strategic-dual-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .strategic-glass-card {
          background: #ffffff; border: 1px solid var(--ui-border); border-radius: 28px; padding: 48px; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.01); transition: var(--transition-smooth);
        }
        .strategic-glass-card:hover { transform: translateY(-4px); box-shadow: 0 25px 50px -12px rgba(15,23,42,0.06); }
        .strat-icon-box { width: 52px; height: 52px; background: #e0e7ff; color: var(--brand-accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 24px; }
        .strategic-glass-card h3 { font-size: 24px; font-weight: 700; color: var(--brand-dark); margin-bottom: 16px; }
        .strategic-glass-card p { font-size: 15px; color: var(--txt-main); line-height: 1.6; margin-bottom: 28px; }
        .strat-tag-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .strat-tag { font-size: 12px; font-weight: 600; color: var(--txt-muted); background: #f1f5f9; padding: 4px 12px; border-radius: 6px; }

        /* Core Values Modular Layout */
        .values-hex-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
        .value-hex-card {
          background: #ffffff; border: 1px solid var(--ui-border); border-radius: 20px; padding: 36px; transition: var(--transition-smooth);
        }
        .value-hex-card:hover { border-color: #cbd5e1; transform: translateY(-4px); box-shadow: 0 20px 40px -10px rgba(15,23,42,0.04); }
        .value-hex-card h3 { font-size: 18px; font-weight: 700; color: var(--brand-dark); margin: 16px 0 10px 0; }
        .value-hex-card p { font-size: 14px; color: var(--txt-muted); line-height: 1.6; }

        /* Timeline Metric Path track */
        .timeline-vertical-path {
          max-width: 800px; margin: 0 auto; position: relative; display: flex; flex-direction: column; gap: 40px;
        }
        .timeline-vertical-path::before {
          content: ''; position: absolute; left: 28px; top: 10px; bottom: 10px; width: 2px; background: #e2e8f0;
        }
        .timeline-node-item { display: flex; gap: 24px; position: relative; }
        .timeline-sphere-indicator {
          width: 58px; height: 58px; background: #ffffff; border: 2px solid #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; z-index: 5; flex-shrink: 0; transition: var(--transition-smooth);
        }
        .timeline-node-item:hover .timeline-sphere-indicator { border-color: var(--brand-accent); box-shadow: 0 0 0 4px rgba(99,102,241,0.1); }
        .timeline-body-box { background: #ffffff; border: 1px solid var(--ui-border); border-radius: 20px; padding: 28px 32px; flex-grow: 1; box-shadow: 0 4px 20px rgba(0,0,0,0.01); }
        .tl-year-badge { font-size: 12px; font-weight: 700; color: var(--brand-accent); background: rgba(79,70,229,0.06); padding: 3px 10px; border-radius: 6px; display: inline-block; margin-bottom: 8px; }
        .timeline-body-box h3 { font-size: 18px; font-weight: 700; color: var(--brand-dark); margin-bottom: 6px; }
        .timeline-body-box p { font-size: 14px; color: var(--txt-muted); line-height: 1.5; }

        /* Team Structure Stylesheet core */
        .team-profile-flexbox { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 32px; }
        .team-profile-card {
          background: #ffffff; border: 1px solid var(--ui-border); border-radius: 24px; padding: 40px; display: flex; gap: 28px; align-items: flex-start; transition: var(--transition-smooth);
        }
        .team-profile-card:hover { border-color: #cbd5e1; transform: translateY(-4px); box-shadow: 0 25px 50px -12px rgba(15,23,42,0.05); }
        .team-avatar-sphere {
          width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 28px; font-weight: 700; position: relative; flex-shrink: 0;
        }
        .avatar-pulsing-halo {
          position: absolute; top: -4px; left: -4px; right: -4px; bottom: -4px; border: 1px solid #e2e8f0; border-radius: 50%;
        }
        .team-meta-wrap h3 { font-size: 20px; font-weight: 700; color: var(--brand-dark); }
        .team-role-string { font-size: 13px; font-weight: 600; color: var(--brand-accent); display: block; margin: 4px 0 12px 0; text-transform: uppercase; letter-spacing: 0.02em; }
        .team-meta-wrap p { font-size: 14px; color: var(--txt-muted); line-height: 1.6; }

        /* Call To Action Global Layout Block */
        .cta-closure-section { padding: 100px 0; background: #070a13; position: relative; overflow: hidden; }
        .cta-blur-radial { position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 65%); top: -50%; left: -10%; pointer-events: none; }
        .cta-closure-box { text-align: center; max-width: 700px; margin: 0 auto; position: relative; z-index: 5; }
        .cta-closure-box h2 { font-size: 42px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 18px; }
        .cta-closure-box p { font-size: 18px; color: #94a3b8; line-height: 1.6; margin-bottom: 36px; }

        @media (max-width: 991px) {
          .about-hero-grid, .story-split-grid, .strategic-dual-grid { grid-template-columns: 1fr; gap: 48px; }
          .about-hero-section { text-align: center; padding-top: 100px; }
          .about-hero-description, .inline-stats-row, .action-flex-group { margin-left: auto; margin-right: auto; justify-content: center; }
          .about-hero-visual { height: 350px; }
        }
        @media (max-width: 576px) {
          .about-hero-title { font-size: 40px; }
          .inline-stats-row { gap: 20px; flex-wrap: wrap; }
          .action-flex-group { flex-direction: column; width: 100%; }
          .btn-premium-solid, .btn-premium-hollow { width: 100%; justify-content: center; }
          .team-profile-card { flex-direction: column; gap: 20px; }
        }
      `}</style>

      {/* About Hero Section */}
      <section className="about-hero-section">
        <div className="hero-canvas-wrap">
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="premium-container">
          <div className="about-hero-grid">
            <div>
              <div className="ui-premium-badge">
                <span className="ui-premium-badge-dot"></span>
                <span>Enterprise Framework</span>
              </div>
              <h1 className="about-hero-title">
                Empowering Businesses Through <span className="gradient-span">People</span>
              </h1>
              <p className="about-hero-description">
                We are Recruweb—your trusted operational architecture partner in robust human capital solutions, engineered to transform how agile institutions manage, scale, and optimize talent assets.
              </p>
              
              <div className="inline-stats-row">
                <div className="inline-stat-node">
                  <span className="inline-stat-num">10+ Years</span>
                  <span className="inline-stat-lbl">Market Presence</span>
                </div>
                <div className="inline-stat-node">
                  <span className="inline-stat-num">500+</span>
                  <span className="inline-stat-lbl">Active Corporates</span>
                </div>
                <div className="inline-stat-node">
                  <span className="inline-stat-num">50+</span>
                  <span className="inline-stat-lbl">Metros Covered</span>
                </div>
              </div>

              <div className="action-flex-group">
                <Link to="/contact" className="btn-premium-solid">
                  <span>Partner With Us</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link to="/services" className="btn-premium-hollow">
                  <span>Explore Platform</span>
                </Link>
              </div>
            </div>

            <div className="about-hero-visual">
              <div className="visual-glowing-backplate"></div>
              <div className="visual-glass-center">✨</div>
              <div className="floating-glass-card fg-card-1">
                <div className="fg-icon-box">💼</div>
                <div className="fg-txt-wrap">
                  <span className="fg-title">Complete HRMS</span>
                  <span className="fg-subtitle">SaaS Infrastructure</span>
                </div>
              </div>
              <div className="floating-glass-card fg-card-2">
                <div className="fg-icon-box">🏆</div>
                <div className="fg-txt-wrap">
                  <span className="fg-title">Verified Trust</span>
                  <span className="fg-subtitle">500+ Active Brands</span>
                </div>
              </div>
              <div className="floating-glass-card fg-card-3">
                <div className="fg-icon-box">⚡</div>
                <div className="fg-txt-wrap">
                  <span className="fg-title">Rapid Fulfill</span>
                  <span className="fg-subtitle">7-Day Deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Metrics Infographic Section */}
      <section className="section-generic-padding">
        <div className="premium-container">
          <div className="stats-infographic-grid">
            {stats.map((stat, i) => (
              <div key={i} className="metric-premium-card">
                <div className="metric-icon-sphere">{stat.icon}</div>
                <div className="metric-value-string">{stat.number}</div>
                <div className="metric-label-string">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Corporate History Story Section */}
      <section className="section-generic-padding-alt">
        <div className="premium-container">
          <div className="story-split-grid">
            <div>
              <div className="light-badge">
                <span className="light-badge-dot"></span>
                <span>Corporate Genesis</span>
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--brand-dark)', marginTop: '16px', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                A Continuous Journey of <span style={{ color: 'var(--brand-accent)' }}>Excellence</span>
              </h2>
              <div className="story-text-container">
                <p>
                  Established in 2015, Recruweb Resources Private Limited originated as a focused specialized recruitment cell with highly targeted structural scale goals. Over time, we systematically adapted into an integrated programmatic provider across major subcontinental technical corridors.
                </p>
                <p>
                  Our trajectory remains continuously driven by strict operational optimization, data compliance architecture, and a total devotion to absolute fulfillment parity. We understand that great systems are built upon optimized human records.
                </p>
              </div>
              <div className="story-inline-features">
                <div className="story-feature-row">
                  <span className="story-feature-circle">✓</span>
                  <span>Unified PAN India Compliance Logistics</span>
                </div>
                <div className="story-feature-row">
                  <span className="story-feature-circle">✓</span>
                  <span>End-to-End Core Automated HRMS Architectures</span>
                </div>
                <div className="story-feature-row">
                  <span className="story-feature-circle">✓</span>
                  <span>High-Velocity Turnaround Resource Pools</span>
                </div>
              </div>
            </div>

            <div className="story-composite-visual">
              <div className="story-embedded-box">
                <div className="story-emb-icon">🏢</div>
                <div>
                  <h3>Trusted Enterprise Partner</h3>
                  <p>Consolidated infrastructure for modern distributed scaling teams.</p>
                </div>
              </div>
              <div className="story-stat-mini-row">
                <div className="inline-stat-node">
                  <span className="inline-stat-num" style={{ color: '#ffffff', fontSize: '28px' }}>500+</span>
                  <span className="inline-stat-lbl" style={{ color: '#204272' }}>Corporate Setups</span>
                </div>
                <div className="inline-stat-node">
                  <span className="inline-stat-num" style={{ color: '#ffffff', fontSize: '28px' }}>10K+</span>
                  <span className="inline-stat-lbl" style={{ color: '#94a3b8' }}>Processed Records</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Mission & Vision Strategic Layout Blocks */}
      <section className="section-generic-padding">
        <div className="premium-container">
          <div className="strategic-dual-grid">
            <div className="strategic-glass-card">
              <div className="strat-icon-box">🎯</div>
              <h3>Our Core Mission</h3>
              <p>To equip scaling enterprises with highly refined automated workflow solutions that stimulate operational volume performance, solidify security metrics, and build sustained long-term capital valuation markets.</p>
              <div className="strat-tag-row">
                <span className="strat-tag">Automate</span>
                <span className="strat-tag">Perform</span>
                <span className="strat-tag">Scale</span>
              </div>
            </div>
            <div className="strategic-glass-card">
              <div className="strat-icon-box">✨</div>
              <h3>Our Ecosystem Vision</h3>
              <p>To establish the foundational compliance layout standard across modern technical infrastructure setups within India—recognized for deploying exceptional algorithmic matching records, localized response teams, and uncompromised quality controls.</p>
              <div className="strat-tag-row">
                <span className="strat-tag">SaaS Standards</span>
                <span className="strat-tag">Local Protocols</span>
                <span className="strat-tag">Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Framework Grid Blocks */}
      <section className="section-generic-padding-alt">
        <div className="premium-container">
          <div className="center-section-header">
            <div className="light-badge">
              <span className="light-badge-dot"></span>
              <span>Operational Anchors</span>
            </div>
            <h2>Values Engineering Our Growth</h2>
            <p>Our core operating protocols guide system decisions, client deployment pipelines, and our internal corporate culture tracks daily.</p>
          </div>
          <div className="values-hex-grid">
            {values.map((v, i) => (
              <div key={i} className="value-hex-card">
                <span style={{ fontSize: '28px' }}>{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Tracking Path Logs */}
      <section className="section-generic-padding">
        <div className="premium-container">
          <div className="center-section-header">
            <div className="light-badge">
              <span className="light-badge-dot"></span>
              <span>Historical Trail</span>
            </div>
            <h2>Milestones Achieved Over Time</h2>
            <p>System tracking metrics showing our historical transition from a localized boutique deployment cell to a major multi-regional human systems architecture provider.</p>
          </div>
          <div className="timeline-vertical-path">
            {milestones.map((m, i) => (
              <div key={i} className="timeline-node-item">
                <div className="timeline-sphere-indicator">{m.icon}</div>
                <div className="timeline-body-box">
                  <span className="tl-year-badge">{m.year}</span>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Profile Grid Architecture Layout */}
      <section className="section-generic-padding-alt">
        <div className="premium-container">
          <div className="center-section-header">
            <div className="light-badge">
              <span className="light-badge-dot"></span>
              <span>Systems Architects</span>
            </div>
            <h2>Meet Our Strategic Leadership</h2>
            <p>A specialized team of enterprise professionals integrating technical engineering with human resource automation ecosystems.</p>
          </div>
          <div className="team-profile-flexbox">
            {teamMembers.map((member, i) => (
              <div key={i} className="team-profile-card">
                <div className="team-avatar-sphere" style={{ background: `linear-gradient(135deg, ${member.color}, #1e1b4b)` }}>
                  <div className="avatar-pulsing-halo"></div>
                  <span>{member.name.charAt(0)}</span>
                </div>
                <div className="team-meta-wrap">
                  <h3>{member.name}</h3>
                  <span className="team-role-string">{member.position}</span>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Action Interface Section */}
      <section className="cta-closure-section">
        <div className="cta-blur-radial"></div>
        <div className="premium-container">
          <div className="cta-closure-box">
            <h2>Ready to Transform Your HR Architecture?</h2>
            <p>Synchronize your talent pipelines with Recruweb. Deploy streamlined payroll automations, programmatic staffing configurations, and complete database infrastructure scalability today.</p>
            <div className="action-flex-group">
              <Link to="/contact" className="btn-premium-solid">
                <span>Request Strategic Proposal</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/post-job" className="btn-premium-hollow" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <span>Submit Requirements</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;