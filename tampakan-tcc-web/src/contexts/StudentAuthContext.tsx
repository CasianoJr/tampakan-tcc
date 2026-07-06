import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { studentLogin, type StudentLoginPayload, type StudentLoginResponse } from '../services/auth'

interface StudentAuthState {
  student: StudentLoginResponse['student'] | null
  accessToken: string | null
  isAuthenticated: boolean
}

interface StudentAuthContextType extends StudentAuthState {
  login: (payload: StudentLoginPayload) => Promise<void>
  logout: () => void
}

const StudentAuthContext = createContext<StudentAuthContextType | null>(null)

export function StudentAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudentAuthState>(() => {
    const accessToken = sessionStorage.getItem('student_access_token')
    const studentStr = sessionStorage.getItem('student_data')
    const student = studentStr ? JSON.parse(studentStr) : null
    return { student, accessToken, isAuthenticated: !!accessToken }
  })

  const login = useCallback(async (payload: StudentLoginPayload) => {
    const res = await studentLogin(payload)
    sessionStorage.setItem('student_access_token', res.access_token)
    sessionStorage.setItem('student_refresh_token', res.refresh_token)
    sessionStorage.setItem('student_data', JSON.stringify(res.student))
    setState({ student: res.student, accessToken: res.access_token, isAuthenticated: true })
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('student_access_token')
    sessionStorage.removeItem('student_refresh_token')
    sessionStorage.removeItem('student_data')
    setState({ student: null, accessToken: null, isAuthenticated: false })
  }, [])

  return (
    <StudentAuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </StudentAuthContext.Provider>
  )
}

export function useStudentAuth() {
  const ctx = useContext(StudentAuthContext)
  if (!ctx) throw new Error('useStudentAuth must be used within StudentAuthProvider')
  return ctx
}
