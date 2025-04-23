import React, { useState } from "react";
import { Button } from "react-bootstrap";
const initialPlans = [
  {
    companyName: "R-Tech Constructions",
    planName: "Basic Plan",
    activeProjects: 5,
    siteEngineers: 2,
    dailyVisits: 50,
    reports: "Unlimited",
    duration: "Yearly",
    date: "20 Apr 2025",
  },
  {
    companyName: "SkyBuild Infra",
    planName: "Standard Plan",
    activeProjects: 15,
    siteEngineers: 5,
    dailyVisits: 100,
    reports: "Unlimited",
    duration: "Yearly",
    date: "11 May 2025",
  },
  {
    companyName: "UrbanCraft Projects",
    planName: "Enterprise Plan",
    activeProjects: "Unlimited",
    siteEngineers: "Unlimited",
    dailyVisits: "Unlimited",
    reports: "Unlimited",
    duration: "Yearly",
    date: "1 Jun 2025",
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
    plan.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container p-4">
      <header className="container-fluid bg-white shadow-sm p-3 rounded mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="input-group rounded search-bar">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search by Company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "250px" }}
              />
              <span className="input-group-text bg-transparent border-0">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end align-items-center">
            <div className="me-4 fw-bold">Superadmin</div>
          </div>
        </div>
      </header>

      <div className="col-12">
        <h2 className="mb-3">Plan Requests</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Company</th>
              <th>Plan Name</th>
              <th>Active Projects</th>
              <th>Site Engineers</th>
              <th>Daily Site Visits</th>
              <th>Reports</th>
              <th>Duration</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.companyName}</td>
                <td>{plan.planName}</td>
                <td>{plan.activeProjects}</td>
                <td>{plan.siteEngineers}</td>
                <td>{plan.dailyVisits}</td>
                <td>{plan.reports}</td>
                <td>{plan.duration}</td>
                <td>{plan.date}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2">
                    Approve
                  </button>
                 
                  <button className="btn text-danger p-0"   onClick={() => handleDelete(index)}>
                      <i className="fa-solid fa-trash fs-5"></i>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPlans.length === 0 && (
          <p className="text-center text-muted">No matching requests found.</p>
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
