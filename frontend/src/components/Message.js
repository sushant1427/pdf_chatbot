import React from "react";

function Message({ sender, text }) {
  return (
    <div style={{
      textAlign: sender === "user" ? "right" : "left",
      margin: "5px 0"
    }}>
      <span style={{
        display: "inline-block",
        background: sender === "user" ? "#DCF8C6" : "#EEE",
        padding: "8px 12px",
        borderRadius: "10px",
        maxWidth: "70%"
      }}>
        {text}
      </span>
    </div>
  );
}

export default Message;
