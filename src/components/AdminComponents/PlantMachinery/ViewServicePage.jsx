import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ViewServicePage = () => {
  const location = useLocation();
  const { service } = location.state; // Get service data passed from the previous page

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Service Details</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <h5>Service Name: {service.name}</h5>
        <p>
          <strong>Provider:</strong> {service.provider}
        </p>
        <p>
          <strong>Schedule:</strong> {service.schedule}
        </p>
        <p>
          <strong>Last Service:</strong> {service.lastService}
        </p>
        <p>
          <strong>Next Service:</strong> {service.nextService}
        </p>

        <div className="d-flex gap-2 mt-4">
          <Link to="/PlantMachinery">
            <Button variant="secondary">Back to Services</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewServicePage;
