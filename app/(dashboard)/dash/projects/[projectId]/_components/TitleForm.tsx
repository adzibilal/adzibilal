'use client'
import { Project } from '@prisma/client'
import axios from 'axios'
import React, { useState } from 'react'
import {AiFillSave, AiFillEdit} from 'react-icons/ai'

interface TitleFormProps {
    project: Project
    onSuccess?: () => void
}
const TitleForm = ({ project, onSuccess }: TitleFormProps) => {
    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState(project.title)

    const onSubmit = async () => {
        const values = {
            title: title
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
        <div>
            <div className="font-semibold">Title Project</div>
            {!isEdit ? (
                <div className='flex justify-between items-center'>
                    <div className='text-2xl font-semibold'>
                        {project.title}
                    </div>
                    <div
                        className='flex items-center gap-2 cursor-pointer'
                        onClick={toggleEdit}>
                        <AiFillEdit /> Edit
                    </div>
                </div>
            ) : (
                <div className='flex items-center gap-2'>
                    <input
                        className='text-2xl font-semibold bg-transparent focus:outline-none w-full'
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div
                        className='flex items-center gap-2 cursor-pointer'
                        onClick={() => onSubmit()}>
                        <AiFillSave /> Save
                    </div>
                </div>
            )}
        </div>
    )
}

export default TitleForm
