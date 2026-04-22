import { useNavigate } from 'react-router-dom'
import { ArrowLeft, PackageCheck } from 'lucide-react'
import { useOrderStore } from '@/stores/orderStore'

const deliveryMethodLabelMap = {
  standard: 'Standard Delivery',
  express: 'Express Delivery',
  selfpick: 'Self Pick-up',
}

const statusLabelMap = {
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready for Pickup',
}

export default function OrderDetail() {
  const navigate = useNavigate()
  const latestOrder = useOrderStore((state) => state.getLatestOrder())

  if (!latestOrder) {
    return (
      <div className="order-detail-page min-h-screen flex flex-col items-center justify-center px-6">
        <PackageCheck className="w-14 h-14 text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4 text-center">No recent order was found.</p>
        <button className="btn-primary" onClick={() => navigate('/soups')}>
          Browse Soups
        </button>
      </div>
    )
  }

  return (
    <div className="order-detail-page min-h-screen flex flex-col">
      <div className="bg-white/90 backdrop-blur-md px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <ArrowLeft className="w-6 h-6 text-tcm-ink cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="title-md flex-1 text-center">Order Details</h1>
        <div className="w-6"></div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Order Number</span>
            <span className="font-mono text-sm">{latestOrder.id}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Created At</span>
            <span className="text-sm">{new Date(latestOrder.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-3">
            <span className="text-gray-500 text-sm">Status</span>
            <span className="tag tag-green">{statusLabelMap[latestOrder.status]}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-3">
          <h3 className="font-semibold">Items</h3>
          {latestOrder.items.map((item) => (
            <div key={item.soup.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-medium">{item.soup.nameEn}</p>
                <p className="text-xs text-gray-500">x{item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-tcm-red">${item.soup.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-2">
          <h3 className="font-semibold mb-1">Delivery</h3>
          <p className="text-sm text-gray-600">Method: {deliveryMethodLabelMap[latestOrder.deliveryMethod]}</p>
          <p className="text-sm text-gray-600">Recipient: {latestOrder.userInfo.name}</p>
          <p className="text-sm text-gray-600">Phone: {latestOrder.userInfo.phone}</p>
          <p className="text-sm text-gray-600">Address: {latestOrder.userInfo.address}</p>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <div className="flex justify-between py-1">
            <span className="text-gray-500">Subtotal</span>
            <span>${latestOrder.subtotal}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-500">Shipping</span>
            <span>${latestOrder.deliveryFee}</span>
          </div>
          {latestOrder.savings > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Discount</span>
              <span className="text-tcm-red">-${latestOrder.savings}</span>
            </div>
          )}
          <div className="border-t border-gray-100 mt-2 pt-3 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-tcm-red">${latestOrder.totalAmount}</span>
          </div>
        </div>
      </div>

      <style>{`
        .order-detail-page {
          background: linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 100%);
        }
      `}</style>
    </div>
  )
}
