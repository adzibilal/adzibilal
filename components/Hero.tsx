'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section className='max-container grid grid-cols-[1.5fr_1fr] gap-2 items-center max-md:flex max-md:flex-col-reverse max-md:p-5 sm:h-[80vh]'>
            <div className=''>
                <motion.h1
                    className='hero-title sm:!text-left'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}>
                    <span>Hello, I'm Adzi Bilal M H,</span> <br /> Frontend
                    Developer based in Indonesia
                </motion.h1>
                <motion.p
                    className='sub-hero sm:!text-left sm:w-full'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}>
                    As a dedicated Frontend Developer, I'm passionate about
                    crafting innovative and user-centric web experiences for
                    global audiences.
                </motion.p>

                <motion.div
                    className='flex gap-5 mt-5 max-sm:flex-col'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}>
                    <Link
                        href='https://wa.link/e051oz'
                        target='_blank'
                        className='button button-lg !rounded-full'>
                        GET IN TOUCH
                    </Link>
                    <Link
                        href='/projects'
                        className='button-outline button-lg !rounded-full'>
                        VIEW ALL WORKS
                    </Link>
                </motion.div>
            </div>
            <motion.div
                className=''
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>
                <Image
                    className=''
                    src='/images/ava-hero.png'
                    alt='Adzi Logo'
                    width={1000}
                    height={1000}
                    priority
                />
            </motion.div>
        </section>
    )
}
