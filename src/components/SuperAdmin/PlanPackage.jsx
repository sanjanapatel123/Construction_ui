import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../../redux/slices/Superadmin/planPackageSlice";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const plans = [
  {
    name: "Standard Plan",
    price: 10000,
    benefits: [
      "15 Active Projects Allowed",
      "5 Site Engineers Allowed",
      "Unlimited Material Reports",
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
      "Unlimited Material & Budget Reports",
      "Unlimited Site Visit Logs",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
  },
];

const PlanPackage = () => {
  const dispatch = useDispatch();

  const { Plans = [] } = useSelector((state) => state.Plan);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);


  // Adding the missing state variables
  const [formData, setFormData] = useState({
    planName: "",
    duration: "",
    activeProjects: "",
    siteEngineers: "",
    reports: "",
    dailySiteVisits: "",
    company: ""
  });
  
  const [showUploadModal, setShowUploadModal] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); 
  
  const { planName, duration, activeProjects, siteEngineers, reports, dailySiteVisits, company } = formData;
  
  const toggleUploadModal = (val) => setShowUploadModal(val);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic here
    toggleUploadModal(false);
    console.log(formData);
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
              <div className="card border-0 shadow h-100 p-3 d-flex flex-column">
                <h2 className="text-center">{plan.planName}</h2>
                <div className="card-body flex-grow-1">
                  <h4 className="fw-bold text-center">
                    ₹{plan.duration} <span className="fs-5">/Year</span>
                  </h4>
                  <ul className="list-unstyled text-start">
                    <li>✅ {plan.activeProjects} : Active Projects</li>
                    <li>✅ {plan.siteEngineers} : Site Engineers</li>
                    <li>✅ {plan.reports}</li>
                    <li>✅ {plan.dailySiteVisits} : Daily Visits</li>
                    <li>✅ {plan.company}</li>
                  </ul>
                </div>
                <div className="card-footer bg-white border-0 mt-auto">
                  <button className="btn btn-primary w-100">Get Started Now</button>
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
          name="planName"
          value={planName}
          onChange={handleInputChange}
          placeholder="Enter plan name (e.g., Standard Plan)"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {/* <Form.Label>Duration (in months)</Form.Label> */}
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="duration"
          value={duration}
          onChange={handleInputChange}
          placeholder="Enter plan duration"
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
        <Form.Label>Reports</Form.Label>
        <Form.Control
          type="text"
          name="reports"
          value={reports}
          onChange={handleInputChange}
          placeholder="Enter report type (e.g., Monthly Reports)"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Daily Site Visits</Form.Label>
        <Form.Control
          type="number"
          name="dailySiteVisits"
          value={dailySiteVisits}
          onChange={handleInputChange}
          placeholder="Enter number of daily site visits"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          name="company"
          value={company}
          onChange={handleInputChange}
          placeholder="Enter company name"
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
