import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IUser extends Document {
    username: string
    email: string
    password: string
    createdAt: Date
}

// Periksa apakah model Users sudah ada sebelumnya
let User: Model<IUser>

try {
    User = mongoose.model<IUser>('User')
} catch (error) {
    // Jika model belum ada, maka kompilasi model baru
    const userSchema = new Schema<IUser>(
        {
            username: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            createdAt: { type: Date, required: true, default: Date.now }
        },
        { timestamps: true }
    )

    User = mongoose.model<IUser>('User', userSchema)
}

export default User
