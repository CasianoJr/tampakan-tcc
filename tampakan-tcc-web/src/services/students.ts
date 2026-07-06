import { api } from './api'

export interface PreEnrollPayload {
  fullName: string
  birthdate: string
  contactNumber: string
  email?: string
  address: string
  lastSchool: string
  desiredProgram: string
  guardianName: string
  guardianContact: string
  isTampakanResident?: boolean
  admitType?: string
  yearLevel?: string
  schoolYear?: string
  term?: string
  lrn?: string
  firstName?: string
  middleName?: string
  lastName?: string
  suffix?: string
  gender?: string
  civilStatus?: string
  citizenship?: string
  birthplace?: string
  religion?: string
  telephoneNo?: string
  currentAddress?: string
  permanentAddress?: string
  addressSameAsCurrent?: boolean
  fatherFirstName?: string
  fatherLastName?: string
  fatherMiddleInitial?: string
  fatherSuffix?: string
  fatherMobile?: string
  fatherEmail?: string
  fatherOccupation?: string
  motherFirstName?: string
  motherLastName?: string
  motherMiddleInitial?: string
  motherSuffix?: string
  motherMobile?: string
  motherEmail?: string
  motherOccupation?: string
  guardianFirstName?: string
  guardianLastName?: string
  guardianMiddleInitial?: string
  guardianSuffix?: string
  guardianMobile?: string
  guardianEmail?: string
  guardianOccupation?: string
  guardianRelationship?: string
  referralSources?: string
}

export interface PreEnrollResponse {
  message: string
  referenceNumber: string
  fullName: string
  status: string
}

export function submitPreEnroll(data: PreEnrollPayload) {
  return api<PreEnrollResponse>('/api/students/pre-enroll', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
