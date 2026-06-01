import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';

const availableSlots = [
  { date: '2026-04-15', time: ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
  { date: '2026-04-16', time: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] },
  { date: '2026-04-17', time: ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
  { date: '2026-04-18', time: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
  { date: '2026-04-20', time: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] },
  { date: '2026-04-21', time: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
  { date: '2026-04-22', time: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
];

const interviewQuestionsByRole = {
  'software': [
    'Tell me about your experience with object-oriented programming',
    'Describe a challenging bug you solved recently',
    'How do you approach code reviews?',
    'Explain your experience with version control',
    'What testing frameworks have you used?'
  ],
  'management': [
    'How do you handle underperforming team members?',
    'Describe your leadership style',
    'How do you prioritize multiple projects?',
    'Tell me about a time you resolved a conflict',
    'How do you motivate your team?'
  ],
  'marketing': [
    'What marketing tools are you proficient in?',
    'Describe a successful campaign you led',
    'How do you measure marketing ROI?',
    'What is your experience with digital marketing?',
    'How do you stay updated with market trends?'
  ],
  'sales': [
    'What is your sales methodology?',
    'Describe your biggest sale achievement',
    'How do you handle objections?',
    'What CRM tools have you used?',
    'How do you prospect new clients?'
  ],
  'design': [
    'Walk me through your design process',
    'What design tools are you proficient in?',
    'Describe a project you are proud of',
    'How do you handle feedback on your designs?',
    'What is your approach to user experience?'
  ],
  'hr': [
    'How do you handle sensitive employee information?',
    'Describe your experience with recruitment',
    'How do you stay updated with labor laws?',
    'Tell me about a difficult employee situation you resolved',
    'What HR software have you used?'
  ],
  'finance': [
    'What accounting software are you familiar with?',
    'How do you ensure accuracy in financial reporting?',
    'Describe your experience with budgeting',
    'How do you handle financial compliance?',
    'Tell me about a financial challenge you solved'
  ],
  'default': [
    'Tell me about yourself',
    'What are your greatest strengths?',
    'What are your career goals?',
    'Why are you interested in this role?',
    'Where do you see yourself in 5 years?'
  ]
};

const aiRecommendations = {
  '09:00 AM': { label: 'Excellent', reason: 'Morning freshness, interviewer attention is peak', icon: '🌟' },
  '10:00 AM': { label: 'Recommended', reason: 'Both parties well-caffeinated and alert', icon: '☕' },
  '11:00 AM': { label: 'Good', reason: 'Good energy levels, before lunch fatigue', icon: '👍' },
  '02:00 PM': { label: 'Good', reason: 'Post-lunch, demonstrates commitment', icon: '💪' },
  '03:00 PM': { label: 'Fair', reason: 'Mid-afternoon, stay sharp', icon: '⚡' },
  '04:00 PM': { label: 'Fair', reason: 'End of day, be concise', icon: '⏰' }
};

const ScheduleInterview = () => {
  const { jobId } = useParams();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('video');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: jobId ? `Job #${jobId}` : '',
    company: '',
    notes: '',
    experience: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', text: "Hi! I'm your AI scheduling assistant. I can help you find the best interview slot, suggest preparation tips, or answer any questions about the process. How can I help you today?" }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [smartRecommendations, setSmartRecommendations] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    if (formData.jobTitle) {
      generateAISuggestions(formData.jobTitle);
      generateInterviewQuestions(formData.jobTitle);
    }
  }, [formData.jobTitle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateAISuggestions = (jobTitle) => {
    const title = jobTitle.toLowerCase();
    let suggestions = [];

    if (title.includes('software') || title.includes('developer') || title.includes('engineer')) {
      suggestions = [
        'Technical interviews often prefer morning slots when cognitive abilities are peak',
        'Prepare to discuss specific project examples and problem-solving approaches',
        'Technical assessments may be included - practice coding problems'
      ];
    } else if (title.includes('manager') || title.includes('lead') || title.includes('director')) {
      suggestions = [
        'Leadership interviews value structured responses with real examples',
        'Prepare STAR format stories for behavioral questions',
        'Research the company culture and recent news'
      ];
    } else if (title.includes('sales') || title.includes('business')) {
      suggestions = [
        'Afternoon slots work well for sales roles when confidence peaks',
        'Prepare concrete numbers and achievements',
        'Research their product/service beforehand'
      ];
    } else if (title.includes('design') || title.includes('creative')) {
      suggestions = [
        'Portfolios are often reviewed - have your best work ready',
        'Morning slots show creative energy and freshness',
        'Prepare to explain your design decisions'
      ];
    } else {
      suggestions = [
        'Prepare 2-3 key achievements relevant to the role',
        'Research the company mission and values',
        'Prepare thoughtful questions for the interviewer'
      ];
    }

    setAiSuggestions(suggestions);
  };

  const generateInterviewQuestions = (jobTitle) => {
    const title = jobTitle.toLowerCase();
    let questions = interviewQuestionsByRole.default;

    for (const [key, qList] of Object.entries(interviewQuestionsByRole)) {
      if (title.includes(key) && key !== 'default') {
        questions = qList;
        break;
      }
    }

    setInterviewQuestions(questions);
  };

  const calculateSmartRecommendations = () => {
    const recommended = [];
    const hour = new Date().getHours();
    const isMorning = hour < 12;

    availableSlots.forEach(slot => {
      slot.time.forEach(time => {
        const rec = aiRecommendations[time];
        if (rec) {
          recommended.push({
            date: slot.date,
            time,
            ...rec
          });
        }
      });
    });

    recommended.sort((a, b) => {
      const order = ['🌟', '☕', '👍', '💪', '⚡', '⏰'];
      return order.indexOf(a.icon) - order.indexOf(b.icon);
    });

    setSmartRecommendations(recommended.slice(0, 5));
  };

  useEffect(() => {
    if (step === 2) {
      calculateSmartRecommendations();
    }
  }, [step]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setShowAIPanel(true);
  };

  const handleAISubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = { sender: 'user', text: aiInput };
    setAiMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      let response = "I'm here to help with your interview scheduling! You can ask me about:\n\n";
      response += "• Best times for your interview\n";
      response += "• Preparation tips for your role\n";
      response += "• What to expect in the interview\n";
      response += "• How to reschedule if needed";

      if (aiInput.toLowerCase().includes('time') || aiInput.toLowerCase().includes('slot')) {
        response = "Based on your job title, I recommend morning slots (9-11 AM) when both parties are most alert. I've already highlighted the best available slots for you!";
      } else if (aiInput.toLowerCase().includes('prepar') || aiInput.toLowerCase().includes('tip')) {
        response = aiSuggestions.length > 0 
          ? `Here are my top preparation tips:\n\n${aiSuggestions.map(s => '• ' + s).join('\n')}`
          : "Start by researching the company, preparing your resume highlights, and practicing common interview questions!";
      } else if (aiInput.toLowerCase().includes('question')) {
        response = interviewQuestions.length > 0
          ? `Here are likely interview questions for your role:\n\n${interviewQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
          : "Common questions include: Tell me about yourself, your strengths, and why you want this job.";
      }

      setAiMessages(prev => [...prev, { sender: 'ai', text: response }]);
    }, 500);

    setAiInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setSuccessMessage(`
      Interview Scheduled Successfully!
      
      Date: ${selectedDate}
      Time: ${selectedTime}
      Type: ${selectedType === 'video' ? 'Video Call' : 'Phone Call'}
      Timezone: ${formData.timezone}
      
      Confirmation sent to: ${formData.email}
      
      Our AI assistant will send you:
      • Interview preparation tips 24 hours before
      • Reminder 1 hour before the interview
      • Meeting link 15 minutes before
      
      Good luck with your interview!
    `);

    setStep(4);
    setIsSubmitting(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedType('video');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      jobTitle: '',
      company: '',
      notes: '',
      experience: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
    setSuccessMessage('');
    setShowAIPanel(false);
    setAiChatOpen(false);
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
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              AI-Powered Scheduling
            </span>
            <h1 className="section-title" style={{ fontSize: '52px' }}>Smart Interview Scheduler</h1>
            <p className="section-subtitle">
              Our AI analyzes your profile and suggests the best interview slots for maximum success.
            </p>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="schedule-container">
            <div className="schedule-progress">
              <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Your Details</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">AI Recommendations</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">Confirm & Book</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
                <span className="step-number">4</span>
                <span className="step-label">Confirmation</span>
              </div>
            </div>

            {step === 1 && (
              <div className="schedule-card">
                <div className="ai-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10"/>
                    <path d="M12 6v6l4 2"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  AI will analyze your profile
                </div>
                <h2>Enter Your Details</h2>
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Job Title / Position *</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="e.g., Software Engineer"
                        required
                      />
                      {formData.jobTitle && (
                        <span className="ai-hint">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 16v-4"/>
                            <path d="M12 8h.01"/>
                          </svg>
                          AI will generate personalized questions
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company you're interviewing with"
                      />
                    </div>
                    <div className="form-group">
                      <label>Years of Experience</label>
                      <select name="experience" value={formData.experience} onChange={handleChange}>
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 years (Freshers)</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      Your Timezone: 
                      <span className="timezone-display">{formData.timezone}</span>
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Get AI Recommendations
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="schedule-card">
                <div className="ai-analysis">
                  <h2>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 1 0 10 10"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    AI-Analyzed Recommendations
                  </h2>
                  <p className="step-info">Based on your profile, here are the best interview slots</p>
                </div>

                {smartRecommendations.length > 0 && (
                  <div className="ai-recommendations">
                    <h3>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      Top Picks For You
                    </h3>
                    <div className="recommendation-list">
                      {smartRecommendations.slice(0, 3).map((rec, idx) => (
                        <div key={idx} className="recommendation-item" onClick={() => {
                          handleDateSelect(rec.date);
                          setSelectedTime(rec.time);
                          setStep(3);
                        }}>
                          <span className="rec-icon">{rec.icon}</span>
                          <div className="rec-content">
                            <span className="rec-label">{rec.label}</span>
                            <span className="rec-slot">{formatDate(rec.date)} at {rec.time}</span>
                            <span className="rec-reason">{rec.reason}</span>
                          </div>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14"/>
                            <path d="m12 5 7 7-7 7"/>
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="date-grid">
                  <h3>Or Choose a Date</h3>
                  {availableSlots.map((slot) => (
                    <div
                      key={slot.date}
                      className={`date-card ${selectedDate === slot.date ? 'selected' : ''}`}
                      onClick={() => handleDateSelect(slot.date)}
                    >
                      <span className="date-day">{new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span className="date-num">{new Date(slot.date).getDate()}</span>
                      <span className="date-month">{new Date(slot.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    </div>
                  ))}
                </div>

                {aiSuggestions.length > 0 && (
                  <div className="ai-tips">
                    <h3>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                      </svg>
                      AI Preparation Tips
                    </h3>
                    <ul>
                      {aiSuggestions.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="form-actions">
                  <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" disabled={!selectedDate} onClick={() => setStep(3)}>
                    Continue to Time Selection
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="schedule-card">
                <h2>Select Time Slot</h2>
                <p className="step-info">
                  Selected Date: <strong>{formatDate(selectedDate)}</strong>
                </p>
                
                <div className="interview-type">
                  <label>Interview Type:</label>
                  <div className="type-options">
                    <div
                      className={`type-option ${selectedType === 'video' ? 'selected' : ''}`}
                      onClick={() => setSelectedType('video')}
                    >
                      <span className="type-icon">&#128249;</span>
                      <span>Video Call</span>
                    </div>
                    <div
                      className={`type-option ${selectedType === 'phone' ? 'selected' : ''}`}
                      onClick={() => setSelectedType('phone')}
                    >
                      <span className="type-icon">&#128222;</span>
                      <span>Phone Call</span>
                    </div>
                  </div>
                </div>

                <div className="time-grid">
                  {availableSlots.find(s => s.date === selectedDate)?.time.map((time) => {
                    const rec = aiRecommendations[time];
                    return (
                      <div
                        key={time}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''} ${rec?.icon === '🌟' ? 'recommended' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        <span className="time-text">{time}</span>
                        {rec && <span className="time-badge">{rec.icon} {rec.label}</span>}
                      </div>
                    );
                  })}
                </div>

                {interviewQuestions.length > 0 && (
                  <div className="ai-questions">
                    <h3>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                      </svg>
                      AI Predicts These Questions
                    </h3>
                    <div className="questions-list">
                      {interviewQuestions.slice(0, 3).map((q, idx) => (
                        <span key={idx} className="question-tag">{q}</span>
                      ))}
                      {interviewQuestions.length > 3 && (
                        <span className="question-more">+{interviewQuestions.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label>Additional Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any specific requirements or preferences..."
                    rows="3"
                  ></textarea>
                </div>

                <div className="booking-summary">
                  <h4>Booking Summary</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Candidate</span>
                      <span className="summary-value">{formData.fullName}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Position</span>
                      <span className="summary-value">{formData.jobTitle || 'Not specified'}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Date & Time</span>
                      <span className="summary-value">{formatDate(selectedDate)} at {selectedTime}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Format</span>
                      <span className="summary-value">{selectedType === 'video' ? 'Video Call' : 'Phone Call'}</span>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
                  <button className="btn btn-primary" disabled={!selectedTime || isSubmitting} onClick={handleSubmit}>
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner"></span>
                        Scheduling...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="schedule-card success-card">
                <div className="success-icon ai-success">🤖</div>
                <h2>Interview Scheduled!</h2>
                <div className="ai-confirmation">
                  <p>Your interview has been confirmed. Here's what happens next:</p>
                  <div className="ai-next-steps">
                    <div className="ai-step">
                      <span className="step-icon">📧</span>
                      <span>Confirmation email sent to {formData.email}</span>
                    </div>
                    <div className="ai-step">
                      <span className="step-icon">💡</span>
                      <span>AI will send preparation tips 24 hours before</span>
                    </div>
                    <div className="ai-step">
                      <span className="step-icon">⏰</span>
                      <span>Reminder 1 hour before the interview</span>
                    </div>
                    <div className="ai-step">
                      <span className="step-icon">🔗</span>
                      <span>Meeting link will be sent 15 min before</span>
                    </div>
                  </div>
                </div>
                <pre className="success-details">{successMessage}</pre>
                <div className="success-actions">
                  <button className="btn btn-secondary" onClick={resetForm}>Schedule Another</button>
                  <a href="/" className="btn btn-primary">Go to Home</a>
                </div>
              </div>
            )}

            <div className="schedule-info">
              <div className="info-card ai-card">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  AI Interview Assistant
                </h3>
                <p>Need help? Our AI can suggest:</p>
                <ul>
                  <li>Best interview times based on your role</li>
                  <li>Preparation tips and likely questions</li>
                  <li>What to expect in the interview</li>
                </ul>
                <button className="btn-ai-chat" onClick={() => setAiChatOpen(!aiChatOpen)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Chat with AI Assistant
                </button>
              </div>

              <div className="info-card">
                <h3>Interview Tips</h3>
                <ul>
                  <li><span className="icon">&#10003;</span> Prepare your resume and relevant documents</li>
                  <li><span className="icon">&#10003;</span> Test your camera and microphone before the call</li>
                  <li><span className="icon">&#10003;</span> Find a quiet, well-lit space for the interview</li>
                  <li><span className="icon">&#10003;</span> Join 5 minutes before the scheduled time</li>
                  <li><span className="icon">&#10003;</span> Dress professionally even for video interviews</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {aiChatOpen && (
        <div className="ai-chat-overlay" onClick={() => setAiChatOpen(false)}>
          <div className="ai-chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-chat-header">
              <div className="ai-avatar">🤖</div>
              <div className="ai-info">
                <h4>AI Interview Assistant</h4>
                <span className="ai-status">Online</span>
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
                placeholder="Ask me anything about your interview..."
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
        .ai-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .ai-analysis {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
        }

        .ai-analysis h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .ai-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #667eea;
          font-size: 12px;
          margin-top: 6px;
        }

        .timezone-display {
          margin-left: 8px;
          color: #666;
          font-weight: normal;
        }

        .ai-recommendations {
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .ai-recommendations h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          color: #333;
        }

        .recommendation-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .recommendation-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .recommendation-item:hover {
          border-color: #667eea;
          transform: translateX(4px);
        }

        .rec-icon {
          font-size: 24px;
        }

        .rec-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .rec-label {
          font-weight: 600;
          color: #667eea;
          font-size: 14px;
        }

        .rec-slot {
          font-size: 14px;
          color: #333;
        }

        .rec-reason {
          font-size: 12px;
          color: #666;
        }

        .ai-tips {
          background: #f0f4ff;
          border-radius: 12px;
          padding: 20px;
          margin: 24px 0;
        }

        .ai-tips h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #667eea;
        }

        .ai-tips ul {
          margin: 0;
          padding-left: 20px;
        }

        .ai-tips li {
          margin-bottom: 8px;
          color: #555;
        }

        .time-slot.recommended {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
        }

        .time-slot .time-badge {
          font-size: 10px;
          display: block;
          margin-top: 4px;
        }

        .ai-questions {
          background: #fff8e6;
          border-radius: 12px;
          padding: 20px;
          margin: 24px 0;
        }

        .ai-questions h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #d48806;
        }

        .questions-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .question-tag {
          background: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 13px;
          color: #666;
          border: 1px solid #ddd;
        }

        .question-more {
          padding: 8px 12px;
          font-size: 13px;
          color: #d48806;
          font-weight: 500;
        }

        .booking-summary {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin: 24px 0;
        }

        .booking-summary h4 {
          margin-bottom: 16px;
          color: #333;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .summary-label {
          font-size: 12px;
          color: #666;
        }

        .summary-value {
          font-weight: 500;
          color: #333;
        }

        .ai-success {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .ai-confirmation {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .ai-confirmation p {
          margin-bottom: 16px;
        }

        .ai-next-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ai-step {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .step-icon {
          font-size: 20px;
        }

        .ai-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .ai-card h3 {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ai-card ul {
          margin: 16px 0;
        }

        .ai-card li {
          color: rgba(255,255,255,0.9);
          margin-bottom: 8px;
        }

        .btn-ai-chat {
          width: 100%;
          padding: 12px;
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s;
        }

        .btn-ai-chat:hover {
          background: rgba(255,255,255,0.3);
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
          padding: 4px;
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

        .ai-message.ai {
          align-self: flex-start;
        }

        .ai-message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

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

        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .ai-chat-modal {
            width: 100%;
            height: 80vh;
            border-radius: 16px 16px 0 0;
            position: absolute;
            bottom: 0;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default ScheduleInterview;
