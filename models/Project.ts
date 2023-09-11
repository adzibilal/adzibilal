import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IProject extends Document {
    judul: string
    deskripsi: string
    image: string[] // URL gambar dari Cloudinary
    content: string
    teknologi: string[]
    link: string
}

// Periksa apakah model Project sudah ada sebelumnya
let Project: Model<IProject>

try {
    Project = mongoose.model<IProject>('Project')
} catch (error) {
    // Jika model belum ada, maka kompilasi model baru
    const projectSchema = new Schema<IProject>({
        judul: { type: String, required: true },
        deskripsi: { type: String, required: true },
        image: [{ type: String, required: true }],
        content: { type: String, required: true },
        teknologi: [{ type: String, required: true }],
        link: { type: String, required: true }
    })

    Project = mongoose.model<IProject>('Project', projectSchema)
}

export default Project
