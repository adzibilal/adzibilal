import '@/app/globals.css'
import './admin.css'
import Link from 'next/link'
import Image from 'next/image'
export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
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
                            <details>
                                <summary>Parent</summary>
                                <ul className='p-2 bg-base-100'>
                                    <li>
                                        <a>Link 1</a>
                                    </li>
                                    <li>
                                        <a>Link 2</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </section>
    )
}
