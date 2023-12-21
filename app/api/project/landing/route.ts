import { db } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        //@ts-ignore
        const allProjects = await db.project.findMany({
            where: {
                isActive: true
            }
        })

        // Mengambil 6 data proyek secara acak
        const randomProjects = getRandomProjects(allProjects, 6)

        return NextResponse.json({
            projects: randomProjects
        })
    } catch (error) {
        console.log('[GET PROJECT]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}

function getRandomProjects(projects: any[], count: number): any[] {
    const shuffledProjects = [...projects]

    // Melakukan pengacakan menggunakan algoritma Fisher-Yates
    for (let i = shuffledProjects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledProjects[i], shuffledProjects[j]] = [
            shuffledProjects[j],
            shuffledProjects[i]
        ]
    }

    // Mengambil sejumlah proyek sesuai dengan jumlah yang diinginkan
    return shuffledProjects.slice(0, count)
}
