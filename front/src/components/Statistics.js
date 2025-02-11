import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../App.css"; // Importamos estilos

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Statistics = ({ data }) => {
  // Contar los comentarios en cada categoría
  const counts = {
    Positivo: data.filter((item) => item.Sentimiento === "Positivo").length,
    Negativo: data.filter((item) => item.Sentimiento === "Negativo").length,
    Neutro: data.filter((item) => item.Sentimiento === "Neutro").length,
  };

  const total = counts.Positivo + counts.Negativo + counts.Neutro;

  // Calcular porcentajes
  const percentage = {
    Positivo: total > 0 ? ((counts.Positivo / total) * 100).toFixed(2) : 0,
    Negativo: total > 0 ? ((counts.Negativo / total) * 100).toFixed(2) : 0,
    Neutro: total > 0 ? ((counts.Neutro / total) * 100).toFixed(2) : 0,
  };

  // Determinar el impacto general
  let impactoGeneral = "Neutro 🟡";
  if (counts.Positivo > counts.Negativo && counts.Positivo > counts.Neutro) {
    impactoGeneral = "Positivo ✅";
  } else if (counts.Negativo > counts.Positivo && counts.Negativo > counts.Neutro) {
    impactoGeneral = "Negativo ❌";
  }

  // Configuración de datos para el gráfico
  const chartData = {
    labels: ["Positivo", "Negativo", "Neutro"],
    datasets: [
      {
        data: [counts.Positivo, counts.Negativo, counts.Neutro],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
        hoverBackgroundColor: ["#45A049", "#E53935", "#FFA000"],
      },
    ],
  };

  // Configuración del gráfico para mostrar los porcentajes dentro
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 16,
        },
        formatter: (value, context) => {
          let total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          let percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`; // Muestra el porcentaje dentro del gráfico
        },
      },
    },
  };

  return (
    <div className="stats-container">
      <h2>📊 Análisis de Sentimientos</h2>
      {total === 0 ? (
        <p>No hay datos aún. Sube un archivo para ver estadísticas.</p>
      ) : (
        <>
          <p><strong>Total de comentarios analizados:</strong> {total}</p>
          <p>✔️ Positivos: {counts.Positivo} ({percentage.Positivo}%)</p>
          <p>❌ Negativos: {counts.Negativo} ({percentage.Negativo}%)</p>
          <p>🟡 Neutros: {counts.Neutro} ({percentage.Neutro}%)</p>
          <hr />
          
          <Doughnut data={chartData} options={chartOptions} />
          <h2>🔍 Impacto General: {impactoGeneral}</h2>
        </>
      )}
    </div>
  );
};

export default Statistics;
