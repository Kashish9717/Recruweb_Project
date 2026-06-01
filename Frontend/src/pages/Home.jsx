import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';

const Home = () => {
  const [countersActive, setCountersActive] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersActive(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    { icon: '🎯', title: 'Talent Acquisition', description: 'Strategic recruitment solutions to find perfect candidates for your organization.' },
    { icon: '💰', title: 'Payroll Management', description: 'Streamlined payroll with accurate calculations and timely disbursements.' },
    { icon: '📊', title: 'HRMS Solutions', description: 'Comprehensive human resource management system for all your HR operations.' },
    { icon: '📚', title: 'Training & Development', description: 'Empower your workforce with customized training and skill development.' },
    { icon: '🤝', title: 'HR Outsourcing', description: 'Focus on core business while we handle your HR functions completely.' },
    { icon: '⚖️', title: 'Compliance & Advisory', description: 'Stay compliant with labor laws and get expert HR guidance.' },
    { icon: '👔', title: 'Executive Search', description: 'Find top-level executives aligned with your culture and goals.' },
    { icon: '🌐', title: 'International Recruitment', description: 'Access global talent pools with our extensive network.' },
    { icon: '🏭', title: 'Industrial Staffing', description: 'Skilled and unskilled labor for manufacturing sectors.' },
  ];

  const specializedServices = [
    { icon: '🏭', title: 'Industry Manpower', desc: 'Manufacturing & industrial workforce', path: '/industry', color: '#4f46e5' },
    { icon: '🏢', title: 'Facility Management', desc: 'Complete facility solutions', path: '/contact?service=facility', color: '#0ea5e9' },
    { icon: '👥', title: 'HR Outsourcing', desc: 'Full HR management', path: '/contact?service=hro', color: '#0d9488' },
    { icon: '🔍', title: 'Only Recruitment', desc: 'Dedicated hiring support', path: '/contact?service=recruitment', color: '#2563eb' },
    { icon: '🏨', title: 'Hospitality Staffing', desc: 'Hotel & restaurant staff', path: '/contact?service=hospitality', color: '#16a34a' },
    { icon: '📄', title: 'Contractual Hiring', desc: 'Temporary workforce', path: '/contact?service=contractual', color: '#db2777' },
  ];

  const testimonials = [
    { text: 'Recruweb transformed our HR operations. Their team is professional, efficient, and truly understands our unique needs. We have reduced our hiring time by 60%.', author: 'Rajesh Kumar', position: 'CEO, TechCorp India', rating: 5 },
    { text: 'The recruitment process became seamless thanks to their expertise. We found exceptional talent within just two weeks. Highly recommended for any business!', author: 'Priya Sharma', position: 'HR Director, Global Solutions', rating: 5 },
    { text: 'Outstanding payroll management service. They handle everything with precision and always on time. Their compliance expertise has saved us from potential legal issues.', author: 'Amit Patel', position: 'Founder, StartUp Ventures', rating: 4 },
    { text: 'The HRMS solution they implemented has revolutionized how we manage our workforce. Real-time tracking and automated processes have boosted our productivity significantly.', author: 'Sneha Reddy', position: 'COO, Manufacturing Plus', rating: 5 },
  ];

  const stats = [
    { number: 500, suffix: '+', label: 'Happy Clients', icon: '🏢' },
    { number: 10000, suffix: '+', label: 'Successful Placements', icon: '👥' },
    { number: 50, suffix: '+', label: 'Cities Covered', icon: '🌍' },
    { number: 98, suffix: '%', label: 'Success Rate', icon: '⭐' },
    { number: 48, suffix: 'hrs', label: 'Avg. Placement Time', icon: '⚡' },
    { number: 10000, suffix: '+', label: 'Resume Database', icon: '📄' },
  ];

  const aiTools = [
    { icon: '📝', title: 'JD Maker', desc: 'Create professional job descriptions in seconds', path: '/jd-maker' },
    { icon: '📄', title: 'CV Maker', desc: 'Create professional resumes in minutes', path: '/cv-maker' },
    { icon: '🤖', title: 'CV Screening', desc: 'AI-powered resume analysis and ranking', path: '/cv-screen' },
    { icon: '📅', title: 'AI Interview Scheduler', desc: 'Smart scheduling with optimal slot suggestions', path: '/schedule-interview' },
  ];

  const processSteps = [
    { number: '01', title: 'Share Requirements', description: 'Tell us about your hiring needs and workforce requirements', icon: '💬' },
    { number: '02', title: 'AI Matching', description: 'Our AI finds the best candidates from our extensive database', icon: '🔍' },
    { number: '03', title: 'Screening & Selection', description: 'We shortlist and screen candidates for your review', icon: '✅' },
    { number: '04', title: 'Deployment', description: 'Onboard your new team members within the promised timeframe', icon: '🚀' },
  ];

  const clients = ['Manufacturing', 'Construction', 'Healthcare', 'Hospitality', 'IT', 'Retail'];

  const Counter = ({ end, suffix }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersActive) return;

      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [countersActive, end]);

    return <span>{count.toLocaleString()}{suffix}</span>;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero home-hero" id="home">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}></div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-content">
              <div className="hero-badge-modern">
                <span className="badge-pulse"></span>
                <span>Trusted by 500+ Companies Across India</span>
              </div>
              <h1 className="hero-title">
                Transform Your <span className="gradient-text">HR Operations</span> with AI-Powered Solutions
              </h1>
              <p className="hero-description">
                From recruitment to payroll, we provide comprehensive HR services that help businesses thrive. 
                Workforce available within a week across India.
              </p>
              
              <div className="hero-cta-group">
                <Link to="/get-started" className="btn-hero-primary">
                  <span>Get Started Free</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link to="/services" className="btn-hero-secondary">
                  <span>Explore Services</span>
                </Link>
              </div>

              <div className="hero-trust-badges">
                <span className="trust-item">✓ ISO Certified</span>
                <span className="trust-item">✓ 100% Compliant</span>
                <span className="trust-item">✓ 24/7 Support</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-container">
                <div className="hero-glow"></div>
                <img 
                  src="/images/Hero-Man-BG-5.png" 
                  alt="HR Professional - Recruweb" 
                  className="hero-image"
                />
              </div>
              
              <div className="floating-cards">
                <div className="float-card card-top">
                  <span className="card-icon">🎯</span>
                  <div className="card-content">
                    <span className="card-value">48hrs</span>
                    <span className="card-label">Avg. Placement</span>
                  </div>
                </div>
                <div className="float-card card-left">
                  <span className="card-icon">🛡️</span>
                  <div className="card-content">
                    <span className="card-label">100%</span>
                    <span className="card-sublabel">Compliant</span>
                  </div>
                </div>
                <div className="float-card card-right">
                  <span className="card-icon">📊</span>
                  <div className="card-content">
                    <span className="card-label">HRMS</span>
                    <span className="card-sublabel">Integrated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-number">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <span className="tag-dot"></span>
              What We Offer
            </span>
            <h2 className="section-title">Complete HR <span className="gradient-text">Solutions</span></h2>
            <p className="section-subtitle">
              End-to-end human resource solutions to help your business thrive in today's competitive landscape.
            </p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="service-icon-wrap">
                  <span className="service-icon">{service.icon}</span>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <Link to="/services" className="service-link">
                  <span>Learn More</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="section ai-tools-section">
        <div className="container">
          <div className="ai-tools-wrapper">
            <div className="ai-tools-content">
              <span className="section-tag">
                <span className="tag-dot ai"></span>
                AI-Powered Tools
              </span>
              <h2 className="section-title">Smart <span className="gradient-text">AI Solutions</span></h2>
              <p className="section-subtitle">
                Leverage cutting-edge AI technology to streamline your recruitment and HR processes.
              </p>
              <Link to="/get-started" className="btn-hero-primary">
                <span>Try All Tools</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            
            <div className="ai-tools-cards">
              {aiTools.map((tool, index) => (
                <Link to={tool.path} className="ai-tool-card" key={index}>
                  <span className="tool-icon">{tool.icon}</span>
                  <div className="ai-tool-text">
                    <h4>{tool.title}</h4>
                    <p>{tool.desc}</p>
                  </div>
                  <span className="tool-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="section specialized-section">
        <div className="container">
          <div className="specialized-header">
            <div>
              <span className="section-tag">
                <span className="tag-dot"></span>
                Pan India Coverage
              </span>
              <h2 className="section-title">All-in-One HR & <span className="gradient-text">Manpower Solutions</span></h2>
              <p className="section-subtitle">
                We provide manpower to all companies across India. With our integrated HRMS solution, all workforce requirements are fulfilled within a week.
              </p>
            </div>
          </div>

          <div className="specialized-grid">
            {specializedServices.map((service, index) => (
              <Link 
                to={service.path} 
                className="specialized-card" 
                key={index}
                style={{ '--hover-color': service.color }}
              >
                <div className="spec-icon-wrap" style={{ background: `${service.color}15`, color: service.color }}>
                  <span className="spec-icon">{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span className="spec-cta">
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <span className="tag-dot"></span>
              Simple Process
            </span>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">
              Get workforce within a week with our streamlined 4-step process.
            </p>
          </div>

          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div className="process-step" key={index}>
                <div className="step-connector">
                  {index < processSteps.length - 1 && <div className="connector-line"></div>}
                </div>
                <div className="step-icon-wrap">
                  <span className="step-icon">{step.icon}</span>
                </div>
                <div className="step-content">
                  <span className="step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section industries-section">
        <div className="container">
          <div className="industries-wrapper">
            <div className="industries-content">
              <span className="section-tag">
                <span className="tag-dot"></span>
                Our Expertise
              </span>
              <h2 className="section-title">Industries <span className="gradient-text">We Serve</span></h2>
              <p className="section-subtitle">
                We provide workforce solutions across diverse industries throughout India.
              </p>
            </div>
            
            <div className="industries-grid">
              {clients.map((industry, index) => (
                <div className="industry-card" key={index}>
                  <span className="industry-icon">
                    {index === 0 && '🏭'}
                    {index === 1 && '🏗️'}
                    {index === 2 && '🏥'}
                    {index === 3 && '🏨'}
                    {index === 4 && '💻'}
                    {index === 5 && '🛒'}
                  </span>
                  <span className="industry-name">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <span className="tag-dot"></span>
              Testimonials
            </span>
            <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
            <p className="section-subtitle">
              Don't just take our word for it. Hear from businesses we've helped transform.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-header">
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                     <span  key={i} style={{ color: '#facc15',fontSize: '18px',textShadow: '0 0 8px rgba(250,204,21,0.5)' }}>★</span>
                    ))}
                  </div>
                  <span className="testimonial-icon">❝</span>
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <span>{testimonial.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        {/* <div className="cta-bg">
          <div className="cta-gradient"></div>
          <div className="cta-shapes">
            <div className="cta-shape shape-1">hihi</div>
            <div className="cta-shape shape-2"></div>
            <div className="cta-shape shape-3"></div>
          </div>
        </div> */}
        <div className="container">
          <div className="cta-wrapper">
            <div className="cta-content">
              <h2>Ready to Transform Your HR?</h2>
              <p>Partner with Recruweb for all your human resource needs. From recruitment to payroll, we've got you covered. Get workforce within a week.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-hero-primary">
                  <span>Get Started Now</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link to="/post-job" className="btn-hero-secondary">
                  <span>Post a Job</span>
                </Link>
              </div>
            </div>
            <div className="cta-stats">
              <div className="cta-stat">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Support</span>
              </div>
              <div className="cta-stat">
                <span className="stat-value">1 Week</span>
                <span className="stat-label">Delivery</span>
              </div>
              <div className="cta-stat">
                <span className="stat-value">100%</span>
                <span className="stat-label">Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`

:root{
  --bg:#050816;
  --card:#0f172a;
  --card2:#111c31;
  --text:#f8fafc;
  --muted:#94a3b8;
  --border:rgba(255,255,255,0.08);
  --primary:#4f46e5;
  --secondary:#06b6d4;
  --glow:0 0 40px rgba(79,70,229,0.35);
}

*{
  font-family:'Inter',sans-serif;
}

body{
  background:var(--bg);
  color:var(--text);
}

/* SECTION */

.section{
  padding:120px 0;
  position:relative;
}

.container{
  width:min(1200px,92%);
  margin:auto;
}

/* GRADIENT TEXT */

.gradient-text{
  background:linear-gradient(
    135deg,
    #818cf8 0%,
    #38bdf8 50%,
    #22d3ee 100%
  );
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

/* HERO */

.hero.home-hero{
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(79,70,229,0.25), transparent 30%),
    radial-gradient(circle at bottom right, rgba(6,182,212,0.18), transparent 30%),
    #050816;

  padding-top: 140px;
  padding-bottom: 80px;

  min-height: auto;

  display: flex;
  align-items: center;
}
.hero-bg{
  position:absolute;
  inset:0;
}

.hero-gradient{
  position:absolute;
  inset:0;
  background:
  radial-gradient(circle at 20% 20%, rgba(79,70,229,.25), transparent 25%),
  radial-gradient(circle at 80% 80%, rgba(6,182,212,.2), transparent 25%);
  filter:blur(80px);
}

.hero-wrapper{
  display:grid;
  grid-template-columns:1.1fr 1fr;
  align-items:center;
  gap:80px;
  position:relative;
  z-index:2;

  min-height: calc(100vh - 140px);
}

.hero-badge-modern{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 18px;
  border-radius:999px;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.08);
  backdrop-filter:blur(12px);
  color:#cbd5e1;
  font-size:14px;
  margin-bottom:28px;
}

.badge-pulse{
  width:10px;
  height:10px;
  border-radius:50%;
  background:#22d3ee;
  box-shadow:0 0 20px #22d3ee;
}

.hero-title{
  font-size:clamp(3rem,6vw,5rem);
  line-height:1.05;
  font-weight:900;
  margin-bottom:24px;
  color:white;
  letter-spacing:-0.04em;
}

.hero-description{
  font-size:1.1rem;
  line-height:1.8;
  color:#94a3b8;
  max-width:620px;
  margin-bottom:40px;
}

/* BUTTONS */

.hero-cta-group{
  display:flex;
  gap:18px;
  flex-wrap:wrap;
}

.btn-hero-primary{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:16px 34px;
  border-radius:18px;
  text-decoration:none;
  font-weight:700;
  color:white;
  background:linear-gradient(
    135deg,
    #4f46e5,
    #06b6d4
  );
  box-shadow:
  0 10px 30px rgba(79,70,229,.4);
  transition:.35s ease;
}

.btn-hero-primary:hover{
  transform:translateY(-5px) scale(1.02);
  box-shadow:
  0 20px 50px rgba(79,70,229,.5);
}

.btn-hero-secondary{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:16px 34px;
  border-radius:18px;
  text-decoration:none;
  color:white;
  border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.04);
  backdrop-filter:blur(10px);
  transition:.35s ease;
}

.btn-hero-secondary:hover{
  background:rgba(255,255,255,0.08);
  transform:translateY(-5px);
}

/* TRUST */

.hero-trust-badges{
  display:flex;
  gap:24px;
  flex-wrap:wrap;
  margin-top:40px;
}

.trust-item{
  color:#94a3b8;
  font-size:14px;
}

/* HERO IMAGE */

.hero-visual{
  position:relative;
}

.hero-image{
  width:100%;
  max-width:520px;
  position:relative;
  z-index:2;
  animation:float 6s ease-in-out infinite;
  filter:drop-shadow(0 30px 60px rgba(0,0,0,0.5));
}

@keyframes float{
  0%,100%{
    transform:translateY(0px);
  }
  50%{
    transform:translateY(-18px);
  }
}

.hero-glow{
  position:absolute;
  width:420px;
  height:420px;
  border-radius:50%;
  background:rgba(79,70,229,.35);
  filter:blur(120px);
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}

/* FLOATING CARDS */

.float-card{
  position:absolute;
  background:rgba(15,23,42,0.75);
  border:1px solid rgba(255,255,255,0.08);
  backdrop-filter:blur(18px);
  border-radius:22px;
  padding:18px 22px;
  display:flex;
  align-items:center;
  gap:14px;
  color:white;
  box-shadow:
  0 20px 40px rgba(0,0,0,.3);
  animation:cardFloat 5s ease-in-out infinite;
}

@keyframes cardFloat{
  0%,100%{
    transform:translateY(0);
  }
  50%{
    transform:translateY(-12px);
  }
}

.card-top{
  top:8%;
  right:-5%;
}

.card-left{
  bottom:30%;
  left:-10%;
}

.card-right{
  bottom:8%;
  right:0;
}

.card-icon{
  font-size:28px;
}

.card-value{
  display:block;
  font-weight:800;
  font-size:20px;
}

.card-label,
.card-sublabel{
  color:#94a3b8;
  font-size:13px;
}

/* STATS */

.stats-section{
  padding:70px 0;
  background:#070b1c;
}

.stats-grid{
  display:grid;
  grid-template-columns:repeat(6,1fr);
  gap:20px;
}

.stat-item{
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.06);
  padding:30px 18px;
  border-radius:24px;
  text-align:center;
  transition:.35s ease;
}

.stat-item:hover{
  transform:translateY(-8px);
  border-color:#4f46e5;
  box-shadow:0 0 30px rgba(79,70,229,.2);
}

.stat-icon{
  font-size:32px;
  display:block;
  margin-bottom:10px;
 
  }

.stat-number{
  font-size:34px;
  font-weight:900;
  color:white;
  display:block;
  margin-bottom:6px;
}

.stat-label{
  color:#94a3b8;
  font-size:13px;
}

/* HEADERS */

.section-header{
  text-align:center;
  max-width:760px;
  margin:auto auto 70px;
}

.section-tag{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 18px;
  border-radius:999px;
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.06);
  color:#cbd5e1;
  margin-bottom:20px;
}

.tag-dot{
  width:8px;
  height:8px;
  border-radius:50%;
  background:#38bdf8;
}

.section-title{
  font-size:clamp(2rem,5vw,3.5rem);
  font-weight:900;
  line-height:1.1;
  margin-bottom:18px;
  color:white;
}

.section-subtitle{
  font-size:1.05rem;
  color:#94a3b8;
  line-height:1.8;
}

/* CARDS */

.services-section,
.specialized-section,
.industries-section,
.testimonials-section{
  background:#050816;
}

.services-grid,
.specialized-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:28px;
}

.service-card,
.specialized-card,
.testimonial-card,
.industry-card{
  background:linear-gradient(
    180deg,
    rgba(255,255,255,0.04),
    rgba(255,255,255,0.02)
  );
  border:1px solid rgba(255,255,255,0.06);
  backdrop-filter:blur(12px);
  border-radius:28px;
  padding:36px;
  transition:.4s ease;
}

.service-card:hover,
.specialized-card:hover,
.testimonial-card:hover,
.industry-card:hover{
  transform:translateY(-10px);
  border-color:#4f46e5;
  box-shadow:0 0 40px rgba(79,70,229,.18);
}

.service-title,
.specialized-card h3{
  color:white;
  margin:18px 0 12px;
}

.service-description,
.specialized-card p{
  color:#94a3b8;
  line-height:1.7;
}

.service-icon-wrap,
.spec-icon-wrap{
  width:70px;
  height:70px;
  border-radius:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(255,255,255,0.04);
  font-size:30px;
}

.service-link,
.spec-cta{
  display:inline-flex;
  align-items:center;
  gap:8px;
  margin-top:22px;
  color:#38bdf8;
  text-decoration:none;
  font-weight:700;
}

/* AI SECTION */

.ai-tools-section{
  background:
  radial-gradient(circle at top right, rgba(79,70,229,.18), transparent 30%),
  #070b1c;
}

.ai-tools-wrapper{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:70px;
  align-items:center;
}

.ai-tools-cards{
  display:flex;
  flex-direction:column;
  gap:18px;
}

.ai-tool-card{
  display:flex;
  align-items:center;
  gap:18px;
  padding:24px;
  border-radius:22px;
  text-decoration:none;
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.06);
  color:white;
  transition:.35s ease;
}

.ai-tool-card:hover{
  transform:translateX(8px);
  border-color:#06b6d4;
  box-shadow:0 0 35px rgba(6,182,212,.15);
}

.ai-tool-text h4{
  margin:0 0 6px;
}

.ai-tool-text p{
  color:#94a3b8;
  margin:0;
}

/* PROCESS */

.process-section{
  background:#070b1c;
}

.process-timeline{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:26px;
}

.process-step{
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.06);
  border-radius:28px;
  padding:40px 28px;
  text-align:center;
  transition:.35s ease;
}

.process-step:hover{
  transform:translateY(-10px);
  border-color:#4f46e5;
}

.step-icon-wrap{
  width:80px;
  height:80px;
  border-radius:50%;
  background:rgba(79,70,229,.12);
  display:flex;
  align-items:center;
  justify-content:center;
  margin:auto auto 24px;
  font-size:34px;
}

.step-number{
  color:#38bdf8;
  font-weight:800;
}

.step-content h3{
  color:white;
  margin:10px 0;
}

.step-content p{
  color:#94a3b8;
}

/* INDUSTRIES */

.industries-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
}

.industry-name{
  color:white;
}

/* TESTIMONIALS */

.testimonials-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:28px;
  color:black;
}

.testimonial-text{
  color:#cbd5e1;
  line-height:1.9;
}

.author-info h4{
  color:black;
}

.author-info span{
  color:blue;
}

/* CTA */

.cta-section{
  position: relative;
  overflow: hidden;

  background:
  // linear-gradient(135deg,#4f46e5,#06b6d4);

  border-radius: 32px;

  margin: 40px 20px;

  padding: 70px 60px;

  min-height: auto !important;
}

.cta-wrapper{
  display:grid;
  grid-template-columns:1.2fr .8fr;
  align-items:center;
  gap:60px;
  position:relative;
  z-index:2;
}

.cta-content h2{
  font-size:3rem;
  color:white;
  margin-bottom:18px;
}

.cta-content p{
  color:rgba(255,255,255,.85);
  line-height:1.8;
  margin-bottom:30px;
}

.cta-stats{
  display:flex;
  gap:40px;
}

.cta-stat{
  text-align:center;
}

.cta-stat .stat-value{
  font-size:42px;
  font-weight:900;
  color:white;
}

.cta-stat .stat-label{
  color:rgba(255,255,255,.8);
}

/* RESPONSIVE */

@media(max-width:1100px){

  .hero-wrapper,
  .ai-tools-wrapper,
  .industries-wrapper{
    grid-template-columns:1fr;
    text-align:center;
  }

  .hero-description{
    margin:auto auto 40px;
  }

  .hero-cta-group,
  .hero-trust-badges,
  .cta-buttons,
  .cta-stats{
    justify-content:center;
  }

  .hero-visual{
    margin-top:30px;
  }

  .services-grid,
  .specialized-grid,
  .process-timeline,
  .stats-grid{
    grid-template-columns:repeat(2,1fr);
  }

  .testimonials-grid{
    grid-template-columns:1fr;
  }

  .cta-wrapper{
    flex-direction:column;
    text-align:center;
  }
}

@media(max-width:768px){

  .section{
    padding:80px 0;
  }

  .hero-title{
    font-size:2.8rem;
  }

  .hero-description{
    font-size:1rem;
  }

  .services-grid,
  .specialized-grid,
  .process-timeline,
  .stats-grid,
  .industries-grid{
    grid-template-columns:1fr;
  }

  .hero-cta-group{
    flex-direction:column;
  }

  .btn-hero-primary,
  .btn-hero-secondary{
    width:100%;
    justify-content:center;
  }

  .hero-trust-badges{
    flex-direction:column;
    gap:14px;
  }

  .float-card{
    display:none;
  }

  .cta-section{
    border-radius:24px;
    margin:0 12px 40px;
  }

  .cta-content h2{
    font-size:2.2rem;
  }
}

`}</style>
    </>
  );
};

export default Home;