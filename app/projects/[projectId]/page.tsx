'use client'
import CtaFooter from '@/components/CtaFooter'
import ProjectComments from '@/components/ProjectComment'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Project {
    _id: string
    judul: string
    deskripsi: string
    content: string
    teknologi: string[]
    link: string
    image: string[]
}

export default function Page({ params }: { params: { projectId: string } }) {
    const projectId = params.projectId

    const [project, setProject] = useState<Project | null>(null)

    useEffect(() => {
        if (projectId) {
            // Buat permintaan GET ke API Anda dengan projectId yang diambil dari URL
            fetch(`/api/projects/?projectId=${projectId}`, {
                method: 'GET'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }

                    return response.json()
                })
                .then(data => {
                    console.error(data)
                    // Setel data proyek ke dalam state
                    setProject(data)
                })
                .catch(error => {
                    console.error(
                        'There was a problem with the fetch operation:',
                        error
                    )
                })
        }
    }, [projectId])

    if (!project) {
        // Menampilkan pesan atau indikator loading jika data belum tersedia
        return (
            <div className='loading-box w-full h-[80vh] max-container max-lg:!mx-5 flex items-center justify-center'>
                <span className='loading loading-ring loading-lg'></span>
            </div>
        )
    }

    return (
        <div className='max-container max-lg:!mx-5 min-h-[80vh] !mt-10'>
            <div className='text-sm breadcrumbs mb-5'>
                <ul>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link href='/projects'>Projects</Link>
                    </li>
                    <li>{project.judul}</li>
                </ul>
            </div>
            <div className='grid grid-cols-[1fr_1.5fr] gap-5 max-md:grid-cols-1 mb-20'>
                <div className=''>
                    <div className='carousel w-full'>
                        {project.image.map((url, index) => (
                            <div
                                id={`${index}`}
                                key={index}
                                className='carousel-item w-full'>
                                <Image
                                    width={600}
                                    height={400}
                                    alt='img-project'
                                    src={url}
                                    className='w-full'
                                />
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center w-full gap-1'>
                        {project.image.map((url, index) => (
                            <a href={`#${index}`} key={index}>
                                <Image
                                    width={120}
                                    height={80}
                                    alt='img-project'
                                    src={url}
                                    className='object-cover'
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div className=''>
                    <div className='title-section text-gradient'>
                        {project.judul}
                    </div>
                    <div className='text-base-content mb-4'>
                        {project.deskripsi}
                    </div>

                    <div className='tech flex gap-2 mb-3'>
                        {project.teknologi.map((tech, index) => (
                            <div
                                className='bg-white-secondary text-black-primary w-max px-3 py-1 rounded-full text-xs'
                                key={index}>
                                {tech}
                            </div>
                        ))}
                    </div>

                    <div className='text-justify text-sm mb-5'>
                        {project.content}
                    </div>

                    <Link href={project.link} className='btn btn-info'>
                        Live Project
                    </Link>
                </div>
            </div>

            <ProjectComments projectId={projectId} />
            
            <CtaFooter /> <br />
            <br />
        </div>
    )
}
