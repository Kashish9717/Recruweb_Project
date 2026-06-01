import { Link } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We begin by understanding your business, challenges, and goals through a comprehensive consultation process.',
      details: ['Discuss your current HR needs', 'Identify pain points', 'Set clear objectives']
    },
    {
      number: '02',
      title: 'Requirement Analysis',
      description: 'We analyze your specific requirements including job roles, skills needed, and company culture fit.',
      details: ['Review job descriptions', 'Understand team dynamics', 'Define candidate profile']
    },
    {
      number: '03',
      title: 'Talent Sourcing',
      description: 'Our team taps into extensive networks and databases to find the best candidates.',
      details: ['Resume screening', 'Initial outreach', 'Candidate pipeline']
    },
    {
      number: '04',
      title: 'Screening & Assessment',
      description: 'Rigorous screening process including interviews, skills assessments, and background checks.',
      details: ['Phone/video interviews', 'Technical assessments', 'Reference verification']
    },
    {
      number: '05',
      title: 'Client Interviews',
      description: 'We coordinate and facilitate interviews at your convenience.',
      details: ['Schedule coordination', 'Interview feedback', 'Candidate ranking']
    },
    {
      number: '06',
      title: 'Selection & Offer',
      description: 'We help you evaluate and select the best candidate and manage the offer process.',
      details: ['Offer negotiation', 'Salary benchmarking', 'Joining timeline']
    },
    {
      number: '07',
      title: 'Onboarding Support',
      description: 'We assist with offer letters, joining formalities, and smooth onboarding.',
      details: ['Documentation', 'Orientation support', '30-60-90 day plan']
    },
    {
      number: '08',
      title: 'Ongoing Support',
      description: 'Continuous monitoring and optimization to ensure long-term success.',
      details: ['Regular check-ins', 'Performance tracking', 'Continuous improvement']
    }
  ];

  const timeline = [
    { day: 'Day 1-2', title: 'Requirement Gathering', description: 'Initial discussion and requirement collection' },
    { day: 'Day 3-7', title: 'Candidate Sourcing', description: 'Active recruitment and candidate search' },
    { day: 'Day 8-14', title: 'Screening Process', description: 'Interviews and assessments' },
    { day: 'Day 15-21', title: 'Client Interviews', description: 'Coordinate interviews with clients' },
    { day: 'Day 22-28', title: 'Selection & Offer', description: 'Final selection and offer process' },
    { day: 'Day 29-30', title: 'Onboarding', description: 'Candidate joins and gets oriented' }
  ];

  const benefits = [
    { icon: '⏱️', title: 'Quick Turnaround', description: 'Fast implementation without compromising quality' },
    { icon: '💡', title: 'Expert Guidance', description: 'Access to seasoned HR professionals' },
    { icon: '📈', title: 'Scalable Solutions', description: 'Grow your HR capabilities as you grow' },
    { icon: '🔒', title: 'Data Security', description: 'Your data is protected at all times' },
    { icon: '🌍', title: 'Global Network', description: 'Access to international talent pools and markets' },
    { icon: '💰', title: 'Cost-Effective', description: 'Competitive pricing with no hidden costs' },
    { icon: '🎯', title: 'Quality Assured', description: 'Rigorous vetting process for all candidates' },
    { icon: '🤝', title: 'Dedicated Support', description: '24/7 customer support and account management' },
    { icon: '📊', title: 'Analytics & Reporting', description: 'Detailed insights and performance metrics' },
    { icon: '✅', title: 'Compliance Guaranteed', description: 'Full adherence to labor laws and regulations' },
    { icon: '🔄', title: 'Flexible Contracts', description: 'Customizable terms to suit your needs' },
    { icon: '🏆', title: 'Industry Experience', description: 'Years of expertise across multiple sectors' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '140px' }}>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h1 className="section-title" style={{ fontSize: '52px' }}>Your Path to HR Excellence</h1>
            <img 
              src="/images/howitworks-image.jpg" 
              alt="How It Works" 
              style={{ 
                width: '100%', 
                maxWidth: '800px', 
                height: 'auto', 
                borderRadius: '12px',
                marginBottom: '24px',
                marginTop: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }} 
            />
            <p className="section-subtitle">
              A simple, proven process to transform your human resources operations.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Process Steps */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Process</span>
            <h2 className="section-title">Eight Step Process</h2>
            <p className="section-subtitle">
              From consultation to ongoing support, we guide you through every step.
            </p>
          </div>
          <div className="process-steps">
            {steps.map((step, index) => (
              <div className="process-step" key={index} style={{ background: '#111827', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="step-number" style={{ color: '#4f46e5', fontWeight: '800' }}>{step.number}</div>
                <h3 className="step-title" style={{ color: '#ffffff', fontSize: '22px', margin: '12px 0' }}>{step.title}</h3>
                
                {/* FIX: Subtitle/Description text turned explicit white with comfortable opacity */}
                <p className="step-description" style={{ color: '#ffffff', opacity: '0.9', fontSize: '15px', lineHeight: '1.6' }}>
                  {step.description}
                </p>
                
                <ul style={{ listStyle: 'none', marginTop: '16px', paddingLeft: '0' }}>
                  {step.details.map((detail, i) => (
                    <li key={i} style={{ fontSize: '14px', color: '#ffffff', opacity: '0.85', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#34d399', fontWeight: 'bold' }}>✓</span> {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Timeline</span>
            <h2 className="section-title">Quick Turnaround Process</h2>
            <p className="section-subtitle">
              We understand your urgency. See our typical recruitment timeline below.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
            {timeline.map((item, index) => (
              <div key={index} style={{ 
                background: '#1f2937', // Unified dark backdrop
                padding: '20px 24px', 
                borderRadius: '12px', 
                minWidth: '180px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                border: '2px solid #4f46e5' // Premium blue-indigo border
              }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#a5b4fc', marginBottom: '8px' }}>{item.day}</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#ffffff', opacity: '0.75' }}>{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">The Recruweb Advantage</h2>
            <p className="section-subtitle">
              Experience the difference with our proven approach to HR solutions.
            </p>
          </div>
          <div className="services-grid">
            {benefits.map((benefit, index) => (
              <div className="service-card" key={index} style={{ background: '#111827', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="service-icon">{benefit.icon}</div>
                <h3 className="service-title" style={{ color: '#ffffff' }}>{benefit.title}</h3>
                <p className="service-description" style={{ color: '#ffffff', opacity: '0.8' }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Contact us today to schedule your free consultation.
            </p>
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;