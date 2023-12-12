'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CgSearch } from 'react-icons/cg'
import { linksSpill } from '@/constants/linksSpill'
import { useState } from 'react'

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const filteredLinks = linksSpill.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return (
        <div>
            <div className='sticky top-0 bg-white-secondary pt-5'>
                <motion.h1
                    className='spill-title'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}>
                    <span>Daftar Link Spill Item</span> <br /> Gas Checkout !
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3}}
                    className='flex justify-between bg-gray-light/20 p-3 items-center mt-5 gap-5'>
                    <input
                        type='text'
                        className='bg-transparent focus:outline-none w-full'
                        placeholder='Cari item disini...'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <div className='text-xl cursor-pointer'>
                        <CgSearch />
                    </div>
                </motion.div>
            </div>
            <div className='w-full mt-5 grid grid-cols-2 gap-3'>
                {filteredLinks.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className=''
                        key={index}>
                        <img
                            className='aspect-square object-cover w-full'
                            src={item.imageSrc}
                            alt=''
                        />
                        <div className='font-semibold mb-3 text-sm line-clamp-2 mt-1'>
                            {item.name}
                        </div>
                        <Link href={item.link} target='_blank'>
                            <div className='bg-gradient-to-b from-blue to-purple text-center text-white-secondary py-2'>
                                Lihat
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Page
