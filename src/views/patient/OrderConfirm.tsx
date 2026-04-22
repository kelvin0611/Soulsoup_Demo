import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Truck, Zap, Store, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import { useOrderStore } from '@/stores/orderStore'
import type { DeliveryMethod } from '@/types'

const deliveryMethods = [
  { id: 'standard', name: 'Standard Delivery', desc: '3–5 business days', price: 30, icon: Truck },
  { id: 'express', name: 'Express Delivery', desc: '1–2 business days', price: 50, icon: Zap },
  { id: 'selfpick', name: 'Self Pick-up', desc: 'During clinic hours', price: 0, icon: Store },
]

export default function OrderConfirm() {
  const navigate = useNavigate()
  const { items, totalPrice, savings, clearCart } = useCartStore()
  const { userInfo, updateUserInfo } = useUserStore()
  const { createOrder } = useOrderStore()

  const [form, setForm] = useState({
    name: userInfo.name || '',
    phone: userInfo.phone || '',
    address: userInfo.address || '',
  })
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethod>('standard')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const deliveryFee = useMemo(() => {
    const method = deliveryMethods.find(m => m.id === selectedDelivery)
    return method?.price || 0
  }, [selectedDelivery])

  const totalAmount = totalPrice + deliveryFee

  const errors = useMemo(() => {
    const nextErrors = {
      name: '',
      phone: '',
      address: '',
    }
    const name = form.name.trim()
    const phone = form.phone.trim()
    const address = form.address.trim()
    const phoneRegex = /^\+?[0-9\s-]{8,15}$/

    if (!name) {
      nextErrors.name = 'Recipient name is required'
    } else if (name.length < 2) {
      nextErrors.name = 'Name should be at least 2 characters'
    }

    if (!phone) {
      nextErrors.phone = 'Contact number is required'
    } else if (!phoneRegex.test(phone)) {
      nextErrors.phone = 'Please enter a valid phone number'
    }

    if (selectedDelivery !== 'selfpick') {
      if (!address) {
        nextErrors.address = 'Delivery address is required'
      } else if (address.length < 10) {
        nextErrors.address = 'Address should be at least 10 characters'
      }
    }

    return nextErrors
  }, [form.address, form.name, form.phone, selectedDelivery])

  const canSubmit = !errors.name && !errors.phone && !errors.address

  const handleSubmit = () => {
    if (!canSubmit) {
      setSubmitSuccess('')
      setSubmitError('Please fix the highlighted fields before placing the order.')
      return
    }

    setSubmitError('')
    setSubmitSuccess('')
    setIsSubmitting(true)

    setTimeout(() => {
      try {
        const orderId = `TCM${Date.now().toString().slice(-8)}`
        const normalizedForm = {
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: selectedDelivery === 'selfpick' ? 'Self Pick-up at Clinic' : form.address.trim(),
        }

        updateUserInfo(normalizedForm)
        createOrder({
          id: orderId,
          createdAt: new Date().toISOString(),
          items,
          userInfo: normalizedForm,
          deliveryMethod: selectedDelivery,
          deliveryFee,
          subtotal: totalPrice,
          savings,
          totalAmount,
          status: 'confirmed',
        })

        setSubmitSuccess('Order submitted successfully! Redirecting...')
        clearCart()
        navigate('/success')
      } catch (_error) {
        setSubmitError('Unable to submit the order. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <div className="order-page min-h-screen flex flex-col items-center justify-center px-6">
        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <button className="btn-primary" onClick={() => navigate('/soups')}>Browse Soups</button>
      </div>
    )
  }

  return (
    <div className="order-page min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <ArrowLeft className="w-6 h-6 text-tcm-ink cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="title-md flex-1 text-center">Confirm Order</h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Items */}
        <div className="px-4 py-4">
          <h3 className="title-md mb-3">Order Items</h3>
          <div className="bg-white rounded-2xl p-4 space-y-4">
            {items.map(item => (
              <div key={item.soup.id} className="flex items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-16 h-16 bg-tcm-paper rounded-lg overflow-hidden mr-3">
                  <img 
                    src={item.soup.image} 
                    alt={item.soup.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.soup.nameEn}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.soup.servings} servings</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-tcm-red">${item.soup.price * item.quantity}</p>
                  <p className="text-xs text-gray-500">x{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery info */}
        <div className="px-4 pb-4">
          <h3 className="title-md mb-3">Delivery Details</h3>
          <div className="bg-white rounded-2xl p-4 space-y-4">
            <div>
              <label className="text-sm text-gray-500 block mb-2">Recipient Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your name"
                className={`input-field ${errors.name ? 'border-red-300 focus:ring-red-300' : ''}`}
              />
              {errors.name && <p className="text-xs text-tcm-red mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-2">Contact Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="Enter phone number"
                className={`input-field ${errors.phone ? 'border-red-300 focus:ring-red-300' : ''}`}
              />
              {errors.phone && <p className="text-xs text-tcm-red mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-2">
                Delivery Address
                {selectedDelivery === 'selfpick' && <span className="ml-1 text-tcm-green">(Not required for self pick-up)</span>}
              </label>
              <textarea
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                rows={3}
                placeholder={selectedDelivery === 'selfpick' ? 'You can skip this field' : 'Enter full address'}
                disabled={selectedDelivery === 'selfpick'}
                className={`textarea-field ${errors.address ? 'border-red-300 focus:ring-red-300' : ''} ${selectedDelivery === 'selfpick' ? 'opacity-60' : ''}`}
              ></textarea>
              {errors.address && <p className="text-xs text-tcm-red mt-1">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Delivery method */}
        <div className="px-4 pb-4">
          <h3 className="title-md mb-3">Delivery Method</h3>
          <div className="bg-white rounded-2xl p-2">
            {deliveryMethods.map(method => {
              const Icon = method.icon
              return (
                <div
                  key={method.id}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors ${
                    selectedDelivery === method.id ? 'bg-tcm-green/10' : ''
                  }`}
                  onClick={() => setSelectedDelivery(method.id as DeliveryMethod)}
                >
                  <div className="w-10 h-10 bg-tcm-paper rounded-lg flex items-center justify-center mr-3">
                    <Icon className="w-5 h-5 text-tcm-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{method.name}</p>
                    <p className="text-xs text-gray-500">{method.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${method.price}</p>
                    {selectedDelivery === method.id && (
                      <div className="w-5 h-5 bg-tcm-green rounded-full flex items-center justify-center ml-auto mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="px-4 pb-32">
          <div className="bg-white rounded-2xl p-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Shipping</span>
              <span>${deliveryFee}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Discount</span>
                <span className="text-tcm-red">-${savings}</span>
              </div>
            )}
            <div className="border-t border-gray-200 mt-2 pt-3 flex justify-between">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold text-tcm-red">${totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-30">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-sm">Total: </span>
            <span className="text-xl font-bold text-tcm-red">${totalAmount}</span>
          </div>
          <button
            className={`btn-primary px-8 ${isSubmitting ? 'opacity-70' : ''}`}
            disabled={!canSubmit || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Submitting...' : 'Place Order'}
          </button>
        </div>
        {submitError && <p className="max-w-md mx-auto mt-2 text-xs text-tcm-red">{submitError}</p>}
        {submitSuccess && <p className="max-w-md mx-auto mt-2 text-xs text-tcm-green">{submitSuccess}</p>}
      </div>

      <style>{`
        .order-page {
          background: linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 100%);
        }
      `}</style>
    </div>
  )
}
