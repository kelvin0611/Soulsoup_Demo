import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Patient, MedicalRecord, DoctorInfo } from '@/types'
import { patients, searchPatients, getPatientById, addMedicalRecord } from '@/mocks/patients'

interface DoctorState {
  isLoggedIn: boolean
  doctorInfo: DoctorInfo
  currentPatient: Patient | null
  searchQuery: string
  filteredPatients: Patient[]
  login: (password: string) => boolean
  logout: () => void
  selectPatient: (patientId: string) => void
  clearCurrentPatient: () => void
  createRecord: (record: Omit<MedicalRecord, 'id'>) => MedicalRecord
  setSearchQuery: (query: string) => void
}

export const useDoctorStore = create<DoctorState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      doctorInfo: {
        name: 'Dr. Huang',
        title: 'Registered TCM Practitioner',
        clinic: 'Renhe TCM Clinic',
      },
      currentPatient: null,
      searchQuery: '',
      filteredPatients: patients,

      login: (password) => {
        if (password === '123456') {
          set({ isLoggedIn: true })
          return true
        }
        return false
      },

      logout: () => {
        set({ isLoggedIn: false, currentPatient: null })
      },

      selectPatient: (patientId) => {
        const patient = getPatientById(patientId)
        set({ currentPatient: patient || null })
      },

      clearCurrentPatient: () => {
        set({ currentPatient: null })
      },

      createRecord: (record) => {
        const currentPatient = get().currentPatient
        if (!currentPatient) throw new Error('No patient selected')
        return addMedicalRecord(currentPatient.id, record)
      },

      setSearchQuery: (query) => {
        set({ 
          searchQuery: query,
          filteredPatients: query ? searchPatients(query) : patients
        })
      },
    }),
    {
      name: 'tcm-doctor-storage',
    }
  )
)
