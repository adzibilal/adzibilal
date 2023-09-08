import { brands } from '@/constants/brands' // Sesuaikan dengan path menuju file brands.ts
import Image from 'next/image'

export default function LeadingBrands() {
    return (
        <section className='leading-brands'>
            <h1 className='brands-title'>Trusted by leading brands</h1>
            <div className='carousel gap-10'>
                {brands.map((brand, index) => (
                    <div key={index} className='carousel-item brand-item'>
                        <Image
                            src={brand}
                            alt={`Brand ${brand}`}
                            width={135}
                            height={100}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
