import { NextPage } from 'next'

import AdminLayout from './layout'

interface Props {}

const Page: NextPage<Props> = ({}) => {
    return (
        <AdminLayout>
            Dashboard
        </AdminLayout>
    )
}

export default Page
