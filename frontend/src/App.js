import React, { useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import ChatBox from "./components/ChatBox";

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (question) => {
    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    try {
      const res = await axios.post("http://127.0.0.1:8000/ask_question/",
        new URLSearchParams({ question })
      );
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: " + err.message }]);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>📄 PDF Chatbot</h2>
      <FileUpload />
      <ChatBox messages={messages} onSend={sendMessage} />
    </div>
  );
}

export default App;
