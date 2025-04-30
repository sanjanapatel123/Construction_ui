import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../utils/config";
import { Spinner } from "react-bootstrap";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/users/${id}`)
      .then((res) => {
        setUser(res.data.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!user) {
    return <div className="text-center mt-5 text-danger">User not found.</div>;
  }

  return (
    <div className="container">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">User Details</h4>
          <button
            className="btn btn-dark"
            onClick={() => navigate("/userManagement")}
          >
            Back
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={user.profileImage?.[0]}
                alt="Profile"
                className="img-fluid rounded-circle border"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <h5 className="mb-3">
                {user.firstName} {user.lastName}
              </h5>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Department:</strong> {user.department}
              </p>
              <p>
                <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
              </p>
              <hr />
              <h6>Permissions:</h6>
              <ul className="list-group">
                {Object.entries(user.permissions).map(([key, value]) => (
                  <li
                    key={key}
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      value
                        ? "list-group-item-success"
                        : "list-group-item-light"
                    }`}
                  >
                    {key}
                    <span
                      className={`badge ${
                        value ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {value ? "Yes" : "No"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
