import { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '@/utils/database'
import Project, { IProject } from '@/models/Project'

connectToDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const projects = await Project.find()
            res.status(200).json(projects)
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
