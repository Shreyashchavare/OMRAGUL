import { useState } from 'react';

const MODELS = ['llama3-8b-instruct', 'mistral-7b-v0.2', 'phi3-mini-4k'];

const MOCK_RESPONSE = `Based on your test prompt, the model generated a coherent response demonstrating retrieval-augmented generation capabilities. The output references indexed document chunks and maintains factual grounding with source citations.

Key observations from this test run:
• Response latency within expected offline bounds
• Token generation rate stable at ~47 tokens/sec
• Context window utilization at 34% of maximum`;

const TEST_HISTORY = [
  { time: '10:42 AM', model: 'llama3-8b-instruct', latency: '234ms' },
  { time: '10:38 AM', model: 'mistral-7b-v0.2',    latency: '251ms' },
  { time: '10:15 AM', model: 'llama3-8b-instruct', latency: '218ms' },
];

export default function Testing() {
  const [model, setModel]       = useState(MODELS[0]);
  const [prompt, setPrompt]     = useState('');
  const [ran, setRan]           = useState(false);
  const [temp, setTemp]         = useState(0.7);
  const [maxTok, setMaxTok]     = useState(512);
  const [topP, setTopP]         = useState(0.9);

  const runTest = () => setRan(true);

  return (
    <div style={wrap}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontWeight: 800, fontSize: 20 }}>Model Testing</h2>
        <p style={{ color: 'var(--text-faint)', fontSize: 13, marginTop: 4 }}>
          Run inference tests against your deployed models
        </p>
      </div>

      <div style={{ display: 'flex', gap: 18, minHeight: 480 }}>
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={card}>
            <label style={label}>Select Model</label>
            <select value={model} onChange={(e) => setModel(e.target.value)} style={select}>
              {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>

            <label style={{ ...label, marginTop: 14 }}>Test Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your test prompt here..."
              style={textarea}
              rows={6}
            />

            <button onClick={runTest} style={{ ...submitBtn, marginTop: 12 }}>Run Test</button>
          </div>

          <div style={card}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Test Configuration</div>
            <ConfigRow label="Temperature" value={temp} onChange={setTemp} min={0} max={2} step={0.1} />
            <ConfigRow label="Max Tokens" value={maxTok} onChange={setMaxTok} min={64} max={4096} step={64} />
            <ConfigRow label="Top-P" value={topP} onChange={setTopP} min={0} max={1} step={0.05} />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ ...card, flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Response</div>
            <pre style={{
              margin: 0, fontSize: 12, lineHeight: 1.7, color: 'var(--text-muted)',
              whiteSpace: 'pre-wrap', fontFamily: 'var(--font)',
            }}>
              {ran ? MOCK_RESPONSE : 'Run a test to see the model response here.'}
            </pre>
            {ran && (
              <div style={{ display: 'flex', gap: 20, marginTop: 16, fontSize: 12, color: 'var(--text-faint)' }}>
                <span>Latency: <strong style={{ color: 'var(--accent)' }}>234ms</strong></span>
                <span>Tokens/sec: <strong style={{ color: 'var(--accent)' }}>47</strong></span>
                <span>Total tokens: <strong style={{ color: 'var(--accent)' }}>312</strong></span>
              </div>
            )}
          </div>

          <div style={card}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Test History</div>
            {TEST_HISTORY.map((t, i) => (
              <div key={i} style={{ fontSize: 12, padding: '6px 0', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {t.time} · {t.model} · {t.latency}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfigRow({ label, value, onChange, min, max, step }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ width: '100%' }} />
    </div>
  );
}

const wrap = { padding: '24px 28px', maxWidth: 1200 };
const card = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px' };
const label = { fontSize: 12, color: 'var(--text-faint)', display: 'block', marginBottom: 6 };
const select = { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)', fontSize: 13 };
const textarea = { width: '100%', padding: '12px', borderRadius: 10, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', fontSize: 13, resize: 'vertical' };
const submitBtn = { width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: 'var(--accent-grad)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' };
