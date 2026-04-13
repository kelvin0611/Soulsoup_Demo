// Constitution Types
export interface ConstitutionType {
  id: string
  name: string
  nameEn: string
  description: string
  characteristics: string[]
  recommendations: string[]
  color: string
  image: string
}

export interface Question {
  id: number
  text: string
  options: {
    label: string
    score: number
    constitution: string
  }[]
}

export interface TestResult {
  primary: ConstitutionType
  scores: Record<string, number>
  allScores: { constitution?: ConstitutionType; score: number }[]
}

// Soup Types
export interface SoupPack {
  id: string
  name: string
  nameEn: string
  description: string
  price: number
  originalPrice: number
  image: string
  tags: string[]
  ingredients: string[]
  benefits: string[]
  suitableFor: string[]
  cookTime: string
  servings: number
  isHot?: boolean
}

// Patient Types
export interface MedicalRecord {
  id: string
  date: string
  symptoms: string
  diagnosis: string
  prescription: string
  constitution: string
  notes: string
  ocrImage?: string
}

export interface Patient {
  id: string
  name: string
  gender: '男' | '女'
  age: number
  phone: string
  constitution: string
  lastVisit: string
  totalVisits: number
  image?: string
  records: MedicalRecord[]
}

// User Types
export interface UserInfo {
  name: string
  phone: string
  address: string
}

export interface CartItem {
  soup: SoupPack
  quantity: number
}

export interface DoctorInfo {
  name: string
  title: string
  clinic: string
}
