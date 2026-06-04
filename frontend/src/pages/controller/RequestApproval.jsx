import { useState } from 'react';
import { File } from 'lucide-react';
import { pendingApprovals } from '../../data/mockData';

export default function RequestApproval() {
  const [tab, setTab]           = useState('pending');
  const [pending, setPending]   = useState(pendingApprovals);
  const [history, setHistory]   = useState([]);

  const approve = (item) => {
    setPending((p) => p.filter((x) => x.id !== item.id));
    setHistory((h) => [{ ...item, action: 'Approved', actionedBy: 'Controller', actionDate: 'Today' }, ...h]);
  };

  const reject = (item) => {
    setPending((p) => p.filter((x) => x.id !== item.id));
    setHistory((h) => [{ ...item, action: 'Rejected', actionedBy: 'Controller', actionDate: 'Today' }, ...h]);
  };

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['pending', 'history'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
              background: tab === t ? 'rgba(99,102,241,0.15)' : 'transparent',
              color: tab === t ? '#a5b4fc' : 'var(--text-faint)',
            }}
          >
            {t === 'pending' ? 'Pending' : 'History'}
          </button>
        ))}
      </div>

      {tab === 'pending' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pending.length === 0 && (
            <p style={{ color: 'var(--text-faint)', fontSize: 13 }}>No pending requests.</p>
          )}
          {pending.map((req) => (
            <div key={req.id} style={card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <File size={16} color="#ef4444" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{req.doc}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}>
                    {req.by} · {req.date} · {req.size}
                  </div>
                </div>
                <button onClick={() => approve(req)} style={approveBtn}>Approve</button>
                <button onClick={() => reject(req)} style={rejectBtn}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'history' && (
        <div style={card}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Document', 'Requested By', 'Action', 'Date', 'Actioned By'].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.length === 0 && (
                <tr><td colSpan={5} style={{ ...tdStyle, textAlign: 'center', color: 'var(--text-faint)' }}>No history yet</td></tr>
              )}
              {history.map((row) => (
                <tr key={row.id + row.action}>
                  <td style={tdStyle}>{row.doc}</td>
                  <td style={tdStyle}>{row.by}</td>
                  <td style={tdStyle}>
                    <span style={{ color: row.action === 'Approved' ? '#10b981' : '#ef4444', fontWeight: 700 }}>{row.action}</span>
                  </td>
                  <td style={tdStyle}>{row.actionDate}</td>
                  <td style={tdStyle}>{row.actionedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const wrap = { padding: '24px 28px', maxWidth: 900 };
const card = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px' };
const thStyle = { textAlign: 'left', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-faint)' };
const tdStyle = { padding: '10px 12px', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.05)' };
const approveBtn = { padding: '8px 16px', borderRadius: 8, border: 'none', background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 700, fontSize: 12, cursor: 'pointer' };
const rejectBtn  = { padding: '8px 16px', borderRadius: 8, border: 'none', background: 'rgba(239,68,68,0.12)', color: '#ef4444', fontWeight: 700, fontSize: 12, cursor: 'pointer' };
