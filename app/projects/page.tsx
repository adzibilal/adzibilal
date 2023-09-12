'use client'
import { IProject } from '@/models/Project'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
    const [loading, setLoading] = useState(true) // Menambahkan state untuk loading

    // Fungsi untuk mengambil data proyek dari API
    const fetchProjects = async (page: number) => {
        try {
            const response = await fetch(`/api/projects?page=${page}&perPage=6`) // Ganti URL sesuai dengan rute API Anda
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

            <div className='title-section'>
                Look at All <br />
                <span className='text-gradient'>My Projects.</span>
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
                <div className='w-full flex justify-end'>
                    <div className='join mt-6'>
                        {pagination.currentPage > 1 && (
                            <button
                                className='join-item btn'
                                onClick={() =>
                                    fetchProjects(pagination.currentPage - 1)
                                }>
                                «
                            </button>
                        )}
                        <button className='join-item btn'>
                            Page {pagination.currentPage}
                        </button>
                        {pagination.currentPage < pagination.totalPages && (
                            <button
                                className='join-item btn'
                                onClick={() =>
                                    fetchProjects(pagination.currentPage + 1)
                                }>
                                »
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
