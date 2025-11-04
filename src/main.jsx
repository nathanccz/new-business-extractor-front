import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import SavedBusinesses from './pages/SavedBusinesses.jsx'
import Main from './components/Main.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Contact from './pages/Contact.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/saved',
        element: <SavedBusinesses />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
