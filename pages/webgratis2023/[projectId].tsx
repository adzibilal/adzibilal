// pages/admin/projects/[projectId].tsx
import '@/app/globals.css'
import { GetServerSideProps, NextPage } from 'next'
import connectToDB from '@/utils/database'
import Pendaftaran, { IPendaftaran } from '@/models/Pendaftaran'
import { getStatusPendaftaran } from '@/utils'

interface Props {
    project: IPendaftaran | null
}

const ProjectDetail: NextPage<Props> = ({ project }) => {
    return (
        <div className='max-container max-lg:!mx-5 '>
            <div className='w-full h-screen flex items-center justify-center flex-col gap-10'>
                <div className='h1 title-section text-center max-sm:text-3xl'>
                    Tracking Project
                </div>

                {project ? (
                    <div className='box-tracking bg-black-primary p-10 rounded-xl flex flex-col gap-3 items-center py-15'>
                        <div className='h1 title-section text-gradient text-center max-sm:text-3xl'>
                            {project.nama}
                        </div>
                        <p className='text-2xl text-center max-sm:text-xl'>
                            {project.namaBisnis}
                        </p>
                        <p>Status Project:</p>
                        <div className={`badge badge-lg`}>
                            {getStatusPendaftaran(project.status)}
                        </div>
                    </div>
                ) : (
                    <p>Project not found</p>
                )}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
    params
}) => {
    await connectToDB()

    if (params?.projectId) {
        const project = await Pendaftaran.findById(params.projectId).exec()

        // Mengonversi _id (ObjectId) menjadi string
        const serializedProject = project ? project.toObject() : null
        if (serializedProject) {
            serializedProject._id = serializedProject._id.toString()

            // Convert createdAt to a string
            //@ts-ignore
            serializedProject.createdAt =
                serializedProject.createdAt.toISOString()
            //@ts-ignore
            serializedProject.updatedAt =
                serializedProject.updatedAt.toISOString()
        }

        return {
            props: {
                project: serializedProject
            }
        }
    }

    return {
        props: {
            project: null
        }
    }
}

export default ProjectDetail
