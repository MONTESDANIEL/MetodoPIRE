import { useState, useEffect } from "react";
import { calculo } from "../../back";
import Grafica from "../components/Grafica";

const DatosUsuario = () => {

    const estado = localStorage.getItem('estado');
    const estadopisoRuido = localStorage.getItem('estadopisoRuido')

    const [señales, setSeñales] = useState();
    const [pisoRuidodBm, setPisoRuidodBm] = useState();

    const [transmisores, setTransmisores] = useState(
        estado ? JSON.parse(estado) : [
            { frecuencia: '', anchoDeBanda: '', potencia: '' },
            { frecuencia: '', anchoDeBanda: '', potencia: '' },
            { frecuencia: '', anchoDeBanda: '', potencia: '' }
        ]
    );

    const [pisoRuido, setPisoRuido] = useState(
        estadopisoRuido ? JSON.parse(estadopisoRuido) :
            { temperatura: '', anchoDeBandaGeneral: '', perdida: '', gananciaAmplificador: '', gananciaAntena: '' }
    )

    // Guarda los transmisores en el localStorage cada vez que se actualiza
    useEffect(() => {
        localStorage.setItem('estado', JSON.stringify(transmisores));
    }, [transmisores]); // Solo se ejecuta cuando 'transmisores' cambia

    useEffect(() => {
        localStorage.setItem('estadopisoRuido', JSON.stringify(pisoRuido));
    }, [pisoRuido]);

    const CardForm = ({ iteracion }) => {

        // Estado local para cada formulario (se mueve dentro del componente CardForm)
        const [frecuencia, setFrecuencia] = useState(transmisores[iteracion].frecuencia);
        const [anchoDeBanda, setAnchoDeBanda] = useState(transmisores[iteracion].anchoDeBanda);
        const [potencia, setPotencia] = useState(transmisores[iteracion].potencia);

        const handlerSave = () => {
            // Actualiza el estado de los transmisores de manera correcta
            const nuevosTransmisores = [...transmisores]; // Hacemos una copia del arreglo de transmisores

            // Actualizamos el transmisor específico en el índice correspondiente
            nuevosTransmisores[iteracion] = { frecuencia, anchoDeBanda, potencia };

            // Actualizamos el estado con los nuevos valores
            setTransmisores(nuevosTransmisores);

        }

        return (
            <div className="col-lg-4">
                <div className="bg-body-tertiary m-1 p-3 rounded">
                    <h3 className="text-center"> Transmisor {iteracion + 1}</h3>
                    <hr />
                    <form> {/* Evita el envío del formulario */}
                        <h5>Frecuencia (MHz)</h5>
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Ingrese el valor de la frecuencia"
                            value={frecuencia}
                            onChange={(e) => setFrecuencia(e.target.value)} // Actualiza el estado solo de este campo
                            required
                        />

                        <h5>Ancho de Banda (MHz)</h5>
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Ingrese el valor del ancho de banda"
                            value={anchoDeBanda}
                            onChange={(e) => setAnchoDeBanda(e.target.value)} // Actualiza el estado solo de este campo
                            required
                        />

                        <h5>Potencia (dBm)</h5>
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Ingrese el valor de la potencia"
                            value={potencia}
                            onChange={(e) => setPotencia(e.target.value)} // Actualiza el estado solo de este campo
                            required
                        />


                        <div className="d-flex justify-content-center mt-3">
                            <button
                                type="button"
                                className="btn btn-sm btn-purple-1"
                                onClick={handlerSave}>
                                <span>Guardar datos transmisor {iteracion + 1}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const FloorSound = () => {
        // Estado local para cada formulario (se mueve dentro del componente CardForm)
        const [temperatura, setTemperatura] = useState(pisoRuido.temperatura);
        const [anchoDeBandaGeneral, setAnchoDeBandaGeneral] = useState(pisoRuido.anchoDeBandaGeneral);
        const [perdida, setPerdida] = useState(pisoRuido.perdida);
        const [gananciaAntena, setGananciaAntena] = useState(pisoRuido.gananciaAntena);
        const [gananciaAmplificador, setGananciaAmplificador] = useState(pisoRuido.gananciaAmplificador);

        const handlerSave = () => {
            setPisoRuido({ temperatura, anchoDeBandaGeneral, perdida, gananciaAmplificador, gananciaAntena });

            // Calcula las señales y el piso de ruido dBm con los datos actuales
            const {señales, pisoRuidodBm} = calculo(transmisores, {temperatura, anchoDeBandaGeneral, perdida, gananciaAmplificador, gananciaAntena})

            // Si necesitas actualizar estados adicionales, puedes hacerlo aquí
            setSeñales(señales);
            setPisoRuidodBm(pisoRuidodBm);
        }

        return (
            <div className="w-100 ">
                <div className="bg-body-tertiary m-1 p-3 rounded ">
                    <h3 className="text-center">Datos adicionales</h3>
                    <hr />
                    <form>{ }
                        <h5>Perdida de transmisión (dB):</h5>
                        <input
                            type="number"
                            className="form-control mb-2"
                            value={perdida}
                            onChange={(e) => setPerdida(e.target.value)}
                            required
                        />
                        <h5>Ganancia de Amplificador (dB):</h5>
                        <input
                            type="number"
                            className="form-control mb-2"
                            value={gananciaAmplificador}
                            onChange={(e) => setGananciaAmplificador(e.target.value)}
                            required
                        />
                        <h5>Ganancia de Antena (dBi):</h5>
                        <input
                            type="number"
                            className="form-control mb-2"
                            value={gananciaAntena}
                            onChange={(e) => setGananciaAntena(e.target.value)}
                            required
                        />
                        <h5>Temperatura (°K):</h5>
                        <input
                            type="number"
                            className="form-control mb-2"
                            value={temperatura}
                            onChange={(e) => setTemperatura(e.target.value)}
                            required
                        />
                        <h5>Ancho de banda (Hz):</h5>
                        <input
                            type="number"
                            className="form-control mb-2"
                            value={anchoDeBandaGeneral}
                            onChange={(e) => setAnchoDeBandaGeneral(e.target.value)}
                            required
                        />
                        <div className="d-flex justify-content-center mt-3">
                            <button
                                type="button"
                                className="btn-sm btn-purple-1"
                                onClick={handlerSave}>
                                Guardar datos adicionales
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-dark-subtle p-3 m-2 rounded">
            <div className="text-center">
                <h2>Datos</h2>
                <p>Datos necesarios para realizar las operaciones</p>
            </div>

            <div className="row">
                {[0, 1, 2].map((index) => (
                    <CardForm
                        key={index}
                        iteracion={index}
                    />
                ))}
            </div>
            <div className="mt-3">
                <FloorSound />
                <Grafica
                    señales={señales}
                    pisoRuido={pisoRuidodBm}
                />
            </div>
        </div>
    );
};

export default DatosUsuario;
