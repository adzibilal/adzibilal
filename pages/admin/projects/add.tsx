import { NextPage } from 'next'
import AdminLayout from '../layout'
import Link from 'next/link'
import { useState, ChangeEvent, FormEvent } from 'react'
import cloudinary from 'cloudinary'

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

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        console.error(process.env.CLOUD_NAME)
        if (files) {
            const fileArray = Array.from(files)
            const imageUrls: string[] = [] // Create an array to store image URLs

            // Iterate through the selected files and perform Cloudinary upload
            fileArray.forEach(async file => {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('upload_preset', 'ml_default') // Create an upload preset in Cloudinary

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
                        imageUrls.push(data.secure_url)
                        setFormData(prevData => ({
                            ...prevData,
                            image: [...prevData.image, ...imageUrls]
                        }))
                    } else {
                        console.error('Image upload failed.')
                    }
                } catch (error) {
                    console.error('Error:', error)
                }
            })
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                // Redirect or show a success message
            } else {
                console.error('Failed to add project.')
            }
        } catch (error) {
            console.error('Error:', error)
        }
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

                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='judul'>Judul</label>
                        <input
                            type='text'
                            id='judul'
                            name='judul'
                            value={formData.judul}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='deskripsi'>Deskripsi</label>
                        <textarea
                            id='deskripsi'
                            name='deskripsi'
                            value={formData.deskripsi}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='content'>Content</label>
                        <textarea
                            id='content'
                            name='content'
                            value={formData.content}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='teknologi'>Teknologi</label>
                        <input
                            type='text'
                            id='teknologi'
                            name='teknologi'
                            value={formData.teknologi.join(', ')} // Display as a comma-separated string
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='link'>Link</label>
                        <input
                            type='text'
                            id='link'
                            name='link'
                            value={formData.link}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='image'>Image</label>
                        <input
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            multiple // Allow multiple file selection
                            onChange={handleFileUpload}
                        />
                    </div>

                    <button type='submit'>Add Project</button>
                </form>
            </div>
        </AdminLayout>
    )
}

export default Add
