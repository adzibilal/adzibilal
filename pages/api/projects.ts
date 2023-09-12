import { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '@/utils/database'
import Project, { IProject } from '@/models/Project'

connectToDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req
    const { projectId, page, perPage, search } = query
    //@ts-ignore
    const pageNumber = parseInt(page) || 1
    //@ts-ignore
    const itemsPerPage = parseInt(perPage) || 10 // Ubah sesuai kebutuhan

    if (req.method === 'GET') {
        try {
            if (projectId) {
                // Jika projectId ada, cari proyek berdasarkan projectId
                const project = await Project.findById(projectId)

                if (!project) {
                    return res.status(404).json({ error: 'Project not found' })
                }

                res.status(200).json(project)
            } else if (search) {
                // Jika terdapat parameter 'search', lakukan pencarian berdasarkan judul, deskripsi, konten, dan teknologi
                const totalProjects = await Project.countDocuments()
                const totalPages = Math.ceil(totalProjects / itemsPerPage)
                const projects = await Project.find({
                    $or: [
                        { judul: { $regex: search, $options: 'i' } }, // Pencarian judul (case-insensitive)
                        { deskripsi: { $regex: search, $options: 'i' } }, // Pencarian deskripsi (case-insensitive)
                        { content: { $regex: search, $options: 'i' } }, // Pencarian konten (case-insensitive)
                        { teknologi: { $in: [search] } } // Pencarian teknologi (mencocokkan array)
                    ]
                })
                    .skip((pageNumber - 1) * itemsPerPage)
                    .limit(itemsPerPage)
                res.status(200).json({
                    projects,
                    totalProjects,
                    totalPages,
                    currentPage: pageNumber
                })
            } else {
                if (query.endpoint === 'projects-lp') {
                    // Jika endpoint adalah 'projects-lp', ambil 6 proyek acak
                    const projects = await Project.aggregate([
                        { $sample: { size: 6 } } // Mengambil 6 dokumen acak dari koleksi
                    ])
                    res.status(200).json(projects)
                } else {
                    // Jika projectId tidak ada dan tidak ada parameter 'search', ambil data proyek dengan pagination
                    const totalProjects = await Project.countDocuments()
                    const totalPages = Math.ceil(totalProjects / itemsPerPage)
                    const projects = await Project.find()
                        .skip((pageNumber - 1) * itemsPerPage)
                        .limit(itemsPerPage)

                    res.status(200).json({
                        projects,
                        totalProjects,
                        totalPages,
                        currentPage: pageNumber
                    })
                }
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else if (req.method === 'POST') {
        const {
            judul,
            deskripsi,
            content,
            teknologi,
            link,
            image // Sekarang Anda mengharapkan image sebagai array dari URL gambar
        } = req.body

        try {
            const newProject = new Project({
                judul,
                deskripsi,
                content,
                teknologi,
                link,
                image // Simpan array URL gambar langsung ke dalam model proyek
            })

            await newProject.save()
            res.status(201).json(newProject)
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else if (req.method === 'PUT') {
        const { id, judul, deskripsi, image, content, teknologi, link } =
            req.body
        try {
            const updatedProject = await Project.findByIdAndUpdate(id, {
                judul,
                deskripsi,
                image,
                content,
                teknologi,
                link
            })
            if (!updatedProject) {
                return res.status(404).json({ error: 'Project not found' })
            }
            res.status(200).json(updatedProject)
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.body
        try {
            const deletedProject = await Project.findByIdAndRemove(id)
            if (!deletedProject) {
                return res.status(404).json({ error: 'Project not found' })
            }
            res.status(200).json({ message: 'Project deleted successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
