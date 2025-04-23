
import React, { useState } from "react";
const SuperadminSetting = () => {
  const [formData, setFormData] = useState({
    username: "Superadmin",
    email: "superadmin@example.com",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6 col-lg-5">
        <h2 className="text-center mb-4">Settings</h2>  
        <form className="bg-white p-4 rounded shadow-sm"  onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input  type="text"  name="username"  className="form-control"
              value={formData.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control"
              value={formData.email} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control"
              value={formData.password} onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">    
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperadminSetting;
 