import { useEffect, useState } from 'react'
import './App.css'
import { Icon } from '@iconify/react'

function App() {
  const [businesses, setBusinesses] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/businesses/15`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const array = data.data
        setBusinesses(array)
        setCities(
          array
            .map((el) =>
              el.city
                .split(' ')
                .map((el) => el[0] + el.substring(1).toLowerCase())
                .join(' ')
            )
            .filter((el, i, arr) => arr.lastIndexOf(el) === i)
        )
        console.log(array)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <main className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold">New Businesses (October 2025)</h1>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
      <div className="flex gap-3">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" placeholder="Search" />
        </label>

        <select defaultValue="Pick a color" className="select">
          <option disabled={true}>Industry</option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
        <select defaultValue="Pick a color" className="select">
          <option disabled={true}>City</option>
          {cities.map((city, ind) => (
            <option key={ind}>{city}</option>
          ))}
        </select>
        <select defaultValue="Pick a color" className="select">
          <option disabled={true}>Year</option>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        <button className="btn">Filter</button>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Business Name</th>
              <th>City</th>
              <th>Business Type</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {businesses.map((business, ind) => (
              <tr className="hover:bg-base-300" key={business.id}>
                <th>{ind + 1}</th>
                <td className="font-bold">
                  <a
                    href={`https://www.google.com/search?q=${business.businessName} Los Angeles`}
                    target="_blank"
                  >
                    {business.businessName}
                  </a>
                </td>
                <td>{business.city}</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default App
