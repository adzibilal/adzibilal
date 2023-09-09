import Divider from '@/components/Divider'
import Experience from '@/components/Experience'
import Hero from '@/components/Hero'
import LandingCompanies from '@/components/LandingCompanies'
import LandingProjects from '@/components/LandingProjects'
import LeadingBrands from '@/components/LeadingBrands'
import Image from 'next/image'

export default function Home() {
    return (
        <main className='bg-black-primary'>
            <Hero />
            <LeadingBrands />
            <LandingProjects />
            <Divider />
            <br />
            <br />
            <br />
            <Experience />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <LandingCompanies />
            <br />
            <br />
            <br />
        </main>
    )
}
