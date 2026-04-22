import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OrderRecord } from '@/types'

interface OrderState {
  orders: OrderRecord[]
  latestOrderId: string | null
  createOrder: (order: OrderRecord) => void
  getLatestOrder: () => OrderRecord | null
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      latestOrderId: null,

      createOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
          latestOrderId: order.id,
        }))
      },

      getLatestOrder: () => {
        const { orders, latestOrderId } = get()
        if (!latestOrderId) return null
        return orders.find((order) => order.id === latestOrderId) || null
      },
    }),
    {
      name: 'tcm-order-storage',
    }
  )
)
