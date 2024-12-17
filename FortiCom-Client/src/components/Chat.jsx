import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import "../styles/Chat.css";

const Chat = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      });
    }
  }, [socket]);

  // Handle message sending
  const sendMessage = () => {
    if (socket && message.trim()) {
      const messageData = {
        text: message,
        sender: "User1", // Replace with dynamic username later
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit("send_message", messageData);
      setMessages((prev) => [...prev, messageData]);
      setMessage(""); // Clear input
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}: </strong> {msg.text}{" "}
            <span>{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
