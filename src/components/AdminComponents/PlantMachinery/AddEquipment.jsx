




import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
// import { updateEquipment } from "../../../redux/slices/equipmentSlice";
import {  addEquipment, updateEquipment, getequipmentById } from "../../../redux/slices/equipmentSlice"; // adjust import path
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddEquipment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const equipmentId = id;

  const [formData, setFormData] = useState({
    equipmentID: "",
    name: "",
    type: "",
    location: "",
    purchaseDate: "",
    purchaseCost: "",
    description: "",
    inspectionItems: [],
    image: [],
  });

  const [newInspectionItem, setNewInspectionItem] = useState("");

  useEffect(() => {
    if (equipmentId) {
      dispatch(getequipmentById(equipmentId)).then(({ payload }) => {
        console.log("in edit equipment ", payload);

        setFormData({
          equipmentID: payload.equipmentID || "",
          name: payload.name || "",
          type: payload.type || "",
          location: payload.location || "",
          purchaseDate: payload.purchaseDate ? payload.purchaseDate.slice(0, 10) : "",
          purchaseCost: payload.purchaseCost || "",
          description: payload.description || "",
          inspectionItems: payload.inspectionItems || [],
          image: payload.image || [],
        });
      });
    }
  }, [dispatch, equipmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      image: [...prevData.image, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("equipmentID", formData.equipmentID);
    form.append("name", formData.name);
    form.append("type", formData.type);
    form.append("location", formData.location);
    form.append("purchaseDate", formData.purchaseDate);
    form.append("purchaseCost", formData.purchaseCost);
    form.append("description", formData.description);
    form.append("inspectionItems", JSON.stringify(formData.inspectionItems));

    formData.image.forEach((img) => {
      if (typeof img === "string") {
        form.append("existingImageUrls", img);
      } else {
        form.append("image", img);
      }
    });

    try {
      if (equipmentId) {
        console.log("in edit equipment form ", form);
        await dispatch(updateEquipment({ id: equipmentId, equipmentData: form })).unwrap()
        .then(() => {
          toast.success("Equipment updated successfully!");
          navigate("/PlantMachinery");
        }).catch(() => {
          toast.error("Failed to update equipment!");
          navigate("/PlantMachinery");
        })
      } else {
        await dispatch(addEquipment(form));
      }
      navigate("/PlantMachinery");
    } catch (error) {
      console.error("Error saving equipment:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center py-4" style={{ fontSize: "14px" }}>
      <div className="bg-white p-4 rounded shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold m-0">{equipmentId ? "Edit Equipment" : "Add New Equipment"}</h4>
          <button
            onClick={() => navigate(-1)}
            className="btn"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-arrow-left me-2"></i>Back to Overview
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Equipment ID</label>
              <input
                type="text"
                className="form-control"
                name="equipmentID"
                value={formData.equipmentID}
                onChange={handleChange}
                placeholder="Enter Equipment ID"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Equipment Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Equipment Name"
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Power Tool">Power Tool</option>
                <option value="type2"> </option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <select
                className="form-select"
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="">Select Location</option>
                <option value="Warehouse A">Warehouse A</option>
                <option value="Warehouse B">Warehouse B</option>
              </select>
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">Purchase Date</label>
              <input
                type="date"
                className="form-control"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Purchase Cost</label>
              <input
                type="number"
                className="form-control"
                name="purchaseCost"
                value={formData.purchaseCost}
                onChange={handleChange}
                placeholder="Enter Cost"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter equipment description"
              rows={4}
            />
          </div>

          <div className="mt-3">
            <label className="form-label">Upload Equipment Images</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              multiple
              accept="image/png, image/jpeg, image/jpg, image/gif"
            />
          </div>

          <div className="mt-4 d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <Button
              style={{ backgroundColor: "#0052CC", borderColor: "#0052CC" }}
              type="submit"
            >
              {equipmentId ? "Update Equipment" : "Save Equipment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEquipment;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addEquipment, updateEquipment, getequipmentById } from "../../../redux/slices/equipmentSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Button } from "react-bootstrap";

// function AddEquipment() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const equipmentId = id;
//   console.log( equipmentId)

//   const { loading, error } = useSelector((state) => state.equipments);

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     purchaseDate: "",
//     condition: "Good",
//     location: "",
//     description: "",
//     image: [],
//   });

//   useEffect(() => {
//     if (equipmentId) {
//       dispatch(getequipmentById(equipmentId)).then(({ payload }) => {
//         console.log("in edit equipment ",payload);
//         if (payload ) {
//           setFormData({
//             name: payload.name || "",
//             category: payload.category || "",
//             purchaseDate: payload.data.purchaseDate ? payload.data.purchaseDate.slice(0, 10) : "",
//             condition: payload.data.condition || "Good",
//             location: payload.location || "",
//             description: payload.data.description || "",
//             image: payload.data.image || [],
//           });
//         }
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
//     form.append("name", formData.name);
//     form.append("category", formData.category);
//     form.append("purchaseDate", formData.purchaseDate);
//     form.append("condition", formData.condition);
//     form.append("location", formData.location);
//     form.append("description", formData.description);

//     formData.image.forEach((img) => {
//       if (typeof img === "string") {
//         form.append("existingImageUrls", img);
//       } else {
//         form.append("image", img);
//       }
//     });

//     try {
//       if (equipmentId) {
//         await dispatch(updateEquipment({ id: equipmentId, updatedEntry: form })).unwrap()
//           .then(() => {
//             toast.success("Equipment updated successfully!");
//             navigate("/PlantMachinery");
//           })
//           .catch(() => {
//             toast.error("Failed to update equipment!");
//             navigate("/PlantMachinery");
//           });
//       } else {
//         await dispatch(addEquipment(form)).unwrap()
//           .then(() => {
//             toast.success("Equipment added successfully!");
//             navigate("/equipmentList");
//           })
//           .catch(() => {
//             toast.error("Failed to add equipment!");
//             navigate("/equipmentList");
//           });
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       toast.error("Failed to submit equipment!");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <ToastContainer />
//       <h2>{equipmentId ? "Edit Equipment" : "Add Equipment"}</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label>Name</label>
//           <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Category</label>
//           <input type="text" className="form-control" name="category" value={formData.category} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Purchase Date</label>
//           <input type="date" className="form-control" name="purchaseDate" value={formData.purchaseDate} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Condition</label>
//           <select className="form-control" name="condition" value={formData.condition} onChange={handleInputChange}>
//             <option value="Good">Good</option>
//             <option value="Fair">Fair</option>
//             <option value="Poor">Poor</option>
//           </select>
//         </div>

//         <div className="form-group mt-3">
//           <label>Location</label>
//           <input type="text" className="form-control" name="location" value={formData.location} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Description</label>
//           <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Upload Images</label>
//           <input type="file" name="image" multiple className="form-control" onChange={handleFileUpload} />
//           {formData.image.length > 0 && (
//             <ul className="mt-2">
//               {formData.image.map((file, index) => (
//                 <li key={index}>
//                   {typeof file === "string" ? (
//                     <a href={file} target="_blank" rel="noopener noreferrer">Existing Image {index + 1}</a>
//                   ) : (
//                     file.name
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="mt-4">
//           <Button variant="secondary" onClick={() => navigate(-1)} className="me-2">
//             Cancel
//           </Button>
//           <Button variant="primary" type="submit" disabled={loading}>
//             {loading ? "Submitting..." : equipmentId ? "Update Equipment" : "Add Equipment"}
//           </Button>
//         </div>

//         {error && <p className="text-danger mt-2">{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default AddEquipment;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addEquipment, updateEquipment, getequipmentById } from "../../../redux/slices/equipmentSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Button } from "react-bootstrap";

// function AddEquipment() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const equipmentId = id;
//   console.log(equipmentId);

//   const { loading, error, selectedEquipment } = useSelector((state) => state.equipments);

//   const [formData, setFormData] = useState({
//     equipmentID:"",
//     name: "",
//     category: "",
//     purchaseDate: "",
//     purchaseCost:"",
//     condition: "Good",
//     location: "",
//     description: "",
//     image: [],
//   });

//   useEffect(() => {
//     if (equipmentId) {
//       dispatch(getequipmentById(equipmentId)).then(({ payload }) => {
//         console.log("in edit equipment ", payload);
//         if (payload) {
//           setFormData({
//             equipmentID: payload.equipmentID || "",
//             name: payload.name || "",
//             category: payload.category || "",
//             purchaseDate: payload?.purchaseDate ? payload.purchaseDate.slice(0, 10) : "",
//             condition: payload?.condition || "Good",
//             location: payload.location || "",
//             description: payload?.description || "",
//             image: payload?.image || [],
//           })
//         }
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
//     form.append("equipmentID", formData.equipmentID);
//     form.append("name", formData.name);
//     form.append("category", formData.category);
//     // form.append("purchaseDate", formData.purchaseDate);
//     form.append("condition", formData.condition);
//     form.append("location", formData.location);
//     form.append("description", formData.description);

//     formData.image.forEach((img) => {
//       if (typeof img === "string") {
//         form.append("existingImageUrls", img);
//       } else {
//         form.append("image", img);
//       }
//     });

//     try {
//       if (equipmentId) {
//         await dispatch(updateEquipment({ id: equipmentId, updatedData: form })).unwrap()
//           .then(() => {
//             toast.success("Equipment updated successfully!");
//             navigate("/PlantMachinery");
//           })
//           .catch(() => {
//             toast.error("Failed to update equipment!");
//           });
//       } else {
//         await dispatch(addEquipment(form)).unwrap()
//           .then(() => {
//             toast.success("Equipment added successfully!");
//             navigate("/PlantMachinery");
//           })
//           .catch(() => {
//             toast.error("Failed to add equipment!");
//           });
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       toast.error("Failed to submit equipment!");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <ToastContainer />
//       <h2>{equipmentId ? "Edit Equipment" : "Add Equipment"}</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label>Name</label>
//           <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>EquipmentID</label>
//           <input type="text" className="form-control" name="equipmentID" value={formData.equipmentID} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Category</label>
//           <input type="text" className="form-control" name="category" value={formData.category} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Category</label>
//           <input type="text" className="form-control" name="category" value={formData.category} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Purchase Date</label>
//           <input type="date" className="form-control" name="purchaseDate" value={formData.purchaseDate} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Purchase Cost</label>
//           <input type="date" className="form-control" name="purchaseCost" value={formData.purchaseCost} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Condition</label>
//           <select className="form-control" name="condition" value={formData.condition} onChange={handleInputChange}>
//             <option value="Good">Good</option>
//             <option value="Fair">Fair</option>
//             <option value="Poor">Poor</option>
//           </select>
//         </div>

//         <div className="form-group mt-3">
//           <label>Location</label>
//           <input type="text" className="form-control" name="location" value={formData.location} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Description</label>
//           <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleInputChange} />
//         </div>

//         <div className="form-group mt-3">
//           <label>Upload Images</label>
//           <input type="file" name="image" multiple className="form-control" onChange={handleFileUpload} />
//           {formData.image.length > 0 && (
//             <ul className="mt-2">
//               {formData.image.map((file, index) => (
//                 <li key={index}>
//                   {typeof file === "string" ? (
//                     <a href={file} target="_blank" rel="noopener noreferrer">Existing Image {index + 1}</a>
//                   ) : (
//                     file.name
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="mt-4">
//           <Button variant="secondary" onClick={() => navigate(-1)} className="me-2">
//             Cancel
//           </Button>
//           <Button variant="primary" type="submit" disabled={loading}>
//             {loading ? "Submitting..." : equipmentId ? "Update Equipment" : "Add Equipment"}
//           </Button>
//         </div>

//         {error && <p className="text-danger mt-2">{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default AddEquipment;



