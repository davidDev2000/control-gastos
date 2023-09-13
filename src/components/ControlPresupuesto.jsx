import {useEffect, useState} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto,gastos,setGastos,setPresupuesto,setIsValidPresupuesto}) => {
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [dineroGastado, setDineroGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponilbe = presupuesto - totalGastado
    // calcular % gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponilbe) / presupuesto) * 100).toFixed(2)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 800);

    setDineroGastado(totalGastado)
    setDisponible(totalDisponilbe)
  }, [gastos])
  



  const formatearCantidad = cantidad => {
    return cantidad.toLocaleString('en-US', {
      style:'currency',
      currency:'USD'
    })
  }

  const handleResetApp = () => {
    const resultado = confirm('¿ Deseas reiniciar el presupuesto y gastos ?')
    if(resultado) {
      setGastos([])
      setPresupuesto([])
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
       <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626 ': '#3B82F6',
            trailColor:'#F5F5F5',
            textColor:porcentaje > 100 ? '#DC2626 ': '#3B82F6'
          })}
        />
       </div>

       <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>
              Resetear la App
            </button>
            <p>
                <span>Presupuesto :</span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible :</span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado :</span> {formatearCantidad(dineroGastado)}
            </p>
       </div>
    </div>
  )
}

export default ControlPresupuesto