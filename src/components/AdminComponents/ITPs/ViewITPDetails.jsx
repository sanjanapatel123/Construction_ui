// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchITPById } from "../../../redux/slices/itpSlice";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";

// const ViewITPDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { selectedITP, loading, error } = useSelector((state) => state.itps);

//   console.log(selectedITP, "selectedITP");

//   useEffect(() => {
//     dispatch(fetchITPById(id));
//   }, [dispatch, id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!selectedITP) return null;

//   return (
//     <div className="container">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>ITPs Details</h2>
//         <Button
//           onClick={() => navigate(-1)}
//           style={{ backgroundColor: "#0d6efd", color: "white" }}
//         >
//           <i className="fa-solid fa-arrow-left me-2"></i> Back
//         </Button>
//       </div>

//       <div className="card shadow p-4">
//         <h2>Project: {selectedITP.projectName}</h2>
//         <p>
//           <strong>Type:</strong> {selectedITP.InspectionType}
//         </p>
//         <p>
//           <strong>Inspector:</strong> {selectedITP.Inspector?.firstName}{" "}
//           {selectedITP.Inspector?.lastName}
//         </p>
//         <p>
//           <strong>Date:</strong>{" "}
//           {new Date(selectedITP.Date).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>Activity:</strong> {selectedITP.activity}
//         </p>
//         <p>
//           <strong>Criteria:</strong> {selectedITP.criteria}
//         </p>
//         <p>
//           <strong>Status:</strong> {selectedITP.status}
//         </p>
//         <p>
//           <strong>Notes:</strong> {selectedITP.additionalNotes}
//         </p>

//         <h5>Inspection Items</h5>
//         <ul>
//           {selectedITP.InspectionItems?.map((item) => (
//             <li key={item._id}>
//               <strong>{item.itemDescription}</strong> -{" "}
//               {item.status ? "✔️" : "❌"} ({item.comments})
//             </li>
//           ))}
//         </ul>

//         <h5>Images</h5>
//         {selectedITP.image?.map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt={`ITP ${idx}`}
//             className="img-fluid rounded mb-2"
//             style={{ maxHeight: "200px" }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewITPDetails;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchITPById } from "../../../redux/slices/itpSlice";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button, Modal } from "react-bootstrap";

// const ViewITPDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { selectedITP, loading, error } = useSelector((state) => state.itps);

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [modalImageSrc, setModalImageSrc] = useState("");

//   useEffect(() => {
//     dispatch(fetchITPById(id));
//   }, [dispatch, id]);

//   // const downloadPdf = () => {
//   //   const input = pdfRef.current;
//   //   html2canvas(input, { scale: 2 }).then((canvas) => {
//   //     const imgData = canvas.toDataURL("image/png");
//   //     const pdf = new jsPDF("p", "mm", "a4");
//   //     const pdfWidth = pdf.internal.pageSize.getWidth();
//   //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//   //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//   //     pdf.save("swms-details.pdf");
//   //   });
//   // };

//   const handleImageClick = (src) => {
//     setModalImageSrc(src);
//     setShowImageModal(true);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!selectedITP) return null;

//   return (
//     <div className="container">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>ITPs Details</h2>

//        <div className="d-flex">
//           <button
//             className="btn me-2"
//             // onClick={downloadPdf}
//             style={{ backgroundColor: "#0d6efd", color: "white" }}
//           >
//             <i className="fa-solid fa-file-pdf"></i> Download PDF
//           </button>
//         <Button
//           onClick={() => navigate(-1)}
//           style={{ backgroundColor: "#0d6efd", color: "white" }}
//         >
//           <i className="fa-solid fa-arrow-left me-2"></i> Back
//         </Button>
//         </div>
//       </div>

//       <div className="card shadow p-4">
//         <h2>Project: {selectedITP.projectName}</h2>
//         <p><strong>Type:</strong> {selectedITP.InspectionType}</p>
//         <p><strong>Inspector:</strong> {selectedITP.Inspector?.firstName} {selectedITP.Inspector?.lastName}</p>
//         <p><strong>Date:</strong> {new Date(selectedITP.Date).toLocaleDateString()}</p>
//         <p><strong>Activity:</strong> {selectedITP.activity}</p>
//         <p><strong>Criteria:</strong> {selectedITP.criteria}</p>
//         <p><strong>Status:</strong> {selectedITP.status}</p>
//         <p><strong>Notes:</strong> {selectedITP.additionalNotes}</p>

//         <h5>Inspection Items</h5>
//         <ul>
//           {selectedITP.InspectionItems?.map((item) => (
//             <li key={item._id}>
//               <strong>{item.itemDescription}</strong> - {item.status ? "✔️" : "❌"} ({item.comments})
//             </li>
//           ))}
//         </ul>

//         <h5>Images</h5>
//         {selectedITP.image?.map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt={`ITP ${idx}`}
//             className="img-fluid rounded mb-2 me-2"
//             style={{ maxHeight: "200px", cursor: "pointer" }}
//             onClick={() => handleImageClick(img)}
//           />
//         ))}
//       </div>

//       {/* Modal for Enlarged Image */}
//       <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered size="lg">
//         <Modal.Body className="text-center">
//           <img src={modalImageSrc} alt="Full View" className="img-fluid rounded" />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ViewITPDetails;


import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchITPById } from "../../../redux/slices/itpSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ViewITPDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedITP, loading, error } = useSelector((state) => state.itps);

  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const pdfRef = useRef(); // Ref for PDF content

  useEffect(() => {
    dispatch(fetchITPById(id));
  }, [dispatch, id]);

  const handleImageClick = (src) => {
    setModalImageSrc(src);
    setShowImageModal(true);
  };

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("ITP-details.pdf");
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedITP) return null;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>ITPs Details</h2>

        <div className="d-flex">
          <button
            className="btn me-2"
            onClick={downloadPdf}
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-file-pdf"></i> Download PDF
          </button>
          <Button
            onClick={() => navigate(-1)}
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back
          </Button>
        </div>
      </div>

      {/* Content to be included in the PDF */}
      <div className="card shadow p-4" ref={pdfRef}>
        <h2>Project: {selectedITP.projectName}</h2>
        <p><strong>Type:</strong> {selectedITP.InspectionType}</p>
        <p><strong>Inspector:</strong> {selectedITP.Inspector?.firstName} {selectedITP.Inspector?.lastName}</p>
        <p><strong>Date:</strong> {new Date(selectedITP.Date).toLocaleDateString()}</p>
        <p><strong>Activity:</strong> {selectedITP.activity}</p>
        <p><strong>Criteria:</strong> {selectedITP.criteria}</p>
        <p><strong>Status:</strong> {selectedITP.status}</p>
        <p><strong>Notes:</strong> {selectedITP.additionalNotes}</p>

        <h5>Inspection Items</h5>
        <ul>
          {selectedITP.InspectionItems?.map((item) => (
            <li key={item._id}>
              <strong>{item.itemDescription}</strong> - {item.status ? "✔️" : "❌"} ({item.comments})
            </li>
          ))}
        </ul>

        <h5>Images</h5>
        {selectedITP.image?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`ITP ${idx}`}
            className="img-fluid rounded mb-2 me-2"
            style={{ maxHeight: "200px", cursor: "pointer" }}
            onClick={() => handleImageClick(img)}
          />
        ))}
      </div>

      {/* Modal for Enlarged Image */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered size="lg">
        <Modal.Body className="text-center">
          <img src={modalImageSrc} alt="Full View" className="img-fluid rounded" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewITPDetails;

