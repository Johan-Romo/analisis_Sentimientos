import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ResultTable from "./components/ResultTable";
import Statistics from "./components/Statistics";
import "./App.css"; // Importamos los estilos

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="app-container">
      <h1> Clasificador de Sentimientos</h1>
      <div className="content">
        <div className="left-panel">
          <FileUpload setData={setData} />
          <ResultTable data={data} />
        </div>
        <div className="right-panel">
          <Statistics data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
