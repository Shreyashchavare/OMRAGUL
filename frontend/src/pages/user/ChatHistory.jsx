import { useState } from 'react';
import { Search } from 'lucide-react';
import { chatHistoryData } from '../../data/mockData';

export default function ChatHistory() {
  const [search, setSearch]       = useState('');
  const [continued, setContinued] = useState(null);

  const filtered = chatHistoryData.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.preview.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontWeight: 800, fontSize: 20 }}>Chat History</h2>
        <button style={dangerBtn}>Clear All History</button>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18,
        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '8px 14px', maxWidth: 360,
      }}>
        <Search size={14} color="var(--text-faint)" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter conversations..."
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 13 }}
        />
      </div>

      {continued && (
        <div style={{
          padding: '10px 14px', marginBottom: 14, borderRadius: 10,
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
          fontSize: 13, color: '#a5b4fc',
        }}>
          Continuing chat: &quot;{continued}&quot; — open New Chat from the sidebar to start fresh.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => setContinued(c.title)}
            style={{
              ...card, textAlign: 'left', cursor: 'pointer', width: '100%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{c.title}</span>
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{c.date}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 6 }}>{c.messages} messages</div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {c.preview}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

const wrap = { padding: '24px 28px', maxWidth: 720 };
const card = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px' };
const dangerBtn = { padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 700, fontSize: 12, cursor: 'pointer' };
