import React, { useEffect } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipment } from "../../../redux/slices/equipmentSlice";

const EquipmentDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { equipments,loading , error } = useSelector((state) => state.equipments);
  const equipment = equipments.find((eq) => eq._id === id);
    console.log("equipments details",equipment);

 
  useEffect(() => {
    dispatch(fetchEquipment());
  }, [dispatch])

  if (!equipment) {
    return <div>Equipment not found</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Equipment Details</h2>
      <div className="bg-white p-4 rounded shadow-sm">
        <h5>Equipment Name: {equipment.name}</h5>
        <p>
          <strong>Equipment ID:</strong> {equipment.equipmentID}
        </p>
        <p>
          <strong>Type:</strong> {equipment.type}
        </p>
        {/* <p>
          <strong>Status:</strong> {equipment.status}
        </p> */}
        <p>
          <strong>Location:</strong> {equipment.location}
        </p>
        {/* <p>
          <strong>Last Inspection:</strong> {equipment.lastInspection}
        </p>
        <p>
          <strong>Next Maintenance:</strong> {equipment.nextMaintenance}
        </p> */}

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
