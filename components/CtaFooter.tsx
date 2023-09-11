import { NextPage } from 'next'

interface Props {}

const CtaFooter: NextPage<Props> = ({}) => {
    return (
        <div className='max-container max-lg:!mx-5'>
            <div className="bg-gradient-to-r from-blue to-purple w-full min-h-16 rounded-3xl flex items-center justify-center flex-col gap-10 py-[100px]">
                <h1 className='font-chakra text-6xl font-extrabold text-center max-sm:text-4xl'>Intersted in <br /> Working with me?</h1>
                <div className="px-6 py-3 text-black-primary cursor-pointer bg-white-primary w-max !rounded-full hover:scale-105">GET IN TOUCH</div>
            </div>
        </div>
    )
}

export default CtaFooter
