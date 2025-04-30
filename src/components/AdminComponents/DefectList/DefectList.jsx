import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DefectDetailsModal from "./DefectDetailsModal";
import EditDefectModal from "./EditDefectModal";
import {
  fetchDefects,
  deleteDefectList,
  fetchDefectDetails,
} from "../../../redux/slices/defectSlice";
function DefectList() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { defects, loading, error } = useSelector((state) => state.defects);

  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedDefect, setSelectedDefect] = useState(null);

  const handleEdit = (defect) => {
    setSelectedDefect(defect);
    setEditModalShow(true);
  };

  useEffect(() => {
    dispatch(fetchDefects());
  }, [dispatch]);

  const handleView = (id) => {
    dispatch(fetchDefectDetails(id));
    setShowModal(true);
  };

  const handleDelete = (defectId) => {
    dispatch(deleteDefectList(defectId));
  };
  return (
    <div className="container-fluid p-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="d-flex justify-content-between">
          <h4 className="fw-semibold mb-4">All Defect Lists</h4>

          <Link to={"/AddDefectList"} className="ms-auto">
            <button
              className="btn  px-3"
              onClick={() => {
                console.log("Redirect to create checklist page");
              }}
              id=""
              style={{ backgroundColor: "#0d6efd", color: "white" }}
            >
              <i class="fa-solid fa-plus me-2"></i> New Defect
            </button>
          </Link>
        </div>

        {/* Filters & Button */}
        <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Search Checklists..."
          />
          <select className="form-select w-auto">
            <option>All Projects</option>
          </select>
          <input type="date" className="form-control w-auto" />
          <select className="form-select w-auto">
            <option>All Status</option>
          </select>
        </div>
        <div
          className="table-responsive shadow-sm bg-white rounded"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <table className="table table-bordered table-striped align-middle mb-0">
            <thead className="table-light p-2">
              <tr>
                <th className="ps-4 fw-medium fs-6">Defect Title</th>
                <th className="fw-medium fs-6">Project</th>
                <th className="fw-medium fs-6">Location</th>
                <th className="fw-medium fs-6">Assigned To</th>
                <th className="fw-medium fs-6">Priority</th>
                <th className="fw-medium fs-6">Status</th>
                <th className="fw-medium fs-6">Last Updated</th>
                <th className="pe-4 fw-medium fs-6">Actions</th>
              </tr>
            </thead>
            <tbody className="p-2">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Loading defects...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="text-center text-danger py-4">
                    {error}
                  </td>
                </tr>
              ) : defects.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No defects found.
                  </td>
                </tr>
              ) : (
                defects.map((defect) => (
                  <tr key={defect.id} className="py-3">
                    <td className="ps-4 fw-semibold text-dark py-3">
                      {defect.title}
                    </td>
                    <td className="text-muted py-3">{defect.project}</td>
                    <td className="text-muted py-3">{defect.location}</td>
                    <td className="text-muted py-3">{defect.assigned}</td>
                    <td className="py-3">
                      <span
                        className={`badge rounded-pill ${
                          defect.priority === "High"
                            ? "bg-danger text-white"
                            : defect.priority === "Medium"
                            ? "bg-warning text-dark"
                            : "bg-secondary text-white"
                        }`}
                      >
                        {defect.priority}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`badge rounded-pill ${
                          defect.status === "Resolved"
                            ? "bg-success text-white"
                            : defect.status === "In Progress"
                            ? "bg-warning text-dark"
                            : "bg-secondary text-white"
                        }`}
                      >
                        {defect.status}
                      </span>
                    </td>
                    <td className="text-muted py-3">{defect.date}</td>
                    <td className="pe-4 py-3">
                      <div className="d-flex gap-2">
                        <button
                          className="btn text-primary p-0"
                          onClick={() => handleEdit(defect)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className="btn text-success p-0">
                          <i className="fa-solid fa-circle-check"></i>
                        </button>
                        <button
                          className="btn text-info p-0"
                          onClick={() => handleView(defect._id)}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button
                          className="btn text-info p-0"
                          onClick={() => handleDelete(defect._id)}
                        >
                          <i className="fas fa-trash text-danger"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <DefectDetailsModal
            show={showModal}
            handleClose={() => setShowModal(false)}
          />

          <EditDefectModal
            show={editModalShow}
            handleClose={() => setEditModalShow(false)}
            defect={selectedDefect}
            onUpdate={() => dispatch(fetchDefects())}
          />

          {/* Pagination */}
          <div className="d-flex justify-content-end mt-3 mb-2">
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

        {/* Updated Table */}
      </div>
    </div>
  );
}

export default DefectList;
