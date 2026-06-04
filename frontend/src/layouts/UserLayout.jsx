import { useState, cloneElement, isValidElement } from 'react';
import {
  Brain, MessageSquarePlus, History, HelpCircle,
  LogOut, ChevronLeft, ChevronRight, UserCircle,
} from 'lucide-react';

const NAV = [
  { id: 'chat',         icon: MessageSquarePlus, label: 'New Chat',     isNewChat: true },
  { id: 'chat-history', icon: History,           label: 'Chat History' },
  { id: 'help',         icon: HelpCircle,        label: 'Help' },
];

export function UserLayout({ activePage, setActivePage, onLogout, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [chatKey, setChatKey]     = useState(0);

  const handleNav = (item) => {
    if (item.isNewChat) {
      setChatKey((k) => k + 1);
      setActivePage('chat');
    } else {
      setActivePage(item.id);
    }
  };

  const mainContent = activePage === 'chat' && isValidElement(children)
    ? cloneElement(children, { key: chatKey })
    : children;

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
        onNav={handleNav}
        onLogout={onLogout}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar />
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {mainContent}
        </main>
      </div>
    </div>
  );
}

function SidebarShell({ collapsed, setCollapsed, activePage, onNav, onLogout }) {
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
            US
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>User</span>
                <span style={{
                  fontSize: 9, padding: '2px 6px', borderRadius: 99, fontWeight: 700,
                  background: 'rgba(16,185,129,0.15)', color: '#10b981',
                }}>USER</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>End User</div>
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
        {NAV.map((item) => {
          const { id, icon: Icon, label } = item;
          const active = activePage === id || (id === 'chat' && activePage === 'chat');
          return (
            <button
              key={id}
              onClick={() => onNav(item)}
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

function TopBar() {
  return (
    <header style={{
      height: 60, flexShrink: 0,
      background: 'var(--bg-panel)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'var(--accent-grad)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Brain size={15} color="#fff" />
        </div>
        <span style={{ fontWeight: 800, fontSize: 15 }}>VectorMind AI</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'var(--accent-grad)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 800, color: '#fff',
      }}>
        US
      </div>
    </header>
  );
}

const iconBtn = {
  background: 'none', border: 'none',
  cursor: 'pointer', padding: 6, borderRadius: 8,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
