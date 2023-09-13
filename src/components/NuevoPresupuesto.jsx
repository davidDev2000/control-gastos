import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto,setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState("")

    // Validacion de presupuesto si es un numero valido (no es un string o numero negativo / otro tipo de dato)
    const hundlePresupuesto = (e) => {
        e.preventDefault();
        if (!presupuesto || presupuesto < 0) {
            setMensaje('no es un presupuesto valido')
            return
        }
        setMensaje("")
        setIsValidPresupuesto(true)
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form className='formulario' onSubmit={hundlePresupuesto}>
            <div className='campo'>
                <label>Definir Presupuesto</label>

                <input
                    className='nuevo-presupuesto'
                    type='number'
                    placeholder="Añade tu presupuesto"
                    // Este value inicia en 0 es el valor del input en pagina inicial donde hay que definir presupuesto
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                />
            </div>
                <input
                    type='submit'
                    value="Añadir"
                />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto