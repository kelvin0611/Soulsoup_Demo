import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Camera, Loader2, Check } from 'lucide-react'
import { constitutionTypes } from '@/mocks/constitutions'
import { getPatientById, patients, addMedicalRecord } from '@/mocks/patients'
import type { Patient } from '@/types'

export default function MedicalRecord() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  
  const isNew = !id
  const [patient, setPatient] = useState<Patient | null>(null)
  
  const [newPatient, setNewPatient] = useState({
    name: '',
    gender: 'Male' as 'Male' | 'Female',
    age: 30,
    phone: '',
  })

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    symptoms: '',
    constitution: constitutionTypes[0].name,
    diagnosis: '',
    prescription: '',
    notes: '',
  })

  const [showOCRLoading, setShowOCRLoading] = useState(false)
  const [ocrResult, setOcrResult] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) {
      const p = getPatientById(id)
      if (p) {
        setPatient(p)
      }
    }
  }, [id])

  const triggerOCR = () => {
    setShowOCRLoading(true)
    setOcrResult('')

    setTimeout(() => {
      setShowOCRLoading(false)
      setOcrResult(`OCR Result:\nChief Complaint: Dizziness, fatigue, poor sleep\nTongue: Pale red tongue, thin white coating\nPulse: Thin and weak pulse\nDiagnosis: Qi and Blood Deficiency\nPrescription: Modified Bazhen Decoction`)

      setForm(prev => ({
        ...prev,
        symptoms: 'Dizziness, fatigue, poor sleep, pale complexion',
        constitution: 'Qi Deficiency',
        diagnosis: 'Qi and Blood Deficiency Pattern',
        prescription: 'Modified Bazhen Decoction: Codonopsis 12g, Atractylodes 10g, Poria 12g, Angelica 10g, Chuanxiong 6g, Rehmannia 12g, White Peony 10g, Honey-fried Licorice 6g',
      }))
    }, 2500)
  }

  const handleSave = () => {
    if (!form.symptoms || !form.diagnosis) {
      alert('Please complete the medical record')
      return
    }

    setSaving(true)

    setTimeout(() => {
      if (patient) {
        addMedicalRecord(patient.id, {
          date: form.date,
          symptoms: form.symptoms,
          diagnosis: form.diagnosis,
          prescription: form.prescription,
          constitution: form.constitution,
          notes: form.notes,
        })
      } else if (isNew && newPatient.name) {
        const newId = `P${String(patients.length + 1).padStart(3, '0')}`
        patients.unshift({
          id: newId,
          name: newPatient.name,
          gender: newPatient.gender,
          age: newPatient.age,
          phone: newPatient.phone,
          constitution: form.constitution,
          lastVisit: form.date,
          totalVisits: 1,
          records: [{
            id: `R${Date.now()}`,
            date: form.date,
            symptoms: form.symptoms,
            diagnosis: form.diagnosis,
            prescription: form.prescription,
            constitution: form.constitution,
            notes: form.notes,
          }],
        })
      }

      setSaving(false)
      alert('Record saved successfully')
      navigate('/doctor/patients')
    }, 1000)
  }

  return (
    <div className="record-page min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center">
          <ArrowLeft className="w-6 h-6 text-tcm-ink cursor-pointer mr-4" onClick={() => navigate(-1)} />
          <div className="flex-1">
            <h1 className="title-md">{isNew ? 'New Record' : 'Record Details'}</h1>
            {patient && <p className="text-xs text-gray-500">{patient.name} {patient.gender} {patient.age} y</p>}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* New patient info */}
        {isNew && (
          <div className="p-4 bg-white mb-2">
            <h3 className="title-md mb-4">Patient Basic Info</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 block mb-2">Name</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="Enter patient name"
                  className="input-field"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-500 block mb-2">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={e => setNewPatient({ ...newPatient, gender: e.target.value as 'Male' | 'Female' })}
                    className="select-field"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-500 block mb-2">Age</label>
                  <input
                    type="number"
                    value={newPatient.age}
                    onChange={e => setNewPatient({ ...newPatient, age: parseInt(e.target.value) || 0 })}
                    placeholder="Age"
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-2">Phone</label>
                <input
                  type="tel"
                  value={newPatient.phone}
                  onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {/* OCR Upload */}
        <div className="p-4 bg-white mb-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="title-md">Medical Record Data</h3>
            <button 
              className="flex items-center text-tcm-green text-sm"
              onClick={triggerOCR}
            >
              <Camera className="w-4 h-4 mr-1" />
              OCR Scan
            </button>
          </div>

          {!ocrResult && !showOCRLoading && (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer"
              onClick={triggerOCR}
            >
              <Camera className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Tap to upload handwritten record</p>
              <p className="text-xs text-gray-400 mt-1">Supports camera or gallery</p>
            </div>
          )}

          {showOCRLoading && (
            <div className="relative h-48 bg-gray-900 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">Scanning...</p>
                </div>
              </div>
              <div className="scan-line absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-tcm-green to-transparent"></div>
            </div>
          )}

          {ocrResult && (
            <div className="bg-tcm-paper rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-tcm-green flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Scan Result
                </span>
                <button className="text-xs text-gray-500" onClick={() => setOcrResult('')}>Rescan</button>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line">{ocrResult}</p>
            </div>
          )}
        </div>

        {/* Record form */}
        <div className="p-4 bg-white mb-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 block mb-2">Visit Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">Symptoms</label>
              <textarea
                value={form.symptoms}
                onChange={e => setForm({ ...form, symptoms: e.target.value })}
                rows={3}
                placeholder="Enter patient symptoms"
                className="textarea-field"
              ></textarea>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">Constitution</label>
              <select
                value={form.constitution}
                onChange={e => setForm({ ...form, constitution: e.target.value })}
                className="select-field"
              >
                {constitutionTypes.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">TCM Diagnosis</label>
              <input
                type="text"
                value={form.diagnosis}
                onChange={e => setForm({ ...form, diagnosis: e.target.value })}
                placeholder="e.g., Spleen-Stomach Qi Deficiency"
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">Prescription</label>
              <textarea
                value={form.prescription}
                onChange={e => setForm({ ...form, prescription: e.target.value })}
                rows={4}
                placeholder="Enter prescription and dosage"
                className="textarea-field"
              ></textarea>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">Notes</label>
              <textarea
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                rows={2}
                placeholder="Other information to record"
                className="textarea-field"
              ></textarea>
            </div>
          </div>
        </div>

        {/* History timeline */}
        {patient && patient.records.length > 0 && (
          <div className="p-4">
            <h3 className="title-md mb-4">History</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-4">
                {patient.records.map(record => (
                  <div key={record.id} className="relative pl-10">
                    <div className="absolute left-2 top-2 w-4 h-4 bg-tcm-green rounded-full border-2 border-white shadow"></div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{record.date}</span>
                        <span className="tag tag-green text-xs">{record.constitution}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{record.diagnosis}</p>
                      <p className="text-xs text-gray-400 line-clamp-2">{record.symptoms}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save button */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <button 
          className="btn-primary w-full flex items-center justify-center"
          disabled={saving}
          onClick={handleSave}
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {saving ? 'Saving...' : 'Save Record'}
        </button>
      </div>

      <style>{`
        .record-page {
          padding-bottom: 80px;
        }
        .scan-line {
          animation: scan 2s linear infinite;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
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
