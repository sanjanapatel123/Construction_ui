import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../../redux/slices/userSlice"; // Adjust the import path as necessary

function UserManagement() {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [uniqueRoles, setUniqueRoles] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const roles = [...new Set(users.map((user) => user.role))];
    setUniqueRoles(roles);
  }, [users]);

  //  console.log("Users →", users);
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredUsers = users
    .filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortField]?.localeCompare?.(b[sortField]) || 0;
      } else {
        return b[sortField]?.localeCompare?.(a[sortField]) || 0;
      }
    });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        {roleFilter === "All" ? "All Roles" : roleFilter}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setRoleFilter("All")}
                          >
                            All Roles
                          </button>
                        </li>
                        {uniqueRoles.map((role) => (
                          <li key={role}>
                            <button
                              className="dropdown-item"
                              onClick={() => setRoleFilter(role)}
                            >
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </button>
                          </li>
                        ))}
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
                        <th>Department</th>
                        {/* <th>Status</th> */}
                        <th>Last Active</th>
                        <th className="pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user, index) => (
                        <tr key={index} className="bg-white border-bottom">
                          <td className="ps-4 py-3 border-bottom">
                            <img
                              src={
                                user.image?.[0] ||
                                "https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-woman-570x570.png"
                              }
                              alt="user"
                              className="rounded-circle me-2"
                              style={{
                                width: "35px",
                                height: "35px",
                                objectFit: "cover",
                              }}
                            />
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="py-3 border-bottom">{user.role}</td>
                          <td className="py-3 border-bottom">
                            {user.department}
                          </td>
                          {/* <td className="py-3 border-bottom">
                            <span
                              className={`badge ${
                                user.color === "#FF5733"
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              Active
                            </span>
                          </td> */}
                          <td className="py-3 border-bottom">
                            {new Date(user.updatedAt).toLocaleString()}
                          </td>
                          <td className="pe-4 py-3 border-bottom">
                            <Link
                              to={`/users/view/${user._id}`}
                              className="btn text-primary p-0 me-2"
                            >
                              <i
                                className="fas fa-eye text-info "
                                style={{ fontSize: "15px" }}
                              ></i>
                            </Link>
                            <Link
                              to={`/edit-user/${user._id}`}
                              className="btn text-primary p-0 me-2"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="btn text-danger p-0"
                            >
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
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      >
                        Next
                      </button>
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
