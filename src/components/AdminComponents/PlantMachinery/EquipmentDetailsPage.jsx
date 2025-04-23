import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const EquipmentDetailsPage = () => {
  const location = useLocation();
  const { equipment } = location.state; // Get equipment data passed from the previous page

  if (!equipment) {
    return <div>Equipment not found</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Equipment Details</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <h5>Equipment Name: {equipment.name}</h5>
        <p>
          <strong>Equipment ID:</strong> {equipment.id}
        </p>
        <p>
          <strong>Type:</strong> {equipment.type}
        </p>
        <p>
          <strong>Status:</strong> {equipment.status}
        </p>
        <p>
          <strong>Location:</strong> {equipment.location}
        </p>
        <p>
          <strong>Last Inspection:</strong> {equipment.lastInspection}
        </p>
        <p>
          <strong>Next Maintenance:</strong> {equipment.nextMaintenance}
        </p>

        <div className="d-flex gap-2 mt-4">
          <Link to="/PlantMachinery">
            <Button variant="secondary">Back to Equipment List</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailsPage;
