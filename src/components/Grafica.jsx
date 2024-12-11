import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrar los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Grafica = () => {
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
        <div className='d-flex justify-content-center p-3 m-2 bg-dark-subtle rounded'>
            {chartData ? <Line data={chartData} options={options} /> : <p>Introduce una función válida.</p>}
        </div>
    )
}

export default Grafica;