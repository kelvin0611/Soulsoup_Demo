import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BarChart3, Heart } from 'lucide-react'
import ReactECharts from 'echarts-for-react'
import { useUserStore } from '@/stores/userStore'
import { constitutionTypes } from '@/mocks/constitutions'
import { useMemo } from 'react'

const getGradient = (id: string) => {
  const gradients: Record<string, string> = {
    'qi-deficiency': 'linear-gradient(135deg, #7FB285 0%, #4A7C59 100%)',
    'yang-deficiency': 'linear-gradient(135deg, #D4A574 0%, #8B6F47 100%)',
    'yin-deficiency': 'linear-gradient(135deg, #A8C8D8 0%, #6B9AC4 100%)',
    'dampness': 'linear-gradient(135deg, #B8C5B9 0%, #7A8B7B 100%)',
    'damp-heat': 'linear-gradient(135deg, #C4D4A8 0%, #8FA866 100%)',
    'blood-stasis': 'linear-gradient(135deg, #D4A5A5 0%, #A66B6B 100%)',
    'qi-stagnation': 'linear-gradient(135deg, #D8C4D4 0%, #A68BA6 100%)',
    'special-constitution': 'linear-gradient(135deg, #D4D4C4 0%, #9A9A8A 100%)',
    'balanced': 'linear-gradient(135deg, #E4D4C4 0%, #C4A77D 100%)',
  }
  return gradients[id] || gradients['balanced']
}

export default function ConstitutionResult() {
  const navigate = useNavigate()
  const { testResult, clearTest } = useUserStore()

  const chartOption = useMemo(() => {
    if (!testResult) return {}
    
    const indicators = constitutionTypes.slice(0, 8).map(c => ({
      name: c.name,
      max: 16,
    }))
    
    const data = constitutionTypes.slice(0, 8).map(c => {
      return testResult.scores[c.id] || 0
    })

    return {
      radar: {
        indicator: indicators,
        radius: '65%',
        splitNumber: 4,
        axisName: {
          color: '#666',
          fontSize: 10,
        },
        splitArea: {
          areaStyle: {
            color: ['#FDF8F3', '#F5EDE4', '#EDE4D8', '#E5DAC8'],
          },
        },
        axisLine: {
          lineStyle: {
            color: '#C4A77D',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#C4A77D',
          },
        },
      },
      series: [{
        type: 'radar',
        data: [{
          value: data,
          name: '您的體質',
          areaStyle: {
            color: 'rgba(74, 124, 89, 0.3)',
          },
          lineStyle: {
            color: '#4A7C59',
            width: 2,
          },
          itemStyle: {
            color: '#4A7C59',
          },
        }],
      }],
    }
  }, [testResult])

  const handleGoToSoups = () => {
    navigate('/soups')
  }

  const handleRetakeTest = () => {
    clearTest()
    navigate('/test')
  }

  if (!testResult) {
    return (
      <div className="result-page min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <BarChart3 className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 mb-4">還沒有檢測結果</p>
        <button className="btn-primary" onClick={handleRetakeTest}>開始檢測</button>
      </div>
    )
  }

  return (
    <div className="result-page min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <ArrowLeft className="w-6 h-6 text-tcm-ink cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="title-md flex-1 text-center">體質報告</h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Main result card */}
        <div className="px-4 py-6">
          <div 
            className="result-card rounded-3xl p-6 text-white relative overflow-hidden"
            style={{ background: getGradient(testResult.primary.id) }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 text-sm">您的體質類型</span>
                <img 
                  src={testResult.primary.image} 
                  alt={testResult.primary.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                />
              </div>
              <h2 className="text-3xl font-bold mb-1">{testResult.primary.name}</h2>
              <p className="text-white/80 text-sm">{testResult.primary.nameEn}</p>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm leading-relaxed text-white/90">
                  {testResult.primary.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Radar chart */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="title-md mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-tcm-green" />
              體質分析圖
            </h3>
            <div className="h-64">
              <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Characteristics */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="title-md mb-3">主要特徵</h3>
            <div className="flex flex-wrap gap-2">
              {testResult.primary.characteristics.map((char, index) => (
                <span key={index} className="tag tag-green">
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="title-md mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-tcm-red" />
              推薦食材
            </h3>
            <div className="flex flex-wrap gap-2">
              {testResult.primary.recommendations.map((food, index) => (
                <span key={index} className="px-3 py-1.5 bg-tcm-gold/20 text-tcm-brown rounded-full text-sm">
                  {food}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 pb-8">
          <button className="btn-primary w-full flex items-center justify-center" onClick={handleGoToSoups}>
            <span>查看推薦湯包</span>
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            根據您的{testResult.primary.name}精心配製
          </p>
        </div>
      </div>

      <style>{`
        .result-page {
          background: linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 100%);
        }
        .result-card {
          box-shadow: 0 10px 40px rgba(74, 124, 89, 0.2);
        }
      `}</style>
    </div>
  )
}
