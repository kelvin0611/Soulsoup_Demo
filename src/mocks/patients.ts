import type { Patient } from '@/types'

export const patients: Patient[] = [
  {
    id: 'P001',
    name: 'David Chen',
    gender: 'Male',
    age: 45,
    phone: '9123 4567',
    constitution: 'Qi Deficiency',
    lastVisit: '2024-04-10',
    totalVisits: 8,
    image: '/images/patient-001.jpg',
    records: [
      {
        id: 'R001',
        date: '2024-04-10',
        symptoms: 'Fatigue, weak voice, easy sweating, poor appetite',
        diagnosis: 'Spleen-Stomach Qi Deficiency Pattern',
        prescription: 'Modified Sijunzi Decoction: Codonopsis 15g, Atractylodes 12g, Poria 12g, Honey-fried Licorice 6g, Astragalus 20g',
        constitution: 'Qi Deficiency',
        notes: 'Advised patient to rest and avoid overexertion. Recommended Astragalus & Codonopsis Qi Tonic Soup pack.',
      },
      {
        id: 'R002',
        date: '2024-03-15',
        symptoms: 'Fatigue improved, but still sweats easily, sleep is fair',
        diagnosis: 'Qi Deficiency Pattern (Improving)',
        prescription: 'Modified Buzhong Yiqi Decoction: Codonopsis 12g, Astragalus 15g, Atractylodes 10g, Angelica 8g',
        constitution: 'Qi Deficiency',
        notes: 'Condition is improving. Continue treatment.',
      },
    ],
  },
  {
    id: 'P002',
    name: 'Mary Li',
    gender: 'Female',
    age: 38,
    phone: '9234 5678',
    constitution: 'Yin Deficiency',
    lastVisit: '2024-04-12',
    totalVisits: 5,
    image: '/images/patient-002.jpg',
    records: [
      {
        id: 'R003',
        date: '2024-04-12',
        symptoms: 'Dry mouth and throat, warm palms and soles, insomnia with vivid dreams, dry stools',
        diagnosis: 'Yin Deficiency with Fire Flaring Pattern',
        prescription: 'Modified Liuwei Dihuang Pill: Rehmannia 15g, Cornus 10g, Chinese Yam 15g, Moutan 10g, Poria 10g, Alisma 10g',
        constitution: 'Yin Deficiency',
        notes: 'Advised to drink more water and avoid spicy, heaty foods. Recommended Lily & Snow Fungus Nourishing Soup pack.',
      },
    ],
  },
  {
    id: 'P003',
    name: 'Jimmy Zhang',
    gender: 'Male',
    age: 52,
    phone: '9345 6789',
    constitution: 'Damp-Heat',
    lastVisit: '2024-04-08',
    totalVisits: 12,
    image: '/images/patient-003.jpg',
    records: [
      {
        id: 'R004',
        date: '2024-04-08',
        symptoms: 'Oily face, bitter taste and bad breath, sticky stools, dark yellow urine',
        diagnosis: 'Damp-Heat Internal Accumulation Pattern',
        prescription: 'Modified Longdan Xiegan Decoction: Gentiana 6g, Scutellaria 10g, Gardenia 10g, Alisma 12g, Plantain Seed 10g',
        constitution: 'Damp-Heat',
        notes: 'Maintain a light diet, avoid spicy and greasy foods. Recommended Mung Bean & Coix Seed Cooling Soup pack.',
      },
      {
        id: 'R005',
        date: '2024-02-20',
        symptoms: 'Increased facial acne, bitter taste and dry mouth',
        diagnosis: 'Liver-Gallbladder Damp-Heat Pattern',
        prescription: 'Modified Yinchenhao Decoction: Capillaris 15g, Gardenia 10g, Rhubarb 6g, Scutellaria 10g',
        constitution: 'Damp-Heat',
        notes: '',
      },
    ],
  },
  {
    id: 'P004',
    name: 'Lisa Wang',
    gender: 'Female',
    age: 29,
    phone: '9456 7890',
    constitution: 'Qi Stagnation',
    lastVisit: '2024-04-11',
    totalVisits: 3,
    image: '/images/patient-004.jpg',
    records: [
      {
        id: 'R006',
        date: '2024-04-11',
        symptoms: 'Low mood, chest tightness, frequent sighing, poor sleep',
        diagnosis: 'Liver Qi Stagnation Pattern',
        prescription: 'Modified Xiaoyao Powder: Bupleurum 10g, Angelica 10g, White Peony 12g, Atractylodes 10g, Poria 12g, Licorice 6g',
        constitution: 'Qi Stagnation',
        notes: 'Advised to maintain a relaxed mood and exercise moderately. Recommended Rose & Buddha Hand Liver-Soothing Soup pack.',
      },
    ],
  },
  {
    id: 'P005',
    name: 'James Liu',
    gender: 'Male',
    age: 60,
    phone: '9567 8901',
    constitution: 'Yang Deficiency',
    lastVisit: '2024-04-05',
    totalVisits: 15,
    image: '/images/patient-005.jpg',
    records: [
      {
        id: 'R007',
        date: '2024-04-05',
        symptoms: 'Cold intolerance, cold hands and feet, soreness in lower back and knees, low energy',
        diagnosis: 'Kidney Yang Deficiency Pattern',
        prescription: 'Modified Jingui Shenqi Pill: Rehmannia 15g, Cornus 10g, Chinese Yam 15g, Aconite 6g, Cinnamon 3g',
        constitution: 'Yang Deficiency',
        notes: 'Keep warm and tonic appropriately. Recommended Angelica & Ginger Mutton Soup.',
      },
    ],
  },
  {
    id: 'P006',
    name: 'Amy Chen',
    gender: 'Female',
    age: 33,
    phone: '9678 9012',
    constitution: 'Blood Stasis',
    lastVisit: '2024-04-09',
    totalVisits: 6,
    image: '/images/patient-006.jpg',
    records: [
      {
        id: 'R008',
        date: '2024-04-09',
        symptoms: 'Dull complexion, prone to bruising, menstrual pain, dark menstrual blood with clots',
        diagnosis: 'Blood Stasis Pattern',
        prescription: 'Modified Xuefu Zhuyu Decoction: Angelica 10g, Rehmannia 12g, Peach Kernel 10g, Safflower 6g, Aurantium 8g',
        constitution: 'Blood Stasis',
        notes: 'Advised to exercise moderately to promote blood circulation. Recommended Hawthorn & Safflower Blood-Activating Soup pack.',
      },
    ],
  },
  {
    id: 'P007',
    name: 'William Huang',
    gender: 'Male',
    age: 41,
    phone: '9789 0123',
    constitution: 'Phlegm-Dampness',
    lastVisit: '2024-04-07',
    totalVisits: 4,
    image: '/images/patient-007.jpg',
    records: [
      {
        id: 'R009',
        date: '2024-04-07',
        symptoms: 'Heavy body sensation, abdominal fullness, excessive phlegm, sticky mouth sensation',
        diagnosis: 'Phlegm-Dampness Internal Obstruction Pattern',
        prescription: 'Modified Erchen Decoction: Tangerine Peel 10g, Pinellia 10g, Poria 15g, Licorice 6g, Atractylodes 12g',
        constitution: 'Phlegm-Dampness',
        notes: 'Control diet and exercise moderately. Recommended Coix Seed & Poria Dampness-Removing Soup pack.',
      },
    ],
  },
  {
    id: 'P008',
    name: 'Tiffany Lin',
    gender: 'Female',
    age: 26,
    phone: '9890 1234',
    constitution: 'Special Constitution',
    lastVisit: '2024-04-13',
    totalVisits: 2,
    image: '/images/patient-008.jpg',
    records: [
      {
        id: 'R010',
        date: '2024-04-13',
        symptoms: 'Skin prone to allergies, rashes during seasonal changes, nasal sensitivity',
        diagnosis: 'Lung-Spleen Qi Deficiency, Wei-Defensive Instability',
        prescription: 'Modified Yupingfeng Powder: Astragalus 15g, Atractylodes 12g, Saposhnikovia 6g, Cicada Slough 6g, Kochia 10g',
        constitution: 'Special Constitution',
        notes: 'Avoid allergens and strengthen constitution. Recommended Ganoderma & Astragalus Immune Soup.',
      },
    ],
  },
]

export function searchPatients(query: string): Patient[] {
  const lowerQuery = query.toLowerCase()
  return patients.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) || 
    p.phone.includes(query) ||
    p.constitution.toLowerCase().includes(lowerQuery)
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
