



import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { addsafetyEquipment, deletesafetyEquipment, fetchsafetyEquipment, updatesafetyEquipment } from "../../../redux/slices/safetyEquipmentSlice";
import axiosInstance from "../../../utils/axiosInstance";
import { apiUrl } from "../../../utils/config";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/slices/userSlice";

const SafetyEquipment = () => {
  const { id } = useParams(); // Get id from URL
  console.log(id)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { safetyequipments , loading } = useSelector((state) => state.safetyequipments);
   const { data:users } = useSelector((state) => state.users);


    useEffect(() => {
      dispatch(fetchUsers());
    }, []);

  console.log("update" , safetyequipments)

  const [formData, setFormData] = useState({
    assignmentID: "",
    assignmentDate: "",
    assignedBy: "",
    assignedTo: "",
    submissionDeadline: "",
    expectedReturnDate: "",
    specialInstructions: "",
    equipmentConditionRemarks: "",
    employeeSignature: "",
    supervisorSignature: "",
    equipmentChecklist: [
      { equipment: "Hard Hat", quantity: 0, condition: "", selected: false },
      { equipment: "Safety Boots", quantity: 0, condition: "", selected: false },
      { equipment: "Safety Glasses", quantity: 0, condition: "", selected: false },
      { equipment: "High-Visibility Vest", quantity: 0, condition: "", selected: false },
      { equipment: "Work Gloves", quantity: 0, condition: "", selected: false },
      { equipment: "Face Mask", quantity: 0, condition: "", selected: false },
      { equipment: "Safety Harness", quantity: 0, condition: "", selected: false },
      { equipment: "Ear Protection", quantity: 0, condition: "", selected: false },
    ],
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (id && safetyequipments.data.length === 0) {
      dispatch(fetchsafetyEquipment());
    }
  }, [id, dispatch, safetyequipments.length]);

  useEffect(() => {
    if (id ) {
      console.log(id)
      const equipmentToEdit = safetyequipments.data. find((item) => item._id === id);
      console.log("equipmentToEdit", equipmentToEdit)
      if (equipmentToEdit) {
        setFormData({
          assignmentID: equipmentToEdit.assignmentId || "",
          assignmentDate: equipmentToEdit.assignmentDate
            ? new Date(equipmentToEdit.assignmentDate).toISOString().split('T')[0]
            : "",
          assignedBy: equipmentToEdit.assignedBy || "",
          assignedTo: equipmentToEdit.assignedTo || "",
          employeeSignature: equipmentToEdit.employeeSignature || "",
          supervisorSignature: equipmentToEdit.supervisorSignature || "",
          submissionDeadline: equipmentToEdit.submissionDeadline
            ? new Date(equipmentToEdit.submissionDeadline).toISOString().split('T')[0]
            : "",
          expectedReturnDate: equipmentToEdit.expectedReturnDate
            ? new Date(equipmentToEdit.expectedReturnDate).toISOString().split('T')[0]
            : "",
          specialInstructions: equipmentToEdit.specialInstructions || "",
          equipmentConditionRemarks: equipmentToEdit.equipmentConditionRemarks || "",
          equipmentChecklist: equipmentToEdit.equipmentChecklist?.map(item => ({
            equipment: item.equipment,
            quantity: item.quantity,
            condition: item.condition,
            selected: true,
          })) || [],
        });
      }
      
    }
  }, [id, safetyequipments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("-")) {
      const [field, index] = name.split("-");
      const updatedChecklist = [...formData.equipmentChecklist];
      updatedChecklist[index][field] = value;
      setFormData({ ...formData, equipmentChecklist: updatedChecklist });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedChecklist = [...formData.equipmentChecklist];
    updatedChecklist[index].selected = !updatedChecklist[index].selected;
    setFormData({ ...formData, equipmentChecklist: updatedChecklist });
  };

 


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedEquipments = formData.equipmentChecklist.filter(item => item.selected);

    if (selectedEquipments.length === 0) {
      toast.error("Please select at least one equipment before submitting.");
      return;
    }

    const payload = {
      assignmentId: formData.assignmentID,
      assignmentDate: formData.assignmentDate,
      assignedBy: formData.assignedBy,
      assignedTo: formData.assignedTo,
      submissionDeadline: formData.submissionDeadline,
      expectedReturnDate: formData.expectedReturnDate,
      equipmentChecklist: selectedEquipments.map(item => ({
        equipment: item.equipment,
        quantity: item.quantity,
        condition: item.condition,
      })),
      additionalDetails: formData.specialInstructions,
      specialInstructions: formData.specialInstructions,
      equipmentConditionRemarks: formData.equipmentConditionRemarks,
      confirmation: true,
      employeeSignature: "signature_url_placeholder",
      supervisorSignature: "signature_url_placeholder",
    };

    // try {
    //   const response = await axiosInstance.post(`${apiUrl}/safety`, payload, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log("Success:", response.data);
    //   toast.success("Assignment submitted successfully!");
    try{
      if (id) {
        // Update
        await dispatch(updatesafetyEquipment({ id, updatedForm: payload })).unwrap()
        .then(() => {
          toast.success("Safety Equipment updated successfully!");
        }).catch((error) =>  {
          toast.error("Failed to Update Equipment")

        } )
        
      } else {
        // Create
        await dispatch(addsafetyEquipment(payload)).unwrap();
        toast.success("Safety Equipment added successfully!");
      }
      navigate("/safety-equipment");
    } catch (error) {
      toast.error(error || "Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <h2>{id ? "Update Safety Equipment" : "Add Safety Equipment"}</h2>
        <Button onClick={() => navigate(-1)} style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
        </Button>
      </div>
      <hr />

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>Assignment ID</Form.Label>
            <Form.Control
              type="text"
              name="assignmentID"
              value={formData.assignmentID}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Assignment Date</Form.Label>
            <Form.Control
              type="date"
              name="assignmentDate"
              value={formData.assignmentDate}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Assigned By</Form.Label>
            <Form.Select
              type="text"
              name="assignedBy"
              value={formData.assignedBy}
              onChange={handleChange}
              required
            >
             <option value="" disabled>Select assignee</option>
            {
              users?.map((user) => (
                
                <option key={user._id} value={user._id}> {user.firstName} {user.lastName
}</option>
              ))
            }
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Assigned To</Form.Label>
            <Form.Select
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
                 <option value="" disabled>Select assignee</option>
            {
              users?.map((user) => (
                
                <option key={user._id} value={user._id}> {user.firstName} {user.lastName
}</option>
              ))
            }
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Submission Deadline</Form.Label>
            <Form.Control
              type="date"
              name="submissionDeadline"
              value={formData.submissionDeadline}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Expected Return Date</Form.Label>
            <Form.Control
              type="date"
              name="expectedReturnDate"
              value={formData.expectedReturnDate}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Special Instructions</Form.Label>
          <Form.Control
            as="textarea"
            name="specialInstructions"
            rows={3}
            value={formData.specialInstructions}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Equipment Condition Remarks</Form.Label>
          <Form.Control
            as="textarea"
            name="equipmentConditionRemarks"
            rows={3}
            value={formData.equipmentConditionRemarks}
            onChange={handleChange}
          />
        </Form.Group>

        <h5>Equipment Checklist</h5>
        {formData.equipmentChecklist.map((item, index) => (
          <Row key={index} className="align-items-center mb-2">
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label={item.equipment}
                checked={item.selected || false}
                onChange={() => handleCheckboxChange(index)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="number"
                placeholder="Quantity"
                name={`quantity-${index}`}
                value={item.quantity}
                onChange={handleChange}
                min="0"
              />
            </Col>
            <Col md={4}>
              <Form.Control
                as="select"
                name={`condition-${index}`}
                value={item.condition}
                onChange={handleChange}
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Damaged">Damaged</option>
              </Form.Control>
            </Col>
          </Row>
        ))}

        <Button variant="primary" type="submit" disabled={loading}>
          {id ? "Update" : "Submit"}
        </Button>
      </Form>
    </Container>
  );
};

export default SafetyEquipment;



