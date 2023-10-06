'use client'
import { brands } from '@/constants/brands' // Sesuaikan dengan path menuju file brands.ts
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LeadingBrands() {
    return (
        <motion.section
            className='leading-brands'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
            <h1 className='brands-title max-sm:text-center'>
                Trusted by leading brands
            </h1>
            <div className='carousel gap-10'>
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        className='carousel-item brand-item bg-black-primary px-2 py-2 rounded-lg'>
                        <Image
                            src={brand}
                            alt={`Brand ${brand}`}
                            width={135}
                            height={68}
                        />
                    </div>
                ))}
            </div>
        </motion.section>
    )
}
