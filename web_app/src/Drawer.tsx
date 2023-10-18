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

                    fetch('http://127.0.0.1:8000/predict', {
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
        <div className=''>
            <div>

                <canvas ref={canvasRef}
                    width={250}
                    height={250}
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={draw}
                    style={{border: '1px solid black'}}
                ></canvas>
            </div>
            <div className='conatiner center'>
                <button onClick={clearCanvas}>Clear</button>
                <button onClick={captureCanvas}>Perdict</button>
            </div>
        </div>
    )
}


export default Drawer;