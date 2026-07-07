import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
