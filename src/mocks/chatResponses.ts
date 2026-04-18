import { soupPacks } from './soups'
import type { SoupPack } from '@/types'

export interface BotResponse {
  text: string
  soupId?: string
  suggestions?: string[]
}

const responses: { keywords: string[]; response: BotResponse }[] = [
  // Greetings
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    response: {
      text: "Hello! I'm your TCM AI Consultant. I can help you understand your constitution, recommend wellness soups, and answer general TCM questions. What would you like to know?",
      suggestions: ["What's my constitution?", "Recommend a soup", "I feel tired lately"],
    },
  },
  // Constitution test
  {
    keywords: ['constitution', 'body type', 'test', 'quiz', 'my type', 'what am i'],
    response: {
      text: "Your constitution is the foundation of TCM wellness. I recommend taking our Constitution Test — it only takes a minute and will help us recommend the best soups for you. You can also ask me about specific types like Qi Deficiency, Yin Deficiency, or Damp-Heat.",
      suggestions: ['Take the test', 'Tell me about Qi Deficiency', 'Tell me about Yin Deficiency'],
    },
  },
  // Qi Deficiency
  {
    keywords: ['qi deficiency', 'qi deficient', 'low energy', 'fatigue', 'tired', 'exhausted', 'weak', 'no energy', 'always tired'],
    response: {
      text: "Feeling tired is often a sign of Qi Deficiency in TCM. This means your body's vital energy is low. I recommend getting plenty of rest, eating warm nourishing foods like Chinese yam and red dates, and avoiding cold raw foods. Our Astragalus & Codonopsis Qi Tonic Soup is specially formulated to boost vital qi.",
      soupId: 'soup-001',
      suggestions: ['How to test my constitution?', 'Other qi-boosting tips', 'Recommend another soup'],
    },
  },
  // Yin Deficiency
  {
    keywords: ['yin deficiency', 'yin deficient', 'dry mouth', 'insomnia', 'can\'t sleep', 'poor sleep', 'night sweats', 'warm palms', 'dry skin', 'irritable'],
    response: {
      text: "Dry mouth, insomnia, and warm palms often point to Yin Deficiency in TCM. This means your body's cooling and moistening fluids are insufficient. Try calming activities before bed, drink plenty of water, and avoid spicy or fried foods. Our Lily & Snow Fungus Nourishing Soup helps nourish yin and calm the mind.",
      soupId: 'soup-003',
      suggestions: ['How to sleep better?', 'Tell me about Yin Deficiency', 'Recommend another soup'],
    },
  },
  // Yang Deficiency
  {
    keywords: ['yang deficiency', 'yang deficient', 'cold hands', 'cold feet', 'afraid of cold', 'always cold', 'low back pain', 'knee pain', 'winter'],
    response: {
      text: "Cold hands and feet, especially in winter, often indicate Yang Deficiency. This means your body's warming energy is low. Keep your lower back and feet warm, eat warming foods like ginger and lamb, and avoid cold drinks. Our Angelica & Ginger Mutton Soup is a classic winter tonic to warm yang.",
      soupId: 'soup-002',
      suggestions: ['Winter wellness tips', 'Tell me about Yang Deficiency', 'Recommend another soup'],
    },
  },
  // Dampness
  {
    keywords: ['dampness', 'damp-heat', 'oily skin', 'acne', 'heavy body', 'bloated', 'sticky stool', 'bitter taste', 'bad breath'],
    response: {
      text: "Oily skin, bloating, and a heavy body sensation suggest Dampness or Damp-Heat accumulation. In TCM, this means your spleen's fluid metabolism is sluggish. Eat light, avoid greasy and sweet foods, and drink barley or mung bean soups. Our Coix Seed & Poria Dampness-Removing Soup or Mung Bean & Coix Seed Cooling Soup would be excellent choices.",
      soupId: 'soup-004',
      suggestions: ['Tell me about Damp-Heat', 'Diet tips for dampness', 'Recommend another soup'],
    },
  },
  // Blood Stasis
  {
    keywords: ['blood stasis', 'bruise easily', 'dark circles', 'dull complexion', 'menstrual pain', 'period pain', 'purple spots'],
    response: {
      text: "Easy bruising, dull complexion, and menstrual pain can indicate Blood Stasis in TCM — meaning blood circulation is not flowing smoothly. Gentle exercise like tai chi or walking helps. Avoid sitting for long periods. Our Hawthorn & Safflower Blood-Activating Soup promotes healthy blood circulation.",
      soupId: 'soup-006',
      suggestions: ['Exercise tips for circulation', 'Tell me about Blood Stasis', 'Recommend another soup'],
    },
  },
  // Qi Stagnation
  {
    keywords: ['qi stagnation', 'stagnant', 'low mood', 'depressed', 'chest tightness', 'sighing', 'anxious', 'stress', 'mood swing'],
    response: {
      text: "Low mood, chest tightness, and frequent sighing are classic signs of Qi Stagnation — your body's energy flow is blocked. Take walks in nature, practice deep breathing, and drink floral teas like rose or jasmine. Our Rose & Buddha Hand Liver-Soothing Soup is designed to soothe liver qi and lift your spirits.",
      soupId: 'soup-007',
      suggestions: ['Stress relief tips', 'Tell me about Qi Stagnation', 'Recommend another soup'],
    },
  },
  // Special Constitution
  {
    keywords: ['allergy', 'allergic', 'sensitive', 'skin rash', 'hay fever', 'special constitution'],
    response: {
      text: "Prone to allergies and skin sensitivities? In TCM, this is often related to a Special Constitution with weakened defensive qi. Build your immunity gradually with gentle exercise, adequate sleep, and immune-supporting herbs. Our Ganoderma & Astragalus Immune Soup strengthens core vitality and supports your body's defenses.",
      soupId: 'soup-008',
      suggestions: ['Immunity boosting tips', 'Tell me about Special Constitution', 'Recommend another soup'],
    },
  },
  // Sleep
  {
    keywords: ['sleep', 'insomnia', 'can\'t sleep', 'wake up', 'restless', 'dreams', 'nightmare'],
    response: {
      text: "For sleep issues, TCM often points to Yin Deficiency or Heart-Spleen disharmony. Try a warm foot soak before bed, avoid screens 1 hour before sleep, and sip calming teas. Our Lily & Snow Fungus Nourishing Soup nourishes yin and calms the mind — perfect for better sleep.",
      soupId: 'soup-003',
      suggestions: ['Sleep hygiene tips', 'Tell me about Yin Deficiency', 'Recommend another soup'],
    },
  },
  // Digestion
  {
    keywords: ['digestion', 'stomach', 'bloating', 'appetite', 'nausea', 'indigestion', 'acid reflux', 'poor appetite'],
    response: {
      text: "Digestive issues in TCM often relate to Spleen and Stomach qi weakness. Eat regular warm meals, chew thoroughly, and avoid eating when stressed. Soups with Chinese yam, poria, and coix seed support digestive health. Our Four Divinity Soup is a gentle daily tonic for spleen and stomach.",
      soupId: 'soup-009',
      suggestions: ['Diet for digestion', 'Tell me about Spleen Qi', 'Recommend another soup'],
    },
  },
  // Skin
  {
    keywords: ['skin', 'complexion', 'dry skin', 'oily skin', 'eczema', 'acne', 'pimple', 'beauty'],
    response: {
      text: "In TCM, skin health reflects internal balance. Dry skin suggests Yin Deficiency; oily skin and acne point to Damp-Heat. Nourish from within with the right soups — Lily & Snow Fungus Nourishing Soup for dryness, or Mung Bean & Coix Seed Cooling Soup for heat-related skin issues.",
      soupId: 'soup-003',
      suggestions: ['Skincare from within', 'Tell me about Damp-Heat', 'Recommend another soup'],
    },
  },
  // Soup recommendation general
  {
    keywords: ['soup', 'recommend', 'recommendation', 'what should i drink', 'what soup', 'best soup', 'which soup'],
    response: {
      text: "I'd be happy to recommend a soup! For the best suggestion, tell me how you're feeling — are you tired, have trouble sleeping, feel cold, or have digestive issues? You can also take our Constitution Test for personalized recommendations.",
      suggestions: ['I feel tired', 'I can\'t sleep', 'I feel cold', 'Take the test'],
    },
  },
  // Diet / Food
  {
    keywords: ['diet', 'food', 'eat', 'nutrition', 'what to eat', 'avoid'],
    response: {
      text: "TCM dietary therapy follows the principle of 'treating like with like.' Cold-natured people should eat warming foods (ginger, lamb, cinnamon). Heat-prone people need cooling foods (mung beans, pears, lotus root). A balanced diet with seasonal vegetables and moderate portions is always the foundation.",
      suggestions: ['Warming foods', 'Cooling foods', 'Seasonal eating tips'],
    },
  },
  // Exercise
  {
    keywords: ['exercise', 'workout', 'sport', 'yoga', 'tai chi', 'fitness', 'active'],
    response: {
      text: "In TCM, exercise should be moderate and harmonious. Tai chi, qigong, and brisk walking are ideal — they move qi and blood without depleting energy. Avoid overexercising if you have Qi Deficiency, as it can weaken you further. Morning exercise is best to align with the body's natural yang rhythm.",
      suggestions: ['Qi-boosting exercises', 'Best time to exercise', 'Recommend a soup'],
    },
  },
  // Seasonal
  {
    keywords: ['season', 'spring', 'summer', 'autumn', 'fall', 'winter', 'seasonal', 'weather'],
    response: {
      text: "TCM teaches us to live in harmony with the seasons. Spring is for liver soothing and green foods. Summer calls for cooling soups to clear heat. Autumn is about moistening the lungs. Winter is the time to tonify and warm yang with rich, nourishing soups. Which season would you like tips for?",
      suggestions: ['Spring tips', 'Summer cooling', 'Winter tonics'],
    },
  },
  // Thank you
  {
    keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'helpful'],
    response: {
      text: "You're very welcome! I'm glad I could help. If you have more questions about TCM, your constitution, or our wellness soups, feel free to ask anytime. Wishing you good health!",
      suggestions: ['Recommend a soup', 'I have another question', 'Goodbye'],
    },
  },
  // Goodbye
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'take care'],
    response: {
      text: "Take care! Remember, wellness is a journey. Feel free to come back anytime if you have questions about TCM or need soup recommendations. Stay healthy!",
      suggestions: ['Recommend a soup', 'Start over'],
    },
  },
]

export function getBotResponse(userText: string): BotResponse {
  const lower = userText.toLowerCase().trim()

  for (const rule of responses) {
    if (rule.keywords.some(k => lower.includes(k))) {
      return rule.response
    }
  }

  // Fallback
  return {
    text: "That's an interesting question! I'm a TCM-focused assistant, so I can help with constitution types, wellness soup recommendations, and general TCM lifestyle advice. Could you tell me more about how you're feeling, or ask about a specific topic like sleep, digestion, or energy levels?",
    suggestions: ['Recommend a soup', 'Tell me about constitutions', 'I feel tired lately'],
  }
}

export function getSoupById(id: string): SoupPack | undefined {
  return soupPacks.find(s => s.id === id)
}

export const quickQuestions = [
  "What's my constitution?",
  "Recommend a soup",
  "How to sleep better?",
  "I feel tired lately",
  "Winter wellness tips",
  "I have oily skin",
  "Stress relief tips",
  "Digestion help",
]
