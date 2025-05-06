import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { superadmindashboard } from "../../redux/slices/Superadmin/planPackageSlice";

const SuperAdminDashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById("analyticsChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "New Projects Initiated",
            data: [3, 4, 6, 8, 7, 9, 11],
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      chartRef.current.destroy();
    };
  }, []);

    const dispatch = useDispatch();
    const { Plans, dashboardData } = useSelector((state) => state.Plan);
    const stats = dashboardData?.data || {};
    useEffect(() => {
      dispatch(superadmindashboard());
    }, [dispatch]);
  
  return (
    <div>
      {/* Dashboard Cards */}
      <div className="container mt-4">
        {/* Header */}
        <header className="container-fluid bg-white shadow-sm p-3 rounded mb-4">
          <div className="row align-items-center">
            {/* Search Bar */}
            <div className="col-md-6">
              <div className="input-group rounded search-bar">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search..."
                  style={{ width: "200px" }}
                />
                <span className="input-group-text bg-transparent border-0">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>

            {/* User Profile & Logout */}
            <div className="col-md-6 d-flex justify-content-md-end align-items-center mt-2 mt-md-0">
              <div className="me-4 fw-bold">Construction Manager</div>
            </div>
          </div>
        </header>

        {/* Dashboard Summary Cards */}
        {/* <div className="row">
          {[
            { title: "Ongoing Projects", value: "12" },
            { title: "Completed Projects", value: "45" },
            { title: "Total Users", value: "25" },
            { title: "Total Revenue", value: "$120,000" },
          ].map((card, index) => (
            <div className="col-md-3 col-sm-6 col-12 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <h3>{card.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div className="row">
        {Object.entries(stats).map(([key, value], index) => (
      <div className="col-md-3 col-sm-6 col-12 mb-4" key={index}>
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">
              {key.replace(`/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()`)}
            </h5>
            <h3>{value}</h3>
          </div>
        </div>
      </div>
    ))}
  </div>
      </div>

      {/* Graph Analytics Section */}
      <div className="container mt-4">
        <h2>Project Analytics</h2>
        <div className="chart-container" style={{ height: "300px" }}>
          <canvas id="analyticsChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
