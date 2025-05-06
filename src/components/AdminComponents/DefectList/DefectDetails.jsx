// src/pages/DefectDetails.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDefectDetails } from "../../../redux/slices/defectSlice";
import { Button } from "react-bootstrap";

function DefectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { defectDetails, loading, error } = useSelector(
    (state) => state.defects
  );

  console.log(defectDetails, "defectDetails");

  useEffect(() => {
    dispatch(fetchDefectDetails(id));
  }, [dispatch, id]);

  const defect = Array.isArray(defectDetails)
    ? defectDetails[0]
    : defectDetails;

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="text-danger p-4">{error}</p>;
  if (!defect) return <p className="p-4">No defect details found.</p>;

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Defect Details</h2>
        <Button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: "#0d6efd", color: "white" }}
        >
          <i className="fa-solid fa-arrow-left me-2"></i> Back
        </Button>
      </div>
      <div className="card shadow p-4">
        <h5>{defect.title}</h5>
        <p>
          <strong>Project:</strong> {defect.project?.name}
        </p>
        <p>
          <strong>Location:</strong> {defect.location}
        </p>
        <p>
          <strong>Category:</strong> {defect.category?.category}
        </p>
        <p>
          <strong>Assigned To:</strong> {defect.assigned?.firstName}{" "}
          {defect.assigned?.lastName}
        </p>
        <p>
          <strong>Priority:</strong> {defect.priority}
        </p>
        <p>
          <strong>Status:</strong> {defect.status}
        </p>
        <p>
          <strong>Date:</strong> {new Date(defect.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Description:</strong> {defect.description}
        </p>
        <p>
          <strong>Comments:</strong> {defect.comments}
        </p>
        <div className="mt-3">
          {defect.image?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="defect"
              style={{ maxWidth: "200px", marginRight: "10px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DefectDetails;
