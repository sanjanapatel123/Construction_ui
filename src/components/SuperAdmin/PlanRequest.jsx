import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addplanRequests, deleteplanRequest, fetchplanRequests, PlanRequestApproveStatus } from "../../redux/slices/Superadmin/planRequestSlice";

// import { fetchplanRequests, addplanRequests, updateplanRequest } from "./yourReduxActions";
import { Modal, Form, Button } from "react-bootstrap";
// import toast from "react-toastify";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const initialPlans = [
  {
    companyName: "R-Tech Constructions",
    planName: "Basic Plan",
    activeProjects: 5,
    siteEngineers: 2,
    dailyVisits: 50,
    reports: "Unlimited",
    duration: "Yearly",
    date: "20 Apr 2025",
  },
  {
    companyName: "SkyBuild Infra",
    planName: "Standard Plan",
    activeProjects: 15,
    siteEngineers: 5,
    dailyVisits: 100,
    reports: "Unlimited",
    duration: "Yearly",
    date: "11 May 2025",
  },
  {
    companyName: "UrbanCraft Projects",
    planName: "Enterprise Plan",
    activeProjects: "Unlimited",
    siteEngineers: "Unlimited",
    dailyVisits: "Unlimited",
    reports: "Unlimited",
    duration: "Yearly",
    date: "1 Jun 2025",
  },
];

const PlanRequest = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [searchTerm, setSearchTerm] = useState("");

  // const handleDelete = (index) => {
  //   const updatedPlans = plans.filter((_, i) => i !== index);
  //   setPlans(updatedPlans);
  // };

  const filteredPlans = plans.filter((plan) =>
    plan.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // \\\\\\\\\\\\\
  // All Plan
  const dispatch = useDispatch();
  const { planRequests } = useSelector((state) => state.planRequest);
  console.log(planRequests);

  useEffect(() => {
    dispatch(fetchplanRequests());
  }, [dispatch]);

  // Add plan
  useEffect(() => {
    dispatch(fetchplanRequests());
  }, [dispatch]);

  // Add plan
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    Phone: "",
    preferredContact: {
      email: "false",
      Phone: "false",
    },
    additional: "",
  });

  const toggleUploadModal = (isEdit = false, doc = null) => {
    if (isEdit && doc) {
      setIsEditing(true);
      setEditingId(doc._id);
      setFormData({
        fullName: doc.fullName || "",
        email: doc.email || "",
        Phone: doc.Phone || "",
        preferredContact: {
          email: doc.preferredContact?.email || "false",
          Phone: doc.preferredContact?.Phone || "false",
        },
        additional: doc.additional || "",
      });
    } else {
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        fullName: "",
        email: "",
        Phone: "",
        preferredContact: {
          email: "false",
          Phone: "false",
        },
        additional: "",
      });
    }
    setShowUploadModal(!showUploadModal);
  };
  
  const handleInputChange = (e) => {
  const { name, value } = e.target;
    if (name === "preferredContact") {
      setFormData({
        ...formData,
        preferredContact: {
          email: value === "email" ? "true" : "false",
          Phone: value === "Phone" ? "true" : "false",
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
    toggleUploadModal(false);

    const payload = { ...formData };

    if (isEditing) {
      dispatch(updateplanRequest({
        id: editingId,
        updatedForm: payload,
      }))
        .unwrap()
        .then(() => {
          toast.success("planPackage updated successfully!");
          setShowUploadModal(false);
          dispatch(fetchplanRequests());
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Failed to update planPackage!");
        });
    } else {
      dispatch(addplanRequests(payload))
        .unwrap()
        .then(() => {
          toast.success("planPackage uploaded successfully!");
          setShowUploadModal(false);
          dispatch(fetchplanRequests());
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Failed to upload planPackage!");
        });
    }
  };

  const handleEdit = (plan) => {
    toggleUploadModal(true, plan);
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
        dispatch(deleteplanRequest(id))
          .then(() => {
            Swal.fire("Deleted!", "The planPackage has been deleted.", "success");
            dispatch(fetchplanRequests());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };
  
  const ApproveStatus = async (_id, approve) => {
    try {
      await dispatch(PlanRequestApproveStatus({ _id, approve })).unwrap();
      toast.success("planPackage uploaded successfully!");
      setShowUploadModal(false);
      dispatch(fetchplanRequests());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to upload planPackage!");
    }
  };



  return (
    <div className="container p-4">
      <header className="container-fluid bg-white shadow-sm p-3 rounded mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="input-group rounded search-bar">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search by Company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "250px" }}
              />
              <span className="input-group-text bg-transparent border-0">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end align-items-center">
            <div className="me-4 fw-bold">Superadmin</div>
          </div>
        </div>
      </header>

      <div className="col-12 d-flex justify-content-between align-items-center">
        <h2 className="mb-3">Plan Requests</h2>
        <button className="btn btn-primary" onClick={() => toggleUploadModal(true)}>
          Create Plan
        </button>
      </div>


      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>preferredContact</th>
              <th>additional</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {planRequests.map((plan, index) => (
              <tr key={index}>
                <td>{plan.fullName}</td>
                <td>{plan.email}</td>
                <td>{plan.Phone}</td>

                {/* Site Engineers Column */}
                <td>
                  {plan.preferredContact.map((contact, idx) => (
                    <div key={idx}>
                      {contact.email === "true" && <div>Email</div>}
                      {contact.Phone === "true" && <div>Phone</div>}
                    </div>
                  ))}
                </td>
                <td>{plan.additional}</td>
                <td className="flex gap-1 items-center">
                  <button
                    className="btn btn-success btn-sm w-100 "
                    onClick={() => {
                      if (plan.approve === true) {
                        ApproveStatus(plan._id, 0);
                      } else {
                        if (window.confirm("Are you sure you want to approve this plan?")) {
                          ApproveStatus(plan._id, 1);
                        }
                      }
                    }}
                  >
                    {plan.approve ? "Approve" : "Unapprove"}
                  </button>

                  <button
                    className="btn text-danger p-0"
                    onClick={() => handleDelete(plan._id)}
                  >
                    <i className="fa-solid fa-trash fs-5"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPlans.length === 0 && (
          <p className="text-center text-muted">No matching requests found.</p>
        )}
      </div>
      <div className="d-flex justify-content-end mt-3 mb-3">
        <Button size="sm" variant="outline-secondary" className="me-2">
          Previous
        </Button>
        <Button size="sm" variant="primary" className="ms-2">
          1
        </Button>
        <Button size="sm" variant="outline-secondary" className="ms-2">
          2
        </Button>
        <Button size="sm" variant="outline-secondary" className="ms-2">
          Next
        </Button>
      </div>

      {/* Button to open modal */}
      <Modal show={showUploadModal} onHide={() => toggleUploadModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Update Plan" : "Upload New Plan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                placeholder="Enter Phone"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preferred Contact</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Email"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact.email === "true"}
                  onChange={handleInputChange}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Phone"
                  name="preferredContact"
                  value="Phone"
                  checked={formData.preferredContact.Phone === "true"}
                  onChange={handleInputChange}
                  inline
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional</Form.Label>
              <Form.Control
                type="text"
                name="additional"
                value={formData.additional}
                onChange={handleInputChange}
                placeholder="Enter report type"
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
};

export default PlanRequest;
