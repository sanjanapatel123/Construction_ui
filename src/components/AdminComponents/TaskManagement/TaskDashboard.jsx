import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask, fetchTasks,  } from "../../../redux/slices/taskManagement";
import Swal from "sweetalert2";

const AllTasks = () => {
  const dispatch = useDispatch();


  const { tasks, loading ,error} = useSelector((state) => state.task);

  console.log("Tasks:", tasks);


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
            dispatch(deleteTask(id))
              .then(() => {
                Swal.fire(
                  'Deleted!',
                  'The Task has been deleted.',
                  'success'
                );
                dispatch(fetchTasks());  // Refresh the table after delete
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
  // Sample task data
  // const [tasks] = useState([
  //   {
  //     title: "Quality assurance report",
  //     assignTo: "Michael Chen",
  //     category: "Quality",
  //     priority: "High",
  //     dueDate: "4/20/2025",
  //     status: "Pending",
  //   },
  //   {
  //     title: "Safety training session",
  //     assignTo: "David Rodriguez",
  //     category: "Safety",
  //     priority: "Medium",
  //     dueDate: "4/22/2025",
  //     status: "In Progress",
  //   },
  //   {
  //     title: "Update safety protocols documentation",
  //     assignTo: "John Smith",
  //     category: "Safety",
  //     priority: "High",
  //     dueDate: "4/25/2025",
  //     status: "In Progress",
  //   },
  //   {
  //     title: "Equipment maintenance check",
  //     assignTo: "Emily Johnson",
  //     category: "Equipment",
  //     priority: "Medium",
  //     dueDate: "4/30/2025",
  //     status: "Pending",
  //   },
  //   {
  //     title: "Update employee handbook",
  //     assignTo: "Sarah Williams",
  //     category: "Documentation",
  //     priority: "Low",
  //     dueDate: "5/10/2025",
  //     status: "Completed",
  //   },
  // ]);

  // State for filter
  const [filter, setFilter] = useState("");
  // const [search , setSearch] = useState("");

  // Handle filtering
  const filteredTasks = tasks.filter(
    (task) =>
      task.taskTitle.toLowerCase().includes(filter.toLowerCase()) ||
      task.assignTo.toLowerCase().includes(filter.toLowerCase()) ||
      task.category.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
     dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3 mt-4">
        <h3>All Tasks</h3>
        <Link to="/create-task">
          <Button variant="primary" className="mb-3">
            Add New Task
          </Button>
        </Link>
      </div>

      <div className="mb-3">
        <InputGroup>
          <FormControl
            placeholder="Search tasks..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </InputGroup>
      </div>

      <Table bordered hover responsive className="mb-0">
  <thead className="table-light">
    <tr>
      <th className="ps-4">Task Title</th>
      <th>Assigned To</th>
      <th>Category</th>
      <th>Priority</th>
      <th>Due Date</th>
      <th>Status</th>
      <th className="pe-4">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredTasks.map((task, index) => (
      <tr key={index} className="bg-white py-3" style={{ cursor: "pointer" }}>
        <td className="ps-4 py-3">{task.taskTitle}</td>
        <td className="py-3">{task.assignTo}</td>
        <td className="py-3">{task.category}</td>
        <td className="py-3">
          <span
            className={`badge text-white ${
              task.priority === "High"
                ? "bg-danger"
                : task.priority === "Medium"
                ? "bg-warning"
                : "bg-success"
            }`}
          >
            {task.priority}
          </span>
        </td>
        <td className="py-3">{new Date(task.dueDate).toISOString().split('T')[0]}</td>
        <td className="py-3">
          <span
            className={`badge text-white ${
              task.status === "Completed"
                ? "bg-success"
                : task.status === "In Progress"
                ? "bg-primary"
                : "bg-danger"
            }`}
          >
            {task.status}
          </span>
        </td>
        <td className="pe-4 py-3">
          <button className="btn p-0 me-2 text-primary">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="btn p-0 text-danger" onClick={()=>HandleDelete(task._id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


   
      <div className="d-flex justify-content-end mt-3">
                <Button size="sm" variant="outline-secondary" className="me-2">Previous</Button>
                <Button size="sm" variant="primary" className="ms-2">1</Button>
                <Button size="sm" variant="outline-secondary" className="ms-2">2</Button>
                <Button size="sm" variant="outline-secondary" className="ms-2">Next</Button>
              </div>
      </div>
  
  );
};

export default AllTasks;
