import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IComment extends Document {
    nama: string
    email: string
    comment: string
    status: 0 | 1
    type: 'post' | 'project'
    id_post: mongoose.Types.ObjectId
    createdAt: Date
}

// Periksa apakah model Comment sudah ada sebelumnya
let Comment: Model<IComment>

try {
    Comment = mongoose.model<IComment>('Comment')
} catch (error) {
    // Jika model belum ada, maka kompilasi model baru
    const commentSchema = new Schema<IComment>(
        {
            nama: { type: String, required: true },
            email: { type: String, required: true },
            comment: { type: String, required: true },
            status: { type: Number, required: true, enum: [0, 1] },
            type: { type: String, required: true, enum: ['post', 'project'] },
            id_post: { type: mongoose.Schema.Types.ObjectId, required: true },
            createdAt: { type: Date, required: true, default: Date.now }
        },
        { timestamps: true }
    )

    Comment = mongoose.model<IComment>('Comment', commentSchema)
}

export default Comment
