// src/App.jsx
import { useState } from 'react';
import './styles/global.css';

import LandingPage    from './pages/LandingPage';
import AuthPage       from './pages/AuthPage';

// Admin portal pages
import AdminDashboard    from './pages/admin/AdminDashboard';
import UserManagement    from './pages/admin/UserManagement';
import AdminAnalytics    from './pages/admin/AdminAnalytics';
import AdminDocuments    from './pages/admin/AdminDocuments';

// Controller portal pages
import ControllerDashboard from './pages/controller/ControllerDashboard';
import UploadDocs          from './pages/controller/UploadDocs';
import Testing             from './pages/controller/Testing';
import RequestApproval     from './pages/controller/RequestApproval';
import ModelDashboard      from './pages/controller/ModelDashboard';

// User portal pages
import ChatPage      from './pages/user/ChatPage';
import ChatHistory   from './pages/user/ChatHistory';
import HelpPage      from './pages/user/HelpPage';

// Layouts (role-specific sidebars)
import { AdminLayout }      from './layouts/AdminLayout';
import { ControllerLayout } from './layouts/ControllerLayout';
import { UserLayout }       from './layouts/UserLayout';

export default function App() {
  const [page,       setPage]       = useState('landing');
  const [role,       setRole]       = useState(null);
  const [activePage, setActivePage] = useState(null);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setActivePage(
      selectedRole === 'admin' ? 'admin-dashboard'
        : selectedRole === 'controller' ? 'ctrl-dashboard'
          : 'chat',
    );
    setPage('app');
  };
  const handleLogout = () => { setPage('landing'); setRole(null); setActivePage(null); };

  if (page === 'landing') return <LandingPage onStart={() => setPage('auth')} />;
  if (page === 'auth')    return <AuthPage onLogin={handleLogin} />;

  if (role === 'admin') {
    return (
      <AdminLayout activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout}>
        {activePage === 'admin-dashboard' && <AdminDashboard setPage={setActivePage} />}
        {activePage === 'user-management' && <UserManagement />}
        {activePage === 'admin-analytics' && <AdminAnalytics />}
        {activePage === 'admin-documents' && <AdminDocuments />}
      </AdminLayout>
    );
  }

  if (role === 'controller') {
    return (
      <ControllerLayout activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout}>
        {activePage === 'ctrl-dashboard'  && <ControllerDashboard setPage={setActivePage} />}
        {activePage === 'upload-docs'     && <UploadDocs />}
        {activePage === 'testing'         && <Testing />}
        {activePage === 'req-approval'    && <RequestApproval />}
        {activePage === 'model-dashboard' && <ModelDashboard setPage={setActivePage} />}
      </ControllerLayout>
    );
  }

  if (role === 'user') {
    return (
      <UserLayout activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout}>
        {activePage === 'chat'         && <ChatPage />}
        {activePage === 'chat-history' && <ChatHistory />}
        {activePage === 'help'         && <HelpPage />}
      </UserLayout>
    );
  }

  return null;
}
