import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"


export default function SpillLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="text-black-primary bg-white-secondary/80">
        <div className="max-w-lg mx-auto min-h-screen bg-white-secondary p-5">
        {children}
        </div>
      </div>
    )
  }
  