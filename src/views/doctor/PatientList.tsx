import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, User, Plus, LogOut } from 'lucide-react'
import { useDoctorStore } from '@/stores/doctorStore'
import { patients } from '@/mocks/patients'

export default function PatientList() {
  const navigate = useNavigate()
  const { isLoggedIn, doctorInfo, logout, filteredPatients, setSearchQuery } = useDoctorStore()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/doctor/login')
    }
  }, [isLoggedIn, navigate])

  const handleSearch = (value: string) => {
    setQuery(value)
    setSearchQuery(value)
  }

  const handleViewPatient = (patientId: string) => {
    navigate(`/doctor/record/${patientId}`)
  }

  const handleAddNew = () => {
    navigate('/doctor/record')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="patient-list-page min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="title-lg">Patient Management</h1>
            <p className="text-xs text-gray-500 mt-1">{doctorInfo.clinic}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-tcm-green rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-tcm-red">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search by name, phone or constitution"
            className="input-field pl-12"
          />
        </div>

        {/* Stats */}
        <div className="flex gap-2 mt-4">
          <span className="px-3 py-1 bg-tcm-green/10 text-tcm-green rounded-full text-xs">
            All {patients.length}
          </span>
          <span className="px-3 py-1 bg-tcm-gold/20 text-tcm-brown rounded-full text-xs">
            Today 3
          </span>
          <span className="px-3 py-1 bg-tcm-red/10 text-tcm-red rounded-full text-xs">
            Follow-up 2
          </span>
        </div>
      </div>

      {/* Patient list */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredPatients.length > 0 ? (
          <div className="space-y-3">
            {filteredPatients.map(patient => (
              <div
                key={patient.id}
                className="patient-card bg-white rounded-xl p-4 shadow-sm cursor-pointer"
                onClick={() => handleViewPatient(patient.id)}
              >
                <div className="flex items-start">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    {patient.image ? (
                      <img src={patient.image} alt={patient.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-tcm-green/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-tcm-green" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-base">{patient.name}</h3>
                      <span className="text-xs text-gray-400">{patient.id}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="mr-3">{patient.gender}</span>
                      <span className="mr-3">{patient.age} y</span>
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="tag tag-green text-xs">{patient.constitution}</span>
                      <span className="text-xs text-gray-400">{patient.totalVisits} visits</span>
                    </div>
                  </div>
                </div>

                {/* Last visit */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center text-xs">
                  <span className="text-gray-500">Last Visit: {patient.lastVisit}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Search className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500">No patients found</p>
          </div>
        )}
      </div>

      {/* Add button */}
      <div className="fixed bottom-6 right-6">
        <button 
          className="w-14 h-14 bg-tcm-green rounded-full shadow-lg flex items-center justify-center"
          onClick={handleAddNew}
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <style>{`
        .patient-card {
          transition: all 0.2s ease;
        }
        .patient-card:active {
          transform: scale(0.98);
          background: #f9f9f9;
        }
      `}</style>
    </div>
  )
}
