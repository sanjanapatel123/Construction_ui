import React from "react";
import { Link } from "react-router-dom";

function UserManagement() {
  return (
    <div>
      <div className="container-sm">
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0 p-4">
              <div className="card-body p-0">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="card-title mb-0 fw-semibold">
                    Users Management
                  </h3>
                  <Link to={"/AddUserManagement"}>
                    <button className="btn btn-dark set_btn">
                      <i class="fa-solid fa-plus me-2"></i> Add New User
                    </button>
                  </Link>
                </div>

                {/* Search & Filters */}
                <div className="d-flex justify-content-between flex-wrap gap-3 mb-4">
                  <div className="form-group flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search users..."
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        All Roles
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            All Roles
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Admin
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Manager
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        All Status
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            All Status
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Active
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Pending
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Active</th>
                        <th className="pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Sarah Wilson",
                          role: "Project Manager",
                          status: "Active",
                          lastActive: "2 hours ago",
                        },
                        {
                          name: "Mike Johnson",
                          role: "Engineer",
                          status: "Active",
                          lastActive: "5 hours ago",
                        },
                        {
                          name: "Emily Brown",
                          role: "Contractor",
                          status: "Pending",
                          lastActive: "1 day ago",
                        },
                      ].map((user, index) => (
                        <tr key={index} className="bg-white border-bottom">
                          <td className="ps-4 py-3 border-bottom">
                            <img
                              src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg"
                              alt="user"
                              className="rounded-circle me-2"
                              style={{
                                width: "35px",
                                height: "35px",
                                objectFit: "cover",
                              }}
                            />
                            {user.name}
                          </td>
                          <td className="py-3 border-bottom">{user.role}</td>
                          <td className="py-3 border-bottom">
                            <span
                              className={`badge ${
                                user.status === "Active"
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 border-bottom">
                            {user.lastActive}
                          </td>
                          <td className="pe-4 py-3 border-bottom">
                            <button className="btn text-primary p-0 me-2">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className="btn text-danger p-0">
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <nav className="mt-4 d-flex justify-content-end">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <span className="page-link">Previous</span>
                    </li>
                    <li className="page-item active">
                      <span className="page-link">1</span>
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
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

