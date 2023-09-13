import { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '@/utils/database'
import Comment, { IComment } from '@/models/Comment'

connectToDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query, body } = req
    const { commentId, page, perPage, search, idPost, status } = query
    const pageNumber = parseInt(page as string) || 1
    const itemsPerPage = parseInt(perPage as string) || 10

    if (req.method === 'GET') {
        try {
            if (commentId) {
                const comment = await Comment.findById(commentId)

                if (!comment) {
                    return res.status(404).json({ error: 'Comment not found' })
                }

                res.status(200).json(comment)
            } else if (search) {
                const comments = await Comment.find({
                    $or: [
                        { nama: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { comment: { $regex: search, $options: 'i' } }
                    ]
                })

                const totalComments = comments.length
                const totalPages = Math.ceil(totalComments / itemsPerPage)

                const paginatedComments = await Comment.find({
                    $or: [
                        { nama: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { comment: { $regex: search, $options: 'i' } }
                    ]
                })
                    .skip((pageNumber - 1) * itemsPerPage)
                    .limit(itemsPerPage)

                res.status(200).json({
                    comments: paginatedComments,
                    totalComments,
                    totalPages,
                    currentPage: pageNumber
                })
            } else {
                const totalComments = await Comment.countDocuments({
                    id_post: idPost, // Filter berdasarkan id_post
                    status: status // Filter berdasarkan status
                });
                const totalPages = Math.ceil(totalComments / itemsPerPage)
                const comments = await Comment.find({
                    id_post: idPost, // Filter berdasarkan id_post
                    status: status // Filter berdasarkan status
                })                
                    .skip((pageNumber - 1) * itemsPerPage)
                    .limit(itemsPerPage)

                res.status(200).json({
                    comments,
                    totalComments,
                    totalPages,
                    currentPage: pageNumber
                })
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else if (req.method === 'POST') {
        const { nama, email, comment, status, type, id_post } = body

        try {
            const newComment = new Comment({
                nama,
                email,
                comment,
                status,
                type,
                id_post
            })

            await newComment.save()
            res.status(201).json(newComment)
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else if (req.method === 'PUT') {
        const { id, nama, email, comment, status, type, id_post } = body

        try {
            const updatedComment = await Comment.findByIdAndUpdate(id, {
                nama,
                email,
                comment,
                status,
                type,
                id_post
            })

            if (!updatedComment) {
                return res.status(404).json({ error: 'Comment not found' })
            }

            res.status(200).json(updatedComment)
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else if (req.method === 'DELETE') {
        const { id } = body

        try {
            const deletedComment = await Comment.findByIdAndRemove(id)

            if (!deletedComment) {
                return res.status(404).json({ error: 'Comment not found' })
            }

            res.status(200).json({ message: 'Comment deleted successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
