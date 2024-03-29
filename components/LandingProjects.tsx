'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@prisma/client'
import CardProjectSkeleton from '@/app/(landing)/projects/_components/CardProjectSkeleton'
export default function LandingProjects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true) // Menambahkan state untuk loading

    useEffect(() => {
        // Fungsi untuk mengambil data proyek dari API
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/project/landing') // Ganti URL sesuai dengan rute API Anda
                if (response.ok) {
                    const data = await response.json()
                    setProjects(data.projects)
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
            <motion.div
                className='header-l-projects flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-5'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>
                <div className='title-section'>
                    Look at My <br />
                    <span className='text-gradient'>Projects.</span>
                </div>

                <p className='text-right max-sm:text-left'>
                    Explore my portfolio to witness <br /> my creative web and
                    design projects
                </p>
            </motion.div>
            {loading ? ( // Tampilkan "Loading" jika loading adalah true
                <div className='grid grid-cols-3 gap-5 mt-8 max-md:grid-cols-2 max-sm:grid-cols-1'>
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                    <CardProjectSkeleton />
                </div>
            ) : (
                <div className='grid grid-cols-3 gap-5 mt-8 max-md:grid-cols-2 max-sm:grid-cols-1'>
                    {projects.map(project => (
                        <motion.div
                            className='item-project'
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}>
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
                                <div className='title line-clamp-1'>
                                    {project.title}
                                </div>
                                <div className='sub line-clamp-2'>
                                    {project.description}
                                </div>
                                <Link
                                    href={`/projects/${project.id}`}
                                    className='button-gradient'>
                                    Learn More
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
            <motion.div
                className='flex items-center justify-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>
                <Link href='/projects' className='button-gradient mt-7'>
                    Show More
                </Link>
            </motion.div>
        </section>
    )
}
