import { HashRouter, Routes, Route, Navigate } from 'react-router'
import Login from './pages/Login'
import UiKit from './pages/UiKit'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<UiKit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
