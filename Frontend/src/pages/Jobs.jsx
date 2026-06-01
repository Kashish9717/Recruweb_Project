import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';

const sampleJobs = [
  {
    _id: '1',
    title: 'Senior HR Manager',
    company: 'Recruweb',
    location: 'Noida, Uttar Pradesh',
    jobType: 'full-time',
    experience: '5-10 years',
    salary: { min: 80000, max: 120000, currency: 'INR' },
    description: 'We are looking for an experienced HR Manager to oversee all aspects of human resources practices and objectives. You will provide strategic guidance to management on employment-related issues.',
    requirements: ['HR Management experience', 'Knowledge of labor laws', 'Strong communication skills', 'Strategic thinking'],
    skills: ['HRIS', 'Recruitment', 'Employee Relations', 'Compliance'],
    qualifications: ['MBA in HR', '7+ years experience'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work Options'],
    department: 'Human Resources',
    featured: true,
    openings: 2
  },
  {
    _id: '2',
    title: 'Talent Acquisition Specialist',
    company: 'Recruweb',
    location: 'Noida, Uttar Pradesh',
    jobType: 'full-time',
    experience: '1-2 years',
    salary: { min: 35000, max: 50000, currency: 'INR' },
    description: 'Join our talent acquisition team to help us find and hire the best candidates for our clients. You will be responsible for sourcing, screening, and placing candidates.',
    requirements: ['Recruitment experience', 'Excellent communication', 'CRM knowledge', 'Team player'],
    skills: ['Sourcing', 'Interviewing', 'LinkedIn Recruiter', 'ATS'],
    qualifications: ['Bachelor\'s degree', '1-3 years experience'],
    benefits: ['Career Growth', 'Training Program', 'Performance Bonus'],
    department: 'Recruitment',
    featured: true,
    openings: 5
  },
  {
    _id: '3',
    title: 'Payroll Executive',
    company: 'Recruweb',
    location: 'Noida, Uttar Pradesh',
    jobType: 'full-time',
    experience: '1-2 years',
    salary: { min: 25000, max: 40000, currency: 'INR' },
    description: 'We need a detail-oriented Payroll Executive to manage our payroll operations efficiently and accurately.',
    requirements: ['Payroll experience', 'Knowledge of Indian payroll', 'Tally proficiency', 'Attention to detail'],
    skills: ['Payroll Software', 'Excel', 'Tally', 'Statutory Compliance'],
    qualifications: ['B.Com/M.Com', '1-3 years payroll experience'],
    benefits: ['Medical Insurance', 'Paid Leave', 'Learning Opportunities'],
    department: 'Payroll',
    featured: false,
    openings: 3
  },
  {
    _id: '4',
    title: 'HR Analyst',
    company: 'Recruweb',
    location: 'Remote',
    jobType: 'remote',
    experience: 'fresher',
    salary: { min: 20000, max: 30000, currency: 'INR' },
    description: 'Entry-level position for HR Analytics. Ideal for fresh graduates interested in data-driven HR practices.',
    requirements: ['Graduate in any discipline', 'Analytical mindset', 'Excel proficiency', 'Interest in HR analytics'],
    skills: ['Excel', 'Power BI', 'Data Analysis', 'Reporting'],
    qualifications: ['Any graduate', 'Freshers welcome'],
    benefits: ['Work from Home', 'Training', 'Certification Support'],
    department: 'Human Resources',
    featured: true,
    openings: 4
  },
  {
    _id: '5',
    title: 'HR Coordinator',
    company: 'Recruweb',
    location: 'Noida, Uttar Pradesh',
    jobType: 'full-time',
    experience: 'fresher',
    salary: { min: 18000, max: 25000, currency: 'INR' },
    description: 'Support our HR team with administrative tasks and employee onboarding processes.',
    requirements: ['Graduate', 'Good communication', 'Organization skills', 'Multitasking ability'],
    skills: ['MS Office', 'Communication', 'Organization', 'Time Management'],
    qualifications: ['Any graduate', 'Freshers encouraged'],
    benefits: ['Friendly Environment', 'Growth Path', 'Health Benefits'],
    department: 'Human Resources',
    featured: false,
    openings: 6
  },
  {
    _id: '6',
    title: 'Recruitment Consultant',
    company: 'Recruweb',
    location: 'Noida, Uttar Pradesh',
    jobType: 'contract',
    experience: '1-2 years',
    salary: { min: 30000, max: 45000, currency: 'INR' },
    description: 'Work as a recruitment consultant, handling client requirements and candidate placements across various industries.',
    requirements: ['Sales mindset', 'Recruitment background', 'Client handling', 'Target oriented'],
    skills: ['Client Relations', 'Sourcing', 'Negotiation', 'Target Management'],
    qualifications: ['Any graduate', '1-2 years in recruitment'],
    benefits: ['Incentives', 'Flexible Hours', 'Training'],
    department: 'Recruitment',
    featured: true,
    openings: 8
  },
  {
    _id: '7',
    title: 'Software Developer',
    company: 'TechVision Solutions',
    location: 'Bengaluru, Karnataka',
    jobType: 'full-time',
    experience: '3-5 years',
    salary: { min: 80000, max: 150000, currency: 'INR' },
    description: 'Join our development team to build enterprise software solutions and work on cutting-edge technologies.',
    requirements: ['Strong programming skills', 'Problem-solving ability', 'Team collaboration', 'Agile methodology'],
    skills: ['JavaScript', 'React', 'Node.js', 'SQL'],
    qualifications: ['B.Tech/MCA', '3+ years experience'],
    benefits: ['Health Insurance', 'Stock Options', 'Learning Budget'],
    department: 'Engineering',
    featured: true,
    openings: 4
  },
  {
    _id: '8',
    title: 'Data Scientist',
    company: 'DataDriven Analytics',
    location: 'Bengaluru, Karnataka',
    jobType: 'full-time',
    experience: '3-5 years',
    salary: { min: 100000, max: 180000, currency: 'INR' },
    description: 'Develop machine learning models and analyze large datasets to drive business insights.',
    requirements: ['Statistical knowledge', 'ML expertise', 'Programming skills', 'Business acumen'],
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
    qualifications: ['M.Sc/PhD in relevant field', '3+ years experience'],
    benefits: ['Flexible Work', 'Research Opportunities', 'Conference Budget'],
    department: 'Data Science',
    featured: true,
    openings: 2
  },
  {
    _id: '9',
    title: 'Marketing Manager',
    company: 'RetailMax',
    location: 'Delhi NCR',
    jobType: 'full-time',
    experience: '5-10 years',
    salary: { min: 90000, max: 140000, currency: 'INR' },
    description: 'Lead our marketing initiatives and drive brand growth through digital and traditional marketing strategies.',
    requirements: ['Marketing experience', 'Digital marketing knowledge', 'Team leadership', 'Strategic planning'],
    skills: ['Digital Marketing', 'SEO/SEM', 'Social Media', 'Analytics'],
    qualifications: ['MBA in Marketing', '5+ years experience'],
    benefits: ['Performance Bonus', 'Health Insurance', 'Travel Allowance'],
    department: 'Marketing',
    featured: false,
    openings: 1
  },
  {
    _id: '10',
    title: 'Financial Analyst',
    company: 'FinanceHub India',
    location: 'Mumbai, Maharashtra',
    jobType: 'full-time',
    experience: '1-2 years',
    salary: { min: 45000, max: 70000, currency: 'INR' },
    description: 'Analyze financial data and provide insights to support investment decisions and financial planning.',
    requirements: ['Finance degree', 'Analytical skills', 'Attention to detail', 'Communication'],
    skills: ['Financial Modeling', 'Excel', 'PowerPoint', 'Bloomberg'],
    qualifications: ['CA/CFA/MBA Finance', '1-3 years experience'],
    benefits: ['Learning Opportunities', 'Performance Bonus', 'Health Benefits'],
    department: 'Finance',
    featured: false,
    openings: 3
  },
  {
    _id: '11',
    title: 'UI/UX Designer',
    company: 'SmartHome Solutions',
    location: 'Bengaluru, Karnataka',
    jobType: 'full-time',
    experience: '1-2 years',
    salary: { min: 40000, max: 65000, currency: 'INR' },
    description: 'Design intuitive user interfaces and experiences for our smart home products and applications.',
    requirements: ['Design skills', 'User research', 'Prototyping', 'Portfolio'],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research'],
    qualifications: ['B.Des/M.Des', '1-3 years experience'],
    benefits: ['Creative Freedom', 'Latest Tools', 'Workshops'],
    department: 'Design',
    featured: true,
    openings: 2
  },
  {
    _id: '12',
    title: 'Content Writer',
    company: 'EduLearn Platform',
    location: 'Remote',
    jobType: 'remote',
    experience: 'fresher',
    salary: { min: 15000, max: 25000, currency: 'INR' },
    description: 'Create engaging educational content for our online learning platform.',
    requirements: ['Excellent writing', 'Research ability', 'SEO knowledge', 'Time management'],
    skills: ['Content Writing', 'SEO', 'Research', 'Editing'],
    qualifications: ['Any graduate', 'Freshers welcome'],
    benefits: ['Work from Home', 'Flexible Hours', 'Learning Access'],
    department: 'Content',
    featured: false,
    openings: 5
  },
  {
    _id: '13',
    title: 'DevOps Engineer',
    company: 'CloudNine Technologies',
    location: 'Hyderabad, Telangana',
    jobType: 'full-time',
    experience: '3-5 years',
    salary: { min: 90000, max: 160000, currency: 'INR' },
    description: 'Manage cloud infrastructure and implement CI/CD pipelines for our enterprise clients.',
    requirements: ['Cloud experience', 'DevOps tools', 'Scripting', 'Problem-solving'],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    qualifications: ['B.Tech', '3+ years DevOps experience'],
    benefits: ['Certifications', 'Health Insurance', 'Remote Options'],
    department: 'Engineering',
    featured: true,
    openings: 3
  },
  {
    _id: '14',
    title: 'Sales Executive',
    company: 'ConstructionPro',
    location: 'Noida, Uttar Pradesh',
    jobType: 'full-time',
    experience: '1-2 years',
    salary: { min: 25000, max: 50000, currency: 'INR' },
    description: 'Drive sales for our construction and real estate projects.',
    requirements: ['Sales experience', 'Communication', 'Negotiation', 'Target achievement'],
    skills: ['Sales', 'Negotiation', 'Client Relations', 'Presentations'],
    qualifications: ['Any graduate', '1-3 years sales experience'],
    benefits: ['Travel Allowance', 'Incentives', 'Health Insurance'],
    department: 'Sales',
    featured: false,
    openings: 6
  },
  {
    _id: '15',
    title: 'Mobile App Developer',
    company: 'InnoTech Solutions',
    location: 'Bengaluru, Karnataka',
    jobType: 'full-time',
    experience: '3-5 years',
    salary: { min: 70000, max: 130000, currency: 'INR' },
    description: 'Develop cross-platform mobile applications using React Native or Flutter.',
    requirements: ['Mobile development', 'React Native/Flutter', 'API integration', 'Performance optimization'],
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    qualifications: ['B.Tech/MCA', '3+ years experience'],
    benefits: ['Latest Tech', 'Hackathons', 'Learning Budget'],
    department: 'Engineering',
    featured: true,
    openings: 3
  }
];

const allDepartments = [...new Set(sampleJobs.map(j => j.department))].sort();
const allLocations = [...new Set(sampleJobs.map(j => j.location))].sort();

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState(sampleJobs);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    jobType: searchParams.get('jobType') || '',
    experience: searchParams.get('experience') || '',
    department: searchParams.get('department') || '',
    company: searchParams.get('company') || ''
  });
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy]);

  const applyFilters = () => {
    let filtered = [...sampleJobs];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(j =>
        j.title.toLowerCase().includes(searchLower) ||
        j.company.toLowerCase().includes(searchLower) ||
        j.skills.some(s => s.toLowerCase().includes(searchLower))
      );
    }

    if (filters.location) {
      filtered = filtered.filter(j => j.location.includes(filters.location));
    }

    if (filters.jobType) {
      filtered = filtered.filter(j => j.jobType === filters.jobType);
    }

    if (filters.experience) {
      filtered = filtered.filter(j => j.experience === filters.experience);
    }

    if (filters.department) {
      filtered = filtered.filter(j => j.department === filters.department);
    }

    if (filters.company) {
      filtered = filtered.filter(j => j.company.toLowerCase().includes(filters.company.toLowerCase()));
    }

    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'salary':
        filtered.sort((a, b) => (b.salary.max || 0) - (a.salary.max || 0));
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        break;
    }

    setJobs(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: '', location: '', jobType: '', experience: '', department: '', company: '' });
    setSortBy('featured');
  };

  const getJobTypeColor = (type) => {
    const colors = {
      'full-time': '#10b981',
      'part-time': '#3b82f6',
      'contract': '#f59e0b',
      'internship': '#8b5cf6',
      'remote': '#ec4899'
    };
    return colors[type] || '#6b7280';
  };

  const formatSalary = (salary) => {
    if (!salary || !salary.min) return 'Salary not specified';
    const formatNum = (num) => {
      if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num;
    };
    if (salary.max) {
      return `₹${formatNum(salary.min)} - ₹${formatNum(salary.max)}`;
    }
    return `₹${formatNum(salary.min)}+`;
  };

  return (
    <>
      {/* Dynamic Style Injection for Premium Global Layout Animations */}
      <style>{`
        @keyframes floatBlobOne {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -50px) scale(1.15); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes floatBlobTwo {
          0% { transform: translate(0px, 0px) scale(1.1); }
          50% { transform: translate(-50px, 40px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1.1); }
        }
        .ambient-glow-1 { animation: floatBlobOne 14s infinite ease-in-out; }
        .ambient-glow-2 { animation: floatBlobTwo 18s infinite ease-in-out; }
        
        /* High-Fidelity Interactive Job Cards styles */
        .premium-job-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px;
          position: relative;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.02);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-job-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: 0 20px 35px -5px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(59, 130, 246, 0.05);
        }
        .premium-job-card.is-featured {
          background: linear-gradient(180deg, #ffffff 0%, #fdfeff 100%);
          border: 1px solid #bfdbfe;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.04);
        }
        .premium-job-card.is-featured:hover {
          border-color: #3b82f6;
          box-shadow: 0 22px 40px -8px rgba(59, 130, 246, 0.12);
        }
        .card-action-btn {
          transition: all 0.25s ease;
        }
        .card-action-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }
        .skill-badge-tag {
          transition: all 0.2s ease;
        }
        .skill-badge-tag:hover {
          background: #f1f5f9 !important;
          color: #0f172a !important;
          border-color: #cbd5e1 !important;
        }
        .glass-panel {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .glass-panel:hover {
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 30px 60px -10px rgba(59, 130, 246, 0.15);
        }
        .interactive-cta-btn {
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .interactive-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(59, 130, 246, 0.35), 0 0 0 4px rgba(59, 130, 246, 0.15);
        }
        .interactive-cta-btn:active { transform: translateY(-1px); }
      `}</style>

      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '45vh', paddingTop: '120px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginRight: '-80px' }}>
          <div className="section-header" style={{ maxWidth: '700px' }}>
            <span className="section-tag" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '16px' }}>Careers Portal</span>
            <h1 className="section-title" style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.2' }}>Find Your Next Opportunity</h1>
            <p className="section-subtitle" style={{ fontSize: '18px', color: '#94a3b8', margin: '0', lineHeight: '1.6' }}>
              Explore {sampleJobs.length}+ verified tech and operational openings across premier sectors.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Main Jobs Section */}
      <section className="section" style={{ paddingTop: '50px', paddingBottom: '80px', backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Header Controls Area */}
          <div className="jobs-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div className="results-info">
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' }}>{jobs.length} Matching Positions</h2>
              {filters.company && (
                <span className="filter-badge" style={{ display: 'inline-flex', alignItems: 'center', background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', marginTop: '8px' }}>
                  Company: {filters.company}
                  <button onClick={() => setFilters({...filters, company: ''})} style={{ background: 'none', border: 'none', color: '#0369a1', marginLeft: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>&times;</button>
                </span>
              )}
              {!filters.company && <p style={{ margin: '0', color: '#64748b', fontSize: '15px' }}>Filter or browse our dynamic list below</p>}
            </div>
            <div className="jobs-controls">
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ADD8E6', color: '#334155', fontWeight: '500', fontSize: '14px', outline: 'none', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <option value="featured">Sort by: Featured First</option>
                <option value="salary">Sort by: Highest Salary</option>
                <option value="newest">Sort by: Newest First</option>
              </select>
            </div>
          </div>

          {/* Main Content Row-Wise Stack Layout */}
          <div className="jobs-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
            
            {/* Filters Row Panel */}
            <div className="jobs-filters" style={{ width: '100%', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '24px', boxSizing: 'border-box', boxShadow: '0 10px 30px -10px rgba(15,23,42,0.15)' }}>
              
              {/* Full-width Search Bar */}
              <div className="search-bar" style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                  type="text"
                  name="search"
                  placeholder="Search job titles, unique skills or keywords..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                />
              </div>

              {/* Filter Selectors */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
                <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.75px' }}>Location</label>
                  <select name="location" value={filters.location} onChange={handleFilterChange} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#f8fafc', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                    <option value="">All Locations</option>
                    {allLocations.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.75px' }}>Job Type</label>
                  <select name="jobType" value={filters.jobType} onChange={handleFilterChange} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#f8fafc', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                    <option value="">All Types</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>

                <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.75px' }}>Experience</label>
                  <select name="experience" value={filters.experience} onChange={handleFilterChange} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#f8fafc', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                    <option value="">All Levels</option>
                    <option value="fresher">Fresher</option>
                    <option value="1-2 years">1-2 Years</option>
                    <option value="3-5 years">3-5 Years</option>
                    <option value="5-10 years">5-10 Years</option>
                  </select>
                </div>

                <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.75px' }}>Department</label>
                  <select name="department" value={filters.department} onChange={handleFilterChange} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#f8fafc', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                    <option value="">All Departments</option>
                    {allDepartments.map((dept, i) => (
                      <option key={i} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <button className="clear-filters" onClick={clearFilters} style={{ flex: '1 1 150px', padding: '12px', borderRadius: '10px', border: '1px solid #475569', background: 'transparent', color: '#cbd5e1', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                  Clear All
                </button>
              </div>

              {/* Quick Links Footer */}
              <div className="quick-links-extra" style={{ display: 'flex', gap: '16px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #1e293b', flexWrap: 'wrap' }}>
                <Link to="/post-job" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderRadius: '8px', background: '#1e293b', border: '1px dashed #475569', flex: '1 1 auto' }}>
                  <span style={{ fontSize: '16px' }}>✨</span>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#f8fafc' }}>Post a Job</div>
                </Link>
                <Link to="/schedule-interview" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderRadius: '8px', background: '#1e293b', border: '1px dashed #475569', flex: '1 1 auto' }}>
                  <span style={{ fontSize: '16px' }}>📅</span>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#f8fafc' }}>Schedule Interview</div>
                </Link>
              </div>
            </div>

            {/* Main Cards Output Listing Area */}
            <div className="jobs-results" style={{ width: '100%' }}>
              {jobs.length === 0 ? (
                <div className="empty-state" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '18px', color: '#1e293b', margin: '0 0 8px 0' }}>No jobs found</h3>
                  <p style={{ color: '#64748b', margin: '0 0 20px 0' }}>Try adjusting your filters or search criteria</p>
                  <button onClick={clearFilters} style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Reset Settings</button>
                </div>
              ) : (
                <div className="jobs-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {jobs.map((job) => (
                    <div 
                      key={job._id} 
                      className={`premium-job-card ${job.featured ? 'is-featured' : ''}`}
                    >
                      {/* Featured Glowing Micro-Badge */}
                      {job.featured && (
                        <span style={{ position: 'absolute', top: '24px', right: '24px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '5px 12px', borderRadius: '30px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 2px 10px rgba(59, 130, 246, 0.08)' }}>
                          ⚡ Featured
                        </span>
                      )}
                      
                      {/* Card Content Header */}
                      <div style={{ marginBottom: '16px', paddingRight: job.featured ? '100px' : '0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0', letterSpacing: '-0.3px', lineHeight: '1.3' }}>
                            {job.title}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                            <span style={{ fontSize: '15px', color: '#2563eb', fontWeight: '700' }}>{job.company}</span>
                            <span style={{ color: '#cbd5e1' }}>•</span>
                            <span style={{ fontSize: '12px', color: '#475569', background: '#f1f5f9', padding: '3px 10px', borderRadius: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                              {job.department}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Metadata Metric Grid details */}
                      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap', fontSize: '14px', color: '#475569', alignItems: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fafafa', padding: '6px 12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                          <span style={{ fontSize: '15px' }}>📍</span> <strong>{job.location}</strong>
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fafafa', padding: '6px 12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                          <span style={{ fontSize: '15px' }}>💼</span> {job.experience}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', color: '#16a34a', padding: '6px 12px', borderRadius: '8px', border: '1px solid #dcfce7', fontWeight: '700' }}>
                          <span style={{ fontSize: '15px' }}>💰</span> {formatSalary(job.salary)}
                        </span>
                        <span 
                          style={{ backgroundColor: `${getJobTypeColor(job.jobType)}12`, color: getJobTypeColor(job.jobType), padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', border: `1px solid ${getJobTypeColor(job.jobType)}25` }}
                        >
                          {job.jobType.replace('-', ' ')}
                        </span>
                      </div>
                      
                      {/* Description Paragraph */}
                      <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: '0 0 20px 0', fontWeight: '400' }}>
                        {job.description.substring(0, 175)}...
                      </p>
                      
                      {/* Pill-shaped Stack Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                        {job.skills.slice(0, 5).map((skill, i) => (
                          <span 
                            key={i} 
                            className="skill-badge-tag"
                            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', padding: '5px 14px', borderRadius: '30px', fontSize: '12px', fontWeight: '600' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Controls Footer split */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '16px' }}>
                        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#22c55e', animation: 'pulse-glow 2s infinite' }}>●</span> {job.openings} active position{job.openings > 1 ? 's' : ''}
                        </span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <Link to={`/jobs/${job._id}`} className="card-action-btn" style={{ textDecoration: 'none', padding: '10px 20px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#334155', fontSize: '14px', fontWeight: '600', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            Details
                          </Link>
                          <Link to={`/jobs/${job._id}#apply`} className="card-action-btn" style={{ textDecoration: 'none', padding: '10px 22px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)' }}>
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Profile CTA Banner */}
      <section className="cta-section" style={{ 
        position: 'relative',
        background: '#090d16', 
        color: '#fff', 
        padding: '100px 20px', 
        textAlign: 'center',
        overflow: 'hidden',
        borderRadius: '24px',
        margin: '40px 0',
        boxShadow: 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.05)'
      }}>
        {/* Soft Blurry Decorative Fluid Elements */}
        <div className="ambient-glow-1" style={{
          position: 'absolute',
          top: '-15%',
          left: '15%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, transparent 75%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(20px)'
        }} />
        <div className="ambient-glow-2" style={{
          position: 'absolute',
          bottom: '-25%',
          right: '15%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.18) 0%, transparent 75%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(20px)'
        }} />

        {/* Translucent Glass Card Wrapper */}
        <div className="container glass-panel" style={{ 
          maxWidth: '650px', 
          margin: '0 auto',
          padding: '54px 40px',
          borderRadius: '24px',
          position: 'relative',
          zIndex: 2
        }}>
          <div className="cta-content">
            {/* Upper Floating Element Badge */}
            <div style={{
              width: '52px',
              height: '52px',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              fontSize: '22px',
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.2)'
            }}>
              ✨
            </div>

            {/* Titanium Gradient Heading */}
            <h2 style={{ 
              fontSize: '34px', 
              margin: '0 0 14px 0', 
              fontWeight: '800',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #ffffff 40%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Can't find the right job?
            </h2>
            
            <p style={{ 
              color: '#94a3b8', 
              margin: '0 0 36px 0', 
              fontSize: '15px', 
              lineHeight: '1.7',
              fontWeight: '400'
            }}>
              Drop your resume profile directly into our matching database. We'll cross-reference your exact tech stack against custom roles before they even hit the main board.
            </p>
            
            {/* Micro-interactive Action Control */}
            <Link 
              to="/contact" 
              className="interactive-cta-btn" 
              style={{ 
                textDecoration: 'none', 
                padding: '14px 36px', 
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
                color: '#fff', 
                borderRadius: '12px', 
                fontWeight: '600', 
                display: 'inline-block',
                fontSize: '15px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              Submit Your Resume
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;