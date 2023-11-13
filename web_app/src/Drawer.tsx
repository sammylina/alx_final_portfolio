import React, {useState, useEffect} from 'react'

interface ChildComponentsProps {
    canvasRef: React.RefObject<HTMLCanvasElement>
    getPredictions: any
}

const Drawer = ({canvasRef, getPredictions}: ChildComponentsProps) => {

    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const [drawing, setDrawding] = useState<Boolean>(false)


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d')
        if (ctx) {
            ctx.lineJoin = 'round'
            ctx.lineCap = 'round'
            ctx.lineWidth = 10
            ctx.strokeStyle = 'black'
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, canvas!.width, canvas!.height)
            setContext(ctx)
        }
        
    }, [])

    const clearCanvas = () => {
        const canvas = canvasRef.current
        context!.strokeStyle = 'black'
        context!.fillStyle = 'white'
        context!.fillRect(0, 0, canvas!.width, canvas!.height)
        getPredictions([])
        //if (canvas) {
        //    context!.strokeStyle = 'black'
        //    context!.fillStyle = 'white'
        //    context?.clearRect(0, 0, canvas.width, canvas.height)
        //    setContext(context)
        //}
    }
    
    const captureCanvas = () => {
        const canvas = canvasRef.current
        if (canvas) {
            
            canvas.toBlob((blob) => {
                if (blob) {

                    const formData = new FormData();
                    formData.append('req', blob, 'new_image.png')

                    fetch(`${import.meta.env.VITE_API_URL}/predict', {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => {
                        return res.json()
                    })
                    .then((data) => {
                      getPredictions(data.res)
                    })
                    .catch((err) => {console.log("server error: ", err)})
                }

            }, 'caputured_img/png')
        }
    }

    const startDrawing = (event : React.MouseEvent<HTMLCanvasElement>) => {
        if (context) {
            const {offsetX, offsetY} = event.nativeEvent;
            context.beginPath()
            context.moveTo(offsetX, offsetY)
        }
        setDrawding(true)
    }

    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawing) {
            return
        }
        if (context) {
            const {offsetX, offsetY} = event.nativeEvent;
            context.lineTo(offsetX, offsetY)
            context.stroke()
        }
    }

    const endDrawing = ()  => {
        context?.closePath();
        setDrawding(false)
    }


    return (
        <div className='space-y-4 mt-16'>
            <div>

                <canvas ref={canvasRef}
                    width={200}
                    height={200}
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={draw}
                    className='rounded-xl'
                ></canvas>
            </div>
            <p className='text-lg font-thin text-slate-100 text-center '>Draw Here</p>
            <div className='space-x-4 text-center'>
                <button className='py-3 px-6 rounded-lg text-md bg-cyan-800 text-slate-200 outline-none' onClick={clearCanvas}>Clear</button>
                <button className='py-3 px-6 rounded-lg text-md bg-cyan-800 text-slate-200 outline-none' onClick={captureCanvas}>Predict</button>
            </div>
        </div>
    )
}


export default Drawer;
