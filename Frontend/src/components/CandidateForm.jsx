import { useState } from "react";
import axios from "../utils/axios";
import "./CandidateForm.css";

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

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (resume) {
        data.append("resume", resume);
      }

      await axios.post("/forms/candidate", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Candidate Profile Submitted Successfully 🎉");

      // RESET
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
      document.getElementById("resume-upload").value = "";

    } catch (error) {
      console.error(error);
      alert(error.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-form-container-wrapper">
      <div className="client-form-card">

        {/* HEADER */}
        <div className="client-form-header">
          <h2>Join Our Talent Pool</h2>
          <p>Submit your profile and get discovered by top companies</p>
        </div>

        <form onSubmit={handleSubmit} className="client-portal-form">

          {/* PERSONAL INFO */}
          <h3 className="client-section-title">Personal Info</h3>

          <div className="client-form-grid client-layout-double">

            <div className="client-form-group">
              <label>Full Name *</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                required
              />
            </div>

            <div className="client-form-group">
              <label>Email *</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="client-form-group">
              <label>Phone *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                required
              />
            </div>

            <div className="client-form-group">
              <label>City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Delhi"
              />
            </div>
          </div>

          {/* PROFESSIONAL INFO */}
          <h3 className="client-section-title">Professional Info</h3>

          <div className="client-form-grid client-layout-triple">

            <div className="client-form-group client-span-2">
              <label>Qualification</label>
              <input
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. B.Tech / MCA"
              />
            </div>

            <div className="client-form-group">
              <label>Experience</label>
              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 2 Years"
              />
            </div>

            <div className="client-form-group">
              <label>Expected Salary</label>
              <input
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                placeholder="e.g. 6 LPA"
              />
            </div>

            <div className="client-form-group">
              <label>Preferred Location</label>
              <input
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                placeholder="Remote / Delhi"
              />
            </div>
          </div>

          {/* SKILLS */}
          <div className="client-form-group client-full-width">
            <label>Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB..."
              rows="3"
            />
          </div>

          {/* CURRENT COMPANY */}
          <div className="client-form-group client-full-width">
            <label>Current Company</label>
            <input
              name="currentCompany"
              value={formData.currentCompany}
              onChange={handleChange}
              placeholder="e.g. Infosys"
            />
          </div>

          {/* RESUME */}
          <div className="client-form-group client-full-width">
            <label>Upload Resume *</label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>

          {/* BUTTON */}
          <button type="submit" disabled={loading} className="client-submit-btn">
            {loading ? <span className="client-spinner"></span> : "Submit Profile"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CandidateForm;