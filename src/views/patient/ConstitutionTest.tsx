import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'
import { questions, calculateConstitution } from '@/mocks/constitutions'
import { useUserStore } from '@/stores/userStore'

export default function ConstitutionTest() {
  const navigate = useNavigate()
  const { addAnswer, setTestResult } = useUserStore()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<{ questionId: number; constitution: string; score: number }[]>([])
  const [loading, setLoading] = useState(false)

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const progress = ((currentIndex + 1) / questions.length) * 100

  const selectOption = useCallback((index: number, score: number, constitution: string) => {
    setSelectedOption(index)
    
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === currentQuestion.id)
      if (existingIndex >= 0) {
        prev[existingIndex] = { questionId: currentQuestion.id, constitution, score }
      } else {
        prev.push({ questionId: currentQuestion.id, constitution, score })
      }
      return [...prev]
    })
    
    addAnswer(currentQuestion.id, constitution, score)
  }, [currentQuestion, addAnswer])

  const nextQuestion = useCallback(() => {
    if (selectedOption === null) return
    
    if (isLastQuestion) {
      setLoading(true)
      setTimeout(() => {
        const result = calculateConstitution(answers)
        setTestResult(result)
        setLoading(false)
        navigate('/result')
      }, 1500)
    } else {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
    }
  }, [selectedOption, isLastQuestion, answers, setTestResult, navigate])

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      const prevAnswer = answers.find(a => a.questionId === questions[currentIndex - 1].id)
      if (prevAnswer) {
        const optionIndex = questions[currentIndex - 1].options.findIndex(
          o => o.constitution === prevAnswer.constitution && o.score === prevAnswer.score
        )
        setSelectedOption(optionIndex)
      }
    }
  }, [currentIndex, answers])

  return (
    <div className="test-page min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <ArrowLeft className="w-6 h-6 text-tcm-ink cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="title-md flex-1 text-center">體質檢測</h1>
        <div className="w-6"></div>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">進度</span>
          <span className="text-sm font-medium text-tcm-green">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-tcm-green transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4 py-2 overflow-hidden">
        <div className="question-card" key={currentQuestion.id}>
          {/* Question card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <div className="flex items-start mb-4">
              <span className="tag tag-green mr-2">Q{currentQuestion.id}</span>
            </div>
            <h2 className="text-lg font-semibold text-tcm-ink leading-relaxed">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`option-card ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => selectOption(index, option.score, option.constitution)}
              >
                <div className="flex items-center">
                  <div className={`option-indicator ${selectedOption === index ? 'active' : ''}`}>
                    {['A', 'B', 'C', 'D'][index]}
                  </div>
                  <span className="flex-1 text-gray-700">{option.label}</span>
                  {selectedOption === index && (
                    <Check className="w-5 h-5 text-tcm-green" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="px-6 py-6 bg-white/80 backdrop-blur-md">
        <div className="flex gap-4">
          {currentIndex > 0 && (
            <button 
              className="btn-secondary flex-1"
              onClick={prevQuestion}
            >
              上一題
            </button>
          )}
          <button 
            className="btn-primary flex-1"
            disabled={selectedOption === null}
            onClick={nextQuestion}
          >
            {isLastQuestion ? '查看結果' : '下一題'}
          </button>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-tcm-green animate-spin" />
            <p className="mt-4 text-tcm-ink">AI 分析中...</p>
            <p className="text-xs text-gray-500 mt-2">正在計算您的體質類型</p>
          </div>
        </div>
      )}

      <style>{`
        .test-page {
          background: linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 100%);
        }
        .question-card {
          animation: slideUp 0.4s ease-out;
        }
        .option-card {
          background: white;
          border-radius: 0.75rem;
          padding: 1rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }
        .option-card:active {
          transform: scale(0.98);
        }
        .option-card.selected {
          border-color: #4A7C59;
          background: rgba(74, 124, 89, 0.05);
        }
        .option-indicator {
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          background: #f3f4f6;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 700;
          margin-right: 1rem;
          transition: all 0.2s;
        }
        .option-indicator.active {
          background: #4A7C59;
          color: white;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
