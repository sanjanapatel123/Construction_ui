import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditDiaryModal = ({ show, handleClose, selectedDiary, onUpdate }) => {
  const [formData, setFormData] = useState({
    date: '',
    projectName: '',
    supervisorName: '',
    weather: '',
    workPerformed: '',
    issuesDelays: ''
  });

  useEffect(() => {
    if (selectedDiary) {
      setFormData({
        date: selectedDiary.date?.substring(0, 10) || '',
        projectName: selectedDiary.projectName || '',
        supervisorName: selectedDiary.supervisorName || '',
        weather: selectedDiary.weather || '',
        workPerformed: selectedDiary.workPerformed || '',
        issuesDelays: selectedDiary.issuesDelays || ''
      });
    }
  }, [selectedDiary]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `https://contructionbackend.onrender.com/api/diaries/${selectedDiary._id}`,
        formData
      );
      onUpdate(); // Refresh the list
      handleClose();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Diary Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Supervisor Name</Form.Label>
            <Form.Control
              type="text"
              name="supervisorName"
              value={formData.supervisorName}
              onChange={handleChange}
              placeholder="Enter supervisor name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Weather</Form.Label>
            <Form.Control
              type="text"
              name="weather"
              value={formData.weather}
              onChange={handleChange}
              placeholder="Sunny / Rainy / Cloudy"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Work Performed</Form.Label>
            <Form.Control
              as="textarea"
              name="workPerformed"
              value={formData.workPerformed}
              onChange={handleChange}
              rows={2}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Issues or Delays</Form.Label>
            <Form.Control
              as="textarea"
              name="issuesDelays"
              value={formData.issuesDelays}
              onChange={handleChange}
              rows={2}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update Entry
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDiaryModal;
