import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router'
import { StudentAuthProvider } from './contexts/StudentAuthContext'
import { AdminAuthProvider } from './contexts/AdminAuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudentAuthProvider>
      <AdminAuthProvider>
        <RouterProvider router={router} />
      </AdminAuthProvider>
    </StudentAuthProvider>
  </StrictMode>,
)
