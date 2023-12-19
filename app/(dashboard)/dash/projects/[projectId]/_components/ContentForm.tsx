'use client'
import { Project } from '@prisma/client'
import axios from 'axios'
import React, { useState } from 'react'
import { AiFillSave, AiFillEdit } from 'react-icons/ai'
import Tiptap from '../../_components/Tiptap'
import parse from 'html-react-parser'

interface ContentFormProps {
    project: Project
    onSuccess?: () => void
}
const ContentForm = ({ project, onSuccess }: ContentFormProps) => {
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(project.content ?? '')

    const onSubmit = async () => {
        const values = {
            content: value
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
    const descCon = (text: string) => {
        setValue(text)
    }

    return (
        <div className='mt-3'>
            {!isEdit ? (
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <div className='font-semibold'>Content</div>
                        <div
                            className='flex items-center gap-2 cursor-pointer'
                            onClick={toggleEdit}>
                            <AiFillEdit /> Edit
                        </div>
                    </div>
                    <div className=''>
                        {parse(project.content ?? 'Content Belum di set')}
                    </div>
                </div>
            ) : (
                <div className=''>
                    <div className='flex justify-between items-center mb-3'>
                        <div className='font-semibold'>Content</div>
                        <div
                            className='flex items-center gap-2 cursor-pointer'
                            onClick={() => onSubmit()}>
                            <AiFillSave /> Save
                        </div>
                    </div>
                    <Tiptap
                        initialContent={project?.content || ''}
                        onContentChange={descCon}
                    />
                </div>
            )}
        </div>
    )
}

export default ContentForm
