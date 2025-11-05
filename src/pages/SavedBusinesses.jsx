import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'

function SavedBusinesses() {
  const [businesses, setBusinesses] = useState(
    JSON.parse(localStorage.getItem('savedBusinesses'))
  )
  const [sortPreference, setSortPreference] = useState(
    localStorage.getItem('business_sort_preference')
  )

  useEffect(() => {
    sortBusinesses(businesses)
  }, [sortPreference])

  const sortBusinesses = (arr) => {
    let savedBusinesses = arr.slice()

    switch (sortPreference) {
      case 'latest':
        savedBusinesses = savedBusinesses.sort(
          (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
        )
        break
      case 'first':
        savedBusinesses = savedBusinesses.sort(
          (a, b) => new Date(a.savedAt) - new Date(b.savedAt)
        )
        break
      default:
        console.log('No valid sort preference found.')
        break
    }
    setBusinesses(savedBusinesses)
  }

  const handleSetPreferenceToLS = (preference) => {
    localStorage.setItem('business_sort_preference', preference)
    setSortPreference(preference)
  }

  return businesses ? (
    <div className="h-[600px] relative">
      <div className="w-full flex justify-end">
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className="btn m-1">
            Sort <Icon icon="material-symbols:sort" className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm font-bold"
          >
            <li onClick={() => handleSetPreferenceToLS('latest')}>
              <a>
                <Icon
                  icon={
                    sortPreference === 'latest'
                      ? 'icon-park-solid:check-one'
                      : 'material-symbols:circle-outline'
                  }
                />{' '}
                Last added
              </a>
            </li>
            <li onClick={() => handleSetPreferenceToLS('first')}>
              <a>
                <Icon
                  icon={
                    sortPreference === 'first'
                      ? 'icon-park-solid:check-one'
                      : 'material-symbols:circle-outline'
                  }
                />{' '}
                First added
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Your saved businesses
        </li>
        {businesses.map((business, ind) => (
          <li key={business.id} className="list-row text-left">
            <div className="text-4xl font-thin opacity-30 tabular-nums">
              {(ind + 1).toString().padStart(2, '0')}
            </div>
            <div>
              <img
                className="size-10 rounded-box"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
              />
            </div>
            <div className="list-col-grow">
              <div>{business.businessName}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {business.city}
              </div>
            </div>
            <button className="btn btn-square btn-ghost">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </g>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p className="my-[25%]">There's nothing here, yet!</p>
  )
}

export default SavedBusinesses
