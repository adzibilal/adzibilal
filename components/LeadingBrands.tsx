import { brands } from '@/constants/brands' // Sesuaikan dengan path menuju file brands.ts
import Image from 'next/image'

export default function LeadingBrands() {
    return (
        <section className='leading-brands'>
            <h1 className='brands-title max-sm:text-center'>Trusted by leading brands</h1>
            <div className='carousel gap-10'>
                {brands.map((brand, index) => (
                    <div key={index} className='carousel-item brand-item'>
                        <Image
                            src={brand}
                            alt={`Brand ${brand}`}
                            width={135}
                            height={68}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
