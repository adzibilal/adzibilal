'use client'
import { educationData, workExperience } from '@/constants/experienceData'
import { motion } from 'framer-motion'

export default function Experience() {
    return (
        <section className='max-container grid grid-cols-2 gap-10 max-lg:!mx-5 max-lg:grid-cols-1'>
            <div className='experience-box'>
                <motion.div
                    className='title-section mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}>
                    <span className='text-gradient'>Work Experience</span>
                </motion.div>
                {workExperience.map((exp, index) => (
                    <motion.div
                        key={index}
                        className='item-exp'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}>
                        <div className='flex gap-5 items-center'>
                            <img
                                src={exp.imageSrc}
                                alt={exp.company}
                                className='img-exp'
                            />
                            <div className=''>
                                <div className='title'>{exp.company}</div>
                                <div className='prod'>{exp.position}</div>
                            </div>
                        </div>
                        <p>{exp.period}</p>
                    </motion.div>
                ))}
            </div>

            <div className='experience-box'>
                <motion.div
                    className='title-section mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}>
                    <span className='text-gradient'>Education</span>
                </motion.div>
                {educationData.map((edu, index) => (
                    <motion.div
                        key={index}
                        className='item-exp'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}>
                        <div className='flex gap-5 items-center'>
                            <img
                                src={edu.imageSrc}
                                alt={edu.school}
                                className='img-exp'
                            />
                            <div className=''>
                                <div className='title'>{edu.school}</div>
                                <div className='prod'>{edu.major}</div>
                            </div>
                        </div>
                        <p>{edu.period}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
