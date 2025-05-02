import React, { useEffect } from "react";
import {
  Container,
  Alert,
  Row,
  Col,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSafetyEquipment } from "../../../redux/slices/safetyEquipmentSlice";

const SafetyEquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleSafetyEquipment, loading, error } = useSelector(
    (state) => state.safetyequipments
  );

  const equipment = singleSafetyEquipment?.data || {};

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleSafetyEquipment(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!equipment || Object.keys(equipment).length === 0) {
    return (
      <Container className="text-center mt-5">
        <p>No Safety Equipment Details Found.</p>
      </Container>
    );
  }

  return (
    <Container className="">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Safety Equipment Details</h2>
        <Button
          onClick={() => navigate(-1)}
          style={{ backgroundColor: "#0d6efd", color: "white" }}
        >
          <i className="fa-solid fa-arrow-left me-2"></i> Back
        </Button>
      </div>

      <Card className="shadow-sm p-4">
        <Row>
          <Col md={6}>
            <h5>
              <b>Assignment ID:</b> {equipment.assignmentId}
            </h5>
            <p>
              <b>Assigned By:</b> {equipment.assignedBy?.firstName} {equipment.assignedBy?.lastName}
            </p>
            <p>
              <b>Assigned To:</b> {equipment?.assignedTo?.firstName} {equipment.assignedBy?.lastName}
            </p>
            <p>
              <b>Assignment Date:</b> {equipment.assignmentDate?.slice(0, 10)}
            </p>
            <p>
              <b>Submission Deadline:</b>{" "}
              {equipment.submissionDeadline?.slice(0, 10)}
            </p>
            <p>
              <b>Expected Return Date:</b>{" "}
              {equipment.expectedReturnDate?.slice(0, 10)}
            </p>
          </Col>

          <Col md={6}>
            <p>
              <b>Special Instructions:</b> {equipment.specialInstructions}
            </p>
            <p>
              <b>Additional Details:</b> {equipment.additionalDetails}
            </p>
            <p>
              <b>Condition Remarks:</b> {equipment.equipmentConditionRemarks}
            </p>
          </Col>
        </Row>

        <hr />
        <h5>Equipment Checklist:</h5>

        {equipment.equipmentChecklist?.length > 0 ? (
          equipment.equipmentChecklist.map((item, index) => (
            <Card key={index} className="mb-2 p-2">
              <Row>
                <Col md={4}>
                  <b>Equipment:</b> {item.equipment}
                </Col>
                <Col md={4}>
                  <b>Quantity:</b> {item.quantity}
                </Col>
                <Col md={4}>
                  <b>Condition:</b> {item.condition}
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <p>No checklist items available.</p>
        )}

        <hr />
        <Row>
          <Col md={6} className="text-center">
            <p>
              <b>Employee Signature:</b>
            </p>
            {equipment.employeeSignature ? (
              <img
                src={equipment.employeeSignature}
                alt="Employee Signature"
                style={{ width: "200px", height: "auto" }}
              />
            ) : (
              <p>No Employee Signature Available</p>
            )}
          </Col>

          <Col md={6} className="text-center">
            <p>
              <b>Supervisor Signature:</b>
            </p>
            {equipment.supervisorSignature ? (
              <img
                src={equipment.supervisorSignature}
                alt="Supervisor Signature"
                style={{ width: "200px", height: "auto" }}
              />
            ) : (
              <p>No Supervisor Signature Available</p>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default SafetyEquipmentDetails;
