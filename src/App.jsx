import { useEffect, useState } from 'react'
import './App.css'
import { Icon } from '@iconify/react'
import Select from 'react-select'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Skeleton from './components/Skeleton'

function App() {
  const [totalBusinesses, setTotalBusinesses] = useState(0)
  const [businesses, setBusinesses] = useState([])
  const [filtered, setFiltered] = useState(businesses)
  const [isFiltering, setIsFiltering] = useState(false)
  const [cities, setCities] = useState([])
  const [resultsPerPage, setResultsPerPage] = useState(50)
  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [topCities, setTopCities] = useState([])
  const [searchEngine, setSearchEngine] = useState('')
  const [filterOptions, setFilterOptions] = useState({
    city: null,
    industry: null,
    year: null,
  })

  const handleClickCity = (clickedCity) => {
    setFilterOptions({ ...filterOptions, city: clickedCity })
  }

  const handleClickFilter = () => {
    if (Object.values(filterOptions).every((option) => !option)) return

    setIsFiltering(true)

    const results = [...businesses].filter(
      (business) =>
        business.city.toLowerCase() === filterOptions.city.toLowerCase()
    )

    setFiltered(results)
  }

  const handleClickReset = () => {
    setIsFiltering(false)
    setFilterOptions({
      city: null,
      industry: null,
      year: null,
    })
    setFiltered([])
  }

  const handleSearchEngineChange = (selectedOption) => {
    setSearchEngine(selectedOption.value)
    localStorage.setItem('search_engine', selectedOption.value)
  }

  const resultsPerPageOptions = [50, 100, 200, 300, 400, 500]

  const searchEngineUrls = {
    google: 'https://www.google.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    bing: 'https://www.bing.com/search?q=',
  }

  const searchEngineOptions = [
    { value: 'google', label: 'Google' },
    { value: 'duckduckgo', label: 'DuckDuckGo' },
    { value: 'bing', label: 'Bing' },
  ]

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const TOTAL_URL = `http://localhost:3000/api/businesses/${currentPage}`
        const TRENDING_URL = `http://localhost:3000/api/businesses/trending`

        const [newBusinessesRes, topCitiesRes] = await Promise.all([
          fetch(TOTAL_URL),
          fetch(TRENDING_URL),
        ])

        const newBusinessesData = await newBusinessesRes.json()
        const topCitiesData = await topCitiesRes.json()
        const searchEnginePreference = localStorage.getItem('search_engine')
        console.log(newBusinessesData)
        if (!searchEnginePreference) {
          setSearchEngine('google')
        } else {
          setSearchEngine(searchEnginePreference)
        }

        setBusinesses(newBusinessesData.data)
        setPages(Math.floor(newBusinessesData.total / 50))
        setTopCities(topCitiesData.map((el) => el.city))
        setCities(
          newBusinessesData.data
            .map((el) =>
              el.city
                .split(' ')
                .map((el) => el[0] + el.substring(1).toLowerCase())
                .join(' ')
            )
            .filter((el, i, arr) => arr.lastIndexOf(el) === i)
            .sort((a, b) => a.localeCompare(b))
        )
        setTotalBusinesses(newBusinessesData.total)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [currentPage])

  return !isLoading ? (
    <main className="relative flex flex-col gap-3">
      <Navbar />

      {/* TOP STATISTICS CALLOUT: ROW 1 */}
      <div className="stats shadow flex flex-col md:flex-row mb-3">
        <div className="stat">
          <div className="stat-figure text-primary">
            <Icon icon="ic:baseline-business" className="text-3xl" />
          </div>
          <div className="stat-title">Total New Businesses</div>
          <div className="stat-value text-primary">{totalBusinesses}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-title mb-3">Top Neighborhoods</div>
          <div className="flex flex-wrap gap-3">
            {topCities.map((city) => (
              <div class="badge badge-accent cursor-pointer hover:bg-primary duration-500">
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER INPUT FIELD */}
      <div className="flex gap-3 flex-col md:flex-row mb-3">
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
          <input type="search" className="grow" placeholder="Search business" />
        </label>
        <select className="select">
          <option disabled={true} selected>
            Industry
          </option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
        <select className="select" value={filterOptions.city}>
          <option disabled={true} selected>
            City
          </option>
          {cities.map((city, ind) => (
            <option key={ind} onClick={() => handleClickCity(city)}>
              {city}
            </option>
          ))}
        </select>
        <select className="select w-[100px]">
          <option disabled={true}>Year</option>
          <option selected>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
        <button
          className="btn btn-primary cursor-pointer"
          onClick={handleClickFilter}
        >
          <Icon icon="mynaui:filter" /> Filter
        </button>
        <button
          className="btn btn-neutral cursor-pointer"
          onClick={handleClickReset}
        >
          <Icon icon="system-uicons:reset" /> Reset
        </button>
      </div>

      {/* NEW BUSINESS RESULTS TABLE */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="text-left">
          <h1 className="text-lg font-bold">
            Newly Registered Businesses (Sept. 2025)
          </h1>
          <span className="italic text-xs">
            Last updated: October 1, 2025. Public data sourced from the Los
            Angeles{' '}
            <a
              href="https://finance.lacity.gov/"
              target="_blank"
              className="underline"
            >
              Office of Finance
            </a>
            .
          </span>
        </div>
        <div className="w-full flex justify-end">
          {/* <div className="max-w-[30%]">
            <Select
              defaultValue={searchEngine}
              onChange={handleSearchEngineChange}
              options={searchEngineOptions}
            />
          </div> */}
          <div className="sm: w-[70%] md:w-[40%] flex gap-3">
            <select className="select">
              <option disabled={true}>Results per page</option>
              {resultsPerPageOptions.map((option, ind) => (
                <option key={ind} onClick={() => setResultsPerPage(option)}>
                  {option}
                </option>
              ))}
            </select>
            <select className="select">
              <option disabled={true}>Search with...</option>
              <option onClick={() => handleClickSearchEngine('google')}>
                Google
              </option>
              <option onClick={() => handleClickSearchEngine('duckduckgo')}>
                DuckDuckGo
              </option>
              <option onClick={() => handleClickSearchEngine('bing')}>
                Bing
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-h-[60vh]">
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
            {isFiltering
              ? filtered.map((business, ind) => (
                  <tr className="hover:bg-base-300" key={business.id}>
                    <th>{ind + 1}</th>
                    <td className="font-bold">
                      <a
                        href={`${searchEngineUrls[searchEngine]}${business.businessName} Los Angeles`}
                        target="_blank"
                      >
                        {business.businessName}
                      </a>
                    </td>
                    <td>{business.city}</td>
                    <td>Blue</td>
                  </tr>
                ))
              : businesses.map((business, ind) => (
                  <tr className="hover:bg-base-300" key={business.id}>
                    <th>{ind + 1}</th>
                    <td className="font-bold">
                      <a
                        href={`${searchEngineUrls[searchEngine]}${business.businessName} Los Angeles`}
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
      <div className="join w-full flex flex-wrap">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            className="join-item btn"
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <Footer />
    </main>
  ) : (
    <Skeleton />
  )
}

export default App
