import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import {generarID} from './helpers/index'


function App() {
  // Este useState vigila los cambios en el 'Input' que define presupuesto en la pagina de inicio donde el 'presupuesto' toma el valor inicial de 0 y setPresupuesto modifica ese valor a la cantidad deseada del usuario
  const [presupuesto, setPresupuesto] = useState (
    Number(localStorage.getItem('presupuesto') ?? 0)
  );
  // Verifica si el presupuesto ingresado es valido para tomar acciones correspondientes ref:Header.jsx
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  // Este useState monitorear la apertura y los cambios en  el modal para agregar el nuevo gasto 
  const [modal, setModal] = useState(false)
  // Este useState monitorear la animacion de aparicion/desaparicion de formulario cuando el modal este abierto
  const[animarModal, setAnimarModal] = useState (false)
  // Es el array donde se almacenan la informacion sobre el gasto registrado
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState ([])
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  // Guardar en LS el presupuesto ingresado para que no se pierda
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])
  
  // Guardar los gastos registrados en LS
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  
  
  
  
  // Funcion que abre el modal para agregar un gasto nuevo se utiliza en la imagen nuevo-gasto.svg
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  // Registra el gasto en un objeto {nombre,cantidad,categoria} y lo almacena en gastos, setGastos modifica el vacion en los elementos del objeto y los llena con value otorgado
  const guardarGasto = gasto => {
    if(gasto.id) {
      // Actualizar
      const gastoActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastoActualizados)
      setGastoEditar({})
    }else {
      // Nuevo Gasto
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);
  }
  // Eliminar el gasto
  const eliminarGasto = id => {
    const gastoEliminado = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastoEliminado)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

      
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt='Nuevo Gasto' onClick={handleNuevoGasto}/>
          </div>
        </>
      )}

      {modal && <Modal 
        setModal = {setModal}
        animarModal = {animarModal}
        setAnimarModal = {setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
                />}
    </div>
  )
}

export default App
