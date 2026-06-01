import { useState } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';

const JDMaker = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    location: '',
    employmentType: '',
    experience: '',
    salary: '',
    keyResponsibilities: '',
    qualifications: '',
    skills: '',
    benefits: '',
    companyDescription: ''
  });

  const [generatedJD, setGeneratedJD] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const departments = [
    'Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance', 
    'Operations', 'Customer Service', 'Design', 'Admin', 'Other'
  ];

  const employmentTypes = [
    'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'
  ];

  const experienceLevels = [
    'Fresher', '0-1 Years', '1-3 Years', '3-5 Years', '5-7 Years', '7-10 Years', '10+ Years'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateJD = () => {
    if (!formData.jobTitle) {
      alert('Please enter a Job Title');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const jd = `
📋 JOB DESCRIPTION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏢 Position: ${formData.jobTitle || '[Job Title]'}
📂 Department: ${formData.department || 'Not Specified'}
📍 Location: ${formData.location || 'Not Specified'}
💼 Employment Type: ${formData.employmentType || 'Full-time'}
⏰ Experience: ${formData.experience || 'Not Specified'}
💰 Salary: ${formData.salary || 'Competitive'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 ABOUT THE ROLE

${formData.keyResponsibilities || `• Lead and manage team activities\n• Collaborate with cross-functional teams\n• Drive key projects and initiatives\n• Ensure timely delivery of objectives\n• Report progress to stakeholders`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ QUALIFICATIONS & REQUIREMENTS

${formData.qualifications || `• Bachelor's degree in relevant field\n• Proven work experience\n• Strong communication skills\n• Problem-solving abilities\n• Team management experience`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 SKILLS REQUIRED

${formData.skills || `• Communication Skills\n• Leadership\n• Problem Solving\n• Time Management\n• Technical Proficiency`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌟 BENEFITS & PERKS

${formData.benefits || `• Competitive salary package\n• Health insurance coverage\n• Professional development opportunities\n• Flexible working hours\n• Friendly work environment`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏢 ABOUT ${formData.companyDescription ? formData.companyDescription.toUpperCase() : 'OUR COMPANY'}

${formData.companyDescription ? formData.companyDescription : 'We are a leading organization committed to innovation and excellence. Join our dynamic team and contribute to our growth story.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 HOW TO APPLY

Interested candidates can apply through our website or send their updated resume to info@recruweb.com

Reference Code: JD-${Date.now().toString(36).toUpperCase()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `;
      setGeneratedJD(jd);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJD);
    alert('Job Description copied to clipboard!');
  };

  const downloadJD = () => {
    const blob = new Blob([generatedJD], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.jobTitle || 'Job-Description'}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      jobTitle: '',
      department: '',
      location: '',
      employmentType: '',
      experience: '',
      salary: '',
      keyResponsibilities: '',
      qualifications: '',
      skills: '',
      benefits: '',
      companyDescription: ''
    });
    setGeneratedJD('');
  };

  return (
    <>
      <section className="hero" style={{ minHeight: '50vh', paddingTop: '140px' }}>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Tools</span>
            <h1 className="section-title" style={{ fontSize: '48px' }}>Job Description Maker</h1>
            <p className="section-subtitle">
              Create professional job descriptions in seconds. Fill in the details below and generate a polished JD for your organization.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="section">
        <div className="container">
          <div className="jd-maker-grid">
            <div className="jd-form-section">
              <div className="jd-form-card">
                <h3>Enter Job Details</h3>
                
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select name="department" value={formData.department} onChange={handleChange}>
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Noida, UP"
                    />
                  </div>
                  <div className="form-group">
                    <label>Employment Type</label>
                    <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
                      <option value="">Select Type</option>
                      {employmentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Experience Required</label>
                    <select name="experience" value={formData.experience} onChange={handleChange}>
                      <option value="">Select Experience</option>
                      {experienceLevels.map(exp => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Salary Range</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="e.g., ₹8-12 LPA"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Key Responsibilities</label>
                  <textarea
                    name="keyResponsibilities"
                    value={formData.keyResponsibilities}
                    onChange={handleChange}
                    placeholder="Enter each responsibility on a new line..."
                    rows="5"
                  />
                  <span className="form-hint">Enter each point on a new line</span>
                </div>

                <div className="form-group">
                  <label>Qualifications & Requirements</label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="Enter each qualification on a new line..."
                    rows="5"
                  />
                  <span className="form-hint">Enter each point on a new line</span>
                </div>

                <div className="form-group">
                  <label>Required Skills</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Enter each skill on a new line..."
                    rows="4"
                  />
                  <span className="form-hint">Enter each skill on a new line</span>
                </div>

                <div className="form-group">
                  <label>Benefits & Perks</label>
                  <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="Enter each benefit on a new line..."
                    rows="4"
                  />
                  <span className="form-hint">Enter each benefit on a new line</span>
                </div>

                <div className="form-group">
                  <label>About Your Company</label>
                  <textarea
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    placeholder="Tell candidates about your company culture and values..."
                    rows="3"
                  />
                </div>

                <div className="jd-form-actions">
                  <button className="btn btn-primary btn-lg" onClick={generateJD} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <span className="spinner"></span>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                        Generate JD
                      </>
                    )}
                  </button>
                  <button className="btn btn-outline" onClick={resetForm}>
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="jd-preview-section">
              <div className="jd-preview-card">
                <div className="jd-preview-header">
                  <h3>Job Description Preview</h3>
                  {generatedJD && (
                    <div className="jd-preview-actions">
                      <button className="btn-icon" onClick={copyToClipboard} title="Copy">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                      </button>
                      <button className="btn-icon" onClick={downloadJD} title="Download">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="jd-preview-content">
                  {generatedJD ? (
                    <pre className="jd-text">{generatedJD}</pre>
                  ) : (
                    <div className="jd-empty-state">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      <p>Fill in the job details and click "Generate JD" to create a professional job description</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Templates</span>
            <h2 className="section-title">Quick Templates</h2>
            <p className="section-subtitle">
              Use these pre-built templates for common job roles
            </p>
          </div>
          <div className="templates-grid">
            <div className="template-card" onClick={() => {
              setFormData(prev => ({ ...prev, jobTitle: 'Software Developer', department: 'Engineering', employmentType: 'Full-time', experience: '2-4 Years', keyResponsibilities: '• Design and implement new features\n• Write clean, maintainable code\n• Collaborate with cross-functional teams\n• Debug and fix issues\n• Participate in code reviews', qualifications: '• B.Tech/B.E. in Computer Science\n• 2+ years of experience\n• Proficiency in JavaScript/Python\n• Knowledge of databases\n• Strong problem-solving skills', skills: '• JavaScript/Python\n• React/Angular\n• SQL/MongoDB\n• Git\n• Agile Methodology', benefits: '• Competitive salary\n• Health insurance\n• Flexible work hours\n• Learning opportunities\n• Team outings' }));
            }}>
              <div className="template-icon">💻</div>
              <h4>Software Developer</h4>
              <p>Engineering</p>
            </div>
            <div className="template-card" onClick={() => {
              setFormData(prev => ({ ...prev, jobTitle: 'Sales Manager', department: 'Sales', employmentType: 'Full-time', experience: '3-5 Years', keyResponsibilities: '• Lead sales team to achieve targets\n• Develop sales strategies\n• Build client relationships\n• Analyze market trends\n• Prepare sales reports', qualifications: '• MBA in Sales/Marketing\n• 3+ years of sales experience\n• Proven track record\n• Excellent communication\n• Leadership skills', skills: '• Sales Strategy\n• Client Relations\n• Negotiation\n• CRM Tools\n• Presentation', benefits: '• Attractive incentives\n• Travel allowances\n• Performance bonuses\n• Training programs\n• Career growth' }));
            }}>
              <div className="template-icon">📈</div>
              <h4>Sales Manager</h4>
              <p>Sales</p>
            </div>
            <div className="template-card" onClick={() => {
              setFormData(prev => ({ ...prev, jobTitle: 'HR Executive', department: 'Human Resources', employmentType: 'Full-time', experience: '1-3 Years', keyResponsibilities: '• Manage recruitment流程\n• Handle employee onboarding\n• Maintain HR records\n• Coordinate training programs\n• Assist in payroll processing', qualifications: '• MBA in HR\n• 1-2 years of experience\n• Knowledge of labor laws\n• Good interpersonal skills\n• Proficiency in MS Office', skills: '• Recruitment\n• Payroll\n• Employee Relations\n• MS Excel\n• HRIS Systems', benefits: '• Competitive package\n• Professional development\n• Work-life balance\n• Friendly environment\n• Growth opportunities' }));
            }}>
              <div className="template-icon">👔</div>
              <h4>HR Executive</h4>
              <p>Human Resources</p>
            </div>
            <div className="template-card" onClick={() => {
              setFormData(prev => ({ ...prev, jobTitle: 'Marketing Manager', department: 'Marketing', employmentType: 'Full-time', experience: '3-5 Years', keyResponsibilities: '• Develop marketing strategies\n• Manage digital campaigns\n• Brand management\n• Market research\n• Budget planning', qualifications: '• MBA in Marketing\n• 3+ years experience\n• Digital marketing knowledge\n• Creative mindset\n• Analytical skills', skills: '• Digital Marketing\n• SEO/SEM\n• Social Media\n• Content Strategy\n• Analytics', benefits: '• Creative freedom\n• Performance incentives\n• Industry exposure\n• Skill development\n• Team activities' }));
            }}>
              <div className="template-icon">📣</div>
              <h4>Marketing Manager</h4>
              <p>Marketing</p>
            </div>
            <div className="template-card" onClick={() => {
              setFormData(prev => ({ ...prev, jobTitle: 'Accountant', department: 'Finance', employmentType: 'Full-time', experience: '2-4 Years', keyResponsibilities: '• Manage financial records\n• Prepare financial statements\n• Tax compliance\n• Budget management\n• Audit coordination', qualifications: '• B.Com/M.Com\n• CA Inter preferred\n• 2+ years experience\n• Knowledge of accounting software\n• Attention to detail', skills: '• Tally/QuickBooks\n• Excel Advanced\n• GST/Tax\n• Financial Reporting\n• Audit', benefits: '• Competitive salary\n• Professional environment\n• Learning opportunities\n• Medical coverage\n• Fixed timings' }));
            }}>
              <div className="template-icon">📊</div>
              <h4>Accountant</h4>
              <p>Finance</p>
            </div>
            <div className="template-card" onClick={() => {
              setFormData(prev => ({ ...prev, jobTitle: 'Customer Support Executive', department: 'Customer Service', employmentType: 'Full-time', experience: '0-2 Years', keyResponsibilities: '• Handle customer queries\n• Resolve complaints\n• Maintain customer records\n• Coordinate with teams\n• Product knowledge', qualifications: '• Graduate in any field\n• Freshers welcome\n• Good communication\n• Problem-solving ability\n• Patience', skills: '• Communication\n• Problem Solving\n• MS Office\n• Email Etiquette\n• CRM', benefits: '• Performance incentives\n• Friendly team\n• Growth opportunities\n• Fixed schedule\n• Training provided' }));
            }}>
              <div className="template-icon">🎧</div>
              <h4>Customer Support</h4>
              <p>Service</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JDMaker;
