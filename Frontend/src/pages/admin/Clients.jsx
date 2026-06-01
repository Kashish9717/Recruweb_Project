import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [expandedJd, setExpandedJd] = useState({});

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    fetchClients();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5001/api/forms/client", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setClients(data.data || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      setDeletingId(clientId);
      const res = await fetch(`http://localhost:5001/api/forms/client/${clientId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setClients(clients.filter((c) => c._id !== clientId));
        setShowDeleteConfirm(null);
      } else {
        console.error("Delete failed:", data.message);
        alert("Failed to delete client: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Error deleting client");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleJd = (id) => {
    setExpandedJd(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "active") {
      return { 
        background: "#d1fae5", 
        color: "#065f46", 
        border: "2px solid #10b981" 
      };
    }
    if (s === "pending") {
      return { 
        background: "#fef3c7", 
        color: "#92400e", 
        border: "2px solid #f59e0b" 
      };
    }
    return { 
      background: "#e0e7ff", 
      color: "#3730a3", 
      border: "2px solid #6366f1" 
    };
  };

  const renderSkillTags = (skillsData) => {
    if (!skillsData) return <span style={styles.skillTag}>Not Specified</span>;
    const skillsArray = Array.isArray(skillsData) 
      ? skillsData 
      : skillsData.split(",").map(s => s.trim()).filter(Boolean);

    return skillsArray.map((skill, index) => (
      <span key={index} style={styles.skillTag}>{skill}</span>
    ));
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .premium-card {
          animation: fadeInUp 0.4s ease forwards;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .premium-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12) !important;
          border-color: #6366f1 !important;
        }
        .action-icon-btn {
          transition: all 0.2s ease;
        }
        .action-icon-btn:hover {
          background-color: #fee2e2 !important;
          color: #ef4444 !important;
          transform: scale(1.1);
        }
        .interactive-link {
          transition: all 0.2s ease;
        }
        .interactive-link:hover {
          background-color: #e2e8f0 !important;
          color: #0f172a !important;
          padding-left: 12px !important;
        }
        .jd-toggle-btn {
          background: #edd8ff;
          border: 1px solid #c084fc;
          color: #6b21a8;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          margin-top: 12px;
          borderRadius: 8px;
          transition: all 0.2s ease;
        }
        .jd-toggle-btn:hover {
          background: #faf5ff;
          color: #581c87;
        }
      `}</style>

      <Sidebar />

      <div
        style={{
          ...styles.main,
          marginLeft: isMobile ? 0 : 260,
          padding: isMobile ? "20px" : "40px",
        }}
      >
        {/* Header section with rich dark coloring */}
        <div
          style={{
            ...styles.header,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          <div>
            <h2 style={{ ...styles.title, fontSize: isMobile ? 32 : 42 }}>
              Client Ecosystem CRM
            </h2>
            <p style={styles.subtitle}>
              Monitor active corporate clients, incoming positions, package details, and joining requirements.
            </p>
          </div>

          <div
            style={{
              ...styles.clientCount,
              width: isMobile ? "100%" : "auto",
              marginTop: isMobile ? 16 : 0,
            }}
          >
            <span style={styles.countBadge}>{clients.length}</span> Total Corporate Clients
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loader}></div>
            <p style={{ fontWeight: "700", color: "#1e293b", fontSize: "16px" }}>
              Loading dashboard records...
            </p>
          </div>
        ) : (
          <div
            style={{
              ...styles.grid,
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(auto-fit, minmax(420px, 1fr))",
            }}
          >
            {clients.length === 0 ? (
              <div style={styles.emptyCard}>
                <div style={styles.emptyIcon}>🏢</div>
                <p style={{ fontSize: 22, fontWeight: "800", color: "#0f172a", marginTop: 16 }}>
                  No Active Clients Found
                </p>
                <p style={{ fontSize: 15, color: "#475569", marginTop: 8, maxWidth: 420, margin: "8px auto 0" }}>
                  Please fill out the client relation registration form to populate lists automatically.
                </p>
              </div>
            ) : (
              clients.map((c) => (
                <div key={c._id} className="premium-card" style={styles.card}>
                  <div>
                    {/* Upper Header Card Portion */}
                    <div style={styles.topSection}>
                      <div style={styles.avatar}>
                        {c.companyName?.charAt(0).toUpperCase() || "🏢"}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={styles.company} title={c.companyName}>
                          {c.companyName || "Unnamed Company"}
                        </h3>
                        <div style={styles.hrBadge}>
                          <span style={{ color: "#475569", fontWeight: "700" }}>Contact Person:</span>{" "}
                          <span style={{ fontWeight: "800", color: "#0f172a" }}>
                            {c.person || c.hrName || "Not Mentioned"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowDeleteConfirm(c._id)}
                        disabled={deletingId === c._id}
                        className="action-icon-btn"
                        style={styles.deleteButton}
                        title="Remove Client"
                      >
                        {deletingId === c._id ? (
                          <div style={styles.deleteLoader}></div>
                        ) : (
                          "🗑️"
                        )}
                      </button>
                    </div>

                    {/* Highly Legible Text Info Box Grid */}
                    <div
                      style={{
                        ...styles.details,
                        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(2, 1fr)",
                      }}
                    >
                      <div style={styles.infoBox}>
                        <span style={styles.label}>Hiring Role</span>
                        <span style={styles.value} title={c.jobRole || c.hiringRole}>
                          💼 {c.jobRole || c.hiringRole || "N/A"}
                        </span>
                      </div>

                      <div style={styles.infoBox}>
                        <span style={styles.label}>Openings</span>
                        <span style={{ ...styles.value, color: "#312e81", fontWeight: "800" }}>
                          🔢 {c.openings || 0} Positions
                        </span>
                      </div>

                      <div style={styles.infoBox}>
                        <span style={styles.label}>Experience</span>
                        <span style={styles.value}>⚡ {c.experience || "Freshers"}</span>
                      </div>

                      <div style={styles.infoBox}>
                        <span style={styles.label}>Job Location</span>
                        <span style={styles.value} title={c.location || c.jobLocation}>
                          📍 {c.location || c.jobLocation || "N/A"}
                        </span>
                      </div>

                      <div style={{...styles.infoBox, backgroundColor: "#ecfdf5", borderColor: "#a7f3d0"}}>
                        <span style={{...styles.label, color: "#047857"}}>Salary Package</span>
                        <span style={{ ...styles.value, color: "#065f46", fontWeight: "800" }}>
                          💰 ₹ {c.salary || c.salaryExpected || "Negotiable"}
                        </span>
                      </div>

                      <div style={styles.infoBox}>
                        <span style={styles.label}>Employment Type</span>
                        <span style={styles.value}>👔 {c.employmentType || "Full-time"}</span>
                      </div>

                      <div style={{ ...styles.infoBox, gridColumn: "1 / -1", backgroundColor: "#fff7ed", borderColor: "#ffedd5" }}>
                        <span style={{ ...styles.label, color: "#c2410c" }}>⏳ Joining Timeline</span>
                        <span style={{ ...styles.value, color: "#9a3412", fontWeight: "800", fontSize: "14px" }}>
                          ⏱️ {c.joiningTimeline || "Immediate"}
                        </span>
                      </div>
                    </div>

                    {/* Skills Badge Section */}
                    <div style={styles.skillsWrapper}>
                      <div style={styles.skillLabel}>Skills Required</div>
                      <div style={styles.skillsContainer}>
                        {renderSkillTags(c.skillsRequired)}
                      </div>
                    </div>

                    {/* Expandable JD Block */}
                    {(c.jd || c.jobDescription) && (
                      <div style={styles.jdSection}>
                        <button onClick={() => toggleJd(c._id)} className="jd-toggle-btn">
                          {expandedJd[c._id] ? "🔼 Close Job Description" : "📄 View Full JD"}
                        </button>
                        {expandedJd[c._id] && (
                          <div style={styles.jdContent}>
                            {c.jd || c.jobDescription}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Segment */}
                  <div style={{ marginTop: 24 }}>
                    <div style={styles.divider}></div>

                    <div
                      style={{
                        ...styles.footer,
                        flexDirection: windowWidth < 450 ? "column" : "row",
                        alignItems: windowWidth < 450 ? "flex-start" : "center",
                        gap: 16,
                      }}
                    >
                      <div style={styles.contactContainer}>
                        {c.email && (
                          <a
                            href={`mailto:${c.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="interactive-link"
                            style={styles.contactLink}
                            title={c.email}
                          >
                            ✉️ {c.email}
                          </a>
                        )}
                        {(c.phone || c.number) && (
                          <a
                            href={`tel:${c.phone || c.number}`}
                            onClick={(e) => e.stopPropagation()}
                            className="interactive-link"
                            style={styles.contactLink}
                          >
                            📞 {c.phone || c.number}
                          </a>
                        )}
                      </div>

                      <span
                        style={{
                          ...styles.status,
                          ...getStatusStyle(c.status),
                          width: windowWidth < 450 ? "100%" : "auto",
                          textAlign: "center",
                        }}
                      >
                        {c.status || "Active Partner"}
                      </span>
                    </div>
                  </div>

                  {/* High Contrast Confirmation Overlay */}
                  {showDeleteConfirm === c._id && (
                    <div style={styles.deleteModal}>
                      <div style={styles.deleteModalContent}>
                        <h4 style={styles.deleteModalTitle}>Remove Client?</h4>
                        <p style={styles.deleteModalText}>
                          Are you sure you want to delete <strong>{c.companyName}</strong>? This action will permanently wipe records.
                        </p>
                        <div style={styles.deleteModalButtons}>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            style={styles.cancelButton}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDeleteClient(c._id)}
                            disabled={deletingId === c._id}
                            style={styles.confirmDeleteButton}
                          >
                            {deletingId === c._id ? "Deleting..." : "Delete Permanently"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#eff6ff", // Bright, premium blue-tinted background
    backgroundImage: "linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
 
  },

  main: {
    width: "100%",
    boxSizing: "border-box",
    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    
    
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 40,
    marginTop: 40,
  },

  title: {
    fontWeight: "900",
    color: "#1e3a8a", // Strong deep blue heading
    letterSpacing: "-0.03em",
   margin: "80px 0 8px 0",
    lineHeight: 1.1,
    //  marginBottom: 50,
  },

  subtitle: {
    color: "#1e293b", // High visibility subtext color
    fontSize: 16,
    margin: 0,
    fontWeight: "600",
    maxWidth: 650,
    lineHeight: 1.5,
    
  },

  clientCount: {
    backgroundColor: "#1e3a8a",
    padding: "16px 28px",
    borderRadius: 16,
    fontWeight: "700",
    color: "#ffffff",
    boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.3)",
    boxSizing: "border-box",
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  countBadge: {
    color: "#60a5fa",
    fontWeight: "900",
    marginRight: 8,
    fontSize: 20,
  },

  grid: {
    display: "grid",
    gap: 28,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 28,
    border: "2px solid #cbd5e1", // Visible clean grid dividers
    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  },

  topSection: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 16,
    background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "800",
    boxShadow: "0 4px 14px rgba(30, 58, 138, 0.25)",
    flexShrink: 0,
  },

  company: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a", // Solid pure dark color
    margin: "0 0 4px 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  hrBadge: {
    fontSize: 14,
    color: "#334155",
  },

  deleteButton: {
    background: "#fee2e2",
    color: "#991b1b",
    border: "none",
    borderRadius: 10,
    width: 38,
    height: 38,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    flexShrink: 0,
  },

  deleteLoader: {
    width: 18,
    height: 18,
    border: "2px solid #fca5a5",
    borderTop: "2px solid #ef4444",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },

  details: {
    display: "grid",
    gap: 14,
    marginBottom: 24,
  },

  infoBox: {
    backgroundColor: "#f8fafc",
    padding: "14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1", // Crisper contrast boundaries
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
  },

  label: {
    fontSize: 11,
    color: "#475569", // Darker label typography
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },

  value: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a", // Maximum text contrast visibility
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  skillsWrapper: {
    marginBottom: 16,
  },

  skillLabel: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: 10,
  },

  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  skillTag: {
    display: "inline-block",
    backgroundColor: "#1e3a8a", // High-contrast solid dark tags
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "700",
  },

  jdSection: {
    marginBottom: 12,
  },

  jdContent: {
    marginTop: 10,
    backgroundColor: "#1e293b", // Highly legible dark block layout for detailed texts
    border: "1px solid #475569",
    borderRadius: 10,
    padding: 16,
    fontSize: 13,
    color: "#f8fafc",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    maxHeight: 180,
    overflowY: "auto",
  },

  divider: {
    height: "2px",
    backgroundColor: "#cbd5e1",
    width: "100%",
    marginBottom: 20,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
  },

  contactContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
    flex: 1,
  },

  contactLink: {
    fontSize: 13,
    color: "#1e3a8a",
    fontWeight: "700",
    textDecoration: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "6px 10px",
    borderRadius: 8,
    width: "fit-content",
    maxWidth: "100%",
    backgroundColor: "#f1f5f9",
  },

  status: {
    padding: "8px 18px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: "0.03em",
    boxSizing: "border-box",
    alignSelf: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  },

  loadingContainer: {
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  loader: {
    width: 44,
    height: 44,
    border: "4px solid #cbd5e1",
    borderTop: "4px solid #1e3a8a",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  emptyCard: {
    gridColumn: "1 / -1",
    backgroundColor: "#ffffff",
    border: "3px dashed #1e3a8a",
    padding: "60px 24px",
    borderRadius: 24,
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: 44,
  },

  deleteModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 42, 0.7)", // Higher opacity backdrop for dynamic focus
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backdropFilter: "blur(4px)",
  },

  deleteModalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    maxWidth: "85%",
    width: 320,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    textAlign: "center",
  },

  deleteModalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#991b1b",
    margin: "0 0 10px 0",
  },

  deleteModalText: {
    fontSize: 13,
    color: "#1e293b",
    margin: "0 0 20px 0",
    lineHeight: 1.5,
    fontWeight: "500",
  },

  deleteModalButtons: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },

  cancelButton: {
    padding: "10px 18px",
    borderRadius: 8,
    border: "2px solid #cbd5e1",
    backgroundColor: "#ffffff",
    color: "#334155",
    fontWeight: "700",
    fontSize: 13,
    cursor: "pointer",
  },

  confirmDeleteButton: {
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
    cursor: "pointer",
  },
};

export default Clients;