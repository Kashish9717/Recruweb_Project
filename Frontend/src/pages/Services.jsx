import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';

const Services = () => {
  // Smooth scroll to top on component load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20"/>
          <path d="M5 20v-8l7-6 7 6v8"/>
          <path d="M9 20v-4h6v4"/>
        </svg>
      ),
      title: 'Industry Manpower',
      badge: 'High Demand',
      description: 'Skilled, semi-skilled, and unskilled workforce engineered for manufacturing, infrastructure, and heavy industrial sectors across India.',
      features: ['Factory Workers', 'Machine Operators', 'Certified Technicians', 'Shift Supervisors', 'Industrial Staff']
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
      ),
      title: 'Facility Management',
      badge: 'HRMS Integrated',
      description: 'Complete integrated facility management services backed by cutting-edge HRMS platforms—deployed completely within 7 business days.',
      features: ['Corporate Housekeeping', 'Security Personnel', 'Technical Maintenance', 'Pantry & Admin Staff', 'On-Site Support Services']
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'HR Outsourcing',
      badge: 'Complete Suite',
      description: 'End-to-end HR outsourcing architecture including rapid compliance handling, flawless payroll execution, and strategic corporate administration.',
      features: ['Automated Payroll Management', 'Statutory Compliance Handling', 'End-to-End Employee Lifecycle', 'Provident Fund & ESIC Audits', 'Strategic HR Administration']
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
      title: 'Only Recruitment',
      badge: 'Fast Track',
      description: 'Dedicated Executive and Lateral search ecosystems empowered by predictive AI screening to deliver calibrated candidates within a week.',
      features: ['Deep-Dive Job Analysis', 'Multi-Channel Sourcing', 'Rigorous Screening & Interviews', 'Final Panel Selection', 'Seamless Joining Support']
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/>
          <line x1="10" y1="1" x2="10" y2="4"/>
          <line x1="14" y1="1" x2="14" y2="4"/>
        </svg>
      ),
      title: 'Hospitality Staffing',
      badge: 'Premium Tier',
      description: 'Vetted and consumer-centric hospitality professionals trained to uphold luxury benchmarks across premium networks.',
      features: ['Luxury Hotel Staffing', 'Fine-Dining Restaurant Crew', 'High-Profile Event Support', 'Elite Guest Relations Services', 'Professional Catering Teams']
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
      title: 'Contractual Hiring',
      badge: 'Flexible Scale',
      description: 'Agile scale-up and scale-down temporary models built specifically to combat seasonal surges and time-bound project deliverables.',
      features: ['Project-Based Personnel', 'Seasonal Resource Surges', 'Temporary Agile Assignments', 'Highly Flexible Durations', 'Smooth Renewable Contracts']
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          <line x1="12" y1="12" x2="12" y2="16"/>
          <line x1="10" y1="14" x2="14" y2="14"/>
        </svg>
      ),
      title: 'Post a Job',
      badge: 'Self-Serve Portal',
      description: 'An optimized self-service portal immediately routing your job openings directly to an active database of qualified talent across India.',
      features: ['Intuitive Job Blueprint Tool', 'Amplified Network Distribution', 'Built-in Application Tracker', 'AI Resume Score Filtering', 'Unrestricted Candidate Connections']
    }
  ];

  const whyChooseUs = [
    { icon: '🎯', title: 'Pan India Coverage', desc: 'Seamlessly servicing cross-regional operational entities across Tier 1, 2, and 3 Indian hubs.' },
    { icon: '⚡', title: 'SLA Guarded Delivery', desc: 'Strict operational commitment targeting position fulfillments completely within 7 business days.' },
    { icon: '💰', title: 'Comprehensive HRMS', desc: 'Zero extra tooling overheads. Run compliance, tracking, and operations under a single cloud solution.' },
    { icon: '🏭', title: 'Industrial Domain Specialists', desc: 'Deep diagnostic insight over highly technical verticals ensures zero candidate misalignments.' },
    { icon: '📊', title: 'Automated Micro-Payroll', desc: 'Flawless background payroll logic taking complete corporate financial liabilities away from your stack.' },
    { icon: '✅', title: '100% Legal Compliance', desc: 'Zero-tolerance risk matrices ensuring your operations stay completely insulated and audit-ready.' }
  ];

  const quickActions = [
    { to: "/jd-maker", icon: "📝", title: "JD Maker", desc: "Automate technical job roles" },
    { to: "/cv-maker", icon: "📄", title: "CV Maker", desc: "Format dynamic templates" },
    { to: "/cv-screen", icon: "🤖", title: "CV Screening", desc: "AI-powered parse optimization" },
    { to: "/schedule-interview", icon: "📅", title: "Smart Scheduler", desc: "Sync parameters flawlessly" },
    { to: "/jobs", icon: "🔍", title: "Find Jobs", desc: "Scrape premium open profiles" },
    { to: "/companies", icon: "🏢", title: "Top Partners", desc: "Explore active corporate networks" },
    { to: "/contact?service=industry", icon: "💬", title: "Request Quote", desc: "Receive immediate custom pricing" },
    { to: "/joining-form", icon: "📋", title: "Digital Onboarding", desc: "Complete paperless workflows" }
  ];

  return (
    <div className="recruweb-page-wrapper">
      {/* SCOPED STYLESHEET WITH ULTIMATE LAYOUT PROTECTION FIXES */}
      <style>{`
        .recruweb-page-wrapper {
          background-color: #020617;
          color: #f8fafc;
          font-family: system-ui, -apple-system, sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          box-sizing: border-box;
        }

        /* --- HERO SECTION --- */
        .hero-section {
          position: relative;
          min-height: 80vh;
          padding-top: 10rem;
          padding-bottom: 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at top, #0f172a 0%, #020617 75%, #000000 100%);
          overflow: hidden;
          text-align: center;
        }

        .hero-glow-1 {
          position: absolute;
          top: -10%;
          left: 20%;
          width: 30rem;
          height: 30rem;
          background-color: rgba(99, 102, 241, 0.12);
          border-radius: 50%;
          filter: blur(120px);
          animation: pulseGlow 8s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .hero-glow-2 {
          position: absolute;
          bottom: 10%;
          right: 20%;
          width: 25rem;
          height: 25rem;
          background-color: rgba(16, 185, 129, 0.06);
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(30, 41, 59, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(30, 41, 59, 0.1) 1px, transparent 1px);
          background-size: 4rem 4rem;
          pointer-events: none;
        }

        .enterprise-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          background-color: rgba(15, 23, 42, 0.8);
          border: 1px solid #1e293b;
          color: #818cf8;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          backdrop-filter: blur(12px);
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .tag-ping {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: #818cf8;
          position: relative;
        }
        .tag-ping::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background-color: #818cf8;
          animation: pingEffect 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .hero-title {
          font-size: 2.75rem;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 auto;
          max-width: 900px;
          background: linear-gradient(to right, #ffffff, #cbd5e1, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (min-width: 768px) {
          .hero-title { font-size: 4.5rem; }
        }

        .gradient-span {
          background: linear-gradient(to right, #818cf8, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-desc {
          margin-top: 2rem;
          font-size: 1rem;
          line-height: 1.75;
          color: #94a3b8;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 768px) {
          .hero-desc { font-size: 1.25rem; }
        }

        .hero-btn-container {
          margin-top: 2.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }

        .btn-premium {
          padding: 1rem 2rem;
          font-weight: 600;
          border-radius: 0.75rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          display: inline-block;
          font-size: 0.95rem;
        }

        .btn-premium-primary {
          background: linear-gradient(to right, #4f46e5, #6366f1);
          color: #ffffff;
          box-shadow: 0 0 30px rgba(79, 70, 229, 0.3);
        }

        .btn-premium-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(79, 70, 229, 0.55);
          filter: brightness(1.1);
        }

        .btn-premium-secondary {
          background-color: #0f172a;
          color: #cbd5e1;
          border: 1px solid #1e293b;
          backdrop-filter: blur(8px);
        }

        .btn-premium-secondary:hover {
          background-color: #1e293b;
          border-color: #475569;
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* --- SECTIONS GENERAL --- */
        .section-padding {
          padding: 6rem 0;
          border-top: 1px solid #0f172a;
        }

        .center-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 4.5rem auto;
        }

        .section-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #818cf8;
          text-transform: uppercase;
          background-color: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          padding: 0.35rem 0.85rem;
          border-radius: 0.375rem;
        }

        .section-badge.emerald {
          color: #34d399;
          background-color: rgba(52, 211, 153, 0.1);
          border: 1px solid rgba(52, 211, 153, 0.2);
        }

        .section-heading {
          font-size: 2rem;
          font-weight: 800;
          margin: 1rem 0 0 0;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        @media (min-width: 768px) {
          .section-heading { font-size: 2.75rem; }
        }

        .section-subheading {
          color: #94a3b8;
          margin-top: 1rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        /* --- SERVICES GRID SYSTEM --- */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 1024px) {
          .services-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        .service-card {
          position: relative;
          background-color: rgba(15, 23, 42, 0.3);
          border: 1px solid #0f172a;
          border-radius: 1.25rem;
          padding: 2.25rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backdrop-filter: blur(4px);
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 9rem;
          height: 9rem;
          background: linear-gradient(to bottom left, rgba(99, 102, 241, 0.08), transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .service-card:hover {
          transform: translateY(-5px);
          border-color: rgba(99, 102, 241, 0.25);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          background-color: rgba(15, 23, 42, 0.5);
        }

        .service-card:hover::before { opacity: 1; }

        .card-top-row {
          display: flex;
          align-items: start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .icon-box {
          padding: 0.875rem;
          background-color: #0f172a;
          border: 1px solid #1e293b;
          color: #818cf8;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-card:hover .icon-box {
          transform: scale(1.1);
          background-color: #4f46e5;
          color: #ffffff;
          box-shadow: 0 0 20px rgba(79, 70, 229, 0.4);
          border-color: #6366f1;
        }

        .card-badge {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: #64748b;
          border: 1px solid #1e293b;
          background-color: #020617;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-weight: 600;
        }

        .card-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.75rem 0;
          transition: color 0.2s ease;
        }
        
        .card-index {
          color: #475569;
          font-family: monospace;
          font-size: 1rem;
          margin-right: 0.25rem;
        }

        .service-card:hover .card-title { color: #818cf8; }

        .card-desc {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }

        .features-list {
          margin: 1.75rem 0 0 0;
          padding: 1.5rem 0 0 0;
          list-style: none;
          border-top: 1px solid #0f172a;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.65rem;
          transition: color 0.3s ease;
        }

        .check-bubble {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          font-size: 0.65rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .service-card:hover .feature-item { color: #cbd5e1; }

        /* --- IMMUNE AND COMPLIANT "WHY CHOOSE US" GRID --- */
        .why-flex-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
          width: 100%;
          box-sizing: border-box;
        }

        .why-flex-card {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 2rem;
          background-color: rgba(15, 23, 42, 0.4) !important;
          border: 1px solid #1e293b !important;
          border-radius: 1.25rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
          
          /* Force standard dynamic widths based on screens */
          width: 100%;
        }

        @media (min-width: 768px) {
          .why-flex-card {
            width: calc(50% - 1rem); /* Multi-column safety split */
          }
        }
        @media (min-width: 1024px) {
          .why-flex-card {
            width: calc(33.333% - 1.34rem); /* Beautiful 3-card structure */
          }
        }

        .why-flex-card:hover { 
          background-color: rgba(15, 23, 42, 0.7) !important;
          border-color: #6366f1 !important;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        }

        .why-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 0.85rem;
          background-color: #0f172a;
          border: 1px solid #1e293b;
          font-size: 1.5rem;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        }

        .why-text-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          text-align: left;
          flex: 1;
          position: relative;
        }

        .why-title-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff !important;
          margin: 0 0 0.5rem 0 !important;
          padding: 0 !important;
          line-height: 1.3 !important;
          display: block !important;
          position: relative !important;
        }

        .why-desc-text {
          color: #94a3b8 !important;
          font-size: 0.9rem !important;
          line-height: 1.6 !important;
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
          position: relative !important;
        }

        /* --- MISSION & VISION ARCHITECTURE --- */
        .mv-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        @media (min-width: 1024px) {
          .mv-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        .mv-card {
          position: relative;
          padding: 2.5rem;
          background: linear-gradient(to bottom right, #0f172a, #020617);
          border: 1px solid #0f172a;
          border-radius: 1.75rem;
          overflow: hidden;
        }

        .mv-card::after {
          content: '';
          position: absolute;
          right: -2rem;
          bottom: -2rem;
          width: 10rem;
          height: 10rem;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          transition: background-color 0.4s ease;
        }

        .mv-card.mission::after { background-color: rgba(99, 102, 241, 0.03); }
        .mv-card.vision::after { background-color: rgba(52, 211, 153, 0.03); }
        .mv-card:hover::after { background-color: rgba(255,255,255,0.06); }

        .mv-icon-box {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .mission .mv-icon-box {
          background-color: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #818cf8;
        }

        .vision .mv-icon-box {
          background-color: rgba(52, 211, 153, 0.1);
          border: 1px solid rgba(52, 211, 153, 0.3);
          color: #34d399;
        }

        .mv-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 1rem 0;
        }

        .mv-desc {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        /* --- CTA CARD BRAND --- */
        .cta-banner {
          position: relative;
          background: linear-gradient(to right, #090d16, #0f172a, #020617);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 1.75rem;
          padding: 3rem 2rem;
          text-align: center;
          overflow: hidden;
          max-width: 1000px;
          margin: 2rem auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        @media (min-width: 768px) {
          .cta-banner { padding: 4rem 3rem; }
        }

        .cta-glow {
          position: absolute;
          top: 0;
          left: 40%;
          width: 18rem;
          height: 18rem;
          background-color: rgba(99, 102, 241, 0.08);
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .cta-heading {
          font-size: 1.85rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        @media (min-width: 768px) {
          .cta-heading { font-size: 2.5rem; }
        }

        .cta-desc {
          color: #cbd5e1;
          margin: 1.25rem auto 2.25rem auto;
          max-width: 640px;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }

        /* --- QUICK UTILITIES SYSTEM --- */
        .utility-header {
          margin-bottom: 2.5rem;
        }

        .utility-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .utility-sub {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0.35rem 0 0 0;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .quick-actions-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 1024px) {
          .quick-actions-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }

        .action-link {
          position: relative;
          display: flex;
          align-items: start;
          gap: 1rem;
          padding: 1.25rem;
          background-color: rgba(15, 23, 42, 0.2);
          border: 1px solid #0f172a;
          border-radius: 0.85rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .action-link:hover {
          border-color: #1e293b;
          background-color: rgba(15, 23, 42, 0.5);
        }

        .action-emoji {
          font-size: 1.5rem;
          padding: 0.4rem;
          border-radius: 0.5rem;
          background-color: #020617;
          border: 1px solid #0f172a;
          transition: transform 0.2s ease;
        }

        .action-link:hover .action-emoji { transform: scale(1.1); }

        .action-text-container {
          display: flex;
          flex-direction: column;
          padding-right: 0.75rem;
        }

        .action-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #e2e8f0;
          transition: color 0.2s ease;
        }

        .action-link:hover .action-title { color: #818cf8; }

        .action-desc {
          font-size: 0.75rem;
          color: #475569;
          margin-top: 0.25rem;
          line-height: 1.3;
        }

        .micro-arrow {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          color: #334155;
          font-size: 0.75rem;
          transition: all 0.2s ease;
        }

        .action-link:hover .micro-arrow {
          color: #818cf8;
          transform: translateX(2px);
        }

        /* --- KEYFRAMES ANIMATION --- */
        @keyframes pulseGlow {
          0% { transform: scale(1) translate(0, 0); opacity: 0.8; }
          100% { transform: scale(1.08) translate(3%, 3%); opacity: 1; }
        }

        @keyframes pingEffect {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        .fade-in-load {
          animation: loadReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes loadReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <div className="grid-overlay"></div>

        <div className="container relative-z">
          <div className="enterprise-tag fade-in-load">
            <span className="tag-ping"></span>
            Enterprise Grade HR Solutions
          </div>
          <h1 className="hero-title fade-in-load">
            All-in-One HR & <span className="gradient-span">Manpower Architectures</span>
          </h1>
          <p className="hero-desc fade-in-load">
            We source and deploy high-performing human capital for companies across India. Our unified, cloud-native HRMS ecosystem guarantees that your staffing, modern payroll, and strategic operations are scaled within 7 business days.
          </p>
          <div className="hero-btn-container fade-in-load">
            <Link to="/contact" className="btn-premium btn-premium-primary">
              Get Strategic Proposal
            </Link>
            <a href="#explore-services" className="btn-premium btn-premium-secondary">
              Explore Offerings
            </a>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* CORE SERVICES OVERVIEW */}
      <section id="explore-services" className="section-padding">
        <div className="container">
          <div className="center-header">
            <span className="section-badge">Our Service Verticals</span>
            <h2 className="section-heading">Engineered Talent Infrastructures</h2>
            <p className="section-subheading">Deploy secure talent architectures backed by explicit Service Level Agreements and comprehensive automated compliance management.</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div>
                  <div className="card-top-row">
                    <div className="icon-box">
                      {service.icon}
                    </div>
                    <span className="card-badge">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="card-title">
                    <span className="card-index">0{index + 1}.</span> {service.title}
                  </h3>
                  <p className="card-desc">{service.description}</p>
                </div>

                <ul className="features-list">
                  {service.features.map((feature, i) => (
                    <li key={i} className="feature-item">
                      <span className="check-bubble">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION (WHY CHOOSE US) */}
      <section className="section-padding" style={{ backgroundColor: 'rgba(15, 23, 42, 0.15)' }}>
        <div className="container">
          <div className="center-header">
            <span className="section-badge emerald">Market Differentiators</span>
            <h2 className="section-heading">Why Scale With Recruweb?</h2>
            <p className="section-subheading">We optimize enterprise staffing matrices to reduce processing costs while ensuring 100% regulatory reliability.</p>
          </div>

          <div className="why-flex-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-flex-card">
                <div className="why-icon-wrapper">{item.icon}</div>
                <div className="why-text-block">
                  <h4 className="why-title-text">{item.title}</h4>
                  <p className="why-desc-text">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE MISSION & VISION ARCHITECTURE */}
      <section className="section-padding">
        <div className="container">
          <div className="mv-grid">
            
            {/* Mission Card */}
            <div className="mv-card mission">
              <div className="mv-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
              <h3 className="mv-title">Our Operational Mission</h3>
              <p className="mv-desc">
                To institutionalize seamless, frictionless, and completely transparent scalable human workforce architectures across commercial enterprise footprints in India. We enforce absolute fidelity towards delivery timelines by settling end-to-end recruitment needs completely within a single corporate business week.
              </p>
            </div>

            {/* Vision Card */}
            <div className="mv-card vision">
              <div className="mv-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 className="mv-title">Our Strategic Vision</h3>
              <p className="mv-desc">
                To forge the absolute primary standard for modern corporate human resource ecosystems in Asia. We envision an enterprise grid where any company can provision legally protected, fully-compliant workforce pools on-demand via integrated predictive analytics software.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="container" style={{ paddingBottom: '4rem' }}>
        <div className="cta-banner">
          <div className="cta-glow"></div>
          <h2 className="cta-heading">Need On-Demand Enterprise Manpower Across India?</h2>
          <p className="cta-desc">
            Partner with our legal and structural talent acquisition team today. Mitigate operational processing risks and watch your workforce deploy perfectly within a week.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-premium btn-premium-primary" style={{ background: '#ffffff', color: '#020617', boxShadow: 'none' }}>
              Contact Enterprise Desk
            </Link>
            <Link to="/post-job" className="btn-premium btn-premium-secondary">
              Post an Opening Instantly
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS UTILITIES SECTION */}
      <section className="section-padding">
        <div className="container">
          <div className="utility-header">
            <h3 className="utility-title">Platform Developer Quick Utilities</h3>
            <p className="utility-sub">Access automated AI pipelines and cloud generation modules natively.</p>
          </div>
          
          <div className="quick-actions-grid">
            {quickActions.map((action, idx) => (
              <Link key={idx} to={action.to} className="action-link">
                <span className="action-emoji">{action.icon}</span>
                <div className="action-text-container">
                  <span className="action-title">{action.title}</span>
                  <span className="action-desc">{action.desc}</span>
                </div>
                <span className="micro-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;