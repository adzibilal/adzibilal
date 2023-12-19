import { useState } from 'react'
import { AiFillSave, AiFillEdit, AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { Project } from '@prisma/client'

interface TechFormProps {
    project: Project
    onSuccess?: () => void
}

const TechForm = ({ project, onSuccess }: TechFormProps) => {
    const [isEdit, setIsEdit] = useState(false)
    const [values, setValues] = useState(project.tech ?? [])

    const onSubmit = async () => {
        // Menghilangkan item dengan string kosong sebelum mengirimkan permintaan
        const nonEmptyValues = values.filter(item => item.trim() !== '')

        try {
            await axios.patch(`/api/project/${project.id}`, {
                tech: nonEmptyValues
            })
            toggleEdit()
            if (onSuccess) {
                onSuccess()
            }
        } catch {
            console.error('Something went wrong')
        }
    }

    const toggleEdit = () => setIsEdit(current => !current)

    const handleInputChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newValues = [...values]
        newValues[index] = event.target.value
        setValues(newValues)
    }

    const addTechField = () => {
        setValues([...values, ''])
    }

    const deleteTechField = (index: number) => {
        const newValues = [...values]
        newValues.splice(index, 1)
        setValues(newValues)
    }

    return (
        <div className='mt-3'>
            {!isEdit ? (
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <div className='font-semibold'>Teknologi Project</div>
                        <div
                            className='flex items-center gap-2 cursor-pointer'
                            onClick={toggleEdit}>
                            <AiFillEdit /> Edit
                        </div>
                    </div>
                    <div className='flex items-center gap-2 mt-1'>
                        {values.map((item, index) => (
                            <div key={index} className='bg-zinc-100 px-2 py-1'>
                                {item}
                            </div>
                        )) ?? 'Teknologi Belum di set'}
                    </div>
                </div>
            ) : (
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <div className='font-semibold'>Teknologi Project</div>
                        <div
                            className='flex items-center gap-2 cursor-pointer'
                            onClick={() => onSubmit()}>
                            <AiFillSave /> Save
                        </div>
                    </div>
                    {values.map((item, index) => (
                        <div key={index} className='mb-2 flex items-center'>
                            <input
                                className='bg-transparent border border-zinc-100 px-3 py-2 mt-2 focus:outline-none w-full rounded-md'
                                type='text'
                                placeholder={`Technology ${index + 1}`}
                                value={item}
                                onChange={event =>
                                    handleInputChange(index, event)
                                }
                            />
                            <div
                                className='ml-2 cursor-pointer'
                                onClick={() => deleteTechField(index)}>
                                <AiFillDelete />
                            </div>
                        </div>
                    ))}
                    <button
                        className='bg-zinc-100 hover:bg-zinc-200 px-3 py-2 w-full rounded-md'
                        onClick={addTechField}>
                        Add Technology
                    </button>
                </div>
            )}
        </div>
    )
}

export default TechForm
