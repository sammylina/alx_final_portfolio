import { useState, useRef } from 'react'
import './App.css'
import Drawer from './Drawer'
import Result from './Result'
import FidelGebeta from './FidelGebeta'

export type Prediction = {
  unicode_point: number
  character: string
  label: number
  certainity: number
}

function App() {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    //const ctxRef = useRef(null)

    const [predictions, setPredictions] = useState<Prediction[]>([])

  const getPredictionAndUpdateResult = (data: Prediction[]) => {
    setPredictions(data)
  }

  return (
    <div className='flex flex-row bg-cyan-600 h-[100vh] overflow-hidden'>
      <div className='basis-1/3 p-6 '>
        <p className=' font-semibold text-slate-100 text-center pb-8 text-2xl'>Fidels</p>
        <FidelGebeta/>
      </div>

      <div className='basis-1/3 flex justify-center mt-16'>
        <Drawer canvasRef={canvasRef}
                getPredictions={getPredictionAndUpdateResult}
              />
      </div>

      <div className='basis-1/3 m-6 h-screen'>
        <p className='font-semibold text-slate-100 text-center pb-8 text-2xl'>Results</p>
        <Result predictions={predictions}/>
      </div>
    </div>
  )
}

export default App
