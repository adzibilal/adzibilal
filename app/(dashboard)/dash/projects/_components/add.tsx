'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface AddProjectProps {
    onClose: () => void
}

const AddProject = ({ onClose }: AddProjectProps) => {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Validate the title before submitting
        if (!title) {
            setErrMsg('Masukan judul project')
            return
        }

        const value = { title }

        try {
            const res = await axios.post('/api/project', value)

            const { id } = res.data

            if (id) {
                router.push(`/dash/projects/${res.data.id}`)
            } else {
                onClose()
            }
        } catch (error) {
            console.error(error)
            setErrMsg('Something went wrong')
        }
    }

    return (
        <>
            <div
                className='bg-zinc-950/80 w-screen h-screen absolute top-0 left-0 z-10'
                onClick={onClose}></div>
            <div className='bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-md rounded-md p-5 w-full max-w-md z-20'>
                <div className='font-chakra font-bold'>New Project</div>
                <form onSubmit={handleSubmit}>
                    <input
                        className='text-zinc-950 bg-zinc-100 px-3 py-2 focus:outline-none rounded-sm mt-2 w-full'
                        type='text'
                        placeholder='Project Title'
                        onChange={event => setTitle(event.target.value)}
                        value={title}
                    />
                    {errMsg && (
                        <div className='text-xs text-red-600 mt-2'>
                            {errMsg}
                        </div>
                    )}
                    <button
                        type='submit'
                        className='mt-3 bg-gradient-to-t from-purple to-blue text-white font-semibold text-center px-3 py-2 cursor-pointer hover:opacity-90 flex items-center gap-2'>
                        Add Project
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddProject
