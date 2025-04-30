import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import "./aiAssistant.css"; // for custom styling
import { BsSendFill } from "react-icons/bs";
import { BsPaperclip } from "react-icons/bs";
import axiosInstance from "../../../utils/axiosInstance";

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const userId = "680768ca24004c2e19a6108c"; // Static user_id for now
  const baseUrl =
    "https://constructionaimicroservice-production.up.railway.app"; // Replace with actual base URL

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await axiosInstance.post(`${baseUrl}/chatbot`, {
        question: input,
        user_id: userId,
      });

      const botResponse = res.data.insights || "No response from server.";
      setMessages([...newMessages, { type: "bot", text: botResponse }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { type: "bot", text: "An error occurred while fetching response." },
      ]);
    }

    setInput("");
  };

  return (
    // <Container fluid className=" bg-light min-vh-100">
    //   {/* Page Title */}
    //   <h5 className="fw-bold mb-4">AI Assistant</h5>

    //   {/* Chat Section */}
    //   <Row className="justify-content-center">
    //     <Col lg={8}>
    //       <div className="chat-box bg-white p-4 rounded shadow-sm mb-4">
    //         {/* Bot Message */}
    //         <div className="d-flex mb-3">
    //           <div className="bot-icon me-2">🤖</div>
    //           <div className="bg-light rounded px-3 py-2">
    //             Hello! How can I assist you today?
    //           </div>
    //         </div>

    //         {/* User Message */}
    //         <div className="d-flex justify-content-end mb-3">
    //           <div className="user-msg bg-primary text-white rounded px-3 py-2">
    //             Can you help me optimize my workflow?
    //           </div>
    //           <div className="user-avatar ms-2">
    //             <img
    //               src="https://via.placeholder.com/32x32"
    //               className="rounded-circle"
    //               alt="User"
    //             />
    //           </div>
    //         </div>

    //         {/* Bot Response */}
    //         <div className="d-flex">
    //           <div className="bot-icon me-2">🤖</div>
    //           <div className="bg-light rounded px-3 py-2">
    //             I'd be happy to help you optimize your workflow. Let's start by
    //             analyzing your current processes and identifying areas for
    //             improvement.
    //           </div>
    //         </div>
    //       </div>

    //       {/* Message Input */}
    //       <InputGroup>
    //         <Button>
    //           <BsPaperclip />
    //         </Button>
    //         <Form.Control placeholder="Type a message..." />
    //         <Button variant="dark">
    //           <BsSendFill />
    //         </Button>
    //       </InputGroup>
    //     </Col>
    //   </Row>
    // </Container>

    <Container fluid className="bg-light min-vh-100">
      <h5 className="fw-bold mb-4">AI Assistant</h5>

      <Row className="justify-content-center">
        <Col lg={8}>
          <div
            className="chat-box bg-white p-4 rounded shadow-sm mb-4"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            {messages.map((msg, idx) =>
              msg.type === "bot" ? (
                <div key={idx} className="d-flex mb-3">
                  <div className="bot-icon me-2">🤖</div>
                  <div className="bg-light rounded px-3 py-2">{msg.text}</div>
                </div>
              ) : (
                <div key={idx} className="d-flex justify-content-end mb-3">
                  <div className="user-msg bg-primary text-white rounded px-3 py-2">
                    {msg.text}
                  </div>
                  <div className="user-avatar ms-2">
                    <img
                      src="https://via.placeholder.com/32x32"
                      className="rounded-circle"
                      alt="User"
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <InputGroup>
            <Button>
              <BsPaperclip />
            </Button>
            <Form.Control
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button variant="dark" onClick={sendMessage}>
              <BsSendFill />
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AiAssistant;
