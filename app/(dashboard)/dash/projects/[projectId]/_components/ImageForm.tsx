'use client'
import { Project } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
//@ts-ignore
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'
import { AiFillSave, AiFillEdit, AiFillDelete } from 'react-icons/ai'

interface ImageFormProps {
    project: Project
    onSuccess: () => void
}

const ImageForm = ({ project, onSuccess }: ImageFormProps) => {
    const [isInit, setIsInit] = useState(true)
    const [value, setValue] = useState(project.images ?? [])

    const onSubmit = async () => {
        const values = {
            images: value
        }
        try {
            await axios.patch(`/api/project/${project.id}`, values)
            if (onSuccess) {
                onSuccess()
            }
        } catch {
            console.error('Something went wrong')
        }
    }

    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME
    const successCallBack = (res: any) => {
        console.error(res.info.secure_url)
        setValue(prevValue => {
            const updatedValue = [...prevValue, res.info.secure_url]
            return updatedValue
        })
    }
    const failureCallBack = (res: any) => {
        console.error(res)
    }
    const deleteTechField = (index: number) => {
        const newValues = [...value]
        newValues.splice(index, 1)
        setValue(newValues)
    }

    useEffect(() => {
        setIsInit(false)
    }, [])

    useEffect(() => {
        if (!isInit) {
            onSubmit()
        }
    }, [value])
    return (
        <>
            <div className='flex items-center justify-between mb-5'>
                <div className='text-xl font-semibold'>Project Image</div>

                <div className=''>
                    <WidgetLoader />
                    <Widget
                        sources={['local', 'camera']}
                        sourceKeys={{
                            dropboxAppKey: '1dsf42dl1i2',
                            instagramClientId: 'd7aadf962m'
                        }}
                        resourceType={'image'}
                        cloudName={cloudName}
                        uploadPreset={'ml_default'}
                        buttonText={'Add Image'}
                        style={{
                            color: 'black',
                            border: 'none',
                            width: '120px',
                            backgroundColor: '#FAFAFA',
                            borderRadius: '2px',
                            height: 'auto',
                            padding: '10px 0px'
                        }}
                        folder={'porto_adzibilal'}
                        cropping={false}
                        multiple={true}
                        autoClose={false}
                        onSuccess={successCallBack}
                        onFailure={failureCallBack}
                        logging={false}
                        use_filename={false}
                        apiKey={apiKey}
                        accepts={'application/json'}
                        contentType={'application/json'}
                        withCredentials={true}
                        unique_filename={false}
                    />
                </div>
            </div>

            <div className='project-img-scroller'>
                {project &&
                    value.map((img, index) => (
                        <div className='relative mb-2' key={img}>
                            <div
                                className='absolute cursor-pointer bg-red-600 w-10 h-10 rounded-full right-3 top-3 text-white flex items-center justify-center'
                                onClick={() => deleteTechField(index)}>
                                <AiFillDelete />
                            </div>
                            <img src={img} alt='' />
                        </div>
                    ))}
            </div>
        </>
    )
}

export default ImageForm
