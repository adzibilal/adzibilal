'use client'
import CtaFooter from '@/components/CtaFooter'
import ProjectComments from '@/components/ProjectComment'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Project } from '@prisma/client'
import parse from 'html-react-parser'


export default function Page({ params }: { params: { projectId: string } }) {
    const projectId = params.projectId

    const [project, setProject] = useState<Project>()

    const getProject = async () => {
        if (!projectId) return
        const res = await axios.get(`/api/project/${projectId}`)
        return setProject(res.data)
    }

    useEffect(() => {
        getProject()
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
            <Head>
                {/* Meta Gambar */}
                <meta property='og:image' content={project.images[0]} />

                {/* Judul */}
                <title>{project.title} - Portofolio Adzi Bilal</title>

                {/* Deskripsi */}
                <meta name='description' content={project.description ?? ''} />
            </Head>
            <div className='text-sm breadcrumbs mb-5'>
                <ul>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link href='/projects'>Projects</Link>
                    </li>
                    <li>{project.title}</li>
                </ul>
            </div>
            <div className='grid grid-cols-[1fr_1.5fr] gap-5 max-md:grid-cols-1 mb-20'>
                <div className=''>
                    <div className='carousel w-full'>
                        {project.images.map((url, index) => (
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
                        {project.images.map((url, index) => (
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
                        {project.title}
                    </div>
                    <div className='text-black-primary dark:text-gray mb-4'>
                        {project.description}
                    </div>

                    <div className='tech flex gap-2 mb-3'>
                        {project.tech.map((tech, index) => (
                            <div
                                className='bg-gray-light dark:bg-white-secondary text-black-primary w-max px-3 py-1 rounded-full text-xs'
                                key={index}>
                                {tech}
                            </div>
                        ))}
                    </div>

                    <div className='text-justify text-sm mb-5'>
                        {parse(project.content ?? 'Content Belum di set')}
                    </div>

                    {project.link && (
                        <Link href={project.link} className='btn btn-info'>
                            Live Project
                        </Link>
                    )}
                </div>
            </div>
            {/* <ProjectComments projectId={projectId} /> */}
            <CtaFooter /> <br />
            <br />
        </div>
    )
}
