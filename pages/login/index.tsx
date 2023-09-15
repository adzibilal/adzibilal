import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import '@/app/globals.css'
import LoadingOverlay from '@/components/LoadingOverlay'

interface Props {}

const Index: NextPage<Props> = ({}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        // Cek apakah data sesi sudah ada di localStorage
        const token = localStorage.getItem('token')
        if (token) {
            router.push('/admin') // Redirect ke halaman '/admin' jika token sudah ada
        }
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault() // Mencegah pengiriman formulir standar
        setIsLoading(true)

        // Simpan kode autentikasi di sini, misalnya menggunakan fetch atau axios

        // Misalnya, Anda dapat menggunakan fetch
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            if (response.ok) {
                // Autentikasi berhasil, arahkan pengguna ke halaman selanjutnya
                const data = await response.json()
                localStorage.setItem('token', data.token)
                router.push('/admin')
            } else {
                const data = await response.json()
                setError(data.error || 'Terjadi kesalahan saat login')
            }
        } catch (error) {
            setError('Terjadi kesalahan saat login')
        }

        setIsLoading(false)
    }

    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='w-full max-w-[500px] px-5'>
                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Username</span>
                            </label>
                            <input
                                type='text'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder='Username'
                                className='input input-bordered w-full'
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Username</span>
                            </label>
                            <input
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Password'
                                className='input input-bordered w-full'
                            />
                        </div>
                    </div>
                   
                    <button className='btn w-full' type='submit' disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className='text-error mt-3 text-center'>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default Index
