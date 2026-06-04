import { useState } from 'react';
import { ChevronDown, ChevronRight, Mail } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Getting Started',
    items: [
      { q: 'How do I start a new chat?', a: 'Click "New Chat" in the sidebar. This clears the current conversation and opens a fresh chat session with the offline RAG model.' },
      { q: 'What file types are supported?', a: 'VectorMind supports PDF, MP3, MP4, PNG, and JPG files. Documents are processed through OCR, chunking, and embedding before they become queryable.' },
      { q: 'How are my queries answered?', a: 'Your question is embedded and matched against document chunks in the vector database. The top relevant chunks are sent to the local LLM, which generates a grounded answer with citations.' },
    ],
  },
  {
    title: 'Troubleshooting',
    items: [
      { q: 'Why is my response slow?', a: 'Responses run on an offline local model (llama3-8b). Latency depends on your hardware, context size, and number of retrieved chunks. Typical responses take 2–5 seconds.' },
      { q: 'The model seems offline — what do I do?', a: 'If the model badge shows "offline mode", the inference server may be stopped. Contact your administrator or controller to restart the model service.' },
    ],
  },
];

export default function HelpPage() {
  const [open, setOpen]       = useState(null);
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);

  const toggle = (key) => setOpen(open === key ? null : key);

  return (
    <div style={wrap}>
      <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 24 }}>Help & Support</h2>

      {SECTIONS.map((section) => (
        <div key={section.title} style={{ marginBottom: 28 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: 'var(--text-muted)' }}>{section.title}</h3>
          {section.items.map((item, i) => {
            const key = `${section.title}-${i}`;
            const isOpen = open === key;
            return (
              <div key={key} style={{ ...card, marginBottom: 8, padding: 0, overflow: 'hidden' }}>
                <button
                  onClick={() => toggle(key)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, textAlign: 'left',
                  }}
                >
                  {item.q}
                  {isOpen ? <ChevronDown size={16} color="var(--text-faint)" /> : <ChevronRight size={16} color="var(--text-faint)" />}
                </button>
                {isOpen && (
                  <p style={{ padding: '0 18px 14px', margin: 0, fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)' }}>
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div style={card}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Mail size={16} color="var(--accent)" /> Contact Support
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
          Email us at <a href="mailto:support@omrag.ai" style={{ color: '#a5b4fc' }}>support@omrag.ai</a>
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue..."
          rows={4}
          style={{
            width: '100%', padding: 12, borderRadius: 10,
            border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)',
            fontSize: 13, marginBottom: 12, resize: 'vertical',
          }}
        />
        <button
          onClick={() => { setSent(true); setMessage(''); }}
          style={{
            padding: '10px 20px', borderRadius: 10, border: 'none',
            background: 'var(--accent-grad)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
          }}
        >
          Send Message
        </button>
        {sent && <p style={{ fontSize: 12, color: '#10b981', marginTop: 10 }}>Message sent! We&apos;ll respond within 24 hours.</p>}
      </div>
    </div>
  );
}

const wrap = { padding: '24px 28px', maxWidth: 720 };
const card = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px' };
