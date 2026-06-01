
import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Recruitment from './pages/Recruitment';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import Testimonials from './pages/Testimonials';
import GetStarted from './pages/GetStarted';
import Contact from './pages/Contact';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Companies from './pages/Companies';
import PostJob from './pages/PostJob';
import ScheduleInterview from './pages/ScheduleInterview';
import EmployeeJoiningForm from './pages/EmployeeJoiningForm';
import Industry from './pages/Industry';
import JDMaker from './pages/JDMaker';
import CVScreen from './pages/CVScreen';
import CVMaker from './pages/CVMaker';
import ChatAssistant from './components/ChatAssistant';
import VoiceAssistant from './components/VoiceAssistant';
import FormPage from "./pages/FormPage";
import Admin from "./pages/admin/Login";

/* ---------------- ADMIN CRM IMPORTS ---------------- */
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Candidates from "./pages/admin/Candidates";
import Clients from "./pages/admin/Clients";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="app">

        <Navbar />

        <main>
          <Routes>

            {/* ---------------- PUBLIC ROUTES ---------------- */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/services" element={<Services />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/schedule-interview" element={<ScheduleInterview />} />
            <Route path="/joining-form" element={<EmployeeJoiningForm />} />
            <Route path="/industry" element={<Industry />} />
            <Route path="/jd-maker" element={<JDMaker />} />
            <Route path="/cv-screen" element={<CVScreen />} />
            <Route path="/cv-maker" element={<CVMaker />} />
            <Route path="/admin" element={<Login />} />
            {/* <Route path="/admin/candidates/:id" element={<CandidateDetails />} /> */}
            {/* ---------------- ADMIN ROUTES (CRM) ---------------- */}

            <Route path="/admin/login" element={<Login />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/candidates"
              element={
                <ProtectedRoute>
                  <Candidates />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/clients"
              element={
                <ProtectedRoute>
                  <Clients />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>

        <Footer />
        <VoiceAssistant />
        <ChatAssistant />

      </div>
    </Router>
  );
}

export default App;