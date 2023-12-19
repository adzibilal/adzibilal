'use client'
import { dashLinks } from '@/constants/dashboard'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const router = usePathname()

    return (
        <div className='fixed left-0 top-0 w-48 bg-zinc-50 h-screen p-5'>
            <div className='text-xl font-bold font-chakra text-center'>ADZIBILAL</div>

            <div className='menu-side mt-2'>
                {dashLinks.map(item => (
                    <Link href={item.path} className=''>
                        <div
                            className={`py-2 mb-2 px-3 rounded-sm ${
                                router === item.path
                                    ? 'bg-zinc-200'
                                    : 'bg-zinc-100'
                            }`}>
                            {item.label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
