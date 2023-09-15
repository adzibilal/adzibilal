import { companies } from '@/constants/brands' // Sesuaikan dengan path menuju file brands.ts

export default function LandingCompanies() {
    return (
        <section className='max-container max-lg:!mx-5'>
            <div className='font-chakra text-6xl font-extrabold text-center mb-20 max-sm:text-5xl'>
                <span className='text-gradient'>Companies</span> I've Worked
                with
            </div>

            <div className='grid grid-cols-4 gap-10 max-lg:grid-cols-3 max-md:grid-cols-2'>
                {companies.map(url => (
                    <img className='img-com-landing' src={url} alt='' />
                ))}
            </div>
        </section>
    )
}
