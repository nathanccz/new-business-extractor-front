import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

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
            <NavLink to={'/'}>
              <Icon icon="material-symbols:home" className="text-lg" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to={'/saved'}>
              <Icon icon="dashicons:cloud-saved" className="text-lg" /> Saved
              Businesses
            </NavLink>
          </li>
          <li>
            <NavLink to={'/notifications'}>
              <Icon icon="mingcute:notification-fill" className="text-lg" />{' '}
              Notifications
            </NavLink>
          </li>
          <li>
            <a>
              <Icon icon="mdi:about" className="text-lg" /> About
            </a>
          </li>
          <li>
            <NavLink to={'/api-documentation'}>
              <Icon icon="material-symbols:cloud" className="text-lg" /> API
            </NavLink>
          </li>
          <li>
            <a>
              <Icon icon="ic:baseline-privacy-tip" className="text-lg" />{' '}
              Privacy
            </a>
          </li>
          <li>
            <NavLink to={'/contact'}>
              <Icon icon="mdi:contact" className="text-lg" /> Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Drawer
