import React, { useState } from "react";
import { Button } from "react-bootstrap";

const initialPlans = [
  {
    name: "Workdo",
    planName: "Silver",
    totalUsers: 15,
    totalCustomers: 50,
    totalSupervisors: 8,
    totalWorkers: 30,
    duration: "Yearly",
    date: "11 Feb 2025",
  },
  {
    name: "Workdo",
    planName: "Gold",
    totalUsers: 25,
    totalCustomers: 80,
    totalSupervisors: 12,
    totalWorkers: 50,
    duration: "Yearly",
    date: "11 Feb 2025",
  },
  {
    name: "Workdo",
    planName: "Diamond",
    totalUsers: 40,
    totalCustomers: 120,
    totalSupervisors: 20,
    totalWorkers: 100,
    duration: "Yearly",
    date: "11 Feb 2025",
  },
];

const PlanRequest = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  };

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* Header */}
      <header className="container-fluid bg-white shadow-sm p-3 rounded mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="input-group rounded search-bar">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search by name..."
                style={{ width: "200px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text bg-transparent border-0">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-md-end align-items-center mt-2 mt-md-0">
            <div className="me-4 fw-bold">Superadmin</div>
          </div>
        </div>
      </header>

      <h2 className="mb-4">Plan Requests</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan Name</th>
              <th>Total Users</th>
              <th>Total Customers</th>
              <th>Total Supervisors</th>
              <th>Total Workers</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.name}</td>
                <td>{plan.planName}</td>
                <td>{plan.totalUsers}</td>
                <td>{plan.totalCustomers}</td>
                <td>{plan.totalSupervisors}</td>
                <td>{plan.totalWorkers}</td>
                <td>{plan.duration}</td>
                <td>{plan.date}</td>
                <td>
                  <button className="btn fs-5 btn-sm me-1">
                    <i className="fa-solid fa-user-minus"></i>
                  </button>
                  <button
                    className="btn text-danger"
                    onClick={() => handleDelete(index)}>
                    <i className="fa-solid fa-trash fs-5"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPlans.length === 0 && (
          <p className="text-center text-muted">No matching results found.</p>
        )}
      </div>

      <div className="d-flex justify-content-end mt-3 mb-3">
        <Button size="sm" variant="outline-secondary" className="me-2">
          Previous
        </Button>
        <Button size="sm" variant="primary" className="ms-2">
          1
        </Button>
        <Button size="sm" variant="outline-secondary" className="ms-2">
          2
        </Button>
        <Button size="sm" variant="outline-secondary" className="ms-2">
          Next
        </Button>
      </div>
    </div>
  );
};

export default PlanRequest;
