'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBrush,
    faCode,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
export default function Divider() {
    return (
        <motion.section
            className='relative h-[200px] overflow-hidden'
            initial={{ opacity: 0, scale: 1.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}>
            <div className='bg-gradient-to-r from-blue to-purple w-full h-[100px] absolute rotate-1 scale-110 top-8 max-sm:h-[65px]'></div>
            <div className='bg-white-primary shadow-lg w-full h-[100px] absolute -rotate-1 scale-110 top-8 flex items-center justify-center gap-10 max-sm:h-[60px] max-sm:gap-5'>
                <p className='text-divider'>DESIGN</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faBrush} />
                </p>
                <p className='text-divider'>DEVELOP</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faCode} />
                </p>
                <p className='text-divider'>DISCOVER</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </p>
                <p className='text-divider'>DESIGN</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faBrush} />
                </p>
                <p className='text-divider'>DEVELOP</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faCode} />
                </p>
                <p className='text-divider'>DISCOVER</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </p>
                <p className='text-divider'>DESIGN</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faBrush} />
                </p>
                <p className='text-divider'>DEVELOP</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faCode} />
                </p>
                <p className='text-divider'>DISCOVER</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </p>
                <p className='text-divider'>DESIGN</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faBrush} />
                </p>
                <p className='text-divider'>DEVELOP</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faCode} />
                </p>
                <p className='text-divider'>DISCOVER</p>
                <p className='text-divider'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </p>
            </div>
        </motion.section>
    )
}
