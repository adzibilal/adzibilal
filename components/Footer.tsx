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
import { SOCIAL_MEDIA_URLS } from '@/constants/socialMediaConstants'

export default function Footer() {
    return (
        <section className='max-container max-lg:!mx-5 pt-[30px] pb-[50px] border-t border-base-content/50'>
            <div className='flex justify-between items-center max-md:flex-col'>
                <img
                    className='relative dark:invert h-[20px]'
                    src='/images/logo-black.png'
                    alt=''
                />

                <div className='link-flex max-sm:hidden'>
                    {navbarLinks.map(route => (
                        <Link key={route.path} href={route.path}>
                            <div className='nav-link'>{route.label}</div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='flex justify-between items-center mt-[40px] max-md:flex-col max-md: gap-8'>
                <p>&copy; Adzi Bilal M H 2023</p>

                <div className='flex gap-3'>
                    <div className='item-social'>
                        <Link
                            href={SOCIAL_MEDIA_URLS.instagram}
                            target='_blank'>
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </div>
                    <div className='item-social'>
                        <Link href={SOCIAL_MEDIA_URLS.facebook} target='_blank'>
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                    </div>
                    <div className='item-social'>
                        <Link href={SOCIAL_MEDIA_URLS.linkedin} target='_blank'>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                    </div>
                    <div className='item-social'>
                        <Link href={SOCIAL_MEDIA_URLS.linkedin} target='_blank'>
                            <FontAwesomeIcon icon={faTiktok} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
