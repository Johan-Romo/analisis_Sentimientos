import React from "react";
import "../App.css"; // Importamos estilos

const ResultTable = ({ data }) => {
  return (
    <div className="result-container">
      <h2>📊 Resultados</h2>
      {data.length === 0 ? (
        <p>No hay datos aún. Sube un archivo para ver resultados.</p>
      ) : (
        <table className="result-table">
          <thead>
            <tr>
              <th>Comentario</th>
              <th>Sentimiento</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Comentario}</td>
                <td className={`sentiment-${item.Sentimiento.toLowerCase()}`}>{item.Sentimiento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResultTable;
