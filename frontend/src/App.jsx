// src/App.jsx
// Root component — manages current page state and renders the correct page.
// Uses simple state-based routing (no React Router needed).

import { useState } from 'react';
import './styles/global.css';

import LandingPage   from './pages/LandingPage';
import AuthPage      from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage    from './pages/UploadPage';
import ChatPage      from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import AnalyticsPage from './pages/AnalyticsPage';

import { Sidebar, TopBar } from './components/Layout';

// ─── PAGES THAT NEED THE SHELL (sidebar + topbar) ────────────────────────────
const SHELL_PAGES = ['dashboard', 'upload', 'chat', 'documents', 'analytics'];

export default function App() {
  const [page,      setPage]      = useState('landing'); // current route
  const [collapsed, setCollapsed] = useState(false);     // sidebar collapse state

  const handleLogin  = () => setPage('dashboard');
  const handleLogout = () => setPage('landing');

  // ── Public pages (no shell) ────────────────────────────────────────────
  if (page === 'landing') return <LandingPage onStart={() => setPage('auth')} />;
  if (page === 'auth')    return <AuthPage    onLogin={handleLogin}           />;

  // ── Authenticated pages (with sidebar + topbar shell) ──────────────────
  return (
    <div style={{
      display: 'flex', height: '100vh',
      background: '#0a0a0f', color: '#e2e8f0',
      fontFamily: 'var(--font)', overflow: 'hidden',
    }}>
      <Sidebar
        page={page}
        setPage={setPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={handleLogout}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar page={page} />

        <main style={{ flex: 1, overflowY: 'auto' }}>
          {page === 'dashboard' && <DashboardPage setPage={setPage} />}
          {page === 'upload'    && <UploadPage    />}
          {page === 'chat'      && <ChatPage      />}
          {page === 'documents' && <DocumentsPage />}
          {page === 'analytics' && <AnalyticsPage />}
        </main>
      </div>
    </div>
  );
}
