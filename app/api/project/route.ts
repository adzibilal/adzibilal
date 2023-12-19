import { db } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const project = await db.project.findMany({})

        return NextResponse.json(project)
    } catch (error) {
        console.log('[GET PROJECT]', error)
        return new NextResponse(`Internal Error asdasd`, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const values = await req.json()

        const project = await db.project.create({
            data: {
                ...values
            }
        })

        return NextResponse.json(project)
    } catch (error) {
        console.log('[ADD PROJECT]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
