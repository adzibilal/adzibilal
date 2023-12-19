import Sidebar from './_components/sidebar'
import './style.css'

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="dashcon m-5">
        <Sidebar/>
        {children}
     </div>
    )
  }
  