// config/database.ts

import mongoose, { Connection } from 'mongoose'

let connection: Connection

async function connectToDatabase() {
    if (connection) {
        return connection
    }

    try {
        const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string, {
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Connected to MongoDB Atlas')
        connection = conn.connection
        return connection
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas', err)
        throw err
    }
}

export default connectToDatabase
