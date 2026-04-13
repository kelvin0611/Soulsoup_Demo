import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Lock, Loader2 } from 'lucide-react'
import { useDoctorStore } from '@/stores/doctorStore'

export default function DoctorLogin() {
  const navigate = useNavigate()
  const { login } = useDoctorStore()
  
  const [form, setForm] = useState({
    username: 'doctor',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!form.username || !form.password) {
      setError('請輸入用戶名和密碼')
      return
    }

    setLoading(true)
    setError('')

    setTimeout(() => {
      const success = login(form.password)
      if (success) {
        navigate('/doctor/patients')
      } else {
        setError('密碼錯誤，請重試')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="login-page min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 py-4">
        <ArrowLeft className="w-6 h-6 text-tcm-ink cursor-pointer" onClick={() => navigate('/')} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-20">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-tcm-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-tcm-green" />
          </div>
          <h1 className="title-xl">醫師登入</h1>
          <p className="text-body mt-2">仁和堂中醫診所管理系統</p>
        </div>

        {/* Form */}
        <div className="w-full space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                placeholder="請輸入用戶名"
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="請輸入密碼"
                className="flex-1 bg-transparent outline-none text-sm"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>

          {error && (
            <p className="text-tcm-red text-sm text-center">{error}</p>
          )}

          <button 
            className="btn-primary w-full mt-6 flex items-center justify-center"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? '登入中...' : '登入'}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Demo 密碼：123456
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-xs text-gray-400">TCM ClinicLink 醫師端</p>
      </div>

      <style>{`
        .login-page {
          background: linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 100%);
        }
      `}</style>
    </div>
  )
}
