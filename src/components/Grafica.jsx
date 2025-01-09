import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrar los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Grafica = ({ señales, pisoRuido }) => {
    const [chartData, setChartData] = useState(generateSpectralData());

    // Función para generar datos espectrales de las señales
    function generateSpectralData() {

        const signals = Array.isArray(señales) ? señales : [];
        const noiseFloor = pisoRuido ? pisoRuido : 0; // Piso de ruido común
        const resolution = 0.5; // Resolución en el eje x
        const marginPercentage = 0.1; // Márgen adicional como porcentaje del ancho total del rango

        // Determinar el rango dinámico basado en las señales
        const minFrequency = Math.min(...signals.map(s => s.center - s.bandwidth / 2));
        const maxFrequency = Math.max(...signals.map(s => s.center + s.bandwidth / 2));
        const rangeWidth = maxFrequency - minFrequency;

        // Añadir márgenes al rango
        const margin = rangeWidth * marginPercentage;
        const adjustedMin = Math.floor((minFrequency - margin) / resolution) * resolution;
        const adjustedMax = Math.ceil((maxFrequency + margin) / resolution) * resolution;

        // Generar valores de x dentro del rango dinámico con márgenes
        const xValues = Array.from(
            { length: Math.ceil((adjustedMax - adjustedMin) / resolution) + 1 },
            (_, i) => adjustedMin + i * resolution
        );

        // Generar valores de y para cada señal
        const yValues = xValues.map(x => {
            let value = noiseFloor; // Piso de ruido inicial
            signals.forEach(signal => {
                const { center, bandwidth, pire } = signal;
                const halfBW = bandwidth / 2;

                // Evaluamos la potencia en función de la curva suave
                if (x >= center - halfBW && x <= center + halfBW) {
                    const distance = Math.abs(x - center);
                    const signalPower =
                        pire - 3 * (1 - Math.cos((Math.PI * distance) / bandwidth) ** 2);
                    value = Math.max(value, signalPower);
                }
            });
            return value;
        });

        // Filtrar solo valores positivos de x y sus correspondientes valores de y
        const positiveIndices = xValues.reduce((indices, x, i) => {
            if (x >= 0) indices.push(i);
            return indices;
        }, []);
        const filteredXValues = positiveIndices.map(i => xValues[i]);
        const filteredYValues = positiveIndices.map(i => yValues[i]);

        // Retornar datos formateados para Chart.js
        return {
            labels: filteredXValues,
            datasets: [
                {
                    label: 'Análisis Espectral',
                    data: filteredYValues,
                    borderColor: '#4A90E2',
                    backgroundColor: 'rgba(74, 144, 226, 0.2)',
                    borderWidth: 2,
                },
                {
                    label: 'Piso de Ruido',
                    data: Array(filteredXValues.length).fill(noiseFloor),
                    borderColor: '#D9534F',
                    borderDash: [5, 5],
                    borderWidth: 2,
                },
            ],
        };
    }

    // useEffect para actualizar los datos de la gráfica cuando cambien las señales o el piso de ruido
    useEffect(() => {
        const data = generateSpectralData(señales, pisoRuido);
        setChartData(data);
    }, [señales, pisoRuido]); // Actualizar solo cuando cambien las señales o el piso de ruido

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Frecuencia (MHz)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Potencia (dBm)',
                },
            },
        },
    };

    return (
        <div className='p-3 m-2 bg-dark-subtle rounded'>
            <div className="text-center">
                <h2>Análisis Espectral</h2>
                <p>Gráfico de análisis espectral para tres señales con piso de ruido común.</p>
            </div>

            <div className="card p-2" style={{ overflowX: 'auto' }}>
                <div className="card-body d-flex justify-content-center align-items-center" style={{ minWidth: '600px', height: 'auto', minHeight: '400px' }}>
                    {chartData ? <Line data={chartData} options={options} /> : <p>Error generando el gráfico.</p>}
                </div>
            </div>
        </div>
    );
}

export default Grafica;
