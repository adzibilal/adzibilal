'use client'
import { IProject } from '@/models/Project'
import { useState, useEffect } from 'react'
export default function LandingProjects() {
    const [projects, setProjects] = useState<IProject[]>([])

    useEffect(() => {
        // Fungsi untuk mengambil data proyek dari API
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects') // Ganti URL sesuai dengan rute API Anda
                if (response.ok) {
                    const data = await response.json()
                    setProjects(data)
                } else {
                    console.error('Failed to fetch projects')
                }
            } catch (error) {
                console.error('Error:', error)
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

            <div className='grid grid-cols-3 gap-5 mt-8 max-md:grid-cols-2 max-sm:grid-cols-1'>
                {projects.map(project => (
                    <div className='item-project' key={project._id}>
                        <img
                            src={project.image}
                            alt=''
                            className='img-project'
                        />
                        <div className='desc'>
                            <div className='tech'>
                                {project.teknologi.map((tech, index) => (
                                    <div className='item-tech' key={index}>
                                        {tech}
                                    </div>
                                ))}
                            </div>
                            <div className='title'>{project.judul}</div>
                            <div className='sub'>{project.deskripsi}</div>
                            <div className='button-gradient'>Learn More</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='button-gradient m-auto mt-7'>Show More</div>
        </section>
    )
}
