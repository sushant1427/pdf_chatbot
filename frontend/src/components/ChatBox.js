import React, { useState } from "react";
import Message from "./Message";

function ChatBox({ messages, onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div>
      <div style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        height: "400px",
        overflowY: "scroll",
        marginBottom: "10px"
      }}>
        {messages.map((msg, idx) => <Message key={idx} sender={msg.sender} text={msg.text} />)}
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSend} style={{ padding: "10px 20px" }}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
