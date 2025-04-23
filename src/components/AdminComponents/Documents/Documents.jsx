// import React, { useState } from "react";
// import { Button, Row, Col, Card, Table, Dropdown } from "react-bootstrap";
// import { FaFileDownload, FaTh, FaList, FaUpload } from "react-icons/fa";
// import img1 from "../../../assets/image/img.jpg";
// import img2 from "../../../assets/image/img2.png";
// import img3 from "../../../assets/image/img3.png";
// import img4 from "../../../assets/image/img4.png";
// import img5 from "../../../assets/image/img5.png";
// import UploadDocumentModal from "./UploadDocumentModal";
// import ViewDocumentModal from "./ViewDocumentModal";

// const DocumentManagement = () => {
//   // State to toggle between Grid View and List View
//   const [viewMode, setViewMode] = useState("list");
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedDocument, setSelectedDocument] = useState(null);

//   const handleShowViewModal = (doc) => {
//     setSelectedDocument(doc);
//     setShowViewModal(true);
//   };

//   const handleCloseViewModal = () => {
//     setShowViewModal(false);
//     setSelectedDocument(null);
//   };

//   const [showUploadModal, setShowUploadModal] = useState(false);

//   // Handle modal show and hide
//   const handleShow = () => setShowUploadModal(true);
//   const handleClose = () => setShowUploadModal(false);

//   // Sample document data with thumbnail URLs for Grid View
//   const documents = [
//     {
//       name: "Project Contract 2025-04-A",
//       category: "Contracts",
//       type: "PDF",
//       lastModified: "2025-04-15",
//       status: "Approved",
//       activityGraph: img1,
//       activityProgress: 65,
//       versionHistory: [
//         { version: "Version 3.0", date: "2025-04-05", author: "John Doe" },
//         { version: "Version 2.0", date: "2025-04-01", author: "Sarah Johnson" },
//         { version: "Version 1.0", date: "2025-03-28", author: "Michael Brown" },
//       ],
//       permissions: [
//         { role: "Project Managers", accessLevel: "Full Access" },
//         { role: "Site Engineers", accessLevel: "View & Comment" },
//         { role: "Contractors", accessLevel: "View Only" },
//       ],
//     },
//     {
//       name: "Site Blueprint Rev.3",
//       category: "Blueprints",
//       type: "PDF",
//       lastModified: "2025-04-12",
//       status: "Under Review",
//       activityGraph: img2,
//       activityProgress: 65,
//       versionHistory: [
//         { version: "Version 3.0", date: "2025-04-05", author: "John Doe" },
//         { version: "Version 2.0", date: "2025-04-01", author: "Sarah Johnson" },
//         { version: "Version 1.0", date: "2025-03-28", author: "Michael Brown" },
//       ],
//       permissions: [
//         { role: "Project Managers", accessLevel: "Full Access" },
//         { role: "Site Engineers", accessLevel: "View & Comment" },
//         { role: "Contractors", accessLevel: "View Only" },
//       ],
//     },
//     {
//       name: "Safety Protocol 2025",
//       category: "Safety Documents",
//       type: "DOCX",
//       lastModified: "2025-04-10",
//       status: "Approved",
//       activityGraph: img3,
//       activityProgress: 65,
//       versionHistory: [
//         { version: "Version 3.0", date: "2025-04-05", author: "John Doe" },
//         { version: "Version 2.0", date: "2025-04-01", author: "Sarah Johnson" },
//         { version: "Version 1.0", date: "2025-03-28", author: "Michael Brown" },
//       ],
//       permissions: [
//         { role: "Project Managers", accessLevel: "Full Access" },
//         { role: "Site Engineers", accessLevel: "View & Comment" },
//         { role: "Contractors", accessLevel: "View Only" },
//       ],
//     },
//     {
//       name: "Q1 Progress Report",
//       category: "Reports",
//       type: "PPTX",
//       lastModified: "2025-04-05",
//       status: "Approved",
//       activityGraph: img4,
//       activityProgress: 65,
//       versionHistory: [
//         { version: "Version 3.0", date: "2025-04-05", author: "John Doe" },
//         { version: "Version 2.0", date: "2025-04-01", author: "Sarah Johnson" },
//         { version: "Version 1.0", date: "2025-03-28", author: "Michael Brown" },
//       ],
//       permissions: [
//         { role: "Project Managers", accessLevel: "Full Access" },
//         { role: "Site Engineers", accessLevel: "View & Comment" },
//         { role: "Contractors", accessLevel: "View Only" },
//       ],
//     },
//     {
//       name: "Environmental Compliance",
//       category: "Legal Documents",
//       type: "PDF",
//       lastModified: "2025-04-01",
//       status: "Draft",
//       activityGraph: img5,
//       activityProgress: 65,
//       versionHistory: [
//         { version: "Version 3.0", date: "2025-04-05", author: "John Doe" },
//         { version: "Version 2.0", date: "2025-04-01", author: "Sarah Johnson" },
//         { version: "Version 1.0", date: "2025-03-28", author: "Michael Brown" },
//       ],
//       permissions: [
//         { role: "Project Managers", accessLevel: "Full Access" },
//         { role: "Site Engineers", accessLevel: "View & Comment" },
//         { role: "Contractors", accessLevel: "View Only" },
//       ],
//     },
//     {
//       name: "Vendor Agreement 2025",
//       category: "Contracts",
//       type: "DOCX",
//       lastModified: "2025-03-28",
//       status: "Under Review",
//       activityGraph: img3,
//       activityProgress: 65,
//       versionHistory: [
//         { version: "Version 3.0", date: "2025-04-05", author: "John Doe" },
//         { version: "Version 2.0", date: "2025-04-01", author: "Sarah Johnson" },
//         { version: "Version 1.0", date: "2025-03-28", author: "Michael Brown" },
//       ],
//       permissions: [
//         { role: "Project Managers", accessLevel: "Full Access" },
//         { role: "Site Engineers", accessLevel: "View & Comment" },
//         { role: "Contractors", accessLevel: "View Only" },
//       ],
//     },
//     {
//       name: "Electrical System Layout",
//       category: "Blueprints",
//       type: "DWG",
//       lastModified: "2025-03-25",
//       status: "Approved",
//       activityGraph: img4,
//       activityProgress: 65,
//       versionHistory: [
//         { version: "Version 3.0", date: "2025-04-05", author: "John Doe" },
//         { version: "Version 2.0", date: "2025-04-01", author: "Sarah Johnson" },
//         { version: "Version 1.0", date: "2025-03-28", author: "Michael Brown" },
//       ],
//       permissions: [
//         { role: "Project Managers", accessLevel: "Full Access" },
//         { role: "Site Engineers", accessLevel: "View & Comment" },
//         { role: "Contractors", accessLevel: "View Only" },
//       ],
//     },
//     {
//       name: "Equipment Inspection Form",
//       category: "Safety Documents",
//       type: "PDF",
//       lastModified: "2025-03-20",
//       status: "Approved",
//       activityGraph: img2,
//       activityProgress: 65,
//       versionHistory: [
//         { version: "Version 3.0", date: "2025-04-05", author: "John Doe" },
//         { version: "Version 2.0", date: "2025-04-01", author: "Sarah Johnson" },
//         { version: "Version 1.0", date: "2025-03-28", author: "Michael Brown" },
//       ],
//       permissions: [
//         { role: "Project Managers", accessLevel: "Full Access" },
//         { role: "Site Engineers", accessLevel: "View & Comment" },
//         { role: "Contractors", accessLevel: "View Only" },
//       ],
//     },
//   ];

//   // Handle toggling view mode
//   const handleViewToggle = (mode) => {
//     setViewMode(mode);
//   };

//   return (
//     <div className="container mt-4">
//       <Row className="mb-4">
//         <Col className="d-flex justify-content-between">
//           <h3>All Documents</h3>
//           <div>
//             {/* <Button
//               variant="outline-primary"
//               className="me-2"
//               onClick={() => handleViewToggle("grid")}
//               active={viewMode === "grid"}
//             >
//               <FaTh className="me-2" />
//             </Button> */}
//             {/* <Button
//               onClick={() => handleViewToggle("list")}
//               active={viewMode === "list"}
//               variant="outline-primary"
//               className="me-2"
//             >
//               <FaList className="me-2" />
//             </Button> */}
//             <Button variant="outline-primary" onClick={handleShow}>
//               <div className="d-flex align-items-center">
//                 <FaUpload className="me-2" />
//                 upload
//               </div>
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       <UploadDocumentModal show={showUploadModal} handleClose={handleClose} />
//       {/* Grid View or List View based on the state */}
//       {viewMode === "grid" ? (
//         <Row>
//           {documents.map((doc, index) => (
//             <Col md={3} key={index} className="mb-4">
//               <Card>
//                 <Card.Img variant="top" src={doc.activityGraph} />
//                 <Card.Body>
//                   <Card.Title>{doc.name}</Card.Title>
//                   <Card.Text>{doc.type}</Card.Text>
//                   <Card.Footer>
//                     <Button
//                       variant="outline-primary"
//                       size="sm"
//                       className="me-2"
//                     >
//                       <FaFileDownload />
//                     </Button>
//                     <span
//                       className={`badge ${
//                         doc.status === "Approved"
//                           ? "bg-success"
//                           : doc.status === "Under Review"
//                           ? "bg-warning"
//                           : "bg-danger"
//                       }`}
//                     >
//                       {doc.status}
//                     </span>
//                   </Card.Footer>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <Table striped bordered hover responsive className="text-nowrap">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Type</th>
//               <th>Last Modified</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {documents.map((doc, index) => (
//               <tr key={index}>
//                 <td>{doc.name}</td>
//                 <td>{doc.category}</td>
//                 <td>{doc.type}</td>
//                 <td>{doc.lastModified}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       doc.status === "Approved"
//                         ? "bg-success"
//                         : doc.status === "Under Review"
//                         ? "bg-warning"
//                         : "bg-danger"
//                     }`}
//                   >
//                     {doc.status}
//                   </span>
//                 </td>
//                 <td>
//                   <Button
//                     variant="outline-success"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => handleShowViewModal(doc)}
//                   >
//                     View
//                   </Button>
//                   <Button variant="outline-primary" size="sm" className="me-2">
//                     Edit
//                   </Button>
//                   <Button variant="outline-danger" size="sm">
//                     Delete
//                   </Button>

//                   {selectedDocument && (
//                     <ViewDocumentModal
//                       show={showViewModal}
//                       handleClose={handleCloseViewModal}
//                       document={selectedDocument}
//                     />
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default DocumentManagement;

import React, { useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";

function Documents() {
  const [activeFolder, setActiveFolder] = useState("contracts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [documents] = useState([
    {
      id: 1,
      name: "Project Contract 2025",
      type: "PDF",
      submittedBy: "John Smith",
      status: "Approved",
      submissionDate: "2025-04-10",
      dueDate: "2025-04-25",
      assignedTo: "Sarah Johnson",
      comments: "All terms reviewed and approved by legal team.",
      folder: "contracts",
    },
    {
      id: 2,
      name: "Service Agreement",
      type: "DOCX",
      submittedBy: "Emily Davis",
      status: "Pending",
      submissionDate: "2025-04-15",
      dueDate: "2025-04-30",
      assignedTo: "Michael Brown",
      comments: "Waiting for final review from procurement.",
      folder: "contracts",
    },
    {
      id: 3,
      name: "Building Layout",
      type: "PDF",
      submittedBy: "Robert Wilson",
      status: "Under Review",
      submissionDate: "2025-04-12",
      dueDate: "2025-04-22",
      assignedTo: "Jessica Lee",
      comments: "Engineering team currently reviewing specifications.",
      folder: "blueprints",
    },
    {
      id: 4,
      name: "Q1 Financial Report",
      type: "XLSX",
      submittedBy: "David Miller",
      status: "Rejected",
      submissionDate: "2025-04-05",
      dueDate: "2025-04-15",
      assignedTo: "Amanda Clark",
      comments: "Figures need to be recalculated. Please revise and resubmit.",
      folder: "reports",
    },
    {
      id: 5,
      name: "ISO Certification",
      type: "PDF",
      submittedBy: "Thomas Anderson",
      status: "Approved",
      submissionDate: "2025-04-01",
      dueDate: "2025-04-20",
      assignedTo: "Jennifer White",
      comments: "All compliance requirements met.",
      folder: "compliance",
    },
    {
      id: 6,
      name: "Safety Protocol",
      type: "PDF",
      submittedBy: "Lisa Martin",
      status: "Pending",
      submissionDate: "2025-04-18",
      dueDate: "2025-05-02",
      assignedTo: "Christopher Taylor",
      comments: "Awaiting final approval from safety officer.",
      folder: "safety",
    },
  ]);

  const folders = [
    {
      id: "contracts",
      name: "Contracts",
      icon: "file-contract",
      count: documents.filter((doc) => doc.folder === "contracts").length,
    },
    {
      id: "blueprints",
      name: "Blueprints",
      icon: "drafting-compass",
      count: documents.filter((doc) => doc.folder === "blueprints").length,
    },
    {
      id: "reports",
      name: "Reports",
      icon: "chart-bar",
      count: documents.filter((doc) => doc.folder === "reports").length,
    },
    {
      id: "compliance",
      name: "Compliance Documents",
      icon: "clipboard-check",
      count: documents.filter((doc) => doc.folder === "compliance").length,
    },
    {
      id: "safety",
      name: "Safety Documents",
      icon: "hard-hat",
      count: documents.filter((doc) => doc.folder === "safety").length,
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    if (doc.folder !== activeFolder) return false;
    if (
      searchQuery &&
      !doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    if (selectedFilter !== "all" && doc.status.toLowerCase() !== selectedFilter)
      return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "badge bg-success";
      case "pending":
        return "badge bg-warning";
      case "under review":
        return "badge bg-info";
      case "rejected":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  const getFileTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "file-pdf";
      case "docx":
      case "doc":
        return "file-word";
      case "xlsx":
        return "file-excel";
      case "jpeg":
      case "jpg":
      case "png":
        return "file-image";
      default:
        return "file";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const activeFolderName =
    folders.find((folder) => folder.id === activeFolder)?.name || "";

  return (
    <>
      <div className="min-h-screen bg-light">
        {/* Header */}
        <header className="">
          <div className="container py-2">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 text-dark">Document Register</h1>
              {/* <div className="d-flex align-items-center">
                <span className="text-muted small">Welcome, Admin</span>
                <button className="btn btn-outline-secondary ms-4">
                  <i className="fas fa-bell"></i>
                </button>
                <button className="btn btn-outline-secondary ms-2">
                  <i className="fas fa-user-circle"></i>
                </button>
              </div> */}
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        {/* <div className="container py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Document Register</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {activeFolderName}
              </li>
            </ol>
          </nav>
        </div> */}

        {/* Main Content */}
        <main className="container py-4">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="h5">Folders</h2>
                <ul className="list-group">
                  {folders.map((folder) => (
                    <li key={folder.id} className="list-group-item">
                      <button
                        onClick={() => setActiveFolder(folder.id)}
                        className={`d-flex justify-content-between w-100 text-start btn  ${
                          activeFolder === folder.id ? "text-primary" : ""
                        }`}
                      >
                        <div className="d-flex align-items-center">
                          <i className={`fas fa-${folder.icon} me-2`}></i>
                          {folder.name}
                        </div>
                        <span className="badge bg-secondary">
                          {folder.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                {/* <div className="mt-4 pt-4 border-top">
                  <button className="btn btn-link text-primary">
                    <i className="fas fa-plus-circle me-2"></i> Add New Folder
                  </button>
                </div> */}
              </div>
            </div>

            {/* Document Table */}
            <div className="col-md-9">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-plus me-2 text-white"></i> Submit
                        New Document
                      </button>

                      <Dropdown className="ms-3">
                        <Dropdown.Toggle
                          variant="outline-secondary"
                          id="dropdown-custom-components"
                        >
                          {selectedFilter.charAt(0).toUpperCase() +
                            selectedFilter.slice(1)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {[
                            "all",
                            "approved",
                            "pending",
                            "under review",
                            "rejected",
                          ].map((status) => (
                            <Dropdown.Item
                              key={status}
                              onClick={() => setSelectedFilter(status)}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Search documents..."
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Document Name</th>
                        <th>Type</th>
                        <th>Submitted By</th>
                        <th>Status</th>
                        <th>Submission Date</th>
                        <th>Due Date</th>
                        <th>Assigned To</th>
                        <th>Comments</th>
                        <th className="pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="bg-white py-3">
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center">
                              <i
                                className={`fas fa-${getFileTypeIcon(
                                  doc.type
                                )} me-2`}
                              ></i>
                              {doc.name}
                            </div>
                          </td>
                          <td className="py-3">{doc.type}</td>
                          <td className="py-3">{doc.submittedBy}</td>
                          <td className="py-3">
                            <span className={getStatusColor(doc.status)}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3">{doc.submissionDate}</td>
                          <td className="py-3">{doc.dueDate}</td>
                          <td className="py-3">{doc.assignedTo}</td>
                          <td className="py-3">{doc.comments}</td>
                          <td className="pe-4 py-3">
                            <button className="btn p-0 me-2">
                              <i className="fas fa-eye text-info"></i>
                            </button>
                            <button className="btn p-0 me-2">
                              <i className="fas fa-check-circle text-success"></i>
                            </button>
                            <button className="btn p-0 text-danger">
                              <i className="fas fa-times-circle text-danger"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit New Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="folder" className="mb-3">
              <Form.Label>Folder</Form.Label>
              <Form.Select defaultValue={activeFolder}>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="documentName" className="mb-3">
              <Form.Label>Document Name</Form.Label>
              <Form.Control type="text" placeholder="Enter document name" />
            </Form.Group>
            <Form.Group controlId="documentType" className="mb-3">
              <Form.Label>Document Type</Form.Label>
              <Form.Select>
                <option>PDF</option>
                <option>DOCX</option>
                <option>XLSX</option>
                <option>JPEG</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="assignedTo" className="mb-3">
              <Form.Label>Assign To</Form.Label>
              <Form.Select>
                <option>Sarah Johnson</option>
                <option>Michael Brown</option>
                <option>Jessica Lee</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="dueDate" className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="comments" className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit Document
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Documents;
