import type { Patient } from '@/types'

export const patients: Patient[] = [
  {
    id: 'P001',
    name: '陳大文',
    gender: '男',
    age: 45,
    phone: '9123 4567',
    constitution: '氣虛質',
    lastVisit: '2024-04-10',
    totalVisits: 8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    records: [
      {
        id: 'R001',
        date: '2024-04-10',
        symptoms: '疲倦乏力，說話無力，容易出汗，食慾不振',
        diagnosis: '脾胃氣虛證',
        prescription: '四君子湯加減：黨參15g、白朮12g、茯苓12g、炙甘草6g、黃芪20g',
        constitution: '氣虛質',
        notes: '囑患者注意休息，避免過度勞累，建議服用黃芪黨參補氣湯包',
      },
      {
        id: 'R002',
        date: '2024-03-15',
        symptoms: '疲倦改善，但仍易出汗，睡眠一般',
        diagnosis: '氣虛證（好轉）',
        prescription: '補中益氣湯加減：黨參12g、黃芪15g、白朮10g、當歸8g',
        constitution: '氣虛質',
        notes: '病情有改善，繼續調理',
      },
    ],
  },
  {
    id: 'P002',
    name: '李美華',
    gender: '女',
    age: 38,
    phone: '9234 5678',
    constitution: '陰虛質',
    lastVisit: '2024-04-12',
    totalVisits: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    records: [
      {
        id: 'R003',
        date: '2024-04-12',
        symptoms: '口乾咽燥，手腳心熱，失眠多夢，大便乾結',
        diagnosis: '陰虛火旺證',
        prescription: '六味地黃丸加減：熟地黃15g、山茱萸10g、淮山15g、丹皮10g、茯苓10g、澤瀉10g',
        constitution: '陰虛質',
        notes: '建議多飲水，避免辛辣燥熱食物，推薦百合銀耳潤肺湯包',
      },
    ],
  },
  {
    id: 'P003',
    name: '張志明',
    gender: '男',
    age: 52,
    phone: '9345 6789',
    constitution: '濕熱質',
    lastVisit: '2024-04-08',
    totalVisits: 12,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    records: [
      {
        id: 'R004',
        date: '2024-04-08',
        symptoms: '面部油膩，口苦口臭，大便黏滯，小便黃',
        diagnosis: '濕熱內蘊證',
        prescription: '龍膽瀉肝湯加減：龍膽草6g、黃芩10g、梔子10g、澤瀉12g、車前子10g',
        constitution: '濕熱質',
        notes: '飲食清淡，忌辛辣油膩，推薦綠豆薏苡仁清熱湯包',
      },
      {
        id: 'R005',
        date: '2024-02-20',
        symptoms: '面部暗瘡增多，口苦口乾',
        diagnosis: '肝膽濕熱證',
        prescription: '茵陳蒿湯加減：茵陳15g、梔子10g、大黃6g、黃芩10g',
        constitution: '濕熱質',
        notes: '',
      },
    ],
  },
  {
    id: 'P004',
    name: '王麗萍',
    gender: '女',
    age: 29,
    phone: '9456 7890',
    constitution: '氣鬱質',
    lastVisit: '2024-04-11',
    totalVisits: 3,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    records: [
      {
        id: 'R006',
        date: '2024-04-11',
        symptoms: '情緒低落，胸悶不舒，善太息，睡眠差',
        diagnosis: '肝氣鬱結證',
        prescription: '逍遙散加減：柴胡10g、當歸10g、白芍12g、白朮10g、茯苓12g、甘草6g',
        constitution: '氣鬱質',
        notes: '建議保持心情舒暢，適量運動，推薦玫瑰佛手疏肝湯包',
      },
    ],
  },
  {
    id: 'P005',
    name: '劉建國',
    gender: '男',
    age: 60,
    phone: '9567 8901',
    constitution: '陽虛質',
    lastVisit: '2024-04-05',
    totalVisits: 15,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    records: [
      {
        id: 'R007',
        date: '2024-04-05',
        symptoms: '怕冷，手腳冰冷，腰膝酸軟，精神不振',
        diagnosis: '腎陽虛證',
        prescription: '金匱腎氣丸加減：熟地黃15g、山茱萸10g、淮山15g、附子6g、肉桂3g',
        constitution: '陽虛質',
        notes: '注意保暖，適當進補，推薦當歸生薑羊肉湯',
      },
    ],
  },
  {
    id: 'P006',
    name: '陳小敏',
    gender: '女',
    age: 33,
    phone: '9678 9012',
    constitution: '血瘀質',
    lastVisit: '2024-04-09',
    totalVisits: 6,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    records: [
      {
        id: 'R008',
        date: '2024-04-09',
        symptoms: '面色晦暗，易有瘀斑，痛經，經色暗有血塊',
        diagnosis: '血瘀證',
        prescription: '血府逐瘀湯加減：當歸10g、生地黃12g、桃仁10g、紅花6g、枳殼8g',
        constitution: '血瘀質',
        notes: '建議適量運動促進血液循環，推薦山楂紅花活血湯包',
      },
    ],
  },
  {
    id: 'P007',
    name: '黃志偉',
    gender: '男',
    age: 41,
    phone: '9789 0123',
    constitution: '痰濕質',
    lastVisit: '2024-04-07',
    totalVisits: 4,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    records: [
      {
        id: 'R009',
        date: '2024-04-07',
        symptoms: '身體困重，腹部肥滿，痰多，口黏膩',
        diagnosis: '痰濕內阻證',
        prescription: '二陳湯加減：陳皮10g、半夏10g、茯苓15g、甘草6g、白朮12g',
        constitution: '痰濕質',
        notes: '控制飲食，適量運動，推薦薏苡仁茯苓祛濕湯包',
      },
    ],
  },
  {
    id: 'P008',
    name: '林雅婷',
    gender: '女',
    age: 26,
    phone: '9890 1234',
    constitution: '特稟質',
    lastVisit: '2024-04-13',
    totalVisits: 2,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
    records: [
      {
        id: 'R010',
        date: '2024-04-13',
        symptoms: '皮膚易過敏，季節交替時易起疹，鼻敏感',
        diagnosis: '肺脾氣虛，衛表不固',
        prescription: '玉屏風散加減：黃芪15g、白朮12g、防風6g、蟬蛻6g、地膚子10g',
        constitution: '特稟質',
        notes: '避免接觸過敏原，增強體質，推薦靈芝黃芪固本湯',
      },
    ],
  },
]

export function searchPatients(query: string): Patient[] {
  const lowerQuery = query.toLowerCase()
  return patients.filter(p => 
    p.name.includes(query) || 
    p.phone.includes(query) ||
    p.constitution.includes(query)
  )
}

export function getPatientById(id: string): Patient | undefined {
  return patients.find(p => p.id === id)
}

export function addMedicalRecord(patientId: string, record: Omit<import('@/types').MedicalRecord, 'id'>) {
  const patient = getPatientById(patientId)
  if (!patient) throw new Error('Patient not found')
  
  const newRecord = {
    ...record,
    id: `R${Date.now()}`,
  }
  
  patient.records.unshift(newRecord)
  patient.lastVisit = record.date
  patient.totalVisits += 1
  patient.constitution = record.constitution
  
  return newRecord
}
