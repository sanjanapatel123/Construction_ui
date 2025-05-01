// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
// } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";

// import { fetchProjects } from "../../../redux/slices/projectSlice";
// import { fetchAudit } from "../../../redux/slices/auditSlice";

// function AuditReports() {
//   const [search, setSearch] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();




//   useEffect(() => {
//     dispatch(fetchAudit());
  
//     // dispatch(fetchProjects());
//   }, [dispatch]);

//   const { audit, loading, error } = useSelector((state) => state.audit);
//   console.log( "audit", audit);
//   const projects = useSelector((state) => state.projects.data);

//   // const auditReportsList = Array.isArray(auditReports) ? auditReports : [];

//   const handleSearchChange = (e) => setSearch(e.target.value);

//   const filteredAuditReports =  audit?.data;
  
//   // const filteredAuditReports =  audit?.data.filter((report) =>
//   //   report.auditedBy.toLowerCase().includes(search.toLowerCase())
//   // );

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteAuditReport(id))
//           .then((response) => {
//             if (response.meta.requestStatus === "fulfilled") {
//               dispatch(fetchAudit());
//               navigate("/audit-reports");
//             }
//           })
//           .catch(() => {
//             // Handle error
//           });
//       }
//     });
//   };

//   const getProjectName = (projectId) => {
//     const project = projects.find((p) => p.id === projectId);
//     return project ? project.name : "Unknown Project";
//   };

//   // Sample template data for audit reports
//   const templates = [
//     {
//       id: 1,
//       title: "Safety Compliance Audit",
//       description: "Standard audit template for evaluating workplace safety compliance.",
//     },
//     {
//       id: 2,
//       title: "Environmental Audit",
//       description: "Comprehensive checklist for environmental compliance and practices.",
//     },
//     {
//       id: 3,
//       title: "Quality Control Audit",
//       description: "Framework for assessing quality control processes and standards.",
//     },
//     {
//       id: 4,
//       title: "Workplace Health Assessment",
//       description: "Evaluation of health hazards and preventive measures in the workplace.",
//     },
//     {
//       id: 5,
//       title: "Site Inspection Audit",
//       description: "Detailed inspection template for construction or work sites.",
//     },
//     {
//       id: 6,
//       title: "Equipment Safety Audit",
//       description: "Checklist for machinery and equipment safety compliance.",
//     },
//   ];

//   const handleUseTemplate = (title) => {
//     navigate("/audit-template", { state: { title } });
//   };

//   return (
//     <Container
//       fluid
//       className="p-4"
//       style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
//     >
//       {/* Header Section */}
//       <div className="dashboard-header">
//         <h3>Audit Reports</h3>
//         <p>Manage and monitor your audit documentation</p>
//       </div>
      
//       {/* Search and Filter Section */}
//       <Row className="mb-4 align-items-center g-3">
//         <Col sm={12} md={3}>
//           <Form.Control
//             type="search"
//             value={search}
//             onChange={handleSearchChange}
//             placeholder="Search Audit Reports..."
//             style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
//           />
//         </Col>

//         <Col sm={12} md={2}>
//           <Form.Select
//             style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
//           >
//             <option>All Status</option>
//             <option>Draft</option>
//             <option>Completed</option>
//             <option>Pending</option>
//           </Form.Select>
//         </Col>
        
//         <Col sm={12} md="auto" className="ms-md-auto">
//           <Link to={"/add-new-audit"}>
//             <Button
//               variant="primary"
//               style={{
//                 backgroundColor: "#0d6efd",
//                 border: "none",
//                 borderRadius: "6px",
//                 padding: "10px 20px",
//                 boxShadow: "0 2px 4px rgba(13,110,253,0.2)",
//                 fontWeight: "500",
//               }}
//             >
//               + Create New Audit Report
//             </Button>
//           </Link>
//         </Col>
//       </Row>

//       {/* Audit Reports Table */}
//       <Card className="mb-5 border-0 shadow-sm">
//         <Card.Header className="bg-white py-3 border-0">
//           <div className="row align-items-center g-3">
//             <div className="col-12 col-md-6">
//               <h5 className="mb-0 fw-semibold text-center text-md-start">Audit Reports Overview</h5>
//             </div>

//             <div className="col-12 col-md-6">
//               <div className="d-flex justify-content-center justify-content-md-end">
//                 <Form.Control
//                   type="text"
//                   placeholder="Quick search..."
//                   className="form-control-sm ps-4"
//                   style={{ width: "100%", maxWidth: "240px", backgroundColor: "#f4f5f7" }}
//                 />
//               </div>
//             </div>
//           </div>
//         </Card.Header>

//         <Card.Body className="p-2">
//           <div className="table-responsive">
//             <table className="table table-hover align-middle mb-0">
//               <thead className="bg-light">
//                 <tr>
//                   <th className="ps-4">Audit Location/SiteName </th>
//                   <th>Project</th>
//                   {/* <th>Audit Type</th> */}
//                   <th>Date Created</th>
//                   <th className="pe-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan="5" className="text-center py-3">Loading...</td>
//                   </tr>
//                 ) : filteredAuditReports  && filteredAuditReports.length > 0 ? (
//                   filteredAuditReports.map((item, index) => (
//                     <tr key={index}>
//                       <td className="ps-4">
//                         <div className="d-flex align-items-center gap-3">
//                           <div>
//                             <div className="fw-medium">{item?.location}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>{item?.auditedBy || item.auditedBy}</td>
                    
//                       <td>{new Date(item?.auditDate).toLocaleString()}</td>
//                       <td className="pe-4">
//                         <div className="d-flex gap-3">
//                           <Link to={`/view-audit/${item?._id}`}>
//                             <Button variant="link" className="text-primary p-0">
//                               <i className="fa-solid fa-eye"></i>
//                             </Button>
//                           </Link>
//                           <Button 
//                             variant="link" 
//                             className="text-primary p-0" 
//                             onClick={() => navigate(`/edit-audit/${item?._id}`)}
//                           >
//                             <i className="fa-solid fa-pencil"></i>
//                           </Button>
//                           <Button variant="link" className="text-primary p-0">
//                             <i className="fa-solid fa-download"></i>
//                           </Button>
//                           <button 
//                             className="text-danger btn p-0" 
//                             onClick={() => handleDelete(item?._id)}
//                           >
//                             <i className="fa-solid fa-trash"></i>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-3">No audit reports found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="d-flex justify-content-end my-3">
//             <Button size="sm" variant="outline-secondary" className="me-2">
//               Previous
//             </Button>
//             <Button size="sm" variant="primary" className="ms-2">
//               1
//             </Button>
//             <Button size="sm" variant="outline-secondary" className="ms-2">
//               2
//             </Button>
//             <Button size="sm" variant="outline-secondary" className="ms-2">
//               Next
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Templates Section */}
//       {/* <h5 className="mb-3 mt-3" style={{ fontSize: "1rem", fontWeight: "500" }}>
//         Pre-Populated Audit Templates
//       </h5>
//       <Row className="mb-4 g-3">
//         {templates.map((template) => (
//           <Col sm={12} md={4} key={template.id}>
//             <Card className="h-100 border border-secondary rounded-3">
//               <Card.Body>
//                 <Card.Title className="fs-6 fw-medium">
//                   {template.title}
//                 </Card.Title>
//                 <Card.Text className="text-muted fs-7">
//                   {template.description}
//                 </Card.Text>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <Button
//                     variant="link"
//                     className="p-0 text-primary text-decoration-none fs-7"
//                     onClick={() => handleUseTemplate(template.title)}
//                   >
//                     Use Template
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row> */}
//     </Container>
//   );
// }

// export default AuditReports;


import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { fetchProjects } from "../../../redux/slices/projectSlice";
import { deleteAudit, fetchAudit } from "../../../redux/slices/auditSlice";
import { toast } from "react-toastify";

function AuditReports() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchAudit());
  }, [dispatch]); 

  const { audit, loading, error } = useSelector((state) => state.audit);
  console.log("audit", audit.data)
  const projects = useSelector((state) => state.projects.data);

  const handleSearchChange = (e) => setSearch(e.target.value);

  // Make sure we handle the data structure correctly
  const auditData = audit?.data || [];
  console.log( auditData)
  console.log(auditData.length)
  
  const filteredReports = !loading && auditData.filter((report) =>
    report.auditedBy.toLowerCase().includes(search.toLowerCase())
  );
  

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAudit(id))
          .then((response) => {
            console.log(response);
            if (response.success) {
             toast.success("Audit report deleted successfully!");
            }
          })
         .catch((error) => {
                       Swal.fire(
                         'Error!',
                         'Something went wrong.',
                         'error'
                       );
                     });
      }
      dispatch(fetchAudit());
    });
  };

  const getProjectName = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  // Sample template data for audit reports
  const templates = [
    {
      id: 1,
      title: "Safety Compliance Audit",
      description: "Standard audit template for evaluating workplace safety compliance.",
    },
    {
      id: 2,
      title: "Environmental Audit",
      description: "Comprehensive checklist for environmental compliance and practices.",
    },
    {
      id: 3,
      title: "Quality Control Audit",
      description: "Framework for assessing quality control processes and standards.",
    },
    {
      id: 4,
      title: "Workplace Health Assessment",
      description: "Evaluation of health hazards and preventive measures in the workplace.",
    },
    {
      id: 5,
      title: "Site Inspection Audit",
      description: "Detailed inspection template for construction or work sites.",
    },
    {
      id: 6,
      title: "Equipment Safety Audit",
      description: "Checklist for machinery and equipment safety compliance.",
    },
  ];

  const handleUseTemplate = (title) => {
    navigate("/audit-template", { state: { title } });
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Header Section */}
      <div className="dashboard-header">
        <h3>Audit Reports</h3>
        <p>Manage and monitor your audit documentation</p>
      </div>
      
      {/* Search and Filter Section */}
      <Row className="mb-4 align-items-center g-3">
        <Col sm={12} md={3}>
          <Form.Control
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search Audit Reports..."
            style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
          />
        </Col>

        <Col sm={12} md={2}>
          <Form.Select
            style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
          >
            <option>All Status</option>
            <option>Draft</option>
            <option>Completed</option>
            <option>Pending</option>
          </Form.Select>
        </Col>
        
        <Col sm={12} md="auto" className="ms-md-auto">
          <Link to={"/audit-equipment"}>
            <Button
              variant="primary"
              style={{
                backgroundColor: "#0d6efd",
                border: "none",
                borderRadius: "6px",
                padding: "10px 20px",
                boxShadow: "0 2px 4px rgba(13,110,253,0.2)",
                fontWeight: "500",
              }}
            >
              + Create New Audit Report
            </Button>
          </Link>
        </Col>
      </Row>

      {/* Audit Reports Table */}
      <Card className="mb-5 border-0 shadow-sm">
        <Card.Header className="bg-white py-3 border-0">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-6">
              <h5 className="mb-0 fw-semibold text-center text-md-start">Audit Reports Overview</h5>
            </div>

            <div className="col-12 col-md-6">
              {/* <div className="d-flex justify-content-center justify-content-md-end">
                <Form.Control
                  type="text"
                  placeholder="Quick search..."
                  className="form-control-sm ps-4"
                  style={{ width: "100%", maxWidth: "240px", backgroundColor: "#f4f5f7" }}
                />
              </div> */}
            </div>
          </div>
        </Card.Header>

        <Card.Body className="p-2">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Audit Location/SiteName</th>
                  <th>Audited By</th>
                  <th>Date Created</th>
                  <th className="pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-3">Loading...</td>
                  </tr>
                ) :  auditData.length > 0 ? (
                  auditData.map((item, index) => (
                    <tr key={index}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-3">
                          <div>
                            <div className="fw-medium">{item?.location || "Unknown Location"}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item?.auditedBy || "Unknown"}</td>
                      <td>{formatDate(item?.auditDate)}</td>
                      <td className="pe-4">
                        <div className="d-flex gap-3">
                          <Link to={`/audit-equipmentview/${item?._id}`}>
                            <Button variant="link" className="text-primary p-0">
                              <i className="fa-solid fa-eye"></i>
                            </Button>
                          </Link>
                          <Button 
                            variant="link" 
                            className="text-primary p-0" 
                            onClick={() => navigate(`/edit-audit-equipment/${item?._id}`)}
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </Button>
                          {/* <Button variant="link" className="text-primary p-0">
                            <i className="fa-solid fa-download"></i>
                          </Button> */}
                          <button 
                            className="text-danger btn p-0" 
                            onClick={() => handleDelete(item?._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3">No audit reports found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-end my-3">
            <Button size="sm" variant="outline-secondary" className="me-2">
              Previous
            </Button>
            <Button size="sm" variant="primary" className="ms-2">
              1
            </Button>
            <Button size="sm" variant="outline-secondary" className="ms-2">
              2
            </Button>
            <Button size="sm" variant="outline-secondary" className="ms-2">
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AuditReports;