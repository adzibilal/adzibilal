'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {CgSearch} from 'react-icons/cg'
import { linksSpill } from '@/constants/linksSpill'

const Page = () => {
    return (
        <div>
          <div className="sticky top-0 bg-white-secondary pt-5">
            <motion.h1
                className='spill-title'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}>
                <span>Daftar Link Spill Item</span> <br /> Gas Checkout !
            </motion.h1>

            <div className="flex justify-between bg-gray-light/20 p-3 items-center mt-5 gap-5">
              <input type="text" className='bg-transparent focus:outline-none w-full' placeholder='Cari item disini...'/>
              <div className="text-xl cursor-pointer">
                <CgSearch/>
              </div>
            </div>
          </div>
          <div className="w-full mt-5 grid grid-cols-2 gap-3">
            {linksSpill.map((item, index) => (
              <div className="" key={index}>
                <img className='aspect-square object-cover w-full' src={item.imageSrc} alt=""/>
                <div className="font-semibold mb-3 mt-1">
                {item.name}
                </div>
                <Link href={item.link} target='_blank'>
                  <div className="bg-gradient-to-b from-blue to-purple text-center text-white-secondary py-2">Lihat</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
    )
}

export default Page
