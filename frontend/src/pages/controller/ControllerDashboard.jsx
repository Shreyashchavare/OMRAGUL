import { FileText, Cpu, FlaskConical, ClipboardCheck, File, Mic, Video, Image } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { documents, weeklyData, models } from '../../data/mockData';

export default function ControllerDashboard({ setPage }) {
  const uploadData = weeklyData.map((d) => ({ ...d, uploads: Math.round(d.queries * 0.15) }));

  return (
    <div style={wrap}>
      <div style={grid4}>
        <StatCard label="Docs Uploaded" value="24" change="+3 this week" icon={FileText} color="#6366f1" />
        <StatCard label="Models Active" value="3" change="2 running" icon={Cpu} color="#8b5cf6" />
        <StatCard label="Tests Run" value="87" change="+12 today" icon={FlaskConical} color="#06b6d4" />
        <StatCard label="Pending Approvals" value="5" change="3 urgent" icon={ClipboardCheck} color="#f59e0b" onClick={() => setPage('req-approval')} />
      </div>

      <div style={grid2}>
        <div style={card}>
          <div style={cardTitle}>Upload Volume — 7 days</div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={uploadData}>
              <defs>
                <linearGradient id="ctrlUpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={tick} axisLine={false} tickLine={false} />
              <YAxis tick={tick} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={ttStyle} />
              <Area type="monotone" dataKey="uploads" stroke="#6366f1" fill="url(#ctrlUpGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <div style={{ ...cardTitle, marginBottom: 14 }}>Active Models</div>
          {models.map((m, i) => (
            <div key={m.name} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>
                  Tested: {['2h ago', '5h ago', '1d ago'][i]}
                </div>
              </div>
              <span style={{
                fontSize: 10, padding: '2px 9px', borderRadius: 99, fontWeight: 700,
                background: m.status === 'Running' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                color: m.status === 'Running' ? '#10b981' : '#ef4444',
              }}>{m.status}</span>
            </div>
          ))}
          <button onClick={() => setPage('model-dashboard')} style={{ marginTop: 12, fontSize: 12, color: '#a5b4fc', background: 'none', border: 'none', cursor: 'pointer' }}>
            View Model Dashboard →
          </button>
        </div>
      </div>

      <div style={card}>
        <div style={cardTitle}>Recent Uploads</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
          <thead>
            <tr>
              {['Document', 'Type', 'Size', 'Status', 'Date'].map((h) => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.slice(0, 5).map((doc) => (
              <tr key={doc.id}>
                <td style={tdStyle}>{doc.name}</td>
                <td style={tdStyle}>{doc.type}</td>
                <td style={tdStyle}>{doc.size}</td>
                <td style={tdStyle}>{doc.status}</td>
                <td style={tdStyle}>{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon, color, onClick }) {
  return (
    <div style={{ ...card, cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 27, fontWeight: 900 }}>{value}</div>
          <div style={{ fontSize: 11, color: '#22c55e', marginTop: 4 }}>{change}</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: `${color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={19} color={color} />
        </div>
      </div>
    </div>
  );
}

const wrap = { padding: '24px 28px', maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 18 };
const grid4 = { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 };
const grid2 = { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18 };
const card = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px' };
const cardTitle = { fontWeight: 700, fontSize: 14, marginBottom: 14 };
const thStyle = { textAlign: 'left', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-faint)' };
const tdStyle = { padding: '10px 12px', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' };
const tick = { fill: '#475569', fontSize: 11 };
const ttStyle = { background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', fontSize: 12 };
