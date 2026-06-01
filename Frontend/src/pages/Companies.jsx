import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';

const sampleCompanies = [
  {
    _id: '1',
    name: 'TechVision Solutions',
    logo: 'https://via.placeholder.com/100x100/5FA8D3/ffffff?text=TV',
    industry: 'Information Technology',
    description: 'Leading provider of enterprise software solutions and digital transformation services. We help businesses modernize their operations with cutting-edge technology.',
    website: 'https://techvision.example.com',
    size: '501-1000',
    location: 'Bengaluru, Karnataka',
    founded: 2010,
    specialties: ['Cloud Computing', 'AI/ML', 'Enterprise Software', 'DevOps'],
    activeJobs: 45,
    featured: true,
    isVerified: true,
    rating: 4.5,
    reviews: 128
  },
  {
    _id: '2',
    name: 'HealthFirst Medical',
    logo: 'https://via.placeholder.com/100x100/10b981/ffffff?text=HF',
    industry: 'Healthcare',
    description: 'Comprehensive healthcare provider offering medical services, health insurance, and wellness programs across India.',
    website: 'https://healthfirst.example.com',
    size: '1000+',
    location: 'Mumbai, Maharashtra',
    founded: 2005,
    specialties: ['Healthcare Services', 'Medical Insurance', 'Telemedicine', 'Pharmacy'],
    activeJobs: 32,
    featured: true,
    isVerified: true,
    rating: 4.7,
    reviews: 256
  },
  {
    _id: '3',
    name: 'FinanceHub India',
    logo: 'https://via.placeholder.com/100x100/f59e0b/ffffff?text=FH',
    industry: 'Financial Services',
    description: 'Premier financial services company specializing in investment banking, wealth management, and fintech solutions.',
    website: 'https://financehub.example.com',
    size: '201-500',
    location: 'Mumbai, Maharashtra',
    founded: 2012,
    specialties: ['Investment Banking', 'Wealth Management', 'Fintech', 'Insurance'],
    activeJobs: 28,
    featured: true,
    isVerified: true,
    rating: 4.3,
    reviews: 89
  },
  {
    _id: '4',
    name: 'GreenEnergy Corp',
    logo: 'https://via.placeholder.com/100x100/22c55e/ffffff?text=GE',
    industry: 'Renewable Energy',
    description: 'Pioneering sustainable energy solutions including solar, wind, and hydroelectric power generation projects.',
    website: 'https://greenenergy.example.com',
    size: '51-200',
    location: 'Gurugram, Haryana',
    founded: 2018,
    specialties: ['Solar Energy', 'Wind Power', 'Energy Storage', 'Carbon Credits'],
    activeJobs: 15,
    featured: false,
    isVerified: true,
    rating: 4.6,
    reviews: 42
  },
  {
    _id: '5',
    name: 'RetailMax',
    logo: 'https://via.placeholder.com/100x100/ec4899/ffffff?text=RM',
    industry: 'Retail & E-commerce',
    description: 'Omnichannel retail company offering fashion, electronics, and home goods through physical stores and online platforms.',
    website: 'https://retailmax.example.com',
    size: '1000+',
    location: 'Delhi NCR',
    founded: 2008,
    specialties: ['E-commerce', 'Retail', 'Supply Chain', 'Customer Experience'],
    activeJobs: 56,
    featured: true,
    isVerified: true,
    rating: 4.2,
    reviews: 312
  },
  {
    _id: '6',
    name: 'EduLearn Platform',
    logo: 'https://via.placeholder.com/100x100/8b5cf6/ffffff?text=EL',
    industry: 'Education & EdTech',
    description: 'Innovative online learning platform offering courses, certifications, and degree programs in partnership with top universities.',
    website: 'https://edulearn.example.com',
    size: '201-500',
    location: 'Bengaluru, Karnataka',
    founded: 2015,
    specialties: ['Online Learning', 'Higher Education', 'Corporate Training', 'Skill Development'],
    activeJobs: 22,
    featured: false,
    isVerified: true,
    rating: 4.4,
    reviews: 167
  },
  {
    _id: '7',
    name: 'AutoDrive Motors',
    logo: 'https://via.placeholder.com/100x100/3b82f6/ffffff?text=AD',
    industry: 'Automotive',
    description: 'Electric and autonomous vehicle manufacturer committed to sustainable transportation solutions.',
    website: 'https://autodrive.example.com',
    size: '501-1000',
    location: 'Pune, Maharashtra',
    founded: 2016,
    specialties: ['Electric Vehicles', 'Autonomous Driving', 'Battery Technology', 'Smart Mobility'],
    activeJobs: 38,
    featured: true,
    isVerified: true,
    rating: 4.8,
    reviews: 94
  },
  {
    _id: '8',
    name: 'LogiPrime Logistics',
    logo: 'https://via.placeholder.com/100x100/f97316/ffffff?text=LP',
    industry: 'Logistics & Supply Chain',
    description: 'End-to-end logistics and supply chain management company offering warehousing, transportation, and inventory solutions.',
    website: 'https://logiprime.example.com',
    size: '501-1000',
    location: 'Hyderabad, Telangana',
    founded: 2011,
    specialties: ['Warehousing', 'Transportation', 'Last Mile Delivery', 'Inventory Management'],
    activeJobs: 41,
    featured: false,
    isVerified: true,
    rating: 4.1,
    reviews: 78
  },
  {
    _id: '9',
    name: 'MediaMax Entertainment',
    logo: 'https://via.placeholder.com/100x100/ef4444/ffffff?text=MM',
    industry: 'Media & Entertainment',
    description: 'Content creation and broadcasting company producing films, television shows, and digital content.',
    website: 'https://mediamax.example.com',
    size: '201-500',
    location: 'Mumbai, Maharashtra',
    founded: 2009,
    specialties: ['Film Production', 'Television', 'Digital Content', 'Music'],
    activeJobs: 18,
    featured: false,
    isVerified: true,
    rating: 4.5,
    reviews: 143
  },
  {
    _id: '10',
    name: 'ConstructionPro',
    logo: 'https://via.placeholder.com/100x100/78716c/ffffff?text=CP',
    industry: 'Construction & Real Estate',
    description: 'Premier construction and real estate development company specializing in residential, commercial, and infrastructure projects.',
    website: 'https://constructionpro.example.com',
    size: '501-1000',
    location: 'Noida, Uttar Pradesh',
    founded: 2007,
    specialties: ['Commercial Construction', 'Residential Projects', 'Infrastructure', 'Interior Design'],
    activeJobs: 25,
    featured: true,
    isVerified: true,
    rating: 4.3,
    reviews: 89
  },
  {
    _id: '11',
    name: 'CloudNine Technologies',
    logo: 'https://via.placeholder.com/100x100/0ea5e9/ffffff?text=CN',
    industry: 'Information Technology',
    description: 'Cloud infrastructure and DevOps services company helping enterprises migrate and manage cloud workloads efficiently.',
    website: 'https://cloudnine.example.com',
    size: '201-500',
    location: 'Hyderabad, Telangana',
    founded: 2014,
    specialties: ['Cloud Migration', 'DevOps', 'AWS', 'Azure', 'Kubernetes'],
    activeJobs: 28,
    featured: true,
    isVerified: true,
    rating: 4.6,
    reviews: 67
  },
  {
    _id: '12',
    name: 'PharmaCare Labs',
    logo: 'https://via.placeholder.com/100x100/22c55e/ffffff?text=PC',
    industry: 'Pharmaceuticals',
    description: 'Research-driven pharmaceutical company developing innovative medicines and healthcare solutions for a healthier tomorrow.',
    website: 'https://pharmacare.example.com',
    size: '1000+',
    location: 'Ahmedabad, Gujarat',
    founded: 2003,
    specialties: ['Drug Research', 'Clinical Trials', 'Manufacturing', 'Quality Assurance'],
    activeJobs: 55,
    featured: true,
    isVerified: true,
    rating: 4.7,
    reviews: 198
  },
  {
    _id: '13',
    name: 'FinServe Technologies',
    logo: 'https://via.placeholder.com/100x100/1d4ed8/ffffff?text=FS',
    industry: 'Fintech',
    description: 'B2B fintech company providing payment gateway, lending, and banking solutions to enterprises.',
    website: 'https://finserve.example.com',
    size: '501-1000',
    location: 'Bengaluru, Karnataka',
    founded: 2014,
    specialties: ['Payments', 'Lending', 'Banking APIs', 'Compliance'],
    activeJobs: 48,
    featured: true,
    isVerified: true,
    rating: 4.4,
    reviews: 156
  },
  {
    _id: '14',
    name: 'SmartHome Solutions',
    logo: 'https://via.placeholder.com/100x100/8b5cf6/ffffff?text=SH',
    industry: 'Internet of Things (IoT)',
    description: 'Smart home automation company developing IoT devices, home security systems, and intelligent living solutions.',
    website: 'https://smarthome.example.com',
    size: '51-200',
    location: 'Bengaluru, Karnataka',
    founded: 2018,
    specialties: ['Home Automation', 'IoT Devices', 'Security Systems', 'Voice Assistants'],
    activeJobs: 22,
    featured: true,
    isVerified: true,
    rating: 4.5,
    reviews: 45
  },
  {
    _id: '15',
    name: 'DataDriven Analytics',
    logo: 'https://via.placeholder.com/100x100/06b6d4/ffffff?text=DD',
    industry: 'Data Analytics & Big Data',
    description: 'Business intelligence company providing data analytics, machine learning, and predictive modeling solutions.',
    website: 'https://datadriven.example.com',
    size: '201-500',
    location: 'Bengaluru, Karnataka',
    founded: 2017,
    specialties: ['Business Intelligence', 'Machine Learning', 'Data Visualization', 'Predictive Analytics'],
    activeJobs: 35,
    featured: true,
    isVerified: true,
    rating: 4.6,
    reviews: 87
  },
  {
    _id: '16',
    name: 'MediCare Plus',
    logo: 'https://via.placeholder.com/100x100/ef4444/ffffff?text=MC',
    industry: 'Healthcare',
    description: 'Multi-specialty hospital chain offering comprehensive medical care, emergency services, and diagnostic facilities.',
    website: 'https://medicareplus.example.com',
    size: '1000+',
    location: 'Hyderabad, Telangana',
    founded: 2000,
    specialties: ['Multi-specialty Care', 'Emergency Services', 'Diagnostics', 'Telemedicine'],
    activeJobs: 75,
    featured: true,
    isVerified: true,
    rating: 4.8,
    reviews: 423
  },
  {
    _id: '17',
    name: 'TalentFirst HR',
    logo: 'https://via.placeholder.com/100x100/fbbf24/ffffff?text=TF',
    industry: 'Human Resources',
    description: 'HR consulting firm offering recruitment Process outsourcing, background verification, and HRIS solutions.',
    website: 'https://talentfirst.example.com',
    size: '201-500',
    location: 'Gurugram, Haryana',
    founded: 2011,
    specialties: ['RPO', 'Background Verification', 'HRIS', 'Payroll Processing'],
    activeJobs: 30,
    featured: true,
    isVerified: true,
    rating: 4.3,
    reviews: 112
  },
  {
    _id: '18',
    name: 'InnoTech Solutions',
    logo: 'https://via.placeholder.com/100x100/0891b2/ffffff?text=IT',
    industry: 'Information Technology',
    description: 'Innovative software development company specializing in mobile apps, web platforms, and enterprise solutions.',
    website: 'https://innotech.example.com',
    size: '201-500',
    location: 'Bengaluru, Karnataka',
    founded: 2013,
    specialties: ['Mobile Development', 'Web Apps', 'SaaS', 'AI Solutions'],
    activeJobs: 38,
    featured: false,
    isVerified: true,
    rating: 4.4,
    reviews: 76
  }
];

const allIndustries = [...new Set(sampleCompanies.map(c => c.industry))].sort();
const allLocations = [...new Set(sampleCompanies.map(c => c.location.split(',')[1]?.trim() || c.location))].filter(Boolean).sort();

const Companies = () => {
  const [filters, setFilters] = useState({
    search: '',
    industry: '',
    size: '',
    location: ''
  });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Compute total active job openings programmatically
  const totalOpenPositions = useMemo(() => {
    return sampleCompanies.reduce((acc, c) => acc + c.activeJobs, 0);
  }, []);

  // Compute filtered & sorted list inline via useMemo to guarantee atomic state renders
  const filteredCompanies = useMemo(() => {
    let result = [...sampleCompanies];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.industry.toLowerCase().includes(searchLower)
      );
    }

    if (filters.industry) {
      result = result.filter(c => c.industry === filters.industry);
    }

    if (filters.size) {
      result = result.filter(c => c.size === filters.size);
    }

    if (filters.location) {
      result = result.filter(c => c.location.includes(filters.location));
    }

    switch (sortBy) {
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'jobs':
        result.sort((a, b) => b.activeJobs - a.activeJobs);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', industry: '', size: '', location: '' });
    setSortBy('featured');
  };

  const getCompanyInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getCompanyColor = (name) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#0ea5e9', '#ef4444', '#14b8a6', '#f97316', '#06b6d4'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          style={{ color: i <= roundedRating ? '#f59e0b' : '#475569', marginRight: '2px', fontSize: '14px' }}
        >
          {i <= roundedRating ? '\u2605' : '\u2606'}
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      {/* Premium Gradient Hero Section */}
      <section className="hero" style={{ minHeight: '45vh', paddingTop: '140px', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-tag" style={{ color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', fontSize: '13px', display: 'block', marginBottom: '10px' }}>
              OUR TRUSTED PARTNERS
            </span>
            <h1 className="section-title" style={{ fontSize: '52px', color: '#ffffff', fontWeight: '800', margin: '0 0 16px 0', background: 'linear-gradient(135deg, #ffffff 30%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Top Global Ecosystems
            </h1>
            <p className="section-subtitle" style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto', fontSize: '16px', lineHeight: '1.6' }}>
              Discover premier companies hiring now. Cross-examine corporate environments, review sizing protocols, and find your perfect culture match.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Main Filter & Explorer Interface */}
      <section className="section" style={{ padding: '60px 0', background: '#0b0f19', minHeight: '70vh' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Controls Bar */}
          <div className="companies-header" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '32px', borderBottom: '1px solid #1e293b', paddingBottom: '24px' }}>
            <div className="results-info" style={{ flex: '1', minWidth: '250px' }}>
              <h2 style={{ color: '#ffffff', fontSize: '24px', margin: '0 0 4px 0', fontWeight: '700' }}>
                {filteredCompanies.length} Corporate Platforms Available
              </h2>
              <p style={{ color: '#64748b', margin: '0', fontSize: '14px' }}>Filter down by industry specialties and regional branches</p>
            </div>
            <div className="companies-controls" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="view-toggle" style={{ display: 'flex', background: '#1e293b', padding: '4px', borderRadius: '8px' }}>
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  style={{ background: viewMode === 'grid' ? '#3b82f6' : 'transparent', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  &#9638;
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  style={{ background: viewMode === 'list' ? '#3b82f6' : 'transparent', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  &#9776;
                </button>
              </div>
              <select 
                className="sort-select" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ background: '#1e293b', color: '#ffffff', border: '1px solid #334155', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', outline: 'none' }}
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="jobs">Most Active Jobs</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="companies-layout" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Filter Pipeline Panel */}
            <div className="companies-filters" style={{ background: '#111827', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px' }}>
              <div className="search-bar" style={{ display: 'flex', gap: '12px', marginBottom: showFilters ? '20px' : '0' }}>
                <div style={{ position: 'relative', flex: '1' }}>
                  <span className="search-icon" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>&#128269;</span>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search by company name, technology stack, or industry markers..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px 16px 12px 42px', color: '#ffffff', outline: 'none', fontSize: '14px' }}
                  />
                </div>
                <button 
                  className="filter-toggle" 
                  onClick={() => setShowFilters(!showFilters)}
                  style={{ background: '#1e293b', color: '#ffffff', border: '1px solid #334155', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
                >
                  {showFilters ? 'Collapse Filters' : 'Advanced Filters'}
                </button>
              </div>
              
              {/* Expandable Advanced Options Container */}
              <div className={`filter-options ${showFilters ? 'show' : ''}`} style={{ display: showFilters ? 'grid' : 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', paddingTop: '10px' }}>
                <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Industry Vertical</label>
                  <select name="industry" value={filters.industry} onChange={handleFilterChange} style={{ background: '#0f172a', color: '#ffffff', border: '1px solid #1e293b', padding: '10px', borderRadius: '8px', outline: 'none' }}>
                    <option value="">All Fields</option>
                    {allIndustries.map((ind, i) => (
                      <option key={i} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Workforce Size</label>
                  <select name="size" value={filters.size} onChange={handleFilterChange} style={{ background: '#0f172a', color: '#ffffff', border: '1px solid #1e293b', padding: '10px', borderRadius: '8px', outline: 'none' }}>
                    <option value="">Any Scale</option>
                    <option value="1-10">1-10 specialists</option>
                    <option value="11-50">11-50 specialists</option>
                    <option value="51-200">51-200 scale-up</option>
                    <option value="201-500">201-500 mid-market</option>
                    <option value="501-1000">501-1000 enterprise</option>
                    <option value="1000+">1000+ global corporate</option>
                  </select>
                </div>
                <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Regional Hub</label>
                  <select name="location" value={filters.location} onChange={handleFilterChange} style={{ background: '#0f172a', color: '#ffffff', border: '1px solid #1e293b', padding: '10px', borderRadius: '8px', outline: 'none' }}>
                    <option value="">All Regions</option>
                    {allLocations.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button 
                    className="clear-filters" 
                    onClick={clearFilters}
                    style={{ width: '100%', background: '#7f1d1d', color: '#fca5a5', border: '1px solid #991b1b', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Clear Filter Variables
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Results Node */}
            {filteredCompanies.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', background: '#111827', border: '1px dashed #1e293b', borderRadius: '12px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '20px', margin: '0 0 8px 0' }}>No Corporate Clusters Detected</h3>
                <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto 20px auto', fontSize: '14px' }}>Modify your matching parameters or purge explicit search strings to look across the whole network.</p>
                <button onClick={clearFilters} style={{ background: '#3b82f6', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>Reset Search Pipeline</button>
              </div>
            ) : (
              <div 
                className={`companies-results ${viewMode}`}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(340px, 1fr))' : '1fr', 
                  gap: '24px' 
                }}
              >
                {filteredCompanies.map((company) => (
                  <div 
                    key={company._id} 
                    className={`company-card ${company.featured ? 'featured' : ''}`}
                    style={{ 
                      background: '#111827', 
                      border: company.featured ? '1px solid #3b82f6' : '1px solid #1e293b', 
                      borderRadius: '12px', 
                      padding: '24px', 
                      position: 'relative', 
                      display: 'flex',
                      flexDirection: viewMode === 'list' ? 'row' : 'column',
                      flexWrap: viewMode === 'list' ? 'wrap' : 'nowrap',
                      justifyContent: 'space-between',
                      gap: '20px',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    {company.featured && (
                      <span className="featured-badge" style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        FEATURED
                      </span>
                    )}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: '1' }}>
                      <div className="company-header" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div className="company-logo" style={{ backgroundColor: getCompanyColor(company.name), width: '54px', height: '54px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#ffffff', fontSize: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                          <span className="logo-text">{getCompanyInitials(company.name)}</span>
                        </div>
                        <div>
                          <h3 style={{ color: '#ffffff', fontSize: '19px', margin: '0 0 4px 0', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {company.name}
                            {company.isVerified && <span className="verified-badge" title="Verified Professional Partner" style={{ color: '#10b981', fontSize: '14px' }}>&#10004;</span>}
                          </h3>
                          <span className="company-industry" style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '500' }}>{company.industry}</span>
                        </div>
                      </div>
                      
                      <div className="company-rating" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex' }}>{renderStars(company.rating)}</div>
                        <span className="rating-value" style={{ color: '#fffffff', fontWeight: '600', fontSize: '13px', marginLeft: '4px' }}>{company.rating}</span>
                        <span className="rating-count" style={{ color: '#475569', fontSize: '12px' }}>({company.reviews} global audits)</span>
                      </div>
                      
                      <div className="company-meta" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', color: '#94a3b8', fontSize: '13px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#3b82f6' }}>&#128205;</span> {company.location}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#3b82f6' }}>&#128101;</span> {company.size} scale</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#3b82f6' }}>&#128197;</span> Est. {company.founded}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#10b981' }}>&#128188;</span> {company.activeJobs} Open Tracks</span>
                      </div>
                      
                      <p className="company-description" style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', margin: '4px 0' }}>
                        {company.description.substring(0, 110)}...
                      </p>
                      
                      <div className="company-specialties" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {company.specialties?.slice(0, 3).map((specialty, i) => (
                          <span key={i} style={{ background: '#1e293b', color: '#cbd5e1', fontSize: '11px', padding: '4px 10px', borderRadius: '6px', fontWeight: '400', border: '1px solid #334155' }}>
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="company-actions" style={{ display: 'flex', flexDirection: viewMode === 'list' ? 'column' : 'row', gap: '10px', width: viewMode === 'list' ? '160px' : '100%', borderTop: viewMode === 'grid' ? '1px solid #1e293b' : 'none', paddingTop: viewMode === 'grid' ? '16px' : '0', justifyContent: 'center' }}>
                      <Link 
                        to={`/jobs?company=${encodeURIComponent(company.name)}`} 
                        className="btn btn-primary"
                        style={{ flex: '1', textAlign: 'center', background: '#3b82f6', color: '#ffffff', textDecoration: 'none', padding: '10px 0', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}
                      >
                        Explore Openings
                      </Link>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-secondary"
                        style={{ flex: '1', textAlign: 'center', background: '#1e293b', color: '#cbd5e1', textDecoration: 'none', padding: '10px 0', borderRadius: '8px', fontSize: '13px', fontWeight: '600', border: '1px solid #334155' }}
                      >
                        Portal site
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Network Live Aggregates Banner */}
      <section className="stats-section" style={{ background: '#111827', padding: '50px 0', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
            <div className="stat-item">
              <span className="stat-icon" style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>&#127981;</span>
              <span className="stat-value" style={{ color: '#ffffff', fontSize: '32px', fontWeight: '800', display: 'block' }}>{sampleCompanies.length}+</span>
              <span className="stat-label" style={{ color: '#64748b', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verified Ecosystems</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon" style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>&#128188;</span>
              <span className="stat-value" style={{ color: '#3b82f6', fontSize: '32px', fontWeight: '800', display: 'block' }}>{totalOpenPositions}+</span>
              <span className="stat-label" style={{ color: '#64748b', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Allocations</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon" style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>&#127970;</span>
              <span className="stat-value" style={{ color: '#ffffff', fontSize: '32px', fontWeight: '800', display: 'block' }}>{allIndustries.length}+</span>
              <span className="stat-label" style={{ color: '#64748b', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Industry Verticals</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon" style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>&#127891;</span>
              <span className="stat-value" style={{ color: '#10b981', fontSize: '32px', fontWeight: '800', display: 'block' }}>45+</span>
              <span className="stat-label" style={{ color: '#64748b', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Regional Clusters</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reverse Engagement Portal CTA */}
      <section className="cta-section" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0b0f19 100%)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <div className="cta-content">
            <h2 style={{ color: '#ffffff', fontSize: '36px', fontWeight: '800', margin: '0 0 14px 0' }}>Sourcing Top Talent Pipeline?</h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6', margin: '0 0 32px 0' }}>
              Register your organization profile to instantly cross-reference your direct tech stack criteria against our live matching talent matrix.
            </p>
            <Link 
              to="/contact" 
              className="btn btn-primary"
              style={{ display: 'inline-block', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#ffffff', textDecoration: 'none', padding: '14px 38px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)' }}
            >
              Partner Corporate Profile
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Companies;