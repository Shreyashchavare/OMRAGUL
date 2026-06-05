// src/pages/LandingPage.jsx
// Full landing page: Nav, Hero, How It Works, Features, Tech Stack, Team, CTA, Footer.
// Props:
//   onStart  → called when "Get Started" or "Sign In" is clicked

import { useState, useEffect } from 'react';
import {
  Brain, Sparkles, ArrowRight, Upload, Eye, Layers, Database,
  Zap, Shield, Code, BarChart2, Globe, Star,
} from 'lucide-react';
import { OmRagBrand } from '../layouts/shared/AppShell';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STEPS = [
  { icon: Upload,   label: 'Upload',       desc: 'PDF, Audio, Video, Images', color: '#6366f1', num: '01' },
  { icon: Eye,      label: 'OCR Extract',  desc: 'Text from every format',    color: '#8b5cf6', num: '02' },
  { icon: Layers,   label: 'Smart Chunk',  desc: 'Semantic text splitting',   color: '#a855f7', num: '03' },
  { icon: Database, label: 'Vector Store', desc: 'Embeddings auto-indexed',   color: '#c084fc', num: '04' },
];

const FEATURES = [
  { icon: Brain,    title: 'Multi-Modal RAG',  desc: 'Process PDFs, images, audio, and video in one unified knowledge base.',       color: '#6366f1' },
  { icon: Zap,      title: 'Sub-50ms Queries', desc: 'HNSW indexing and semantic caching ensure blazing fast retrieval.',           color: '#f59e0b' },
  { icon: Shield,   title: 'Source Citations', desc: 'Every AI answer is grounded with exact document references and chunk IDs.',   color: '#10b981' },
  { icon: Code,     title: 'REST API',         desc: 'Integrate VectorMind into your workflow with our developer-friendly API.',    color: '#ec4899' },
  { icon: BarChart2,title: 'Live Analytics',   desc: 'Track queries, tokens, cache performance, and processing in real-time.',     color: '#3b82f6' },
  { icon: Globe,    title: 'Multi-Language',   desc: 'Embed and query documents in 95+ languages with multilingual models.',       color: '#8b5cf6' },
];

const TECH = [
  'OpenAI Embeddings', 'Pinecone Vector DB', 'LangChain', 'React + Vite',
  'FastAPI', 'PostgreSQL', 'Redis Cache', 'AWS S3',
  'Whisper ASR', 'Tesseract OCR', 'Docker', 'Kubernetes',
];

const TEAM = [
  { name: 'Samarth Navale',    role: 'AI/ML Engineer',    av: 'AS', color: '#6366f1' },
  { name: 'Uday Bodare',      role: 'Full Stack Dev',    av: 'PN', color: '#ec4899' },
  { name: 'Shreyash Chavare',     role: 'Backend Engineer',  av: 'RM', color: '#10b981' },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function LandingPage({ onStart }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{ background: '#05050a', color: '#e2e8f0', fontFamily: 'var(--font)', minHeight: '100vh' }}>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(5,5,10,0.95)' : 'transparent',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s',
        padding: '0 6%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        <Logo />
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onStart} style={ghostBtn}>Sign In</button>
          <button onClick={onStart} style={primaryBtn}>Get Started</button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 6% 72px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.16), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(99,102,241,0.12)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 99, padding: '4px 14px',
          fontSize: 13, color: '#a5b4fc', marginBottom: 24,
        }}>
          <Sparkles size={13} /> AI-Powered Document Intelligence
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(38px, 5.5vw, 70px)',
          fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1,
          margin: '0 0 20px',
          background: 'linear-gradient(135deg, #fff 40%, #a5b4fc)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Chat with Your<br />Documents Instantly
        </h1>

        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Upload PDFs, audio, video, and images. VectorMind extracts, embeds, and
          indexes everything — so you can ask questions in natural language and
          get precise, cited answers.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onStart} style={{ ...primaryBtn, padding: '14px 32px', fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            Start for Free <ArrowRight size={16} />
          </button>
          <button style={{ ...ghostBtn, padding: '14px 32px', fontSize: 16 }}>Watch Demo</button>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section style={{ padding: '60px 6%', maxWidth: 960, margin: '0 auto' }}>
        <SectionHeading>How It Works</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {STEPS.map(({ icon: Icon, label, desc, color, num }) => (
            <div key={num} style={{ ...card, position: 'relative', overflow: 'hidden', padding: 22 }}>
              <div style={{
                position: 'absolute', top: 12, right: 14,
                fontSize: 34, fontWeight: 900, color: 'rgba(255,255,255,0.04)',
              }}>{num}</div>
              <div style={{ ...iconBox(color), marginBottom: 14 }}>
                <Icon size={20} color={color} />
              </div>
              <div style={{ fontWeight: 700, marginBottom: 5, fontSize: 14 }}>{label}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '40px 6%', maxWidth: 1080, margin: '0 auto' }}>
        <SectionHeading>Everything You Need</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} style={{ ...card, padding: 24 }}>
              <div style={{ ...iconBox(color), marginBottom: 14 }}>
                <Icon size={19} color={color} />
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT RAG ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '40px 6%', maxWidth: 800, margin: '0 auto' }}>
        <SectionHeading>What is RAG?</SectionHeading>
        <div style={{ ...card, padding: '32px 36px' }}>
          <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
            <strong style={{ color: '#e2e8f0' }}>Retrieval-Augmented Generation (RAG)</strong> is a
            technique that combines a vector database with a large language model. Instead of relying
            solely on the LLM's training data, RAG <em>retrieves</em> relevant chunks from your own
            documents and <em>augments</em> the prompt with that context — giving you grounded,
            up-to-date, and citation-backed answers.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Document Ingestion', 'Chunking', 'Embedding', 'Vector Search', 'LLM Generation', 'Cited Answer'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
                  color: '#a5b4fc', borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 600,
                }}>{s}</span>
                {i < 5 && <span style={{ color: '#475569', fontSize: 14 }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '40px 6%', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <SectionHeading>Built on Proven Technology</SectionHeading>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {TECH.map(t => (
            <span key={t} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '6px 14px', fontSize: 13, color: '#94a3b8',
            }}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '40px 6%', maxWidth: 860, margin: '0 auto' }}>
        <SectionHeading>Meet the Team</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {TEAM.map(({ name, role, av, color }) => (
            <div key={name} style={{ ...card, padding: 24, textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: `${color}20`, border: `2px solid ${color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: 17, fontWeight: 800, color,
              }}>{av}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{name}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '60px 6%', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.12))',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 24, padding: '56px 40px',
          maxWidth: 680, margin: '0 auto',
        }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 14 }}>
            Start Building Today
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: 30, fontSize: 15 }}>
            Free tier: 100 documents · 1,000 queries/month · 5 GB vector storage
          </p>
          <button onClick={onStart} style={{ ...primaryBtn, padding: '15px 40px', fontSize: 17 }}>
            Get Started Free
          </button>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '28px 6%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Brain size={15} color="#6366f1" />
          <span style={{ color: '#475569', fontSize: 13 }}>© 2025 VectorMind. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Docs', 'API'].map(l => (
            <span key={l} style={{ color: '#475569', fontSize: 13, cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <OmRagBrand size={32} />
      <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>OM-RAG</span>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 style={{
      textAlign: 'center', fontSize: 28, fontWeight: 800,
      letterSpacing: '-0.02em', marginBottom: 36,
    }}>{children}</h2>
  );
}

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
const card = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 16,
};

const iconBox = (color) => ({
  width: 40, height: 40, borderRadius: 11,
  background: `${color}1a`, border: `1px solid ${color}40`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
});

const primaryBtn = {
  padding: '9px 20px', borderRadius: 9, border: 'none',
  background: 'linear-gradient(135deg,#6366f1,#a855f7)',
  color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 700,
};

const ghostBtn = {
  padding: '9px 20px', borderRadius: 9,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent', color: '#e2e8f0',
  cursor: 'pointer', fontSize: 14,
};
