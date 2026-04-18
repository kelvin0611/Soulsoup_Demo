import { useNavigate } from 'react-router-dom'
import { Leaf, Stethoscope, MessageCircle, ChevronRight } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="welcome-page min-h-screen flex flex-col ink-wash-bg">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-tcm-green/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-tcm-brown/10 rounded-full blur-2xl"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Logo */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-tcm-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-10 h-10 text-tcm-green" />
          </div>
          <h1 className="title-xl text-3xl mb-2 text-tcm-green">SoulSoup</h1>
          <p className="text-tcm-brown text-sm tracking-widest">SOULSOUP</p>
          <p className="text-body mt-3">AI-Powered TCM Wellness Platform</p>
        </div>

        {/* Tagline */}
        <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-tcm-ink text-lg leading-relaxed">
            Discover Your Constitution · Find Your Soup<br />
            <span className="text-tcm-brown text-sm">Rooted in Thousands of Years of TCM Wisdom</span>
          </p>
        </div>

        {/* Entry points */}
        <div className="w-full space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {/* Patient entry */}
          <div 
            className="card-hover bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-tcm-gold/30 cursor-pointer"
            onClick={() => navigate('/test')}
          >
            <div className="flex items-center">
              <div className="w-14 h-14 bg-tcm-green/10 rounded-xl flex items-center justify-center mr-4">
                <Leaf className="w-7 h-7 text-tcm-green" />
              </div>
              <div className="flex-1">
                <h3 className="title-md text-tcm-green">I'm a Customer</h3>
                <p className="text-body text-xs mt-1">Test Constitution · Choose Soups · Stay Healthy</p>
              </div>
              <ChevronRight className="w-5 h-5 text-tcm-brown" />
            </div>
          </div>

          {/* AI Chatbot entry */}
          <div 
            className="card-hover bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-tcm-gold/30 cursor-pointer"
            onClick={() => navigate('/chat')}
          >
            <div className="flex items-center">
              <div className="w-14 h-14 bg-tcm-gold/20 rounded-xl flex items-center justify-center mr-4">
                <MessageCircle className="w-7 h-7 text-tcm-brown" />
              </div>
              <div className="flex-1">
                <h3 className="title-md text-tcm-brown">TCM AI Consultant</h3>
                <p className="text-body text-xs mt-1">Ask Questions · Get Advice · 24/7</p>
              </div>
              <ChevronRight className="w-5 h-5 text-tcm-brown" />
            </div>
          </div>

          {/* Doctor entry */}
          <div 
            className="card-hover bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-tcm-gold/30 cursor-pointer"
            onClick={() => navigate('/doctor/login')}
          >
            <div className="flex items-center">
              <div className="w-14 h-14 bg-tcm-brown/10 rounded-xl flex items-center justify-center mr-4">
                <Stethoscope className="w-7 h-7 text-tcm-brown" />
              </div>
              <div className="flex-1">
                <h3 className="title-md text-tcm-brown">I'm a TCM Practitioner</h3>
                <p className="text-body text-xs mt-1">Records · Analysis · AI Assistance</p>
              </div>
              <ChevronRight className="w-5 h-5 text-tcm-brown" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-xs text-gray-400">TCM ClinicLink Demo</p>
      </div>
    </div>
  )
}
