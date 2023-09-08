import Image from "next/image";

export default function Hero () {
    return (
        <section className="hero">
            <Image
                    className='rounded-full'
                    src='/images/ava-adzi.png'
                    alt='Adzi Logo'
                    width={200}
                    height={20}
                    priority
                />

            <h1 className="hero-title"><span>Hello, I'm Adzi Bilal M H,</span> <br /> Frontend Developer based in Indonesia</h1>
            <p className="sub-hero">"As a dedicated Frontend Developer, I'm passionate about crafting innovative and user-centric web experiences for global audiences."</p>

            <div className="flex gap-5 mt-5 max-sm:flex-col">
                <div className="button button-lg !rounded-full">GET IN TOUCH</div>
                <div className="button-outline button-lg !rounded-full">VIEW ALL WORKS</div>
            </div>
        </section>
    )
}