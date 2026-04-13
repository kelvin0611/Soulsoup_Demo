import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SoupPack, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  totalOriginalPrice: number
  savings: number
  addToCart: (soup: SoupPack, quantity?: number) => void
  removeFromCart: (soupId: string) => void
  updateQuantity: (soupId: string, quantity: number) => void
  clearCart: () => void
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.soup.price * item.quantity, 0)
  const totalOriginalPrice = items.reduce((sum, item) => sum + item.soup.originalPrice * item.quantity, 0)
  const savings = totalOriginalPrice - totalPrice
  return { totalItems, totalPrice, totalOriginalPrice, savings }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      totalOriginalPrice: 0,
      savings: 0,

      addToCart: (soup, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(item => item.soup.id === soup.id)
        
        if (existingItem) {
          existingItem.quantity += quantity
        } else {
          items.push({ soup, quantity })
        }
        
        const totals = calculateTotals(items)
        set({ items: [...items], ...totals })
      },

      removeFromCart: (soupId) => {
        const items = get().items.filter(item => item.soup.id !== soupId)
        const totals = calculateTotals(items)
        set({ items, ...totals })
      },

      updateQuantity: (soupId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(soupId)
          return
        }
        
        const items = get().items
        const item = items.find(item => item.soup.id === soupId)
        if (item) {
          item.quantity = quantity
          const totals = calculateTotals(items)
          set({ items: [...items], ...totals })
        }
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0, totalOriginalPrice: 0, savings: 0 })
      },
    }),
    {
      name: 'tcm-cart-storage',
    }
  )
)
