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
