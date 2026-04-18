import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage } from '@/types'
import { getBotResponse, getSoupById } from '@/mocks/chatResponses'

interface ChatState {
  messages: ChatMessage[]
  isTyping: boolean
  sendMessage: (text: string) => void
  addBotMessage: (content: string, options?: { soupId?: string; suggestions?: string[] }) => void
  clearChat: () => void
}

const WELCOME_MSG: ChatMessage = {
  id: 'welcome',
  role: 'bot',
  content: "Hello! I'm your TCM AI Consultant. I can help you understand your constitution, recommend wellness soups, and answer general TCM questions. What would you like to know?",
  timestamp: Date.now(),
  suggestions: ["What's my constitution?", "Recommend a soup", "I feel tired lately"],
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [WELCOME_MSG],
      isTyping: false,

      sendMessage: (text) => {
        const userMsg: ChatMessage = {
          id: `u-${Date.now()}`,
          role: 'user',
          content: text,
          timestamp: Date.now(),
        }

        set(state => ({
          messages: [...state.messages, userMsg],
          isTyping: true,
        }))

        // Simulate AI thinking delay
        const delay = 800 + Math.random() * 600
        setTimeout(() => {
          const response = getBotResponse(text)
          get().addBotMessage(response.text, {
            soupId: response.soupId,
            suggestions: response.suggestions,
          })
        }, delay)
      },

      addBotMessage: (content, options = {}) => {
        const soupCard = options.soupId ? getSoupById(options.soupId) : undefined

        const botMsg: ChatMessage = {
          id: `b-${Date.now()}`,
          role: 'bot',
          content,
          timestamp: Date.now(),
          soupCard,
          suggestions: options.suggestions,
        }

        set(state => ({
          messages: [...state.messages, botMsg],
          isTyping: false,
        }))
      },

      clearChat: () => {
        set({
          messages: [{
            ...WELCOME_MSG,
            id: `welcome-${Date.now()}`,
            timestamp: Date.now(),
          }],
          isTyping: false,
        })
      },
    }),
    {
      name: 'tcm-chat-storage',
    }
  )
)
