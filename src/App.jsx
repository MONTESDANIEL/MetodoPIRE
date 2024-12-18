import React from 'react';
import DatosUsuario from './components/DatosUsuario';
import Grafica from './components/Grafica';

const App = () => {

  return (
    <div>

      <nav className="navbar bg-purple-3 top d-flex justify-content-center ">
        <h1 className='m-2'>Método PIRE</h1>
      </nav>

      <main className="container-fluid p-2">

        <DatosUsuario></DatosUsuario>

        <Grafica></Grafica>

      </main>

      <footer className='footer bg-purple-3'>
        <div className='text-center p-3'>
          <h4 className='m-0'>Daniela Castañeda - 20211578118</h4>
        </div>
      </footer>

    </div>
  );
};

export default App;