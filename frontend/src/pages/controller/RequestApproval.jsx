import { useState, useMemo } from 'react';
import {
  FileText, Image, Music, Video, Play, Volume2,
  Check, X, LayoutGrid,
} from 'lucide-react';

const TABS = [
  { id: 'ready',   label: 'Ready for Ingestion Submission', count: 24 },
  { id: 'pending', label: 'Pending Admin Approval',         count: 5 },
  { id: 'history', label: 'Submission History',             count: 12 },
];

const FORMAT_FILTERS = [
  { id: 'all',   label: 'All',              icon: LayoutGrid },
  { id: 'text',  label: 'Text (PDFs/Word)', icon: FileText },
  { id: 'image', label: 'Images',           icon: Image },
  { id: 'audio', label: 'Audio',            icon: Music },
  { id: 'video', label: 'Video',            icon: Video },
];

const READY_DOCS = [
  {
    id: '1',
    name: 'Annual_Policy_2025.pdf',
    controller: 'Rahul Kumar',
    datetime: 'Today, 10:30',
    size: '1.2 MB',
    format: 'text',
    selected: true,
  },
  {
    id: '2',
    name: 'System_Architecture_Diagram.png',
    controller: 'Vikram Patel',
    datetime: 'Today, 11:15',
    size: '4.8 MB',
    format: 'image',
    selected: false,
  },
  {
    id: '3',
    name: 'Safety_Handbook.pdf',
    controller: 'Anjali Singh',
    datetime: 'Today, 09:15',
    size: '3.4 MB',
    format: 'text',
    selected: true,
  },
  {
    id: '4',
    name: 'Training_Module_Intro.mp4',
    controller: 'Rahul Kumar',
    datetime: 'Yesterday, 16:30',
    size: '85 MB',
    format: 'video',
    selected: false,
  },
  {
    id: '5',
    name: 'Call_Recording_UserStudy_02.wav',
    controller: 'Vikram Patel',
    datetime: 'Yesterday, 14:15',
    size: '12 MB',
    format: 'audio',
    selected: false,
  },
];

const PENDING_DOCS = [
  { id: 'p1', name: 'Q2_Finance_Report.pdf', controller: 'Rahul Kumar', datetime: 'Today, 08:00', size: '2.5 MB', format: 'text', status: 'Awaiting Admin Review' },
  { id: 'p2', name: 'User_Interviews.mp3', controller: 'Anjali Singh', datetime: 'Yesterday, 17:00', size: '15 MB', format: 'audio', status: 'Awaiting Admin Review' },
];

const HISTORY_DOCS = [
  { id: 'h1', name: 'Chart_01.png', controller: 'Vikram Patel', submitted: 'Jun 2, 2026', size: '1 MB', outcome: 'Approved by Admin' },
  { id: 'h2', name: 'Old_System_Logs.txt', controller: 'Rahul Kumar', submitted: 'Jun 1, 2026', size: '300 KB', outcome: 'Rejected by Admin' },
];

const FORMAT_META = {
  text:  { icon: FileText, bg: 'rgba(239,68,68,0.2)',   color: '#ef4444', IconCmp: FileText },
  image: { icon: Image,    bg: 'rgba(16,185,129,0.2)',  color: '#10b981', IconCmp: Image },
  audio: { icon: Volume2,  bg: 'rgba(139,92,246,0.2)',  color: '#a855f7', IconCmp: Volume2 },
  video: { icon: Play,     bg: 'rgba(139,92,246,0.2)',  color: '#a855f7', IconCmp: Play },
};

export default function RequestApproval() {
  const [activeTab, setActiveTab] = useState('ready');
  const [formatFilter, setFormatFilter] = useState('all');
  const [readyDocs, setReadyDocs] = useState(READY_DOCS);
  const [pendingDocs] = useState(PENDING_DOCS);
  const [historyDocs] = useState(HISTORY_DOCS);
  const [hoveredId, setHoveredId] = useState(null);

  const totalReady = 24;

  const filteredReady = useMemo(
    () => readyDocs.filter((d) => formatFilter === 'all' || d.format === formatFilter),
    [readyDocs, formatFilter],
  );

  const selectedIds = useMemo(
    () => new Set(readyDocs.filter((d) => d.selected).map((d) => d.id)),
    [readyDocs],
  );

  const selectedCount = selectedIds.size;

  const toggleSelect = (id) => {
    setReadyDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, selected: !d.selected } : d)),
    );
  };

  const clearSelected = () => {
    setReadyDocs((prev) => prev.map((d) => ({ ...d, selected: false })));
  };

  const submitSelected = () => {
    setReadyDocs((prev) => prev.map((d) => (d.selected ? { ...d, selected: false } : d)));
  };

  return (
    <div style={page}>
      <style>{`
        .req-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 720px) {
          .req-cards-grid { grid-template-columns: 1fr; }
        }
        .req-doc-card {
          position: relative;
          display: flex;
          gap: 16px;
          align-items: stretch;
          min-height: 120px;
          padding: 18px 18px 18px 44px;
          background-color: #1a1d2e;
          background-image:
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              rgba(255,255,255,0.015) 8px,
              rgba(255,255,255,0.015) 9px
            ),
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0);
          background-size: auto, 12px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .req-doc-card:hover,
        .req-doc-card.hovered {
          border-color: rgba(255,255,255,0.16);
          box-shadow: 0 0 0 1px rgba(124,58,237,0.15);
        }
      `}</style>

      <header style={pageHeader}>
        <h1 style={pageTitle}>Manage Ingestion Queue &amp; Submission</h1>
        <p style={pageSubtitle}>
          Documents Processed and Ready in Staging for Admin Ingestion Approval
        </p>
      </header>

      {/* Tabs */}
      <nav style={tabBar} role="tablist">
        {TABS.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(t.id)}
              style={{
                ...tabBtn,
                color: active ? '#f1f5f9' : '#64748b',
                fontWeight: active ? 700 : 500,
                borderBottom: active ? '2px solid #7c3aed' : '2px solid transparent',
              }}
            >
              {t.label} ({t.count})
            </button>
          );
        })}
      </nav>

      {/* Ready tab content */}
      {activeTab === 'ready' && (
        <>
          <div style={filterRow}>
            <span style={filterLabel}>Format</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FORMAT_FILTERS.map((f) => {
                const active = formatFilter === f.id;
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormatFilter(f.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '7px 14px',
                      borderRadius: 99,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
                      background: active ? '#f1f5f9' : 'transparent',
                      color: active ? '#0f1117' : '#94a3b8',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Icon size={16} color={active ? '#0f1117' : '#94a3b8'} />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="req-cards-grid" style={{ paddingBottom: selectedCount > 0 ? 88 : 24 }}>
            {filteredReady.length === 0 && (
              <p style={{ gridColumn: '1 / -1', color: '#64748b', fontSize: 13 }}>
                No documents match this format filter.
              </p>
            )}
            {filteredReady.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                hovered={hoveredId === doc.id}
                onHover={() => setHoveredId(doc.id)}
                onLeave={() => setHoveredId(null)}
                onToggle={() => toggleSelect(doc.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* Pending tab */}
      {activeTab === 'pending' && (
        <div className="req-cards-grid" style={{ paddingBottom: 24 }}>
          {pendingDocs.map((doc) => (
            <ReadOnlyCard key={doc.id} doc={doc} badge={doc.status} badgeTone="pending" />
          ))}
        </div>
      )}

      {/* History tab */}
      {activeTab === 'history' && (
        <div style={historyWrap}>
          {historyDocs.map((row) => (
            <div key={row.id} style={historyRow}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{row.name}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                  Controller: {row.controller} · Submitted: {row.submitted} · {row.size}
                </div>
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 99,
                background: row.outcome.includes('Approved')
                  ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.12)',
                color: row.outcome.includes('Approved') ? '#10b981' : '#ef4444',
              }}>
                {row.outcome}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Sticky bottom action bar */}
      {activeTab === 'ready' && selectedCount > 0 && (
        <div style={actionBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: 13 }}>
            <X size={16} color="#64748b" />
            <span>
              <strong style={{ color: '#f1f5f9' }}>{selectedCount}</strong>
              {' '}document{selectedCount !== 1 ? 's' : ''} selected (Total:{' '}
              <strong style={{ color: '#f1f5f9' }}>{totalReady}</strong> ready for ingestion)
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button type="button" onClick={clearSelected} style={clearBtn}>
              Clear Selected
            </button>
            <button type="button" onClick={submitSelected} style={submitBtn}>
              Submit Selected for Admin Approval
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DocumentCard({ doc, hovered, onHover, onLeave, onToggle }) {
  const meta = FORMAT_META[doc.format];
  const IconCmp = meta.IconCmp;

  return (
    <div
      className={`req-doc-card${hovered ? ' hovered' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onToggle}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      role="checkbox"
      aria-checked={doc.selected}
      tabIndex={0}
    >
      <button
        type="button"
        aria-label={doc.selected ? 'Deselect document' : 'Select document'}
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          width: 22,
          height: 22,
          borderRadius: 6,
          border: doc.selected ? 'none' : '2px solid rgba(255,255,255,0.25)',
          background: doc.selected
            ? 'linear-gradient(135deg, #6366f1, #7c3aed)'
            : 'rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
        }}
      >
        {doc.selected && <Check size={14} color="#fff" strokeWidth={3} />}
      </button>

      <div style={{
        width: 60,
        height: 60,
        borderRadius: 12,
        flexShrink: 0,
        background: meta.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
        <IconCmp size={28} color={meta.color} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8, wordBreak: 'break-word' }}>
          {doc.name}
        </div>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10, lineHeight: 1.5 }}>
          Controller: {doc.controller} | {doc.datetime} | {doc.size}
        </div>
        <span style={{
          alignSelf: 'flex-start',
          fontSize: 11,
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: 99,
          background: 'rgba(16,185,129,0.2)',
          color: '#10b981',
        }}>
          Processed &amp; Ready
        </span>
      </div>
    </div>
  );
}

function ReadOnlyCard({ doc, badge, badgeTone }) {
  const meta = FORMAT_META[doc.format];
  const IconCmp = meta.IconCmp;
  const badgeStyle = badgeTone === 'pending'
    ? { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' }
    : { bg: 'rgba(16,185,129,0.2)', color: '#10b981' };

  return (
    <div className="req-doc-card" style={{ cursor: 'default', paddingLeft: 18 }}>
      <div style={{
        width: 60, height: 60, borderRadius: 12, flexShrink: 0,
        background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        alignSelf: 'center',
      }}>
        <IconCmp size={28} color={meta.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{doc.name}</div>
        <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>
          Controller: {doc.controller} | {doc.datetime} | {doc.size}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99,
          background: badgeStyle.bg, color: badgeStyle.color,
        }}>
          {badge}
        </span>
      </div>
    </div>
  );
}

const page = {
  padding: '24px 28px 0',
  maxWidth: '100%',
  background: '#0f1117',
  minHeight: '100%',
  position: 'relative',
};

const pageHeader = { marginBottom: 20 };
const pageTitle = { fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6 };
const pageSubtitle = { fontSize: 14, color: '#64748b', fontWeight: 500, lineHeight: 1.45 };

const tabBar = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  marginBottom: 20,
};

const tabBtn = {
  padding: '12px 16px 14px',
  fontSize: 13,
  background: 'none',
  border: 'none',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  cursor: 'pointer',
  marginBottom: -1,
  whiteSpace: 'nowrap',
};

const filterRow = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 12,
  marginBottom: 20,
};

const filterLabel = {
  fontSize: 13,
  fontWeight: 600,
  color: '#94a3b8',
  flexShrink: 0,
};

const actionBar = {
  position: 'sticky',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 14,
  padding: '16px 28px',
  margin: '0 -28px',
  background: 'rgba(15,17,23,0.92)',
  borderTop: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  zIndex: 20,
};

const clearBtn = {
  padding: '10px 20px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'transparent',
  color: '#f1f5f9',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
};

const submitBtn = {
  padding: '11px 22px',
  borderRadius: 10,
  border: 'none',
  background: 'linear-gradient(90deg, #10b981, #22c55e)',
  color: '#fff',
  fontSize: 13,
  fontWeight: 800,
  cursor: 'pointer',
  boxShadow: '0 4px 20px rgba(16,185,129,0.35)',
  whiteSpace: 'nowrap',
};

const historyWrap = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  paddingBottom: 24,
};

const historyRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
  padding: '16px 18px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 12,
};
