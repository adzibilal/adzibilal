"use client"
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { navbarLinks } from '@/constants/navbarLinks'
import React, { useState } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
            <Image
                className='relative dark:invert'
                src='/images/logo-black.png'
                alt='Adzi Logo'
                width={100}
                height={20}
                priority
            />

            <div className={`menu-desktop ${isMenuOpen ? 'showing' : ''}`}>
                <div className='link-flex'>
                    {navbarLinks.map(route => (
                        <Link key={route.path} href={route.path}>
                            <div className='nav-link'>{route.label}</div>
                        </Link>
                    ))}
                </div>

                <div className='cta-nav'>LET'S TALK</div>
            </div>

            <div className='menu-mobile' onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </nav>
    )
}
