import { useEffect, useRef, useState } from "react";

const Sidebar = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState("");
  const ticking = useRef(false);

  useEffect(() => {
    if (!sections.length) return;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }

        ticking.current = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav style={styles.sidebar} aria-label="Section navigation">
      {sections.map((section) => {
        const label = section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ");
        const active = activeSection === section;

        return (
          <button
            key={section}
            type="button"
            onClick={() => scrollToSection(section)}
            style={{
              ...styles.dot,
              ...(active ? styles.dotActive : {}),
            }}
            aria-label={label}
            aria-current={active ? "true" : "false"}
            title={label}
          >
            <span
              style={{
                ...styles.tooltip,
                ...(active ? styles.tooltipVisible : {}),
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    zIndex: 1000,
    padding: 10,
    borderRadius: 999,
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.7)",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    backgroundColor: "rgba(99, 102, 241, 0.25)",
    border: "2px solid rgba(99, 102, 241, 0.45)",
    cursor: "pointer",
    transition: "all 0.25s ease",
    position: "relative",
    padding: 0,
    outline: "none",
  },

  dotActive: {
    backgroundColor: "#6366f1",
    border: "2px solid #6366f1",
    transform: "scale(1.15)",
    boxShadow: "0 0 0 6px rgba(99,102,241,0.12)",
  },

  tooltip: {
    position: "absolute",
    right: 24,
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#0f172a",
    color: "white",
    padding: "6px 10px",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    transformOrigin: "right center",
  },

  tooltipVisible: {
    opacity: 1,
    transform: "translateY(-50%) translateX(0)",
  },
};

export default Sidebar;