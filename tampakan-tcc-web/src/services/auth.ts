import { api } from './api'

export interface StudentLoginPayload {
  referenceNumber: string
  birthdate: string
}

export interface StudentLoginResponse {
  access_token: string
  refresh_token: string
  student: {
    id: number
    referenceNumber: string
    fullName: string
    status: string
  }
}

export interface AdminLoginPayload {
  email: string
  password: string
}

export interface AdminLoginResponse {
  access_token: string
  refresh_token: string
  user: {
    id: number
    email: string
    name: string
    role: string
  }
}

export interface StudentProfileResponse {
  refNo: string
  fullName: string
  birthdate: string
  contactNumber: string
  email: string | null
  address: string
  lastSchool: string
  desiredProgram: string
  status: string
  isTampakanResident: boolean | null
  admitType: string | null
  yearLevel: string | null
  schoolYear: string | null
  term: string | null
  lrn: string | null
  firstName: string | null
  middleName: string | null
  lastName: string | null
  suffix: string | null
  gender: string | null
  civilStatus: string | null
  citizenship: string | null
  birthplace: string | null
  religion: string | null
  telephoneNo: string | null
  currentAddress: string | null
  permanentAddress: string | null
  addressSameAsCurrent: boolean | null
  fatherFirstName: string | null
  fatherLastName: string | null
  fatherMiddleInitial: string | null
  fatherSuffix: string | null
  fatherMobile: string | null
  fatherEmail: string | null
  fatherOccupation: string | null
  motherFirstName: string | null
  motherLastName: string | null
  motherMiddleInitial: string | null
  motherSuffix: string | null
  motherMobile: string | null
  motherEmail: string | null
  motherOccupation: string | null
  guardianFirstName: string | null
  guardianLastName: string | null
  guardianMiddleInitial: string | null
  guardianSuffix: string | null
  guardianMobile: string | null
  guardianEmail: string | null
  guardianOccupation: string | null
  guardianRelationship: string | null
  referralSources: string | null
  submittedAt: string
}

export interface PreEnrollmentsQuery {
  status?: string
  course?: string
  page?: number
  limit?: number
}

export interface PreEnrollmentsResponse {
  items: {
    refNo: string
    fullName: string
    course: string
    status: string
    submittedAt: string
  }[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface UpdateStatusPayload {
  status: 'APPROVED' | 'REJECTED'
  rejectionReason?: string
}

export interface UpdateStatusResponse {
  refNo: string
  status: string
  message: string
}

export function studentLogin(data: StudentLoginPayload) {
  return api<StudentLoginResponse>('/api/auth/student/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function adminLogin(data: AdminLoginPayload) {
  return api<AdminLoginResponse>('/api/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getStudentProfile(token: string) {
  return api<StudentProfileResponse>('/api/students/profile', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function getPreEnrollments(token: string, query: PreEnrollmentsQuery = {}) {
  const params = new URLSearchParams()
  if (query.status) params.set('status', query.status)
  if (query.course) params.set('course', query.course)
  if (query.page) params.set('page', String(query.page))
  if (query.limit) params.set('limit', String(query.limit))
  const qs = params.toString()
  return api<PreEnrollmentsResponse>(`/api/admin/pre-enrollments${qs ? `?${qs}` : ''}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function updatePreEnrollmentStatus(token: string, refNo: string, data: UpdateStatusPayload) {
  return api<UpdateStatusResponse>(`/api/admin/pre-enrollments/${refNo}/status`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}
