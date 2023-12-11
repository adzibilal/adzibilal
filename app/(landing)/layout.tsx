import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"


export default function LandingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="">
        <Navbar/>
        {children}
        <Footer/>
      </div>
    )
  }
  