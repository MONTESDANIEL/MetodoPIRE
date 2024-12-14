import { useState } from "react";

const DatosUsuario = () => {

    const [transmisores, setTransmisores] = useState([
        { frecuencia: '', anchoDeBanda: '', potencia: '' },
        { frecuencia: '', anchoDeBanda: '', potencia: '' },
        { frecuencia: '', anchoDeBanda: '', potencia: '' }
    ]);

    const CardForm = ({ iteracion }) => {

        // Estado local para cada formulario (se mueve dentro del componente CardForm)
        const [frecuencia, setFrecuencia] = useState('');
        const [anchoDeBanda, setAnchoDeBanda] = useState('');
        const [potencia, setPotencia] = useState('');

        const handlerSave = () => {
            // Actualiza el estado de los transmisores de manera correcta
            const nuevosTransmisores = [...transmisores]; // Hacemos una copia del arreglo de transmisores

            // Actualizamos el transmisor específico en el índice correspondiente
            nuevosTransmisores[iteracion] = {
                frecuencia,
                anchoDeBanda,
                potencia
            };

            // Actualizamos el estado con los nuevos valores
            setTransmisores(nuevosTransmisores);

            // Verificamos los datos guardados
            console.log("transmisores:", nuevosTransmisores);
        }

        return (
            <div className="col-lg-4">
                <div className="bg-secondary m-1 p-3 rounded">
                    <h3 className="text-center"> Transmisor {iteracion + 1}</h3>
                    <hr />
                    <form> {/* Evita el envío del formulario */}
                        <h5>Frecuencia (FC)</h5>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ingrese el valor de la frecuencia"
                            value={frecuencia}
                            onChange={(e) => setFrecuencia(e.target.value)} // Actualiza el estado solo de este campo
                        />

                        <h5>Ancho de Banda (BW)</h5>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ingrese el valor del ancho de banda"
                            value={anchoDeBanda}
                            onChange={(e) => setAnchoDeBanda(e.target.value)} // Actualiza el estado solo de este campo
                        />

                        <h5>Potencia (P)</h5>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ingrese el valor de la potencia"
                            value={potencia}
                            onChange={(e) => setPotencia(e.target.value)} // Actualiza el estado solo de este campo
                        />


                        <div className="d-flex justify-content-center mt-3">
                            <button
                                type="button"
                                className="btn btn-sm btn-success"
                                onClick={handlerSave}>
                                <span>Guardar datos transmisor {iteracion + 1}</span>
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
        </div>
    );
};

export default DatosUsuario;
