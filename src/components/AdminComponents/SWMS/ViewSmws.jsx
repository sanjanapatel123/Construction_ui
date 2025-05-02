import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getswmsbyId } from "../../../redux/slices/swmsSlice";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ViewSwms = () => {
  const dispatch = useDispatch();
  const { singleSwms, loading, error } = useSelector((state) => state.swms);
  const { id } = useParams();
  const pdfRef = useRef();

  useEffect(() => {
    dispatch(getswmsbyId(id));
  }, [dispatch, id]);

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("swms-details.pdf");
    });
  };

  const renderPPE = (ppe) => {
    return Object.entries(ppe || {}).map(([key, value]) => (
      <li key={key} className="list-group-item">
        {value ? "✅" : "❌"} {key.replace(/([A-Z])/g, ' $1')}
      </li>
    ));
  };

  const renderPermits = (permits) => {
    return Object.entries(permits || {}).map(([key, value]) => (
      <li key={key} className="list-group-item">
        {value ? "✅" : "❌"} {key.replace(/([A-Z])/g, ' $1')}
      </li>
    ));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">SWMS Details</h3>
        <div>
          <button
            className="btn me-2"
            onClick={downloadPdf}
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-file-pdf"></i> Download PDF
          </button>

          <Link to="/swms">
            <button className="btn" style={{ backgroundColor: "#0d6efd", color: "white" }}>
              <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div
          ref={pdfRef}
          style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}
        >
          <div className="row">
            <div className="mb-3 col-md-6"><strong>SWMS Name:</strong> {singleSwms?.title}</div>
            <div className="mb-3 col-md-6"><strong>Site Address:</strong> {singleSwms?.workArea}</div>
            <div className="mb-3 col-md-6"><strong>Company Name:</strong> {singleSwms?.project}</div>
            <div className="mb-3 col-md-6">
              <strong>Date Created:</strong> {new Date(singleSwms?.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="mb-4">
            <h5>Hazards and Controls</h5>
            {(singleSwms?.hazardsandControls || []).map((hazard, index) => (
              <div key={hazard._id} className="card mb-3">
                <div className="card-body">
                  <h6>Hazard {index + 1}</h6>
                  <p><strong>Description:</strong> {hazard.hazardDescription}</p>
                  <p><strong>Risk Level:</strong> {hazard.riskLevel}</p>
                  <p><strong>Control Measures:</strong> {hazard.controlMeasures}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <h5>PPE Requirements</h5>
              <ul className="list-group list-group-flush">
                {renderPPE(singleSwms?.ppeRequirements)}
              </ul>
            </div>
            <div className="col-md-6">
              <h5>Required Permits</h5>
              <ul className="list-group list-group-flush">
                {renderPermits(singleSwms?.requiredPermits)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSwms;
