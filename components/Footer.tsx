import { navbarLinks } from '@/constants/navbarLinks'
import Image from 'next/image'
import Link from 'next/link'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTiktok
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
    return (
        <section className='max-container pt-[30px] pb-[50px] border-t border-base-content/50'>
            <div className='flex justify-between items-center'>
                <img
                    className='relative dark:invert h-[20px]'
                    src='/images/logo-black.png'
                    alt=''
                />

                <div className='link-flex'>
                    {navbarLinks.map(route => (
                        <Link key={route.path} href={route.path}>
                            <div className='nav-link'>{route.label}</div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='flex justify-between items-center mt-[40px]'>
                <p>&copy; Adzi Bilal M H 2023</p>

                <div className='flex gap-3'>
                    <div className='item-social'>
                        <Link href='/'>
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </div>
                    <div className='item-social'>
                        <Link href='/'>
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                    </div>
                    <div className='item-social'>
                        <Link href='/'>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                    </div>
                    <div className='item-social'>
                        <Link href='/'>
                            <FontAwesomeIcon icon={faTiktok} />
                        </Link>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
