import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function ToolboxTalks() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Attendance",
            data: [95, 97, 93, 96, 94, 95, 96],
            borderColor: "#007bff",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Compliance",
            data: [98, 97, 99, 97, 98, 100, 100],
            borderColor: "#28a745",
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 10,
              font: { size: 12 },
            },
          },
        },
        scales: {
          y: { beginAtZero: true, max: 100 },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  return (
    <div>
      <h3 className="mt-2 mb-0">Toolbox Talk</h3>
      <div
        className="container-fluid bg-light p-4"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* Top Stats */}
        <div className="row gx-3 gy-3 text-center mb-4">
          {[
            {
              title: "Upcoming Talks",
              value: 12,
              note: "Next talk in 2 hours",
            },
            {
              title: "Attendance Rate",
              value: "95%",
              note: "Last 30 days average",
              className: "text-success",
            },
            { title: "Pending Actions", value: 8, note: "Requires attention" },
            {
              title: "Compliance Status",
              value: "100%",
              note: "All requirements met",
              className: "text-success",
            },
          ].map((card, i) => (
            <div className="col-md-3" key={i}>
              <div className="bg-white p-3 rounded shadow-sm h-100 d-flex flex-column justify-content-center">
                <h6 className="text-muted">{card.title}</h6>
                <h2 className={card.className}>{card.value}</h2>
                <p className="text-muted mb-0">{card.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 bg-white p-4 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Toolbox Talks</h6>
              <Link to={"/AddToolboxTalks"}>
                {" "}
                <button id="btn_itp" className="btn btn-dark">
                  Create New Talk
                </button>
              </Link>
            </div>

            {/* Filters */}
            <div className="d-flex gap-2 flex-wrap mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search talks..."
                style={{ maxWidth: "200px" }}
              />
              <select className="form-select" style={{ maxWidth: "160px" }}>
                <option>All Projects</option>
              </select>
              <input
                type="date"
                className="form-control"
                style={{ maxWidth: "160px" }}
              />
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#scheduled"
                >
                  Scheduled Talks
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#completed"
                >
                  Completed Talks
                </button>
              </li>
            </ul>

            {/* Tab Content */}
          </div>
        </div>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="scheduled">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Date & Time</th>
                    <th>Assigned Team</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      topic: "Safe Working at Heights",
                      category: "Safety",
                      datetime: "2024-02-20 09:00 AM",
                      team: "Construction Team A",
                      participants: 15,
                      status: "Upcoming",
                      badge: "warning",
                    },
                    {
                      topic: "Equipment Safety Protocol",
                      category: "Equipment Use",
                      datetime: "2024-02-21 10:30 AM",
                      team: "Operation Team B",
                      participants: 12,
                      status: "In Progress",
                      badge: "info",
                    },
                    {
                      topic: "Site Compliance Update",
                      category: "Compliance",
                      datetime: "2024-02-22 02:00 PM",
                      team: "All Site Personnel",
                      participants: 25,
                      status: "Upcoming",
                      badge: "warning",
                    },
                  ].map((talk, idx) => (
                    <tr key={idx}>
                      <td>
                        {talk.topic}
                        <br />
                        <small className="text-muted">{talk.category}</small>
                      </td>
                      <td>{talk.datetime}</td>
                      <td>
                        {talk.team}
                        <br />
                        <small>{talk.participants} participants</small>
                      </td>
                      <td>
                        <span className={`badge bg-${talk.badge}`}>
                          {talk.status}
                        </span>
                      </td>
                      <td>
                        <a href="#" className="me-3 text-primery" title="Edit">
                          <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#" className="text-danger" title="Delete">
                          <i class="fa-solid fa-trash"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end mb-3">
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
          <div className="tab-pane fade" id="completed">
            <p className="text-muted">No completed talks yet.</p>
          </div>
        </div>
        {/* Main Grid: Left & Right */}
        <div className="row gx-3 gy-3 mb-4">
          <div className="col-md-8 d-flex flex-column gap-3">
            {/* Active Talk Section */}
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="mb-3">
                <button id="btn_itp" className="btn btn-dark me-2">
                  <i className="bi bi-record-circle me-1"></i> Start Recording
                </button>
                <button className="btn btn-outline-dark">
                  Take Attendance
                </button>
              </div>
              <div
                className="border rounded p-3 text-muted"
                style={{ height: "120px" }}
              >
                AI Transcription will appear here...
              </div>
            </div>

            {/* Analytics Section */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="mb-3">Analytics</h6>
              <div style={{ height: "200px" }}>
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-4 d-flex flex-column gap-3">
            {/* Recent Activity */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="mb-3">Recent Activity</h6>
              <div className="mb-3">
                <div className="fw-bold">Safety Equipment Review</div>
                <small>Completed with 15 participants</small>
                <br />
                <small className="text-muted">2 hours ago</small>
              </div>
              <div>
                <div className="fw-bold d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Emergency Procedures
                </div>
                <small>Updated and verified</small>
                <br />
                <small className="text-muted">5 hours ago</small>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="mb-3">Action Items</h6>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="action1"
                />
                <label
                  className="form-check-label d-flex justify-content-between w-100"
                  htmlFor="action1"
                >
                  <span>Update safety protocols</span>
                  <span className="text-muted">Due today</span>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="action2"
                />
                <label
                  className="form-check-label d-flex justify-content-between w-100"
                  htmlFor="action2"
                >
                  <span>Schedule equipment training</span>
                  <span className="text-muted">Tomorrow</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbox Talks Table */}
      </div>
    </div>
  );
}

export default ToolboxTalks;
