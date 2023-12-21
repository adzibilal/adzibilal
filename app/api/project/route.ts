import { db } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)

        const page = Number(searchParams.get('page')) || 1
        const pageSize = Number(searchParams.get('pageSize')) || 10
        const searchTerm = searchParams.get('searchTerm') || '' // Menambahkan parameter pencarian
        const sortDirection = searchParams.get('sortDirection') || 'desc' // Menambahkan parameter arah pengurutan
        const isActive = searchParams.get('isActive') === 'true'

        if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
            return NextResponse.json({ error: 'Invalid pagination parameters' })
        }

        // Membuat objek untuk pengaturan paginasi dan pencarian
        const paginationOptions = {
            skip: (page - 1) * pageSize,
            take: pageSize
        }
        
        const searchOptions = {
            where: {
                // Menambahkan kondisi pencarian
                AND: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    // Menambahkan kondisi pencarian berdasarkan isActive hanya jika isActive true
                    isActive ? { isActive: true } : undefined
                    // Tambahkan kondisi pencarian tambahan di sini
                ].filter(Boolean) // Filter nilai yang tidak valid (undefined)
            },
            orderBy: {
                // Menambahkan pengurutan berdasarkan createdAt
                createdAt: sortDirection
            }
        }

        // Menggabungkan opsi paginasi dan pencarian
        const combinedOptions = { ...paginationOptions, ...searchOptions }

        // Mendapatkan data proyek sesuai dengan paginasi dan pencarian
        //@ts-ignore
        const projects = await db.project.findMany(combinedOptions)

        // Menghitung jumlah total proyek (untuk keperluan informasi paginasi)
        //@ts-ignore
        const totalProjects = await db.project.count(searchOptions)

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
