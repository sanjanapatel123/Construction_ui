import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Table, Badge } from "react-bootstrap";
import { clearSelectedITP } from "../../../redux/slices/itpSlice";
import { useParams } from "react-router-dom";

const ITPDetailsModal = ({ show, handleClose }) => {

  const selectedITP = useParams();
  
  // const { selectedITP, loading } = useSelector((state) => state.itps);
  const dispatch = useDispatch();

  console.log(selectedITP, "selectedITP");

  const close = () => {
    dispatch(clearSelectedITP());
    handleClose();
  };

  // if (loading || !selectedITP) return null;

  const {
    projectName,
    InspectionType,
    Inspector,
    Date,
    InspectionItems,
    additionalNotes,
    activity,
    criteria,
    status,
  } = selectedITP;

  return (
    <Modal show={show} onHide={close} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>ITP Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-3">{projectName}</h5>
        <p>
          <strong>Inspection Type:</strong> {InspectionType}
        </p>
        <p>
          <strong>Inspector:</strong> {Inspector}
        </p>
        <p>
          <strong>Date:</strong> {Date}
        </p>
        <p>
          <strong>Activity:</strong> {activity}
        </p>
        <p>
          <strong>Criteria:</strong> {criteria}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <Badge bg={status === "Approved" ? "success" : "warning"}>
            {status}
          </Badge>
        </p>
        <p>
          <strong>Additional Notes:</strong> {additionalNotes}
        </p>

        <h6 className="mt-4">Inspection Items</h6>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Description</th>
              <th>Status</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {InspectionItems?.map((item, index) => (
              <tr key={index}>
                <td>{item.itemDescription}</td>
                <td>
                  <Badge bg={item.status ? "success" : "danger"}>
                    {item.status ? "Pass" : "Fail"}
                  </Badge>
                </td>
                <td>{item.comments}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ITPDetailsModal;
