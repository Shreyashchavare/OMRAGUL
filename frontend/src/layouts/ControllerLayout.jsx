import { useState } from 'react';
import {
  Brain, LayoutDashboard, Upload, FlaskConical, ClipboardCheck, Cpu,
  LogOut, ChevronLeft, ChevronRight, Search, Bell, UserCircle,
} from 'lucide-react';

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
      display: 'flex', height: '100vh',
      background: 'var(--bg-surface)', color: 'var(--text-primary)',
      fontFamily: 'var(--font)', overflow: 'hidden',
    }}>
      <SidebarShell
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={onLogout}
        profile={{ initials: 'CT', name: 'Controller', role: 'Doc Controller', badge: 'CTRL', badgeColor: '#a855f7', badgeBg: 'rgba(168,85,247,0.15)' }}
        nav={NAV}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar pageLabel={PAGE_LABELS[activePage]} avatar="CT" />
        <main style={{ flex: 1, overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}

function SidebarShell({ collapsed, setCollapsed, activePage, setActivePage, onLogout, profile, nav }) {
  const w = collapsed ? 62 : 220;

  return (
    <aside style={{
      width: w, minWidth: w,
      background: 'var(--bg-panel)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.25s', overflow: 'hidden',
    }}>
      <div style={{
        height: 60, flexShrink: 0, padding: collapsed ? '0' : '0 16px',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: 'var(--accent-grad)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Brain size={15} color="#fff" />
          </div>
          {!collapsed && <span style={{ fontWeight: 800, fontSize: 15, whiteSpace: 'nowrap' }}>VectorMind</span>}
        </div>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} style={iconBtn}>
            <ChevronLeft size={15} color="var(--text-faint)" />
          </button>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)} style={{ ...iconBtn, margin: '8px auto' }}>
          <ChevronRight size={15} color="var(--text-faint)" />
        </button>
      )}

      <div style={{ padding: collapsed ? '12px 8px' : '14px 12px', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'var(--accent-grad)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: '#fff',
          }}>
            {profile.initials}
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{profile.name}</span>
                <span style={{
                  fontSize: 9, padding: '2px 6px', borderRadius: 99, fontWeight: 700,
                  background: profile.badgeBg, color: profile.badgeColor,
                }}>{profile.badge}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{profile.role}</div>
            </div>
          )}
        </div>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, color: 'var(--text-faint)' }}>
            <UserCircle size={12} />
            <span style={{ fontSize: 10 }}>Profile</span>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {nav.map(({ id, icon: Icon, label }) => {
          const active = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: collapsed ? '10px 0' : '9px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10, border: 'none', width: '100%',
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: active ? '#a5b4fc' : 'var(--text-faint)',
                cursor: 'pointer', fontSize: 13,
                fontWeight: active ? 700 : 400,
              }}
            >
              <Icon size={17} />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '10px 6px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={onLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: collapsed ? '10px 0' : '9px 12px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: 10, border: 'none', width: '100%',
            background: 'transparent', color: 'var(--text-faint)',
            cursor: 'pointer', fontSize: 13,
          }}
        >
          <LogOut size={17} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}

function TopBar({ pageLabel, avatar }) {
  return (
    <header style={{
      height: 60, flexShrink: 0,
      background: 'var(--bg-panel)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 16,
    }}>
      <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{pageLabel}</span>
      <div style={{ flex: 1 }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--border)',
        borderRadius: 10, padding: '6px 14px',
      }}>
        <Search size={14} color="var(--text-faint)" />
        <input
          placeholder="Search anything..."
          style={{
            background: 'none', border: 'none', outline: 'none',
            color: 'var(--text-muted)', fontSize: 13, width: 160,
          }}
        />
      </div>
      <button style={{ ...iconBtn, position: 'relative' }}>
        <Bell size={18} color="var(--text-faint)" />
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--accent)',
        }} />
      </button>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'var(--accent-grad)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 800, color: '#fff',
      }}>
        {avatar}
      </div>
    </header>
  );
}

const iconBtn = {
  background: 'none', border: 'none',
  cursor: 'pointer', padding: 6, borderRadius: 8,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
