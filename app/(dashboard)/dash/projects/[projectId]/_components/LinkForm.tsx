'use client'
import { Project } from '@prisma/client'
import axios from 'axios'
import React, { useState } from 'react'
import { AiFillSave, AiFillEdit } from 'react-icons/ai'

interface LinkFormProps {
    project: Project
    onSuccess?: () => void
}
const LinkForm = ({ project, onSuccess }: LinkFormProps) => {
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(project.link ?? '')

    const onSubmit = async () => {
        const values = {
            link: value
        }
        try {
            await axios.patch(`/api/project/${project.id}`, values)
            toggleEdit()
            if (onSuccess) {
                onSuccess()
            }
        } catch {
            console.error('Something went wrong')
        }
    }
    const toggleEdit = () => setIsEdit(current => !current)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmit()
        }
    }

    return (
        <div className='mt-3'>
            {!isEdit ? (
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <div className='font-semibold'>Link Project</div>
                        <div
                            className='flex items-center gap-2 cursor-pointer'
                            onClick={toggleEdit}>
                            <AiFillEdit /> Edit
                        </div>
                    </div>
                    <div className='line-clamp-2'>
                        {project.link ?? 'Link Belum di set'}
                    </div>
                </div>
            ) : (
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <div className='font-semibold'>Link Project</div>
                        <div
                            className='flex items-center gap-2 cursor-pointer'
                            onClick={() => onSubmit()}>
                            <AiFillSave /> Save
                        </div>
                    </div>
                    <input
                        className='bg-transparent border border-zinc-100 px-3 py-2 mt-2 focus:outline-none w-full rounded-md'
                        type='text'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            )}
        </div>
    )
}

export default LinkForm
