import React from 'react'
import {Prediction} from './App'

type ResultProps = {
    predictions: Prediction[]
}

const Result: React.FC<ResultProps> = ({predictions}) => {

    return (
        <>
            <h3>Prediction Result:-</h3>
            {predictions.map(pred => <CharacterPrediction prediction={pred} key={pred.unicode_point}/> )}
        </>
    )
}

const CharacterPrediction = ({prediction }: any) => {
    const {certainity} = prediction
    return (
        <div className='container mx-auto'>
            <div>
                {prediction.character}
            </div> 
            <div>
                <progress max='1' value={certainity}>{Number(certainity) * 100} %</progress>
                <span>{certainity}</span>
            </div>
        </div>
    )
}

export default Result