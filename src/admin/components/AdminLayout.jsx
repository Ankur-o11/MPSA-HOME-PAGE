import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../styles/admin.css';

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(prev => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="admin-app-container">
      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={closeMobile} />
      <div className="admin-main-layout">
        <AdminHeader onToggleMobile={toggleMobile} />
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
