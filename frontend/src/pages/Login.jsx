import React from "react";
import { useState } from "react";
import styles from "./login.module.css";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom"; // For navigation
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Redirect user after login

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
        toast.success(data.message); // Show success message
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        toast.error(data.message); // Show error message
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }
  return (
    <>
      <div className={styles.form_container}>
        <form onSubmit={handleLogin} className={styles.login_form}>
          <div className={styles.logo_container}></div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.primary_btn}>
            Login
          </button>
          <Toaster position="bottom-right" richColors />
        </form>
      </div>
    </>
  );
}

export default Login;
