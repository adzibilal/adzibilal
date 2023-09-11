import { faFacebook, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const About: NextPage<Props> = ({}) => {
    return (
        <div className='max-container'>
          
            <div className="grid grid-cols-3 divide-x my-20 max-md:grid-cols-1 max-md:divide-x-0 ">
              <div className="item-stat">
                <h1 className='text-gradient text-5xl font-chakra font-extrabold'>
                  4+
                </h1>
                <p>Years of Experience in Frontend Developer</p>
              </div>
              <div className="item-stat">
                <h1 className='text-gradient text-5xl font-chakra font-extrabold'>
                  4+
                </h1>
                <p>Years of Experience in Frontend Developer</p>
              </div>
              <div className="item-stat">
                <h1 className='text-gradient text-5xl font-chakra font-extrabold'>
                  4+
                </h1>
                <p>Years of Experience in Frontend Developer</p>
              </div>
            </div>

            <div className='about-container grid grid-cols-2 w-[70%] mx-auto items-center max-md:grid-cols-1 max-md:w-full max-md:p-3 mb-20'>
                <img src='/images/adzi.jpg' alt='' className='max-md:h-[300px] max-md:w-full object-cover object-top'/>
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
                            <Link href='/'>
                                <FontAwesomeIcon icon={faInstagram} />
                            </Link>
                        </div>
                        <div className='item-social-about'>
                            <Link href='/'>
                                <FontAwesomeIcon icon={faFacebook} />
                            </Link>
                        </div>
                        <div className='item-social-about'>
                            <Link href='/'>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </Link>
                        </div>
                        <div className='item-social-about'>
                            <Link href='/'>
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
