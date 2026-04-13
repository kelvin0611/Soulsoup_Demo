import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Camera, Loader2, Check } from 'lucide-react'
import { useDoctorStore } from '@/stores/doctorStore'
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
    gender: '男' as '男' | '女',
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
      setOcrResult(`辨識結果：
主訴：頭暈乏力，睡眠欠佳
舌象：舌淡紅，苔薄白
脈象：脈細弱
診斷：氣血兩虛
方藥：八珍湯加減`)

      setForm(prev => ({
        ...prev,
        symptoms: '頭暈乏力，睡眠欠佳，面色蒼白',
        constitution: '氣虛質',
        diagnosis: '氣血兩虛證',
        prescription: '八珍湯加減：黨參12g、白朮10g、茯苓12g、當歸10g、川芎6g、熟地黃12g、白芍10g、炙甘草6g',
      }))
    }, 2500)
  }

  const handleSave = () => {
    if (!form.symptoms || !form.diagnosis) {
      alert('請填寫完整病歷信息')
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
      alert('病歷保存成功')
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
            <h1 className="title-md">{isNew ? '新建病歷' : '病歷詳情'}</h1>
            {patient && <p className="text-xs text-gray-500">{patient.name} {patient.gender} {patient.age}歲</p>}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* New patient info */}
        {isNew && (
          <div className="p-4 bg-white mb-2">
            <h3 className="title-md mb-4">患者基本信息</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 block mb-2">姓名</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="請輸入患者姓名"
                  className="input-field"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-500 block mb-2">性別</label>
                  <select
                    value={newPatient.gender}
                    onChange={e => setNewPatient({ ...newPatient, gender: e.target.value as '男' | '女' })}
                    className="select-field"
                  >
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-500 block mb-2">年齡</label>
                  <input
                    type="number"
                    value={newPatient.age}
                    onChange={e => setNewPatient({ ...newPatient, age: parseInt(e.target.value) || 0 })}
                    placeholder="年齡"
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-2">聯絡電話</label>
                <input
                  type="tel"
                  value={newPatient.phone}
                  onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })}
                  placeholder="請輸入電話號碼"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {/* OCR Upload */}
        <div className="p-4 bg-white mb-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="title-md">病歷資料</h3>
            <button 
              className="flex items-center text-tcm-green text-sm"
              onClick={triggerOCR}
            >
              <Camera className="w-4 h-4 mr-1" />
              OCR識別
            </button>
          </div>

          {!ocrResult && !showOCRLoading && (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer"
              onClick={triggerOCR}
            >
              <Camera className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">點擊上傳手寫病歷</p>
              <p className="text-xs text-gray-400 mt-1">支持拍照或相冊選擇</p>
            </div>
          )}

          {showOCRLoading && (
            <div className="relative h-48 bg-gray-900 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">正在識別...</p>
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
                  識別結果
                </span>
                <button className="text-xs text-gray-500" onClick={() => setOcrResult('')}>重新識別</button>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line">{ocrResult}</p>
            </div>
          )}
        </div>

        {/* Record form */}
        <div className="p-4 bg-white mb-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 block mb-2">就診日期</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">症狀描述</label>
              <textarea
                value={form.symptoms}
                onChange={e => setForm({ ...form, symptoms: e.target.value })}
                rows={3}
                placeholder="請輸入患者症狀"
                className="textarea-field"
              ></textarea>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">體質判斷</label>
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
              <label className="text-sm text-gray-500 block mb-2">中醫診斷</label>
              <input
                type="text"
                value={form.diagnosis}
                onChange={e => setForm({ ...form, diagnosis: e.target.value })}
                placeholder="如：脾胃氣虛證"
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">處方用藥</label>
              <textarea
                value={form.prescription}
                onChange={e => setForm({ ...form, prescription: e.target.value })}
                rows={4}
                placeholder="請輸入處方藥物及劑量"
                className="textarea-field"
              ></textarea>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2">醫囑備註</label>
              <textarea
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                rows={2}
                placeholder="其他需要記錄的信息"
                className="textarea-field"
              ></textarea>
            </div>
          </div>
        </div>

        {/* History timeline */}
        {patient && patient.records.length > 0 && (
          <div className="p-4">
            <h3 className="title-md mb-4">歷史病歷</h3>
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
          {saving ? '保存中...' : '保存病歷'}
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
