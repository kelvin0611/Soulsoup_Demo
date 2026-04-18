import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Users, Minus, Plus, ShoppingCart, Sparkles } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { useCartStore } from '@/stores/cartStore'
import { getSoupsByConstitution } from '@/mocks/soups'
import { useMemo } from 'react'
import type { SoupPack } from '@/types'

// Hardcoded popular soup examples
const hotSoupExamples: SoupPack[] = [
  {
    id: 'demo-001',
    name: 'Astragalus & Codonopsis Qi Tonic Soup',
    nameEn: 'Astragalus & Codonopsis Qi Tonic Soup',
    description: 'A classic qi-tonifying formula. Astragalus strengthens qi and defense, while codonopsis supports the spleen and lungs. Great for fatigue and low energy.',
    price: 88,
    originalPrice: 108,
    image: '/images/soup-001.jpg',
    tags: ['Qi Tonic', 'Spleen Support', 'Best Seller'],
    ingredients: ['Astragalus 15g', 'Codonopsis 12g', 'Chinese Yam 20g', 'Red Dates x6', 'Longan 10g', 'Goji Berry 8g'],
    benefits: ['Boosts Vital Qi', 'Supports Immunity', 'Relieves Fatigue', 'Supports Digestion'],
    suitableFor: ['qi-deficiency'],
    cookTime: '90 mins',
    servings: 2,
    isHot: true,
  },
  {
    id: 'demo-002',
    name: 'Four Divinity Soup',
    nameEn: 'Four Divinity Soup',
    description: 'A classic mild soup for supporting spleen and stomach health, ideal for daily wellness.',
    price: 52,
    originalPrice: 68,
    image: '/images/soup-009.jpg',
    tags: ['Spleen Support', 'Stomach Care', 'Daily Wellness'],
    ingredients: ['Chinese Yam 20g', 'Gorgon Seed 15g', 'Lotus Seed 15g', 'Poria 15g', 'Coix Seed 15g'],
    benefits: ['Supports Spleen and Stomach', 'Kidney Support', 'Reduces Dampness', 'Daily Maintenance'],
    suitableFor: ['balanced', 'qi-deficiency', 'dampness'],
    cookTime: '90 mins',
    servings: 2,
    isHot: true,
  },
  {
    id: 'demo-003',
    name: 'Angelica & Ginger Mutton Soup',
    nameEn: 'Angelica & Ginger Mutton Soup',
    description: 'A classic warming yang soup, ideal for cold sensitivity and cold hands and feet, especially in winter.',
    price: 128,
    originalPrice: 158,
    image: '/images/soup-002.jpg',
    tags: ['Warm Yang', 'Dispels Cold', 'Winter Tonic'],
    ingredients: ['Angelica Root 10g', 'Fresh Ginger 20g', 'Mutton 300g', 'Goji Berry 8g', 'Red Dates x4'],
    benefits: ['Warms the Core', 'Nourishes and Activates Blood', 'Relieves Cold Pain', 'Eases Cold Limbs'],
    suitableFor: ['yang-deficiency'],
    cookTime: '120 mins',
    servings: 2,
  },
  {
    id: 'demo-004',
    name: 'Lily & Snow Fungus Nourishing Soup',
    nameEn: 'Lily & Snow Fungus Nourishing Soup',
    description: 'Nourishes yin and moistens the lungs while calming the mind, suitable for dryness, heat signs, and poor sleep.',
    price: 68,
    originalPrice: 88,
    image: '/images/soup-003.jpg',
    tags: ['Nourish Yin', 'Moisten Lungs', 'Beauty Care'],
    ingredients: ['Lily Bulb 20g', 'Snow Fungus 15g', 'Lotus Seed 15g', 'Goji Berry 10g', 'Rock Sugar to taste'],
    benefits: ['Nourishes Yin and Lungs', 'Calms the Mind', 'Supports Skin Health', 'Improves Sleep'],
    suitableFor: ['yin-deficiency'],
    cookTime: '60 mins',
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
        <h1 className="title-md flex-1 text-center">Recommended Soups</h1>
        <div className="w-6"></div>
      </div>

      {/* Constitution hint or Default hint */}
      <div className="px-4 py-4">
        {currentConstitution ? (
          <div className="bg-tcm-green/10 rounded-xl p-4 flex items-center">
            <img 
              src={currentConstitution.image} 
              alt={currentConstitution.nameEn}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Based on your constitution</p>
              <p className="font-semibold text-tcm-green">Recommended for {currentConstitution.nameEn}</p>
            </div>
          </div>
        ) : (
          <div className="bg-tcm-gold/20 rounded-xl p-4 flex items-center">
            <div className="w-12 h-12 bg-tcm-gold/30 rounded-full flex items-center justify-center mr-3">
              <Sparkles className="w-6 h-6 text-tcm-brown" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Popular Picks</p>
              <p className="font-semibold text-tcm-brown">This week's most popular wellness soups</p>
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
                    alt={soup.nameEn}
                    className="w-full h-full object-cover"
                  />
                  {soup.isHot && (
                    <div className="absolute top-3 left-3">
                      <span className="tag bg-tcm-red text-white">Hot</span>
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
                    <h3 className="title-md text-base">{soup.nameEn}</h3>
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
                    <p className="text-xs text-gray-500 mb-1">Key Benefits</p>
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
                      {soup.servings} servings
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
            <p className="text-gray-500">No soups available</p>
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
                  <p className="text-xs text-tcm-red">Saved $${savings}</p>
                )}
              </div>
            </div>
            <button className="btn-primary px-6" onClick={() => navigate('/order')}>
              Checkout
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
