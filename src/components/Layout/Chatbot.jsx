import { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <button
        className="btn rounded-circle p-3 shadow-lg"
        onClick={toggleChatbot}
        title={isOpen ? "Close Chatbot" : "Open Chatbot"}
        style={{
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#578e7e"
        }}
      >
        💬
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            right: "0",
            width: "300px",
            height: "400px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "#578e7e",
              color: "white",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Chatbot
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
            }}
          >
            <p>Welcome! How can I help you?</p>
          </div>
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #ddd",
              display: "flex",
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Type a message..."
              style={{ flex: 1 }}
            />

            <button className="btn btn ms-2 " style={{backgroundColor: "#578e7e"}}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;