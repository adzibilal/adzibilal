'use-client'
import { NextPage } from 'next'
import AdminLayout from '../layout'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IPendaftaran } from '@/models/Pendaftaran' // Menggunakan model Pendaftaran
import Link from 'next/link'
import { getStatusPendaftaran, kirimProgressWa } from '@/utils'
import { statusPendaftaran } from '@/constants/statusPendaftaran'
import LoadingOverlay from '@/components/LoadingOverlay'

interface Props {}

interface IPagination {
    currentPage: number
    totalPages: number
    totalProjects: number
}

const Pendaftaran: NextPage<Props> = ({}) => {
    const router = useRouter()
    const [editingData, setEditingData] = useState<IPendaftaran | null>(null)
    const [pendaftaran, setPendaftaran] = useState<IPendaftaran[]>([])
    const [pagination, setPagination] = useState<IPagination>({
        currentPage: 1,
        totalPages: 0,
        totalProjects: 0
    })
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(true)

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setSearchValue(value)
    }

    const fetchPendaftaran = async (page: number, searchQuery?: string) => {
        try {
            if (!searchQuery) {
                const response = await fetch(
                    `/api/pendaftaran?page=${page}&perPage=9`
                )
                if (response.ok) {
                    const data = await response.json()
                    setPendaftaran(data.projects)
                    setPagination({
                        currentPage: data.currentPage,
                        totalPages: data.totalPages,
                        totalProjects: data.totalProjects
                    })
                } else {
                    console.error('Failed to fetch projects')
                }
            } else {
                const response = await fetch(
                    `/api/pendaftaran?page=${page}&perPage=9&search=${searchQuery}`
                )
                if (response.ok) {
                    const data = await response.json()
                    setPendaftaran(data.projects)
                    setPagination({
                        currentPage: data.currentPage,
                        totalPages: data.totalPages,
                        totalProjects: data.totalProjects
                    })
                } else {
                    console.error('Failed to fetch projects')
                }
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const openEditModal = (data: IPendaftaran) => {
        setEditingData(data)
        //@ts-ignore
        document.getElementById('modal_edit').showModal()
    }

    const handleEdit = async () => {
        setLoading(true)
        try {
            // Make an API request to update the data
            const response = await fetch(
                `/api/pendaftaran`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editingData)
                }
            )

            if (response.ok) {
                closeEditModal()
                fetchPendaftaran(1)
                setLoading(false)
            } else {
                console.error('Failed to update data')
                setLoading(false)
            }
        } catch (error) {
            console.error('Error:', error)
            setLoading(false)
        }
    }

    const closeEditModal = () => {
        setEditingData(null)
        //@ts-ignore
        document.getElementById('modal_edit').close()
    }

    const handleStatusChange = (e: any) => {
        const newStatus = parseInt(e.target.value)
        //@ts-ignore
        setEditingData({
            ...editingData,
            status: newStatus
        })
    }

    const copyLinkTracking = (data: IPendaftaran) => {
        const id = data._id
        router.push(`/webgratis2023/${id}`)
    }

    useEffect(() => {
        fetchPendaftaran(1)
    }, [])

    return (
        <AdminLayout>
            {loading && <LoadingOverlay />}
            <div className='max-container max-lg:!mx-5'>
                <div className='flex items-center justify-between mb-8 max-sm:flex-col max-sm:gap-5 max-sm:items-start'>
                    <h1 className='text-4xl'>Data Pendaftaran</h1>
                    <div className='flex gap-3 items-center'>
                        <div className='form-control'>
                            <div className='input-group'>
                                <input
                                    type='text'
                                    placeholder='Search…'
                                    className='input input-bordered'
                                    onChange={handleInputChange}
                                />
                                <button
                                    className='btn btn-square'
                                    onClick={() =>
                                        fetchPendaftaran(1, searchValue)
                                    }>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-6 w-6'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <dialog id='modal_edit' className='modal'>
                    <div className='modal-box'>
                        {editingData ? (
                            <>
                                <h3 className='font-bold text-lg'>Edit Data</h3>

                                <div className='form-control w-full'>
                                    <label className='label'>
                                        <span className='label-text'>Nama</span>
                                    </label>
                                    <input
                                        type='text'
                                        value={editingData.nama}
                                        disabled
                                        className='input input-bordered w-full'
                                    />
                                </div>
                                <div className='form-control w-full'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Nama Bisnis
                                        </span>
                                    </label>
                                    <input
                                        type='text'
                                        value={editingData.namaBisnis}
                                        disabled
                                        className='input input-bordered w-full'
                                    />
                                </div>

                                <div className='form-control w-full'>
                                    <label className='label'>
                                        <span className='label-text'>
                                            Status
                                        </span>
                                    </label>
                                    <select
                                        className='select select-bordered'
                                        value={editingData.status}
                                        onChange={handleStatusChange}>
                                        <option disabled value=''>
                                            Pilih Status
                                        </option>
                                        {statusPendaftaran.map(
                                            (stat, index) => (
                                                <option
                                                    key={index}
                                                    value={stat.status}>
                                                    {stat.label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                {/* Add other input fields for other properties */}
                                <button
                                    className='btn mt-5 w-full'
                                    onClick={handleEdit}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className='font-bold text-lg'>Hello!</h3>
                                <p className='py-4'>
                                    Press ESC key or click outside to close
                                </p>
                            </>
                        )}
                    </div>
                    <form method='dialog' className='modal-backdrop'>
                        <button onClick={closeEditModal}>Close</button>
                    </form>
                </dialog>

                {loading ? (
                    <div className='w-full h-[50vh]  flex items-center justify-center'>
                        <span className='loading loading-ring loading-lg scale-150'></span>
                    </div>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input
                                                type='checkbox'
                                                className='checkbox'
                                            />
                                        </label>
                                    </th>
                                    <th>Nama</th>
                                    <th>Nama Bisnis</th>
                                    <th>Email</th>
                                    <th>No WhatsApp</th>
                                    <th>Status</th>
                                    <th>Jenis Website</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendaftaran.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    className='checkbox'
                                                />
                                            </label>
                                        </td>
                                        <td>{item.nama}</td>
                                        <td>{item.namaBisnis}</td>
                                        <td>{item.email}</td>
                                        <td>{item.noWhatsApp}</td>
                                        <td>
                                            {getStatusPendaftaran(item.status)}
                                        </td>
                                        <td>{item.jenisWebsite}</td>
                                        <th className='flex gap-2'>
                                            <button
                                                className='btn btn-xs'
                                                onClick={() =>
                                                    openEditModal(item)
                                                }>
                                                Details
                                            </button>
                                            <button
                                                className='btn btn-xs'
                                                onClick={() =>
                                                    copyLinkTracking(item)
                                                }>
                                                Link Tracking
                                            </button>
                                            <button
                                                className='btn btn-xs'
                                                onClick={() =>
                                                    kirimProgressWa(item.noWhatsApp, item._id, item.nama, item.namaBisnis)
                                                }>
                                                WA Proggress
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Nama</th>
                                    <th>Nama Bisnis</th>
                                    <th>Email</th>
                                    <th>No WhatsApp</th>
                                    <th>Status</th>
                                    <th>Jenis Website</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}

                {!loading && pagination && (
                    <div className='flex justify-center mt-10'>
                        <div className='join'>
                            <button
                                className={`join-item btn ${
                                    pagination.currentPage === 1
                                        ? 'btn-disabled'
                                        : ''
                                }`}
                                onClick={() =>
                                    fetchPendaftaran(1, searchValue)
                                }>
                                1
                            </button>
                            {pagination.currentPage > 3 && (
                                <button className='join-item btn btn-disabled'>
                                    ...
                                </button>
                            )}
                            {pagination.currentPage > 2 && (
                                <button
                                    className='join-item btn'
                                    onClick={() =>
                                        fetchPendaftaran(
                                            pagination.currentPage - 1,
                                            searchValue
                                        )
                                    }>
                                    {pagination.currentPage - 1}
                                </button>
                            )}
                            {pagination.currentPage !== 1 && (
                                <button className='join-item btn btn-active'>
                                    {pagination.currentPage}
                                </button>
                            )}
                            {pagination.currentPage <
                                pagination.totalPages - 1 && (
                                <button
                                    className='join-item btn'
                                    onClick={() =>
                                        fetchPendaftaran(
                                            pagination.currentPage + 1,
                                            searchValue
                                        )
                                    }>
                                    {pagination.currentPage + 1}
                                </button>
                            )}
                            {pagination.currentPage <
                                pagination.totalPages - 2 && (
                                <button className='join-item btn btn-disabled'>
                                    ...
                                </button>
                            )}
                            {pagination.currentPage !==
                                pagination.totalPages && (
                                <button
                                    className={`join-item btn ${
                                        pagination.currentPage ===
                                        pagination.totalPages
                                            ? 'btn-disabled'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        fetchPendaftaran(
                                            pagination.totalPages,
                                            searchValue
                                        )
                                    }>
                                    {pagination.totalPages}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default Pendaftaran
