import { addplanRequests, fetchplanRequests, updateplanRequest } from "../../redux/slices/Superadmin/planRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { fetchplanRequests, addplanRequests, updateplanRequest } from "./yourReduxActions";
import { Modal, Form, Button } from "react-bootstrap";
// import toast from "react-toastify";

const initialPlans = [
  {
    companyfullName: "R-Tech Constructions",
    planfullName: "Basic Plan",
    Phone: 5,
    preferredContact: 2,
    dailyVisits: 50,
    reports: "Unlimited",
    duration: "Yearly",
    date: "20 Apr 2025",
  },
  {
    companyfullName: "SkyBuild Infra",
    planfullName: "Standard Plan",
    Phone: 15,
    preferredContact: 5,
    dailyVisits: 100,
    reports: "Unlimited",
    duration: "Yearly",
    date: "11 May 2025",
  },
  {
    companyfullName: "UrbanCraft Projects",
    planfullName: "Enterprise Plan",
    Phone: "Unlimited",
    preferredContact: "Unlimited",
    dailyVisits: "Unlimited",
    reports: "Unlimited",
    duration: "Yearly",
    date: "1 Jun 2025",
  },
];

const PlanRequest = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  };

  const filteredPlans = plans.filter((plan) =>
    plan.companyfullName.toLowerCase().includes(searchTerm.toLowerCase())
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
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    Phone: "",
    preferredContact: "",
    additional: "",
  });

  const { fullName, email, Phone, preferredContact, additional } = formData;

  const toggleUploadModal = (isEdit = false, doc = null) => {
    if (isEdit && doc) {
      setIsEditing(true);
      setEditingId(doc._id);
      setFormData({
        fullName: doc.fullName || "",
        email: doc.email || "",
        Phone: doc.features.Phone || "",
        preferredContact: doc.features.preferredContact || "",
        additional: doc.features.additional || "",
      });
    } else {
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        fullName: "",
        email: "",
        Phone: "",
        preferredContact: "",
        additional: "",
      });
    }
    setShowUploadModal(!showUploadModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleUploadModal(false);

    if (isEditing) {
      const updateFormData = { ...formData };
      if (!updateFormData.image) {
        delete updateFormData.image;
      }
      delete updateFormData.existingImage;
      dispatch(updateplanRequest({
        id: editingId,
        updatedForm: updateFormData,
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
      const newFormData = { ...formData };
      delete newFormData.existingImage;

      dispatch(addplanRequests(newFormData))
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
  // const handleDelete = (id) => {
  //   console.log(id);
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deletePlan(id))
  //         .then(() => {
  //           Swal.fire("Deleted!", "The planPackage has been deleted.", "success");
  //           dispatch(fetchPlans());
  //         })
  //         .catch(() => {
  //           Swal.fire("Error!", "Something went wrong.", "error");
  //         });
  //     }
  //   });
  // };
  return (
    <div classfullName="container p-4">
      <header classfullName="container-fluid bg-white shadow-sm p-3 rounded mb-4">
        <div classfullName="row align-items-center">
          <div classfullName="col-md-6">
            <div classfullName="input-group rounded search-bar">
              <input
                type="text"
                classfullName="form-control border-0"
                placeholder="Search by Company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "250px" }}
              />
              <span classfullName="input-group-text bg-transparent border-0">
                <i classfullName="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div classfullName="col-md-6 d-flex justify-content-md-end align-items-center">
            <div classfullName="me-4 fw-bold">Superadmin</div>
          </div>
        </div>
      </header>

      <div classfullName="col-12 d-flex justify-content-between align-items-center">
        <h2 classfullName="mb-3">Plan Requests</h2>
        <button className="btn btn-primary" onClick={() => toggleUploadModal(true)}>
          Create Plan
        </button>
      </div>
      <div classfullName="table-responsive">
        <table classfullName="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Full fullName</th>
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
                <td>{plan.fullfullName}</td>
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
                <td>
                  <button classfullName="btn btn-success btn-sm me-2">Approve</button>
                  <button
                    classfullName="btn text-danger p-0"
                    onClick={() => handleDelete(index)}
                  >
                    <i classfullName="fa-solid fa-trash fs-5"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPlans.length === 0 && (
          <p classfullName="text-center text-muted">No matching requests found.</p>
        )}
      </div>
      <div classfullName="d-flex justify-content-end mt-3 mb-3">
        <Button size="sm" variant="outline-secondary" classfullName="me-2">
          Previous
        </Button>
        <Button size="sm" variant="primary" classfullName="ms-2">
          1
        </Button>
        <Button size="sm" variant="outline-secondary" classfullName="ms-2">
          2
        </Button>
        <Button size="sm" variant="outline-secondary" classfullName="ms-2">
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
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleInputChange}
                placeholder="Enter plan fullName"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter plan email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Active Projects</Form.Label>
              <Form.Control
                type="number"
                name="Phone"
                value={Phone}
                onChange={handleInputChange}
                placeholder="Enter number of active projects"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Site Engineers</Form.Label>
              <Form.Control
                type="number"
                name="preferredContact"
                value={preferredContact}
                onChange={handleInputChange}
                placeholder="Enter number of site engineers"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Info</Form.Label>
              <Form.Control
                type="text"
                name="additional"
                value={additional}
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








import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addplanRequests, fetchplanRequests } from "../../redux/slices/Superadmin/planRequestSlice";


// import { fetchplanRequests, addplanRequests, updateplanRequest } from "./yourReduxActions";
import { Modal, Form, Button } from "react-bootstrap";
// import toast from "react-toastify";
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

  const handleDelete = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  };

  const filteredPlans = plans.filter((plan) =>
    plan.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // \\\\\\\\\\\\\
  // All Plan

  const dispatch = useDispatch();
  const { planRequests} = useSelector((state) => state.planRequest);
console.log(planRequests);

  useEffect(() => {
    dispatch(fetchplanRequests());
  }, [dispatch]);


// Add plan
   useEffect(() => {
     dispatch(fetchplanRequests());
   }, [dispatch]);
 
 
   // Add plan
   const [showUploadModal, setShowUploadModal] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [editingId, setEditingId] = useState(null);
 
   const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredContact: [
      {
        email: "false",
        Phone: "false",
      },
    ],
    additional: "",
  });
  
 
   const toggleUploadModal = (isEdit = false, doc = null) => {
     if (isEdit && doc) {
       setIsEditing(true);
       setEditingId(doc._id);
       setFormData({
         fullName: doc.fullName || "",
         email: doc.email || "",
         phone: doc.features.phone || "",
         preferredContact: [
           {
             email: doc.features.preferredContact[0]?.email || "false",
             Phone: doc.features.preferredContact[0]?.Phone || "false",
           },
         ],
         additional: doc.features.additional || "",
       });
     } else {
       setIsEditing(false);
       setEditingId(null);
       setFormData({
         fullName: "",
         email: "",
         phone: "",
         preferredContact: [
           {
             email: "false",
             Phone: "false",
           },
         ],
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
        preferredContact: [
          {
            email: value === "email" ? "true" : "false",
            Phone: value === "phone" ? "true" : "false",
          },
        ],
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
  
    // Validation: Check for required fields
    const { fullName, email, phone, preferredContact } = formData;
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      (preferredContact[0].email === "false" && preferredContact[0].Phone === "false")
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
  
    const payload = { ...formData };
    console.log("Submitting data:", payload);
  
    if (isEditing) {
      dispatch(updateplanRequest({ id: editingId, updatedForm: payload }))
        .unwrap()
        .then(() => {
          toast.success("Plan updated successfully!");
          setShowUploadModal(false);
          dispatch(fetchplanRequests());
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Failed to update plan!");
        });
    } else {
      dispatch(addplanRequests(payload))
        .unwrap()
        .then(() => {
          toast.success("Plan uploaded successfully!");
          setShowUploadModal(false);
          dispatch(fetchplanRequests());
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Failed to upload plan!");
        });
    }
  };
  
   
   const handleEdit = (plan) => {
     toggleUploadModal(true, plan);
   };
   
   

    // dlete list 
    // const handleDelete = (id) => {
    //   console.log(id);
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: "You won't be able to revert this!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, delete it!",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       dispatch(deletePlan(id))
    //         .then(() => {
    //           Swal.fire("Deleted!", "The planPackage has been deleted.", "success");
    //           dispatch(fetchPlans());
    //         })
    //         .catch(() => {
    //           Swal.fire("Error!", "Something went wrong.", "error");
    //         });
    //     }
    //   });
    // };
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

    <td>
      <button className="btn btn-success btn-sm me-2">Approve</button>
      <button
        className="btn text-danger p-0"
        onClick={() => handleDelete(index)}
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
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone"
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
      checked={formData.preferredContact[0].email === "true"}
      onChange={handleInputChange}
      inline
    />
    <Form.Check
      type="radio"
      label="Phone"
      name="preferredContact"
      value="phone"
      checked={formData.preferredContact[0].Phone === "true"}
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
