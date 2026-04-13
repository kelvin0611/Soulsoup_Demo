import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Truck, Zap, Store, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'

const deliveryMethods = [
  { id: 'standard', name: '標準配送', desc: '3-5個工作日', price: 30, icon: Truck },
  { id: 'express', name: '快速配送', desc: '1-2個工作日', price: 50, icon: Zap },
  { id: 'selfpick', name: '到店自取', desc: '診所營業時間', price: 0, icon: Store },
]

export default function OrderConfirm() {
  const navigate = useNavigate()
  const { items, totalPrice, savings, clearCart } = useCartStore()
  const { userInfo, updateUserInfo } = useUserStore()

  const [form, setForm] = useState({
    name: userInfo.name || '',
    phone: userInfo.phone || '',
    address: userInfo.address || '',
  })
  const [selectedDelivery, setSelectedDelivery] = useState('standard')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deliveryFee = useMemo(() => {
    const method = deliveryMethods.find(m => m.id === selectedDelivery)
    return method?.price || 0
  }, [selectedDelivery])

  const totalAmount = totalPrice + deliveryFee

  const canSubmit = form.name && form.phone && form.address

  const handleSubmit = () => {
    if (!canSubmit) {
      alert('請填寫完整配送信息')
      return
    }

    updateUserInfo(form)
    setIsSubmitting(true)

    setTimeout(() => {
      clearCart()
      navigate('/success')
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <div className="order-page min-h-screen flex flex-col items-center justify-center px-6">
        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">購物車是空的</p>
        <button className="btn-primary" onClick={() => navigate('/soups')}>去選購</button>
      </div>
    )
  }

  return (
    <div className="order-page min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <ArrowLeft className="w-6 h-6 text-tcm-ink cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="title-md flex-1 text-center">確認訂單</h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Items */}
        <div className="px-4 py-4">
          <h3 className="title-md mb-3">商品清單</h3>
          <div className="bg-white rounded-2xl p-4 space-y-4">
            {items.map(item => (
              <div key={item.soup.id} className="flex items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-16 h-16 bg-tcm-paper rounded-lg overflow-hidden mr-3">
                  <img 
                    src={item.soup.image} 
                    alt={item.soup.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.soup.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.soup.servings}人份</p>
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
          <h3 className="title-md mb-3">配送信息</h3>
          <div className="bg-white rounded-2xl p-4 space-y-4">
            <div>
              <label className="text-sm text-gray-500 block mb-2">收件人姓名</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="請輸入姓名"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-2">聯絡電話</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="請輸入電話號碼"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-2">配送地址</label>
              <textarea
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                rows={3}
                placeholder="請輸入詳細地址"
                className="textarea-field"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Delivery method */}
        <div className="px-4 pb-4">
          <h3 className="title-md mb-3">配送方式</h3>
          <div className="bg-white rounded-2xl p-2">
            {deliveryMethods.map(method => {
              const Icon = method.icon
              return (
                <div
                  key={method.id}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors ${
                    selectedDelivery === method.id ? 'bg-tcm-green/10' : ''
                  }`}
                  onClick={() => setSelectedDelivery(method.id)}
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
              <span className="text-gray-500">商品總額</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">運費</span>
              <span>${deliveryFee}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-gray-500">優惠</span>
                <span className="text-tcm-red">-${savings}</span>
              </div>
            )}
            <div className="border-t border-gray-200 mt-2 pt-3 flex justify-between">
              <span className="font-medium">合計</span>
              <span className="text-xl font-bold text-tcm-red">${totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-30">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-sm">合計：</span>
            <span className="text-xl font-bold text-tcm-red">${totalAmount}</span>
          </div>
          <button 
            className="btn-primary px-8"
            disabled={!canSubmit || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? '提交中...' : '提交訂單'}
          </button>
        </div>
      </div>

      <style>{`
        .order-page {
          background: linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 100%);
        }
      `}</style>
    </div>
  )
}
