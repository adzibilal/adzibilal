import { formatDateToCustomFormat } from '@/utils'
import { useEffect, useState } from 'react'

interface Comment {
    _id: string
    nama: string
    email: string
    comment: string
    createdAt: string
}

interface ProjectCommentsProps {
    projectId: string
}

const ProjectComments: React.FC<ProjectCommentsProps> = ({ projectId }) => {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState({
        nama: '',
        email: '',
        comment: ''
    })

    const [formError, setFormError] = useState<string | null>(null)
    const fetchComments = () => {
        // Buat permintaan GET ke API Anda untuk mengambil komentar berdasarkan projectId
        fetch(`/api/comments/?idPost=${projectId}&status=1`, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                return response.json()
            })
            .then(data => {
                // Setel data komentar ke dalam state
                setComments(data.comments)
            })
            .catch(error => {
                console.error(
                    'There was a problem with the fetch operation:',
                    error
                )
            })
    }
    useEffect(() => {
        if (projectId) {
            fetchComments()
        }
    }, [projectId])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setNewComment({
            ...newComment,
            [name]: value
        })
    }

    const handleCommentSubmit = () => {
        // Validasi formulir sebelum mengirim komentar
        if (!newComment.nama || !newComment.email || !newComment.comment) {
            setFormError('Semua bidang harus diisi.')
            return
        }

        // Kirim komentar ke API Anda
        fetch(`/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama: newComment.nama,
                email: newComment.email,
                comment: newComment.comment,
                id_post: projectId,
                type: 'project',
                status: 1
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                return response.json()
            })
            .then(data => {
                // Setel data komentar ke dalam state atau lakukan sesuai kebutuhan
                setNewComment({
                    nama: '',
                    email: '',
                    comment: ''
                })
                fetchComments()
                setFormError(null)
                // Kemungkinan Anda ingin memperbarui daftar komentar setelah mengirim
                // Dapat dilakukan dengan cara melakukan pengambilan komentar kembali
            })
            .catch(error => {
                console.error('There was an error:', error)
            })
    }

    return (
        <div className='grid grid-cols-[1.5fr_2fr] gap-5 mb-10'>
            <div className=''>
                <div className='form-control w-full'>
                    <label className='label'>
                        <span className='label-text'>What is your name?</span>
                    </label>
                    <input
                        type='text'
                        placeholder='Type here'
                        className='input input-bordered w-full'
                        name='nama'
                        value={newComment.nama}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-control w-full'>
                    <label className='label'>
                        <span className='label-text'>Email</span>
                    </label>
                    <input
                        type='email'
                        placeholder='Type here'
                        className='input input-bordered w-full'
                        name='email'
                        value={newComment.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-control w-full'>
                    <label className='label'>
                        <span className='label-text'>Your Comment</span>
                    </label>
                    <textarea
                        placeholder='Type here'
                        className='textarea textarea-bordered w-full'
                        name='comment'
                        value={newComment.comment}
                        onChange={handleInputChange}
                    />
                </div>

                {formError && <div className='text-red-600'>{formError}</div>}

                <div className='btn mt-5' onClick={handleCommentSubmit}>
                    Kirim Komentar
                </div>
            </div>
            <div className=''>
                <h2 className='text-gradient font-chakra font-extrabold text-4xl mb-3'>
                    Komentar
                </h2>

                <ul className='mb-3'>
                    {comments.map(comment => (
                        <li key={comment._id} className='mb-3 pb-2 border-b border-base-content px-3'>
                            <div className='flex justify-between'>
                                <strong className='font-chakra text-lg'>{comment.nama}</strong>{' '}
                                <span className='text-xs text-base-content'>
                                    {' '}
                                    {formatDateToCustomFormat(
                                        comment.createdAt
                                    )}
                                </span>
                            </div>
                            <p>{comment.comment}</p>
                        </li>
                    ))}

                    {comments.length == 0 && 
                        <div className="">Belum ada komentar</div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProjectComments
