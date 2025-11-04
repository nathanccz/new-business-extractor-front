import { Icon } from '@iconify/react'
import Navbar from './Navbar'
import Footer from './Footer'

function Skeleton() {
  return (
    <main className="relative flex flex-col gap-3">
      {/* TOP STATISTICS CALLOUT: ROW 1 */}
      <div className="stats shadow flex flex-col md:flex-row mb-3 justify-center items-center">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="skeleton h-48 w-132"></div>
          <div className="skeleton h-48 w-132"></div>
        </div>
      </div>

      {/* NEW BUSINESS RESULTS TABLE */}
      <div className="skeleton h-[60vw] w-full"></div>
    </main>
  )
}

export default Skeleton
