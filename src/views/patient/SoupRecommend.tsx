import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Users, Minus, Plus, ShoppingCart, Sparkles } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { useCartStore } from '@/stores/cartStore'
import { getSoupsByConstitution } from '@/mocks/soups'
import { useMemo } from 'react'
import type { SoupPack } from '@/types'

// 硬编码热门汤包示例
const hotSoupExamples: SoupPack[] = [
  {
    id: 'demo-001',
    name: '黃芪黨參補氣湯',
    nameEn: 'Astragalus & Codonopsis Qi Tonic Soup',
    description: '經典補氣良方，黃芪補氣固表，黨參健脾益肺，適合氣虛乏力、容易疲倦人士。',
    price: 88,
    originalPrice: 108,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    tags: ['補氣', '健脾', '暢銷'],
    ingredients: ['黃芪 15g', '黨參 12g', '淮山 20g', '紅棗 6顆', '桂圓 10g', '枸杞 8g'],
    benefits: ['補中益氣', '增強免疫力', '改善疲勞', '健脾養胃'],
    suitableFor: ['qi-deficiency'],
    cookTime: '90分鐘',
    servings: 2,
    isHot: true,
  },
  {
    id: 'demo-002',
    name: '四神湯',
    nameEn: 'Four Divinity Soup',
    description: '健脾養胃的經典湯品，性質平和，適合日常保養。',
    price: 52,
    originalPrice: 68,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    tags: ['健脾', '養胃', '日常'],
    ingredients: ['淮山 20g', '芡實 15g', '蓮子 15g', '茯苓 15g', '薏仁 15g'],
    benefits: ['健脾養胃', '益腎固精', '祛濕止瀉', '日常保養'],
    suitableFor: ['balanced', 'qi-deficiency', 'dampness'],
    cookTime: '90分鐘',
    servings: 2,
    isHot: true,
  },
  {
    id: 'demo-003',
    name: '當歸生薑羊肉湯',
    nameEn: 'Angelica & Ginger Mutton Soup',
    description: '溫補陽氣的經典湯品，適合陽虛怕冷、手腳冰冷人士，冬季進補首選。',
    price: 128,
    originalPrice: 158,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop',
    tags: ['溫陽', '驅寒', '冬季進補'],
    ingredients: ['當歸 10g', '生薑 20g', '羊肉 300g', '枸杞 8g', '紅棗 4顆'],
    benefits: ['溫中暖下', '補血活血', '驅寒止痛', '改善手腳冰冷'],
    suitableFor: ['yang-deficiency'],
    cookTime: '120分鐘',
    servings: 2,
  },
  {
    id: 'demo-004',
    name: '百合銀耳潤肺湯',
    nameEn: 'Lily & Snow Fungus Nourishing Soup',
    description: '滋陰潤肺，清心安神的養顏湯品，適合陰虛燥熱、失眠多夢人士。',
    price: 68,
    originalPrice: 88,
    image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d1d56?w=600&h=400&fit=crop',
    tags: ['滋陰', '潤肺', '美容'],
    ingredients: ['百合 20g', '銀耳 15g', '蓮子 15g', '枸杞 10g', '冰糖 適量'],
    benefits: ['滋陰潤肺', '清心安神', '美容養顏', '改善睡眠'],
    suitableFor: ['yin-deficiency'],
    cookTime: '60分鐘',
    servings: 2,
  },
]

export default function SoupRecommend() {
  const navigate = useNavigate()
  const { currentConstitution } = useUserStore()
  const { items, totalItems, totalPrice, savings, addToCart, updateQuantity } = useCartStore()

  const recommendedSoups = useMemo(() => {
    if (!currentConstitution) return hotSoupExamples
    return getSoupsByConstitution(currentConstitution.id)
  }, [currentConstitution])

  const getQuantity = (soupId: string) => {
    const item = items.find(item => item.soup.id === soupId)
    return item?.quantity || 0
  }

  const increaseQuantity = (soup: import('@/types').SoupPack) => {
    addToCart(soup, 1)
  }

  const decreaseQuantity = (soupId: string) => {
    const currentQty = getQuantity(soupId)
    if (currentQty > 0) {
      updateQuantity(soupId, currentQty - 1)
    }
  }

  return (
    <div className="soup-page min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <ArrowLeft className="w-6 h-6 text-tcm-ink cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="title-md flex-1 text-center">推薦湯包</h1>
        <div className="w-6"></div>
      </div>

      {/* Constitution hint or Default hint */}
      <div className="px-4 py-4">
        {currentConstitution ? (
          <div className="bg-tcm-green/10 rounded-xl p-4 flex items-center">
            <img 
              src={currentConstitution.image} 
              alt={currentConstitution.name}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-600">根據您的體質</p>
              <p className="font-semibold text-tcm-green">{currentConstitution.name} 為您推薦</p>
            </div>
          </div>
        ) : (
          <div className="bg-tcm-gold/20 rounded-xl p-4 flex items-center">
            <div className="w-12 h-12 bg-tcm-gold/30 rounded-full flex items-center justify-center mr-3">
              <Sparkles className="w-6 h-6 text-tcm-brown" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">熱門精選</p>
              <p className="font-semibold text-tcm-brown">本週最受歡迎的養生湯包</p>
            </div>
          </div>
        )}
      </div>

      {/* Soup list */}
      <div className="flex-1 px-4 pb-24">
        {recommendedSoups.length > 0 ? (
          <div className="space-y-4">
            {recommendedSoups.map(soup => (
              <div key={soup.id} className="soup-card bg-white rounded-2xl overflow-hidden shadow-sm">
                {/* Image */}
                <div className="h-40 relative">
                  <img 
                    src={soup.image} 
                    alt={soup.name}
                    className="w-full h-full object-cover"
                  />
                  {soup.isHot && (
                    <div className="absolute top-3 left-3">
                      <span className="tag bg-tcm-red text-white">熱銷</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="tag tag-gold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {soup.cookTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="title-md text-base">{soup.name}</h3>
                    <div className="text-right">
                      <p className="text-tcm-red font-bold text-lg">${soup.price}</p>
                      <p className="text-gray-400 text-xs line-through">${soup.originalPrice}</p>
                    </div>
                  </div>

                  <p className="text-body text-xs mb-3 line-clamp-2">{soup.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {soup.tags.map(tag => (
                      <span key={tag} className="tag tag-green text-xs">{tag}</span>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="bg-tcm-paper rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">主要功效</p>
                    <div className="flex flex-wrap gap-2">
                      {soup.benefits.slice(0, 3).map(benefit => (
                        <span key={benefit} className="text-xs text-tcm-brown">
                          • {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {soup.servings}人份
                    </div>
                    <div className="flex items-center gap-2">
                      {getQuantity(soup.id) > 0 && (
                        <button 
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                          onClick={() => decreaseQuantity(soup.id)}
                        >
                          <Minus className="w-4 h-4 text-tcm-ink" />
                        </button>
                      )}
                      {getQuantity(soup.id) > 0 && (
                        <span className="w-8 text-center font-medium">
                          {getQuantity(soup.id)}
                        </span>
                      )}
                      <button 
                        className="w-8 h-8 rounded-full bg-tcm-green flex items-center justify-center"
                        onClick={() => increaseQuantity(soup)}
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">暫無推薦湯包</p>
          </div>
        )}
      </div>

      {/* Cart bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-30">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-tcm-green rounded-full flex items-center justify-center relative mr-3">
                <ShoppingCart className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-tcm-red text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <div>
                <p className="font-bold text-lg">${totalPrice}</p>
                {savings > 0 && (
                  <p className="text-xs text-tcm-red">已省 ${savings}</p>
                )}
              </div>
            </div>
            <button className="btn-primary px-6" onClick={() => navigate('/order')}>
              去結算
            </button>
          </div>
        </div>
      )}

      <style>{`
        .soup-page {
          background: linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 100%);
        }
        .soup-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .soup-card:active {
          transform: scale(0.98);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
