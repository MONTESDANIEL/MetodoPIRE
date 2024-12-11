import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrar los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  const [inputFunction, setInputFunction] = useState('x*x'); // Función matemática ingresada por el usuario
  const [chartData, setChartData] = useState(generateChartData(inputFunction));

  // Genera datos para el gráfico en base a la función ingresada
  function generateChartData(func) {
    try {
      // Generamos valores de x entre -10 y 10
      const xValues = Array.from({ length: 21 }, (_, i) => i - 10);
      // Calculamos los valores de y evaluando la función
      const yValues = xValues.map(x => eval(func.replace(/x/g, `(${x})`))); // CUIDADO: eval tiene riesgos; en un entorno real, busca alternativas seguras.
      return {
        labels: xValues,
        datasets: [
          {
            label: `f(x) = ${func}`,
            data: yValues,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
          },
        ],
      };
    } catch (error) {
      console.error('Error al procesar la función matemática:', error);
      return null;
    }
  }

  // Manejar cambios en el input
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputFunction(value);
    const data = generateChartData(value);
    if (data) {
      setChartData(data);
    }
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'x',
        },
      },
      y: {
        title: {
          display: true,
          text: 'f(x)',
        },
      },
    },
  };

  return (
    <div className='w-100'>
      <nav className="navbar bg-dark top d-flex justify-content-center ">
        <h1 className='text-light m-2'>Método PIRE</h1>
      </nav>
      <div className="row p-2 bg-ligth">
        <div className='col-12 p-3'>
          <input
            type="text"
            className='form-control'
            value={inputFunction}
            onChange={handleInputChange}
            placeholder="Escribe una función matemática (e.g., x*x, Math.sin(x))"
          />
        </div>
        <div className='col-12 d-flex justify-content-center p-3' style={{ height: "800px" }}>
          {chartData ? <Line data={chartData} options={options} /> : <p>Introduce una función válida.</p>}
        </div>
      </div>
    </div>
  );
};

export default App;