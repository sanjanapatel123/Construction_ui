// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../../utils/axiosInstance";

// const SafetyEquipment = () => {
//   const [formData, setFormData] = useState({
//     assignmentID: "",
//     assignmentDate: "",
//     assignedBy: "",
//     assignedTo: "",
//     submissionDeadline: "",
//     expectedReturnDate: "",
//     specialInstructions: "",
//     equipmentConditionRemarks: "",
//     equipmentChecklist: [
//       { equipment: "Hard Hat", quantity: 0, condition: "" },
//       { equipment: "Safety Boots", quantity: 0, condition: "" },
//       { equipment: "Safety Glasses", quantity: 0, condition: "" },
//       { equipment: "High-Visibility Vest", quantity: 0, condition: "" },
//       { equipment: "Work Gloves", quantity: 0, condition: "" },
//       { equipment: "Face Mask", quantity: 0, condition: "" },
//       { equipment: "Safety Harness", quantity: 0, condition: "" },
//       { equipment: "Ear Protection", quantity: 0, condition: "" },
//     ],
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Check if the field is part of the equipmentChecklist
//     if (name.includes("-")) {
//       const [field, index] = name.split("-");
//       const updatedChecklist = [...formData.equipmentChecklist];
//       updatedChecklist[index][field] = value;
//       setFormData({ ...formData, equipmentChecklist: updatedChecklist });
//     } else {
//       // Handle fields outside of the checklist like specialInstructions and equipmentConditionRemarks
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleCheckboxChange = (index) => {
//     const updatedChecklist = [...formData.equipmentChecklist];
//     updatedChecklist[index].selected = !updatedChecklist[index].selected;
//     setFormData({ ...formData, equipmentChecklist: updatedChecklist });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // const isValid = formData.equipmentChecklist.every((item) => item.condition);
//     // if (!isValid) {
//     //   toast.error("Please select a condition for all equipment items.");
//     //   return;
//     // }

//     // if (!formData.specialInstructions || !formData.equipmentConditionRemarks) {
//     //   toast.error("Please provide all the required additional details.");
//     //   return;
//     // }

//     const payload = {
//       assignmentId: formData.assignmentID,
//       assignmentDate: formData.assignmentDate,
//       assignedBy: formData.assignedBy,
//       assignedTo: formData.assignedTo,
//       submissionDeadline: formData.submissionDeadline,
//       expectedReturnDate: formData.expectedReturnDate,
//       // equipmentChecklist: formData.equipmentChecklist.map((item) => ({
//       //   equipment: item.equipment,
//       //   quantity: item.quantity,
//       //   condition: item.condition,
//       // })),
//       equipmentChecklist: formData.equipmentChecklist
//         .filter((item) => item.selected) // <-- Only selected equipment
//         .map((item) => ({
//           equipment: item.equipment,
//           quantity: item.quantity,
//           condition: item.condition,
//         })),
//       additionalDetails: formData.specialInstructions,
//       specialInstructions: formData.specialInstructions,
//       equipmentConditionRemarks: formData.equipmentConditionRemarks,
//       confirmation: true, // assuming confirmation is always true
//       employeeSignature: "signature_url_5", // Replace with actual signature URL
//       supervisorSignature: "signature_url_6", // Replace with actual signature URL
//     };
//     if (payload.equipmentChecklist.length === 0) {
//       toast.error("Please select at least one equipment before submitting.");
//       return;
//     }

//     console.log("Submitting payload", payload);

//     try {
//       const response = await axiosInstance.post(
//         "https://hrb5wx2v-8000.inc1.devtunnels.ms/api/safety",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Success:", response.data);
//       toast.success("Assignment submitted successfully!");
//       navigate("/safety-equipment");
//     } catch (error) {
//       toast.error("Failed to submit assignment. Please try again.");
//       console.error("Error submitting assignment:", error);
//     }
//   };

//   return (
//     <Container>
//       <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
//         <h2>Safety Equipment</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="btn "
//           style={{ backgroundColor: "#0d6efd", color: "white" }}
//         >
//           <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
//         </button>
//       </div>

//       <hr />
//       <Form onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Col>
//             <Form.Label>Assignment ID</Form.Label>
//             <Form.Control
//               type="text"
//               name="assignmentID"
//               value={formData.assignmentID}
//               onChange={handleChange}
//               required
//             />
//           </Col>
//           <Col>
//             <Form.Label>Assignment Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="assignmentDate"
//               value={formData.assignmentDate}
//               onChange={handleChange}
//               required
//             />
//           </Col>
//         </Row>

//         <Row className="mb-3">
//           <Col>
//             <Form.Label>Assigned By</Form.Label>
//             <Form.Control
//               type="text"
//               name="assignedBy"
//               value={formData.assignedBy}
//               onChange={handleChange}
//               required
//             />
//           </Col>
//           <Col>
//             <Form.Label>Assigned To</Form.Label>
//             <Form.Control
//               type="text"
//               name="assignedTo"
//               value={formData.assignedTo}
//               onChange={handleChange}
//               required
//             />
//           </Col>
//         </Row>

//         <Row className="mb-3">
//           <Col>
//             <Form.Label>Submission Deadline</Form.Label>
//             <Form.Control
//               type="date"
//               name="submissionDeadline"
//               value={formData.submissionDeadline}
//               onChange={handleChange}
//               required
//             />
//           </Col>
//           <Col>
//             <Form.Label>Expected Return Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="expectedReturnDate"
//               value={formData.expectedReturnDate}
//               onChange={handleChange}
//               required
//             />
//           </Col>
//         </Row>

//         <h4>Safety Equipment Checklist</h4>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th style={{ textAlign: "center" }}>Select</th>
//               <th>Equipment</th>
//               <th>Quantity</th>
//               <th>Condition</th>
//             </tr>
//           </thead>
//           <tbody>
//             {formData.equipmentChecklist.map((item, index) => (
//               <tr key={index}>
//                 <td style={{ textAlign: "center" }}>
//                   <Form.Check
//                     type="checkbox"
//                     checked={item.selected}
//                     onChange={() => handleCheckboxChange(index)}
//                   />
//                 </td>
//                 <td>{item.equipment}</td>
//                 <td>
//                   <Form.Control
//                     type="number"
//                     name={`quantity-${index}`}
//                     value={item.quantity}
//                     onChange={handleChange}
//                   />
//                 </td>
//                 <td>
//                   <Form.Control
//                     as="select"
//                     name={`condition-${index}`}
//                     value={item.condition}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Condition</option>
//                     <option>New</option>
//                     <option>Used</option>
//                     <option>Damaged</option>
//                   </Form.Control>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         <h4>Additional Details</h4>
//         <Row className="mb-3">
//           <Col>
//             <Form.Label>Special Instructions</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="specialInstructions"
//               value={formData.specialInstructions}
//               onChange={handleChange}
//             />
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col>
//             <Form.Label>Equipment Condition Remarks</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="equipmentConditionRemarks"
//               value={formData.equipmentConditionRemarks}
//               onChange={handleChange}
//             />
//           </Col>
//         </Row>

//         <h4>Confirmation</h4>
//         <Row className="mb-3">
//           <Col>
//             <Form.Label>Employee Signature</Form.Label>
//             <Form.Control type="text" placeholder="Click to sign" />
//           </Col>
//           <Col>
//             <Form.Label>Supervisor Signature</Form.Label>
//             <Form.Control type="text" placeholder="Click to sign" />
//           </Col>
//         </Row>

//         <div className=" justify-content-between">
//           <Button variant="secondary" className="ms-2" type="button">
//             Clear Form
//           </Button>
//           <Button variant="warning" className="ms-2" type="button">
//             Save Draft
//           </Button>
//           <Button variant="primary" className="ms-2" type="submit">
//             Submit Assignment
//           </Button>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default SafetyEquipment;


import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { apiUrl } from "../../../utils/config";
import { useParams } from "react-router-dom";
import { addsafetyEquipment, fetchsafetyEquipment, updatesafetyEquipment } from "../../../redux/slices/safetyEquipmentSlice";
import { useDispatch, useSelector } from "react-redux";

const SafetyEquipment = () => {
  const { id } = useParams(); // Get id from URL
  console.log(id)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { safetyequipments , loading } = useSelector((state) => state.safetyequipments);

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

  const HandleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletesitereview(id))
          .then(() => {
            Swal.fire(
              'Deleted!',
              'The site entry has been deleted.',
              'success'
            );
            dispatch(fetchsitereview());  // Refresh the table after delete
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'Something went wrong.',
              'error'
            );
          });
      }
    });
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

    try {
      const response = await axiosInstance.post(`${apiUrl}/safety`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success:", response.data);
      toast.success("Assignment submitted successfully!");
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
            <Form.Control
              type="text"
              name="assignedBy"
              value={formData.assignedBy}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            />
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

