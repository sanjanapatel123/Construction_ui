import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // State for email, password, and selected role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

// Dummy credentials for different roles
const roleCredentials = {
  admin: { email: "admin@example.com", password: "admin123" },
  superadmin: { email: "superadmin@example.com", password: "superadmin123" },
  supervisor: { email: "supervisor@example.com", password: "manager123" },
  worker: { email: "worker@example.com", password: "employee123" },
};

  // Handle role selection and fill dummy credentials
  const handleRoleSelect = (role) => {
    const credentials = roleCredentials[role];
    setEmail(credentials.email);
    setPassword(credentials.password);
    setSelectedRole(role);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedRole) {
      localStorage.setItem("userRole", selectedRole);
      alert(`Logged in as ${selectedRole}`);
  
      // Navigate based on role
      if (selectedRole === "superadmin") {
        navigate("/super-admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Please select a role before logging in.");
    }
  };
  

  return (
    <div className="auth-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <main className="w-100" style={{ maxWidth: "450px" }}>
        <div className="login-container bg-white p-4 rounded shadow-sm">
          <h4 className="text-center mb-4">Welcome Back</h4>
          <button
            className="social-signup btn w-100 mb-3 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#ffffff",
              color: "#5F6368",
              border: "1px solid #dadce0",
              fontSize: "14px",
              fontWeight: "500",
              padding: "10px 0",
              borderRadius: "4px",
              transition: "all 0.3s ease", }}>
            <i className="fab fa-google me-2"
              style={{ fontSize: "18px",color: "#4285F4",}}/>
            Continue with Google </button>

          <div className="divider position-relative text-center my-4">
            <hr />
            <span className="position-absolute bg-white px-2" style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", }}>
              or
            </span>
          </div>                                  

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input  type="email"  className="form-control"
                id="email" placeholder="name@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required/>
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <div className="form-check">
                <input  className="form-check-input"
                  type="checkbox"
                  id="remember"/>
                <label
                  className="form-check-label text-secondary"
                  htmlFor="remember">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-decoration-none text-secondary">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="btn w-100 text-white"
              style={{
                backgroundColor: "#0e4966",
                padding: "10px",
                borderRadius: "5px",}}> Log In
            </button>
            <p className="text-center mt-3 mb-0">
              <span className="text-secondary">Don't have an account?</span>
              <Link to="/signup" className="text-decoration-none ms-1"
                style={{ color: "#0e4966" }}>
                Sign up
              </Link>
            </p>

            {/* Role Selection Buttons - 2x2 Grid */}
            <div className="row g-2 mt-3">
  {/* First Row */}
  <div className="col-12">
    <button type="button" className={`btn w-100 text-white ${  selectedRole === "admin" ? "border border-2 border-dark" : "" }`}
      style={{ backgroundColor: "#0e4966", fontWeight: 500 }}  onClick={() => handleRoleSelect("admin")} >
      Admin
    </button>
  </div>

  {/* Superadmin Button */}
  <div className="col-12">
    <button type="button" className={`btn w-100 text-white ${   selectedRole === "superadmin" ? "border border-2 border-dark" : ""
   }`} style={{ backgroundColor: "#0e4966", fontWeight: 500 }}  onClick={() => handleRoleSelect("superadmin")} >
      Superadmin
    </button>
  </div>

  {/* Supervisor */}
  <div className="col-6">
    <button  type="button"  className={`btn w-100 text-white ${
        selectedRole === "supervisor" ? "border border-2 border-dark" : ""
      }`}
      style={{ backgroundColor: "#0e4966", fontWeight: 500 }}
      onClick={() => handleRoleSelect("supervisor")}
    >
      Supervisor
    </button>
  </div>

  {/* Worker */}
  <div className="col-6">
    <button type="button" className={`btn w-100 text-white ${   selectedRole === "worker" ? "border border-2 border-dark" : ""
      }`}
      style={{ backgroundColor: "#0e4966", fontWeight: 500 }}
      onClick={() => handleRoleSelect("worker")}
    >
      Worker
    </button>
  </div>
</div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
