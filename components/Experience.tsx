export default function Experience() {
    return (
        <section className='max-container grid grid-cols-2 gap-10 max-lg:!mx-5 max-lg:grid-cols-1'>
            <div className='experience-box'>
                <div className='title-section mb-8'>
                    <span className='text-gradient'>Work Experience</span>
                </div>
                <div className='item-exp'>
                    <div className='flex gap-5 items-center'>
                        <img
                            src='/images/jumpa.id.png'
                            alt=''
                            className='img-exp'
                        />

                        <div className=''>
                            <div className='title'>Jumpa ID</div>
                            <div className='prod'>Frontend Developer</div>
                        </div>
                    </div>

                    <p>2022 - Now</p>
                </div>
                <div className='item-exp'>
                    <div className='flex gap-5 items-center'>
                        <img
                            src='/images/bara.png'
                            alt=''
                            className='img-exp'
                        />

                        <div className=''>
                            <div className='title'>Bara Enterprise</div>
                            <div className='prod'>Frontend Developer</div>
                        </div>
                    </div>

                    <p>2020 - 2022</p>
                </div>
                <div className='item-exp'>
                    <div className='flex gap-5 items-center'>
                        <img
                            src='/images/bara.png'
                            alt=''
                            className='img-exp'
                        />

                        <div className=''>
                            <div className='title'>Bara Enterprise</div>
                            <div className='prod'>Frontend Developer (Intern) </div>
                        </div>
                    </div>

                    <p>2019 - 2020</p>
                </div>
            </div>
            <div className='experience-box'>
                <div className='title-section mb-8'>
                    <span className='text-gradient'>Education</span>
                </div>
                <div className='item-exp'>
                    <div className='flex gap-5 items-center'>
                        <img
                            src='/images/sttb.png'
                            alt=''
                            className='img-exp'
                        />

                        <div className=''>
                            <div className='title'>Sekolah Tinggi Teknologi Bandung</div>
                            <div className='prod'>Tenkik Informatikak</div>
                        </div>
                    </div>

                    <p>2017-2020</p>
                </div>
                <div className='item-exp'>
                    <div className='flex gap-5 items-center'>
                        <img
                            src='/images/smk2cimahi.jpg'
                            alt=''
                            className='img-exp'
                        />

                        <div className=''>
                            <div className='title'>SMK Negri 2 Cimahi</div>
                            <div className='prod'>Rekayasa Perangkat Lunak</div>
                        </div>
                    </div>

                    <p>2017-2020</p>
                </div>
            </div>
        </section>
    )
}
