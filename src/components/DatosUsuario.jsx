import { useState } from "react";

const DatosUsuario = () => {
    // Variables necesarias para las operaciones
    const [frecuencia1, setFrecuencia1] = useState();
    const [AnchoDeBanda1, setAnchoDeBanda1] = useState();
    const [potencia1, setPotencia1] = useState();
    const [frecuencia2, setFrecuencia2] = useState();
    const [AnchoDeBanda2, setAnchoDeBanda2] = useState();
    const [potencia2, setPotencia2] = useState();
    const [frecuencia3, setFrecuencia3] = useState();
    const [AnchoDeBanda3, setAnchoDeBanda3] = useState();
    const [potencia3, setPotencia3] = useState();


    // Manejar cambios en el input
    const handleInputFrecuencia = (event) => {
        const value = event.target.value;
        setFrecuencia1(value);

    };
    const handleInputAnchoDeBanda = (event) => {
        const value = event.target.value;
        setAnchoDeBanda1(value);
    };
    const handleInputPotencia = (event) => {
        const value = event.target.value;
        setPotencia1(value);
    };

    const FormData = ({ title, valueFrecuencia, valueAnchoDeBanda, valuePotencia }) => {
        return (
            <div className="col-lg-4">
                <div className="bg-secondary m-1 p-3 rounded">

                    <h3 className="text-center"> Transmisor {title}</h3>
                    <hr />

                    <h5>Frecuencia (FC)</h5>
                    <input
                        type="text"
                        className='form-control mb-2'
                        value={valueFrecuencia}
                        onChange={handleInputFrecuencia}
                        placeholder="Ingrese el valor de la frecuencia"
                    />

                    <h5>Ancho de Banda (BW)</h5>
                    <input
                        type="text"
                        className='form-control mb-2'
                        value={valueAnchoDeBanda}
                        onChange={handleInputAnchoDeBanda}
                        placeholder="Ingrese el valor del ancho de banda"
                    />

                    <h5>Potencia (P)</h5>
                    <input
                        type="text"
                        className='form-control mb-2'
                        value={valuePotencia}
                        onChange={handleInputPotencia}
                        placeholder="Ingrese el valor de la potencia"
                    />
                </div>
            </div>
        )
    }

    return (
        <div className='bg-dark-subtle p-3 m-2 rounded'>

            <div className='text-center'>
                <h2>Datos</h2>
                <p>Datos necesarios para realizar las operaciones</p>
            </div>

            <div className="row">
                <FormData
                    title="1"
                    valueFrecuencia={frecuencia1}
                    valueAnchoDeBanda={AnchoDeBanda1}
                    valuePotencia={potencia1}
                />
                <FormData
                    title="2"
                    valueFrecuencia={frecuencia2}
                    valueAnchoDeBanda={AnchoDeBanda2}
                    valuePotencia={potencia2}
                />
                <FormData
                    title="3"
                    valueFrecuencia={frecuencia3}
                    valueAnchoDeBanda={AnchoDeBanda3}
                    valuePotencia={potencia3}
                />
            </div>

        </div>
    )
}

export default DatosUsuario;