import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlans, deletePlan, fetchPlans, updatePlan } from "../../redux/slices/Superadmin/planPackageSlice";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const plans = [
  {
    name: "Standard Plan",
    price: 10000,
    benefits: [
      "15 Active Projects Allowed",
      "5 Site Engineers Allowed",
      "Unlimited Material materialReports",
      "500 Daily Site Visit Logs",
      "Priority Email & Call Support",
    ],
  },
  {
    name: "Enterprise Plan",
    price: 20000,
    benefits: [
      "Unlimited Active Projects",
      "Unlimited Site Engineers",
      "Unlimited Material & Budget materialReports",
      "Unlimited Site Visit Logs",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
  },
];

// All Plan
const PlanPackage = () => {
  const dispatch = useDispatch();
  const { Plans = [] } = useSelector((state) => state.Plan);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);


// Add plan
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    pricePerYear: "",
    activeProjects: "",
    siteEngineers: "",
    materialReports: "",
    siteVisitLogs: "",
    support: "",
    dedicatedAccountManager:true
  });
  const { name, pricePerYear, activeProjects, siteEngineers, materialReports, siteVisitLogs, support } = formData;
  const toggleUploadModal = (isEdit = false, doc = null) => {
    if (isEdit && doc) {
      setIsEditing(true);
      setEditingId(doc._id);
      setFormData({
        name: doc.name || "",
        pricePerYear: doc.pricePerYear || "",
        activeProjects: doc.features.activeProjects || "",
        siteEngineers: doc.features.siteEngineers || "",
        materialReports: doc.features.materialReports || "",
        siteVisitLogs: doc.features.siteVisitLogs || "",
        support: doc.features.support || ""
      });
    } else {
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        name: "",
        pricePerYear: "",
        activeProjects: "",
        siteEngineers: "",
        materialReports: "",
        siteVisitLogs: "",
        support: "",
        dedicatedAccountManager:true
      });
    }
    setShowUploadModal(!showUploadModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
      dispatch(updatePlan({
        id: editingId,
        updatedForm: updateFormData
      }))
        .unwrap()
        .then(() => {
          toast.success("planPackage updated successfully!");
          setShowUploadModal(false);
          dispatch(fetchPlans());
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Failed to update planPackage!");
        });
    } else {
      const newFormData = { ...formData };
      delete newFormData.existingImage;

      dispatch(addPlans(newFormData)) 
        .unwrap()
        .then(() => {
          toast.success("planPackage uploaded successfully!");
          setShowUploadModal(false);
          dispatch(fetchPlans());
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
          dispatch(deletePlan(id))
            .then(() => {
              Swal.fire("Deleted!", "The planPackage has been deleted.", "success");
              dispatch(fetchPlans());
            })
            .catch(() => {
              Swal.fire("Error!", "Something went wrong.", "error");
            });
        }
      });
    };
  return (
    <div className="container p-4">
      <h2 className="text-center mb-4">Construction Plan Packages</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => toggleUploadModal(true)}>
          Create Plan
        </button>
      </div>

      {Plans.length === 0 ? (
        <p className="text-center">Loading plans...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {Plans.map((plan, index) => (
            <div className="col" key={index}>
              <div className="card border-0 shadow h-100 position-relative p-3 d-flex flex-column">
                <button
                  className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                  title="Delete"
                  onClick={()=>handleDelete(plan._id)}
                >
                  <AiOutlineClose />
                </button>

                <h2 className="text-center">{plan.name}</h2>

                <div className="card-body flex-grow-1">
                  <h4 className="fw-bold text-center">
                    ₹{plan.pricePerYear} <span className="fs-5">/Year</span>
                  </h4>
                  <ul className="list-unstyled text-start">
                    <li>✅ {plan.features.activeProjects} : Active Projects</li>
                    <li>✅ {plan.features.siteEngineers} : Site Engineers</li>
                    <li>✅ {plan.features.materialReports}</li>
                    <li>✅ {plan.features.siteVisitLogs} : Daily Visits</li>
                    <li>✅ {plan.features.support}</li>
                  </ul>
                </div>

                <div className="card-footer bg-white border-0 mt-auto d-flex align-items-center">
                  <button className="btn btn-primary flex-grow-1">
                    Get Started Now
                  </button>
                  <button className="btn btn-primary ms-2" onClick={() => handleEdit(plan)}>
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
                name="name"
                value={name}
                onChange={handleInputChange}
                placeholder="Enter plan name (e.g., Standard Plan)"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="pricePerYear"
                value={pricePerYear}
                onChange={handleInputChange}
                placeholder="Enter plan pricePerYear"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Active Projects</Form.Label>
              <Form.Control
                type="number"
                name="activeProjects"
                value={activeProjects}
                onChange={handleInputChange}
                placeholder="Enter number of active projects"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Site Engineers</Form.Label>
              <Form.Control
                type="number"
                name="siteEngineers"
                value={siteEngineers}
                onChange={handleInputChange}
                placeholder="Enter number of site engineers"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>materialReports</Form.Label>
              <Form.Control
                type="text"
                name="materialReports"
                value={materialReports}
                onChange={handleInputChange}
                placeholder="Enter report type (e.g., Monthly materialReports)"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Daily Site Visits</Form.Label>
              <Form.Control
                type="number"
                name="siteVisitLogs"
                value={siteVisitLogs}
                onChange={handleInputChange}
                placeholder="Enter number of daily site visits"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>support</Form.Label>
              <Form.Control
                type="text"
                name="support"
                value={support}
                onChange={handleInputChange}
                placeholder="Enter support name"
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

export default PlanPackage;
