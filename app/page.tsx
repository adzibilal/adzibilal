import Hero from '@/components/Hero'
import LeadingBrands from '@/components/LeadingBrands'
import Image from 'next/image'

export default function Home() {
    return (
        <main className='max-container'>
            <Hero/>
            <LeadingBrands/>
        </main>
    )
}
