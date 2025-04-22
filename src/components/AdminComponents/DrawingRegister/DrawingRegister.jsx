import React, { useState } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faLayerGroup,
  faWater,
  faCogs,
  faSearch,
  faUpload,
  faThLarge,
  faList,
  faEye,
  faEdit,
  faTrash,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import ViewDocument from "./ViewDocument";

function DrawingRegister() {
  const folders = [
    { id: 1, name: "Architectural Drawings", icon: faBuilding },
    { id: 2, name: "Structural Drawings", icon: faLayerGroup },
    { id: 3, name: "Hydraulic Drawings", icon: faWater },
    { id: 4, name: "Mechanical Drawings", icon: faCogs },
  ];

  const documentsData = [
    {
      id: 1,
      folderId: 1,
      name: "Floor Plan - Level 1",
      type: "Floor Plan",
      status: "Approved",
      assignedTo: "John Smith",
      lastModified: "2025-04-15",
      comments: "Final version approved by client",
    },
    {
      id: 2,
      folderId: 1,
      name: "Elevation - North Facade",
      type: "Elevation",
      status: "Approved",
      assignedTo: "Emily Johnson",
      lastModified: "2025-04-12",
      comments: "Updated with new window dimensions",
    },
    {
      id: 3,
      folderId: 1,
      name: "Site Plan",
      type: "Site Plan",
      status: "Pending",
      assignedTo: "Michael Chen",
      lastModified: "2025-04-17",
      comments: "Awaiting final approval from city council",
    },
    {
      id: 4,
      folderId: 2,
      name: "Foundation Details",
      type: "Foundation",
      status: "Approved",
      assignedTo: "Sarah Williams",
      lastModified: "2025-04-10",
      comments: "Includes updated load calculations",
    },
    {
      id: 5,
      folderId: 2,
      name: "Beam Layout",
      type: "Structural",
      status: "Approved",
      assignedTo: "David Lee",
      lastModified: "2025-04-08",
      comments: "Final version with engineer stamp",
    },
    {
      id: 6,
      folderId: 3,
      name: "Plumbing Schematic",
      type: "Plumbing",
      status: "Approved",
      assignedTo: "Jessica Taylor",
      lastModified: "2025-04-05",
      comments: "Updated with new fixture specifications",
    },
    {
      id: 7,
      folderId: 4,
      name: "HVAC Layout",
      type: "HVAC",
      status: "Pending",
      assignedTo: "Robert Johnson",
      lastModified: "2025-04-18",
      comments: "Needs final review for energy efficiency",
    },
  ];

  const [activeFolder, setActiveFolder] = useState(folders[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filteredDocuments = documentsData.filter(
    (doc) =>
      doc.folderId === activeFolder.id &&
      (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFolderClick = (folder) => {
    setActiveFolder(folder);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleUploadModal = () => {
    setShowUploadModal(!showUploadModal);
  };

  const openViewModal = (doc) => {
    setSelectedDoc(doc);
  };

  const closeViewModal = () => {
    console.log("Modal closed"); // DEBUG check
    setSelectedDoc(null);
  };


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

  return (
    <div className="d-flex flex-column flex-md-row h-100">
      <div className="col-12 col-md-3 bg-white p-3">
        <h3 className="h3">
          <FontAwesomeIcon icon={activeFolder.icon} /> Drawing Register
        </h3>
        <p className="text-muted">Document Management System</p>

        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <FormControl
            placeholder="Search folders..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>

        <h5>Folders</h5>
        <ListGroup>
          {folders.map((folder) => (
            <ListGroup.Item
              key={folder.id}
              action
              onClick={() => handleFolderClick(folder)}
              active={activeFolder.id === folder.id}
            >
              <FontAwesomeIcon icon={folder.icon} className="me-2" />
              {folder.name}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Button
          variant="primary"
          className="mt-3 w-100"
          onClick={toggleUploadModal}
        >
          <FontAwesomeIcon icon={faUpload} className="me-2" /> Upload New
          Drawing
        </Button>
      </div>

      <div className="col-12 col-md-9 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>{activeFolder.name}</h3>
          <div>
            <Button
              variant="outline-secondary"
              onClick={() => setViewMode("grid")}
            >
              <FontAwesomeIcon icon={faThLarge} />
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => setViewMode("list")}
            >
              <FontAwesomeIcon icon={faList} />
            </Button>
          </div>
        </div>

        <div className="mb-3">
          Showing {filteredDocuments.length} documents in {activeFolder.name}
        </div>

        {viewMode === "grid" ? (
          <Row xs={1} md={2} lg={3} className="g-3">
            {filteredDocuments.map((doc) => (
              <Col key={doc.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{doc.name}</h5>
                    <p className="card-text">{doc.type}</p>
                    <span
                      className={`badge ${getStatusColorClass(
                        doc.status
                      )} mb-2`}
                    >
                      {doc.status}
                    </span>
                    <div className="d-flex justify-content-between">
                      <small>{doc.assignedTo}</small>
                      <small>{doc.lastModified}</small>
                    </div>
                    <p className="card-text">{doc.comments}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Document</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Last Modified</th>
                <th>Comments</th>
                <th className="pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="bg-white py-3">
                  <td className="ps-4 py-3">{doc.name}</td>
                  <td className="py-3">
                    <span className={`badge ${getStatusColorClass(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3">{doc.assignedTo}</td>
                  <td className="py-3">{doc.lastModified}</td>
                  <td className="py-3">{doc.comments}</td>
                  <td className="pe-4 py-3">
                    <button
                      className="btn btn-link p-0 me-2"
                      onClick={() => openViewModal(doc)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="btn btn-link p-0 me-2">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-link p-0">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        )}
      </div>

      <Modal show={!!selectedDoc} onHide={closeViewModal} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Document Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <ViewDocument document={selectedDoc} />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeViewModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


      <Modal
        show={showUploadModal}
        onHide={toggleUploadModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload New Drawing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              size="4x"
              className="text-muted"
            />
            <p className="mt-3">
              Drag and drop your files here or click to browse
            </p>
            <Button variant="primary">Browse Files</Button>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Document Title</Form.Label>
              <Form.Control type="text" placeholder="Enter document title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Document Type</Form.Label>
              <Form.Select>
                <option>Select document type</option>
                <option>Blueprint</option>
                <option>Electrical Plan</option>
                <option>Mechanical Drawing</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Folder</Form.Label>
              <Form.Select>
                <option>Architectural Drawing</option>
                <option>Structural Drawing</option>
                <option>Site Plans</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add any additional notes"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleUploadModal}>
            Close
          </Button>
          <Button variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DrawingRegister;
