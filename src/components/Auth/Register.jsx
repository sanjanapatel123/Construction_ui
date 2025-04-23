import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="auth-container">
      <main className="w-100 mt-5">
        <div className="signup-container">
          <h4 className="text-center mb-4">Create Account</h4>
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
              transition: "all 0.3s ease",
            }}
          >
            <i
              className="fab fa-google me-2"
              style={{
                fontSize: "18px",
                color: "#4285F4",
              }}
            />
            Continue with Google
          </button>

          <div className="divider">
            <span>or</span>
          </div>
          <form>
            <div className="row g-3 mb-3">
              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First name"
                  />
                  <label htmlFor="firstName">First name</label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last name"
                  />
                  <label htmlFor="lastName">Last name</label>
                </div>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
              <div className="form-text mt-2">
                Password must be at least 8 characters long
              </div>
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" id="terms" />
              <label
                className="form-check-label text-secondary"
                htmlFor="terms"
              >
                I agree to the{" "}
                <a href="#" className="login-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="login-link">
                  Privacy Policy
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-signup mb-3"
              style={{ background: "#0e4966", color: "white", border: "none" }}
            >
              Create Account
            </button>
            <p className="text-center mb-0">
              <span className="text-secondary">Already have an account?</span>
              <Link to="/" className="signup-link ms-1">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
