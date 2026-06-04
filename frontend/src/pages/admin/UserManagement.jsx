import { useState } from 'react';
import { Pencil, Trash2, Search, Plus } from 'lucide-react';
import { users } from '../../data/mockData';

function Badge({ label, color, bg }) {
  return (
    <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 99, background: bg, color, fontWeight: 700 }}>
      {label}
    </span>
  );
}

const ROLE_STYLE = {
  Admin:      { color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
  Controller: { color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
  User:       { color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
};

const PENDING_REQUESTS = [
  { id: 1, name: 'Meera Joshi',  email: 'meera@example.com',  role: 'User' },
  { id: 2, name: 'Karan Desai',  email: 'karan@example.com',  role: 'Controller' },
];

export default function UserManagement() {
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontWeight: 800, fontSize: 20 }}>User Management</h2>
        <button style={submitBtn}><Plus size={16} /> Add User</button>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '8px 14px', maxWidth: 320,
      }}>
        <Search size={14} color="var(--text-faint)" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 13 }}
        />
      </div>

      <div style={card}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Avatar', 'Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map((h) => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => {
              const rs = ROLE_STYLE[u.role] || ROLE_STYLE.User;
              const active = u.status === 'Active';
              return (
                <tr key={u.id}>
                  <td style={tdStyle}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'var(--accent-grad)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800, color: '#fff',
                    }}>
                      {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                  </td>
                  <td style={tdStyle}>{u.name}</td>
                  <td style={tdStyle}>{u.email}</td>
                  <td style={tdStyle}><Badge label={u.role} color={rs.color} bg={rs.bg} /></td>
                  <td style={tdStyle}>
                    <Badge
                      label={u.status}
                      color={active ? '#10b981' : '#ef4444'}
                      bg={active ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'}
                    />
                  </td>
                  <td style={tdStyle}>{u.lastLogin}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={ghostBtn}><Pencil size={14} /></button>
                      <button style={ghostBtn}><Trash2 size={14} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ ...card, marginTop: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Pending Requests</div>
        {PENDING_REQUESTS.map((req) => (
          <div key={req.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{req.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{req.email} · {req.role}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={approveBtn}>Approve</button>
              <button style={rejectBtn}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const wrap      = { padding: '24px 28px', maxWidth: 1200 };
const card      = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px' };
const thStyle   = { textAlign: 'left', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-faint)', borderBottom: '1px solid rgba(255,255,255,0.05)' };
const tdStyle   = { padding: '10px 12px', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' };
const submitBtn = { display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, border: 'none', background: 'var(--accent-grad)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' };
const ghostBtn  = { background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: 6, cursor: 'pointer', color: 'var(--text-muted)' };
const approveBtn = { padding: '6px 14px', borderRadius: 8, border: 'none', background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 700, fontSize: 12, cursor: 'pointer' };
const rejectBtn  = { padding: '6px 14px', borderRadius: 8, border: 'none', background: 'rgba(239,68,68,0.12)', color: '#ef4444', fontWeight: 700, fontSize: 12, cursor: 'pointer' };
