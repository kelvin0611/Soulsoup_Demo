import type { ConstitutionType, Question } from '@/types'

export const constitutionTypes: ConstitutionType[] = [
  {
    id: 'qi-deficiency',
    name: 'Qi Deficiency',
    nameEn: 'Qi Deficiency',
    description: 'Qi is the fundamental energy of life in the body. When qi is deficient, fatigue, weak speech, and spontaneous sweating are common.',
    characteristics: ['Easily fatigued', 'Weak voice', 'Sweats easily', 'Sensitive to cold', 'Prone to colds'],
    recommendations: ['Astragalus', 'Codonopsis', 'Chinese yam', 'Red dates', 'Longan'],
    color: '#E8D5C4',
    image: '/images/const-qi.jpg',
  },
  {
    id: 'yang-deficiency',
    name: 'Yang Deficiency',
    nameEn: 'Yang Deficiency',
    description: 'Insufficient yang energy reduces the body’s warmth, often causing cold intolerance and cold hands and feet.',
    characteristics: ['Sensitive to cold', 'Cold hands and feet', 'Prefers warm drinks', 'Low energy', 'Pale complexion'],
    recommendations: ['Cinnamon bark', 'Dried ginger', 'Lamb', 'Chinese chives', 'Walnuts'],
    color: '#D4A574',
    image: '/images/const-yang.jpg',
  },
  {
    id: 'yin-deficiency',
    name: 'Yin Deficiency',
    nameEn: 'Yin Deficiency',
    description: 'Insufficient yin fluids fail to balance yang, often leading to dry mouth, internal heat, and insomnia.',
    characteristics: ['Dry mouth and throat', 'Warm palms and soles', 'Insomnia and vivid dreams', 'Constipation', 'Irritability'],
    recommendations: ['Lily bulb', 'Snow fungus', 'Goji Berry', 'Ophiopogon root', 'Pear'],
    color: '#A8C8D8',
    image: '/images/const-yin.jpg',
  },
  {
    id: 'dampness',
    name: 'Phlegm-Dampness',
    nameEn: 'Phlegm-Dampness',
    description: 'Phlegm and dampness accumulate in the body, often causing obesity, chest oppression, and a sticky sensation in the mouth.',
    characteristics: ['Overweight body type', 'Chest tightness with excess phlegm', 'Sticky sensation in the mouth', 'Sticky stools', 'Oily skin'],
    recommendations: ['Coix seed', 'Poria', 'Aged tangerine peel', 'Winter melon', 'Lotus leaf'],
    color: '#B8C5B9',
    image: '/images/const-dampness.jpg',
  },
  {
    id: 'damp-heat',
    name: 'Damp-Heat',
    nameEn: 'Damp-Heat',
    description: 'Internal damp-heat tends to cause oily skin, bitter taste in the mouth, and acne breakouts.',
    characteristics: ['Oily face', 'Bitter taste and bad breath', 'Prone to acne', 'Foul sticky stools', 'Dark yellow urine'],
    recommendations: ['Mung beans', 'Coix seed', 'Adzuki beans', 'Bitter melon', 'Chrysanthemum'],
    color: '#C4D4A8',
    image: '/images/const-dampheat.jpg',
  },
  {
    id: 'blood-stasis',
    name: 'Blood Stasis',
    nameEn: 'Blood Stasis',
    description: 'Poor blood circulation may lead to a dull complexion and a tendency to bruise.',
    characteristics: ['Dull complexion', 'Bruises easily', 'Rough skin', 'Menstrual pain', 'Purple spots on the tongue'],
    recommendations: ['Hawthorn', 'Rose', 'Safflower', 'Black beans', 'Vinegar'],
    color: '#D4A5A5',
    image: '/images/const-blood.jpg',
  },
  {
    id: 'qi-stagnation',
    name: 'Qi Stagnation',
    nameEn: 'Qi Stagnation',
    description: 'Stagnant qi movement often causes low mood, chest tightness, and frequent sighing.',
    characteristics: ['Low mood', 'Chest tightness', 'Frequent sighing', 'Prone to anxiety', 'Poor sleep'],
    recommendations: ['Rose', 'Finger citron', 'Aged tangerine peel', 'Jasmine', 'Silktree flower'],
    color: '#D8C4D4',
    image: '/images/const-qi-stag.jpg',
  },
  {
    id: 'special-constitution',
    name: 'Special Constitution',
    nameEn: 'Special Constitution',
    description: 'Congenital abnormalities or allergic constitution can increase susceptibility to allergies and hereditary conditions.',
    characteristics: ['Prone to allergies', 'Hereditary conditions', 'Congenital disorders', 'Skin prone to rashes', 'Seasonal sensitivity'],
    recommendations: ['Reishi mushroom', 'Astragalus', 'Red dates', 'Chinese yam', 'Pseudostellaria root'],
    color: '#D4D4C4',
    image: '/images/const-special.jpg',
  },
  {
    id: 'balanced',
    name: 'Balanced',
    nameEn: 'Balanced',
    description: 'A harmonious balance of yin, yang, qi, and blood is the most ideal constitution state.',
    characteristics: ['Energetic', 'Rosy complexion', 'Good sleep', 'Regular bowel and urination', 'Strong immunity'],
    recommendations: ['Balanced diet', 'Moderate exercise', 'Regular routine', 'Maintain a relaxed mood'],
    color: '#E4D4C4',
    image: '/images/const-balanced.jpg',
  },
]

export const questions: Question[] = [
  {
    id: 1,
    text: 'Do you often feel fatigued and speak in a low, weak voice?',
    options: [
      { label: 'Never', score: 1, constitution: 'qi-deficiency' },
      { label: 'Sometimes', score: 2, constitution: 'qi-deficiency' },
      { label: 'Often', score: 3, constitution: 'qi-deficiency' },
      { label: 'Always', score: 4, constitution: 'qi-deficiency' },
    ],
  },
  {
    id: 2,
    text: 'Do you often feel cold and have cold hands and feet?',
    options: [
      { label: 'Never', score: 1, constitution: 'yang-deficiency' },
      { label: 'Sometimes', score: 2, constitution: 'yang-deficiency' },
      { label: 'Often', score: 3, constitution: 'yang-deficiency' },
      { label: 'Always', score: 4, constitution: 'yang-deficiency' },
    ],
  },
  {
    id: 3,
    text: 'Do you often have a dry mouth and warm palms or soles?',
    options: [
      { label: 'Never', score: 1, constitution: 'yin-deficiency' },
      { label: 'Sometimes', score: 2, constitution: 'yin-deficiency' },
      { label: 'Often', score: 3, constitution: 'yin-deficiency' },
      { label: 'Always', score: 4, constitution: 'yin-deficiency' },
    ],
  },
  {
    id: 4,
    text: 'Is your abdomen often bloated or soft, and does your skin get oily easily?',
    options: [
      { label: 'Never', score: 1, constitution: 'dampness' },
      { label: 'Sometimes', score: 2, constitution: 'dampness' },
      { label: 'Often', score: 3, constitution: 'dampness' },
      { label: 'Always', score: 4, constitution: 'dampness' },
    ],
  },
  {
    id: 5,
    text: 'Do you often have a bitter taste or bad breath, or get acne easily?',
    options: [
      { label: 'Never', score: 1, constitution: 'damp-heat' },
      { label: 'Sometimes', score: 2, constitution: 'damp-heat' },
      { label: 'Often', score: 3, constitution: 'damp-heat' },
      { label: 'Always', score: 4, constitution: 'damp-heat' },
    ],
  },
  {
    id: 6,
    text: 'Is your complexion often dull, or do you bruise easily?',
    options: [
      { label: 'Never', score: 1, constitution: 'blood-stasis' },
      { label: 'Sometimes', score: 2, constitution: 'blood-stasis' },
      { label: 'Often', score: 3, constitution: 'blood-stasis' },
      { label: 'Always', score: 4, constitution: 'blood-stasis' },
    ],
  },
  {
    id: 7,
    text: 'Do you often feel low in mood or have a tight feeling in your chest?',
    options: [
      { label: 'Never', score: 1, constitution: 'qi-stagnation' },
      { label: 'Sometimes', score: 2, constitution: 'qi-stagnation' },
      { label: 'Often', score: 3, constitution: 'qi-stagnation' },
      { label: 'Always', score: 4, constitution: 'qi-stagnation' },
    ],
  },
  {
    id: 8,
    text: 'Are you prone to allergies or skin rashes?',
    options: [
      { label: 'Never', score: 1, constitution: 'special-constitution' },
      { label: 'Sometimes', score: 2, constitution: 'special-constitution' },
      { label: 'Often', score: 3, constitution: 'special-constitution' },
      { label: 'Always', score: 4, constitution: 'special-constitution' },
    ],
  },
]

export function calculateConstitution(answers: { questionId: number; constitution: string; score: number }[]) {
  const scores: Record<string, number> = {}
  
  answers.forEach(answer => {
    if (!scores[answer.constitution]) {
      scores[answer.constitution] = 0
    }
    scores[answer.constitution] += answer.score
  })

  let maxScore = 0
  let primaryConstitution = 'balanced'
  
  Object.entries(scores).forEach(([constitution, score]) => {
    if (score > maxScore) {
      maxScore = score
      primaryConstitution = constitution
    }
  })

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  if (totalScore < 12) {
    primaryConstitution = 'balanced'
  }

  return {
    primary: constitutionTypes.find(c => c.id === primaryConstitution) || constitutionTypes[8],
    scores,
    allScores: Object.entries(scores).map(([id, score]) => ({
      constitution: constitutionTypes.find(c => c.id === id),
      score,
    })).sort((a, b) => b.score - a.score),
  }
}
