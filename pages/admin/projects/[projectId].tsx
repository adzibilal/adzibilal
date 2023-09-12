// pages/admin/projects/[projectId].tsx

import { GetServerSideProps, NextPage } from 'next'
import AdminLayout from '../layout'
import { IProject } from '@/models/Project'
import connectToDB from '@/utils/database'
import ProjectModel from '@/models/Project'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Props {
    project: IProject | null
}

const ProjectDetail: NextPage<Props> = ({ project }) => {
    const [editedProject, setEditedProject] = useState({
        judul: project?.judul || '',
        deskripsi: project?.deskripsi || '',
        image: project?.image || [], // Anda mungkin perlu menangani upload gambar
        content: project?.content || '',
        teknologi: project?.teknologi || [],
        link: project?.link || ''
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        // console.error(`Field ${name} changed to:`, value)

        setEditedProject(prevEditedProject => ({
            ...prevEditedProject,
            [name]: value
        }))
    }

    const handleTechInputChange: React.ChangeEventHandler<
        HTMLInputElement
    > = e => {
        const { name, value } = e.target
        if (name) {
            const index = parseInt(name, 10) // Konversi nama input menjadi indeks
            setEditedProject(prevEditedProject => {
                const updatedTech = [...prevEditedProject.teknologi]
                updatedTech[index] = value
                return { ...prevEditedProject, teknologi: updatedTech }
            })
        }
    }

    const addTechInput = () => {
        setEditedProject(prevEditedProject => ({
            ...prevEditedProject,
            teknologi: [...prevEditedProject.teknologi, ''] // Menambahkan input kosong
        }))
    }

    const router = useRouter()
    const handleEdit = async () => {
        try {
            const response = await fetch('/api/projects', {
                method: 'PUT', // Anda dapat menggunakan POST atau PUT, tergantung pada endpoint server Anda
                body: JSON.stringify({ id: project?._id, ...editedProject }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                // Redirect ke halaman proyek setelah penyimpanan berhasil
                router.push(`/admin/projects/${project?._id}`)
            } else {
                // Tampilkan pesan kesalahan jika penyimpanan gagal
                console.error('Gagal menyimpan perubahan proyek')
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/projects', {
                method: 'DELETE',
                body: JSON.stringify({ id: project?._id }), // Mengirim id proyek dalam body
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                // Redirect ke halaman proyek setelah penghapusan
                router.push('/admin/projects')
            } else {
                // Tampilkan pesan kesalahan jika penghapusan gagal
                console.error('Gagal menghapus proyek')
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error)
        }
    }

    const openModalDelete = () => {
        // @ts-ignore
        document.getElementById('my_modal_2')?.showModal()
    }

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
                        <div className='card card-compact w-full bg-base-100 shadow-xl p-3'>
                            <div className='carousel w-full'>
                                {project.image.map((url, index) => (
                                    <div
                                        id={`${index}`}
                                        key={index}
                                        className='carousel-item w-full'>
                                        <img src={url} className='w-full rounded-md' />
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-center w-full py-2 gap-2 mt-2'>
                                {project.image.map((url, index) => (
                                    <a href={`#${index}`} className='btn btn-sm' key={index}>
                                        {index + 1}
                                    </a>
                                ))}
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
                                    name='judul'
                                    value={editedProject.judul}
                                    onChange={handleInputChange}
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
                                    name='deskripsi'
                                    value={editedProject.deskripsi}
                                    onChange={handleInputChange}
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
                                    placeholder='Type here'
                                    name='content' // Tambahkan name
                                    value={editedProject.content} // Gunakan nilai dari editedProject
                                    onChange={handleInputChange} // Handler untuk mengubah nilai
                                />
                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>
                                        Teknologi
                                    </span>
                                </label>
                                <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-3'>
                                    {editedProject.teknologi.map(
                                        (tech, index) => (
                                            <input
                                                key={index}
                                                type='text'
                                                placeholder='Type here'
                                                className='input input-bordered w-full mb-3'
                                                name={index.toString()} // Nama input adalah indeks
                                                value={tech}
                                                onChange={handleTechInputChange}
                                            />
                                        )
                                    )}
                                </div>
                                <button className='btn' onClick={addTechInput}>
                                    Tambah Teknologi
                                </button>
                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Link</span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='Type here'
                                    className='input input-bordered w-full'
                                    name='link' // Tambahkan name
                                    value={editedProject.link} // Gunakan nilai dari editedProject
                                    onChange={handleInputChange} // Handler untuk mengubah nilai
                                />
                            </div>

                            <div className='flex gap-3 mt-5'>
                                <button
                                    className='btn btn-success'
                                    onClick={handleEdit}>
                                    Edit
                                </button>
                                <button
                                    className='btn btn-error'
                                    onClick={openModalDelete}>
                                    Hapus Project
                                </button>
                                <dialog id='my_modal_2' className='modal'>
                                    <div className='modal-box'>
                                        <h3 className='font-bold text-lg'>
                                            Anda Yakin Ingin Menghapus Project?
                                        </h3>
                                        <p className='py-4 text-base-content'>
                                            Press ESC key or click outside to
                                            close
                                        </p>
                                        <div className='modal-action'>
                                            <form method='dialog '>
                                                <div className='flex gap-2'>
                                                    <button className='btn'>
                                                        Batal
                                                    </button>
                                                    <div
                                                        className='btn btn-error'
                                                        onClick={handleDelete}>
                                                        Hapus
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <form
                                        method='dialog'
                                        className='modal-backdrop'>
                                        <button>close</button>
                                    </form>
                                </dialog>
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
