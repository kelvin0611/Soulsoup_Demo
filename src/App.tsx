import { Routes, Route } from 'react-router-dom'
import Welcome from './views/patient/Welcome'
import ConstitutionTest from './views/patient/ConstitutionTest'
import ConstitutionResult from './views/patient/ConstitutionResult'
import SoupRecommend from './views/patient/SoupRecommend'
import OrderConfirm from './views/patient/OrderConfirm'
import OrderSuccess from './views/patient/OrderSuccess'
import ChatBot from './views/patient/ChatBot'
import DoctorLogin from './views/doctor/Login'
import PatientList from './views/doctor/PatientList'
import MedicalRecord from './views/doctor/MedicalRecord'

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Patient Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/test" element={<ConstitutionTest />} />
        <Route path="/result" element={<ConstitutionResult />} />
        <Route path="/soups" element={<SoupRecommend />} />
        <Route path="/order" element={<OrderConfirm />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/chat" element={<ChatBot />} />
        
        {/* Doctor Routes */}
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/patients" element={<PatientList />} />
        <Route path="/doctor/record/:id?" element={<MedicalRecord />} />
      </Routes>
    </div>
  )
}

export default App
