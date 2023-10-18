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
    <div className='flex flex-row bg-cyan-600'>
      <div className='basis-1/3'>
        <FidelGebeta/>
      </div>
      <div className='basis-1/3'>
        <Drawer canvasRef={canvasRef}
                getPredictions={getPredictionAndUpdateResult}
              />
      </div>
      <div className='basis-1/3'>
        <Result predictions={predictions}/>
      </div>
    </div>
  )
}

export default App
