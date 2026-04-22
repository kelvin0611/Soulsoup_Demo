import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Leaf, Loader2, ShoppingBag } from 'lucide-react'
import { useChatStore } from '@/stores/chatStore'
import { quickQuestions } from '@/mocks/chatResponses'
import type { ChatMessage } from '@/types'

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-tcm-green/10 flex items-center justify-center flex-shrink-0">
        <Leaf className="w-4 h-4 text-tcm-green" />
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-tcm-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-tcm-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-tcm-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

function SoupCardEmbed({ soup, onView }: { soup: NonNullable<ChatMessage['soupCard']>; onView: () => void }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-tcm-gold/20 mt-2 mb-1 max-w-[260px]">
      <div className="h-28 overflow-hidden">
        <img src={soup.image} alt={soup.nameEn} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h4 className="text-sm font-semibold text-tcm-ink line-clamp-1">{soup.nameEn}</h4>
        <div className="flex items-center justify-between mt-2">
          <span className="text-tcm-red font-bold text-sm">${soup.price}</span>
          <button
            onClick={onView}
            className="flex items-center text-xs text-tcm-green font-medium bg-tcm-green/10 px-3 py-1 rounded-full"
          >
            <ShoppingBag className="w-3 h-3 mr-1" />
            View
          </button>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ msg, onSuggestion, onViewSoup }: {
  msg: ChatMessage
  onSuggestion: (text: string) => void
  onViewSoup: () => void
}) {
  const isUser = msg.role === 'user'

  return (
    <div className={`flex items-end gap-2 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-tcm-green/10 flex items-center justify-center flex-shrink-0">
          <Leaf className="w-4 h-4 text-tcm-green" />
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-3 shadow-sm ${
            isUser
              ? 'bg-tcm-green text-white rounded-2xl rounded-br-sm'
              : 'bg-white text-tcm-ink rounded-2xl rounded-bl-sm'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
        </div>

        {!isUser && msg.soupCard && (
          <SoupCardEmbed soup={msg.soupCard} onView={onViewSoup} />
        )}

        {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {msg.suggestions.map(s => (
              <button
                key={s}
                onClick={() => onSuggestion(s)}
                className="px-3 py-1.5 bg-tcm-gold/20 text-tcm-brown rounded-full text-xs font-medium hover:bg-tcm-gold/30 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <span className={`text-[10px] text-gray-400 mt-1 ${isUser ? 'mr-1' : 'ml-10'}`}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}

export default function ChatBot() {
  const navigate = useNavigate()
  const { messages, isTyping, sendMessage, clearChat } = useChatStore()
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const handleSend = () => {
    const text = input.trim()
    if (!text || isSending) return

    setIsSending(true)
    setInput('')
    sendMessage(text)

    setTimeout(() => setIsSending(false), 1000)
  }

  const handleSuggestion = (text: string) => {
    if (isSending) return
    setIsSending(true)
    sendMessage(text)
    setTimeout(() => setIsSending(false), 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="chat-page min-h-screen flex flex-col bg-gradient-to-b from-[#FDF8F3] to-[#F5EDE4]">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <ArrowLeft className="w-6 h-6 text-tcm-ink cursor-pointer" onClick={() => navigate(-1)} />
        <div className="flex-1 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-tcm-green rounded-full animate-pulse" />
          <h1 className="title-md">TCM AI Consultant</h1>
        </div>
        <button
          onClick={clearChat}
          className="text-xs text-gray-400 hover:text-tcm-red transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {/* Intro badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-tcm-green/10 text-tcm-green text-xs px-4 py-1.5 rounded-full flex items-center gap-2">
            <Leaf className="w-3 h-3" />
            AI-powered TCM wellness assistant
          </div>
        </div>

        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            onSuggestion={handleSuggestion}
            onViewSoup={() => navigate('/soups', { state: { fromChat: true } })}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div className="h-4" />
      </div>

      {/* Quick questions */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-100 px-4 py-2">
        <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider">Quick Questions</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {quickQuestions.map(q => (
            <button
              key={q}
              onClick={() => handleSuggestion(q)}
              disabled={isSending}
              className="flex-shrink-0 px-3 py-1.5 bg-tcm-paper border border-tcm-gold/30 text-tcm-brown rounded-full text-xs hover:bg-tcm-gold/20 transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 sticky bottom-0 z-20">
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about TCM, soups, wellness..."
            className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tcm-green transition-all"
            disabled={isSending}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              input.trim() && !isSending
                ? 'bg-tcm-green text-white shadow-lg hover:bg-opacity-90 active:scale-95'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {isSending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <style>{`
        .chat-page {
          min-height: 100vh;
          max-width: 480px;
          margin: 0 auto;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
