import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ConstitutionType, TestResult, UserInfo } from '@/types'

interface UserState {
  testAnswers: { questionId: number; constitution: string; score: number }[]
  testResult: TestResult | null
  userInfo: UserInfo
  addAnswer: (questionId: number, constitution: string, score: number) => void
  setTestResult: (result: TestResult) => void
  clearTest: () => void
  updateUserInfo: (info: Partial<UserInfo>) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      testAnswers: [],
      testResult: null,
      userInfo: {
        name: '',
        phone: '',
        address: '',
      },

      addAnswer: (questionId, constitution, score) => {
        const answers = get().testAnswers
        const existingIndex = answers.findIndex(a => a.questionId === questionId)
        
        if (existingIndex >= 0) {
          answers[existingIndex] = { questionId, constitution, score }
        } else {
          answers.push({ questionId, constitution, score })
        }
        
        set({ testAnswers: [...answers] })
      },

      setTestResult: (result) => {
        set({ testResult: result })
      },

      clearTest: () => {
        set({ testAnswers: [], testResult: null })
      },

      updateUserInfo: (info) => {
        set((state) => ({
          userInfo: { ...state.userInfo, ...info }
        }))
      },
    }),
    {
      name: 'tcm-user-storage',
    }
  )
)
