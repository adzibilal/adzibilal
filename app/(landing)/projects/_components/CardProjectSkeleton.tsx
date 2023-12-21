import React from 'react'

const CardProjectSkeleton = () => {
    return (
        <div className='relative animate-pulse rounded-xl overflow-hidden'>
            <div className='aspect-[5/4] w-full bg-zinc-200 dark:bg-zinc-700'></div>
            <div className='flex items-center gap-3 mt-2'>
                <div className='h-7 w-10 bg-zinc-200 dark:bg-zinc-700'></div>
                <div className='h-7 w-10 bg-zinc-200 dark:bg-zinc-700'></div>
                <div className='h-7 w-10 bg-zinc-200 dark:bg-zinc-700'></div>
            </div>
            <div className='h-6 mt-2 w-full bg-zinc-200 dark:bg-zinc-700'></div>
            <div className='h-5 mt-2 w-full bg-zinc-200 dark:bg-zinc-700'></div>

            
            <div className='bg-zinc-300 dark:bg-zinc-700 px-3 py-1 h-9 rounded-full w-36 mt-3'></div>
        </div>
    )
}

export default CardProjectSkeleton
