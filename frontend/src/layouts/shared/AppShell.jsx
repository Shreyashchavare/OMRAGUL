import { useState, useRef, useEffect } from 'react';
import {
  Gem, LogOut, ChevronLeft, ChevronRight, Search, Bell,
  User, Settings, HelpCircle,
} from 'lucide-react';
import { ROLE_CONFIG } from './roleConfig';

export function OmRagBrand({ collapsed, size = 28 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 8,
      flexShrink: 0,
      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #6366f1 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(124,58,237,0.35)',
    }}>
      <Gem size={size * 0.55} color="#fff" strokeWidth={2.2} />
    </div>
  );
}

export function SidebarShell({
  role,
  collapsed,
  setCollapsed,
  activePage,
  activeNavKey,
  onNavClick,
  onLogout,
  nav,
}) {
  const theme = ROLE_CONFIG[role];
  const w = collapsed ? 62 : 220;

  return (
    <aside style={{
      width: w,
      minWidth: w,
      background: 'var(--bg-panel)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.25s',
      overflow: 'hidden',
    }}>
      {/* Branding */}
      <div style={{
        height: 60,
        flexShrink: 0,
        padding: collapsed ? '0' : '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <OmRagBrand collapsed={collapsed} />
          {!collapsed && (
            <span style={{ fontWeight: 800, fontSize: 15, whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
              OM-RAG
            </span>
          )}
        </div>
        {!collapsed && (
          <button type="button" onClick={() => setCollapsed(true)} style={iconBtn} aria-label="Collapse sidebar">
            <ChevronLeft size={15} color="var(--text-faint)" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          style={{ ...iconBtn, margin: '8px auto' }}
          aria-label="Expand sidebar"
        >
          <ChevronRight size={15} color="var(--text-faint)" />
        </button>
      )}

      {/* Role panel */}
      <div style={{
        padding: collapsed ? '12px 8px' : '12px 12px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            flexShrink: 0,
            background: theme.sidebarAvatarBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 800,
            color: '#fff',
          }}>
            {theme.sidebarLetter}
          </div>
          {!collapsed && (
            <span style={{ fontWeight: 700, fontSize: 13, color: '#f1f5f9', whiteSpace: 'nowrap' }}>
              {theme.panelLabel}
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {nav.map((item) => {
          const { navKey, id, icon: Icon, label } = item;
          const key = navKey ?? id;
          const active = activeNavKey != null ? activeNavKey === key : activePage === id;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavClick(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: collapsed ? '10px 0' : '9px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10,
                border: 'none',
                width: '100%',
                background: active ? '#7c3aed' : 'transparent',
                color: active ? '#fff' : 'var(--text-faint)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: active ? 700 : 400,
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <Icon size={17} color={active ? '#fff' : 'var(--text-faint)'} strokeWidth={active ? 2.2 : 2} />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Sidebar logout */}
      <div style={{ padding: '10px 6px', borderTop: '1px solid var(--border)' }}>
        <button
          type="button"
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: collapsed ? '10px 0' : '9px 12px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: 10,
            border: 'none',
            width: '100%',
            background: 'transparent',
            color: 'var(--text-faint)',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          <LogOut size={17} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}

export function TopBar({ role, pageLabel, onLogout }) {
  const theme = ROLE_CONFIG[role];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return undefined;
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [dropdownOpen]);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <header style={{
      height: 60,
      flexShrink: 0,
      background: 'var(--bg-panel)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
    }}>
      {pageLabel && (
        <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
          {pageLabel}
        </span>
      )}

      <div style={{ flex: 1 }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '6px 14px',
      }}>
        <Search size={14} color="var(--text-faint)" />
        <input
          placeholder="Search anything..."
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--text-muted)',
            fontSize: 13,
            width: 160,
          }}
        />
      </div>

      <button type="button" style={{ ...iconBtn, position: 'relative' }} aria-label="Notifications">
        <Bell size={18} color="var(--text-faint)" />
        <span style={{
          position: 'absolute',
          top: 4,
          right: 4,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#7c3aed',
        }} />
      </button>

      <div ref={wrapRef} style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setDropdownOpen((o) => !o)}
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: 'none',
            padding: 2,
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: avatarHover || dropdownOpen
              ? `0 0 0 2px ${theme.topAvatarBg}55, 0 0 12px ${theme.topAvatarBg}44`
              : 'none',
            transition: 'box-shadow 0.2s',
          }}
        >
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: theme.topAvatarBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 800,
            color: '#fff',
          }}>
            {theme.topAvatarInitials}
          </div>
        </button>

        {dropdownOpen && (
          <ProfileDropdown
            theme={theme}
            menuItems={menuItems}
            onLogout={() => {
              setDropdownOpen(false);
              onLogout();
            }}
            onClose={() => setDropdownOpen(false)}
          />
        )}
      </div>
    </header>
  );
}

function ProfileDropdown({ theme, menuItems, onLogout, onClose }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 8px)',
      right: 0,
      width: 220,
      background: '#1a1d2e',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      padding: '8px 0',
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 4,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: theme.topAvatarBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 800,
          color: '#fff',
          flexShrink: 0,
        }}>
          {theme.dropdownLetter}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#f1f5f9' }}>{theme.dropdownName}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{theme.dropdownRole}</div>
        </div>
      </div>

      {menuItems.map((item) => {
        const Icon = item.icon;
        const isHover = hovered === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={onClose}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '10px 14px',
              border: 'none',
              background: isHover ? 'rgba(255,255,255,0.06)' : 'transparent',
              color: '#f1f5f9',
              fontSize: 14,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Icon size={16} color="#94a3b8" />
            {item.label}
          </button>
        );
      })}

      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '6px 0' }} />

      <button
        type="button"
        onClick={onLogout}
        onMouseEnter={() => setHovered('logout')}
        onMouseLeave={() => setHovered(null)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          padding: '10px 14px',
          border: 'none',
          background: hovered === 'logout' ? 'rgba(255,255,255,0.06)' : 'transparent',
          color: '#f1f5f9',
          fontSize: 14,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <LogOut size={16} color="#94a3b8" />
        Logout
      </button>
    </div>
  );
}

const iconBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 6,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
