import React, { useState } from "react";
import axios from "axios";
import "../App.css"; // Importamos estilos

const FileUpload = ({ setData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("📂 Por favor, selecciona un archivo Excel.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/clasificar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData(response.data.predicciones);
    } catch (error) {
      alert("❌ Hubo un error al procesar el archivo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>📂 Subir Archivo Excel</h2>
      <input type="file" accept=".xlsx" onChange={handleFileChange} className="file-input" />
      <button className="upload-btn" onClick={handleUpload} disabled={loading}>
        {loading ? "🔄 Procesando..." : "📤 Subir y Clasificar"}
      </button>
    </div>
  );
};

export default FileUpload;
