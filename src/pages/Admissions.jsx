import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Send, 
  Calendar, 
  AlertCircle, 
  Phone, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

import SectionTitle from '../components/SectionTitle';
import { SCHOOL_CONFIG } from '../data/config';

export default function Admissions() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    classApplying: 'Class 1st',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful form submission without ERP link
    setIsSubmitted(true);
  };

  return (
    <div className="admissions-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Admissions 2026–2027</h1>
          <p className="page-banner-subtitle">
            Begin your child's journey toward academic distinction, scientific inquiry, and strong moral character.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Admissions</li>
          </ul>
        </div>
      </div>

      {/* Admission Open Status Banner */}
      <section className="container" style={{ marginTop: '3rem' }}>
        <div 
          style={{
            backgroundColor: 'var(--accent-gold-light)',
            border: '2px solid var(--accent-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Sparkles size={32} color="#926f12" />
            <div>
              <span className="category-tag">Session {SCHOOL_CONFIG.admissionSession}</span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginTop: '0.2rem' }}>
                Online Registration & Admission Open (Classes 1st – 11th Science)
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Seats are allocated on a first-come, first-served basis subject to merit & interaction.
              </p>
            </div>
          </div>
          <a href="#enquiry-form" className="btn btn-primary btn-lg">
            Apply Online Now <ChevronRight size={18} />
          </a>
        </div>
      </section>

      {/* Process & Enquiry Form Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="admissions-grid">
            {/* Left: Process & Eligibility */}
            <div>
              <span className="section-badge">Step-by-Step Guide</span>
              <h2 className="section-title-text" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Admission Procedure
              </h2>

              <div className="process-steps-list">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>
                      Online Enquiry & Registration
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Fill out the online admission enquiry form or obtain the registration form from the school admission counter.
                    </p>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-number">2</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>
                      Interaction / Assessment Test
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Interactive session for primary classes; basic aptitude test in English, Math & Science for Middle & Secondary.
                    </p>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-number">3</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>
                      Document Verification
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Submission of Transfer Certificate (TC), Birth Certificate, Marks Sheet, and passport size photographs.
                    </p>
                  </div>
                </div>

                <div className="step-card">
                  <div className="step-number">4</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>
                      Fee Payment & Enrollment Confirmation
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Completion of admission fee payment and issue of student admission slip & uniform guidelines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Required Documents Box */}
              <div style={{ marginTop: '2.5rem', backgroundColor: 'var(--bg-soft)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={20} color="#D4A72C" /> Required Admission Documents:
                </h3>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.8' }}>
                  <li>Photocopy of Official Birth Certificate</li>
                  <li>Original Transfer Certificate (TC) from previous recognized school</li>
                  <li>Report Card / Mark Sheet of previous class</li>
                  <li>Passport size photographs of student (4 copies) & parents (2 copies)</li>
                  <li>Aadhaar Card copy of student and parents</li>
                </ul>
              </div>
            </div>

            {/* Right: Admission Enquiry Form */}
            <div id="enquiry-form">
              <div className="form-box">
                <span className="section-badge">Online Registration</span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                  Admission Enquiry Form
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Submit details below and our admission counselor will contact you within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="alert-success-custom">
                    <CheckCircle2 size={28} />
                    <div>
                      Thank you! Your admission enquiry has been submitted successfully. Our admissions team will contact you shortly.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Student's Full Name *</label>
                      <input 
                        type="text" 
                        name="studentName"
                        className="form-control"
                        placeholder="Enter student's full name"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Parent / Guardian Name *</label>
                      <input 
                        type="text" 
                        name="parentName"
                        className="form-control"
                        placeholder="Enter parent/guardian name"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Contact Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        className="form-control"
                        placeholder="Enter 10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        className="form-control"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Class Seeking Admission For *</label>
                      <select 
                        name="classApplying"
                        className="form-control"
                        value={formData.classApplying}
                        onChange={handleChange}
                        required
                      >
                        <option value="Class 1st">Class 1st</option>
                        <option value="Class 2nd">Class 2nd</option>
                        <option value="Class 3rd">Class 3rd</option>
                        <option value="Class 4th">Class 4th</option>
                        <option value="Class 5th">Class 5th</option>
                        <option value="Class 6th">Class 6th</option>
                        <option value="Class 7th">Class 7th</option>
                        <option value="Class 8th">Class 8th</option>
                        <option value="Class 9th">Class 9th</option>
                        <option value="Class 10th">Class 10th</option>
                        <option value="Class 11th Science">Class 11th (Science Stream)</option>
                        <option value="Class 12th Science">Class 12th (Science Stream)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Additional Message / Query</label>
                      <textarea 
                        name="message"
                        rows="4"
                        className="form-control"
                        placeholder="Mention any specific queries regarding fee structure, transport, or syllabus..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
                      <Send size={18} /> Submit Enquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions FAQs */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Frequently Asked Questions"
            title="Admission FAQs"
            subtitle="Clear answers to common parent inquiries about school admissions."
          />

          <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ backgroundColor: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--primary-navy)', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={18} color="#D4A72C" /> What is the age criteria for Class 1st admission?
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Child should have completed 5+ years of age as on March 31st of the academic admission session year.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--primary-navy)', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={18} color="#D4A72C" /> Is school bus transportation facility available?
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Yes, MPSA operates GPS-tracked school buses covering all major residential sectors across the city.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--primary-navy)', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={18} color="#D4A72C" /> How can I obtain detailed fee structure information?
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Detailed fee structure breakdown for tuition, labs, library, and sports can be obtained from the school office desk or by submitting the online enquiry form above.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
