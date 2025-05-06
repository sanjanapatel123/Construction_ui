import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDefects,
  deleteDefectList,
} from "../../../redux/slices/defectSlice";

function DefectList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch();
  const { defects, loading, error } = useSelector((state) => state.defects);
  // console.log(defects, "defects");

  const projectOptions = [
    "All",
    ...new Set(defects.map((d) => d.project?.name).filter(Boolean)),
  ];

  const statusOptions = [
    "All",
    ...new Set(defects.map((d) => d.status).filter(Boolean)),
  ];

  useEffect(() => {
    dispatch(fetchDefects());
  }, [dispatch]);

  const handleDelete = (defectId) => {
    dispatch(deleteDefectList(defectId));
  };

  const filteredDefects = defects
    .filter((d) => d.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((d) =>
      selectedProject === "All" ? true : d.project?.name === selectedProject
    )
    .filter((d) =>
      selectedStatus === "All" ? true : d.status === selectedStatus
    );

  const paginatedDefects = filteredDefects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDefects.length / itemsPerPage);

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
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="form-select w-auto"
            value={selectedProject}
            onChange={(e) => {
              setSelectedProject(e.target.value);
              setCurrentPage(1);
            }}
          >
            {projectOptions.map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>

          <select
            className="form-select w-auto"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
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
              ) : paginatedDefects.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No defects found.
                  </td>
                </tr>
              ) : (
                paginatedDefects?.map((defect) => (
                  <tr key={defect.id} className="py-3">
                    <td className="ps-4 fw-semibold text-dark py-3">
                      {defect.title}
                    </td>
                    <td className="text-muted py-3">{defect.project?.name}</td>
                    <td className="text-muted py-3">{defect.location}</td>
                    <td className="text-muted py-3">
                      {defect.assigned?.firstName} {defect.assigned?.lastName}
                    </td>
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
                    <td className="text-muted py-3">
                      {new Date(defect.date).toLocaleDateString()}
                    </td>

                    <td className="pe-4 py-3">
                      <div className="d-flex gap-2">
                        <Link to={`/edit-defect/${defect._id}`}>
                        <button className="btn text-primary p-0">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        </Link>
                        <Link
                          to={`/defects/${defect._id}`}
                          className="btn text-info p-0"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </Link>
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

          {/* Pagination */}
          <div className="d-flex justify-content-end mt-3 mb-2 gap-2">
            <Button
              size="sm"
              variant="outline-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>

            {[...Array(totalPages).keys()].map((num) => (
              <Button
                key={num + 1}
                size="sm"
                variant={
                  currentPage === num + 1 ? "primary" : "outline-secondary"
                }
                onClick={() => setCurrentPage(num + 1)}
              >
                {num + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
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
