


import React, { useState } from "react";
import { Line } from "react-chartjs-2";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Table ,Button} from "react-bootstrap";
import { useSelector } from "react-redux";


function SiteReview() {
  // const siteReviews = [
  //   {
  //     siteName: "Site A",
  //     reviewDate: "Apr 20, 2025",
  //     reviewerName: "John Smith",
  //     complianceStatus: "Compliant",
  //   },
  //   {
  //     siteName: "Site B",
  //     reviewDate: "Apr 18, 2025",
  //     reviewerName: "Sarah Smith",
  //     complianceStatus: "Non-Compliant",
  //   },
  //   {
  //     siteName: "Site C",
  //     reviewDate: "Apr 19, 2025",
  //     reviewerName: "David Brown",
  //     complianceStatus: "Compliant",
  //   },
  // ];

  const { sitereview, loading, error } = useSelector((state) => state.sitereview);
  const [categories, setCategories] = useState({
    safety: {
      PPE_Compliance: false,
      Emergency_Exits: false,
      Fire_Safety: false,
    },
    cleanliness: {
      Waste_Management: false,
      Site_Organization: false,
      Material_Storage: false,
    },
    progress: {
      Timeline_Adherence: false,
      Quality_Standards: false,
      Resource_Allocation: false,
    },
    environmental: {
      Noise_Control: false,
      Dust_Management: false,
      Water_Conservation: false,
    },
  });

  const complianceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Compliance Rate",
        data: [85, 90, 88, 92, 87, 89, 91],
        backgroundColor: "#0052CC",
        borderColor: "#0052CC",
        borderWidth: 1,
      },
    ],
  };

  const safetyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Safety Reports",
        data: [150, 145, 142, 148, 155, 160, 158],
        borderColor: "#0052CC",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const handleCheckboxChange = (category, item) => {
    setCategories((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item],
      },
    }));
  };

  return (
    <div className="container-fluid p-4">
      {/* Quick Actions */}

      <div className="container">
        <h3 className="mb-4 font-bold text-3xl">Site Review</h3>

        <div className="d-flex justify-content-end">
          <Link to="/addSiteReview">
            <Button variant="primary" size="sm">
              <i className="fas fa-plus me-2 text-white"></i> New Site Review
            </Button>
          </Link>
        </div>

      
        <div className="mt-3 rounded-3">
          <Table striped bordered hover responsive className="shadow-sm ">
            <thead className="bg-light">
              <tr>
                <th>Site Name/Location</th>
                <th>Review Date & Time</th>
                <th>Reviewer Name</th>
                <th>Compliance Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { loading ? (
    <tr>
      <td colSpan="5" className="text-center py-3">Loading...</td>
    </tr>
  ) : 

sitereview.map((review, index) => (
  <tr key={index}>
    <td>{review.siteName}</td>
    <td>{review.reviewDate}</td>
    <td>{review.reviewerName}</td>
    <td>
      <span
        className={`badge ${
          review.complianceStatus === "Compliant"
            ? "bg-success"
            : "bg-danger"
        }`}
      >
        {review.complianceStatus}
      </span>
    </td>
    {/* <td>
      <Link to={`/editReview/${index}`}>
        <Button
          variant="outline-primary"
          size="sm"
          className="me-2"
          style={{ borderRadius: "20px" }}
        >
          Edit
        </Button>
      </Link>
      <Button
        variant="outline-danger"
        size="sm"
        style={{ borderRadius: "20px" }}
      >
        Delete
      </Button>
    </td> */}

    <td>
      <Link to={`/editReview/${index}`}>
        <button className="btn text-primary ">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </Link>

      <button className="btn text-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>
))
              }
            
            </tbody>
          </Table>
        </div>
      </div>

      {/* Insights Section */}
      <div className="row gy-4 mb-4">
        {/* Compliance Insights */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i
                  className="fas fa-chart-line me-2"
                  style={{ color: "#0052CC" }}
                ></i>
                Compliance Insights
              </h5>
              <p className="text-muted small">
                AI-generated insights from compliance data and KPIs
              </p>
              <div style={{ height: "200px" }}>
                <Line
                  data={complianceData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Safety Reports */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i
                  className="fas fa-hard-hat me-2"
                  style={{ color: "#0052CC" }}
                ></i>
                Safety Reports
              </h5>
              <p className="text-muted small">
                AI-generated summaries of safety reports and status indicators
              </p>
              <div style={{ height: "200px" }}>
                <Line
                  data={safetyData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Alerts */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i
                  className="fas fa-bell me-2"
                  style={{ color: "#0052CC" }}
                ></i>
                Real-Time Alerts
              </h5>
              <div className="alert alert-danger">
                <i className="fas fa-exclamation-circle me-2"></i>
                Critical Safety Warning
                <p className="small mb-0">Equipment malfunction in Sector 7</p>
              </div>
              <div className="alert alert-warning">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Moderate Security Alert
                <p className="small mb-0">
                  Unusual activity detected in Zone 8
                </p>
              </div>
              <div className="alert alert-success">
                <i className="fas fa-check-circle me-2"></i>
                Safe Site Condition
                <p className="small mb-0">All systems operating normally</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Review Categories */}
      <h5 className="d-flex align-items-center mb-3">
        <i className="fas fa-robot me-2"></i>
        AI Review Categories
      </h5>

      <div className="row gy-4">
        {/* Category Cards */}
        {[
          { title: "Safety Checklist", icon: "shield-alt", key: "safety" },
          { title: "Cleanliness", icon: "broom", key: "cleanliness" },
          { title: "Progress Report", icon: "tasks", key: "progress" },
          { title: "Environmental", icon: "leaf", key: "environmental" },
        ].map(({ title, icon, key }) => (
          <div className="col-md-6" key={key}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title d-flex align-items-center">
                  <i className={`fas fa-${icon} me-2`}></i>
                  {title}
                </h6>
                {Object.entries(categories[key]).map(([subKey, value]) => (
                  <div className="form-check" key={subKey}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={value}
                      onChange={() => handleCheckboxChange(key, subKey)}
                      id={`${key}-${subKey}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${key}-${subKey}`}
                    >
                      {subKey.replace("_", " ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SiteReview;
