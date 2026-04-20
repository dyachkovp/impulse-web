import { HashRouter, Routes, Route, Navigate } from 'react-router'
import Login from './pages/Login'
import SberId from './pages/SberId'
import OnboardingAbout from './pages/OnboardingAbout'
import OnboardingSpecialization from './pages/OnboardingSpecialization'
import OnboardingAssessment from './pages/OnboardingAssessment'
import HypothesesList from './pages/HypothesesList'
import HypothesisDetail from './pages/HypothesisDetail'
import ProjectsList from './pages/ProjectsList'
import ProjectDetail from './pages/ProjectDetail'
import Dashboard from './pages/Dashboard'
import UiKit from './pages/UiKit'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sber-id" element={<SberId />} />
        <Route path="/onboarding/about" element={<OnboardingAbout />} />
        <Route path="/onboarding/specialization" element={<OnboardingSpecialization />} />
        <Route path="/onboarding/assessment" element={<OnboardingAssessment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hypotheses" element={<HypothesesList />} />
        <Route path="/hypotheses/:id" element={<HypothesisDetail />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/ui-kit" element={<UiKit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
