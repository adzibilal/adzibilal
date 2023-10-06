'use client'
import { companies } from '@/constants/brands' // Sesuaikan dengan path menuju file brands.ts
import { motion } from 'framer-motion'

export default function LandingCompanies() {
    return (
        <section className='max-container max-lg:!mx-5'>
            <motion.div
                className=''
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>
                <div className='font-chakra text-6xl font-extrabold text-center mb-20 max-sm:text-5xl'>
                    <span className='text-gradient'>Companies</span> I've Worked
                    with
                </div>

                <div className='grid grid-cols-4 gap-10 max-lg:grid-cols-3 max-md:grid-cols-2'>
                    {companies.map(url => (
                        <motion.img
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className='img-com-landing bg-black-primary px-2 py-2 rounded-lg'
                            src={url}
                            alt=''
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
