import { NextPage } from 'next'
import AdminLayout from '../layout'
import Link from 'next/link'
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import cloudinary from 'cloudinary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

// Import 'cloudinary' only in a server-side context
if (typeof window === 'undefined') {
    const cloudinary = require('cloudinary')
    cloudinary.v2.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    })
}

interface FormData {
    judul: string
    deskripsi: string
    image: string[] // Updated to an array of strings
    content: string
    teknologi: string[] // Updated to an array of strings
    link: string
}

interface Props {}

const Add: NextPage<Props> = ({}) => {
    const router = useRouter()

    const [formData, setFormData] = useState<FormData>({
        judul: '',
        deskripsi: '',
        image: [], // Initialize as an empty array
        content: '',
        teknologi: [], // Initialize as an empty array
        link: ''
    })

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            // Upload semua file
            const uploadPromises = selectedFiles.map(async file => {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('upload_preset', 'ml_default') // Buat upload preset di Cloudinary

                try {
                    const response = await fetch(
                        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                        {
                            method: 'POST',
                            body: formData
                        }
                    )

                    if (response.ok) {
                        const data = await response.json()
                        console.error(data)
                        return data.secure_url // Mengembalikan secure URL
                    } else {
                        console.error('Image upload failed.')
                        return null // Mengembalikan null jika gagal
                    }
                } catch (error) {
                    console.error('Error:', error)
                    return null // Mengembalikan null jika ada kesalahan
                }
            })

            // Menunggu sampai semua file terupload
            const uploadedUrls = await Promise.all(uploadPromises)

            // Cek apakah ada yang gagal diunggah
            if (uploadedUrls.includes(null)) {
                console.error('Gagal mengunggah beberapa gambar.')
                return // Hentikan jika ada yang gagal
            }

            // Update formData dengan URL gambar yang berhasil diunggah
            const updatedFormData = {
                ...formData,
                image: uploadedUrls
            }

            // Kirim data form ke server
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData) // Pastikan Anda mengirim formData yang sudah diperbarui
            })

            if (response.ok) {
                // Redirect atau tampilkan pesan sukses
                console.error('Sukses')
                router.push('/admin/projects')
            } else {
                console.error('Gagal menambahkan proyek.')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files.length > 0) {
            const newImages: string[] = []
            const newFiles: File[] = []

            for (let i = 0; i < files.length; i++) {
                const imageUrl = URL.createObjectURL(files[i])
                newImages.push(imageUrl)
                newFiles.push(files[i])
            }

            setSelectedImages(prevImages => [...prevImages, ...newImages])
            setSelectedFiles(prevFiles => [...prevFiles, ...newFiles])
        }
    }

    const handleDeleteImage = (index: number) => {
        const updatedImages = [...selectedImages]
        const updatedFiles = [...selectedFiles]

        updatedImages.splice(index, 1)
        updatedFiles.splice(index, 1)

        setSelectedImages(updatedImages)
        setSelectedFiles(updatedFiles)
    }

    const handleAddImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleTechInputChange: React.ChangeEventHandler<
        HTMLInputElement
    > = e => {
        const { name, value } = e.target
        if (name) {
            const index = parseInt(name, 10) // Konversi nama input menjadi indeks
            setFormData(prevEditedProject => {
                const updatedTech = [...prevEditedProject.teknologi]
                updatedTech[index] = value
                return { ...prevEditedProject, teknologi: updatedTech }
            })
        }
    }

    const addTechInput = () => {
        setFormData(prevEditedProject => ({
            ...prevEditedProject,
            teknologi: [...prevEditedProject.teknologi, ''] // Menambahkan input kosong
        }))
    }
    return (
        <AdminLayout>
            <div className='max-container max-lg:!mx-5'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-4xl'>Add Project</h1>
                    <div className='text-sm breadcrumbs'>
                        <ul>
                            <li>
                                <Link href='/admin'>Dashboard</Link>
                            </li>
                            <li>
                                <Link href='/admin/projects'>Projects</Link>
                            </li>
                            <li>Add Project</li>
                        </ul>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-10 max-md:grid-cols-1'>
                    <div className=''>
                        <div className='preview-box grid grid-cols-2 gap-3'>
                            {selectedImages.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    className='image-preview bg-black-secondary p-3 rounded-md'>
                                    <img
                                        src={imageUrl}
                                        alt={`Preview ${index}`}
                                        className='aspect-video object-cover rounded-md'
                                    />
                                    <button
                                        onClick={() => handleDeleteImage(index)}
                                        className='btn btn-sm btn-error mt-3'>
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleAddImage} className='btn mt-5'>
                            Tambah Gambar
                        </button>
                        <input
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            className='hidden'
                            ref={fileInputRef}
                            multiple // Allow multiple file selection
                            onChange={handleFileChange}
                        />
                    </div>
                    <form>
                        <div className='mb-4'>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text'>Judul</span>
                                </label>
                                <input
                                    type='text'
                                    id='judul'
                                    name='judul'
                                    value={formData.judul}
                                    onChange={handleInputChange}
                                    placeholder='Ketikan Judul'
                                    className='input input-bordered w-full'
                                />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text'>
                                        Deskripsi
                                    </span>
                                </label>
                                <input
                                    type='text'
                                    id='deskripsi'
                                    name='deskripsi'
                                    value={formData.deskripsi}
                                    onChange={handleInputChange}
                                    placeholder='Ketikan Deskripsi Singkat'
                                    className='input input-bordered w-full'
                                />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text'>Konten</span>
                                </label>
                                <textarea
                                    id='content'
                                    name='content'
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className='input input-bordered w-full pt-[10px] min-h-[150px]'
                                    placeholder='Ketikan Konten Project'
                                />
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>
                                        Teknologi
                                    </span>
                                </label>
                                <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-3'>
                                    {formData.teknologi.map((tech, index) => (
                                        <input
                                            key={index}
                                            type='text'
                                            placeholder='Type here'
                                            className='input input-bordered w-full mb-3'
                                            name={index.toString()} // Nama input adalah indeks
                                            value={tech}
                                            onChange={handleTechInputChange}
                                        />
                                    ))}
                                </div>
                                <div className='btn' onClick={addTechInput}>
                                    Tambah Teknologi
                                </div>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div className='form-control w-full'>
                                <label className='label'>
                                    <span className='label-text'>Link</span>
                                </label>
                                <input
                                    type='text'
                                    id='link'
                                    name='link'
                                    value={formData.link}
                                    onChange={handleInputChange}
                                    placeholder='Ketikan Link Project'
                                    className='input input-bordered w-full'
                                />
                            </div>
                        </div>

                        <button onClick={handleSubmit} className='btn'>
                            Add Project
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Add
