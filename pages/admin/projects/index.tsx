'use-client'
import { NextPage } from 'next'

import AdminLayout from '../layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router' // Import useRouter

import { IProject } from '@/models/Project'
import Link from 'next/link'

interface Props {}

const Projects: NextPage<Props> = ({}) => {
    const router = useRouter() // Deklarasikan useRouter
    const [projects, setProjects] = useState<IProject[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fungsi untuk mengambil data proyek dari API
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects') // Ganti URL sesuai dengan rute API Anda
                if (response.ok) {
                    const data = await response.json()
                    setProjects(data)
                    setLoading(false)
                } else {
                    console.error('Failed to fetch projects')
                }
            } catch (error) {
                console.error('Error:', error)
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])
    return (
        <AdminLayout>
            <div className='max-container'>
            <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-4xl'>Projects</h1>
                    <Link href='/admin/projects/add' className="btn btn-info">Add Project</Link>
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
                                    <th>Content</th>
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
                                        <td>{project.content}</td>
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
                                                className='btn btn-ghost btn-xs'
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
                                    <th>Content</th>
                                    <th>Technologies</th>
                                    <th>Link</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default Projects
