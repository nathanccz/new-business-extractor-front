import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import Toast from '../components/Toast'
import NotesModal from '../components/NotesModal'

function SavedBusinesses() {
  const [businesses, setBusinesses] = useState(
    JSON.parse(localStorage.getItem('savedBusinesses'))
  )
  const [sortPreference, setSortPreference] = useState(
    localStorage.getItem('business_sort_preference')
  )
  const [toastActive, setToastActive] = useState(false)
  const [businessToEdit, setBusinessToEdit] = useState({})

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

  const handleClickDelete = async (id) => {
    const businessesInLocalStorage = JSON.parse(
      localStorage.getItem('savedBusinesses')
    )
    const filtered = businessesInLocalStorage.filter(
      (business) => business.id !== id
    )

    localStorage.setItem('savedBusinesses', JSON.stringify(filtered))
    setBusinesses(filtered)
    setToastActive(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setToastActive(false)
  }

  const handleClickAddNote = (obj) => {
    setBusinessToEdit(obj)
    document.getElementById('notes_modal').showModal()
  }

  return businesses.length > 0 ? (
    <>
      <div className="h-[600px] relative">
        <div className="w-full flex justify-end">
          <div className="dropdown dropdown-left">
            <div tabIndex={0} role="button" className="btn m-1">
              Sort <Icon icon="material-symbols:sort" className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm font-bold"
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
        <ul className="list bg-base-100 rounded-box shadow-md overflow-y-scroll max-h-[50vh]">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Your saved businesses
          </li>
          {businesses.map((business, ind) => (
            <li key={business.id} className="list-row text-left">
              <div className="text-4xl font-thin opacity-30 tabular-nums">
                {(ind + 1).toString().padStart(2, '0')}
              </div>

              <div className="list-col-grow">
                <div>{business.businessName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {business.city}
                </div>
              </div>
              <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className="btn m-1">
                  <Icon icon="uiw:more" className="text-lg" />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-200 rounded-box z-100 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a onClick={() => handleClickAddNote(business)}>
                      <Icon icon="material-symbols:add" className="text-lg" />
                      Add note
                    </a>
                  </li>
                  <li>
                    <a>
                      <Icon icon="proicons:note" className="text-lg" />
                      View notes
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleClickDelete(business.id)}>
                      <Icon
                        icon="material-symbols:delete"
                        className="text-lg"
                      />
                      Delete contact
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {toastActive && <Toast />}
      <NotesModal businessToEdit={businessToEdit} businesses={businesses} />
    </>
  ) : (
    <p className="my-[25%]">There's nothing here, yet!</p>
  )
}

export default SavedBusinesses
