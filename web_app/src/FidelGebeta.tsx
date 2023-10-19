import React from 'react'


const FidelGebeta: React.FC = () => {
    const start = 'ሀ'.charCodeAt(0)
    const end = 'ፐ'.charCodeAt(0)
    
    const generateFidels = () => {
        let i;
        const fidels = []
        const badWords = [4680, 4688, 4696, 4744, 4784, 4800, 4856, 4880, 4888]
        for (i = start; i < end + 1; i+=8) {
            if (i % 8 == 0 && !badWords.includes(i)) {
                fidels.push(String.fromCodePoint(i))

                for (let j = i + 1; j < i + 7; j++) {
                    fidels.push(String.fromCodePoint(j))
                }
            } 
        }
        return fidels
    }

    return (
        <div className='grid grid-cols-7 gap-y-1 gap-x-0 overflow-y-auto max-h-screen pb-32'>
            {
                generateFidels().map((fidel, idx) => {
                    return (
                        <div className='rounded-lg hover:bg-cyan-500 hover:text-black bg-cyan-700 h-12 w-12 text-center text-slate-200 text-4xl' key={idx}>{fidel}</div>
                    )
                })
            }
        </div>
    )
}


export default FidelGebeta