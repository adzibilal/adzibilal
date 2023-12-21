'use client'
import { Project } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CgAdd } from 'react-icons/cg'
import AddProject from './_components/add'
import CardProjectSkeleton from './_components/skeletons/CardProjectSkeleton'
import { AiOutlineException, AiOutlineSearch } from 'react-icons/ai'

const ProjectPage = () => {
    const [isAdd, setIsAdd] = useState(false)
    const [project, setProject] = useState<Project[]>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1) // New state to track total pages
    const [loading, setLoading] = useState(false) // New state to track loading status
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
                `/api/project?page=${currentPage}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortDirection=${sortDirection}`
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

    useEffect(() => {
        setCurrentPage(1)
        getProject()
    }, [sortDirection])
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='text-4xl font-bold font-chakra'>
                    My Projects
                </div>

                <div className='flex items-center gap-3'>
                    <div className='flex items-center justify-between gap-3'>
                        <select
                            value={sortDirection}
                            onChange={e => setSortDirection(e.target.value)}
                            className='px-3 py-2 border bg-zinc-50 border-zinc-100'>
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
                            className='px-3 py-2 border bg-zinc-50 border-zinc-100 focus:outline-none'
                        />

                        <button
                            onClick={() => {
                                setCurrentPage(1)
                                getProject()
                            }}
                            className='text-2xl bg-gradient-to-t from-purple to-blue text-white font-semibold text-center px-3 py-2 cursor-pointer hover:opacity-90 flex items-center gap-2'>
                            <AiOutlineSearch />
                        </button>
                    </div>
                    <div
                        onClick={() => setIsAdd(true)}
                        className='bg-gradient-to-t from-purple to-blue text-white font-semibold text-center px-3 py-2 cursor-pointer hover:opacity-90 flex items-center gap-2'>
                        <CgAdd />
                        Add Project
                    </div>
                </div>
            </div>
            {isAdd && <AddProject onClose={() => setIsAdd(false)} />}
            {project.length === 0 && !loading && (
                <div className='flex items-center justify-center flex-col h-[50vh]'>
                    <div className='text-zinc-500 text-6xl'>
                        <AiOutlineException />
                    </div>
                    <div className='text-center mt-5 text-zinc-500'>
                        Project yang Anda cari tidak ditemukan.
                    </div>
                </div>
            )}
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
