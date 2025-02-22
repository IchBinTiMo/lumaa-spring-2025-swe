import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });

            localStorage.setItem("token", response.data.token);
            navigate("/tasks");
        } catch (error) {
            console.error("Login failed", error);

            setError(true);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>Wrong Email or Password</p>}
            <form onSubmit={handleLogin}>
                <div style={styles.keywordsContainer}>
                    <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div style={styles.keywordsContainer} >
                    <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                <button style={styles.button} type="submit">Login</button>
            </form>
            <div>Don't have an account? <a href="/register">Register</a></div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      maxWidth: "400px",
      margin: "0 auto",
      textAlign: "center" as const,
      color: "white",
    },
    keywordsContainer: {
      position: "relative",
      display: "block",
      marginBottom: "25px",
    },
    input: {
      padding: "10px 30px 10px 10px",
      fontSize: "16px",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "50px", // Rounded corners
      border: "2px solid #1DB954",
    },
    button: {
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "15px",
    },
}

export default Login;
