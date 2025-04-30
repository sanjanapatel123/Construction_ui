// import React from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Form,
//   Card,
//   ProgressBar,
// } from "react-bootstrap";

// function ClientPortal() {
//   return (
//     <div
//       className="p-4 bg-white m-3"
//       style={{ borderRadius: "10px", fontFamily: "Poppins, sans-serif" }}
//     >
//       {/* Header */}
//       <Row className="mb-4 px-4">
//         <Col className="d-flex align-items-center justify-content-between">
//           <h4 className="fw-bold">Client Portal</h4>
//           <Form.Select className="w-auto">
//             <option>Project Alpha</option>
//           </Form.Select>
//         </Col>
//       </Row>

//       {/* Top Stats */}
//       <Row className="g-3 px-4 mb-4">
//         <Col md={3}>
//           <Card className="p-3 border-0 shadow-sm">
//             <h6>Active Sites</h6>
//             <h3 className="text-primary fw-bold">12</h3>
//             <span className="text-muted small">4 in progress</span>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="p-3 border-0 shadow-sm">
//             <h6>Compliance Status</h6>
//             <p className="mb-1">
//               Safety <span className="text-success fw-bold">98%</span>
//             </p>
//             <p className="mb-0">
//               Quality <span className="text-success fw-bold">95%</span>
//             </p>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="p-3 border-0 shadow-sm">
//             <h6>Pending Approvals</h6>
//             <p className="mb-1">
//               RFIs <span className="text-warning fw-bold">5</span>
//             </p>
//             <p className="mb-1">
//               Safety Reports <span className="text-warning fw-bold">3</span>
//             </p>
//             <p className="mb-0">
//               Task Approvals <span className="text-warning fw-bold">8</span>
//             </p>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="p-3 border-0 shadow-sm">
//             <h6>Recent Activity</h6>
//             <p className="mb-1 small">Site inspection completed - 2h ago</p>
//             <p className="mb-1 small">Safety report updated - 4h ago</p>
//             <p className="mb-0 small">New RFI submitted - 6h ago</p>
//           </Card>
//         </Col>
//       </Row>

//       {/* Approvals + Documents */}
//       <Row className="g-3 px-4 mb-4">
//         {/* Pending Approvals */}
//         <Col md={6}>
//           <Card className="p-4 border-0 shadow-sm">
//             <h6 className="fw-bold mb-4">Pending Approvals</h6>

//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div>
//                 <div className="fw-semibold">Design Change Request</div>
//                 <div className="text-muted small">Submitted 2 days ago</div>
//               </div>
//               <Button variant="primary" size="sm" className="px-4">
//                 Review
//               </Button>
//             </div>

//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <div className="fw-semibold">Budget Amendment</div>
//                 <div className="text-muted small">Submitted 1 day ago</div>
//               </div>
//               <Button variant="primary" size="sm" className="px-4">
//                 Review
//               </Button>
//             </div>
//           </Card>
//         </Col>

//         {/* Documents */}
//         <Col md={6}>
//           <Card className="p-4 border-0 shadow-sm">
//             <h6 className="fw-bold mb-4">Documents</h6>

//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div className="d-flex align-items-center gap-2">
//                 <i className="bi bi-file-earmark-pdf text-danger fs-5"></i>
//                 <span className="fw-normal">Construction Plans.pdf</span>
//               </div>
//               <i className="bi bi-download text-primary fs-5" role="button"></i>
//             </div>

//             <div className="d-flex justify-content-between align-items-center">
//               <div className="d-flex align-items-center gap-2">
//                 <i className="bi bi-file-earmark-excel text-success fs-5"></i>
//                 <span className="fw-normal">Project Timeline.xlsx</span>
//               </div>
//               <i className="bi bi-download text-primary fs-5" role="button"></i>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Tasks & Approvals */}
//       <Row className="g-3 px-4 mb-4">
//         {/* Assigned Tasks */}
//         <Col md={6}>
//           <Card className="p-4 border-0 shadow-sm h-100">
//             <h6 className="fw-bold mb-2">Tasks & Approvals</h6>
//             <h6 className="fw-bold mb-4">Assigned Tasks</h6>

//             <div
//               className="d-flex justify-content-between align-items-start p-3 rounded mb-2"
//               style={{ backgroundColor: "#f9f9f9" }}
//             >
//               <div>
//                 <div className="fw-semibold">Site Inspection Review</div>
//                 <div className="text-muted small">Due: Dec 15, 2023</div>
//               </div>
//               <span className="badge bg-warning text-dark align-self-center">
//                 In Progress
//               </span>
//             </div>

//             <div
//               className="d-flex justify-content-between align-items-start p-3 rounded mb-2"
//               style={{ backgroundColor: "#f9f9f9" }}
//             >
//               <div>
//                 <div className="fw-semibold">Quality Check Sign-off</div>
//                 <div className="text-muted small">Due: Dec 18, 2023</div>
//               </div>
//               <span className="badge bg-secondary align-self-center">
//                 Pending
//               </span>
//             </div>

//             <div
//               className="d-flex justify-content-between align-items-start p-3 rounded"
//               style={{ backgroundColor: "#f9f9f9" }}
//             >
//               <div>
//                 <div className="fw-semibold">Safety Report Review</div>
//                 <div className="text-muted small">Due: Dec 20, 2023</div>
//               </div>
//               <span className="badge bg-success align-self-center">
//                 Completed
//               </span>
//             </div>
//           </Card>
//         </Col>

//         {/* Approval Requests */}
//         <Col md={6}>
//           <Card className="p-4 border-0 shadow-sm h-100">
//             <h6 className="fw-bold mb-4">Approval Requests</h6>

//             <div className="border rounded p-3 mb-4">
//               <div className="d-flex justify-content-between">
//                 <span className="fw-semibold">SWMS Approval #123</span>
//                 <span className="small text-muted">Submitted: Dec 12</span>
//               </div>
//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 placeholder="Add your comments here..."
//                 className="mt-2 mb-3"
//               />
//               <div className="d-flex gap-2 justify-content-end">
//                 <Button variant="danger" size="sm">
//                   Reject
//                 </Button>
//                 <Button variant="success" size="sm">
//                   Approve
//                 </Button>
//               </div>
//             </div>

//             <div className="border rounded p-3">
//               <div className="d-flex justify-content-between">
//                 <span className="fw-semibold">Defect Resolution #456</span>
//                 <span className="small text-muted">Submitted: Dec 13</span>
//               </div>
//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 placeholder="Add your comments here..."
//                 className="mt-2 mb-3"
//               />
//               <div className="d-flex gap-2 justify-content-end">
//                 <Button variant="danger" size="sm">
//                   Reject
//                 </Button>
//                 <Button variant="success" size="sm">
//                   Approve
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Reports & Docs */}
//       <Row className="g-3 px-4">
//         <Col>
//           <Card className="p-4 border-0 shadow-sm">
//             <h6 className="fw-bold mb-4">Reports & Documents</h6>

//             <Row className="g-3 mb-4">
//               {/* Downloadable Reports */}
//               <Col md={4}>
//                 <div className="border rounded p-3 h-100">
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h6 className="fw-semibold mb-0">Downloadable Reports</h6>
//                     <i className="bi bi-file-earmark-text text-primary"></i>
//                   </div>

//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="small">Monthly Progress Report</span>
//                     <div className="d-flex gap-1">
//                       <Button variant="outline-primary" size="sm">
//                         PDF
//                       </Button>
//                       <Button variant="outline-success" size="sm">
//                         Excel
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="small">Safety Compliance Report</span>
//                     <div className="d-flex gap-1">
//                       <Button variant="outline-primary" size="sm">
//                         PDF
//                       </Button>
//                       <Button variant="outline-success" size="sm">
//                         CSV
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </Col>

//               {/* Document Viewer */}
//               <Col md={4}>
//                 <div className="border rounded p-3 h-100">
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h6 className="fw-semibold mb-0">Document Viewer</h6>
//                     <i className="bi bi-file-earmark-text text-primary"></i>
//                   </div>

//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="small">Project Blueprints v2.1</span>
//                     <Button variant="outline-secondary" size="sm">
//                       View
//                     </Button>
//                   </div>

//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="small">Site Safety Checklist</span>
//                     <Button variant="outline-secondary" size="sm">
//                       View
//                     </Button>
//                   </div>
//                 </div>
//               </Col>

//               {/* Version Control */}
//               <Col md={4}>
//                 <div className="border rounded p-3 h-100">
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h6 className="fw-semibold mb-0">Version Control</h6>
//                     <i className="bi bi-arrow-clockwise text-primary"></i>
//                   </div>

//                   <div className="d-flex justify-content-between small">
//                     <span>Blueprint Rev. 2.1</span>
//                     <span className="text-muted">Dec 10, 2023</span>
//                   </div>

//                   <div className="d-flex justify-content-between small mt-2">
//                     <span>Blueprint Rev. 2.0</span>
//                     <span className="text-muted">Dec 1, 2023</span>
//                   </div>
//                 </div>
//               </Col>
//             </Row>

//             <div className="d-flex justify-content-end gap-2">
//               <Button variant="primary">Download All</Button>
//               <Button variant="light" className="text-muted border">
//                 Manage Documents
//               </Button>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default ClientPortal;






import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  ProgressBar,
} from "react-bootstrap";

function ClientPortal() {
  return (
    <div
      className="p-4 bg-white m-3"
      style={{ borderRadius: "10px", fontFamily: "Poppins, sans-serif" }}
    >
      {/* Header */}
      <Row className="mb-4 px-4">
        <Col className="d-flex align-items-center justify-content-between">
          <h4 className="fw-bold">Client Portal</h4>
          <Form.Select className="w-auto">
            <option>Project Alpha</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Top Stats */}
      <Row className="g-3 px-4 mb-4">
        <Col md={3}>
          <Card className="p-3 border-0 shadow-sm">
            <h6>Active Sites</h6>
            <h3 className="text-primary fw-bold">12</h3>
            <span className="text-muted small">4 in progress</span>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 border-0 shadow-sm">
            <h6>Compliance Status</h6>
            <p className="mb-1">
              Safety <span className="text-success fw-bold">98%</span>
            </p>
            <p className="mb-0">
              Quality <span className="text-success fw-bold">95%</span>
            </p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 border-0 shadow-sm">
            <h6>Pending Approvals</h6>
            <p className="mb-1">
              RFIs <span className="text-warning fw-bold">5</span>
            </p>
            <p className="mb-1">
              Safety Reports <span className="text-warning fw-bold">3</span>
            </p>
            <p className="mb-0">
              Task Approvals <span className="text-warning fw-bold">8</span>
            </p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 border-0 shadow-sm">
            <h6>Recent Activity</h6>
            <p className="mb-1 small">Site inspection completed - 2h ago</p>
            <p className="mb-1 small">Safety report updated - 4h ago</p>
            <p className="mb-0 small">New RFI submitted - 6h ago</p>
          </Card>
        </Col>
      </Row>

      {/* Approvals + Documents */}
      <Row className="g-3 px-4 mb-4">
        {/* Pending Approvals */}
        <Col md={6}>
          <Card className="p-4 border-0 shadow-sm">
            <h6 className="fw-bold mb-4">Pending Approvals</h6>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-semibold">Design Change Request</div>
                <div className="text-muted small">Submitted 2 days ago</div>
              </div>
              <Button variant="primary" size="sm" className="px-4">
                Review
              </Button>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-semibold">Budget Amendment</div>
                <div className="text-muted small">Submitted 1 day ago</div>
              </div>
              <Button variant="primary" size="sm" className="px-4">
                Review
              </Button>
            </div>
          </Card>
        </Col>

        {/* Documents */}
        <Col md={6}>
          <Card className="p-4 border-0 shadow-sm">
            <h6 className="fw-bold mb-4">Documents</h6>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-file-earmark-pdf text-danger fs-5"></i>
                <span className="fw-normal">Construction Plans.pdf</span>
              </div>
              <i className="bi bi-download text-primary fs-5" role="button"></i>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-file-earmark-excel text-success fs-5"></i>
                <span className="fw-normal">Project Timeline.xlsx</span>
              </div>
              <i className="bi bi-download text-primary fs-5" role="button"></i>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tasks & Approvals */}
      <Row className="g-3 px-4 mb-4">
        {/* Assigned Tasks */}
        <Col md={6}>
          <Card className="p-4 border-0 shadow-sm h-100">
            <h6 className="fw-bold mb-2">Tasks & Approvals</h6>
            <h6 className="fw-bold mb-4">Assigned Tasks</h6>

            <div
              className="d-flex justify-content-between align-items-start p-3 rounded mb-2"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div>
                <div className="fw-semibold">Site Inspection Review</div>
                <div className="text-muted small">Due: Dec 15, 2023</div>
              </div>
              <span className="badge bg-warning text-dark align-self-center">
                In Progress
              </span>
            </div>

            <div
              className="d-flex justify-content-between align-items-start p-3 rounded mb-2"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div>
                <div className="fw-semibold">Quality Check Sign-off</div>
                <div className="text-muted small">Due: Dec 18, 2023</div>
              </div>
              <span className="badge bg-secondary align-self-center">
                Pending
              </span>
            </div>

            <div
              className="d-flex justify-content-between align-items-start p-3 rounded"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div>
                <div className="fw-semibold">Safety Report Review</div>
                <div className="text-muted small">Due: Dec 20, 2023</div>
              </div>
              <span className="badge bg-success align-self-center">
                Completed
              </span>
            </div>
          </Card>
        </Col>

        {/* Approval Requests */}
        <Col md={6}>
          <Card className="p-4 border-0 shadow-sm h-100">
            <h6 className="fw-bold mb-4">Approval Requests</h6>

            <div className="border rounded p-3 mb-4">
              <div className="d-flex justify-content-between">
                <span className="fw-semibold">SWMS Approval #123</span>
                <span className="small text-muted">Submitted: Dec 12</span>
              </div>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Add your comments here..."
                className="mt-2 mb-3"
              />
              <div className="d-flex gap-2 justify-content-end">
                <Button variant="danger" size="sm">
                  Reject
                </Button>
                <Button variant="success" size="sm">
                  Approve
                </Button>
              </div>
            </div>

            <div className="border rounded p-3">
              <div className="d-flex justify-content-between">
                <span className="fw-semibold">Defect Resolution #456</span>
                <span className="small text-muted">Submitted: Dec 13</span>
              </div>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Add your comments here..."
                className="mt-2 mb-3"
              />
              <div className="d-flex gap-2 justify-content-end">
                <Button variant="danger" size="sm">
                  Reject
                </Button>
                <Button variant="success" size="sm">
                  Approve
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Reports & Docs */}
      <Row className="g-3 px-4">
        <Col>
          <Card className="p-4 border-0 shadow-sm">
            <h6 className="fw-bold mb-4">Reports & Documents</h6>

            <Row className="g-3 mb-4">
              {/* Downloadable Reports */}
              <Col md={4}>
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-semibold mb-0">Downloadable Reports</h6>
                    <i className="bi bi-file-earmark-text text-primary"></i>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="small">Monthly Progress Report</span>
                    <div className="d-flex gap-1">
                      <Button variant="outline-primary" size="sm">
                        PDF
                      </Button>
                      <Button variant="outline-success" size="sm">
                        Excel
                      </Button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small">Safety Compliance Report</span>
                    <div className="d-flex gap-1">
                      <Button variant="outline-primary" size="sm">
                        PDF
                      </Button>
                      <Button variant="outline-success" size="sm">
                        CSV
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Document Viewer */}
              <Col md={4}>
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-semibold mb-0">Document Viewer</h6>
                    <i className="bi bi-file-earmark-text text-primary"></i>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="small">Project Blueprints v2.1</span>
                    <Button variant="outline-secondary" size="sm">
                      View
                    </Button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small">Site Safety Checklist</span>
                    <Button variant="outline-secondary" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </Col>

              {/* Version Control */}
              <Col md={4}>
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-semibold mb-0">Version Control</h6>
                    <i className="bi bi-arrow-clockwise text-primary"></i>
                  </div>

                  <div className="d-flex justify-content-between small">
                    <span>Blueprint Rev. 2.1</span>
                    <span className="text-muted">Dec 10, 2023</span>
                  </div>

                  <div className="d-flex justify-content-between small mt-2">
                    <span>Blueprint Rev. 2.0</span>
                    <span className="text-muted">Dec 1, 2023</span>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="primary">Download All</Button>
              <Button variant="light" className="text-muted border">
                Manage Documents
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ClientPortal;
