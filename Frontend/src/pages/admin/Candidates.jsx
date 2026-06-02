import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./Candidates.css"; // Importing high-performance compiled styles

const Candidates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5001/api/forms/candidate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (result.success) {
        setData(result.data || []);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id) => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }

      setDeletingId(id);
      const res = await fetch(
        `http://localhost:5001/api/forms/candidate/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (result.success) {
        setData((prev) => prev.filter((item) => item._id !== id));
        setShowDeleteConfirm(null);
      } else {
        alert(result.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="crm-dashboard-container">
      <Sidebar />

      <main className="crm-main-viewport">
        <div className="crm-content-bounds">
          
          {/* HEADER SECTION */}
          <div className="crm-view-header">
            <div>
              <p className="crm-kicker-text">Recruitment Dashboard</p>
              <h2 className="crm-primary-title">Candidates CRM</h2>
              <p className="crm-secondary-subtitle">
                Manage applications, review resumes, and track candidate status in one centralized platform.
              </p>
            </div>

            <div className="crm-metrics-badge">
              <span className="crm-badge-counter">{data.length}</span> Total Candidates
            </div>
          </div>

          {/* MAIN GRID MODULE */}
          <div className="crm-glass-card">
            {loading ? (
              <div className="crm-loading-wrapper">
                <div className="crm-radial-loader"></div>
                <p className="crm-loading-text">Loading secure candidate files...</p>
              </div>
            ) : (
              <div className="crm-table-scroller">
                <table className="crm-data-table">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Contact</th>
                      <th>Skills</th>
                      <th>Experience</th>
                      <th>Expected Salary</th>
                      <th>Resume</th>
                      <th>Status</th>
                      <th className="crm-text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length > 0 ? (
                      data.map((candidate) => (
                        <tr key={candidate._id} className="crm-table-row">
                          <td>
                            <div className="crm-profile-cell">
                              <div className="crm-avatar-sphere">
                                {candidate.fullName?.charAt(0).toUpperCase()}
                              </div>
                              <div className="crm-profile-meta">
                                <span className="crm-profile-name">{candidate.fullName}</span>
                                <span className="crm-profile-email">{candidate.email}</span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="crm-weight-bold">{candidate.phone || "N/A"}</span>
                          </td>

                          <td>
                            <div className="crm-skills-matrix">
                              {candidate.skills ? (
                                candidate.skills.split(",").map((skill, idx) => (
                                  <span key={idx} className="crm-skill-pill">
                                    {skill.trim()}
                                  </span>
                                ))
                              ) : (
                                <span className="crm-fallback-text">N/A</span>
                              )}
                            </div>
                          </td>

                          <td>
                            <span className="crm-weight-bold">
                              {candidate.experience ? `${candidate.experience} Yrs` : "N/A"}
                            </span>
                          </td>

                          <td>
                            <span className="crm-weight-bold crm-cyan-highlight">
                              {candidate.expectedSalary ? `₹ ${candidate.expectedSalary}` : "N/A"}
                            </span>
                          </td>

                          <td>
                            {candidate.resumeUrl ? (
                            <a
                              href={candidate.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="crm-action-link-btn"
                            >
                              📄 View Resume
                            </a>
                          ) : (
                            <span className="crm-fallback-text">N/A</span>
                          )}
                          </td>

                          <td>
                            <span 
                              className="crm-status-indicator" 
                              data-status={candidate.status?.toLowerCase() || "new"}
                            >
                              {candidate.status || "New"}
                            </span>
                          </td>

                          <td className="crm-text-right">
                            <button
                              className="crm-row-delete-btn"
                              onClick={() => setShowDeleteConfirm(candidate._id)}
                              disabled={deletingId === candidate._id}
                            >
                              {deletingId === candidate._id ? (
                                <div className="crm-micro-spinner"></div>
                              ) : (
                                "🗑️ Delete"
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">
                          <div className="crm-empty-state-card">
                            <div className="crm-empty-icon">👥</div>
                            <h4>No Active Applications</h4>
                            <p>New candidate submittals and matching database profiles will materialize here automatic-ally.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* PORTAL OVERLAY SYSTEM FOR SECURE REMOVAL */}
      {showDeleteConfirm && (
        <div className="crm-modal-backdrop">
          <div className="crm-modal-window">
            <div className="crm-modal-graphic">⚠️</div>
            <h3>Purge Application File?</h3>
            <p>
              Are you sure you want to permanently erase this applicant? All core parameters and referenced files will be dropped completely. This cannot be undone.
            </p>
            <div className="crm-modal-actions">
              <button 
                className="crm-modal-cancel" 
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel Operations
              </button>
              <button 
                className="crm-modal-confirm"
                onClick={() => deleteCandidate(showDeleteConfirm)}
                disabled={deletingId === showDeleteConfirm}
              >
                {deletingId === showDeleteConfirm ? "Purging File..." : "Confirm Deletion"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;