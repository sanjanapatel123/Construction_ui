import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { io } from "socket.io-client";
import { apiUrl } from "../../../utils/config";

const socket = io(`${apiUrl}`);
const currentUserId = "680b732841a4ddabafda39b3"; // 👈 replace with logged-in user's ID

function Messenger() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageError, setMessageError] = useState(null);

  // Fetch users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/users`);
        setUsers(response.data.data.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      setLoadingMessages(true);
      setMessageError(null); // Reset error state
      try {
        const response = await axiosInstance.get(`${apiUrl}/chat`, {
          params: {
            senderId: currentUserId,
            receiverId: selectedUser._id,
          },
        });
        console.log("fetched Messages response:", response.data); // Debugging line

        const fetchedMessages =
          response.data.data.find((chat) =>
            chat.users.some((user) => user._id === selectedUser._id)
          )?.messages || [];

        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error loading messages", error);
        setMessageError("Failed to load messages. Please try again.");
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  console.log(selectedUser, "Selected User");

  // Socket setup
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("receiveMessage", (newMessage) => {
      if (selectedUser && newMessage.receiverId === currentUserId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!message.trim() || !selectedUser?._id) {
      console.warn("Message or selected user invalid");
      return;
    }

    const payload = {
      senderId: currentUserId,
      receiverId: selectedUser._id,
      message,
    };

    try {
      // First, check if a chat already exists between the sender and receiver
      const chatResponse = await axiosInstance.get(`${apiUrl}/chat`, {
        params: {
          senderId: currentUserId,
          receiverId: selectedUser._id,
        },
      });

      let chatData = chatResponse.data.data;

      // If no chat exists, create a new chat
      if (!chatData) {
        const createChatResponse = await axiosInstance.post(`${apiUrl}/chat`, {
          users: [currentUserId, selectedUser._id],
        });
        chatData = createChatResponse.data.data; // Get the newly created chat data
      }

      // Now send the message
      const messageResponse = await axiosInstance.post(
        `${apiUrl}/chat/sendMessage`,
        payload
      );

      if (messageResponse.data.success) {
        const newMessage = messageResponse.data.data;
        setMessages((prev) => [...prev, newMessage]); // Add the new message to the state
        socket.emit("sendMessage", newMessage); // Emit to the socket for real-time updates
        setMessage(""); // Clear input field
      } else {
        console.error("Message sending failed:", messageResponse.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleDeleteChat = async () => {
    if (!selectedUser) return;

    try {
      // Step 1: Get existing chat ID between users
      const chatResponse = await axiosInstance.get(`${apiUrl}/chat`, {
        params: {
          senderId: currentUserId,
          receiverId: selectedUser._id,
        },
      });

      const existingChat = chatResponse.data.data?.find((chat) =>
        chat.users.some((u) => u._id === selectedUser._id)
      );

      if (!existingChat) {
        alert("No existing chat found.");
        return;
      }

      // Step 2: Delete the chat using chat ID
      await axiosInstance.delete(`${apiUrl}/chat/${existingChat._id}`);

      // Step 3: Update state
      setMessages([]);
      setSelectedUser(null);
      alert("Chat deleted successfully.");
    } catch (err) {
      console.error("Failed to delete chat:", err);
      alert("Error deleting chat.");
    }
  };

  console.log("Messages:", messages); // Debugging line

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Panel - Chat List */}
        <div className="col-md-4 border-end d-flex flex-column p-0">
          <div className="p-3 border-bottom">
            <h6>Chats</h6>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          <div
            className="flex-grow-1 overflow-auto"
            style={{ maxHeight: "calc(100vh - 60px)" }}
          >
            {users.map((user, idx) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`d-flex align-items-center p-3 border-bottom ${
                  selectedUser?._id === user._id ? "bg-light" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`https://i.pravatar.cc/40?img=${idx + 1}`}
                  alt="user"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <div className="flex-grow-1">
                  <div className="fw-bold">
                    {`${user.firstName} ${user.lastName}` || `User ${idx + 1}`}
                  </div>
                  <small className="text-muted">Last message preview...</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Box */}
        <div className="col-md-8 d-flex flex-column p-0">
          {/* Header */}
          {/* <div className="d-flex align-items-center border-bottom p-3">
            <img
              src={`https://i.pravatar.cc/40?img=11`}
              alt="User"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <div>
              <div className="fw-bold">
                {selectedUser
                  ? `${selectedUser.firstName} ${selectedUser.lastName}`
                  : "Select a chat"}
              </div>
              <small className="text-muted">
                Construction management system
              </small>
            </div>
          </div> */}

          <div className="d-flex align-items-center justify-content-between border-bottom p-3">
            <div className="d-flex align-items-center">
              <img
                src={`https://i.pravatar.cc/40?img=11`}
                alt="User"
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <div>
                <div className="fw-bold">
                  {selectedUser
                    ? `${selectedUser.firstName} ${selectedUser.lastName}`
                    : "Select a chat"}
                </div>
                <small className="text-muted">
                  Construction management system
                </small>
              </div>
            </div>

            {selectedUser && (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleDeleteChat}
                title="Delete Chat"
              >
                🗑️
              </button>
            )}
          </div>

          {/* Messages */}
          <div
            className="flex-grow-1 overflow-auto p-3"
            style={{ height: "calc(100vh - 150px)" }}
          >
            {selectedUser ? (
              <>
                {loadingMessages ? (
                  <div className="text-center text-muted mt-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : messageError ? (
                  <div className="text-danger text-center mt-3">
                    {messageError}
                  </div>
                ) : (
                  <>
                    <div className="text-center text-muted small mb-3">
                      Today
                    </div>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`d-flex mb-2 ${
                          msg.senderId === currentUserId
                            ? "justify-content-end"
                            : "justify-content-start"
                        }`}
                      >
                        <div
                          className={`p-2 rounded shadow-sm ${
                            msg.senderId === currentUserId
                              ? "bg-success text-white"
                              : "bg-light"
                          }`}
                        >
                          <div>{msg.message}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            ) : (
              <div className="text-center text-muted">
                Select a user to start chat
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="border-top p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!selectedUser}
              />
              <button
                className="btn btn-primary"
                onClick={sendMessage}
                disabled={!selectedUser}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
