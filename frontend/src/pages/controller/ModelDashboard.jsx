import { models } from '../../data/mockData';

const REQUEST_LOG = [
  { endpoint: '/v1/chat/completions', model: 'llama3-8b-instruct', status: 200, time: '10:42:01' },
  { endpoint: '/v1/embeddings',       model: 'mistral-7b-v0.2',    status: 200, time: '10:41:58' },
  { endpoint: '/v1/chat/completions', model: 'llama3-8b-instruct', status: 200, time: '10:41:44' },
  { endpoint: '/v1/chat/completions', model: 'llama3-8b-instruct', status: 503, time: '10:40:12' },
  { endpoint: '/v1/embeddings',       model: 'mistral-7b-v0.2',    status: 200, time: '10:39:55' },
];

const RESOURCES = [
  { label: 'GPU Util',   value: 72,  max: 100, display: '72%' },
  { label: 'GPU RAM',    value: 68,  max: 100, display: '8.1/12GB' },
  { label: 'CPU',        value: 34,  max: 100, display: '34%' },
  { label: 'System RAM', value: 44,  max: 100, display: '14/32GB' },
];

export default function ModelDashboard({ setPage }) {
  return (
    <div style={wrap}>
      <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 20 }}>Model Dashboard</h2>

      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Deployed Models</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {models.map((m) => (
          <div key={m.name} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{m.name}</div>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: 'var(--text-faint)', marginTop: 4, display: 'inline-block' }}>
                  {m.provider}
                </span>
              </div>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: m.status === 'Running' ? '#10b981' : '#ef4444',
                display: 'inline-block', marginTop: 4,
              }} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-faint)', display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
              <span>RAM: {m.ram}</span>
              <span>Avg latency: {m.latency}</span>
              <span>Requests today: {m.requests}</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setPage('testing')} style={ghostBtn}>Test</button>
              <button style={ghostBtn}>{m.status === 'Running' ? 'Stop' : 'Start'}</button>
              <button style={ghostBtn}>Config</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...card, marginBottom: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>System Resources</div>
        {RESOURCES.map((r) => (
          <div key={r.label} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
              <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{r.display}</span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${r.value}%`, background: 'var(--accent)', borderRadius: 99 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Request Log</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Endpoint', 'Model', 'Status', 'Time'].map((h) => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REQUEST_LOG.map((row, i) => (
              <tr key={i}>
                <td style={tdStyle}>{row.endpoint}</td>
                <td style={tdStyle}>{row.model}</td>
                <td style={{ ...tdStyle, color: row.status === 200 ? '#10b981' : '#ef4444' }}>{row.status}</td>
                <td style={tdStyle}>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const wrap = { padding: '24px 28px', maxWidth: 1200 };
const card = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px' };
const thStyle = { textAlign: 'left', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-faint)' };
const tdStyle = { padding: '10px 12px', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' };
const ghostBtn = { padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 11, cursor: 'pointer' };
