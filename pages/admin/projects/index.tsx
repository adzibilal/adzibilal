'use-client'
import { NextPage } from 'next'

import AdminLayout from '../layout'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router' // Import useRouter

import { IProject } from '@/models/Project'
import Link from 'next/link'

interface Props {}
interface IPagination {
    currentPage: number
    totalPages: number
    totalProjects: number
}

const Projects: NextPage<Props> = ({}) => {
    const router = useRouter()
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
        <AdminLayout>
            <div className='max-container'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-4xl'>Projects</h1>

                    <div className='flex gap-3 items-center'>
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
                                    onClick={() =>
                                        fetchProjects(1, searchValue)
                                    }>
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
                        <Link href='/admin/projects/add' className='btn'>
                            Add Project
                        </Link>
                    </div>
                </div>
                {loading ? (
                    <span className='loading loading-spinner loading-lg'></span>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='table'>
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input
                                                type='checkbox'
                                                className='checkbox'
                                            />
                                        </label>
                                    </th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Technologies</th>
                                    <th>Link</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map(project => (
                                    <tr key={project._id}>
                                        <td>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    className='checkbox'
                                                />
                                            </label>
                                        </td>
                                        <td>{project.judul}</td>
                                        <td>{project.deskripsi}</td>
                                        <td>
                                            <img
                                                src={project.image[0]}
                                                alt={project.judul}
                                                style={{ maxWidth: '100px' }}
                                            />
                                        </td>
                                        <td>
                                            {project.teknologi.map(tech => (
                                                <span
                                                    key={tech}
                                                    className='badge badge-ghost badge-sm'>
                                                    {tech}
                                                </span>
                                            ))}
                                        </td>
                                        <td>
                                            <a
                                                href={project.link}
                                                target='_blank'
                                                rel='noopener noreferrer'>
                                                {project.link}
                                            </a>
                                        </td>
                                        <th>
                                            <button
                                                className='btn btn-xs'
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/projects/${project._id}`
                                                    )
                                                }>
                                                details
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Technologies</th>
                                    <th>Link</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
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
                            {pagination.currentPage <
                                pagination.totalPages - 1 && (
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
                            {pagination.currentPage <
                                pagination.totalPages - 2 && (
                                <button className='join-item btn btn-disabled'>
                                    ...
                                </button>
                            )}
                            {pagination.currentPage !==
                                pagination.totalPages && (
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
            </div>
        </AdminLayout>
    )
}

export default Projects
