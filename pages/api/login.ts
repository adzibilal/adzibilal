import { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '@/utils/database'
import User, { IUser } from '@/models/User'
import jwt from 'jsonwebtoken'

connectToDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req

    if (req.method === 'POST') {
        const { username, password } = body

        try {
            // Cari pengguna dengan username yang diberikan
            const user = await User.findOne({ username })

            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'Username atau kata sandi salah' })
            }

            // Periksa apakah kata sandi sesuai (Anda mungkin ingin menggunakan library untuk hashing kata sandi)
            const isPasswordValid = user.password === password

            if (!isPasswordValid) {
                return res
                    .status(401)
                    .json({ error: 'Username atau kata sandi salah' })
            }

            // Jika autentikasi berhasil, buat token JWT
            const token = jwt.sign(
                {
                    userId: user._id,
                    username: user.username,
                    email: user.email
                },
                'rahasia-rahasia', // Gantilah dengan rahasia yang aman
                { expiresIn: '1h' } // Durasi token
            )

            // Mengembalikan data email, username, dan token
            res.status(200).json({
                email: user.email,
                username: user.username,
                token
            })
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
