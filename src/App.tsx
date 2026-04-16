import { HashRouter, Routes, Route, Navigate } from 'react-router'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UiKit from './pages/UiKit'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ui-kit" element={<UiKit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
