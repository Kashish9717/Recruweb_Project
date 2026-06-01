import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        // 🔥 IMPORTANT: token store
        localStorage.setItem("token", data.data.token);

        // redirect to dashboard
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f3f4f6",
  },

  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    width: 320,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#111827",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ddd",
    outline: "none",
  },

  button: {
    padding: 10,
    borderRadius: 6,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },

  error: {
    color: "red",
    fontSize: 12,
  },
};

export default Login;