
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocuments, addDocument, updateDocument, deleteDocument } from "../../../redux/slices/documentSlice";
import Swal from "sweetalert2";
import { fetchUsers } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";

function Documents() {
  const dispatch = useDispatch();
  const { documents, loading } = useSelector((state) => state.document);
   const users = useSelector((state) => state.users.data);

  const [activeFolder, setActiveFolder] = useState("contracts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [editingDocument, setEditingDocument] = useState(null);
  const [formData, setFormData] = useState({
    documentName: "",
    documentType: "PDF",
    status: "Pending",
    dueDate: "",
    assignTo: "",
    comments: "",
    image: [],
    folder: activeFolder,
  });

  useEffect(() => {
    fetchUsers()
  }, [])
  

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleDelete = (id) => {
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
        dispatch(deleteDocument(id))
          .then(() => {
            Swal.fire("Deleted!", "The document has been deleted.", "success");
            dispatch(fetchDocuments());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const folders = [
    { id: "contracts", name: "Contracts", icon: "file-contract", count: documents.filter((doc) => doc.folder === "contracts").length },
    { id: "blueprints", name: "Blueprints", icon: "drafting-compass", count: documents.filter((doc) => doc.folder === "blueprints").length },
    { id: "reports", name: "Reports", icon: "chart-bar", count: documents.filter((doc) => doc.folder === "reports").length },
    { id: "compliance", name: "Compliance Documents", icon: "clipboard-check", count: documents.filter((doc) => doc.folder === "compliance").length },
    { id: "safety", name: "Safety Documents", icon: "hard-hat", count: documents.filter((doc) => doc.folder === "safety").length },
  ];

  const filteredDocuments = documents.filter((doc) => {
    if (doc.folder !== activeFolder) return false;
    if (searchQuery && !(
      doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.assignTo.toLowerCase().includes(searchQuery.toLowerCase())
    )) return false;
    if (selectedFilter !== "all" && doc.status.toLowerCase() !== selectedFilter.toLowerCase()) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved": return "badge bg-success";
      case "pending": return "badge bg-warning";
      case "under review": return "badge bg-info";
      case "rejected": return "badge bg-danger";
      default: return "badge bg-secondary";
    }
  };

  const getFileTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "pdf": return "file-pdf";
      case "docx":
      case "doc": return "file-word";
      case "xlsx": return "file-excel";
      case "jpeg":
      case "jpg":
      case "png": return "file-image";
      default: return "file";
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOpenModal = (doc = null) => {
    if (doc) {
      setEditingDocument(doc);
      setFormData({
        documentName: doc.documentName,
        documentType: doc.documentType,
        status: doc.status,
        dueDate: new Date(doc.dueDate).toISOString().split('T')[0],
        assignTo: doc.assignTo,
        comments: doc.comments,
        folder: doc.folder,
      });
    } else {
      setEditingDocument(null);
      setFormData({
        documentName: "",
        documentType: "PDF",
        status: "Pending",
        dueDate: "",
        assignTo: "",
        comments: "",
        image: [],
        folder: activeFolder,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const submissionDate = today.toISOString().split('T')[0];

    const documentData = new FormData();
    documentData.append("documentName", formData.documentName);
    documentData.append("documentType", formData.documentType);
    documentData.append("status", formData.status);
    documentData.append("dueDate", formData.dueDate);
    documentData.append("assignTo", formData.assignTo);
    documentData.append("comments", formData.comments);
    documentData.append("folder", formData.folder);
    documentData.append("submissionDate", submissionDate);
    if (formData.image) {
      documentData.append("image", formData.image);
    }

    if (editingDocument) {
      dispatch(updateDocument({ id: editingDocument.id, updatedData: documentData })).unwrap()
      toast.success("Document updated successfully!");
    } else {
      dispatch(addDocument(documentData)).unwrap()
      toast.success("Document submitted successfully!");
    }

    setIsModalOpen(false);
    setFormData({
      documentName: "",
      documentType: "PDF",
      status: "Pending",
      dueDate: "",
      assignTo: "",
      comments: "",
      image: [],
      folder: activeFolder,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-light">
        <header className="">
          <div className="container py-2">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 text-dark">Document Register</h1>
            </div>
          </div>
        </header>

        <main className="container py-4">
          <div className="row">
            <div className="col-md-3">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="h5">Folders</h2>
                <ul className="list-group">
                  {folders.map((folder) => (
                    <li key={folder.id} className="list-group-item">
                      <button
                        onClick={() => setActiveFolder(folder.id)}
                        className={`d-flex justify-content-between w-100 text-start btn ${
                          activeFolder === folder.id ? "text-primary" : ""
                        }`}
                      >
                        <div className="d-flex align-items-center">
                          <i className={`fas fa-${folder.icon} me-2`}></i>
                          {folder.name}
                        </div>
                        <span className="badge bg-secondary">{folder.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-9">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <button onClick={() => handleOpenModal()} className="btn btn-primary">
                        <i className="fas fa-plus me-2 text-white"></i> Submit New Document
                      </button>

                      <Dropdown className="ms-3">
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-custom-components">
                          {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {["all", "approved", "pending", "under review", "rejected"].map((status) => (
                            <Dropdown.Item key={status} onClick={() => setSelectedFilter(status)}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    <Form.Control
                      type="text"
                      placeholder="Search by Name or Assignee"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ width: "250px" }}
                    />
                  </div>
                </div>

                <div className="p-4">
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Document Name</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Due Date</th>
                          <th>Assign To</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                       
                        {filteredDocuments.map((doc) => (
                          console.log(doc),
                          <tr key={doc._id}>
                            <td><i className={`fas fa-${getFileTypeIcon(doc.documentType)} me-2`}></i>{doc.documentName}</td>
                            <td>{doc.documentType}</td>
                            <td><span className={getStatusColor(doc.status)}>{doc.status}</span></td>
                            <td>{new Date(doc.dueDate).toLocaleDateString()}</td>
                            <td>{doc.assignTo?.firstName} {doc.assignTo?.lastName}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(doc)}>
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(doc._id)}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingDocument ? "Edit Document" : "Submit New Document"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="documentName" className="mb-3">
                <Form.Label>Document Name</Form.Label>
                <Form.Control type="text" name="documentName" value={formData.documentName} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group controlId="documentType" className="mb-3">
                <Form.Label>Document Type</Form.Label>
                <Form.Control as="select" name="documentType" value={formData.documentType} onChange={handleInputChange}>
                  <option>PDF</option>
                  <option>DOCX</option>
                  <option>XLSX</option>
                  <option>JPEG</option>
                  <option>PNG</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="dueDate" className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group controlId="assignTo" className="mb-3">
                <Form.Label>Assign To</Form.Label>
                <Form.Select  name="assignTo" value={formData.assignTo} onChange={handleInputChange} required >

                  <option value="">Select User</option>
                  {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name || `${user.firstName} ${user.lastName}`}
                  </option>
                ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="status" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" value={formData.status} onChange={handleInputChange}>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Under Review</option>
                  <option>Rejected</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comments" className="mb-3">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" name="comments" value={formData.comments} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="image" className="mb-3">
                <Form.Label>Upload File</Form.Label>
                <Form.Control type="file" name="image" onChange={handleInputChange} />
              </Form.Group>
              <Button type="submit" variant="primary">{editingDocument ? "Update" : "Submit"}</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Documents;
