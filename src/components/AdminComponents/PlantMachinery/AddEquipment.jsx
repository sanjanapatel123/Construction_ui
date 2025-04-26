// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";

// function AddEquipment() {
//   // const [formData, setFormData] = useState({
//   //   equipmentID: "",
//   //   name: "",
//   //   type: "",
//   //   location: "",
//   //   purchaseDate: "",
//   //   purchaseCost: "",
   
//   //   description: "",
//   //   image: []
//   // });

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [name]: value,
//   //   }));
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Handle form submission here
//   //   console.log("Form submitted:", formData);
//   // };

//   // const navigate = useNavigate();



//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { equipmentId } = useParams();

//   const [formData, setFormData] = useState({
//     equipmentID: '',
//     name: '',
//     type: '',
//     location: '',
//     purchaseDate: '',
//     purchaseCost: '',
//     description: '',
//     inspectionItems: [],
//     image: [],
//   });

//   const [newInspectionItem, setNewInspectionItem] = useState('');

//   useEffect(() => {
//     if (equipmentId) {
//       dispatch(fetchEquipment(equipmentId)).then(({ payload }) => {
//         setFormData({
//           equipmentID: payload.equipmentID || '',
//           name: payload.name || '',
//           type: payload.type || '',
//           location: payload.location || '',
//           purchaseDate: payload.purchaseDate ? payload.purchaseDate.slice(0, 10) : '',
//           purchaseCost: payload.purchaseCost || '',
//           description: payload.description || '',
//           inspectionItems: payload.inspectionItems || [],
//           image: payload.image || [],
//         });
//       });
//     }
//   }, [dispatch, equipmentId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prevData) => ({
//       ...prevData,
//       image: [...prevData.image, ...files],
//     }));
//   };

//   const handleAddInspectionItem = () => {
//     if (newInspectionItem.trim() !== '') {
//       setFormData((prevData) => ({
//         ...prevData,
//         inspectionItems: [...prevData.inspectionItems, newInspectionItem.trim()],
//       }));
//       setNewInspectionItem('');
//     }
//   };

//   const handleDeleteInspectionItem = (index) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       inspectionItems: prevData.inspectionItems.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('equipmentID', formData.equipmentID);
//     form.append('name', formData.name);
//     form.append('type', formData.type);
//     form.append('location', formData.location);
//     form.append('purchaseDate', formData.purchaseDate);
//     form.append('purchaseCost', formData.purchaseCost);
//     form.append('description', formData.description);
//     form.append('inspectionItems', JSON.stringify(formData.inspectionItems));

//     formData.image.forEach((img) => {
//       if (typeof img === 'string') {
//         form.append('existingImageUrls', img);
//       } else {
//         form.append('image', img);
//       }
//     });

//     try {
//       if (equipmentId) {
//         await dispatch(updateEquipment({ id: equipmentId, equipmentData: form }));
//       } else {
//         await dispatch(createEquipment(form));
//       }
//       navigate('/equipment'); // Adjust based on your route
//     } catch (error) {
//       console.error('Error saving equipment:', error);
//     }
//   };
//   return (
//     <div
//       className="container d-flex justify-content-center py-4"
//       style={{ fontSize: "14px" }}
//     >
//       <div className="bg-white p-4 rounded shadow-sm w-100">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h4 className="fw-semibold m-0">Add New Equipment</h4>
//           {/* <button className="btn btn-link text-dark p-0">Cancel</button> */}
//           <button
//             onClick={() => navigate(-1)}
//             className="btn " style={{backgroundColor:"#0d6efd",color:"white"}}
//           >
//             <i class="fa-solid fa-arrow-left me-2"></i>Back to Overview
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label className="form-label">Equipment ID</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="equipmentId"
//                 value={formData.equipmentId}
//                 onChange={handleInputChange}
//                 placeholder="Enter Equipment ID"
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Equipment Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="equipmentName"
//                 value={formData.equipmentName}
//                 onChange={handleInputChange}
//                 placeholder="Enter Equipment Name"
//               />
//             </div>
//           </div>

//           <div className="row g-3 mt-2">
//             <div className="col-md-6">
//               <label className="form-label">Type</label>
//               <select
//                 className="form-select"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Type</option>
//                 <option value="type1">Type 1</option>
//                 <option value="type2">Type 2</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Location</label>
//               <select
//                 className="form-select"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Location</option>
//                 <option value="location1">Location 1</option>
//                 <option value="location2">Location 2</option>
//               </select>
//             </div>
//           </div>

//           <div className="row g-3 mt-2">
//             <div className="col-md-6">
//               <label className="form-label">Purchase Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="purchaseDate"
//                 value={formData.purchaseDate}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Purchase Cost</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="purchaseCost"
//                 value={formData.purchaseCost}
//                 onChange={handleInputChange}
//                 placeholder="Enter Cost"
//               />
//             </div>
//           </div>

//           <div className="mt-3">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               placeholder="Enter equipment description"
//               rows={4}
//             />
//           </div>

//           <div className="mt-3">
//             <label className="form-label">Upload Equipment Images</label>
//             <div className="border rounded p-3 text-center">
//               <div className="mb-2">
//                 <i className="fas fa-cloud-upload-alt fa-2x text-secondary"></i>
//               </div>
//               <div className="text-muted">
//                 Upload files or drag and drop
//                 <br />
//                 PNG, JPG, GIF up to 10MB
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 d-flex justify-content-end gap-2">
//             <button type="button" className="btn btn-light">
//               Cancel
//             </button>
//             <Button
//               style={{ backgroundColor: "#0052CC" }}
//               type="submit"
//               // className="btn btn-dark"
//             >
//               Save Equipment
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddEquipment;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addEquipment,
//   fetchEquipment,
//   updateEquipment,
// } from '../../../redux/slices/equipmentSlice'; // Modified for equipment
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function AddEquipment() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const equipmentId = id;

//   const { equipment } = useSelector((state) => state.equipments);
//   const { loading, error } = useSelector((state) => state.equipments);

//   const [formData, setFormData] = useState({
//     equipmentName: '',
//     equipmentType: '',
//     purchaseDate: '',
//     condition: 'New',
//     image: [],
//     notes: '',
//   });

//   useEffect(() => {
//     if (equipmentId) {
//       dispatch(fetchEquipment(equipmentId)).then(({ payload }) => {
//         setFormData({
//           equipmentName: payload.equipmentName,
//           equipmentType: payload.equipmentType,
//           purchaseDate: payload.purchaseDate.slice(0, 16),
//           condition: payload.condition,
//           image: payload.image || [],
//           notes: payload.notes,
//         });
//       });
//     }
//   }, [dispatch, equipmentId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       image: [...prev.image, ...files],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append('equipmentName', formData.equipmentName);
//     form.append('equipmentType', formData.equipmentType);
//     form.append('purchaseDate', formData.purchaseDate);
//     form.append('condition', formData.condition);
//     form.append('notes', formData.notes);

//     formData.image.forEach((img) => {
//       if (typeof img === 'string') {
//         form.append('existingImageUrls', img); // existing Cloudinary URLs
//       } else {
//         form.append('image', img); // new files
//       }
//     });

//     try {
//       if (equipmentId) {
//         await dispatch(updateEquipment({ id: equipmentId, updatedData: form })).unwrap()
//           .then(() => {
//             toast.success("Equipment Updated Successfully!");
//             navigate('/equipment');
//           })
//           .catch(() => {
//             toast.error("Failed to update equipment!");
//             navigate('/equipment');
//           });
//       } else {
//         await dispatch(addEquipment(form)).unwrap()
//           .then(() => {
//             toast.success("Equipment Added Successfully!");
//             navigate('/equipment');
//           })
//           .catch(() => {
//             toast.error("Failed to add equipment!");
//             navigate('/equipment');
//           });
//       }
//     } catch (err) {
//       console.error('Submission error:', err);
//       toast.error("Failed to submit equipment");
//     }
//   };

//   return (
//     <div className="container py-4">
//       <ToastContainer />
//       <div className="d-flex justify-content-between">
//         <h4 className="mb-4">{equipmentId ? 'Edit Equipment' : 'Add New Equipment'}</h4>
//         <Link to="/equipment">
//           <button className="btn text-white" style={{ backgroundColor: '#0d6efd' }}>
//             <i className="fa-solid fa-arrow-left me-2"></i>Back
//           </button>
//         </Link>
//       </div>

//       <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Equipment Name</label>
//             <input type="text" className="form-control" name="equipmentName" value={formData.equipmentName} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Equipment Type</label>
//             <input type="text" className="form-control" name="equipmentType" value={formData.equipmentType} onChange={handleInputChange} />
//           </div>
//           <div className="col-md-6 mt-3">
//             <label className="form-label">Purchase Date</label>
//             <input type="datetime-local" className="form-control" name="purchaseDate" value={formData.purchaseDate} onChange={handleInputChange} />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Condition</label>
//             <select className="form-select" name="condition" value={formData.condition} onChange={handleInputChange}>
//               <option value="New">New</option>
//               <option value="Used">Used</option>
//               <option value="Refurbished">Refurbished</option>
//             </select>
//           </div>
//         </div>

//         <div className="mb-3">
//           <h5 className="mb-3">Attachments</h5>
//           <div className="border rounded p-3 text-center">
//             <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
//             <p className="mb-1">Upload equipment images or documents</p>
//             <input type="file" name="image" multiple className="d-none" onChange={handleFileUpload} id="fileUpload" />
//             <label htmlFor="fileUpload" className="btn btn-outline-primary btn-sm">
//               Browse Files
//             </label>
//             {formData.image.length > 0 && (
//               <ul className="mt-3 text-start">
//                 {formData.image.map((file, i) => (
//                   <li key={i}>
//                     {typeof file === 'string' ? (
//                       <a href={file} target="_blank" rel="noopener noreferrer">Existing File {i + 1}</a>
//                     ) : (
//                       file.name
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Notes</label>
//           <textarea className="form-control" rows="4" name="notes" value={formData.notes} onChange={handleInputChange} />
//         </div>

//         <div className="d-flex justify-content-end gap-2 mt-4">
//           <button type="submit" className="btn btn-primary">{equipmentId ? 'Update Equipment' : 'Add Equipment'}</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AddEquipment;

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// // import { fetchEquipment, createEquipment, updateEquipment } from '../yourSliceFile'; // adjust import
// import {
//   addEquipment,
//   fetchEquipment,
//   updateEquipment,
// } from '../../../redux/slices/equipmentSlice';
// import { useParams, useNavigate } from 'react-router-dom';

// const EquipmentForm = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { equipmentId } = useParams();

  // const [formData, setFormData] = useState({
  //   equipmentID: '',
  //   name: '',
  //   type: '',
  //   location: '',
  //   purchaseDate: '',
  //   purchaseCost: '',
  //   description: '',
  //   inspectionItems: [],
  //   image: [],
  // });

  // const [newInspectionItem, setNewInspectionItem] = useState('');

  // useEffect(() => {
  //   if (equipmentId) {
  //     dispatch(fetchEquipment(equipmentId)).then(({ payload }) => {
  //       setFormData({
  //         equipmentID: payload.equipmentID || '',
  //         name: payload.name || '',
  //         type: payload.type || '',
  //         location: payload.location || '',
  //         purchaseDate: payload.purchaseDate ? payload.purchaseDate.slice(0, 10) : '',
  //         purchaseCost: payload.purchaseCost || '',
  //         description: payload.description || '',
  //         inspectionItems: payload.inspectionItems || [],
  //         image: payload.image || [],
  //       });
  //     });
  //   }
  // }, [dispatch, equipmentId]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     image: [...prevData.image, ...files],
  //   }));
  // };

  // const handleAddInspectionItem = () => {
  //   if (newInspectionItem.trim() !== '') {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       inspectionItems: [...prevData.inspectionItems, newInspectionItem.trim()],
  //     }));
  //     setNewInspectionItem('');
  //   }
  // };

  // const handleDeleteInspectionItem = (index) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     inspectionItems: prevData.inspectionItems.filter((_, i) => i !== index),
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const form = new FormData();
  //   form.append('equipmentID', formData.equipmentID);
  //   form.append('name', formData.name);
  //   form.append('type', formData.type);
  //   form.append('location', formData.location);
  //   form.append('purchaseDate', formData.purchaseDate);
  //   form.append('purchaseCost', formData.purchaseCost);
  //   form.append('description', formData.description);
  //   form.append('inspectionItems', JSON.stringify(formData.inspectionItems));

  //   formData.image.forEach((img) => {
  //     if (typeof img === 'string') {
  //       form.append('existingImageUrls', img);
  //     } else {
  //       form.append('image', img);
  //     }
  //   });

  //   try {
  //     if (equipmentId) {
  //       await dispatch(updateEquipment({ id: equipmentId, equipmentData: form }));
  //     } else {
  //       await dispatch(createEquipment(form));
  //     }
  //     navigate('/equipment'); // Adjust based on your route
  //   } catch (error) {
  //     console.error('Error saving equipment:', error);
  //   }
  // };

//   return (
//     <div>
//       <h2>{equipmentId ? 'Edit Equipment' : 'Add Equipment'}</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div>
//           <label>Equipment ID:</label>
//           <input
//             type="text"
//             name="equipmentID"
//             value={formData.equipmentID}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Type:</label>
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Location:</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Purchase Date:</label>
//           <input
//             type="date"
//             name="purchaseDate"
//             value={formData.purchaseDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Purchase Cost:</label>
//           <input
//             type="number"
//             name="purchaseCost"
//             value={formData.purchaseCost}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Inspection Items:</label>
//           <input
//             type="text"
//             value={newInspectionItem}
//             onChange={(e) => setNewInspectionItem(e.target.value)}
//           />
//           <button type="button" onClick={handleAddInspectionItem}>
//             Add Item
//           </button>
//           <ul>
//             {formData.inspectionItems.map((item, index) => (
//               <li key={index}>
//                 {item}{' '}
//                 <button type="button" onClick={() => handleDeleteInspectionItem(index)}>
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <label>Upload Images:</label>
//           <input
//             type="file"
//             name="image"
//             multiple
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//           <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
//             {formData.image.map((img, index) => (
//               <div key={index} style={{ marginRight: '10px' }}>
//                 {typeof img === 'string' ? (
//                   <img src={img} alt={`Equipment ${index}`} width="100" height="100" />
//                 ) : (
//                   <img src={URL.createObjectURL(img)} alt={`New Upload ${index}`} width="100" height="100" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit">
//           {equipmentId ? 'Update Equipment' : 'Add Equipment'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EquipmentForm;




// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Button } from "react-bootstrap";
// // import { updateEquipment } from "../../../redux/slices/equipmentSlice";
// import { fetchEquipment, addEquipment, updateEquipment } from "../../../redux/slices/equipmentSlice"; // adjust import path

// function AddEquipment() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { equipmentId } = useParams();

//   const [formData, setFormData] = useState({
//     equipmentID: "",
//     name: "",
//     type: "",
//     location: "",
//     purchaseDate: "",
//     purchaseCost: "",
//     description: "",
//     inspectionItems: [],
//     image: [],
//   });

//   const [newInspectionItem, setNewInspectionItem] = useState("");

//   useEffect(() => {
//     if (equipmentId) {
//       dispatch(fetchEquipment(equipmentId)).then(({ payload }) => {
//         setFormData({
//           equipmentID: payload.equipmentID || "",
//           name: payload.name || "",
//           type: payload.type || "",
//           location: payload.location || "",
//           purchaseDate: payload.purchaseDate ? payload.purchaseDate.slice(0, 10) : "",
//           purchaseCost: payload.purchaseCost || "",
//           description: payload.description || "",
//           inspectionItems: payload.inspectionItems || [],
//           image: payload.image || [],
//         });
//       });
//     }
//   }, [dispatch, equipmentId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prevData) => ({
//       ...prevData,
//       image: [...prevData.image, ...files],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("equipmentID", formData.equipmentID);
//     form.append("name", formData.name);
//     form.append("type", formData.type);
//     form.append("location", formData.location);
//     form.append("purchaseDate", formData.purchaseDate);
//     form.append("purchaseCost", formData.purchaseCost);
//     form.append("description", formData.description);
//     form.append("inspectionItems", JSON.stringify(formData.inspectionItems));

//     formData.image.forEach((img) => {
//       if (typeof img === "string") {
//         form.append("existingImageUrls", img);
//       } else {
//         form.append("image", img);
//       }
//     });

//     try {
//       if (equipmentId) {
//         await dispatch(updateEquipment({ id: equipmentId, equipmentData: form }));
//       } else {
//         await dispatch(addEquipment(form));
//       }
//       navigate("/equipment");
//     } catch (error) {
//       console.error("Error saving equipment:", error);
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center py-4" style={{ fontSize: "14px" }}>
//       <div className="bg-white p-4 rounded shadow-sm w-100">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h4 className="fw-semibold m-0">{equipmentId ? "Edit Equipment" : "Add New Equipment"}</h4>
//           <button
//             onClick={() => navigate(-1)}
//             className="btn"
//             style={{ backgroundColor: "#0d6efd", color: "white" }}
//           >
//             <i className="fa-solid fa-arrow-left me-2"></i>Back to Overview
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label className="form-label">Equipment ID</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="equipmentID"
//                 value={formData.equipmentID}
//                 onChange={handleChange}
//                 placeholder="Enter Equipment ID"
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Equipment Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter Equipment Name"
//               />
//             </div>
//           </div>

//           <div className="row g-3 mt-2">
//             <div className="col-md-6">
//               <label className="form-label">Type</label>
//               <select
//                 className="form-select"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Type</option>
//                 <option value="type1">Type 1</option>
//                 <option value="type2">Type 2</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Location</label>
//               <select
//                 className="form-select"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Location</option>
//                 <option value="location1">Location 1</option>
//                 <option value="location2">Location 2</option>
//               </select>
//             </div>
//           </div>

//           <div className="row g-3 mt-2">
//             <div className="col-md-6">
//               <label className="form-label">Purchase Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="purchaseDate"
//                 value={formData.purchaseDate}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Purchase Cost</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="purchaseCost"
//                 value={formData.purchaseCost}
//                 onChange={handleChange}
//                 placeholder="Enter Cost"
//               />
//             </div>
//           </div>

//           <div className="mt-3">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter equipment description"
//               rows={4}
//             />
//           </div>

//           <div className="mt-3">
//             <label className="form-label">Upload Equipment Images</label>
//             <input
//               type="file"
//               className="form-control"
//               onChange={handleImageChange}
//               multiple
//               accept="image/png, image/jpeg, image/jpg, image/gif"
//             />
//           </div>

//           <div className="mt-4 d-flex justify-content-end gap-2">
//             <button
//               type="button"
//               className="btn btn-light"
//               onClick={() => navigate(-1)}
//             >
//               Cancel
//             </button>
//             <Button
//               style={{ backgroundColor: "#0052CC", borderColor: "#0052CC" }}
//               type="submit"
//             >
//               {equipmentId ? "Update Equipment" : "Save Equipment"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddEquipment;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEquipment, updateEquipment, getequipmentById } from "../../../redux/slices/equipmentSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";

function AddEquipment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const equipmentId = id;

  const { loading, error } = useSelector((state) => state.equipments);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    purchaseDate: "",
    condition: "Good",
    location: "",
    description: "",
    image: [],
  });

  useEffect(() => {
    if (equipmentId) {
      dispatch(getequipmentById(equipmentId)).then(({ payload }) => {
        if (payload && payload.data) {
          setFormData({
            name: payload.data.name || "",
            category: payload.data.category || "",
            purchaseDate: payload.data.purchaseDate ? payload.data.purchaseDate.slice(0, 10) : "",
            condition: payload.data.condition || "Good",
            location: payload.data.location || "",
            description: payload.data.description || "",
            image: payload.data.image || [],
          });
        }
      });
    }
  }, [dispatch, equipmentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("purchaseDate", formData.purchaseDate);
    form.append("condition", formData.condition);
    form.append("location", formData.location);
    form.append("description", formData.description);

    formData.image.forEach((img) => {
      if (typeof img === "string") {
        form.append("existingImageUrls", img);
      } else {
        form.append("image", img);
      }
    });

    try {
      if (equipmentId) {
        await dispatch(updateEquipment({ id: equipmentId, updatedEntry: form })).unwrap()
          .then(() => {
            toast.success("Equipment updated successfully!");
            navigate("/PlantMachinery");
          })
          .catch(() => {
            toast.error("Failed to update equipment!");
            navigate("/PlantMachinery");
          });
      } else {
        await dispatch(addEquipment(form)).unwrap()
          .then(() => {
            toast.success("Equipment added successfully!");
            navigate("/equipmentList");
          })
          .catch(() => {
            toast.error("Failed to add equipment!");
            navigate("/equipmentList");
          });
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit equipment!");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2>{equipmentId ? "Edit Equipment" : "Add Equipment"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
        </div>

        <div className="form-group mt-3">
          <label>Category</label>
          <input type="text" className="form-control" name="category" value={formData.category} onChange={handleInputChange} />
        </div>

        <div className="form-group mt-3">
          <label>Purchase Date</label>
          <input type="date" className="form-control" name="purchaseDate" value={formData.purchaseDate} onChange={handleInputChange} />
        </div>

        <div className="form-group mt-3">
          <label>Condition</label>
          <select className="form-control" name="condition" value={formData.condition} onChange={handleInputChange}>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label>Location</label>
          <input type="text" className="form-control" name="location" value={formData.location} onChange={handleInputChange} />
        </div>

        <div className="form-group mt-3">
          <label>Description</label>
          <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleInputChange} />
        </div>

        <div className="form-group mt-3">
          <label>Upload Images</label>
          <input type="file" name="image" multiple className="form-control" onChange={handleFileUpload} />
          {formData.image.length > 0 && (
            <ul className="mt-2">
              {formData.image.map((file, index) => (
                <li key={index}>
                  {typeof file === "string" ? (
                    <a href={file} target="_blank" rel="noopener noreferrer">Existing Image {index + 1}</a>
                  ) : (
                    file.name
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <Button variant="secondary" onClick={() => navigate(-1)} className="me-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : equipmentId ? "Update Equipment" : "Add Equipment"}
          </Button>
        </div>

        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default AddEquipment;




