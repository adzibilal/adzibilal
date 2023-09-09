import mongoose, { Document, Schema } from 'mongoose'

export interface IProject extends Document {
    judul: string
    deskripsi: string
    image: string // URL gambar dari Cloudinary
    content: string
    teknologi: string[]
    link: string
}

const projectSchema = new Schema<IProject>({
    judul: { type: String, required: true },
    deskripsi: { type: String, required: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    teknologi: [{ type: String, required: true }],
    link: { type: String, required: true }
})

export default mongoose.model<IProject>('Project', projectSchema)
