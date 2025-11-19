import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Dashboard() {
  return (
    <main className="relative flex flex-col gap-4">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default Dashboard
