// utils/index.ts

export function formatDateToCustomFormat(isoDate: string): string {
    const date = new Date(isoDate)

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${day} ${month} ${year} - ${hours}:${minutes}`
}

export function getStatusPendaftaran(status: number): string {
    switch (status) {
        case 0:
            return 'Terkirim'
        case 1:
            return 'Di Konfirmasi'
        case 2:
            return 'Proses Pengerjaan'
        case 3:
            return 'Selesai'
        case 4:
            return 'Dibatalkan'
        default:
            return 'Status Tidak Valid'
    }
}

export function kirimProgressWa(
    nomorTelepon: string,
    idProyek: string,
    nama: string,
    namaBisnis?: string
): void {
    if (nomorTelepon.startsWith('0')) {
        nomorTelepon = '62' + nomorTelepon.slice(1)
    }

    // Gantilah dengan tautan yang sesuai untuk tracking proyek dan pengisian data detail
    const tautanTrackingProyek: string = `https://adzibilal.vercel.app/webgratis2023/${idProyek}`
    const tautanPengisianData: string = 'https://forms.gle/P939CtQGr1ngn3eu6'

    // Membuat pesan teks
    const pesan: string = `Halo ${nama},
  
  Saya ingin memberikan beberapa tautan yang mungkin berguna untuk proyek kita:
  ${namaBisnis}

  1. Link Tracking Proyek:
     ${tautanTrackingProyek}
  
  2. Link Pengisian Data Detail:
     ${tautanPengisianData}
  
  Anda dapat mengklik tautan di atas untuk mengaksesnya. Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, jangan ragu untuk bertanya.
  
  Terima kasih dan semoga proyek ini berjalan lancar.`

    // Membuat tautan WhatsApp dengan nomor telepon dan pesan
    const tautanWhatsApp: string = `https://api.whatsapp.com/send?phone=${nomorTelepon}&text=${encodeURIComponent(
        pesan
    )}`

    // Buka tautan WhatsApp di jendela baru
    window.open(tautanWhatsApp, '_blank')
}
