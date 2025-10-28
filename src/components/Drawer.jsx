import { Icon } from '@iconify/react'

function Drawer() {
  return (
    <div className="drawer">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-1" className="btn drawer-button">
          <Icon icon="pepicons-print:menu" className="text-lg" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-1"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4 text-lg">
          {/* Sidebar content here */}
          <li>
            <a>
              <Icon icon="material-symbols:home" className="text-lg" /> Home
            </a>
          </li>
          <li>
            <a>
              <Icon icon="dashicons:cloud-saved" className="text-lg" /> Saved
              Businesses
            </a>
          </li>
          <li>
            <a>
              <Icon icon="mdi:about" className="text-lg" /> About
            </a>
          </li>
          <li>
            <a>
              <Icon icon="gg:trending" className="text-lg" /> API
            </a>
          </li>
          <li>
            <a>
              <Icon icon="ic:baseline-privacy-tip" className="text-lg" />{' '}
              Privacy
            </a>
          </li>
          <li>
            <a>
              <Icon icon="mdi:contact" className="text-lg" /> Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Drawer
