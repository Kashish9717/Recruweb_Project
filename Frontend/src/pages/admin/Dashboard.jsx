import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const [candidateCount, setCandidateCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    fetchDashboard();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [candRes, clientRes] = await Promise.all([
        fetch("http://localhost:5001/api/forms/candidate", {
          headers,
        }),
        fetch("http://localhost:5001/api/forms/client", {
          headers,
        }),
      ]);

      const candData = await candRes.json();
      const clientData = await clientRes.json();

      setCandidateCount(candData?.data?.length || 0);
      setClientCount(clientData?.data?.length || 0);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.3); }
          50% { box-shadow: 0 0 40px rgba(99,102,241,0.6); }
        }
        .dashboard-stat-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .dashboard-stat-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 32px 60px rgba(15, 23, 42, 0.18) !important;
        }
        .micro-row-card {
          transition: all 0.2s ease;
        }
        .micro-row-card:hover {
          background-color: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          transform: translateX(4px);
        }
      `}</style>
      
      <Sidebar />

      <div 
        style={{
          ...styles.main,
          marginLeft: isMobile ? 0 : 260,
          padding: isMobile ? "24px 16px" : "40px",
        }}
      >
        {/* HEADER */}
        <div 
          style={{
            ...styles.header,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          <div>
            <p style={styles.kicker}>Recruitment CRM Platform</p>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <p style={styles.subtitle}>
              Monitor active candidates, manage hiring partners, and streamline 
              recruitment operational flows from one comprehensive core control pane.
            </p>
          </div>

          <div 
            style={{
              ...styles.welcomeCard,
              width: isMobile ? "100%" : "auto",
              boxSizing: "border-box"
            }}
          >
            <div style={styles.welcomeDot}></div>
            <div>
              <div style={styles.welcomeLabel}>System Active Account</div>
              <div style={styles.welcomeName}>Authenticated Admin</div>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div 
          style={{
            ...styles.grid,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(340px, 1fr))",
          }}
        >
          {/* Candidate Card */}
          <div
            className="dashboard-stat-card"
            style={{
              ...styles.card,
              ...styles.candidateCard,
            }}
            onClick={() => navigate("/admin/candidates")}
          >
            <div style={{ ...styles.glow, ...styles.candidateGlow }}></div>
            <div style={styles.cardPattern}></div>

            <div style={styles.cardTop}>
              <div style={{ ...styles.iconBox, ...styles.candidateIcon }}>👥</div>
              <div style={styles.arrowBox}>↗</div>
            </div>

            <h2 style={styles.cardTitle}>Talent Pool Pool</h2>
            <p style={styles.cardText}>
              Total matching profiles and professional profiles currently inside your core screening grid.
            </p>

            <div style={styles.countWrapper}>
              <span style={styles.count}>
                {loading ? <span style={styles.loadingDots}>...</span> : candidateCount}
              </span>
              <span style={styles.countLabel}>Profiles</span>
            </div>
          </div>

          {/* Client Card */}
          <div
            className="dashboard-stat-card"
            style={{
              ...styles.card,
              ...styles.clientCard,
            }}
            onClick={() => navigate("/admin/clients")}
          >
            <div style={{ ...styles.glow, ...styles.clientGlow }}></div>
            <div style={styles.cardPattern}></div>

            <div style={styles.cardTop}>
              <div style={{ ...styles.iconBox, ...styles.clientIcon }}>🏢</div>
              <div style={styles.arrowBox}>↗</div>
            </div>

            <h2 style={styles.cardTitle}>Corporate Partners</h2>
            <p style={styles.cardText}>
              Active business companies, commercial ventures, and active hiring managers.
            </p>

            <div style={styles.countWrapper}>
              <span style={styles.count}>
                {loading ? <span style={styles.loadingDots}>...</span> : clientCount}
              </span>
              <span style={styles.countLabel}>Accounts</span>
            </div>
          </div>
        </div>

        {/* OVERVIEW SECTION */}
        <div 
          style={{
            ...styles.overviewGrid,
            gridTemplateColumns: windowWidth < 1100 ? "1fr" : "2fr 1fr",
          }}
        >
          {/* Overview Card */}
          <div style={styles.overviewCard}>
            <div style={styles.overviewHeader}>
              <h3 style={styles.overviewTitle}>Core Metrics Overview</h3>
              <span style={styles.overviewBadge}>Live Stream</span>
            </div>

            <p style={styles.overviewText}>
              Track strategic onboarding activity, review open requirement logs, and balance pipeline allocation effectively. 
              Conversion indicators represent aggregate system velocity weights.
            </p>

            <div style={styles.statsRow}>
              <div style={styles.smallStat}>
                <div style={styles.statIconWrapper}>
                  <span style={styles.statIcon}>👥</span>
                </div>
                <div style={styles.statContent}>
                  <span style={styles.smallLabel}>Total Applicants</span>
                  <span style={styles.smallValue}>{candidateCount}</span>
                </div>
              </div>

              <div style={styles.smallStat}>
                <div style={styles.statIconWrapper}>
                  <span style={styles.statIcon}>🏢</span>
                </div>
                <div style={styles.statContent}>
                  <span style={styles.smallLabel}>Corporate Pipeline</span>
                  <span style={styles.smallValue}>{clientCount}</span>
                </div>
              </div>
              
              <div style={styles.smallStat}>
                <div style={styles.statIconWrapper}>
                  <span style={styles.statIcon}>📊</span>
                </div>
                <div style={styles.statContent}>
                  <span style={styles.smallLabel}>Partnership Yield</span>
                  <span style={styles.smallValue}>
                    {candidateCount > 0 ? Math.round((clientCount / candidateCount) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* System Integrity Services Status Card */}
          <div style={styles.activityCard}>
            <div style={styles.activityHeader}>
              <h3 style={styles.activityTitle}>Infrastructure</h3>
              <span style={styles.statusBadge}>All Clear</span>
            </div>

            <div style={styles.activityList}>
              <div className="micro-row-card" style={styles.activityItem}>
                <div style={{ ...styles.activityDot, ...styles.activeDot }}></div>
                <div style={styles.activityContent}>
                  <span style={styles.activityLabel}>Application Ingest API</span>
                  <span style={styles.activityStatus}>Online</span>
                </div>
              </div>

              <div className="micro-row-card" style={styles.activityItem}>
                <div style={{ ...styles.activityDot, ...styles.activeDot }}></div>
                <div style={styles.activityContent}>
                  <span style={styles.activityLabel}>Client Mandate Grid</span>
                  <span style={styles.activityStatus}>Online</span>
                </div>
              </div>

              <div className="micro-row-card" style={styles.activityItem}>
                <div style={{ ...styles.activityDot, ...styles.activeDot }}></div>
                <div style={styles.activityContent}>
                  <span style={styles.activityLabel}>Storage File Engine</span>
                  <span style={styles.activityStatus}>Operational</span>
                </div>
              </div>

              <div className="micro-row-card" style={styles.activityItem}>
                <div style={{ ...styles.activityDot, ...styles.activeDot }}></div>
                <div style={styles.activityContent}>
                  <span style={styles.activityLabel}>Secure Auth Gateway</span>
                  <span style={styles.activityStatus}>Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#eff6ff", // Bright premium slate blue
    backgroundImage: "linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
 marginLeft: -20, // Pulls the entire layout left to compensate for sidebar width, creating a seamless edge-to-edge feel
  },

  main: {
    flex: 1,
    minWidth: 0,
    boxSizing: "border-box",
    transition: "margin-left 0.3s ease",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 24,
    marginBottom: 40,
  },

  kicker: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#2563eb",
    marginBottom: 10,
    marginTop: "40px", // Pushed nicely down below headers
  },

  title: {
    fontSize: 42,
    fontWeight: "900",
    color: "#1e3a8a", // High-contrast premium deep navy
    margin: "0 0 16px 0",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },

  subtitle: {
    fontSize: 16,
    color: "#334155", // Clear visible layout
    lineHeight: 1.6,
    maxWidth: 720,
    margin: 0,
    fontWeight: "500",
  },

  welcomeCard: {
    background: "#ffffff",
    border: "2px solid #cbd5e1",
    padding: "16px 24px",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    gap: 14,
    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.05)",
    marginTop: "20px",
  },

  welcomeDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#16a34a",
    boxShadow: "0 0 12px rgba(22,163,74,0.6)",
    animation: "pulse 2s ease-in-out infinite",
  },

  welcomeLabel: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },

  welcomeName: {
    fontSize: 16,
    color: "#0f172a",
    fontWeight: "800",
  },

  grid: {
    display: "grid",
    gap: 28,
    marginBottom: 44,
  },

  card: {
    padding: 32,
    borderRadius: 28,
    color: "#ffffff",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 12px 35px rgba(15, 23, 42, 0.12)",
    boxSizing: "border-box",
  },

  candidateCard: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
    border: "1px solid #1d4ed8",
  },

  clientCard: {
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)",
    border: "1px solid #5b21b6",
  },

  glow: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: "50%",
    opacity: 0.4,
  },

  candidateGlow: {
    background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
  },

  clientGlow: {
    background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)",
  },

  cardPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
    zIndex: 2,
  },

  iconBox: {
    width: 68,
    height: 68,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  },

  arrowBox: {
    fontSize: 18,
    fontWeight: "800",
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  cardTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 10,
    position: "relative",
    zIndex: 2,
    letterSpacing: "-0.01em",
  },

  cardText: {
    fontSize: 14,
    lineHeight: 1.6,
    opacity: 0.9,
    marginBottom: 28,
    position: "relative",
    zIndex: 2,
    fontWeight: "400",
  },

  countWrapper: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    position: "relative",
    zIndex: 2,
  },

  count: {
    fontSize: 56,
    fontWeight: "900",
    lineHeight: 1,
    textShadow: "0 4px 15px rgba(0,0,0,0.15)",
  },

  loadingDots: {
    animation: "pulse 1.5s ease-in-out infinite",
  },

  countLabel: {
    fontSize: 14,
    fontWeight: "700",
    opacity: 0.9,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },

  overviewGrid: {
    display: "grid",
    gap: 28,
  },

  overviewCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 32,
    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
    border: "2px solid #cbd5e1",
    boxSizing: "border-box",
  },

  overviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  overviewTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.01em",
  },

  overviewBadge: {
    background: "#d1fae5",
    color: "#065f46",
    border: "1px solid #10b981",
    padding: "6px 14px",
    borderRadius: 10,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  overviewText: {
    color: "#475569",
    lineHeight: 1.6,
    fontSize: 14,
    marginBottom: 28,
    fontWeight: "500",
  },

  statsRow: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },

  smallStat: {
    flex: 1,
    minWidth: 200,
    backgroundColor: "#f8fafc",
    padding: "20px",
    borderRadius: 16,
    border: "1px solid #cbd5e1",
    display: "flex",
    alignItems: "center",
    gap: 14,
    boxSizing: "border-box",
  },

  statIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: "#e0e7ff",
    border: "1px solid #3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statIcon: {
    fontSize: 22,
  },

  statContent: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  smallLabel: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },

  smallValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a",
  },

  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 32,
    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
    border: "2px solid #cbd5e1",
    boxSizing: "border-box",
  },

  activityHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  activityTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },

  statusBadge: {
    background: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px",
    borderRadius: 12,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box",
  },

  activityDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    flexShrink: 0,
  },

  activeDot: {
    background: "#16a34a",
    boxShadow: "0 0 10px rgba(22,163,74,0.5)",
    animation: "pulse 2s ease-in-out infinite",
  },

  activityContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  activityLabel: {
    color: "#1e293b",
    fontWeight: "700",
    fontSize: 13,
  },

  activityStatus: {
    color: "#16a34a",
    fontWeight: "800",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
};

export default Dashboard;