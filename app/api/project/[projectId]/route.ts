import { db } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        const projectId = params.projectId
        if (!projectId) {
            return new NextResponse(
                'Missing projectId parameter in the request.',
                { status: 400 }
            )
        }

        const project = await db.project.findFirst({
            where: {
                id: projectId
            }
        })

        return NextResponse.json(project)
    } catch (error) {
        console.error('[GET PROJECT BY ID]', error)
        return new NextResponse(`GET PROJECT BY ID ${error ? error : ''}`, {
            status: 500
        })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const { projectId } = params
        const values = await req.json()

        const course = await db.project.update({
            where: {
                id: projectId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(course)
    } catch (error) {
        console.log('[UPDATE PROJECT]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const deletedProject = await db.project.delete({
            where: {
                id: params.projectId
            }
        })
        return NextResponse.json(deletedProject)
    } catch (error) {
        console.log('[PROJECT_ID_DELETE]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
