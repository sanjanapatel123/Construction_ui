import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const getWeatherEmoji = (weather) => {
  const w = weather.toLowerCase();
  if (w.includes("sun")) return "☀️";
  if (w.includes("rain")) return "🌧️";
  if (w.includes("cloud")) return "☁️";
  if (w.includes("storm")) return "⛈️";
  if (w.includes("snow")) return "❄️";
  return "🌤️"; // default
};

const DiaryDetailsModal = ({ show, handleClose, diaryId }) => {
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    if (diaryId) {
      axios
        .get(`https://contructionbackend.onrender.com/api/diaries/${diaryId}`)
        .then((res) => setDiary(res.data))
        .catch((err) => console.log(err));
    }
  }, [diaryId]);

  if (!diary) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>📋 Diary Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-2">
          <h5 className="mb-2 text-primary">🗓️ Date: <span className="text-dark">{diary.date?.substring(0, 10)}</span></h5>
          <p><strong>🏗️ Project Name:</strong> {diary.projectName}</p>
          <p><strong>👷 Supervisor:</strong> {diary.supervisorName}</p>
          <p><strong>🌦️ Weather:</strong> {getWeatherEmoji(diary.weather)} {diary.weather}</p>
          <p><strong>🛠️ Work Performed:</strong><br />{diary.workPerformed}</p>
          <p><strong>⚠️ Issues/Delays:</strong><br />{diary.issuesDelays}</p>
          <hr />
          <p className="text-muted" style={{ fontSize: "13px" }}>
            📌 Created At: {new Date(diary.createdAt).toLocaleString()}
            <br />
            🔄 Updated At: {new Date(diary.updatedAt).toLocaleString()}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiaryDetailsModal;
