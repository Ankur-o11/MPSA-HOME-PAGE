import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Global Styles
import './styles/global.css';
import './styles/navbar.css';
import './styles/home.css';
import './styles/pages.css';
import './styles/faculty.css';
import './styles/gallery.css';
import './styles/footer.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
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

export default function App() {
  return (
    <div className="app-main-wrapper">
      <ScrollToTop />
      <Navbar />
      <main className="app-content-body">
        <Routes>
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
