import { educationData, workExperience } from "@/constants/experienceData";

export default function Experience() {
    return (
        <section className='max-container grid grid-cols-2 gap-10 max-lg:!mx-5 max-lg:grid-cols-1'>
            <div className='experience-box'>
                <div className='title-section mb-8'>
                    <span className='text-gradient'>Work Experience</span>
                </div>
                {workExperience.map((exp, index) => (
                    <div key={index} className='item-exp'>
                        <div className='flex gap-5 items-center'>
                            <img
                                src={exp.imageSrc}
                                alt={exp.company}
                                className='img-exp'
                            />
                            <div className=''>
                                <div className='title'>{exp.company}</div>
                                <div className='prod'>{exp.position}</div>
                            </div>
                        </div>
                        <p>{exp.period}</p>
                    </div>
                ))}
            </div>

            <div className='experience-box'>
                <div className='title-section mb-8'>
                    <span className='text-gradient'>Education</span>
                </div>
                {educationData.map((edu, index) => (
                    <div key={index} className='item-exp'>
                        <div className='flex gap-5 items-center'>
                            <img
                                src={edu.imageSrc}
                                alt={edu.school}
                                className='img-exp'
                            />
                            <div className=''>
                                <div className='title'>{edu.school}</div>
                                <div className='prod'>{edu.major}</div>
                            </div>
                        </div>
                        <p>{edu.period}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
