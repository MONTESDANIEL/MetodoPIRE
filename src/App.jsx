import React from 'react';
import DatosUsuario from './components/DatosUsuario';
import Grafica from './components/Grafica';

const App = () => {

  return (
    <div>

      <nav className="navbar bg-dark top d-flex justify-content-center ">
        <h1 className='text-light m-2'>Método PIRE</h1>
      </nav>

      <main className="container-fluid p-2">

        <DatosUsuario></DatosUsuario>

        <Grafica></Grafica>

      </main>

      <footer className='footer bg-dark'>
        <div className='text-light text-center p-3'>
          <h4 className='m-0'>Daniela Castañeda - 20211578118</h4>
        </div>
      </footer>

    </div>
  );
};

export default App;