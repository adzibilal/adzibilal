import { SOCIAL_MEDIA_URLS } from '@/constants/socialMediaConstants'
import { technologies } from '@/constants/technologies'
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTiktok
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const About: NextPage<Props> = ({}) => {
    return (
        <div className='max-container max-lg:!mx-5'>
            <div className='title-section mt-8'>
                About <br />
                <span className='text-gradient'>My Portfolio</span>
            </div>
            <div className='my-8'>
                Welcome to my personal portfolio website! I'm thrilled to have
                you here and share a bit about myself and the technology behind
                this showcase. <br />
                <br />I am a passionate web developer who enjoys crafting
                digital experiences that are both visually appealing and highly
                functional. My expertise spans a wide range of technologies, and
                I take pride in staying up-to-date with the latest trends in web
                development. This portfolio is a testament to my skills and
                capabilities. It has been meticulously crafted using the
                following technologies:
            </div>

            <div className='grid grid-cols-3 gap-5 max-sm:grid-cols-1 max-md:grid-cols-2 '>
                {technologies.map((tech, index) => (
                    <div
                        key={index}
                        className='tech-about relative mt-[30px] bg-white-primary dark:bg-black-secondary p-5 rounded-md'>
                        <div className='ic mt-[-50px] w-[90px] h-[90px] p-1 bg-gradient-to-r from-blue to-purple rounded-full '>
                            <img
                                src={tech.imageUrl}
                                alt=''
                                className='rounded-full object-cover w-full h-full'
                            />
                        </div>
                        <div className='text-gradient mt-3 text-3xl font-semibold font-chakra'>
                            {tech.name}
                        </div>
                        <p className='text-base-content dark:text-base-100 my-3 '>
                            {tech.description}
                        </p>
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-3 divide-x my-20 max-md:grid-cols-1 max-md:divide-x-0 '>
                <div className='item-stat'>
                    <h1 className='text-gradient text-6xl font-chakra font-extrabold'>
                        50+
                    </h1>
                    <p>Projects Done</p>
                </div>
                <div className='item-stat'>
                    <h1 className='text-gradient text-6xl font-chakra font-extrabold'>
                        4+
                    </h1>
                    <p>Years of Experience in Frontend Developer</p>
                </div>
                <div className='item-stat'>
                    <h1 className='text-gradient text-6xl font-chakra font-extrabold'>
                        100%
                    </h1>
                    <p>Client Satisfaction</p>
                </div>
            </div>

            <div className='about-container grid grid-cols-2 w-[70%] mx-auto items-center max-md:grid-cols-1 max-md:w-full max-md:p-3 mb-20'>
                <img
                    src='/images/adzi.jpg'
                    alt=''
                    className='max-md:h-[300px] max-md:w-full object-cover object-top'
                />
                <div className='bg-white-secondary p-5 ml-[-100px] max-md:ml-0'>
                    <h1 className='text-gradient font-extrabold text-4xl font-chakra mb-4'>
                        Follow me
                    </h1>
                    <p className='text-black-primary'>
                        I'm Adzi Bilal,a Frontend Developer who passionate about
                        crafting innovative and user-centric web experiences for
                        global audiences.
                    </p>
                    <div className='flex gap-3 mt-[20px]'>
                        <div className='item-social-about'>
                            <Link
                                href={SOCIAL_MEDIA_URLS.instagram}
                                target='_blank'>
                                <FontAwesomeIcon icon={faInstagram} />
                            </Link>
                        </div>
                        <div className='item-social-about'>
                            <Link
                                href={SOCIAL_MEDIA_URLS.facebook}
                                target='_blank'>
                                <FontAwesomeIcon icon={faFacebook} />
                            </Link>
                        </div>
                        <div className='item-social-about'>
                            <Link
                                href={SOCIAL_MEDIA_URLS.linkedin}
                                target='_blank'>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </Link>
                        </div>
                        <div className='item-social-about'>
                            <Link
                                href={SOCIAL_MEDIA_URLS.linkedin}
                                target='_blank'>
                                <FontAwesomeIcon icon={faTiktok} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
