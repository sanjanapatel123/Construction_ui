import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAnnouncement, fetchAnnouncements, updateAnnouncement } from '../../../redux/slices/announcementSlice';

function AddAnnouncements() {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { id } = useParams();
  const { announcements } = useSelector((state) => state.announcements);
  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);
  
  useEffect(() => {
    if (announcements.length > 0) {
      const announcementToEdit = announcements.find(a => a._id === id);
      if (announcementToEdit) {
        setFormData({
          title: announcementToEdit.title,
          priorityLevel: announcementToEdit.priorityLevel,
          message: announcementToEdit.message,
          startDate: announcementToEdit.startDate,
          EndDate: announcementToEdit.EndDate,
        });
      }
    }
  }, [announcements, id]);
  


  const [formData, setFormData] = useState({
    title: "",
    priorityLevel: "",
    message: "",
    startDate: "",
    EndDate: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("priorityLevel", formData.priorityLevel);
    data.append("message", formData.message);
    data.append("startDate", formData.startDate);
    data.append("EndDate", formData.EndDate);
    if (image) {
      data.append("image", image);
    }
  
    try {
      if (id) {
        // If editing, update announcement
        await dispatch(updateAnnouncement({ id: id, data })).unwrap();
        alert("Announcement updated successfully!");
      } else {
        // If adding, add new announcement
        await dispatch(addAnnouncement(data)).unwrap();
        alert("Announcement added successfully!");
      }
      navigate("/announcements");
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };
  
  

  return (
    <div className="container ">
      <div className="border rounded shadow-sm p-4 m-4" style={{backgroundColor:"white"}}>
        <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0"> {id ? "Edit Announcement" : "Create New Announcement"} </h4>
          <Link to="/announcements">
            <button className="btn set_btn text-white">
              <i className="fa-solid fa-arrow-left me-2"></i>Back
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Title</label>
            <input type="text" className="form-control" placeholder="Enter title"
              name="title" value={formData.title} onChange={handleChange} />
          </div>

          {/* Priority */}
          <div className="mb-4">
  <label className="form-label fw-semibold">Priority Level</label>
  <select
    className="form-select"
    name="priorityLevel"
    value={formData.priorityLevel}
    onChange={handleChange}
  >
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>


          {/* Message */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Message</label>
            <textarea className="form-control" rows={5}
              name="message" value={formData.message} onChange={handleChange}
              placeholder="Enter announcement message"
            ></textarea>
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Start Date</label>
            <input type="date" className="form-control" name="startDate"
              value={formData.startDate} onChange={handleChange} />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="form-label fw-semibold">End Date</label>
            <input type="date" className="form-control" name="EndDate"
              value={formData.EndDate} onChange={handleChange} />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Attachments</label>
            <input type="file" className="form-control" onChange={handleImageChange} />
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-3">
            <button type="button" className="btn btn-outline-secondary">Cancel</button>
            <button type="submit" className="btn set_btn text-white">Publish Announcement</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default AddAnnouncements;
