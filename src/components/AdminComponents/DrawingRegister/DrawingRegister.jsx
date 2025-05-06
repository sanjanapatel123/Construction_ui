
import React, { useEffect, useState } from "react";
import {
  Modal, Button, InputGroup, FormControl, ListGroup, Row, Col, Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding, faLayerGroup, faWater, faCogs, faSearch, faUpload, faThLarge, faList, faEye, faEdit, faTrash,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import ViewDocument from "./ViewDocument";
import { useDispatch, useSelector } from "react-redux";
import { addDrawings, deleteDrawings, fetchDrawings, fetchSingleDrawings, updatedrawings, } from "../../../redux/slices/drawingsSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { fetchUsers } from "../../../redux/slices/userSlice";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch()


  const handleFolderClick = (folder) => {
    setActiveFolder(folder);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // All User name
  const { data: users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  // All Drawing list
  const { drawings_arr } = useSelector((state) => state.drawings);
  console.log("Drawings:", drawings_arr.drawingRegisters);
  useEffect(() => {
    dispatch(fetchDrawings());
  }, [dispatch]);

  // filter Folders
  const filteredDocuments = folders.filter(
    (doc) =>
      doc.folderId === activeFolder.id &&
      (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  const toggleUploadModal = (isEdit = false, doc = null) => {
    if (isEdit && doc) {
      setIsEditing(true);
      setEditingId(doc._id);
      setFormData({
        documentTitle: doc.documentTitle || "",
        documentType: doc.documentType || "",
        folder: doc.folder || "",
        assignedTo: doc.assignedTo?._id || "",
        comments: doc.comments || "",
        existingImage: doc.image || [],
        image: [],
        status: doc.status || "",
      });
    } else {
      setIsEditing(false);
      setEditingId(null);

      setFormData({
        documentTitle: "",
        documentType: "",
        folder: "",
        assignedTo: "",
        comments: "",
        existingImage: [],
        image: [],
        status: "",
      });
    }
    setShowUploadModal(!showUploadModal);
  };
  const openViewModal = (doc) => {
    setSelectedDoc(doc);
  };

  const closeViewModal = () => {
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

  // add 
  const [formData, setFormData] = useState({
    documentTitle: "",
    documentType: "",
    folder: "",
    assignedTo: "",
    comments: "",
    image: null,
    status: "",
  });
  const { documentTitle, documentType, folder, assignedTo, comments, image, status } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        image: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updateFormData = { ...formData };
      if (!updateFormData.image) {
        delete updateFormData.image;
      }
      delete updateFormData.existingImage;
      dispatch(updatedrawings({
        id: editingId,
        updatedForm: updateFormData
      })).unwrap().then(() => {
        toast.success("Document updated successfully!");
        setShowUploadModal(false);
        dispatch(fetchDrawings());
      }).catch((error) => {
        toast.error(error?.response?.data?.message || "Failed to update document!");
      });
    } else {
      const newFormData = { ...formData };
      delete newFormData.existingImage;
      dispatch(addDrawings(newFormData)).unwrap().then(() => {
        toast.success("Document uploaded successfully!");
        setShowUploadModal(false);
        dispatch(fetchDrawings());
      }).catch((error) => {
        toast.error(error?.response?.data?.message || "Failed to upload document!");
      });
    }
  };


  // dlete list 
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDrawings(id))
          .then(() => {
            Swal.fire("Deleted!", "The document has been deleted.", "success");
            dispatch(fetchDrawings());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleViewDocument = (_id) => {
    dispatch(fetchSingleDrawings(_id))
  }

  const handleEdit = (doc) => {
    toggleUploadModal(true, doc);
  }

  return (
    <div className="d-flex flex-column flex-md-row h-100">
      <div className="col-12 col-md-3 bg-white p-3">
        <h3 className="h3">
          <FontAwesomeIcon icon={activeFolder.icon} />Drawing Register
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
          onClick={() => toggleUploadModal(false)}
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
          Showing {drawings_arr?.drawingRegisters?.length || 0} documents in {activeFolder.name}
        </div>

        {viewMode === "grid" ? (
          <Row xs={1} md={2} lg={3} className="g-3">
            {drawings_arr?.drawingRegisters?.length > 0 &&
              drawings_arr?.drawingRegisters?.map((drawing) => (
                <Col key={drawing._id}>
                  <div className="card shadow-sm">
                    <div className="card-body">

                      <img
                        src={drawing.image?.[0]}
                        alt="Uploaded Image"
                        className="img-fluid"
                        style={{ height: "150px" }}
                      />


                      <h5 className="card-title">
                        {drawing.documentTitle}
                      </h5>


                      <small>
                        Folder: {drawing?.folder}
                      </small>


                      <p className="card-text">
                        Type: {drawing?.documentType}
                      </p>

                      <span className={`badge ${getStatusColorClass(drawing?.status)}`}>
                        {drawing.status}
                      </span>


                      <div className="d-flex justify-content-between mt-2">
                        <small>Assigned To: {drawing.assignedTo?.firstName}</small>
                        <small>Last Updated: {new Date(drawing.updatedAt).toLocaleDateString()}</small>
                      </div>

                      <p className="card-text mt-2">
                        Comments: {drawing.comments}
                      </p>


                      {/* <div className="d-flex justify-content-end mt-2">
                        <button
                          className="btn btn-link p-0 me-2"
                          onClick={() => {
                            openViewModal(drawing);
                            handleViewDocument(drawing._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button 
                          className="btn btn-link p-0 me-2"
                          onClick={() => handleEdit(drawing)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button 
                          className="btn btn-link p-0"
                          onClick={() => handleDelete(drawing._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div> */}
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
                {drawings_arr?.drawingRegisters?.length > 0 &&
                  drawings_arr.drawingRegisters.map((doc) => (
                    <tr key={doc._id} className="bg-white py-3">
                      <td className="ps-4 py-3 d-flex align-items-center">
                        <img src={doc.image?.[0]} alt="Uploaded Image" className="me-2" style={{ height: "60px", width: "60px" }} />
                        {/* <div>
                          <strong>{doc.documentTitle}</strong>
                          <div><small>{doc.documentType}</small></div>
                        </div> */}
                      </td>
                      <td className="py-3">
                        <span className={`badge ${getStatusColorClass(doc.status)}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3">{doc.assignedTo?.firstName}</td>
                      <td className="py-3">{new Date(doc.updatedAt).toLocaleDateString()}</td>
                      <td className="py-3">{doc.comments}</td>
                      <td className="pe-4 py-3">
                        <button
                          className="btn btn-link p-0 me-2"
                          onClick={() => {
                            openViewModal(doc);
                            handleViewDocument(doc._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                          className="btn btn-link p-0 me-2"
                          onClick={() => handleEdit(doc)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="btn btn-link p-0"
                          onClick={() => handleDelete(doc._id)}
                        >
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

      <Modal show={!!selectedDoc} onHide={closeViewModal} >
        <ViewDocument document={selectedDoc} />
      </Modal>

      <Modal
        show={showUploadModal}
        onHide={() => toggleUploadModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Update Drawing" : "Upload New Drawing"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <div className="text-center mb-4">
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                size="4x"
                className="text-muted"
              />
              <p className="mt-3">
                {isEditing ? "Upload a new file or keep the existing one" : "Drag and drop your files here or click to browse"}
              </p>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={handleFileChange} />
                {isEditing && <small className="text-muted">Leave empty to keep the current file</small>}
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Document Title</Form.Label>
              <Form.Control
                type="text"
                name="documentTitle"
                value={documentTitle}
                onChange={handleInputChange}
                placeholder="Enter document title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Document Type</Form.Label>
              <Form.Select
                name="documentType"
                value={documentType}
                onChange={handleInputChange}
              >
                <option value="">Select document type</option>
                <option value="Blueprint">Blueprint</option>
                <option value="Electrical Plan">Electrical Plan</option>
                <option value="Mechanical Drawing">Mechanical Drawing</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Folder</Form.Label>
              <Form.Select
                name="folder"
                value={folder}
                onChange={handleInputChange}
              >
                <option value="">Select folder</option>
                <option value="Architectural Drawing">Architectural Drawing</option>
                <option value="Structural Drawing">Structural Drawing</option>
                <option value="Hydraulic Drawings">Hydraulic Drawings</option>
                <option value="Mechanical Drawings">Mechanical Drawings</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={status}
                onChange={handleInputChange}
              >
                <option value="">Select status</option>
                <option value="Approved">Approved</option>
                <option value="Not Approved">Not Approved</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assigned To</Form.Label>
              <Form.Select
                name="assignedTo"
                value={assignedTo}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select assignee</option>
                {users?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                name="comments"
                rows={3}
                value={comments}
                onChange={handleInputChange}
                placeholder="Add any additional notes"
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => toggleUploadModal(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {isEditing ? "Update" : "Upload"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DrawingRegister;


