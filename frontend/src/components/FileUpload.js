import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("http://127.0.0.1:8000/upload_pdf/", formData);
      alert("PDF uploaded successfully!");
    }
  };

  return (
    <div style={{ border: "2px dashed #ccc", padding: "20px", textAlign: "center" }}>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {fileName && <p>📄 {fileName} uploaded!</p>}
    </div>
  );
}

export default FileUpload;
