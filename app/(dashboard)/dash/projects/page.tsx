'use client'
import { Project } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CgAdd } from 'react-icons/cg'
import AddProject from './_components/add'
import CardProjectSkeleton from './_components/skeletons/CardProjectSkeleton'

const ProjectPage = () => {
    const [isAdd, setIsAdd] = useState(false)
    const [project, setProject] = useState<Project[]>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1) // New state to track total pages
    const [loading, setLoading] = useState(false) // New state to track loading status

    const getProject = async () => {
        try {
            setLoading(true)
            const res = await axios.get(
                `/api/project?page=${currentPage}&pageSize=${pageSize}`
            )
            setProject(prevProject => [...prevProject, ...res.data.projects])
            setTotalPages(Math.ceil(res.data.pageInfo.totalProjects / pageSize))
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1)
        }
    }

    useEffect(() => {
        getProject()
    }, [currentPage, pageSize])
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='text-4xl font-bold font-chakra'>
                    My Projects
                </div>

                <div
                    onClick={() => setIsAdd(true)}
                    className='bg-gradient-to-t from-purple to-blue text-white font-semibold text-center px-3 py-2 cursor-pointer hover:opacity-90 flex items-center gap-2'>
                    <CgAdd />
                    Add Project
                </div>
            </div>
            {isAdd && <AddProject onClose={() => setIsAdd(false)} />}
            <div className='grid grid-cols-3 xl:grid-cols-5 mt-10 gap-3'>
                {project &&
                    project.map(item => (
                        <div className='relative' key={item.id}>
                            {item.images[0] ? (
                                <Image
                                    src={item.images[0]}
                                    width={300}
                                    height={300}
                                    alt=''
                                    className='w-full aspect-[5/4] object-cover'
                                />
                            ) : (
                                <div className='aspect-[5/4] w-full bg-zinc-200'></div>
                            )}
                            <div className='absolute top-2 right-2'>
                                {item.isActive ? (
                                    <div className='bg-green w-max px-3 py-1 text-xs text-white'>
                                        Aktif
                                    </div>
                                ) : (
                                    <div className='bg-zinc-200 w-max px-3 py-1 text-xs'>
                                        Non Aktif
                                    </div>
                                )}
                            </div>
                            <div className='text-lg font-semibold mt-2 line-clamp-1'>
                                {item.title ?? 'Title Not Set'}
                            </div>
                            <div className='text-sm mb-2 line-clamp-1'>
                                {item.description ?? 'No description'}
                            </div>
                            <div className='flex items-center gap-3'>
                                {item.tech.map(tech => (
                                    <div className='text-sm bg-zinc-100 px-2 py-1 rounded-sm line-clamp-1'>
                                        {tech}
                                    </div>
                                ))}
                            </div>
                            <Link href={`/dash/projects/${item.id}`}>
                                <div className='bg-gradient-to-t from-purple to-blue text-white font-semibold text-center px-3 py-1 cursor-pointer hover:opacity-90 mt-5'>
                                    Lihat
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>

            <div className='mt-5'>
                {!loading && currentPage < totalPages && (
                    <div
                        onClick={handleLoadMore}
                        className='text-center hover:text-blue cursor-pointer'>
                        Load More
                    </div>
                )}
                {loading && (
                    <div className='grid grid-cols-3 xl:grid-cols-5 mt-10 gap-3'>
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectPage
