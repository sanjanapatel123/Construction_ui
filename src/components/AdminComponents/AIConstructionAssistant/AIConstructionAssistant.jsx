// import React from 'react';
// import { Container, Row, Col, Form, Button, ProgressBar } from 'react-bootstrap';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// const data = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [
//     {
//       label: 'Tasks Completed',
//       data: [120, 110, 130, 125, 100, 200, 190],
//       borderColor: '#0052CC',
//       pointBackgroundColor: '#0052CC',
//       fill: false,
//       tension: 0.4,
//     },
//     {
//       label: 'Issues Resolved',
//       data: [220, 180, 200, 240, 280, 310, 295],
//       borderColor: 'green',
//       pointBackgroundColor: 'green',
//       fill: false,
//       tension: 0.4,
//     },
//   ],
// };
// function AIConstructionAssistant() {
//   return (

//     <div className="p-4 bg-white m-3" style={{ borderRadius: "10px", fontFamily: "Poppins, sans-serif" }}>
//       {/* Search Bar */}
//       <Row className="justify-content-center mb-4">
//         <Col md={10}>
//           <div className="bg-white border rounded d-flex align-items-center p-2">
//             <div className="position-relative flex-grow-1 me-2">
//               <i className="bi bi-search position-absolute text-muted" style={{ top: '50%', left: '12px', transform: 'translateY(-50%)' }}></i>
//               <Form.Control

//                 type="text"
//                 placeholder="Search projects, documents, or ask a question..."
//                 className="ps-5 py-2 shadow-none"
//                 style={{ fontSize: '0.9rem' }}
//               />
//             </div>
//             <Button variant="dark" id='btn_itp' className="px-3 py-2 d-flex align-items-center shadow-none">
//               <i className="bi bi-mic-fill me-2"></i>Voice Command
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Chart + Compliance + Voice Commands */}
//       <Row className="justify-content-center mb-4 g-3">
//         <Col lg={7}>
//           <div className="bg-white p-4 rounded border">
//             <h6 className="fw-bold mb-3">Project Insights</h6>
//             <div style={{ height: '250px' }}>
//               <Line data={data} options={{ maintainAspectRatio: false }} />
//             </div>
//             <div className="d-flex justify-content-end mt-2 small">
//               <div className="me-4"><span  className="me-1 text-dark">⬤</span>Tasks Completed</div>
//               <div><span className="me-1 text-success">⬤</span>Issues Resolved</div>
//             </div>
//           </div>
//         </Col>

//         <Col lg={3}>
//           <div className="bg-white p-4 rounded border mb-3">
//             <h6 className="fw-bold mb-3">Compliance Status</h6>
//             <div className="mb-3">
//               <div className="d-flex justify-content-between small mb-1">
//                 <span>Safety Compliance</span>
//                 <span>85%</span>
//               </div>
//               <ProgressBar now={85} variant="success" />
//             </div>
//             <div>
//               <div  className="d-flex justify-content-between small mb-1">
//                 <span>Document Completion</span>
//                 <span>92%</span>
//               </div>
//               <ProgressBar  now={92}  />
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded border">
//             <h6 className="fw-bold mb-3">Recent Voice Commands</h6>
//             <ul className="list-unstyled small mb-0">
//               <li className="mb-2">
//                 <i className="bi bi-mic me-2"></i>"Show safety reports from last week"
//               </li>
//               <li className="mb-2">
//                 <i className="bi bi-mic me-2"></i>"Schedule inspection for Building C"
//               </li>
//               <li>
//                 <i className="bi bi-mic me-2"></i>"Update project timeline"
//               </li>
//             </ul>
//           </div>
//         </Col>
//       </Row>

//       {/* AI Recommended Tasks */}
//       <Row>
//         <Col md={{ span: 7, offset: 1 }}>
//           <div className="bg-white p-4 rounded border">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h6 className="fw-bold mb-0">AI-Recommended Tasks</h6>
//               <Button variant="link" className="text-decoration-none p-0">View All</Button>
//             </div>

//             {/* Task 1 */}
//             <div className="d-flex justify-content-between align-items-center p-3 rounded mb-3" style={{ backgroundColor: '#ffecec' }}>
//               <div>
//                 <div className="fw-semibold text-danger">
//                   <i className="bi bi-exclamation-triangle me-2"></i>Safety Inspection Required
//                 </div>
//                 <div className="small text-muted">Building B requires immediate safety inspection</div>
//               </div>
//               <Button id='btn_itp' variant="dark">Take Action</Button>
//             </div>

//             {/* Task 2 */}
//             <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: '#fff9e6' }}>
//               <div>
//                 <div className="fw-semibold text-warning">
//                   <i className="bi bi-info-circle me-2"></i>Document Update Needed
//                 </div>
//                 <div className="small text-muted">Update required for permit documentation</div>
//               </div>
//               <Button id='btn_itp' variant="dark">Review</Button>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   )
// }

// export default AIConstructionAssistant

import React from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import "./aiAssistant.css"; // for custom styling
import { BsSendFill } from "react-icons/bs";
import { BsPaperclip } from "react-icons/bs";

const AiAssistant = () => {
  return (
    <Container fluid className=" bg-light min-vh-100">
      {/* Page Title */}
      <h5 className="fw-bold mb-4">AI Assistant</h5>

      {/* Chat Section */}
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="chat-box bg-white p-4 rounded shadow-sm mb-4">
            {/* Bot Message */}
            <div className="d-flex mb-3">
              <div className="bot-icon me-2">🤖</div>
              <div className="bg-light rounded px-3 py-2">
                Hello! How can I assist you today?
              </div>
            </div>

            {/* User Message */}
            <div className="d-flex justify-content-end mb-3">
              <div className="user-msg bg-primary text-white rounded px-3 py-2">
                Can you help me optimize my workflow?
              </div>
              <div className="user-avatar ms-2">
                <img
                  src="https://via.placeholder.com/32x32"
                  className="rounded-circle"
                  alt="User"
                />
              </div>
            </div>

            {/* Bot Response */}
            <div className="d-flex">
              <div className="bot-icon me-2">🤖</div>
              <div className="bg-light rounded px-3 py-2">
                I'd be happy to help you optimize your workflow. Let's start by
                analyzing your current processes and identifying areas for
                improvement.
              </div>
            </div>
          </div>

          {/* Message Input */}
          <InputGroup>
            <Button>
              <BsPaperclip />
            </Button>
            <Form.Control placeholder="Type a message..." />
            <Button variant="dark">
              <BsSendFill />
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AiAssistant;
