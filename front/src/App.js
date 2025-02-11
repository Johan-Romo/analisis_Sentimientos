import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ResultTable from "./components/ResultTable";
import "./App.css"; // Importamos los estilos

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="app-container">
      <h1>🎭 Clasificador de Sentimientos</h1>
      <FileUpload setData={setData} />
      <ResultTable data={data} />
    </div>
  );
}

export default App;
