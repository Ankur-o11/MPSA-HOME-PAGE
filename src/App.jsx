import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Global Public Styles
import './styles/global.css';
import './styles/navbar.css';
import './styles/home.css';
import './styles/pages.css';
import './styles/faculty.css';
import './styles/gallery.css';
import './styles/footer.css';

// Context
import { AuthProvider } from './admin/context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Founder from './pages/Founder';
import PrincipalMessage from './pages/PrincipalMessage';
import Academics from './pages/Academics';
import Faculty from './pages/Faculty';
import TeacherProfile from './pages/TeacherProfile';
import Facilities from './pages/Facilities';
import Admissions from './pages/Admissions';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';
import Notices from './pages/Notices';
import Events from './pages/Events';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Components & Pages
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import ManageTeachers from './admin/pages/ManageTeachers';
import ManagePrincipal from './admin/pages/ManagePrincipal';
import ManageFounder from './admin/pages/ManageFounder';
import ManageGallery from './admin/pages/ManageGallery';
import ManageNotices from './admin/pages/ManageNotices';
import ManageEvents from './admin/pages/ManageEvents';
import ManageAchievements from './admin/pages/ManageAchievements';
import ManageFacilities from './admin/pages/ManageFacilities';
import ManageAcademics from './admin/pages/ManageAcademics';
import ManageAdmissions from './admin/pages/ManageAdmissions';
import ManageContact from './admin/pages/ManageContact';
import ManageSettings from './admin/pages/ManageSettings';

// Public Website Layout Wrapper
function PublicLayout() {
  return (
    <div className="app-main-wrapper">
      <ScrollToTop />
      <Navbar />
      <main className="app-content-body">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* PUBLIC WEBSITE ROUTES (NO LOGIN REQUIRED) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/principal-message" element={<PrincipalMessage />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/:id" element={<TeacherProfile />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN AUTH LOGIN ROUTE */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN PANEL ROUTES */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="principal" element={<ManagePrincipal />} />
          <Route path="founder" element={<ManageFounder />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="notices" element={<ManageNotices />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="achievements" element={<ManageAchievements />} />
          <Route path="facilities" element={<ManageFacilities />} />
          <Route path="academics" element={<ManageAcademics />} />
          <Route path="admissions" element={<ManageAdmissions />} />
          <Route path="contact" element={<ManageContact />} />
          <Route path="settings" element={<ManageSettings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
