import type { ConstitutionType, Question } from '@/types'

export const constitutionTypes: ConstitutionType[] = [
  {
    id: 'qi-deficiency',
    name: '氣虛質',
    nameEn: 'Qi Deficiency',
    description: '氣是人體生命活動的根本，氣虛則容易疲倦、說話無力、容易出汗。',
    characteristics: ['容易疲倦', '說話無力', '容易出汗', '怕冷', '易感冒'],
    recommendations: ['黃芪', '黨參', '淮山', '紅棗', '桂圓'],
    color: '#E8D5C4',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
  },
  {
    id: 'yang-deficiency',
    name: '陽虛質',
    nameEn: 'Yang Deficiency',
    description: '陽氣不足，身體失去溫煦，容易怕冷、手腳冰冷。',
    characteristics: ['怕冷', '手腳冰冷', '喜熱飲', '精神不振', '面色蒼白'],
    recommendations: ['肉桂', '乾薑', '羊肉', '韭菜', '核桃'],
    color: '#D4A574',
    image: 'https://images.unsplash.com/photo-1515023115689-589c33041697?w=400&h=400&fit=crop',
  },
  {
    id: 'yin-deficiency',
    name: '陰虛質',
    nameEn: 'Yin Deficiency',
    description: '陰液不足，不能制約陽氣，容易口乾、煩熱、失眠。',
    characteristics: ['口乾咽燥', '手腳心熱', '失眠多夢', '便秘', '易煩躁'],
    recommendations: ['百合', '銀耳', '枸杞', '麥冬', '梨'],
    color: '#A8C8D8',
    image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400&h=400&fit=crop',
  },
  {
    id: 'dampness',
    name: '痰濕質',
    nameEn: 'Phlegm-Dampness',
    description: '體內痰濕積聚，容易肥胖、胸悶、口黏膩。',
    characteristics: ['身體肥胖', '胸悶痰多', '口黏膩', '大便黏', '皮膚油膩'],
    recommendations: ['薏苡仁', '茯苓', '陳皮', '冬瓜', '荷葉'],
    color: '#B8C5B9',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&h=400&fit=crop',
  },
  {
    id: 'damp-heat',
    name: '濕熱質',
    nameEn: 'Damp-Heat',
    description: '濕熱內蘊，容易面油、口苦、生暗瘡。',
    characteristics: ['面油', '口苦口臭', '易生暗瘡', '大便黏臭', '小便黃'],
    recommendations: ['綠豆', '薏苡仁', '赤小豆', '苦瓜', '菊花'],
    color: '#C4D4A8',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
  },
  {
    id: 'blood-stasis',
    name: '血瘀質',
    nameEn: 'Blood Stasis',
    description: '血液運行不暢，容易面色晦暗、易有瘀斑。',
    characteristics: ['面色晦暗', '易有瘀斑', '皮膚粗糙', '痛經', '舌有瘀點'],
    recommendations: ['山楂', '玫瑰花', '紅花', '黑豆', '醋'],
    color: '#D4A5A5',
    image: 'https://images.unsplash.com/photo-1563822249510-04678c78df85?w=400&h=400&fit=crop',
  },
  {
    id: 'qi-stagnation',
    name: '氣鬱質',
    nameEn: 'Qi Stagnation',
    description: '氣機郁滯，容易情緒低落、胸悶、善太息。',
    characteristics: ['情緒低落', '胸悶', '善太息', '易焦慮', '睡眠差'],
    recommendations: ['玫瑰花', '佛手', '陳皮', '茉莉花', '合歡花'],
    color: '#D8C4D4',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
  },
  {
    id: 'special-constitution',
    name: '特稟質',
    nameEn: 'Special Constitution',
    description: '先天異常或過敏體質，容易過敏、患遺傳性疾病。',
    characteristics: ['易過敏', '患遺傳病', '胎傳病', '皮膚易起疹', '季節敏感'],
    recommendations: ['靈芝', '黃芪', '紅棗', '山藥', '太子參'],
    color: '#D4D4C4',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  },
  {
    id: 'balanced',
    name: '平和質',
    nameEn: 'Balanced',
    description: '陰陽氣血調和，是最理想的體質狀態。',
    characteristics: ['精力充沛', '面色紅潤', '睡眠好', '二便調', '抵抗力強'],
    recommendations: ['均衡飲食', '適量運動', '規律作息', '心情舒暢'],
    color: '#E4D4C4',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop',
  },
]

export const questions: Question[] = [
  {
    id: 1,
    text: '您是否經常感到疲憊乏力，說話聲音低弱？',
    options: [
      { label: '從來沒有', score: 1, constitution: 'qi-deficiency' },
      { label: '偶爾會', score: 2, constitution: 'qi-deficiency' },
      { label: '經常會', score: 3, constitution: 'qi-deficiency' },
      { label: '總是如此', score: 4, constitution: 'qi-deficiency' },
    ],
  },
  {
    id: 2,
    text: '您是否容易怕冷，手腳經常感到冰冷？',
    options: [
      { label: '從來沒有', score: 1, constitution: 'yang-deficiency' },
      { label: '偶爾會', score: 2, constitution: 'yang-deficiency' },
      { label: '經常會', score: 3, constitution: 'yang-deficiency' },
      { label: '總是如此', score: 4, constitution: 'yang-deficiency' },
    ],
  },
  {
    id: 3,
    text: '您是否經常口乾咽燥，手腳心發熱？',
    options: [
      { label: '從來沒有', score: 1, constitution: 'yin-deficiency' },
      { label: '偶爾會', score: 2, constitution: 'yin-deficiency' },
      { label: '經常會', score: 3, constitution: 'yin-deficiency' },
      { label: '總是如此', score: 4, constitution: 'yin-deficiency' },
    ],
  },
  {
    id: 4,
    text: '您的腹部是否容易肥滿鬆軟，皮膚容易出油？',
    options: [
      { label: '從來沒有', score: 1, constitution: 'dampness' },
      { label: '偶爾會', score: 2, constitution: 'dampness' },
      { label: '經常會', score: 3, constitution: 'dampness' },
      { label: '總是如此', score: 4, constitution: 'dampness' },
    ],
  },
  {
    id: 5,
    text: '您是否容易口苦口臭，面部容易生暗瘡？',
    options: [
      { label: '從來沒有', score: 1, constitution: 'damp-heat' },
      { label: '偶爾會', score: 2, constitution: 'damp-heat' },
      { label: '經常會', score: 3, constitution: 'damp-heat' },
      { label: '總是如此', score: 4, constitution: 'damp-heat' },
    ],
  },
  {
    id: 6,
    text: '您的面色是否晦暗，皮膚容易出現瘀斑？',
    options: [
      { label: '從來沒有', score: 1, constitution: 'blood-stasis' },
      { label: '偶爾會', score: 2, constitution: 'blood-stasis' },
      { label: '經常會', score: 3, constitution: 'blood-stasis' },
      { label: '總是如此', score: 4, constitution: 'blood-stasis' },
    ],
  },
  {
    id: 7,
    text: '您是否經常情緒低落，感到胸悶不舒？',
    options: [
      { label: '從來沒有', score: 1, constitution: 'qi-stagnation' },
      { label: '偶爾會', score: 2, constitution: 'qi-stagnation' },
      { label: '經常會', score: 3, constitution: 'qi-stagnation' },
      { label: '總是如此', score: 4, constitution: 'qi-stagnation' },
    ],
  },
  {
    id: 8,
    text: '您是否容易過敏，皮膚容易起疹子？',
    options: [
      { label: '從來沒有', score: 1, constitution: 'special-constitution' },
      { label: '偶爾會', score: 2, constitution: 'special-constitution' },
      { label: '經常會', score: 3, constitution: 'special-constitution' },
      { label: '總是如此', score: 4, constitution: 'special-constitution' },
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
