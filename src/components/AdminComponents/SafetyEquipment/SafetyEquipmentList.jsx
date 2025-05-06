import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Pagination,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchsafetyEquipment,
  deletesafetyEquipment,
} from "../../../redux/slices/safetyEquipmentSlice";
import Swal from "sweetalert2";

const SafetyEquipmentList = () => {
  const [filterEquipment, setFilterEquipment] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [filterAssignedTo, setFilterAssignedTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change how many items per page

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchsafetyEquipment());
  }, [dispatch]);

  const { safetyequipments, loading, error } = useSelector(
    (state) => state.safetyequipments
  );
  // console.log(safetyequipments, "safetyequipments");
  const filteredData = safetyequipments?.data
    ? safetyequipments.data.filter((item) => {
        return (
          (filterEquipment === "" ||
            item.assignedBy
              ?.toLowerCase()
              .includes(filterEquipment.toLowerCase())) &&
          (filterCondition === "" || item.condition === filterCondition) &&
          (filterAssignedTo === "" ||
            `${item.assignedTo?.firstName || ""} ${
              item.assignedTo?.lastName || ""
            }`
              .toLowerCase()
              .includes(filterAssignedTo.toLowerCase()))
        );
      })
    : [];

  const HandleDelete = (id) => {
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
        dispatch(deletesafetyEquipment(id))
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The site entry has been deleted.",
              "success"
            );
            dispatch(fetchsafetyEquipment()); // Refresh the table after delete
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row className="align-items-center my-3">
        <Col>
          <h3>Safety Equipment</h3>
        </Col>
        <Col className="text-end">
          <Link to={"/AddSafety"}>
            <Button variant="primary">Add Safety Equipment</Button>
          </Link>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Filter by Equipment"
            value={filterEquipment}
            onChange={(e) => setFilterEquipment(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterCondition}
            onChange={(e) => setFilterCondition(e.target.value)}
          >
            <option value="">Filter by Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="damaged">Damaged</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Filter by Assigned To"
            value={filterAssignedTo}
            onChange={(e) => setFilterAssignedTo(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Assignment Date</th>
              <th>Equipment</th>
              <th>Assigned To</th>
              <th>Assigned By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.assignmentId}</td>
                  <td>{new Date(item.assignmentDate).toLocaleDateString()}</td>
                  <td>
                    {item.equipmentChecklist &&
                    item.equipmentChecklist.length > 0 ? (
                      item.equipmentChecklist.map((eq, eqIndex) => (
                        <div key={eqIndex}>
                          <p>{eq.equipment}</p>
                        </div>
                      ))
                    ) : (
                      <p>No Equipment</p>
                    )}
                  </td>
                  <td>
                    {item.assignedTo?.firstName} {item.assignedTo?.lastName}
                  </td>
                  <td>
                    {item.assignedBy?.firstName} {item.assignedTo?.lastName}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn text-info p-0"
                        onClick={() =>
                          navigate(`/safety-equipment/${item._id}`)
                        }
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn text-primary p-0"
                        onClick={() => navigate(`/AddSafety/${item._id}`)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>

                      <button
                        className="btn text-dark p-0"
                        onClick={() => HandleDelete(item._id)}
                      >
                        <i className="fas fa-trash text-danger"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No equipment found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default SafetyEquipmentList;
