// pages/admin/projects/[projectId].tsx

import { GetServerSideProps, NextPage } from 'next'
import AdminLayout from '../layout'
import { IProject } from '@/models/Project'
import connectToDB from '@/utils/database'
import ProjectModel from '@/models/Project'
import Link from 'next/link'

interface Props {
    project: IProject | null
}

const ProjectDetail: NextPage<Props> = ({ project }) => {
    return (
        <AdminLayout>
            <div className='max-container max-lg:!mx-5'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-4xl'>Project Detail</h1>
                    <div className='text-sm breadcrumbs'>
                        <ul>
                            <li>
                                <Link href='/admin'>Dashboard</Link>
                            </li>
                            <li>
                                <Link href='/admin/projects'>Projects</Link>
                            </li>
                            <li>Project Detail</li>
                        </ul>
                    </div>
                </div>
                {project ? (
                    <div className='grid grid-cols-[1fr_2fr] items-start gap-10 max-md:grid-cols-1'>
                        <div className='card bg-base-100 shadow-xl max-md:w-full'>
                            <figure>
                                <img src={project.image} alt={project.judul} />
                            </figure>
                            <div className='card-body'>
                                <h2 className='card-title'>{project.judul}</h2>
                                <p>{project.deskripsi}</p>
                                <div className='card-actions justify-start mt-3'>
                                    {project.teknologi.map((tech, index) => (
                                        <div
                                            className='badge badge-outline'
                                            key={index}>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text'>
                                        Judul Project
                                    </span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='Type here'
                                    className='input input-bordered w-full'
                                    value={project.judul}
                                />
                            </div>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text'>
                                        Deskripsi
                                    </span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='Type here'
                                    className='input input-bordered w-full'
                                    value={project.deskripsi}
                                />
                            </div>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text'>Gambar</span>
                                </label>
                                <input
                                    type='file'
                                    className='file-input file-input-bordered w-full'
                                />
                            </div>

                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Content</span>
                                </label>
                                <textarea
                                    className='textarea textarea-bordered h-24'
                                    placeholder='Bio'>
                                    {project.content}
                                </textarea>
                            </div>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text'>
                                        Teknologi
                                    </span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='Type here'
                                    className='input input-bordered w-full'
                                    value={project.teknologi.join(', ')}
                                />
                            </div>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text'>Link</span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='Type here'
                                    className='input input-bordered w-full'
                                    value={project.link}
                                />
                            </div>

                            <div className='flex gap-3 mt-5'>
                                <button className='btn btn-success'>
                                    Simpan
                                </button>
                                <button className='btn btn-error'>
                                    Hapus Project
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Project not found</p>
                )}
            </div>
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
    params
}) => {
    await connectToDB()

    if (params?.projectId) {
        const project = await ProjectModel.findById(params.projectId).exec()

        // Mengonversi _id (ObjectId) menjadi string
        const serializedProject = project ? project.toObject() : null
        if (serializedProject) {
            serializedProject._id = serializedProject._id.toString()
        }

        return {
            props: {
                project: serializedProject
            }
        }
    }

    return {
        props: {
            project: null
        }
    }
}

export default ProjectDetail
