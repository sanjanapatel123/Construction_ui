import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiUser, FiCheckCircle, FiDownload } from "react-icons/fi";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChecklists,
  fetchChecklistDetails,
  deleteChecklist,
} from "../../../redux/slices/checklistSlice"; // Adjust the import path as necessary
import { Spinner } from "react-bootstrap";
import EditChecklistModal from "./EditChecklistModal";
import { apiUrl } from "../../../utils/config";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

function Checklists() {
  const dispatch = useDispatch();
  const { checklists, checklistDetails, loading, error } = useSelector(
    (state) => state.checklists
  );

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(fetchChecklists());
  }, [dispatch]);

  const handleViewDetails = (id) => {
    dispatch(fetchChecklistDetails(id)); // Fetch the checklist details when clicked
    setShowModal(true); // Open the modal
  };

  const handleDelete = (id) => {
    dispatch(deleteChecklist(id)); // Dispatch the delete action
    dispatch(fetchChecklists()); // Re-fetch the checklists after deletion
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "Under Review":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  const handleEdit = (id) => {
    dispatch(fetchChecklistDetails(id)).then((res) => {
      if (res?.payload) {
        setShowEditModal(true);
      }
    });
  };

  const handleUpdateChecklist = async (updatedData) => {
    console.log("Updating checklist with data:", updatedData);

    try {
      const response = await axiosInstance.put(
        `${apiUrl}/checklists/${updatedData._id}`,
        updatedData
      );

      if (response.status === 200) {
        setShowEditModal(false);
        dispatch(fetchChecklists());
        toast.success("Checklist updated successfully!");
      } else {
        toast.error("Update failed, please try again.");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error(
        error.response?.data?.message || "Something went wrong during update."
      );
    }
  };

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
                {checklists.length > 0 ? (
                  checklists.map((checklist) => (
                    <tr key={checklist.id} className="align-middle py-3">
                      <td className="ps-4 py-3 fw-semibold fs-9">
                        {checklist.checklistName}
                      </td>
                      <td className="text-muted fs-9 py-3">
                        {checklist.project}
                      </td>
                      <td className="text-muted fs-9 py-3">
                        {checklist.AssignTo}
                      </td>
                      <td className="py-3">
                        <span
                          className={`badge ${getStatusBadgeClass(
                            checklist.status
                          )}`}
                        >
                          {checklist.status}
                        </span>
                      </td>
                      <td className="text-muted fs-9 py-3">{checklist.date}</td>
                      <td className="pe-4 py-3">
                        <div className="d-flex gap-2">
                          <button
                            className="btn text-primary p-0"
                            onClick={() => handleEdit(checklist._id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn text-info p-0"
                            onClick={() => handleViewDetails(checklist._id)}
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button className="btn text-success p-0">
                            <i className="fa-solid fa-circle-check"></i>
                          </button>
                          <button
                            className="btn text-dark p-0"
                            onClick={() => handleDelete(checklist._id)}
                          >
                            <i className="fas fa-trash text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No checklists available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Modal for Displaying Checklist Details */}
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Checklist Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {checklistDetails ? (
                  <div className="container">
                    {/* Checklist Info */}
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <strong className="text-muted">Checklist Name:</strong>
                        <div className="fs-6 fw-semibold">
                          {checklistDetails.checklistName}
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <strong className="text-muted">Assigned To:</strong>
                        <div className="fs-6">{checklistDetails.AssignTo}</div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <strong className="text-muted">Project:</strong>
                        <div className="fs-6">{checklistDetails.project}</div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <strong className="text-muted">Date:</strong>
                        <div className="fs-6">
                          {new Date(checklistDetails.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <strong className="text-muted">Status:</strong>
                        <div>
                          <span
                            className={`badge ${getStatusBadgeClass(
                              checklistDetails.status
                            )} px-3 py-1`}
                          >
                            {checklistDetails.status === "true"
                              ? "Completed"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <hr />

                    {/* Checklist Items */}
                    <div className="mb-3">
                      <strong className="text-muted">Checklist Items:</strong>
                      <ul className="list-group mt-2">
                        {checklistDetails.checklistItems.map((item, index) => (
                          <li key={item._id} className="list-group-item">
                            <i className="fa-regular fa-square-check me-2 text-success"></i>
                            {item.checklistItem}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Notes */}
                    {checklistDetails.additionalNotes && (
                      <div className="mb-3">
                        <strong className="text-muted">
                          Additional Notes:
                        </strong>
                        <div className="bg-light border rounded p-2 mt-1">
                          {checklistDetails.additionalNotes}
                        </div>
                      </div>
                    )}

                    {/* Timestamps */}
                    <div className="text-muted small mt-3">
                      <strong>Created At:</strong>{" "}
                      {new Date(checklistDetails.createdAt).toLocaleString()}{" "}
                      <br />
                      <strong>Last Updated:</strong>{" "}
                      {new Date(checklistDetails.updatedAt).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Spinner animation="border" />
                  </div>
                )}
              </Modal.Body>
            </Modal>

            <EditChecklistModal
              show={showEditModal}
              handleClose={() => setShowEditModal(false)}
              checklistDetails={checklistDetails}
              onUpdate={handleUpdateChecklist}
            />

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
