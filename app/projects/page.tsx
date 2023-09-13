'use client'
import { IProject } from '@/models/Project'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, ChangeEvent } from 'react'

interface IPagination {
    currentPage: number
    totalPages: number
    totalProjects: number
}

export default function Projects() {
    const [projects, setProjects] = useState<IProject[]>([])
    const [pagination, setPagination] = useState<IPagination>({
        currentPage: 1,
        totalPages: 0,
        totalProjects: 0
    })
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(true) // Menambahkan state untuk loading
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setSearchValue(value)
    }
    // Fungsi untuk mengambil data proyek dari API
    const fetchProjects = async (page: number, searchQuery?: string) => {
        try {
            if (!searchQuery) {
                const response = await fetch(
                    `/api/projects?page=${page}&perPage=9`
                ) // Ganti URL sesuai dengan rute API Anda
                if (response.ok) {
                    const data = await response.json()
                    setProjects(data.projects)
                    setPagination({
                        currentPage: data.currentPage,
                        totalPages: data.totalPages,
                        totalProjects: data.totalProjects
                    })
                } else {
                    console.error('Failed to fetch projects')
                }
            } else {
                const response = await fetch(
                    `/api/projects?page=${page}&perPage=9&search=${searchQuery}`
                ) // Ganti URL sesuai dengan rute API Anda
                if (response.ok) {
                    const data = await response.json()
                    setProjects(data.projects)
                    setPagination({
                        currentPage: data.currentPage,
                        totalPages: data.totalPages,
                        totalProjects: data.totalProjects
                    })
                } else {
                    console.error('Failed to fetch projects')
                }
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            // Set loading menjadi false setelah data selesai diambil, baik berhasil maupun gagal
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects(1)
    }, [])
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
                    <div className='input-group'>
                        <input
                            type='text'
                            placeholder='Search…'
                            className='input input-bordered'
                            onChange={handleInputChange}
                        />
                        <button
                            className='btn btn-square'
                            onClick={() => fetchProjects(1, searchValue)}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {loading ? ( // Tampilkan "Loading" jika loading adalah true
                <div className='w-full py-10 flex items-center justify-center'>
                    <span className='loading loading-ring loading-lg'></span>
                </div>
            ) : (
                <div className='grid grid-cols-3 gap-5 mt-8 max-md:grid-cols-2 max-sm:grid-cols-1'>
                    {projects.map(project => (
                        <div className='item-project' key={project._id}>
                            <Image
                                src={project.image[0]}
                                alt=''
                                width={400}
                                height={300}
                                className='img-project'
                            />
                            <div className='desc mb-3'>
                                <div className='tech'>
                                    {project.teknologi.map((tech, index) => (
                                        <div className='item-tech' key={index}>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                                <div className='title'>{project.judul}</div>
                                <div className='sub'>{project.deskripsi}</div>
                                <Link
                                    href={`/projects/${project._id}`}
                                    className='button-gradient'>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && pagination && (
                <div className='flex justify-center mt-10'>
                    <div className='join'>
                        <button
                            className={`join-item btn ${
                                pagination.currentPage === 1
                                    ? 'btn-disabled'
                                    : ''
                            }`}
                            onClick={() => fetchProjects(1, searchValue)}>
                            1
                        </button>
                        {pagination.currentPage > 3 && (
                            <button className='join-item btn btn-disabled'>
                                ...
                            </button>
                        )}
                        {pagination.currentPage > 2 && (
                            <button
                                className='join-item btn'
                                onClick={() =>
                                    fetchProjects(
                                        pagination.currentPage - 1,
                                        searchValue
                                    )
                                }>
                                {pagination.currentPage - 1}
                            </button>
                        )}
                        {pagination.currentPage !== 1 && (
                            <button className='join-item btn btn-active'>
                                {pagination.currentPage}
                            </button>
                        )}
                        {pagination.currentPage < pagination.totalPages - 1 && (
                            <button
                                className='join-item btn'
                                onClick={() =>
                                    fetchProjects(
                                        pagination.currentPage + 1,
                                        searchValue
                                    )
                                }>
                                {pagination.currentPage + 1}
                            </button>
                        )}
                        {pagination.currentPage < pagination.totalPages - 2 && (
                            <button className='join-item btn btn-disabled'>
                                ...
                            </button>
                        )}
                        {pagination.currentPage !== pagination.totalPages && (
                            <button
                                className={`join-item btn ${
                                    pagination.currentPage ===
                                    pagination.totalPages
                                        ? 'btn-disabled'
                                        : ''
                                }`}
                                onClick={() =>
                                    fetchProjects(
                                        pagination.totalPages,
                                        searchValue
                                    )
                                }>
                                {pagination.totalPages}
                            </button>
                        )}
                    </div>
                </div>
            )}

            <br />
            <br />
            <br />
        </div>
    )
}
