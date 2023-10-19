import React from 'react'
import {Prediction} from './App'

type ResultProps = {
    predictions: Prediction[]
}

const Result: React.FC<ResultProps> = ({predictions}) => {

    return (
        <ul className='divide-y divide-cyan-300 mr-16'>
            {predictions.map(pred => <CharacterPrediction prediction={pred} key={pred.unicode_point}/> )}
        </ul>
    )
}

const CharacterPrediction = ({prediction }: any) => {
    let {certainity} = prediction
    certainity = Number.parseFloat(certainity)
    certainity *= 100
    console.log('certainity: ', certainity)
    return (
        <li className='bg-cyan-700 first:ml-0 ml-8 px-4  py-2 flex space-x-6 items-center rounded'>
            <div className='h-10 w-10 border border-white rounded text-center text-3xl font-thin bg-cyan-600 text-slate-50'>
                {prediction.character}
            </div> 
            <div className='space-x-4'>
                <progress className='[&::-webkit-progress-value]:bg-cyan-400 [&::-webkit-progress-bar]:bg-slate-700 border border-cyan-400 rounded-full border-2 h-3 ' max='100' value={certainity}></progress>
            </div>
            <span className='text-slate-100 font-bold'>{certainity.toFixed(1)}%</span>
        </li>
    )
}

export default Result