'use client'
import { Project } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillSave, AiFillEdit } from 'react-icons/ai'
import Swal from 'sweetalert2'

interface IsActiveFormProps {
    project: Project
    onSuccess?: () => void
}
const IsActiveForm = ({ project, onSuccess }: IsActiveFormProps) => {
    const [isInit, setIsInit] = useState(true)
    const [value, setValue] = useState(project.isActive ?? false)

    const onSubmit = async () => {
        const values = {
            isActive: value
        }
        try {
            await axios.patch(`/api/project/${project.id}`, values)
            if (onSuccess) {
                onSuccess()
            }
            Swal.fire({
                toast: true,
                icon: 'success',
                title: 'Status Berhasil Di Ubah',
                animation: false,
                position: 'top-right',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: toast => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        } catch {
            console.error('Something went wrong')
        }
    }

    const toggleActive = () => {
        setValue(prevValue => !prevValue)
    }

    useEffect(() => {
        setIsInit(false)
    }, [])

    useEffect(() => {
        if (!isInit) {
            onSubmit()
        }
    }, [value])

    return (
        <div className='mt-3'>
            <div className=''>
                <div className='flex justify-between items-center'>
                    <div className='font-semibold'>Status Project {value}</div>
                    {value ? (
                        <div
                            className='bg-green w-16 h-8 rounded-full p-1 cursor-pointer'
                            onClick={toggleActive}>
                            <div className='w-6 h-6 rounded-full bg-white float-right'></div>
                        </div>
                    ) : (
                        <div
                            className='bg-zinc-200 w-16 h-8 rounded-full p-1 cursor-pointer'
                            onClick={toggleActive}>
                            <div className='w-6 h-6 rounded-full bg-white'></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default IsActiveForm
