// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";

// const CandidateDetails = () => {
//   const { id } = useParams();

//   const [candidate, setCandidate] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCandidate();
//   }, [id]);

//   const fetchCandidate = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("No token found");
//         setLoading(false);
//         return;
//       }

//       const res = await fetch(
//         `http://localhost:5001/api/forms/candidate/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       console.log("CANDIDATE DETAILS:", data);

//       if (data.success) {
//         setCandidate(data.data);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusStyle = (status) => {
//     const s = status?.toLowerCase();

//     if (s === "hired") {
//       return {
//         background: "#dcfce7",
//         color: "#15803d",
//       };
//     }

//     if (s === "pending") {
//       return {
//         background: "#fef3c7",
//         color: "#b45309",
//       };
//     }

//     return {
//       background: "#fee2e2",
//       color: "#dc2626",
//     };
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <div style={styles.loader}></div>
//         <p>Loading candidate details...</p>
//       </div>
//     );
//   }

//   if (!candidate) {
//     return (
//       <div style={styles.loadingContainer}>
//         <p>No candidate found</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.wrapper}>
//       <Sidebar />

//       <div style={styles.main}>
//         {/* HEADER */}
//         <div style={styles.header}>
//           <div>
//             <h2 style={styles.title}>Candidate Profile</h2>

//             <p style={styles.subtitle}>
//               Complete application details & resume overview
//             </p>
//           </div>

//           <span
//             style={{
//               ...styles.status,
//               ...getStatusStyle(candidate.status),
//             }}
//           >
//             {candidate.status || "Pending"}
//           </span>
//         </div>

//         {/* PROFILE CARD */}
//         <div style={styles.card}>
//           {/* TOP SECTION */}
//           <div style={styles.topSection}>
//             <div style={styles.avatar}>
//               {candidate.fullName?.charAt(0).toUpperCase()}
//             </div>

//             <div>
//               <h2 style={styles.name}>
//                 {candidate.fullName}
//               </h2>

//               <p style={styles.email}>
//                 {candidate.email}
//               </p>
//             </div>
//           </div>

//           {/* DETAILS GRID */}
//           <div style={styles.grid}>
//             <div style={styles.infoCard}>
//               <span style={styles.label}>Phone</span>
//               <span style={styles.value}>
//                 {candidate.phone || "N/A"}
//               </span>
//             </div>

//             <div style={styles.infoCard}>
//               <span style={styles.label}>City</span>
//               <span style={styles.value}>
//                 {candidate.city || "N/A"}
//               </span>
//             </div>

//             <div style={styles.infoCard}>
//               <span style={styles.label}>Qualification</span>
//               <span style={styles.value}>
//                 {candidate.qualification || "N/A"}
//               </span>
//             </div>

//             <div style={styles.infoCard}>
//               <span style={styles.label}>Experience</span>
//               <span style={styles.value}>
//                 {candidate.experience} Years
//               </span>
//             </div>

//             <div style={styles.infoCard}>
//               <span style={styles.label}>Skills</span>
//               <span style={styles.value}>
//                 {candidate.skills || "N/A"}
//               </span>
//             </div>

//             <div style={styles.infoCard}>
//               <span style={styles.label}>Expected Salary</span>
//               <span style={styles.value}>
//                 ₹ {candidate.expectedSalary || "N/A"}
//               </span>
//             </div>

//             <div style={styles.infoCard}>
//               <span style={styles.label}>
//                 Preferred Location
//               </span>

//               <span style={styles.value}>
//                 {candidate.preferredLocation || "N/A"}
//               </span>
//             </div>

//             <div style={styles.infoCard}>
//               <span style={styles.label}>
//                 Current Company
//               </span>

//               <span style={styles.value}>
//                 {candidate.currentCompany || "N/A"}
//               </span>
//             </div>
//           </div>

//           {/* RESUME */}
//           <div style={styles.resumeBox}>
//             <div>
//               <h3 style={styles.resumeTitle}>
//                 Resume Attachment
//               </h3>

//               <p style={styles.resumeText}>
//                 View uploaded resume document
//               </p>
//             </div>

//             {candidate.resumeUrl ? (
//               <a
//                 href={`http://localhost:5001/${candidate.resumeUrl}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 style={styles.resumeBtn}
//               >
//                 View Resume
//               </a>
//             ) : (
//               <span style={styles.noResume}>
//                 Not Uploaded
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     display: "flex",
//     minHeight: "100vh",
//     background:
//       "linear-gradient(135deg, #f8fafc, #eef2ff, #fdf2f8)",
//     fontFamily: "'Inter', sans-serif",
//   },

//   main: {
//     marginLeft: 240,
//     padding: 30,
//     width: "100%",
//   },

//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 25,
//   },

//   title: {
//     fontSize: 32,
//     fontWeight: "700",
//     color: "#1e293b",
//     marginBottom: 8,
//   },

//   subtitle: {
//     color: "#64748b",
//     fontSize: 15,
//   },

//   card: {
//     background: "rgba(255,255,255,0.75)",
//     backdropFilter: "blur(10px)",
//     borderRadius: 28,
//     padding: 30,
//     boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
//     border: "1px solid rgba(255,255,255,0.5)",
//   },

//   topSection: {
//     display: "flex",
//     alignItems: "center",
//     gap: 20,
//     marginBottom: 30,
//     paddingBottom: 25,
//     borderBottom: "1px solid #e5e7eb",
//   },

//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: "50%",
//     background:
//       "linear-gradient(135deg, #818cf8, #ec4899)",
//     color: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: 32,
//     fontWeight: "700",
//     boxShadow: "0 8px 20px rgba(99,102,241,0.25)",
//   },

//   name: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 6,
//   },

//   email: {
//     color: "#64748b",
//     fontSize: 15,
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: 18,
//     marginBottom: 30,
//   },

//   infoCard: {
//     background: "#ffffff",
//     padding: 18,
//     borderRadius: 18,
//     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//     border: "1px solid #f1f5f9",
//     display: "flex",
//     flexDirection: "column",
//     gap: 8,
//   },

//   label: {
//     fontSize: 13,
//     color: "#64748b",
//     fontWeight: "600",
//   },

//   value: {
//     fontSize: 15,
//     color: "#111827",
//     fontWeight: "600",
//   },

//   status: {
//     padding: "10px 18px",
//     borderRadius: 999,
//     fontWeight: "700",
//     fontSize: 14,
//   },

//   resumeBox: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     background:
//       "linear-gradient(135deg, #eef2ff, #fdf2f8)",
//     padding: 22,
//     borderRadius: 20,
//     marginTop: 10,
//   },

//   resumeTitle: {
//     marginBottom: 6,
//     color: "#111827",
//   },

//   resumeText: {
//     color: "#64748b",
//     fontSize: 14,
//   },

//   resumeBtn: {
//     background:
//       "linear-gradient(135deg, #6366f1, #8b5cf6)",
//     color: "#fff",
//     padding: "12px 20px",
//     borderRadius: 12,
//     textDecoration: "none",
//     fontWeight: "600",
//     boxShadow: "0 6px 18px rgba(99,102,241,0.25)",
//   },

//   noResume: {
//     color: "#ef4444",
//     fontWeight: "600",
//   },

//   loadingContainer: {
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "#f8fafc",
//     color: "#475569",
//     gap: 15,
//     fontFamily: "'Inter', sans-serif",
//   },

//   loader: {
//     width: 45,
//     height: 45,
//     border: "4px solid #e2e8f0",
//     borderTop: "4px solid #6366f1",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//   },
// };

// export default CandidateDetails;