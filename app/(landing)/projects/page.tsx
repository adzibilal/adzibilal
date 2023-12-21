'use client'
import { IProject } from '@/models/Project'
import { Project } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, ChangeEvent } from 'react'
import { AiOutlineException, AiOutlineSearch } from 'react-icons/ai'
import CardProjectSkeleton from './_components/CardProjectSkeleton'

export default function Projects() {
    const [project, setProject] = useState<Project[]>([])

    const [isInit, setIsInit] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [totalPages, setTotalPages] = useState(1) // New state to track total pages
    const [loading, setLoading] = useState(true) // New state to track loading status
    const [searchTerm, setSearchTerm] = useState('') // State untuk menyimpan nilai pencarian
    const [sortDirection, setSortDirection] = useState('desc') // State untuk menyimpan arah pengurutan

    const getProject = async () => {
        try {
            setLoading(true)
            // Reset project state jika currentPage adalah 1, artinya ini adalah pencarian baru
            if (currentPage === 1) {
                setProject([])
            }
            const res = await axios.get(
                `/api/project?page=${currentPage}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortDirection=${sortDirection}&isActive=true`
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
        setIsInit(false)
    }, [currentPage, pageSize])

    useEffect(() => {
        if (!isInit) {
            setCurrentPage(1)
            getProject()
        }
    }, [sortDirection])
    return (
        <div className='max-container max-lg:!mx-5'>
            <br />
            <br />
            <br />

            <div className='flex justify-between items-center max-md:flex-col max-md:items-start gap-5'>
                <div className='title-section'>
                    Look at All <br />
                    <span className='text-gradient'>My Projects.</span>
                </div>
                <div className='form-control'>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center justify-between gap-3'>
                            <select
                                value={sortDirection}
                                onChange={e => setSortDirection(e.target.value)}
                                className='px-3 py-2 border bg-zinc-50 border-zinc-100 dark:text-zinc-900 rounded-full'>
                                <option value='asc'>Terlama</option>
                                <option value='desc'>Terbaru</option>
                            </select>
                            <input
                                type='text'
                                placeholder='Search projects...'
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        // Tombol "Enter" ditekan, panggil fungsi pencarian di sini
                                        setCurrentPage(1) // Reset currentPage
                                        getProject()
                                    }
                                }}
                                className='px-3 py-2 border bg-zinc-50 border-zinc-100 focus:outline-none dark:text-zinc-900 rounded-full'
                            />

                            <button
                                onClick={() => {
                                    setCurrentPage(1)
                                    getProject()
                                }}
                                className='text-2xl bg-gradient-to-t from-purple to-blue text-white font-semibold text-center px-3 py-2 cursor-pointer hover:opacity-90 flex items-center gap-2 rounded-full'>
                                <AiOutlineSearch />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {project.length === 0 && !loading && !isInit && (
                <div className='flex items-center justify-center flex-col h-[50vh]'>
                    <div className='text-zinc-500 text-6xl'>
                        <AiOutlineException />
                    </div>
                    <div className='text-center mt-5 text-zinc-500'>
                        Project yang Anda cari tidak ditemukan.
                    </div>
                </div>
            )}
            {project && (
                <div className='grid grid-cols-3 gap-5 mt-8 max-md:grid-cols-2 max-sm:grid-cols-1'>
                    {project.map(project => (
                        <div className='item-project' key={project.id}>
                            <Image
                                src={project.images[0]}
                                alt=''
                                width={400}
                                height={300}
                                className='img-project'
                            />
                            <div className='desc mb-3'>
                                <div className='tech'>
                                    {project.tech.map((tech, index) => (
                                        <div className='item-tech' key={index}>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                                <div className='title'>{project.title}</div>
                                <div className='sub'>{project.description}</div>
                                <Link
                                    href={`/projects/${project.id}`}
                                    className='button-gradient'>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className='mt-5'>
                {!loading && currentPage < totalPages && (
                    <div
                        onClick={handleLoadMore}
                        className='text-center hover:text-blue cursor-pointer'>
                        Load More
                    </div>
                )}
                {loading && !isInit && (
                    <div className='grid grid-cols-3 gap-5 mt-8 max-md:grid-cols-2 max-sm:grid-cols-1'>
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                        <CardProjectSkeleton />
                    </div>
                )}
                {loading && isInit && (
                <div className='grid grid-cols-3 gap-5 mt-8 max-md:grid-cols-2 max-sm:grid-cols-1'>
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                </div>
            )}
            </div>
            
            <br />
            <br />
            <br />
        </div>
    )
}
