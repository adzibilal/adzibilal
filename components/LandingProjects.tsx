'use client'
import { IProject } from '@/models/Project'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
export default function LandingProjects() {
    const [projects, setProjects] = useState<IProject[]>([])
    const [loading, setLoading] = useState(true) // Menambahkan state untuk loading

    useEffect(() => {
        // Fungsi untuk mengambil data proyek dari API
        const fetchProjects = async () => {
            try {
                const response = await fetch(
                    '/api/projects?endpoint=projects-lp'
                ) // Ganti URL sesuai dengan rute API Anda
                if (response.ok) {
                    const data = await response.json()
                    setProjects(data)
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

        fetchProjects()
    }, [])

    return (
        <section className='max-container !mt-20 !pb-20 max-2xl:!mx-5'>
            <div className='header-l-projects flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-5'>
                <div className='title-section'>
                    Look at My <br />
                    <span className='text-gradient'>Projects.</span>
                </div>

                <p className='text-right max-sm:text-left'>
                    Explore my portfolio to witness <br /> my creative web and
                    design projects
                </p>
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
            <div className='flex items-center justify-center'>
                <Link href='/projects' className='button-gradient mt-7'>
                    Show More
                </Link>
            </div>
        </section>
    )
}
