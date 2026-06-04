// src/components/Layout.jsx
// Shared Sidebar + TopBar used on every authenticated page.
// Usage:
//   import { Sidebar, TopBar } from '../components/Layout';

import {
  Brain, Home, Upload, MessageSquare, FileText,
  BarChart2, LogOut, ChevronLeft, ChevronRight, Search, Bell,
} from 'lucide-react';

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', icon: Home,          label: 'Dashboard'  },
  { id: 'upload',    icon: Upload,        label: 'Upload'     },
  { id: 'chat',      icon: MessageSquare, label: 'Chat'       },
  { id: 'documents', icon: FileText,      label: 'Documents'  },
  { id: 'analytics', icon: BarChart2,     label: 'Analytics'  },
];

const PAGE_LABELS = {
  dashboard: 'Dashboard',
  upload:    'Upload Documents',
  chat:      'Chat with Documents',
  documents: 'Document Viewer',
  analytics: 'Analytics',
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
export function Sidebar({ page, setPage, collapsed, setCollapsed, onLogout }) {
  const w = collapsed ? 60 : 214;

  return (
    <aside style={{
      width: w, minWidth: w,
      background: 'var(--bg-panel)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.25s', overflow: 'hidden',
    }}>

      {/* Logo row */}
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
          {!collapsed && (
            <span style={{ fontWeight: 800, fontSize: 15, whiteSpace: 'nowrap' }}>
              VectorMind
            </span>
          )}
        </div>

        {!collapsed && (
          <button onClick={() => setCollapsed(true)} style={iconBtn}>
            <ChevronLeft size={15} color="var(--text-faint)" />
          </button>
        )}
      </div>

      {/* Expand arrow when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={{ ...iconBtn, margin: '8px auto' }}
        >
          <ChevronRight size={15} color="var(--text-faint)" />
        </button>
      )}

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(({ id, icon: Icon, label }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              style={{
                display: 'flex', alignItems: 'center',
                gap: 10,
                padding: collapsed ? '10px 0' : '9px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10, border: 'none', width: '100%',
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: active ? '#a5b4fc' : 'var(--text-faint)',
                cursor: 'pointer', fontSize: 13,
                fontWeight: active ? 700 : 400,
                transition: 'all 0.15s',
              }}
            >
              <Icon size={17} />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
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

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
export function TopBar({ page }) {
  return (
    <header style={{
      height: 60, flexShrink: 0,
      background: 'var(--bg-panel)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 16,
    }}>
      <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
        {PAGE_LABELS[page]}
      </span>

      <div style={{ flex: 1 }} />

      {/* Search */}
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

      {/* Bell */}
      <button style={{ ...iconBtn, position: 'relative' }}>
        <Bell size={18} color="var(--text-faint)" />
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--accent)',
        }} />
      </button>

      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'var(--accent-grad)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 800, color: '#fff',
      }}>
        AS
      </div>
    </header>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const iconBtn = {
  background: 'none', border: 'none',
  cursor: 'pointer', padding: 6, borderRadius: 8,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
