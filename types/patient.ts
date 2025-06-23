export interface Patient {
  id: string
  caseNo: string
  name: string
  age: number
  gender: "Male" | "Female" | "Other"
  mobileNumber: string
  address: string
  familyHistory: string
  generalComplaint: string
  mothersName: string
  fathersName: string
  medicalHistory: string
  photo?: string
  payment: string
}
