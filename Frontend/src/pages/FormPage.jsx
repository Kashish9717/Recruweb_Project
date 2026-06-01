import { useState } from "react";
import ClientForm from "../components/ClientForm";
import CandidateForm from "../components/CandidateForm";
import "./FormPage.css"; // Importing separate custom CSS file

const FormPage = () => {
  const [activeForm, setActiveForm] = useState("candidate");

  return (
    <div className="portal-page-wrapper">
      {/* Interactive Cyber Ambient Glow Rings */}
      <div className="portal-glow-field">
        <div className="portal-blob blob-blue"></div>
        <div className="portal-blob blob-purple"></div>
      </div>

      <div className="portal-container">
        
        {/* Navigation / Header Brand */}
        <header className="portal-header">
          <div className="brand-badge">Recruweb Workspace</div>
          <h1>Join Recruweb</h1>
          <p>Whether you're looking for your next career breakthrough or scaling your core team, we have you covered.</p>
        </header>

        {/* Dynamic Navigation Tabs Toggle Switch */}
        <div className="tab-switch-navigation">
          <div className="tabs-pill-container">
            <button
              className={`tab-toggle-btn ${activeForm === "candidate" ? "active-tab" : ""}`}
              onClick={() => setActiveForm("candidate")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Candidate Portal
              {activeForm === "candidate" && <span className="active-glow-indicator" />}
            </button>

            <button
              className={`tab-toggle-btn ${activeForm === "client" ? "active-tab" : ""}`}
              onClick={() => setActiveForm("client")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="tab-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Client Hiring Portal
              {activeForm === "client" && <span className="active-glow-indicator" />}
            </button>
          </div>
        </div>

        {/* Dynamic Form Render Container */}
        <main className="portal-content-view">
          {activeForm === "candidate" ? <CandidateForm /> : <ClientForm />}
        </main>

      </div>
    </div>
  );
};

export default FormPage;