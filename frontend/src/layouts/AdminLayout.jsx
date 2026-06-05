import { useState } from 'react';
import {
  LayoutDashboard, Users, BarChart3, FileCheck, Settings,
} from 'lucide-react';
import { SidebarShell, TopBar } from './shared/AppShell';

const NAV = [
  { navKey: 'dashboard',  id: 'admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { navKey: 'approval',   id: 'admin-documents', icon: FileCheck,       label: 'Approval Queue' },
  { navKey: 'models',     id: 'admin-analytics', icon: BarChart3,       label: 'Model Management' },
  { navKey: 'users',      id: 'user-management', icon: Users,           label: 'User Management' },
  { navKey: 'settings',   id: 'admin-dashboard', icon: Settings,        label: 'System Settings' },
];

const PAGE_LABELS = {
  'admin-dashboard': 'Dashboard',
  'user-management': 'User Management',
  'admin-analytics': 'Model Management',
  'admin-documents': 'Approval Queue',
};

export function AdminLayout({ activePage, setActivePage, onLogout, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState('dashboard');

  const handleNav = (item) => {
    setActiveNavKey(item.navKey);
    setActivePage(item.id);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'var(--bg-surface)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font)',
      overflow: 'hidden',
    }}>
      <SidebarShell
        role="admin"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        activeNavKey={activeNavKey}
        onNavClick={handleNav}
        onLogout={onLogout}
        nav={NAV}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar
          role="admin"
          pageLabel={PAGE_LABELS[activePage]}
          onLogout={onLogout}
        />
        <main style={{ flex: 1, overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
