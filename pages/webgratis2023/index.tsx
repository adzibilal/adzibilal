import { NextPage } from 'next'
import { useState, useEffect } from 'react' // Import useState dan useEffect
import '@/app/globals.css'
import LoadingOverlay from '@/components/LoadingOverlay'
import { useRouter } from 'next/router'

interface Props {}

const Index: NextPage<Props> = ({}) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        noWhatsApp: '',
        namaBisnis: '',
        jenisWebsite: 'Web Portofolio'
    })

    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/pendaftaran', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.status === 201) {
                // Berhasil membuat pendaftaran
                // Tambahkan logika lain jika diperlukan
                console.log('Pendaftaran berhasil')
                setLoading(false)
                //@ts-ignore
                document.getElementById('my_modal_1').showModal()
                setTimeout(() => router.push('/'), 1500)
            } else {
                setLoading(false)

                // Penanganan kesalahan lainnya
                console.error('Gagal membuat pendaftaran')
            }
        } catch (error) {
            setLoading(false)
            console.error('Gagal membuat pendaftaran', error)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className='links w-screen min-h-screen bg-black-primary px-5'>
            {loading && <LoadingOverlay />}

            <dialog id='my_modal_1' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg'>Pendaftaran Berhasil!</h3>
                    <p className='py-4'>
                        Pendaftaran sudah selesai, Anda akan saya hubungi untuk
                        detail lebih lanjut.
                    </p>
                </div>
            </dialog>
            <div className='max-container flex items-center justify-center min-h-screen flex-col'>
                <h1 className='hero-title !text-3xl mb-5 max-sm:!text-2xl'>
                    Form Pendaftaran <br />
                    <span>Event Pembuatan Web Gratis!</span>
                </h1>
                <div className='box-links w-full max-w-[500px]'>
                    <div className='form-control w-full'>
                        <label className='label'>
                            <span className='label-text'>Nama</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Masukan Nama Anda'
                            className='input input-bordered w-full'
                            name='nama'
                            value={formData.nama}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-control w-full'>
                        <label className='label'>
                            <span className='label-text'>Email</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Masukan Email Anda'
                            className='input input-bordered w-full'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-control w-full'>
                        <label className='label'>
                            <span className='label-text'>No WhatsApp</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Masukan No WhatsApp Anda'
                            className='input input-bordered w-full'
                            name='noWhatsApp'
                            value={formData.noWhatsApp}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-control w-full'>
                        <label className='label'>
                            <span className='label-text'>
                                Nama Bisnis <small>(Optional)</small>
                            </span>
                        </label>
                        <input
                            type='text'
                            placeholder='Masukan Nama Bisnis Anda'
                            className='input input-bordered w-full'
                            name='namaBisnis'
                            value={formData.namaBisnis}
                            onChange={handleChange}
                        />
                    </div>

                    <label className='label'>
                        <span className='label-text'>Jenis Website</span>
                    </label>
                    <div className='grid grid-cols-2 px-2 justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <input
                                type='radio'
                                name='jenisWebsite'
                                className='radio'
                                value='Web Portofolio'
                                checked={
                                    formData.jenisWebsite === 'Web Portofolio'
                                }
                                onChange={handleChange}
                            />
                            <p>Web Portofolio</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='radio'
                                name='jenisWebsite'
                                className='radio'
                                value='Web Landing Page'
                                checked={
                                    formData.jenisWebsite === 'Web Landing Page'
                                }
                                onChange={handleChange}
                            />
                            <p>Web Landing Page</p>
                        </div>
                    </div>
                    <div
                        className='btn btn-success w-full mt-7'
                        onClick={handleSubmit}>
                        DAFTAR SEKARANG
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
