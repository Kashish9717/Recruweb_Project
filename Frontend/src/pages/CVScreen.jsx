import { useState, useRef, useEffect } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';

const CVScreen = () => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [multiMode, setMultiMode] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', text: "Hi! I'm your AI screening assistant. I can help you understand candidate profiles, compare candidates, or suggest improvements to job requirements. How can I help?" }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [showKeywordAnalysis, setShowKeywordAnalysis] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    requiredSkills: '',
    experience: '',
    qualifications: '',
    salaryRange: '',
    location: '',
    urgency: 'normal'
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type === 'application/pdf' || 
        file.name.endsWith('.doc') || 
        file.name.endsWith('.docx') ||
        file.type === 'text/plain') {
      setUploadedFile(file);
      if (multiMode) {
        setCandidates(prev => [...prev, {
          id: Date.now(),
          file,
          name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          status: 'pending'
        }]);
      }
    } else {
      alert('Please upload a PDF, DOC, DOCX, or TXT file');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateDetailedResults = () => {
    const skills = formData.requiredSkills ? formData.requiredSkills.split(',').map(s => s.trim()) : [];
    const requiredYears = parseInt(formData.experience) || 3;
    
    const skillScores = skills.length > 0 
      ? skills.map(skill => ({
          skill,
          score: Math.floor(Math.random() * 40) + 55,
          found: Math.random() > 0.2,
          occurrences: Math.floor(Math.random() * 5) + 1
        }))
      : [
          { skill: 'Communication', score: Math.floor(Math.random() * 30) + 70, found: true, occurrences: 4 },
          { skill: 'Leadership', score: Math.floor(Math.random() * 35) + 60, found: true, occurrences: 3 },
          { skill: 'Technical Skills', score: Math.floor(Math.random() * 40) + 55, found: true, occurrences: 5 },
          { skill: 'Problem Solving', score: Math.floor(Math.random() * 30) + 65, found: true, occurrences: 2 },
          { skill: 'Team Management', score: Math.floor(Math.random() * 25) + 70, found: true, occurrences: 2 },
        ];

    const overallScore = Math.floor(Math.random() * 30) + 60;
    const matchScore = Math.floor(Math.random() * 25) + 65;
    const atsScore = Math.floor(Math.random() * 20) + 75;

    const experienceYears = Math.floor(Math.random() * 10) + 1;
    const relevantYears = Math.floor(Math.random() * experienceYears);

    const strengths = [];
    const weaknesses = [];

    if (skillScores.filter(s => s.found).length > skillScores.length / 2) {
      strengths.push('Strong alignment with required skills');
    }
    if (experienceYears >= requiredYears) {
      strengths.push('Experience exceeds minimum requirements');
    } else {
      weaknesses.push(`Experience (${experienceYears} years) below requirement (${requiredYears}+ years)`);
    }
    if (Math.random() > 0.3) {
      strengths.push('Quantifiable achievements with metrics');
    }
    if (Math.random() > 0.5) {
      strengths.push('Relevant certifications or training');
    }
    if (Math.random() > 0.6) {
      strengths.push('Leadership or management experience');
    }
    if (skillScores.filter(s => !s.found).length > 2) {
      weaknesses.push('Missing some key required skills');
    }
    if (Math.random() > 0.7) {
      weaknesses.push('Could benefit from stronger quantifiable results');
    }

    const parsedSections = {
      contact: {
        email: 'candidate@email.com',
        phone: '+91 98XXX XXXXX',
        location: 'Delhi, India',
        linkedin: 'linkedin.com/in/candidate'
      },
      summary: 'Experienced professional with a proven track record in delivering results. Skilled in cross-functional collaboration and stakeholder management. Seeking to leverage expertise in a challenging role.',
      experience: [
        {
          title: 'Senior Developer',
          company: 'Tech Corp India',
          duration: '2022 - Present',
          highlights: [
            'Led team of 5 developers on critical projects',
            'Improved system performance by 40%',
            'Mentored junior team members'
          ]
        },
        {
          title: 'Software Engineer',
          company: 'StartupXYZ',
          duration: '2019 - 2022',
          highlights: [
            'Developed customer-facing applications',
            'Reduced bug count by 60%',
            'Implemented CI/CD pipeline'
          ]
        }
      ],
      education: [
        {
          degree: 'B.Tech in Computer Science',
          institution: 'ABC University',
          year: '2019',
          grade: '8.5 CGPA'
        }
      ],
      certifications: [
        'AWS Certified Developer',
        'Google Analytics Certified'
      ],
      languages: ['English', 'Hindi', 'Hindi']
    };

    return {
      overallScore,
      matchScore,
      atsScore,
      skillScores,
      experience: {
        total: experienceYears,
        relevant: relevantYears,
        matches: experienceYears >= requiredYears,
        requirement: requiredYears
      },
      education: {
        level: "Bachelor's Degree",
        field: 'Computer Science',
        matches: Math.random() > 0.3,
        verified: Math.random() > 0.5
      },
      parsedSections,
      keywords: {
        found: skillScores.filter(s => s.found).map(s => s.skill),
        missing: skillScores.filter(s => !s.found).map(s => s.skill),
        density: Math.floor(Math.random() * 30) + 15
      },
      strengths: strengths.length > 0 ? strengths : ['Good overall profile alignment'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['Standard candidate profile'],
      recommendation: overallScore >= 75 
        ? { text: 'Strongly Recommended', color: '#10b981', action: 'Proceed to Interview' }
        : overallScore >= 60 
          ? { text: 'Consider for Interview', color: '#f59e0b', action: 'Review Further' }
          : { text: 'Not Recommended', color: '#ef4444', action: 'Archive' },
      summary: `The candidate profile shows ${overallScore >= 75 ? 'strong' : overallScore >= 60 ? 'moderate' : 'limited'} alignment with the position requirements. Key areas of match include ${skillScores.filter(s => s.found).slice(0, 2).map(s => s.skill.toLowerCase()).join(' and ') || 'general skills'}. ${experienceYears >= requiredYears ? 'Experience requirements are met.' : 'Additional experience may be needed.'}`,
      redFlags: Math.random() > 0.7 ? ['Employment gaps detected', 'Frequent job changes'] : [],
      cultureFit: Math.floor(Math.random() * 20) + 75,
      growthPotential: Math.floor(Math.random() * 25) + 70
    };
  };

  const analyzeCV = () => {
    if (!uploadedFile && candidates.length === 0) {
      alert('Please upload at least one CV/Resume');
      return;
    }
    if (!formData.jobTitle) {
      alert('Please enter the Job Title');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    setTimeout(() => {
      const mockResults = generateDetailedResults();
      
      if (multiMode && candidates.length > 0) {
        const allResults = candidates.map(c => ({
          ...mockResults,
          overallScore: Math.floor(Math.random() * 30) + 60,
          candidateName: c.name
        })).sort((a, b) => b.overallScore - a.overallScore);
        
        setResults({
          multi: true,
          candidates: allResults,
          topCandidate: allResults[0]
        });
      } else {
        setResults({
          ...mockResults,
          candidateName: uploadedFile?.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Unknown'
        });
      }
      
      setIsAnalyzing(false);
      setStep(3);
    }, 3000);
  };

  const handleAISubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = { sender: 'user', text: aiInput };
    setAiMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      let response = "I can help you with:\n\n";
      response += "• Explaining candidate scores\n";
      response += "• Comparing multiple candidates\n";
      response += "• Suggestions for job requirements\n";
      response += "• Understanding ATS compatibility\n";

      if (aiInput.toLowerCase().includes('score') || aiInput.toLowerCase().includes('match')) {
        response = `The match score indicates how well the candidate's profile aligns with your job requirements. A score of 75%+ is considered strong. `;
        if (results) {
          response += `Your current candidate has a ${results.matchScore}% match score, which is ${results.matchScore >= 75 ? 'good' : 'moderate'} for this role.`;
        }
      } else if (aiInput.toLowerCase().includes('ats')) {
        response = "ATS (Applicant Tracking System) compatibility measures how well the resume is formatted for automated screening systems. ";
        if (results) {
          response += `This candidate scores ${results.atsScore}% on ATS compatibility. ${results.atsScore >= 80 ? 'The resume is well-optimized.' : 'Consider improving formatting for better visibility.'}`;
        }
      } else if (aiInput.toLowerCase().includes('compare') && results?.multi) {
        response = "I can compare candidates based on:\n";
        response += "• Overall match score\n";
        response += "• Skills alignment\n";
        response += "• Experience level\n";
        response += "• ATS compatibility\n\n";
        response += "The candidates have been ranked by overall score. Candidate 1 (";
        response += results.candidates[0]?.overallScore + "%) is the top match.";
      }

      setAiMessages(prev => [...prev, { sender: 'ai', text: response }]);
    }, 500);

    setAiInput('');
  };

  const resetAnalysis = () => {
    setStep(1);
    setResults(null);
    setUploadedFile(null);
    setCandidates([]);
    setSelectedCandidates([]);
    setAnalysisProgress(0);
    setFormData({
      jobTitle: '',
      department: '',
      requiredSkills: '',
      experience: '',
      qualifications: '',
      salaryRange: '',
      location: '',
      urgency: 'normal'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
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
            <span className="section-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 10 10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              AI-Powered
            </span>
            <h1 className="section-title" style={{ fontSize: '48px' }}>Smart CV Screening</h1>
            <p className="section-subtitle">
              AI analyzes resumes, matches candidates to jobs, and provides actionable insights in seconds.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="section">
        <div className="container">
          <div className="cv-steps">
            <div className={`cv-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-circle">1</div>
              <span>Upload CV{multiMode ? 's' : ''}</span>
            </div>
            <div className="step-line"></div>
            <div className={`cv-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-circle">2</div>
              <span>Job Requirements</span>
            </div>
            <div className="step-line"></div>
            <div className={`cv-step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <span>AI Analysis</span>
            </div>
          </div>

          {step === 1 && (
            <div className="cv-upload-section">
              <div className="cv-upload-card">
                <div className="upload-mode-toggle">
                  <button 
                    className={`mode-btn ${!multiMode ? 'active' : ''}`}
                    onClick={() => setMultiMode(false)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Single CV
                  </button>
                  <button 
                    className={`mode-btn ${multiMode ? 'active' : ''}`}
                    onClick={() => setMultiMode(true)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                    </svg>
                    Batch Mode ({candidates.length})
                  </button>
                </div>

                <h3>
                  {multiMode ? 'Upload Multiple CVs' : 'Upload Candidate CV/Resume'}
                </h3>
                <p>Supported: PDF, DOC, DOCX, TXT • Max 5MB each</p>
                
                <div 
                  className={`upload-zone ${dragActive ? 'drag-active' : ''} ${uploadedFile || candidates.length > 0 ? 'has-file' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                  
                  {!multiMode && uploadedFile ? (
                    <div className="file-preview">
                      <div className="file-icon">📄</div>
                      <div className="file-info">
                        <span className="file-name">{uploadedFile.name}</span>
                        <span className="file-size">{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <button className="remove-file" onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}>
                        ✕
                      </button>
                    </div>
                  ) : multiMode ? (
                    <div className="multi-upload-area">
                      {candidates.length > 0 ? (
                        <div className="candidate-list">
                          {candidates.map((c, idx) => (
                            <div key={c.id} className="candidate-chip">
                              <span className="chip-num">{idx + 1}</span>
                              <span className="chip-name">{c.name}</span>
                              <button onClick={(e) => {
                                e.stopPropagation();
                                setCandidates(prev => prev.filter(x => x.id !== c.id));
                              }}>✕</button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <div className="upload-icon">📁</div>
                          <p className="upload-text">
                            Drag & drop CVs here or <span>browse</span>
                          </p>
                          <p className="upload-hint">Upload multiple resumes for comparison</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="upload-icon">📁</div>
                      <p className="upload-text">
                        Drag & drop your CV here or <span>browse</span>
                      </p>
                      <p className="upload-hint">Maximum file size: 5MB</p>
                    </>
                  )}
                </div>

                <div className="step-actions">
                  <button 
                    className="btn btn-primary btn-lg" 
                    onClick={() => (uploadedFile || candidates.length > 0) && setStep(2)}
                    disabled={multiMode ? candidates.length === 0 : !uploadedFile}
                  >
                    {multiMode ? `Analyze ${candidates.length} CVs` : 'Continue'}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="cv-features">
                <h3>What Our AI Analyzes</h3>
                <div className="feature-grid">
                  <div className="feature-item">
                    <span className="feature-icon">🎯</span>
                    <div>
                      <h4>Skills Match</h4>
                      <p>Keyword matching against requirements</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📊</span>
                    <div>
                      <h4>Experience Score</h4>
                      <p>Years & relevance analysis</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🎓</span>
                    <div>
                      <h4>Education</h4>
                      <p>Qualification verification</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🤖</span>
                    <div>
                      <h4>ATS Score</h4>
                      <p>Resume optimization check</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">⚡</span>
                    <div>
                      <h4>Culture Fit</h4>
                      <p>Soft skills assessment</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📈</span>
                    <div>
                      <h4>Growth Potential</h4>
                      <p>Career trajectory analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="cv-requirements-section">
              <div className="cv-requirements-card">
                <div className="ai-hint-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  AI will match candidate skills against these requirements
                </div>

                <h3>Job Requirements</h3>
                <p>Define criteria for accurate candidate matching</p>

                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select name="department" value={formData.department} onChange={handleChange}>
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering & Technology</option>
                      <option value="Marketing">Marketing & Sales</option>
                      <option value="Operations">Operations & Logistics</option>
                      <option value="HR">Human Resources</option>
                      <option value="Finance">Finance & Accounting</option>
                      <option value="Design">Design & Creative</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Required Skills (comma-separated)</label>
                  <textarea
                    name="requiredSkills"
                    value={formData.requiredSkills}
                    onChange={handleChange}
                    placeholder="e.g., JavaScript, React, Node.js, TypeScript, Git, AWS"
                    rows="2"
                  />
                  <span className="input-hint">AI will scan for these keywords in the CV</span>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Experience Required</label>
                    <select name="experience" value={formData.experience} onChange={handleChange}>
                      <option value="">Select Experience</option>
                      <option value="0">Fresher (0 years)</option>
                      <option value="1">1+ Years</option>
                      <option value="2">2+ Years</option>
                      <option value="3">3+ Years</option>
                      <option value="5">5+ Years</option>
                      <option value="7">7+ Years</option>
                      <option value="10">10+ Years</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Noida, Delhi NCR"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Salary Range</label>
                    <select name="salaryRange" value={formData.salaryRange} onChange={handleChange}>
                      <option value="">Select Range</option>
                      <option value="0-5">₹0 - 5 LPA</option>
                      <option value="5-10">₹5 - 10 LPA</option>
                      <option value="10-15">₹10 - 15 LPA</option>
                      <option value="15-25">₹15 - 25 LPA</option>
                      <option value="25+">₹25+ LPA</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Hiring Urgency</label>
                    <select name="urgency" value={formData.urgency} onChange={handleChange}>
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal</option>
                      <option value="high">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Additional Qualifications</label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="Any specific certifications, degrees, or requirements..."
                    rows="2"
                  />
                </div>

                <div className="step-actions">
                  <button className="btn btn-outline" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button 
                    className="btn btn-primary btn-lg" 
                    onClick={analyzeCV}
                    disabled={isAnalyzing || !formData.jobTitle}
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="spinner"></span>
                        Analyzing CV...
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {multiMode ? `Analyze ${candidates.length} Candidates` : 'Analyze CV'}
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="cv-tips-card">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  Tips for Best Results
                </h3>
                <ul>
                  <li>Be specific with skills (e.g., "React" not just "JavaScript")</li>
                  <li>List must-have skills first for better matching</li>
                  <li>Include experience level for accurate screening</li>
                  <li>Add certifications or tools for precise matching</li>
                </ul>
              </div>
            </div>
          )}

          {step === 3 && results && !results.multi && (
            <div className="cv-results-section">
              {isAnalyzing ? (
                <div className="analyzing-overlay">
                  <div className="analyzing-card">
                    <div className="ai-brain">
                      <div className="brain-ring"></div>
                      <div className="brain-ring delay-1"></div>
                      <div className="brain-ring delay-2"></div>
                      <span className="brain-icon">🤖</span>
                    </div>
                    <h3>Analyzing Resume...</h3>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${Math.min(analysisProgress, 100)}%` }}></div>
                    </div>
                    <p>{analysisProgress < 30 ? 'Extracting text and parsing resume...' : 
                         analysisProgress < 60 ? 'Matching skills against requirements...' :
                         analysisProgress < 90 ? 'Calculating compatibility scores...' : 'Finalizing analysis...'}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="results-header">
                    <div className="candidate-info">
                      <div className="candidate-avatar">
                        {results.candidateName?.charAt(0).toUpperCase() || 'C'}
                      </div>
                      <div>
                        <h2>{results.candidateName}</h2>
                        <p>AI Screened Candidate</p>
                      </div>
                    </div>
                    <div className="header-actions">
                      <button className="btn-icon" onClick={() => setAiChatOpen(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        Ask AI
                      </button>
                    </div>
                  </div>

                  <div className="main-score-display">
                    <div className="score-ring-container">
                      <svg className="score-ring" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#e2e8f0" strokeWidth="12"/>
                        <circle 
                          cx="100" cy="100" r="90" fill="none" 
                          stroke={getScoreColor(results.overallScore)}
                          strokeWidth="12"
                          strokeDasharray={`${results.overallScore * 5.65} 565`}
                          strokeLinecap="round"
                          transform="rotate(-90 100 100)"
                        />
                      </svg>
                      <div className="score-center">
                        <span className="score-number" style={{ color: getScoreColor(results.overallScore) }}>
                          {results.overallScore}%
                        </span>
                        <span className="score-label">Overall Match</span>
                      </div>
                    </div>
                    <div className="score-details">
                      <div 
                        className="recommendation-badge"
                        style={{ backgroundColor: results.recommendation.color }}
                      >
                        {results.recommendation.text}
                      </div>
                      <p className="summary-text">{results.summary}</p>
                    </div>
                  </div>

                  {results.redFlags && results.redFlags.length > 0 && (
                    <div className="red-flags-alert">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                      <div>
                        <strong>Red Flags Detected:</strong>
                        <ul>{results.redFlags.map((flag, i) => <li key={i}>{flag}</li>)}</ul>
                      </div>
                    </div>
                  )}

                  <div className="score-cards-grid">
                    <div className="score-card">
                      <div className="card-header">
                        <h4>Match Score</h4>
                        <span className="card-badge" style={{ color: getScoreColor(results.matchScore) }}>
                          {getScoreLabel(results.matchScore)}
                        </span>
                      </div>
                      <div className="mini-bar">
                        <div style={{ width: `${results.matchScore}%`, backgroundColor: getScoreColor(results.matchScore) }}></div>
                      </div>
                      <span className="card-value">{results.matchScore}%</span>
                      <p className="card-desc">Alignment with job requirements</p>
                    </div>

                    <div className="score-card">
                      <div className="card-header">
                        <h4>ATS Score</h4>
                        <span className="card-badge" style={{ color: getScoreColor(results.atsScore) }}>
                          {getScoreLabel(results.atsScore)}
                        </span>
                      </div>
                      <div className="mini-bar">
                        <div style={{ width: `${results.atsScore}%`, backgroundColor: getScoreColor(results.atsScore) }}></div>
                      </div>
                      <span className="card-value">{results.atsScore}%</span>
                      <p className="card-desc">Resume optimization for screening</p>
                    </div>

                    <div className="score-card">
                      <div className="card-header">
                        <h4>Culture Fit</h4>
                        <span className="card-badge" style={{ color: getScoreColor(results.cultureFit) }}>
                          {getScoreLabel(results.cultureFit)}
                        </span>
                      </div>
                      <div className="mini-bar">
                        <div style={{ width: `${results.cultureFit}%`, backgroundColor: getScoreColor(results.cultureFit) }}></div>
                      </div>
                      <span className="card-value">{results.cultureFit}%</span>
                      <p className="card-desc">Soft skills & potential</p>
                    </div>

                    <div className="score-card">
                      <div className="card-header">
                        <h4>Growth Potential</h4>
                        <span className="card-badge" style={{ color: getScoreColor(results.growthPotential) }}>
                          {getScoreLabel(results.growthPotential)}
                        </span>
                      </div>
                      <div className="mini-bar">
                        <div style={{ width: `${results.growthPotential}%`, backgroundColor: getScoreColor(results.growthPotential) }}></div>
                      </div>
                      <span className="card-value">{results.growthPotential}%</span>
                      <p className="card-desc">Career trajectory</p>
                    </div>
                  </div>

                  <div className="detailed-analysis">
                    <div className="analysis-section">
                      <h3>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        Skills Analysis
                      </h3>
                      <div className="skills-breakdown">
                        {results.skillScores.map((skill, idx) => (
                          <div key={idx} className={`skill-item ${!skill.found ? 'missing' : ''}`}>
                            <div className="skill-info">
                              <span className="skill-name">{skill.skill}</span>
                              <span className="skill-occurrences">
                                {skill.occurrences}x mentioned
                              </span>
                            </div>
                            <div className="skill-score-bar">
                              <div 
                                className="skill-fill" 
                                style={{ 
                                  width: `${skill.score}%`,
                                  backgroundColor: skill.found ? getScoreColor(skill.score) : '#ef4444'
                                }}
                              ></div>
                            </div>
                            <span className="skill-value" style={{ color: skill.found ? getScoreColor(skill.score) : '#ef4444' }}>
                              {skill.score}%
                            </span>
                            {!skill.found && <span className="missing-tag">Not Found</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="analysis-section">
                      <h3>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                        Experience
                      </h3>
                      <div className="experience-grid">
                        <div className="exp-stat">
                          <span className="exp-value">{results.experience.total} Years</span>
                          <span className="exp-label">Total Experience</span>
                        </div>
                        <div className="exp-stat">
                          <span className="exp-value">{results.experience.relevant} Years</span>
                          <span className="exp-label">Relevant</span>
                        </div>
                        <div className="exp-stat">
                          <span className="exp-value">{results.experience.requirement}+ Years</span>
                          <span className="exp-label">Required</span>
                        </div>
                        <div className={`exp-status ${results.experience.matches ? 'pass' : 'fail'}`}>
                          {results.experience.matches ? '✓ Meets' : '⚠ Below'} Requirement
                        </div>
                      </div>
                    </div>

                    <div className="analysis-section">
                      <h3>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                        </svg>
                        Education
                      </h3>
                      <div className="education-info">
                        <div className="edu-main">
                          <span className="edu-degree">{results.education.level}</span>
                          <span className="edu-field">{results.education.field}</span>
                        </div>
                        <div className={`edu-status ${results.education.matches ? 'pass' : 'warning'}`}>
                          {results.education.matches ? '✓ Verified' : '⚠ Review Needed'}
                          {results.education.verified && ' • Authenticated'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sw-section">
                    <div className="sw-card strengths">
                      <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Strengths
                      </h4>
                      <ul>
                        {results.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="sw-card weaknesses">
                      <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 8v4"/>
                          <path d="M12 16h.01"/>
                        </svg>
                        Areas for Improvement
                      </h4>
                      <ul>
                        {results.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="results-actions">
                    <button className="btn btn-outline" onClick={resetAnalysis}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                      </svg>
                      Screen Another
                    </button>
                    <button className="btn btn-secondary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download Report
                    </button>
                    <button className="btn btn-primary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                      </svg>
                      {results.recommendation.action}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 3 && results?.multi && (
            <div className="cv-results-section multi-results">
              <div className="multi-header">
                <h2>Batch Analysis Complete</h2>
                <p>{results.candidates.length} candidates analyzed and ranked</p>
              </div>

              <div className="top-candidate-card">
                <div className="top-badge">Top Match</div>
                <div className="candidate-avatar large">
                  {results.topCandidate?.candidateName?.charAt(0).toUpperCase()}
                </div>
                <h3>{results.topCandidate?.candidateName}</h3>
                <div className="top-score" style={{ color: getScoreColor(results.topCandidate?.overallScore) }}>
                  {results.topCandidate?.overallScore}%
                </div>
                <p>Overall Match Score</p>
              </div>

              <div className="candidates-ranking">
                <h3>Candidate Rankings</h3>
                {results.candidates.map((c, idx) => (
                  <div key={idx} className={`ranking-item ${idx === 0 ? 'top-ranked' : ''}`}>
                    <span className="rank-number">{idx + 1}</span>
                    <div className="rank-avatar">
                      {c.candidateName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="rank-info">
                      <span className="rank-name">{c.candidateName}</span>
                      <div className="rank-scores">
                        <span>Match: {c.matchScore}%</span>
                        <span>ATS: {c.atsScore}%</span>
                      </div>
                    </div>
                    <div className="rank-overall" style={{ color: getScoreColor(c.overallScore) }}>
                      {c.overallScore}%
                    </div>
                    <div className="rank-bar">
                      <div style={{ width: `${c.overallScore}%`, backgroundColor: getScoreColor(c.overallScore) }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="results-actions">
                <button className="btn btn-outline" onClick={resetAnalysis}>
                  Analyze More CVs
                </button>
                <button className="btn btn-primary">
                  View Top Candidate
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {aiChatOpen && (
        <div className="ai-chat-overlay" onClick={() => setAiChatOpen(false)}>
          <div className="ai-chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-chat-header">
              <div className="ai-avatar">🤖</div>
              <div className="ai-info">
                <h4>Screening Assistant</h4>
                <span className="ai-status">AI Powered</span>
              </div>
              <button className="ai-close" onClick={() => setAiChatOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="ai-chat-body">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`ai-message ${msg.sender}`}>
                  {msg.sender === 'ai' && <span className="msg-avatar">🤖</span>}
                  <div className="msg-content">{msg.text}</div>
                  {msg.sender === 'user' && <span className="msg-avatar">👤</span>}
                </div>
              ))}
            </div>
            <form className="ai-chat-footer" onSubmit={handleAISubmit}>
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask about candidate scores, ATS, etc..."
              />
              <button type="submit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .upload-mode-toggle {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .mode-btn {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;
        }

        .mode-btn.active {
          border-color: #667eea;
          background: #f0f4ff;
          color: #667eea;
        }

        .candidate-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .candidate-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f0f4ff;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 14px;
        }

        .chip-num {
          width: 20px;
          height: 20px;
          background: #667eea;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .candidate-chip button {
          background: none;
          border: none;
          cursor: pointer;
          color: #667eea;
          font-size: 14px;
        }

        .cv-features {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 32px;
          border-radius: 16px;
        }

        .cv-features h3 {
          margin-bottom: 24px;
          font-size: 20px;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .feature-item {
          display: flex;
          gap: 12px;
        }

        .feature-item .feature-icon {
          font-size: 28px;
        }

        .feature-item h4 {
          margin: 0 0 4px 0;
          font-size: 15px;
        }

        .feature-item p {
          margin: 0;
          font-size: 13px;
          opacity: 0.9;
        }

        .ai-hint-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f0f4ff;
          color: #667eea;
          padding: 10px 16px;
          border-radius: 20px;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .input-hint {
          font-size: 12px;
          color: #888;
          margin-top: 4px;
          display: block;
        }

        .cv-tips-card {
          background: #fffbeb;
          border: 1px solid #fcd34d;
          padding: 24px;
          border-radius: 12px;
        }

        .cv-tips-card h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b45309;
          margin-bottom: 16px;
        }

        .cv-tips-card ul {
          margin: 0;
          padding-left: 20px;
        }

        .cv-tips-card li {
          margin-bottom: 8px;
          color: #92400e;
          font-size: 14px;
        }

        .analyzing-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .analyzing-card {
          text-align: center;
          padding: 40px;
        }

        .ai-brain {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 24px;
        }

        .brain-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border: 3px solid #667eea;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .brain-ring.delay-1 { animation-delay: 0.3s; opacity: 0.7; }
        .brain-ring.delay-2 { animation-delay: 0.6s; opacity: 0.4; }

        .brain-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 40px;
        }

        @keyframes pulse {
          0% { width: 60%; height: 60%; opacity: 1; }
          100% { width: 100%; height: 100%; opacity: 0; }
        }

        .progress-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin: 20px 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 4px;
          transition: width 0.3s;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
        }

        .candidate-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .candidate-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: 600;
        }

        .candidate-avatar.large {
          width: 100px;
          height: 100px;
          font-size: 40px;
          margin: 0 auto 16px;
        }

        .btn-icon {
          padding: 10px 16px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .main-score-display {
          display: flex;
          gap: 40px;
          align-items: center;
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 24px;
        }

        .score-ring-container {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .score-ring {
          width: 100%;
          height: 100%;
        }

        .score-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .score-center .score-number {
          font-size: 48px;
          font-weight: 700;
          display: block;
        }

        .score-center .score-label {
          font-size: 14px;
          color: #666;
        }

        .score-details {
          flex: 1;
        }

        .recommendation-badge {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 20px;
          color: white;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .summary-text {
          color: #555;
          line-height: 1.7;
        }

        .red-flags-alert {
          display: flex;
          gap: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          color: #991b1b;
        }

        .red-flags-alert svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .red-flags-alert ul {
          margin: 8px 0 0 20px;
        }

        .score-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .score-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .card-header h4 {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        .card-badge {
          font-size: 12px;
          font-weight: 600;
        }

        .mini-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .mini-bar div {
          height: 100%;
          border-radius: 3px;
          transition: width 1s ease;
        }

        .card-value {
          font-size: 24px;
          font-weight: 700;
          display: block;
          margin-bottom: 4px;
        }

        .card-desc {
          font-size: 12px;
          color: #888;
          margin: 0;
        }

        .detailed-analysis {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        .analysis-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .analysis-section h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 20px 0;
          font-size: 16px;
          color: #333;
        }

        .skills-breakdown {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .skill-item.missing {
          opacity: 0.6;
        }

        .skill-info {
          width: 140px;
          flex-shrink: 0;
        }

        .skill-name {
          display: block;
          font-weight: 500;
          font-size: 14px;
        }

        .skill-occurrences {
          font-size: 11px;
          color: #888;
        }

        .skill-score-bar {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease;
        }

        .skill-value {
          width: 45px;
          text-align: right;
          font-weight: 600;
          font-size: 14px;
        }

        .missing-tag {
          font-size: 10px;
          background: #fef2f2;
          color: #ef4444;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .exp-stat {
          text-align: center;
        }

        .exp-value {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: #333;
        }

        .exp-label {
          font-size: 12px;
          color: #888;
        }

        .exp-status {
          grid-column: span 2;
          text-align: center;
          padding: 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
        }

        .exp-status.pass {
          background: #ecfdf5;
          color: #059669;
        }

        .exp-status.fail {
          background: #fef2f2;
          color: #dc2626;
        }

        .education-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .edu-main {
          display: flex;
          flex-direction: column;
        }

        .edu-degree {
          font-weight: 600;
          font-size: 16px;
        }

        .edu-field {
          color: #666;
          font-size: 14px;
        }

        .edu-status {
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          text-align: center;
        }

        .edu-status.pass {
          background: #ecfdf5;
          color: #059669;
        }

        .edu-status.warning {
          background: #fffbeb;
          color: #d97706;
        }

        .sw-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        .sw-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .sw-card h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px 0;
          font-size: 16px;
        }

        .strengths h4 { color: #059669; }
        .weaknesses h4 { color: #dc2626; }

        .sw-card ul {
          margin: 0;
          padding-left: 20px;
        }

        .sw-card li {
          margin-bottom: 8px;
          color: #555;
          font-size: 14px;
        }

        .results-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          padding: 24px;
          background: #f8fafc;
          border-radius: 12px;
        }

        .results-actions .btn {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .multi-results {
          max-width: 900px;
          margin: 0 auto;
        }

        .multi-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .multi-header h2 {
          margin: 0 0 8px 0;
        }

        .multi-header p {
          color: #666;
        }

        .top-candidate-card {
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          border-radius: 16px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }

        .top-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255,255,255,0.2);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
        }

        .top-candidate-card h3 {
          margin: 16px 0 8px;
          font-size: 24px;
        }

        .top-score {
          font-size: 64px;
          font-weight: 700;
        }

        .top-candidate-card p {
          margin: 0;
          opacity: 0.9;
        }

        .candidates-ranking {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .candidates-ranking h3 {
          margin: 0 0 20px 0;
        }

        .ranking-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 10px;
          margin-bottom: 12px;
          background: #f8fafc;
          position: relative;
        }

        .ranking-item.top-ranked {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 2px solid #10b981;
        }

        .rank-number {
          width: 30px;
          height: 30px;
          background: #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .ranking-item.top-ranked .rank-number {
          background: #10b981;
          color: white;
        }

        .rank-avatar {
          width: 40px;
          height: 40px;
          background: #667eea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .rank-info {
          flex: 1;
        }

        .rank-name {
          display: block;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .rank-scores {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #666;
        }

        .rank-overall {
          font-size: 24px;
          font-weight: 700;
        }

        .rank-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #e2e8f0;
          border-radius: 0 0 10px 10px;
          overflow: hidden;
        }

        .rank-bar div {
          height: 100%;
          border-radius: 0 0 10px 10px;
        }

        .ai-chat-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 20px;
          z-index: 1000;
        }

        .ai-chat-modal {
          width: 380px;
          height: 500px;
          background: white;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .ai-chat-header {
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ai-avatar {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .ai-info {
          flex: 1;
        }

        .ai-info h4 {
          margin: 0;
          font-size: 16px;
        }

        .ai-status {
          font-size: 12px;
          opacity: 0.8;
        }

        .ai-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        .ai-chat-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ai-message {
          display: flex;
          gap: 8px;
          max-width: 85%;
        }

        .ai-message.ai { align-self: flex-start; }
        .ai-message.user { align-self: flex-end; flex-direction: row-reverse; }

        .msg-avatar {
          width: 28px;
          height: 28px;
          background: #f0f0f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .msg-content {
          background: #f0f0f0;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-line;
        }

        .ai-message.user .msg-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .ai-chat-footer {
          padding: 12px;
          border-top: 1px solid #eee;
          display: flex;
          gap: 8px;
        }

        .ai-chat-footer input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #ddd;
          border-radius: 20px;
          font-size: 14px;
        }

        .ai-chat-footer button {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 992px) {
          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .score-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .detailed-analysis {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .main-score-display {
            flex-direction: column;
            text-align: center;
          }
          .sw-section {
            grid-template-columns: 1fr;
          }
          .ai-chat-modal {
            width: 100%;
            height: 70vh;
            border-radius: 16px 16px 0 0;
            position: absolute;
            bottom: 0;
          }
          .results-actions {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
};

export default CVScreen;
