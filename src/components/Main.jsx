import { useEffect, useState } from 'react'

import { Icon } from '@iconify/react'
import Select from 'react-select'

import Skeleton from './Skeleton'
import { formatCityName } from '../../utils/helpers'
import Toast from './Toast'

function Main() {
  const [totalBusinesses, setTotalBusinesses] = useState(0)
  const [businesses, setBusinesses] = useState([])
  const [filtered, setFiltered] = useState(businesses)
  const [isFiltering, setIsFiltering] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [cities, setCities] = useState([])
  const [zipCodes, setZipCodes] = useState([])
  const [resultsPerPage, setResultsPerPage] = useState(50)
  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [topCities, setTopCities] = useState([])
  const [searchEngine, setSearchEngine] = useState('')
  const [toastActive, setToastActive] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    city: null,
    zipCode: null,
    year: null,
  })

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

  const handleClickTableItem = async (clickedItem) => {
    if (isFiltering && clickedItem === filtered[0].city) {
      //If user clicks active city badge, reset.
      setFilterOptions({})
      handleClickReset()
      return
    }

    setFilterOptions({})
    setIsLoading(true)
    setIsFiltering(true)

    const filterChoice = cities.includes(clickedItem)
      ? { ...filterOptions, city: clickedItem }
      : { ...filterOptions, zipCode: clickedItem }

    setFilterOptions(filterChoice)

    const URL = cities.includes(clickedItem)
      ? `http://localhost:3000/api/businesses/city/${clickedItem}`
      : `http://localhost:3000/api/businesses/zip/${clickedItem.split('-')[0]}`

    try {
      const response = await fetch(URL)
      const data = await response.json()
      setFiltered(
        data.data.map((business) => {
          const saved = JSON.parse(localStorage.getItem('savedBusinesses'))
          const isSaved = saved.some((entry) => entry.id === business.id)

          return {
            ...business,
            city: formatCityName(business.city),
            isSaved: isSaved,
          }
        })
      )
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickFilter = async () => {
    if (Object.values(filterOptions).every((option) => !option)) return
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

  const handleClickCloudIcon = async (businessId) => {
    //Grab either business array or filtered array based on whether isFiltering is true
    const businessesArray = isFiltering ? [...filtered] : [...businesses]

    //Find clicked business in business array
    const clickedBusiness = businessesArray.find(
      (business) => business.id === businessId
    )

    //Set createAt date in business object
    clickedBusiness.savedAt = new Date().toISOString()

    //Retrieve saved businesses array from local storage--if it doesn't exist, set to empty array
    let savedBusinesses =
      JSON.parse(localStorage.getItem('savedBusinesses')) || []

    //If the business is already saved, push it to the array of saved businesses
    if (!clickedBusiness.isSaved) {
      setIsSaving(true)
      savedBusinesses.push(clickedBusiness)
    } else {
      //If it is already saved, remove it from the saved businesses array
      setIsSaving(false)
      savedBusinesses = [...savedBusinesses].filter(
        (business) => business.id !== clickedBusiness.id
      )
    }
    //Set the new businesses in local storage
    localStorage.setItem('savedBusinesses', JSON.stringify(savedBusinesses))

    //Set the isSaved flag on the business to true and update businesses array, so it re-renders and fills in cloud button
    if (isFiltering) {
      setFiltered(
        filtered.map((business) => {
          return business.id === businessId
            ? (business.isSaved = {
                ...business,
                isSaved: !clickedBusiness.isSaved,
              })
            : business
        })
      )
    } else {
      setBusinesses(
        businesses.map((business) => {
          return business.id === businessId
            ? (business.isSaved = {
                ...business,
                isSaved: !clickedBusiness.isSaved,
              })
            : business
        })
      )
    }

    setToastActive(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setToastActive(false)
  }

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
        const businessesInLocalStorage =
          JSON.parse(localStorage.getItem('savedBusinesses')) || []

        if (!searchEnginePreference) {
          setSearchEngine('google')
        } else {
          setSearchEngine(searchEnginePreference)
        }

        setBusinesses(
          newBusinessesData.data.map((business) => {
            const isSaved = businessesInLocalStorage.some(
              (entry) => entry.id === business.id
            )

            return {
              ...business,
              city: formatCityName(business.city),
              isSaved: isSaved,
            }
          })
        )

        setZipCodes(
          newBusinessesData.data
            .map((business) => business.zipCode)
            .filter((el, ind, arr) => arr.lastIndexOf(el) === ind)
        )
        setPages(Math.ceil(newBusinessesData.total / 100))
        setTopCities(topCitiesData.map((el) => el.city))
        setCities(newBusinessesData.cities)
        setTotalBusinesses(newBusinessesData.total)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [currentPage])

  return !isLoading ? (
    <>
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
            {topCities.map((city, ind) => (
              <div
                key={ind}
                className={`badge badge-accent cursor-pointer hover:bg-primary duration-500 ${
                  filtered[0]?.city === city && 'bg-primary'
                }`}
                onClick={() => handleClickTableItem(city)}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER INPUT FIELD */}
      <div className="flex gap-3 flex-col md:flex-row mb-3">
        <label className="input">
          <Icon icon="iconamoon:search-thin" />
          <input type="search" className="grow" placeholder="Search business" />
        </label>
        <select className="select">
          <option disabled={true} selected>
            City
          </option>
          {cities.map((city, ind) => (
            <option key={ind} onClick={() => handleClickTableItem(city)}>
              {city}
            </option>
          ))}
        </select>
        <select className="select">
          <option disabled={true} selected>
            ZIP Code
          </option>
          {zipCodes.map((zip, ind) => (
            <option key={ind} onClick={() => handleClickTableItem(zip)}>
              {zip}
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
        <table className="table table-zebra relative">
          {/* head */}
          <thead className="sticky top-0 z-100 bg-base-200">
            <tr>
              <th></th>
              <th>Business Name</th>
              <th className={filterOptions.city ? 'bg-gray-600' : ''}>City</th>
              <th className={filterOptions.zipCode ? 'bg-gray-600' : ''}>
                ZIP Code
              </th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            {isFiltering
              ? filtered.map((business, ind) => (
                  <tr className="hover:bg-base-300" key={business.id}>
                    <th>
                      <Icon
                        icon={`material-symbols:cloud${
                          !business.isSaved ? '-outline' : ''
                        }`}
                        className="text-xl cursor-pointer"
                        onClick={() => handleClickCloudIcon(business.id)}
                      />
                    </th>
                    <td className="font-bold">
                      <a
                        href={`${searchEngineUrls[searchEngine]}${business.businessName} Los Angeles`}
                        target="_blank"
                      >
                        {business.businessName}
                      </a>
                    </td>
                    <td
                      className="cursor-pointer"
                      onClick={() => handleClickTableItem(business.city)}
                    >
                      {business.city}
                    </td>
                    <td
                      className="cursor-pointer"
                      onClick={() => handleClickTableItem(business.zipCode)}
                    >
                      {business.zipCode}
                    </td>
                    <td>{business.startDate}</td>
                  </tr>
                ))
              : businesses.map((business, ind) => (
                  <tr className="hover:bg-base-300" key={business.id}>
                    <th>
                      <Icon
                        icon={`material-symbols:cloud${
                          !business.isSaved ? '-outline' : ''
                        }`}
                        className="text-xl cursor-pointer"
                        onClick={() => handleClickCloudIcon(business.id)}
                      />
                    </th>
                    <td className="font-bold">
                      <a
                        href={`${searchEngineUrls[searchEngine]}${business.businessName} Los Angeles`}
                        target="_blank"
                      >
                        {business.businessName}
                      </a>
                    </td>
                    <td
                      className="cursor-pointer"
                      onClick={() => handleClickTableItem(business.city)}
                    >
                      {business.city}
                    </td>
                    <td
                      className="cursor-pointer"
                      onClick={() => handleClickTableItem(business.zipCode)}
                    >
                      {business.zipCode}
                    </td>
                    <td>{business.startDate}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="join w-full flex flex-wrap">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            className={`join-item btn ${
              currentPage === i + 1 ? 'btn-active' : ''
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {toastActive && <Toast isSaving={isSaving} />}
    </>
  ) : (
    <Skeleton />
  )
}

export default Main
