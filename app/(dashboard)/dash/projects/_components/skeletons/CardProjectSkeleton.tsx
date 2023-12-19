import React from 'react'

const CardProjectSkeleton = () => {
    return (
        <div className='relative animate-pulse'>
            <div className='aspect-[5/4] w-full bg-zinc-200'></div>
            <div className='absolute top-2 right-2'>
                <div className='bg-zinc-300 w-10 h-5 px-3 py-1 text-xs'>
                    
                </div>
            </div>
            <div className='h-6 mt-2 w-full bg-zinc-200'></div>
            <div className='h-5 mt-2 w-full bg-zinc-200'></div>

            <div className='flex items-center gap-3 mt-2'>
                <div className='h-7 w-10 bg-zinc-200'></div>
                <div className='h-7 w-10 bg-zinc-200'></div>
                <div className='h-7 w-10 bg-zinc-200'></div>
            </div>
            <div className='bg-zinc-300 px-3 py-1 mt-2 h-9'></div>
        </div>
    )
}

export default CardProjectSkeleton
