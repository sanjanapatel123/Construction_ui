import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ViewDocument() {
  const [isOpen, setIsOpen] = useState(true);
  const { drawings_Single } = useSelector((state) => state.drawings);

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-success text-white";
      case "Pending":
        return "bg-warning text-dark";
      case "Rejected":
        return "bg-danger text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${drawings_Single?.drawingRegister?.documentTitle || 'document'}.pdf`);
    });
  };

  if (!isOpen) return null;
  if (!drawings_Single?.drawingRegister) {
    return <div className="text-center p-4">Loading document data...</div>;
  }

  const doc = drawings_Single.drawingRegister;

  return (
    <>
      <div className="modal show fade d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-4">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-semibold">Document Details</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>

            <div className="modal-body" id="pdf-content">
              <div className="row">
                {/* Image section */}
                <div className="col-md-5 mb-3">
                  <img
                    src={doc?.image?.[0] || 'https://via.placeholder.com/300'}
                    alt="Uploaded"
                    className="img-fluid rounded shadow-sm"
                  />
                </div>

                {/* Info section */}
                <div className="col-md-7">
                  <div className="mb-2">
                    <strong>Document Name</strong><br />
                    {doc?.documentTitle || 'N/A'}
                  </div>

                  <div className="mb-2">
                    <strong>Document Type</strong><br />
                    {doc?.documentType || 'N/A'}
                  </div>

                  <div className="mb-2">
                    <strong>Status</strong><br />
                    <span className={`badge ${getStatusColorClass(doc?.status)}`}>
                      {doc?.status || 'N/A'}
                    </span>
                  </div>

                  <div className="mb-2">
                    <strong>Assigned To</strong><br />
                    {doc?.assignedTo?.firstName || 'N/A'}
                  </div>

                  <div className="mb-2">
                    <strong>Last Modified</strong><br />
                    {doc?.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : 'N/A'}
                  </div>

                  <div className="mb-2">
                    <strong>Comments</strong><br />
                    {doc?.comments || 'N/A'}
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-primary" onClick={handleDownloadPDF}>
                      <i className="fas fa-download me-1"></i> Download
                    </button>
                    <button className="btn btn-outline-secondary">
                      <i className="fas fa-print me-1"></i> Print
                    </button>
                    <button className="btn btn-outline-secondary">
                      <i className="fas fa-share-alt me-1"></i> Share
                    </button>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Document History */}
              <div>
                <strong>Document History</strong>
                <ul className="list-unstyled mt-2">
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Document approved <span className="text-muted">2025-04-15 by John Smith</span>
                  </li>
                  <li>
                    <i className="fas fa-clock text-secondary me-2"></i>
                    Document updated <span className="text-muted">2025-04-12 by Emily Johnson</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}