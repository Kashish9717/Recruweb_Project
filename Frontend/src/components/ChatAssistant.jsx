import { useState, useRef, useEffect } from 'react';
import logo from '../../images/AiHrChatbot.jpg'; 

const FAQ_RESPONSES = {
  hello: ["Hello! Welcome to Recruweb. How can I assist you today?", "Hi there! I'm here to help with any questions about our HR solutions."],
  hi: ["Hello! Welcome to Recruweb. How can I assist you today?", "Hi there! I'm here to help with any questions about our HR solutions."],
  services: `At Recruweb, we offer comprehensive HR solutions including:

• Talent Acquisition & Recruitment
• Payroll Management  
• HRMS Solutions
• Training & Development
• HR Outsourcing
• Industry Manpower
• Facility Management

Would you like more details about any specific service?`,
  recruitment: `Our Recruitment Services include:

• End-to-end hiring solutions
• Executive search
• Bulk hiring
• Contract staffing
• Permanent placement

Contact us at info@recruweb.com or call +91 9336532636 for immediate assistance.`,
  payroll: `Our Payroll Management services cover:

• Salary processing
• Compliance management
• Statutory filings
• Employee benefits administration
• Leave management

We ensure accurate and timely payroll processing for your organization.`,
  hrms: `Our HRMS Solutions include:

• Employee database management
• Attendance tracking
• Performance management
• Leave management
• Self-service portal

Streamline your HR operations with our integrated solutions.`,
  training: `Our Training & Development programs offer:

• Leadership training
• Skill development
• Corporate training programs
• Employee onboarding
• Compliance training

Invest in your team's growth with Recruweb.`,
  outsourcing: `Our HR Outsourcing services help you:

• Reduce operational costs
• Focus on core business
• Access expert HR professionals
• Ensure compliance
• Improve efficiency

Outsource your HR functions to us and save time and resources.`,
  pricing: `Our pricing is flexible and based on your specific needs. We offer:

• Custom plans for startups
• Scalable solutions for growing businesses
• Enterprise packages for large organizations

Contact us for a customized quote!`,
  contact: `You can reach us at:

📧 Email: info@recruweb.com
📞 Phone: +91 9336532636
📍 Address: H-112, Sector 63, Noida, Uttar Pradesh

We're available Mon-Sat, 9:30 AM - 6:30 PM`,
  address: `Our office is located at:

📍 H-112, Sector 63, Noida
Nearby Electronic City Metro Station
Uttar Pradesh, India

Visit us during business hours (Mon-Sat, 9:30 AM - 6:30 PM)`,
  hours: `Business Hours:

📅 Monday - Friday: 9:30 AM - 6:30 PM
📅 Saturday: 9:30 AM - 6:30 PM
📅 Sunday: Closed

We're here to help during these hours!`,
  phone: `You can call us at: +91 9336532636

Our team is ready to assist you!`,
  email: `Email us at: info@recruweb.com

We respond to emails within 24 hours.`,
  about: `Recruweb Resources Pvt. Ltd. is a leading HR solutions provider. We specialize in:

• Innovative HR solutions
• Recruitment services
• Payroll management
• HR outsourcing

Transforming businesses through people since 2015.`,
  job: `Looking for a job? We can help!

• Browse open positions at /jobs
• Upload your resume for consideration
• Use our AI CV screening tool at /cv-screen
• Schedule an interview at /schedule-interview

What kind of role are you looking for?`,
  industry: `Our Industry Manpower services cover:

• Manufacturing workforce
• Construction labor
• Industrial staffing
• Pan-India coverage
• Workforce within 1 week

We provide skilled and unskilled workers across all sectors in India.`,
  default: `Thank you for your question! Here's how I can help:

For immediate assistance:
📞 Call: +91 9336532636
📧 Email: info@recruweb.com

Or visit our Contact page to send us a message. Our team typically responds within 24 hours.`
};

const getResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good morning') || msg.includes('good evening')) {
    return FAQ_RESPONSES.hello[Math.floor(Math.random() * FAQ_RESPONSES.hello.length)];
  }
  if (msg.includes('service') || msg.includes('what do you offer') || msg.includes('solutions')) {
    return FAQ_RESPONSES.services;
  }
  if (msg.includes('recruit') || msg.includes('hire') || msg.includes('hiring') || msg.includes('job') || msg.includes('jobs')) {
    return FAQ_RESPONSES.recruitment;
  }
  if (msg.includes('payroll') || msg.includes('salary')) {
    return FAQ_RESPONSES.payroll;
  }
  if (msg.includes('hrms') || msg.includes('human resource') || msg.includes('software')) {
    return FAQ_RESPONSES.hrms;
  }
  if (msg.includes('training') || msg.includes('develop') || msg.includes('learn')) {
    return FAQ_RESPONSES.training;
  }
  if (msg.includes('outsource') || msg.includes('outsourcing') || msg.includes('bpo')) {
    return FAQ_RESPONSES.outsourcing;
  }
  if (msg.includes('price') || msg.includes('cost') || msg.includes('quote') || msg.includes('budget')) {
    return FAQ_RESPONSES.pricing;
  }
  if (msg.includes('contact') || msg.includes('reach') || msg.includes('talk')) {
    return FAQ_RESPONSES.contact;
  }
  if (msg.includes('address') || msg.includes('location') || msg.includes('where') || msg.includes('office')) {
    return FAQ_RESPONSES.address;
  }
  if (msg.includes('hour') || msg.includes('time') || msg.includes('open') || msg.includes('available')) {
    return FAQ_RESPONSES.hours;
  }
  if (msg.includes('phone') || msg.includes('call') || msg.includes('mobile')) {
    return FAQ_RESPONSES.phone;
  }
  if (msg.includes('email') || msg.includes('mail')) {
    return FAQ_RESPONSES.email;
  }
  if (msg.includes('about') || msg.includes('company') || msg.includes('who are you')) {
    return FAQ_RESPONSES.about;
  }
  if (msg.includes('industry') || msg.includes('manufacturing') || msg.includes('industrial')) {
    return FAQ_RESPONSES.industry;
  }
  
  return FAQ_RESPONSES.default;
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your Recruweb AI Assistant. I can help you with:\n\n• Information about our HR services\n• Recruitment and hiring queries\n• Contact and office details\n• Pricing information\n• Job listings and applications\n\nHow can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const response = getResponse(userInput);
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'assistant',
        content: response
      }]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const regenerateResponse = () => {
    if (isLoading || messages.length < 2) return;

    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;

    setRegenerating(true);
    setIsLoading(true);

    setTimeout(() => {
      const response = getResponse(lastUserMessage.content);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastAssistantIndex = newMessages.length - 1;
        if (newMessages[lastAssistantIndex]?.role === 'assistant') {
          newMessages[lastAssistantIndex] = {
            ...newMessages[lastAssistantIndex],
            content: response
          };
        }
        return newMessages;
      });
      setIsLoading(false);
      setRegenerating(false);
    }, 1000 + Math.random() * 1000);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      role: 'assistant',
      content: "Hello! I'm your Recruweb AI Assistant. I can help you with:\n\n• Information about our HR services\n• Recruitment and hiring queries\n• Contact and office details\n• Pricing information\n• Job listings and applications\n\nHow can I assist you today?"
    }]);
  };

  const quickQuestions = [
    'What services do you offer?',
    'How can I contact you?',
    'Tell me about job openings',
    'What is your pricing?'
  ];

  return (
    <>
      {isOpen && (
        <div className="gpt-widget">
          <div className="gpt-container">
            <div className="gpt-sidebar">
              <button className="gpt-new-chat" onClick={clearChat}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                New Chat
              </button>
              <div className="gpt-chat-history">
                <div className="history-item active">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>Current Conversation</span>
                </div>
              </div>
              <div className="gpt-sidebar-footer">
                <div className="user-info">
                  <div className="user-avatar">U</div>
                  <span>Guest User</span>
                </div>
              </div>
            </div>

            <div className="gpt-main">
              <div className="gpt-header">
                <div className="gpt-header-left">
                  <div className="gpt-logo">
                    <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                      <defs>
                        <linearGradient id="gptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#667eea"/>
                          <stop offset="100%" stopColor="#764ba2"/>
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="48" fill="url(#gptGrad)"/>
                      <path d="M30 50 Q50 30 70 50 Q50 70 30 50" stroke="white" strokeWidth="4" fill="none"/>
                      <circle cx="50" cy="50" r="8" fill="white"/>
                    </svg>
                  </div>
                  <div className="gpt-header-info">
                    <h3>Recruweb AI</h3>
                    <span className="gpt-model">Powered by Advanced AI</span>
                  </div>
                </div>
                <button className="gpt-close" onClick={() => setIsOpen(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="gpt-messages">
                {messages.map((msg) => (
                  <div key={msg.id} className={`gpt-message ${msg.role}`}>
                    <div className="message-icon">
                     {msg.role === 'assistant' ? (
                      <img
                        src={logo}
                        alt="AI"
                        className="assistant-logo"
                      />
                    ) : (
                      <div className="user-icon">U</div>
                    )}
                    </div>
                    <div className="message-content">
                      <div className="message-text">{msg.content}</div>
                      {msg.role === 'assistant' && (
                        <div className="message-actions">
                          <button onClick={() => copyMessage(msg.content)} title="Copy">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                          </button>
                          <button onClick={regenerateResponse} title="Regenerate">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 4v6h6"/>
                              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="gpt-message assistant">
                    <div className="message-icon">
                      <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="48" fill="url(#gptGrad)"/>
                        <path d="M30 50 Q50 30 70 50 Q50 70 30 50" stroke="white" strokeWidth="4" fill="none"/>
                        <circle cx="50" cy="50" r="8" fill="white"/>
                      </svg>
                    </div>
                    <div className="message-content">
                      <div className="gpt-thinking">
                        <div className="thinking-dot"></div>
                        <div className="thinking-dot"></div>
                        <div className="thinking-dot"></div>
                      </div>
                    </div>
                  </div>
                )}

                {messages.length === 1 && !isLoading && (
                  <div className="gpt-suggestions">
                    <p>Suggested questions:</p>
                    <div className="suggestion-grid">
                      {quickQuestions.map((q, i) => (
                        <button key={i} onClick={() => setInput(q)}>
                          {q}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="gpt-input-area">
                <form onSubmit={handleSubmit} className="gpt-input-form">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Message Recruweb AI..."
                    rows="1"
                    disabled={isLoading}
                  />
                  <button type="submit" className="gpt-send" disabled={!input.trim() || isLoading}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="19" x2="12" y2="5"/>
                      <polyline points="5 12 12 5 19 12"/>
                    </svg>
                  </button>
                </form>
                <p className="gpt-disclaimer">Recruweb AI can make mistakes. Consider checking important information.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <button 
        className={`gpt-toggle ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <div className="gpt-toggle-content">
  <img
    src={logo}
    alt="Chat"
    className="toggle-logo"
  />
  <span className="gpt-badge">AI</span>
</div>
        )}
      </button>

      <style>{`
        .gpt-toggle {
  position: fixed;
  bottom: 24px;
  right: 28px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  z-index: 99999; /* IMPORTANT FIX */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}
        .logo-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.assistant-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.toggle-logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

        .gpt-toggle:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.5);
        }

        .gpt-toggle.open {
          background: #343541;
        }

        .gpt-toggle-content {
          position: relative;
        }

        .gpt-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #10b981;
          color: white;
          font-size: 9px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 8px;
        }

       .gpt-widget {
  position: fixed;
  inset: 0;
  z-index: 99998; /* just below toggle */
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}
        @keyframes gpt-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .gpt-container {
  width: 95%;
  height: 90vh;
  background: #343541;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

        @keyframes gpt-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .gpt-sidebar {
          width: 280px;
          background: #202123;
          padding: 16px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #343541;
        }

        .gpt-new-chat {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: 1px solid #343541;
          border-radius: 8px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          justify-content: center;
        }

        .gpt-new-chat:hover {
          background: #343541;
        }

        .gpt-chat-history {
          flex: 1;
          margin-top: 16px;
          overflow-y: auto;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #acacac;
          font-size: 14px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .history-item:hover {
          background: #343541;
          color: white;
        }

        .history-item.active {
          background: #343541;
          color: white;
        }

        .gpt-sidebar-footer {
          padding-top: 16px;
          border-top: 1px solid #343541;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          color: white;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .gpt-main {
          flex: 1;
          background: #343541;
          display: flex;
          flex-direction: column;
        }

        .gpt-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: #343541;
          border-bottom: 1px solid #4a4a5a;
        }

        .gpt-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .gpt-logo svg {
          display: block;
        }

        .gpt-header-info h3 {
          margin: 0;
          color: white;
          font-size: 18px;
          font-weight: 600;
        }

        .gpt-model {
          color: #acacac;
          font-size: 12px;
        }

        .gpt-close {
          background: transparent;
          border: none;
          color: #acacac;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .gpt-close:hover {
          background: #4a4a5a;
          color: white;
        }

        .gpt-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .gpt-messages::-webkit-scrollbar {
          width: 8px;
        }

        .gpt-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .gpt-messages::-webkit-scrollbar-thumb {
          background: #4a4a5a;
          border-radius: 4px;
        }

        .gpt-message {
          display: flex;
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }

        .gpt-message.user {
          background: #343541;
        }

        .gpt-message.assistant {
          background: #444654;
        }

        .gpt-message.user {
          padding: 16px 20px;
          border-radius: 12px;
        }

        .message-icon {
          flex-shrink: 0;
        }

        .user-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .message-content {
          flex: 1;
          min-width: 0;
        }

        .message-text {
          color: #ececf1;
          font-size: 15px;
          line-height: 1.6;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .message-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .gpt-message:hover .message-actions {
          opacity: 1;
        }

        .message-actions button {
          background: transparent;
          border: none;
          color: #acacac;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .message-actions button:hover {
          background: #4a4a5a;
          color: white;
        }

        .gpt-thinking {
          display: flex;
          gap: 6px;
          padding: 8px 0;
        }

        .thinking-dot {
          width: 8px;
          height: 8px;
          background: #acacac;
          border-radius: 50%;
          animation: thinking-bounce 1.4s infinite ease-in-out;
        }

        .thinking-dot:nth-child(1) { animation-delay: 0s; }
        .thinking-dot:nth-child(2) { animation-delay: 0.2s; }
        .thinking-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes thinking-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        .gpt-suggestions {
          text-align: center;
          padding: 20px;
          background: #444654;
          border-radius: 12px;
          max-width: 800px;
          margin: 0 auto;
        }

        .gpt-suggestions p {
          color: #acacac;
          margin: 0 0 16px 0;
          font-size: 14px;
        }

        .suggestion-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .suggestion-grid button {
          background: #3e3f4b;
          border: 1px solid #4a4a5a;
          border-radius: 8px;
          padding: 12px 16px;
          color: #ececf1;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .suggestion-grid button:hover {
          background: #4a4a5a;
          border-color: #667eea;
        }

        .gpt-input-area {
          padding: 16px 24px 24px;
          background: #343541;
        }

        .gpt-input-form {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          gap: 12px;
          align-items: flex-end;
        }

        .gpt-input-form textarea {
          flex: 1;
          background: #40414f;
          border: none;
          border-radius: 12px;
          padding: 14px 18px;
          color: white;
          font-size: 15px;
          resize: none;
          min-height: 52px;
          max-height: 200px;
          font-family: inherit;
          outline: none;
          transition: all 0.2s;
        }

        .gpt-input-form textarea:focus {
          box-shadow: 0 0 0 2px #667eea;
        }

        .gpt-input-form textarea::placeholder {
          color: #8a8a8a;
        }

        .gpt-send {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .gpt-send:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .gpt-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .gpt-disclaimer {
          text-align: center;
          color: #8a8a8a;
          font-size: 12px;
          margin-top: 12px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 900px) {
          .gpt-sidebar {
            display: none;
          }

          .gpt-container {
            max-width: 100%;
          }
        }

        @media (max-width: 600px) {
          .gpt-messages {
            padding: 16px;
          }

          .suggestion-grid {
            grid-template-columns: 1fr;
          }

          .gpt-message {
            gap: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default ChatAssistant;
