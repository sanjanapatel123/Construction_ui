import React from 'react'

export default function ViewDocument() {
  return (
    <>
        <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content p-4">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-semibold">Document Details</h5>
            <button type="button" className="btn-close"></button>
          </div>

          <div className="modal-body">
            <div className="row">
              {/* Image section */}
              <div className="col-md-5 mb-3">
                <img
                  src="https://via.placeholder.com/400x300?text=Floor+Plan"
                  alt="Document"
                  className="img-fluid rounded shadow-sm"
                />
              </div>

              {/* Info section */}
              <div className="col-md-7">
                <div className="mb-2">
                  <strong>Document Name</strong><br />
                  Floor Plan - Level 1
                </div>

                <div className="mb-2">
                  <strong>Document Type</strong><br />
                  Floor Plan
                </div>

                <div className="mb-2">
                  <strong>Status</strong><br />
                  <span className="badge bg-success">Approved</span>
                </div>

                <div className="mb-2">
                  <strong>Assigned To</strong><br />
                  John Smith
                </div>

                <div className="mb-2">
                  <strong>Last Modified</strong><br />
                  2025-04-15
                </div>

                <div className="mb-2">
                  <strong>Comments</strong><br />
                  Final version approved by client
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-primary">
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
  )
}
