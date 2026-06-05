import { useState } from 'react';
import {
  LayoutDashboard, Upload, FlaskConical, ClipboardCheck, Cpu,
} from 'lucide-react';
import { SidebarShell, TopBar } from './shared/AppShell';

const NAV = [
  { id: 'ctrl-dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'upload-docs',     icon: Upload,          label: 'Upload Docs' },
  { id: 'testing',         icon: FlaskConical,    label: 'Testing' },
  { id: 'req-approval',    icon: ClipboardCheck,  label: 'Request & Approval' },
  { id: 'model-dashboard', icon: Cpu,             label: 'Model Dashboard' },
];

const PAGE_LABELS = {
  'ctrl-dashboard':  'Dashboard',
  'upload-docs':     'Upload Documents',
  'testing':         'Model Testing',
  'req-approval':    'Request & Approval',
  'model-dashboard': 'Model Dashboard',
};

export function ControllerLayout({ activePage, setActivePage, onLogout, children }) {
  const [collapsed, setCollapsed] = useState(false);

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
        role="controller"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        onNavClick={(item) => setActivePage(item.id)}
        onLogout={onLogout}
        nav={NAV}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar
          role="controller"
          pageLabel={PAGE_LABELS[activePage]}
          onLogout={onLogout}
        />
        <main style={{ flex: 1, overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
