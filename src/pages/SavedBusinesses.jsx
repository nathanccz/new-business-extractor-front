function SavedBusinesses() {
  const businesses = JSON.parse(localStorage.getItem('savedBusinesses'))

  return businesses ? (
    <div className="min-h-[600px]">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Your saved businesses
        </li>
        {businesses.map((business, ind) => (
          <li className="list-row">
            <div className="text-4xl font-thin opacity-30 tabular-nums">
              {(ind + 1).toString().padStart(2, '0')}
            </div>
            {/* <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div> */}
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
