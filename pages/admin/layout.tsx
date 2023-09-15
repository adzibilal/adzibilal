import '@/app/globals.css'
import './admin.css'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import jwt from 'jsonwebtoken'

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    useEffect(() => {
        // Pengecekan token di sini
        const token = localStorage.getItem('token') // Gantilah dengan kunci yang sesuai

        if (!token) {
            // Jika tidak ada token, arahkan ke halaman /login
            router.push('/login')
        }

        // Memeriksa waktu kadaluarsa token (expire time)
        try {
            //@ts-ignore
            const decodedToken = jwt.decode(token)

            if (decodedToken) {
                const currentTimestamp = Math.floor(Date.now() / 1000)

                if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
                    // Token telah kadaluwarsa, arahkan ke /login
                    router.push('/login')
                }
            }
        } catch (error) {
            console.error('Error decoding token:', error)
            // Handle error decoding token if needed
        }
    }, [])

    // Handler untuk logout
    const handleLogout = () => {
        // Hapus token dari localStorage
        localStorage.removeItem('token')

        // Redirect ke halaman /login
        router.push('/login')
    }
    return (
        <section>
            <div className='navbar bg-base-100'>
                <div className='flex-1'>
                    <Image
                        className='relative dark:invert'
                        src='/images/logo-black.png'
                        alt='Adzi Logo'
                        width={100}
                        height={20}
                        priority
                    />
                </div>
                <div className='flex-none'>
                    <ul className='menu menu-horizontal px-1'>
                        <li>
                            <Link href='/admin/projects'>Projects</Link>
                        </li>
                        <li>
                            <div className='text-error hover:!text-error' onClick={handleLogout}>Logout</div>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </section>
    )
}
