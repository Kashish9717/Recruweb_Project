import { useState } from "react";
import axios from "axios";
import "./CandidateForm.css"; // Importing separate custom CSS file

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    qualification: "",
    experience: "",
    skills: "",
    expectedSalary: "",
    preferredLocation: "",
    currentCompany: "",
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (resume) {
      data.append("resume", resume);
    }

    try {
      await axios.post("http://localhost:5001/api/forms/candidate", data);
      alert("Application Form Submitted Successfully!");
      
      // Reset state on success
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        qualification: "",
        experience: "",
        skills: "",
        expectedSalary: "",
        preferredLocation: "",
        currentCompany: "",
      });
      setResume(null);
      // Reset file input element manually
      document.getElementById("resume-upload").value = "";
    } catch (error) {
      console.error(error);
      alert("Error submitting application. Please try again.");
    } finally {
      loading(false);
    }
  };

  return (
    <div className="candidate-form-wrapper">
      <div className="candidate-card">
        
        <div className="candidate-header">
          <h2>Join Our Talent Pool</h2>
          <p>Submit your professional profile and resume to unlock matching opportunities.</p>
        </div>

        <form onSubmit={handleSubmit} className="candidate-portal-form">
          
          {/* Section: Basic Contact Info */}
          <h3 className="section-title">Personal Details</h3>
          <div className="form-grid layout-double">
            <div className="form-group span-2">
              <label>Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} placeholder="Jane Doe" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} placeholder="jane.doe@example.com" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} placeholder="+91 XXXXX XXXXX" onChange={handleChange} required />
            </div>
            <div className="form-group span-2">
              <label>Current City</label>
              <input type="text" name="city" value={formData.city} placeholder="e.g. New Delhi" onChange={handleChange} />
            </div>
          </div>

          {/* Section: Professional Experience */}
          <h3 className="section-title">Professional Background</h3>
          <div className="form-grid layout-double">
            <div className="form-group">
              <label>Highest Qualification</label>
              <input type="text" name="qualification" value={formData.qualification} placeholder="e.g. B.Tech / MCA" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Years of Experience</label>
              <input type="text" name="experience" value={formData.experience} placeholder="e.g. Fresher / 2 Years" onChange={handleChange} />
            </div>
            <div className="form-group span-2">
              <label>Key Skills</label>
              <input type="text" name="skills" value={formData.skills} placeholder="e.g. React, Node.js, JavaScript, MongoDB" onChange={handleChange} />
            </div>
            <div className="form-group span-2">
              <label>Current Company</label>
              <input type="text" name="currentCompany" value={formData.currentCompany} placeholder="Leave blank if fresher" onChange={handleChange} />
            </div>
          </div>

          {/* Section: Expectations */}
          <h3 className="section-title">Job Preferences</h3>
          <div className="form-grid layout-double">
            <div className="form-group">
              <label>Expected Salary</label>
              <input type="text" name="expectedSalary" value={formData.expectedSalary} placeholder="e.g. 6 LPA" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Preferred Work Location</label>
              <input type="text" name="preferredLocation" value={formData.preferredLocation} placeholder="e.g. Remote / Bangalore" onChange={handleChange} />
            </div>
          </div>

          {/* Section: Documents */}
          <h3 className="section-title">Documents</h3>
          <div className="form-group resume-upload-zone">
            <label htmlFor="resume-upload" className={`file-drop-area ${resume ? 'file-selected' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="upload-text">
                {resume ? resume.name : "Click to upload your Resume"}
              </span>
              <span className="upload-formats">Supported formats: PDF, DOC, DOCX</span>
            </label>
            <input id="resume-upload" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} className="hidden-file-input" />
          </div>

          <button type="submit" disabled={loading} className="submit-action-btn">
            {loading ? <span className="button-spinner"></span> : "Submit Application Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;