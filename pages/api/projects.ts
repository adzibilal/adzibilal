import { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '@/utils/database'
import Project, { IProject } from '@/models/Project'
import formidable from 'formidable';

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
        const form = new formidable.IncomingForm()

        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).json({ error: 'Server error' })
                return
            }

            const { judul, deskripsi, content, teknologi, link } = fields
            // const image = files?.image?.path // Temporary path to the uploaded image

            try {
                const newProject = new Project({
                    judul,
                    deskripsi,
                    content,
                    teknologi,
                    link
                })
                await newProject.save()
                res.status(201).json(newProject)
            } catch (error) {
                res.status(500).json({ error: 'Server error' })
            }
        })
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
