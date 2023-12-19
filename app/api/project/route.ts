import { db } from '@/utils/db'
import { NextResponse} from 'next/server'

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        // Mendapatkan parameter paginasi dari query string
        const page = Number(searchParams.get("page")) || 1 // Halaman default: 1
        const pageSize = Number(searchParams.get("pageSize")) || 10 // Ukuran halaman default: 10

        // Memastikan bahwa page dan pageSize adalah angka yang valid
        if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
            return NextResponse.json({ error: 'Invalid pagination parameters' })
        }

        // Menghitung indeks awal dan akhir untuk paginasi
        const startIndex = (page - 1) * pageSize
        const endIndex = page * pageSize

        // Mendapatkan data proyek sesuai dengan paginasi
        const projects = await db.project.findMany({
            skip: startIndex,
            take: pageSize
        })

        // Menghitung jumlah total proyek (untuk keperluan informasi paginasi)
        const totalProjects = await db.project.count()

        // Mengembalikan hasil dengan informasi paginasi
        return NextResponse.json({
            projects,
            pageInfo: {
                currentPage: page,
                pageSize: pageSize,
                totalPages: Math.ceil(totalProjects / pageSize),
                totalProjects: totalProjects
            }
        })
    } catch (error) {
        console.log('[GET PROJECT]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
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
