import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    description: 'We are looking for an experienced HR Manager to oversee all aspects of human resources practices and objectives. You will provide strategic guidance to management on employment-related issues. The ideal candidate will have a strong background in HR policies, employee relations, and talent management.',
    requirements: ['HR Management experience', 'Knowledge of labor laws', 'Strong communication skills', 'Strategic thinking', 'Performance management'],
    skills: ['HRIS', 'Recruitment', 'Employee Relations', 'Compliance', 'Training & Development'],
    qualifications: ['MBA in HR', '7+ years experience'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work Options', 'Performance Bonus'],
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
    description: 'Join our talent acquisition team to help us find and hire the best candidates for our clients. You will be responsible for sourcing, screening, and placing candidates across various industries and domains.',
    requirements: ['Recruitment experience', 'Excellent communication', 'CRM knowledge', 'Team player', 'LinkedIn proficiency'],
    skills: ['Sourcing', 'Interviewing', 'LinkedIn Recruiter', 'ATS', 'Candidate Assessment'],
    qualifications: ['Bachelor\'s degree', '1-3 years experience'],
    benefits: ['Career Growth', 'Training Program', 'Performance Bonus', 'Health Insurance'],
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
    description: 'We need a detail-oriented Payroll Executive to manage our payroll operations efficiently and accurately. You will be responsible for processing monthly payroll, statutory compliance, and employee queries.',
    requirements: ['Payroll experience', 'Knowledge of Indian payroll', 'Tally proficiency', 'Attention to detail', 'Excel skills'],
    skills: ['Payroll Software', 'Excel', 'Tally', 'Statutory Compliance', 'EPF/ESI'],
    qualifications: ['B.Com/M.Com', '1-3 years payroll experience'],
    benefits: ['Medical Insurance', 'Paid Leave', 'Learning Opportunities', 'Flexible Hours'],
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
    description: 'Entry-level position for HR Analytics. Ideal for fresh graduates interested in data-driven HR practices. You will analyze HR metrics, generate reports, and support strategic HR initiatives.',
    requirements: ['Graduate in any discipline', 'Analytical mindset', 'Excel proficiency', 'Interest in HR analytics', 'Problem-solving skills'],
    skills: ['Excel', 'Power BI', 'Data Analysis', 'Reporting', 'Statistics'],
    qualifications: ['Any graduate', 'Freshers welcome'],
    benefits: ['Work from Home', 'Training', 'Certification Support', 'Flexible Hours'],
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
    description: 'Support our HR team with administrative tasks and employee onboarding processes. You will be the first point of contact for employees and help maintain a positive work environment.',
    requirements: ['Graduate', 'Good communication', 'Organization skills', 'Multitasking ability', 'Team player'],
    skills: ['MS Office', 'Communication', 'Organization', 'Time Management', 'Documentation'],
    qualifications: ['Any graduate', 'Freshers encouraged'],
    benefits: ['Friendly Environment', 'Growth Path', 'Health Benefits', 'Learning Opportunities'],
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
    description: 'Work as a recruitment consultant, handling client requirements and candidate placements across various industries. Build relationships with clients and deliver quality placements.',
    requirements: ['Sales mindset', 'Recruitment background', 'Client handling', 'Target oriented', 'Negotiation skills'],
    skills: ['Client Relations', 'Sourcing', 'Negotiation', 'Target Management', 'Business Development'],
    qualifications: ['Any graduate', '1-2 years in recruitment'],
    benefits: ['Incentives', 'Flexible Hours', 'Training', 'Career Growth'],
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
    description: 'Join our development team to build enterprise software solutions and work on cutting-edge technologies. You will design, develop, and maintain scalable applications.',
    requirements: ['Strong programming skills', 'Problem-solving ability', 'Team collaboration', 'Agile methodology', 'Code review experience'],
    skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    qualifications: ['B.Tech/MCA', '3+ years experience'],
    benefits: ['Health Insurance', 'Stock Options', 'Learning Budget', 'Flexible Hours'],
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
    description: 'Develop machine learning models and analyze large datasets to drive business insights. Work with stakeholders to understand business problems and provide data-driven solutions.',
    requirements: ['Statistical knowledge', 'ML expertise', 'Programming skills', 'Business acumen', 'Communication skills'],
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Data Visualization'],
    qualifications: ['M.Sc/PhD in relevant field', '3+ years experience'],
    benefits: ['Flexible Work', 'Research Opportunities', 'Conference Budget', 'Health Insurance'],
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
    description: 'Lead our marketing initiatives and drive brand growth through digital and traditional marketing strategies. Manage marketing budget and team to achieve business objectives.',
    requirements: ['Marketing experience', 'Digital marketing knowledge', 'Team leadership', 'Strategic planning', 'ROI analysis'],
    skills: ['Digital Marketing', 'SEO/SEM', 'Social Media', 'Analytics', 'Brand Management'],
    qualifications: ['MBA in Marketing', '5+ years experience'],
    benefits: ['Performance Bonus', 'Health Insurance', 'Travel Allowance', 'Company Car'],
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
    description: 'Analyze financial data and provide insights to support investment decisions and financial planning. Create financial models and reports for stakeholders.',
    requirements: ['Finance degree', 'Analytical skills', 'Attention to detail', 'Communication', 'Excel expertise'],
    skills: ['Financial Modeling', 'Excel', 'PowerPoint', 'Bloomberg', 'Valuation'],
    qualifications: ['CA/CFA/MBA Finance', '1-3 years experience'],
    benefits: ['Learning Opportunities', 'Performance Bonus', 'Health Benefits', 'Subsidized Meals'],
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
    description: 'Design intuitive user interfaces and experiences for our smart home products and applications. Create wireframes, prototypes, and maintain design systems.',
    requirements: ['Design skills', 'User research', 'Prototyping', 'Portfolio', 'Familiarity with design tools'],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping'],
    qualifications: ['B.Des/M.Des', '1-3 years experience'],
    benefits: ['Creative Freedom', 'Latest Tools', 'Workshops', 'Flexible Hours'],
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
    description: 'Create engaging educational content for our online learning platform. Write articles, tutorials, and course materials for various subjects and audiences.',
    requirements: ['Excellent writing', 'Research ability', 'SEO knowledge', 'Time management', 'Subject expertise'],
    skills: ['Content Writing', 'SEO', 'Research', 'Editing', 'WordPress'],
    qualifications: ['Any graduate', 'Freshers welcome'],
    benefits: ['Work from Home', 'Flexible Hours', 'Learning Access', 'Performance Bonus'],
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
    description: 'Manage cloud infrastructure and implement CI/CD pipelines for our enterprise clients. Ensure system reliability, security, and performance.',
    requirements: ['Cloud experience', 'DevOps tools', 'Scripting', 'Problem-solving', 'Infrastructure as Code'],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    qualifications: ['B.Tech', '3+ years DevOps experience'],
    benefits: ['Certifications', 'Health Insurance', 'Remote Options', 'Stock Options'],
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
    description: 'Drive sales for our construction and real estate projects. Generate leads, meet clients, and close deals. Build long-term relationships with customers.',
    requirements: ['Sales experience', 'Communication', 'Negotiation', 'Target achievement', 'CRM knowledge'],
    skills: ['Sales', 'Negotiation', 'Client Relations', 'Presentations', 'Market Research'],
    qualifications: ['Any graduate', '1-3 years sales experience'],
    benefits: ['Travel Allowance', 'Incentives', 'Health Insurance', 'Company Phone'],
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
    description: 'Develop cross-platform mobile applications using React Native or Flutter. Collaborate with designers and backend developers to deliver high-quality apps.',
    requirements: ['Mobile development', 'React Native/Flutter', 'API integration', 'Performance optimization', 'Testing'],
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'JavaScript'],
    qualifications: ['B.Tech/MCA', '3+ years experience'],
    benefits: ['Latest Tech', 'Hackathons', 'Learning Budget', 'Flexible Hours'],
    department: 'Engineering',
    featured: true,
    openings: 3
  }
];

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationForm, setApplicationForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    currentPosition: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchJob();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchJob = () => {
    setLoading(true);
    
    const demoJobs = JSON.parse(localStorage.getItem('ardhnarishwar_demo_jobs') || '[]');
    const allJobs = [...sampleJobs, ...demoJobs];
    const foundJob = allJobs.find(j => j._id === id || j.id === id);
    
    setTimeout(() => {
      setJob(foundJob || null);
      setLoading(false);
    }, 300);
  };

  const handleInputChange = (e) => {
    setApplicationForm({ ...applicationForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const applications = JSON.parse(localStorage.getItem('ardhnarishwar_applications') || '[]');
      applications.push({
        ...applicationForm,
        jobId: id,
        jobTitle: job?.title,
        company: job?.company,
        appliedAt: new Date().toISOString()
      });
      localStorage.setItem('ardhnarishwar_applications', JSON.stringify(applications));
      setSuccessMessage('Application submitted successfully! We will contact you soon.');
      setApplicationForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        currentCompany: '',
        currentPosition: '',
        coverLetter: ''
      });
    } catch (error) {
      setErrorMessage('Failed to submit application. Please try again.');
    }
    setIsSubmitting(false);
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
      return `${formatNum(salary.min)} - ${formatNum(salary.max)} ${salary.currency || 'INR'}`;
    }
    return `${formatNum(salary.min)}+ ${salary.currency || 'INR'}`;
  };

  if (loading) {
    return (
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '140px' }}>
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading job details...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="hero" style={{ minHeight: '60vh', paddingTop: '140px' }}>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">404</span>
            <h1 className="section-title">Job Not Found</h1>
            <p className="section-subtitle">
              This job may have been removed or is no longer available.
            </p>
            <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Browse All Jobs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="hero" style={{ minHeight: '50vh', paddingTop: '120px' }}>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container">
          <Link to="/jobs" className="back-link">← Back to Jobs</Link>
          <div className="section-header" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
            <span className="section-tag">{job.department}</span>
            <h1 className="section-title">{job.title}</h1>
            <div className="job-detail-meta">
              <span><strong>Company:</strong> {job.company}</span>
              <span><strong>Location:</strong> {job.location}</span>
              <span><strong>Job Type:</strong> <span style={{ color: getJobTypeColor(job.jobType), textTransform: 'capitalize' }}>{job.jobType.replace('-', ' ')}</span></span>
              <span><strong>Experience:</strong> {job.experience}</span>
              <span><strong>Salary:</strong> {formatSalary(job.salary)}</span>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="job-detail-grid">
            <div className="job-detail-content">
              <div className="detail-section">
                <h2>Job Description</h2>
                <p>{job.description}</p>
              </div>

              {job.requirements?.length > 0 && (
                <div className="detail-section">
                  <h2>Requirements</h2>
                  <ul className="detail-list">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.responsibilities?.length > 0 && (
                <div className="detail-section">
                  <h2>Responsibilities</h2>
                  <ul className="detail-list">
                    {job.responsibilities.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.qualifications?.length > 0 && (
                <div className="detail-section">
                  <h2>Qualifications</h2>
                  <ul className="detail-list">
                    {job.qualifications.map((qual, i) => (
                      <li key={i}>{qual}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits?.length > 0 && (
                <div className="detail-section">
                  <h2>Benefits</h2>
                  <div className="benefits-grid">
                    {job.benefits.map((benefit, i) => (
                      <span key={i} className="benefit-item">✓ {benefit}</span>
                    ))}
                  </div>
                </div>
              )}

              {job.skills?.length > 0 && (
                <div className="detail-section">
                  <h2>Required Skills</h2>
                  <div className="skills-list">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="job-detail-sidebar" id="apply">
              <div className="apply-card">
                <h3>Apply for this Position</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={applicationForm.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={applicationForm.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={applicationForm.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={applicationForm.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Years of Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={applicationForm.experience}
                      onChange={handleInputChange}
                      placeholder="e.g., 3 years"
                    />
                  </div>
                  <div className="form-group">
                    <label>Current Company</label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={applicationForm.currentCompany}
                      onChange={handleInputChange}
                      placeholder="Previous employer"
                    />
                  </div>
                  <div className="form-group">
                    <label>Current Position</label>
                    <input
                      type="text"
                      name="currentPosition"
                      value={applicationForm.currentPosition}
                      onChange={handleInputChange}
                      placeholder="Your current role"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cover Letter</label>
                    <textarea
                      name="coverLetter"
                      value={applicationForm.coverLetter}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us why you're a great fit for this role..."
                    ></textarea>
                  </div>
                  {successMessage && <div className="form-success">{successMessage}</div>}
                  {errorMessage && <div className="form-error">{errorMessage}</div>}
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
              <div className="contact-card">
                <h3>Need Help?</h3>
                <p>Contact us if you have any questions about this position.</p>
                <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetail;
