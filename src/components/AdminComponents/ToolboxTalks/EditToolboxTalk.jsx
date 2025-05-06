import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { apiUrl } from "../../../utils/config";

function EditToolboxTalk() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    presenter: "",
    participants: [],
    description: "",
    status: "",
    image: null,
  });

  const [workersList, setWorkersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
          `${apiUrl}/users`
        );
        setWorkersList(response.data.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // Fetch toolbox details by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const toolboxRes = await axiosInstance.get(`${apiUrl}/toolbox/${id}`);
        const data = toolboxRes.data.data;
        console.log(data);

        setFormData({
          title: data.title || "",
          date: data.date ? data.date.substring(0, 10) : "", // date format YYYY-MM-DD
          time: data.time || "",
          presenter: data.presenter?._id || "",
          participants: data.participants || [],
          description: data.description || "",
          status: data.status || "",
          image: null, // Image file will update manually
        });

        const usersRes = await axiosInstance.get(`${apiUrl}/users`);
        setWorkersList(usersRes.data.data.users);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch toolbox talk or users!");
      }
    };

    fetchData();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleParticipantsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setFormData((prev) => ({
      ...prev,
      participants: selected,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // Update API
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const payload = new FormData();
  //       payload.append("title", formData.title);
  //       payload.append("date", formData.date);
  //       payload.append("time", formData.time);
  //      payload.append("presenter", formData.presenter || "");
  //       payload.append("participants", JSON.stringify(formData.participants));
  //       payload.append("description", formData.description);
  //       payload.append("status", formData.status);
  //       if (formData.image) {
  //         payload.append("image", formData.image);
  //       }

  //       const response = await axiosInstance.patch(
  //         `${apiUrl}/toolbox/${id}`,
  //         payload,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       toast.success("Toolbox Talk updated successfully!");
  //       navigate("/toolbox"); // After update, redirect to toolbox list
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Failed to update toolbox talk!");
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("date", formData.date);
      payload.append("time", formData.time);
      payload.append("presenter", formData.presenter || "");

      // Correct way to append multiple participants
      formData.participants.forEach((participantId) => {
        payload.append("participants", participantId);
      });

      payload.append("description", formData.description);
      payload.append("status", formData.status);
      if (formData.image) {
        payload.append("image", formData.image);
      }

      const response = await axiosInstance.patch(
        `${apiUrl}/toolbox/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Toolbox Talk updated successfully!");
      navigate("/toolbox");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update toolbox talk!");
    }
  };

  console.log("Form Data:", formData); // Debugging line to check form data
  return (
    <div className="container mt-2">
      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-white shadow-sm"
      >
        <h4 className="mb-4 fw-semibold">Edit Toolbox Talk</h4>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Presenter</Form.Label>
              <Form.Select
                name="presenter"
                value={formData.presenter || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    presenter: e.target.value, // ✅ Only save ID string here!
                  }))
                }
              >
                <option value="">Select Presenter</option>
                {workersList.map((worker) => (
                  <option key={worker._id} value={worker._id}>
                    {worker.firstName} {worker.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Participants</Form.Label>
              <Form.Select
                multiple
                value={formData.participants}
                onChange={handleParticipantsChange}
                style={{ height: "122px" }}
              >
                {workersList.map((worker) => (
                  <option key={worker._id} value={worker._id}>
                    {worker.firstName} {worker.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Attachment (Update if required)</Form.Label>
          <Form.Control type="file" name="image" onChange={handleFileChange} />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="light"
            className="me-2"
            onClick={() => navigate("/toolbox")}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update Toolbox Talk
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditToolboxTalk;
