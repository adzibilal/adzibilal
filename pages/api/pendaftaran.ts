import { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '@/utils/database'
import Pendaftaran, { IPendaftaran } from '@/models/Pendaftaran' // Menggunakan model Pendaftaran

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
                const project = await Pendaftaran.findById(projectId) // Menggunakan model Pendaftaran

                if (!project) {
                    return res.status(404).json({ error: 'Project not found' })
                }

                res.status(200).json(project)
            } else if (search) {
                // Jika terdapat parameter 'search', lakukan pencarian berdasarkan judul, deskripsi, konten, dan teknologi
                const projects = await Pendaftaran.find({
                    $or: [
                        { nama: { $regex: search, $options: 'i' } }, // Pencarian nama (case-insensitive)
                        { email: { $regex: search, $options: 'i' } }, // Pencarian email (case-insensitive)
                        { noWhatsApp: { $regex: search, $options: 'i' } }, // Pencarian noWhatsApp (case-insensitive)
                        { namaBisnis: { $regex: search, $options: 'i' } }, // Pencarian namaBisnis (case-insensitive)
                        { jenisWebsite: { $in: [search] } } // Pencarian jenisWebsite (mencocokkan array)
                    ]
                })

                const totalProjects = projects.length // Hitung jumlah proyek yang cocok dengan kriteria pencarian

                const totalPages = Math.ceil(totalProjects / itemsPerPage)

                const paginatedProjects = await Pendaftaran.find({
                    $or: [
                        { nama: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { noWhatsApp: { $regex: search, $options: 'i' } },
                        { namaBisnis: { $regex: search, $options: 'i' } },
                        { jenisWebsite: { $in: [search] } }
                    ]
                })
                    .skip((pageNumber - 1) * itemsPerPage)
                    .limit(itemsPerPage)

                res.status(200).json({
                    projects: paginatedProjects,
                    totalProjects,
                    totalPages,
                    currentPage: pageNumber
                })
            } else {
                if (query.endpoint === 'projects-lp') {
                    // Jika endpoint adalah 'projects-lp', ambil 6 proyek acak
                    const projects = await Pendaftaran.aggregate([
                        { $sample: { size: 6 } } // Mengambil 6 dokumen acak dari koleksi
                    ])
                    res.status(200).json(projects)
                } else {
                    // Jika projectId tidak ada dan tidak ada parameter 'search', ambil data proyek dengan pagination
                    const totalProjects = await Pendaftaran.countDocuments()
                    const totalPages = Math.ceil(totalProjects / itemsPerPage)
                    const projects = await Pendaftaran.find()
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
        const { nama, email, noWhatsApp, namaBisnis, jenisWebsite } = req.body

        try {
            const newPendaftaran = new Pendaftaran({
                nama,
                email,
                noWhatsApp,
                namaBisnis,
                jenisWebsite
            })

            await newPendaftaran.save()
            res.status(201).json(newPendaftaran)
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else if (req.method === 'PUT') {
        const { id, nama, email, noWhatsApp, namaBisnis, jenisWebsite } =
            req.body
        try {
            const updatedPendaftaran = await Pendaftaran.findByIdAndUpdate(id, {
                nama,
                email,
                noWhatsApp,
                namaBisnis,
                jenisWebsite
            })
            if (!updatedPendaftaran) {
                return res.status(404).json({ error: 'Project not found' })
            }
            res.status(200).json(updatedPendaftaran)
        } catch (error) {
            res.status(500).json({ error: 'Server error' })
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.body
        try {
            const deletedPendaftaran = await Pendaftaran.findByIdAndRemove(id)
            if (!deletedPendaftaran) {
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
