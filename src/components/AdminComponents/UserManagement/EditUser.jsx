import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../utils/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../redux/slices/userSlice"; // Adjust the import based on your file structure

// Replace with your actual base

const EditUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    department: "",
    permissions: {
      viewProjectDetails: false,
      editProjectInformation: false,
      manageTeamMembers: false,
      accessFinancialData: false,
    },
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/users/${id}`)
      .then((res) => {
        const fetchedUser = res.data.data.user;
        setUser(fetchedUser);
      })
      .catch((err) => console.error("Error fetching user", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setUser({
      ...user,
      permissions: {
        ...user.permissions,
        [name]: checked,
      },
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${apiUrl}/users/${id}`, user);
      toast.success("User updated successfully!");
      // Optionally, you can dispatch an action to refresh the user list in your Redux store
      dispatch(fetchUsers()); // Uncomment if you have a fetchUsers action in your userSlice
      navigate("/userManagement");
    } catch (error) {
      console.error("Error updating user", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="container">
      {" "}
      <div className="card">
        <div className="d-flex justify-between items-center card-header text-black">
          <h4>Edit User</h4>
          <Link to="/UserManagement">
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              <i className="fa-solid fa-arrow-left me-2"></i> Back
            </button>
          </Link>
        </div>
        <div className="card-body">
          {" "}
          <form onSubmit={(e) => handleUpdate(e)} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Role</label>
              <input
                type="text"
                name="role"
                value={user.role}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                value={user.department}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12">
              <label className="form-label d-block mb-2">Permissions</label>
              <div className="row">
                {Object.entries(user.permissions).map(([key, value]) => (
                  <div className="col-md-6 mb-2" key={key}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={key}
                        name={key}
                        checked={value}
                        onChange={handlePermissionChange}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        htmlFor={key}
                      >
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                Update User
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/userManagement")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
