import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function OrderSuccess() {
  const navigate = useNavigate()
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    setOrderNumber(Date.now().toString().slice(-8))
  }, [])

  return (
    <div className="success-page min-h-screen flex flex-col items-center justify-center px-6">
      {/* Success icon */}
      <div className="success-icon mb-6">
        <div className="check-circle">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
      </div>

      {/* Success message */}
      <h2 className="title-xl mb-2">訂單提交成功</h2>
      <p className="text-body text-center mb-8">
        您的養生湯包訂單已確認<br />
        我們將盡快為您準備食材
      </p>

      {/* Order info */}
      <div className="w-full bg-white rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <span className="text-gray-500">訂單編號</span>
          <span className="font-mono font-medium">#TCM{orderNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">訂單狀態</span>
          <span className="tag tag-green">已確認</span>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 text-center w-full">
        <p className="text-sm text-gray-500 mb-4">到店自取請出示此二維碼</p>
        <div className="w-40 h-40 bg-tcm-paper rounded-xl mx-auto flex items-center justify-center relative overflow-hidden">
          <div className="qr-pattern">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="qr-block"></div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <CheckCircle className="w-6 h-6 text-tcm-green" />
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">有效期：7天</p>
      </div>

      {/* Action buttons */}
      <div className="w-full space-y-3">
        <button className="btn-primary w-full flex items-center justify-center" onClick={() => navigate('/')}>
          <span>返回首頁</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
        <button className="btn-secondary w-full" onClick={() => alert('訂單詳情功能開發中')}>
          查看訂單詳情
        </button>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-8 text-center">
        感謝您選擇靈湯，願您身體健康
      </p>

      <style>{`
        .success-page {
          background: linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 100%);
        }
        .success-icon {
          animation: scaleIn 0.5s ease-out;
        }
        .check-circle {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #4A7C59 0%, #7FB285 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(74, 124, 89, 0.3);
        }
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .qr-pattern {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
          width: 100%;
          height: 100%;
          padding: 8px;
        }
        .qr-block {
          background: #2C2C2C;
          border-radius: 2px;
        }
        .qr-block:nth-child(3n) {
          opacity: 0.3;
        }
        .qr-block:nth-child(5n) {
          opacity: 0.6;
        }
      `}</style>
    </div>
  )
}
