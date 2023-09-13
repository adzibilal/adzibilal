import { NextPage } from 'next'
import '@/app/globals.css'
import { SOCIAL_MEDIA_URLS } from '@/constants/socialMediaConstants'
import Link from 'next/link'
import Image from 'next/image'

interface Props {}

const Index: NextPage<Props> = ({}) => {
    return (
        <div className='links w-screen min-h-screen bg-black-primary'>
            <div className='max-container flex items-center justify-center min-h-screen flex-col'>
                <Image
                    className='rounded-full'
                    src='/images/ava-adzi.png'
                    alt='Adzi Logo'
                    width={100}
                    height={20}
                    priority
                />

                <h1 className='hero-title !text-xl'>
                    <span>Hello, I'm Adzi Bilal M H,</span> <br /> Frontend
                    Developer based in Indonesia
                </h1>
                <div className='box-links w-full max-w-[500px] bg-white-secondary p-3 mt-5'>
                    <Link href='/'>
                        <div className='item-links text-black-primary'>
                            Web Portofolio
                        </div>
                    </Link>
                </div>

                <div className='flex justify-between items-center mt-[20px] flex-col max-md: gap-8'>
                    <p>&copy; Adzi Bilal M H 2023</p>

                    <div className='flex gap-3'>
                        <div className='item-social !text-white-secondary'>
                            <Link
                                href={SOCIAL_MEDIA_URLS.instagram}
                                target='_blank'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    height='1em'
                                    viewBox='0 0 448 512'>
                                    <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
                                </svg>
                            </Link>
                        </div>
                        <div className='item-social !text-white-secondary'>
                            <Link
                                href={SOCIAL_MEDIA_URLS.facebook}
                                target='_blank'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    height='1em'
                                    viewBox='0 0 320 512'>
                                    <path d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z' />
                                </svg>
                            </Link>
                        </div>
                        <div className='item-social !text-white-secondary'>
                            <Link
                                href={SOCIAL_MEDIA_URLS.linkedin}
                                target='_blank'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    height='1em'
                                    viewBox='0 0 448 512'>
                                    <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z' />
                                </svg>
                            </Link>
                        </div>
                        <div className='item-social !text-white-secondary'>
                            <Link
                                href={SOCIAL_MEDIA_URLS.linkedin}
                                target='_blank'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    height='1em'
                                    viewBox='0 0 448 512'>
                                    <path d='M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z' />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
