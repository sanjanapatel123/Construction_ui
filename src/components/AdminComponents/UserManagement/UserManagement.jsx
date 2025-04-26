// import React from "react";
// import { Link } from "react-router-dom";

// function UserManagement() {
//   return (
//     <div>
//       <div className="container-sm py-5">
//         <div className="row">
//           <div className="col-12">
//             <div className="card shadow-sm border-0 p-4">
//               <div className="card-body p-0">
//                 {/* Header */}
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <h3 className="card-title mb-0 fw-semibold">
//                     Users Management
//                   </h3>
//                   <Link to={"/AddUserManagement"}>
//                     <button className="btn btn-dark set_btn">
//                       <i class="fa-solid fa-plus me-2"></i> Add New User
//                     </button>
//                   </Link>
//                 </div>

//                 {/* Search & Filters */}
//                 <div className="d-flex justify-content-between flex-wrap gap-3 mb-4">
//                   <div className="form-group flex-grow-1">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Search users..."
//                     />
//                   </div>
//                   <div className="d-flex gap-2">
//                     <div className="dropdown">
//                       <button
//                         className="btn btn-outline-secondary dropdown-toggle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         All Roles
//                       </button>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             All Roles
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Admin
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Manager
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="dropdown">
//                       <button
//                         className="btn btn-outline-secondary dropdown-toggle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                       >
//                         All Status
//                       </button>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             All Status
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Active
//                           </a>
//                         </li>
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             Pending
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Table */}
//                 <div className="table-responsive">
//                   <table className="table table-bordered table-hover align-middle mb-0">
//                     <thead className="table-light">
//                       <tr>
//                         <th className="ps-4">Name</th>
//                         <th>Role</th>
//                         <th>Status</th>
//                         <th>Last Active</th>
//                         <th className="pe-4">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {[
//                         {
//                           name: "Sarah Wilson",
//                           role: "Project Manager",
//                           status: "Active",
//                           lastActive: "2 hours ago",
//                         },
//                         {
//                           name: "Mike Johnson",
//                           role: "Engineer",
//                           status: "Active",
//                           lastActive: "5 hours ago",
//                         },
//                         {
//                           name: "Emily Brown",
//                           role: "Contractor",
//                           status: "Pending",
//                           lastActive: "1 day ago",
//                         },
//                       ].map((user, index) => (
//                         <tr key={index} className="bg-white border-bottom">
//                           <td className="ps-4 py-3 border-bottom">
//                             <img
//                               src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg"
//                               alt="user"
//                               className="rounded-circle me-2"
//                               style={{
//                                 width: "35px",
//                                 height: "35px",
//                                 objectFit: "cover",
//                               }}
//                             />
//                             {user.name}
//                           </td>
//                           <td className="py-3 border-bottom">{user.role}</td>
//                           <td className="py-3 border-bottom">
//                             <span
//                               className={`badge ${
//                                 user.status === "Active"
//                                   ? "bg-success"
//                                   : "bg-warning text-dark"
//                               }`}
//                             >
//                               {user.status}
//                             </span>
//                           </td>
//                           <td className="py-3 border-bottom">
//                             {user.lastActive}
//                           </td>
//                           <td className="pe-4 py-3 border-bottom">
//                             <button className="btn text-primary p-0 me-2">
//                               <i className="fa-solid fa-pen-to-square"></i>
//                             </button>
//                             <button className="btn text-danger p-0">
//                               <i className="fa-solid fa-trash"></i>
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination */}
//                 <nav className="mt-4 d-flex justify-content-end">
//                   <ul className="pagination">
//                     <li className="page-item disabled">
//                       <span className="page-link">Previous</span>
//                     </li>
//                     <li className="page-item active">
//                       <span className="page-link">1</span>
//                     </li>
//                     <li className="page-item">
//                       <a className="page-link" href="#">
//                         2
//                       </a>
//                     </li>
//                     <li className="page-item">
//                       <a className="page-link" href="#">
//                         3
//                       </a>
//                     </li>
//                     <li className="page-item">
//                       <a className="page-link" href="#">
//                         Next
//                       </a>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserManagement;

import React, { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    contact: "9876543210",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Supervisor",
    contact: "9123456789",
    status: "Inactive",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    role: "",
    status: "Active",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUserId) {
      setUsers(
        users.map((user) =>
          user.id === editingUserId ? { ...user, ...formData } : user
        )
      );
      setEditingUserId(null);
    } else {
      const newUser = { ...formData, id: users.length + 1 };
      setUsers([...users, newUser]);
    }
    setFormData({
      name: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
      role: "",
      status: "Active",
    });
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingUserId(user.id);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow rounded-4 p-4 mb-5">
        <h2 className="mb-4 text-center">
          {editingUserId ? "Edit User" : "Add New User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Contact Number *</label>
              <input
                type="text"
                className="form-control"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                maxLength="10"
              />
            </div>
            {!editingUserId && (
              <>
                <div className="col-md-6">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Confirm Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <div className="col-md-6">
              <label className="form-label">Role *</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Worker">Worker</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Status *</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-5">
              {editingUserId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>

      <div className="card shadow rounded-4 p-4">
        <h2 className="mb-4 text-center">User List</h2>
        <div className="table-responsive">
          {" "}
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.contact}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "Active" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
