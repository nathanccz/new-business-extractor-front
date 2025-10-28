import { Icon } from '@iconify/react'

function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">API</a>
        <a className="link link-hover">Privacy</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <Icon
              icon="streamline-pixel:coding-apps-websites-programming-browser"
              className="text-2xl"
            />
          </a>
          <a>
            <Icon icon="mdi:github" className="text-2xl" />
          </a>
          <a>
            <Icon icon="ic:baseline-email" className="text-2xl" />
          </a>
        </div>
      </nav>
      <aside>
        <p className="italic">
          Built with ❤️ by{' '}
          <a href="" target="_blank" className="underline">
            Nathan C
          </a>
          . This site is not affiliated with or endorsed by the City of Los
          Angeles.
        </p>
      </aside>
    </footer>
  )
}

export default Footer
