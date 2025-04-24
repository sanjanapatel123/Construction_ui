// components/TimesheetDetailsModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../../utils/config";


const TimesheetDetailsModal = ({ show, handleClose, timesheetId }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (timesheetId) {
      setLoading(true);
      axios
        .get(`${apiUrl}/timesheet/${timesheetId}`)
        .then((res) => {
          setDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching timesheet details", err);
          setLoading(false);
        });
    }
  }, [timesheetId]);

  const getStatusEmoji = (status) => {
    switch (status) {
      case "Pending":
        return "⏳";
      case "Approved":
        return "✅";
      case "Completed":
        return "🏁";
      default:
        return "📄";
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>📋 Timesheet Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          details && (
            <div className="p-2">
              <p>
                <strong>🗓️ Date:</strong>{" "}
                {new Date(details.date).toLocaleDateString()}
              </p>
              <p>
                <strong>👷 Worker:</strong> {details.worker}
              </p>
              <p>
                <strong>🏗️ Project:</strong> {details.project}
              </p>
              <p>
                <strong>⏱️ Hours Worked:</strong> {details.hoursWorked}
              </p>
              <p>
                <strong>🕒 Overtime:</strong> {details.Overtime}
              </p>
              <p>
                <strong>Status:</strong> {getStatusEmoji(details.status)}{" "}
                {details.status}
              </p>
              <p>
                <small className="text-muted">
                  📅 Created: {new Date(details.createdAt).toLocaleString()}
                </small>
              </p>
              <p>
                <small className="text-muted">
                  🛠️ Updated: {new Date(details.updatedAt).toLocaleString()}
                </small>
              </p>
            </div>
          )
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TimesheetDetailsModal;
