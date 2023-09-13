import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IPendaftaran extends Document {
    nama: string
    email: string
    noWhatsApp: string
    status: number
    namaBisnis?: string
    jenisWebsite: 'Web Portofolio' | 'Web Landing Page'
    createdAt: Date
}

// Periksa apakah model Pendaftaran sudah ada sebelumnya
let Pendaftaran: Model<IPendaftaran>

try {
    Pendaftaran = mongoose.model<IPendaftaran>('Pendaftaran')
} catch (error) {
    // Jika model belum ada, maka kompilasi model baru
    const pendaftaranSchema = new Schema<IPendaftaran>(
        {
            nama: { type: String, required: true },
            email: { type: String, required: true },
            noWhatsApp: { type: String, required: true },
            namaBisnis: { type: String },
            status: { type: Number, required: true, default: 0 },
            jenisWebsite: {
                type: String,
                required: true,
                enum: ['Web Portofolio', 'Web Landing Page']
            },
            createdAt: { type: Date, required: true, default: Date.now }
        },
        { timestamps: true }
    )

    Pendaftaran = mongoose.model<IPendaftaran>('Pendaftaran', pendaftaranSchema)
}

export default Pendaftaran
