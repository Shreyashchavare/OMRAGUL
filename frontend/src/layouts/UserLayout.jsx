import { useState, cloneElement, isValidElement } from 'react';
import {
  MessageSquarePlus, History, HelpCircle,
} from 'lucide-react';
import { SidebarShell, TopBar } from './shared/AppShell';

const NAV = [
  { id: 'chat',         icon: MessageSquarePlus, label: 'New Chat',     isNewChat: true },
  { id: 'chat-history', icon: History,           label: 'Chat History' },
  { id: 'help',         icon: HelpCircle,        label: 'Help' },
];

const PAGE_LABELS = {
  chat: 'Search / Query',
  'chat-history': 'History',
  help: 'Help',
};

export function UserLayout({ activePage, setActivePage, onLogout, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  const handleNav = (item) => {
    const navItem = typeof item === 'string' ? NAV.find((n) => n.id === item) : item;
    if (!navItem) return;
    if (navItem.isNewChat) {
      setChatKey((k) => k + 1);
      setActivePage('chat');
    } else {
      setActivePage(navItem.id);
    }
  };

  const mainContent = activePage === 'chat' && isValidElement(children)
    ? cloneElement(children, { key: chatKey })
    : children;

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
        role="user"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        onNavClick={handleNav}
        onLogout={onLogout}
        nav={NAV}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar
          role="user"
          pageLabel={PAGE_LABELS[activePage]}
          onLogout={onLogout}
        />
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {mainContent}
        </main>
      </div>
    </div>
  );
}
