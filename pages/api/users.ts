import { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '@/utils/database'
import User, { IUser } from '@/models/User'

connectToDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req

    if (req.method === 'POST') {
        const { username, email, password } = body

        try {
            const newUser = new User({
                username,
                email,
                password
            })

            await newUser.save()
            res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
