import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiUser, FiCheckCircle, FiDownload } from "react-icons/fi";
import { Button } from "react-bootstrap";

function Checklists() {
  return (
    <>
      <div
        className="container-fluid px-3 py-3"
        style={{ background: "#f8f9fa" }}
      >
        <div className="bg-white p-3 p-md-4 rounded shadow-sm">
          {/* Heading + Button */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-2 mb-sm-0 fs-4">All Checklists</h5>
            <Link to={"/AddChecklists"} className="text-decoration-none">
              <button
                className="btn fs-9"
                style={{ backgroundColor: "#0d6efd", color: "white" }}
              >
                <i className="fa-solid fa-plus me-2"></i>Create New Checklist
              </button>
            </Link>
          </div>

          {/* Filters */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-sm-6 col-md-3">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search Checklists..."
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <select className="form-select form-select-sm">
                <option>All Projects</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <input type="date" className="form-control form-control-sm" />
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <select className="form-select form-select-sm">
                <option>All Status</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive shadow-sm bg-white rounded p-2">
            <table className="table table-bordered table-striped align-middle mb-0">
              <thead className="table-light p-2">
                <tr>
                  <th className="ps-4 fw-medium fs-6">Checklist Name</th>
                  <th className="fw-medium fs-6">Project</th>
                  <th className="fw-medium fs-6">Assigned To</th>
                  <th className="fw-medium fs-6">Status</th>
                  <th className="fw-medium fs-6">Last Updated</th>
                  <th className="pe-4 fw-medium fs-6">Actions</th>
                </tr>
              </thead>
              <tbody className="p-2">
                {[...Array(10)].map((_, idx) => (
                  <tr key={idx} className="align-middle py-3">
                    <td className="ps-4 py-3 fw-semibold fs-9">
                      Site Safety Inspection
                    </td>
                    <td className="text-muted fs-9 py-3">Project Alpha</td>
                    <td className="text-muted fs-9 py-3">John Smith</td>
                    <td className="py-3">
                      <span className="badge bg-warning text-dark fs-9">
                        In Progress
                      </span>
                    </td>
                    <td className="text-muted fs-9 py-3">2024-02-19</td>
                    <td className="pe-4 py-3">
                      <div className="d-flex gap-2">
                        <button className="btn text-primary p-0">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className="btn text-info p-0">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button className="btn text-success p-0">
                          <i className="fa-solid fa-circle-check"></i>
                        </button>
                        <button className="btn text-dark p-0">
                          <i className="fa-solid fa-download"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
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
        </div>
      </div>
    </>
  );
}

export default Checklists;
