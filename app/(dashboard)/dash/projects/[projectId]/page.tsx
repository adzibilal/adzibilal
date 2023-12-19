'use client'
import { Project } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Tiptap from '../_components/Tiptap'
import TitleForm from './_components/TitleForm'
import DescriptionForm from './_components/DescriptionForm'
import LinkForm from './_components/LinkForm'
import ContentForm from './_components/ContentForm'
import TechForm from './_components/TechForm'
import ImageForm from './_components/ImageForm'
import Swal from 'sweetalert2'
import IsActiveForm from './_components/IsActiveForm'
import { useRouter } from 'next/navigation'
import { AiFillBackward, AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'

const ProjectEdit = ({ params }: { params: { projectId: string } }) => {
    const router = useRouter()
    const projectId = params.projectId

    const [project, setProject] = useState<Project>()

    const getProject = async () => {
        if (!projectId) return
        const res = await axios.get(`/api/project/${projectId}`)
        return setProject(res.data)
    }

    useEffect(() => {
        getProject()
    }, [])

    const submitDeleteProject = async () => {
        if (!projectId) return
        const res = await axios.delete(`/api/project/${projectId}`)
        return setProject(res.data)
    }

    const deleteProject = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                submitDeleteProject()
                Swal.fire({
                    toast: true,
                    icon: 'success',
                    title: 'Project Berhasil dihapus',
                    animation: false,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: toast => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                router.push('/dash/projects')
                router.refresh
            }
        })
    }
    return (
        <>
            <div className='py-3 px-5 sticky top-0 z-10 bg-zinc-50 mb-5 flex items-center gap-5'>
                <Link href={'/dash/projects'} className=''>
                    <AiOutlineArrowLeft />
                </Link>
                <div className='text-3xl font-chakra font-bold'>
                    Detail Project
                </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                <div className=''>
                    {project && (
                        <ImageForm project={project} onSuccess={getProject} />
                    )}
                </div>
                {project && (
                    <div>
                        <TitleForm project={project} onSuccess={getProject} />
                        <DescriptionForm
                            project={project}
                            onSuccess={getProject}
                        />
                        <ContentForm project={project} onSuccess={getProject} />
                        <LinkForm project={project} onSuccess={getProject} />
                        <TechForm project={project} onSuccess={getProject} />
                        <IsActiveForm
                            project={project}
                            onSuccess={getProject}
                        />

                        <div
                            className='bg-red-500 text-center py-2 font-semibold text-white hover:bg-red-600 cursor-pointer mt-5'
                            onClick={deleteProject}>
                            DELETE PROJECT
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProjectEdit
