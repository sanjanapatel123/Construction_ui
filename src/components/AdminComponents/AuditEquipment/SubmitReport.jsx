import { color } from 'chart.js/helpers'
import React from 'react'
import { Link } from 'react-router-dom'

const SubmitReport = () => {
  return (
    <div>
      <div className="container">
  <div className='d-flex justify-content-between'>
    <div className="mt-4">
      <h2 className="text-start" style={{ }}>
        Security Audit Report
      </h2>
      <p className="text-start">
        Complete all sections to ensure compliance with safety regulations
      </p>
     
    </div>
    <div>
      <Link to="/audit-equipment">
      <butoon className="btn" style={{backgroundColor:"#0d6efd",color:"white"}}><i class="fa-solid fa-arrow-left me-2"></i>Back</butoon>
      </Link>
    </div>
  </div>
  <div className="mt-2 row g-4">
  <div className="col-md-3">
    <div className="shadow-lg rounded-3 p-3 bg-white h-100">
      Total Reports: <br />
      <strong>10</strong>
    </div>
  </div>
  <div className="col-md-3">
    <div className="shadow-lg rounded-3 p-3 bg-white h-100">
      Completed: <br />
      <strong>5</strong>
    </div>
  </div>
  <div className="col-md-3">
    <div className="shadow-lg rounded-3 p-3 bg-white h-100">
      Drafts: <br />
      <strong>3</strong>
    </div>
  </div>
  <div className="col-md-3">
    <div className="shadow-lg rounded-3 p-3 bg-white h-100">
      Overdue: <br />
      <strong>2</strong>
    </div>
  </div>
</div>
<div className='bg-white rounded-3 p-3 mt-5'>
  <div className="d-flex flex-wrap justify-content-between align-items-end mb-3 mt-2 gap-3 mb-5">
  <div className="d-flex flex-wrap gap-3 align-items-end">
    <div>
      <label className="form-label">Search</label>
      <input
        type="text"
        className="form-control"
        placeholder="Search reports"
        style={{ maxWidth: 300 }}
      />
    </div>
    <div>
      <label className="form-label">From</label>
      <input
        type="date"
        className="form-control"
        style={{ maxWidth: 200 }}
      />
    </div>
    <div>
      <label className="form-label">To</label>
      <input
        type="date"
        className="form-control"
        style={{ maxWidth: 200 }}
      />
    </div>
  </div>

  <div className="d-flex flex-wrap gap-3 align-items-end">
    <button className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
      New Report
    </button>
    <div>
      <label className="form-label d-block">Bulk Action</label>
      <select className="form-select" style={{ maxWidth: 150 }}>
        <option>Bulk Actions</option>
        <option>Action 1</option>
        <option>Action 2</option>
      </select>
    </div>
    <button className="btn btn-outline-secondary" style={{ whiteSpace: "nowrap" }}>
      Save Filter
    </button>
  </div>
</div>

<div className="table-responsive ">
  <table className="table table-striped table-bordered table-hover align-middle mb-0">
    <thead className="table-light">
      <tr>
        <th className="ps-4">Report ID</th>
        <th>Date</th>
        <th>Location/Site</th>
        <th>Audited By</th>
        <th>Status</th>
        <th>Last Updated</th>
        <th className="pe-4">Actions</th>
      </tr>
    </thead>
    <tbody>
      {[
        {
          id: "BSC-2025-0417",
          date: "2025-04-17",
          site: "Downtown Tower Project",
          auditor: "John Smith",
          status: "Completed",
          updated: "2025-04-17",
          badgeColor: "#28a745",
        },
        {
          id: "BSC-2025-0416",
          date: "2025-04-16",
          site: "Riverside Apartments",
          auditor: "Emma Johnson",
          status: "Draft",
          updated: "2025-04-16",
          badgeColor: "#007bff",
        },
        {
          id: "BSC-2025-0415",
          date: "2025-04-15",
          site: "Central Hospital Wing",
          auditor: "Michael Chen",
          status: "Completed",
          updated: "2025-04-15",
          badgeColor: "#28a745",
        },
        {
          id: "BSC-2025-0414",
          date: "2025-04-14",
          site: "Oakwood Office Complex",
          auditor: "Sarah Williams",
          status: "Completed",
          updated: "2025-04-14",
          badgeColor: "#28a745",
        },
        {
          id: "BSC-2025-0413",
          date: "2025-04-13",
          site: "Parkside Residential",
          auditor: "David Miller",
          status: "Draft",
          updated: "2025-04-13",
          badgeColor: "#007bff",
        },
      ].map((report, index) => (
        <tr key={index} className="bg-white">
          <td className="ps-4 py-3">{report.id}</td>
          <td className="py-3">{report.date}</td>
          <td className="py-3">{report.site}</td>
          <td className="py-3">{report.auditor}</td>
          <td className="py-3">
            <span
              style={{
                backgroundColor: report.badgeColor,
                color: "white",
                padding: "0.3rem 0.6rem",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
              }}
            >
              {report.status}
            </span>
          </td>
          <td className="py-3">{report.updated}</td>
          <td className="pe-4 py-3">
            <a href="#" className="text-info me-2 btn p-0">
              <i className="fa-solid fa-pen-to-square"></i>
            </a>
            <a href="#" className="text-danger btn p-0">
              <i className="fa-solid fa-trash"></i>
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  <div className="row mt-3">
    <div className="col-md-6">
      <p>Showing 1 to 10 of 10 result</p>
    </div>
    <div className="col-md-6">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              10
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>
</div>

    </div>
  )
}

export default SubmitReport
