import { useState } from 'react';
import {
  Upload, FileText, Image, Mic, Video, File,
  ChevronDown, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import { sampleUploadNames } from '../../data/mockData';

const MODULES = [
  {
    id: 'documents',
    title: 'Document Corpus',
    description: 'Process PDFs, Word Files',
    formats: ['PDF', 'DOCX', 'TXT'],
    icon: FileText,
    color: '#6366f1',
  },
  {
    id: 'visual',
    title: 'Visual Assets',
    description: 'Analyze Photos, Charts, Diagrams',
    formats: ['PNG', 'JPG', 'BMP'],
    icon: Image,
    color: '#10b981',
  },
  {
    id: 'audio',
    title: 'Audio Streams',
    description: 'Transcribe Audio Logs, Interviews',
    formats: ['MP3', 'WAV', 'FLAC'],
    icon: Mic,
    color: '#f59e0b',
  },
  {
    id: 'video',
    title: 'Video Content',
    description: 'Index and Analyze Video Feeds',
    formats: ['MP4', 'MOV', 'AVI'],
    icon: Video,
    color: '#a855f7',
  },
];

const QUEUE_ROWS = [
  {
    status: 'Queued',
    statusVariant: 'queued',
    name: 'Q2_Finance_Report.pdf',
    size: '2.5 MB',
    type: 'PDF',
    typeColor: '#ef4444',
    icon: FileText,
    iconColor: '#ef4444',
    pipeline: 'Default RAG',
    actions: [{ label: 'Configure', tone: 'default' }, { label: 'Log', tone: 'default' }],
  },
  {
    status: 'Processing (65%)',
    statusVariant: 'processing',
    progress: 65,
    name: 'User_Interviews.mp3',
    size: '15 MB',
    type: 'Audio',
    typeColor: '#06b6d4',
    icon: Mic,
    iconColor: '#8b5cf6',
    pipeline: 'Deep Analysis',
    actions: [{ label: 'Retry', tone: 'default' }, { label: '···', tone: 'menu', icon: MoreHorizontal }],
  },
  {
    status: 'Complete',
    statusVariant: 'complete',
    name: 'Chart_01.png',
    size: '1 MB',
    type: 'Image',
    typeColor: '#a855f7',
    icon: Image,
    iconColor: '#6366f1',
    pipeline: 'Deep Analysis',
    actions: [{ label: 'Remove', tone: 'danger' }, { label: 'Log', tone: 'default' }],
  },
  {
    status: 'Queued',
    statusVariant: 'queued',
    name: 'Chart_01.png',
    size: '1 MB',
    type: 'Image',
    typeColor: '#a855f7',
    icon: Image,
    iconColor: '#6366f1',
    pipeline: 'Default RAG',
    actions: [{ label: 'Configure', tone: 'default' }, { label: 'Log', tone: 'default' }],
  },
  {
    status: 'Complete',
    statusVariant: 'complete',
    name: 'Q2_Finance_Report.pdf',
    size: '2.5 MB',
    type: 'PDF',
    typeColor: '#ef4444',
    icon: FileText,
    iconColor: '#ef4444',
    pipeline: 'Default RAG',
    actions: [{ label: 'Configure', tone: 'default' }, { label: 'Log', tone: 'default' }],
  },
  {
    status: 'Failed',
    statusVariant: 'failed',
    name: 'Old_System_Logs.txt',
    size: '300 KB',
    type: 'Text',
    typeColor: '#94a3b8',
    icon: File,
    iconColor: '#64748b',
    pipeline: 'Deep Analysis',
    actions: [{ label: 'Configure', tone: 'default' }, { label: 'Log', tone: 'default' }],
  },
];

const STATUS_STYLES = {
  queued:     { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa' },
  processing: { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa' },
  complete:   { bg: 'rgba(16,185,129,0.15)',  color: '#10b981' },
  failed:     { bg: 'rgba(239,68,68,0.15)',   color: '#ef4444' },
};

export default function UploadDocs() {
  const [dragOverModule, setDragOverModule] = useState(null);

  const handleModuleDrop = (e, moduleId) => {
    e.preventDefault();
    setDragOverModule(null);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      files.forEach((f) => console.log(`[${moduleId}]`, f.name));
    } else {
      const name = sampleUploadNames[Math.floor(Math.random() * sampleUploadNames.length)];
      console.log(`[${moduleId}]`, name);
    }
  };

  const handleModuleClick = (moduleId) => {
    const name = sampleUploadNames[Math.floor(Math.random() * sampleUploadNames.length)];
    console.log(`[${moduleId}]`, name);
  };

  return (
    <div style={page}>
      <style>{`
        .upload-modules-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 1100px) {
          .upload-modules-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .upload-modules-grid { grid-template-columns: 1fr; }
        }
        .upload-queue-layout {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .upload-queue-layout { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Page header */}
      <header style={pageHeader}>
        <h1 style={pageTitle}>Upload Documents</h1>
        <p style={pageSubtitle}>Multi-modal RAG Data Ingest</p>
      </header>

      {/* Data ingest modules */}
      <section>
        <h2 style={sectionTitle}>Data Ingest Modules</h2>
        <div className="upload-modules-grid">
          {MODULES.map((mod) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              dragOver={dragOverModule === mod.id}
              onDragOver={(e) => { e.preventDefault(); setDragOverModule(mod.id); }}
              onDragLeave={() => setDragOverModule(null)}
              onDrop={(e) => handleModuleDrop(e, mod.id)}
              onClick={() => handleModuleClick(mod.id)}
            />
          ))}
        </div>
      </section>

      {/* Queue + pipeline sidebar */}
      <section className="upload-queue-layout">
        <div style={queuePanel}>
          <div style={queueToolbar}>
            <h2 style={{ ...sectionTitle, marginBottom: 0 }}>RAG Ingest Queue &amp; Management</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <ToolbarDropdown label="Batch actions" />
              <ToolbarDropdown label="Sorting" />
            </div>
          </div>

          <div style={tableScroll}>
            <table style={table}>
              <thead>
                <tr>
                  {['Status', 'Icon/File Name', 'Size', 'Type', 'Pipeline Settings', 'Metadata Tags', 'Actions'].map((h) => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {QUEUE_ROWS.map((row, i) => (
                  <QueueRow key={i} row={row} />
                ))}
              </tbody>
            </table>
          </div>

          <div style={tableFooter}>
            <div style={{ display: 'flex', gap: 8 }}>
              <ToolbarDropdown label="Batch actions" small />
              <ToolbarDropdown label="Sorting" small />
            </div>
            <Pagination />
          </div>
        </div>

        <PipelineDefaults />
      </section>

      {/* Bottom CTA */}
      <section style={ctaSection}>
        <p style={ctaHint}>
          Configure pipeline settings and click &apos;START&apos; to process the queue above.
        </p>
        <button type="button" style={ctaButton}>
          START MULTI-MODAL PIPELINE
        </button>
      </section>
    </div>
  );
}

function ModuleCard({ mod, dragOver, onDragOver, onDragLeave, onDrop, onClick }) {
  const Icon = mod.icon;
  return (
    <div style={moduleCard}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: `${mod.color}18`, border: `1px solid ${mod.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={20} color={mod.color} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{mod.title}</div>
          <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>{mod.description}</div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: '#64748b', marginRight: 8 }}>Formats:</span>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
          {mod.formats.map((f) => (
            <span key={f} style={formatPill}>{f}</span>
          ))}
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        style={{
          border: `2px dashed ${dragOver ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 12,
          padding: '20px 12px',
          textAlign: 'center',
          background: dragOver ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.02)',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <Upload size={22} color="#a855f7" style={{ margin: '0 auto 8px', display: 'block' }} />
        <span style={{ fontSize: 11, color: '#64748b' }}>Drop files here drop zone</span>
      </div>
    </div>
  );
}

function QueueRow({ row }) {
  const st = STATUS_STYLES[row.statusVariant];
  const Icon = row.icon;

  return (
    <tr>
      <td style={td}>
        <div>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
            background: st.bg, color: st.color, whiteSpace: 'nowrap',
          }}>
            {row.status}
          </span>
          {row.progress != null && (
            <div style={{ marginTop: 6, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden', minWidth: 80 }}>
              <div style={{ height: '100%', width: `${row.progress}%`, background: 'linear-gradient(90deg,#6366f1,#60a5fa)', borderRadius: 99 }} />
            </div>
          )}
        </div>
      </td>
      <td style={td}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7, flexShrink: 0,
            background: `${row.iconColor}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={14} color={row.iconColor} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{row.name}</span>
        </div>
      </td>
      <td style={td}><span style={{ color: '#94a3b8', fontSize: 12 }}>{row.size}</span></td>
      <td style={td}>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99,
          background: `${row.typeColor}22`, color: row.typeColor,
        }}>
          {row.type}
        </span>
      </td>
      <td style={td}>
        <select style={selectSm} defaultValue={row.pipeline}>
          <option>{row.pipeline}</option>
          <option>Default RAG</option>
          <option>Deep Analysis</option>
        </select>
      </td>
      <td style={td}>
        <span style={{ fontSize: 12, color: '#64748b' }}>Metadata + T...</span>
      </td>
      <td style={td}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'nowrap' }}>
          {row.actions.map((a) => (
            <button
              key={a.label}
              type="button"
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontSize: 12, fontWeight: 600,
                color: a.tone === 'danger' ? '#ef4444' : '#94a3b8',
              }}
            >
              {a.icon ? <a.icon size={16} color="#94a3b8" /> : a.label}
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
}

function PipelineDefaults() {
  return (
    <aside style={sidebarPanel}>
      <h3 style={{ ...sectionTitle, fontSize: 13, marginBottom: 16 }}>RAG Pipeline Defaults</h3>

      <label style={fieldLabel}>Embedding model</label>
      <select style={selectFull} defaultValue="embedding">
        <option value="embedding">Embedding model</option>
      </select>

      <label style={{ ...fieldLabel, marginTop: 14 }}>Summarization model</label>
      <select style={{ ...selectFull, marginBottom: 8 }} defaultValue="sum1">
        <option value="sum1">Summarization model (m...)</option>
      </select>
      <select style={selectFull} defaultValue="sum2">
        <option value="sum2">Summarization model (no...)</option>
      </select>

      <label style={{ ...fieldLabel, marginTop: 14 }}>Chunking parameters</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="number" defaultValue={15} style={numInput} />
        <span style={{ fontSize: 11, color: '#64748b' }}>minuetes</span>
      </div>

      <label style={{ ...fieldLabel, marginTop: 14 }}>Chunking parameters</label>
      <input type="number" defaultValue={10} style={numInput} />

      <label style={{ ...fieldLabel, marginTop: 18 }}>Pagination</label>
      <Pagination compact />
    </aside>
  );
}

function ToolbarDropdown({ label, small }) {
  return (
    <button
      type="button"
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: small ? '5px 10px' : '7px 12px',
        fontSize: small ? 11 : 12, fontWeight: 600,
        color: '#94a3b8',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8, cursor: 'pointer',
      }}
    >
      {label}
      <ChevronDown size={small ? 12 : 14} />
    </button>
  );
}

function Pagination({ compact }) {
  const btn = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 6,
    padding: compact ? '4px 6px' : '5px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
  };
  const sz = compact ? 12 : 14;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <button type="button" style={btn} aria-label="First page"><ChevronsLeft size={sz} /></button>
      <button type="button" style={btn} aria-label="Previous page"><ChevronLeft size={sz} /></button>
      <span style={{
        padding: compact ? '4px 10px' : '5px 12px',
        fontSize: compact ? 11 : 12, fontWeight: 700,
        background: 'rgba(99,102,241,0.2)', color: '#a5b4fc',
        border: '1px solid rgba(99,102,241,0.35)',
        borderRadius: 6,
      }}>1</span>
      <button type="button" style={btn} aria-label="Next page"><ChevronRight size={sz} /></button>
      <button type="button" style={btn} aria-label="Last page"><ChevronsRight size={sz} /></button>
    </div>
  );
}

const page = {
  padding: '24px 28px 40px',
  maxWidth: '100%',
  background: '#0f1117',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
};

const pageHeader = { marginBottom: 4 };
const pageTitle = { fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6 };
const pageSubtitle = { fontSize: 14, color: '#64748b', fontWeight: 500 };
const sectionTitle = { fontWeight: 700, fontSize: 14, marginBottom: 14, color: '#f1f5f9' };

const moduleCard = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '16px 16px 14px',
};

const formatPill = {
  fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 6,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#94a3b8',
};

const queuePanel = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  overflow: 'hidden',
  minWidth: 0,
};

const queueToolbar = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
  padding: '16px 18px',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
};

const tableScroll = { overflowX: 'auto' };

const table = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: 720,
};

const th = {
  textAlign: 'left',
  padding: '10px 14px',
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: '#64748b',
  background: 'rgba(255,255,255,0.02)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  whiteSpace: 'nowrap',
};

const td = {
  padding: '12px 14px',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  verticalAlign: 'middle',
};

const tableFooter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
  padding: '12px 18px',
  borderTop: '1px solid rgba(255,255,255,0.06)',
};

const sidebarPanel = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '16px 14px',
  width: 220,
  flexShrink: 0,
};

const fieldLabel = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  color: '#64748b',
  marginBottom: 6,
};

const selectFull = {
  width: '100%',
  padding: '8px 10px',
  fontSize: 11,
  borderRadius: 8,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#94a3b8',
  cursor: 'pointer',
};

const selectSm = {
  padding: '5px 8px',
  fontSize: 11,
  borderRadius: 7,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#94a3b8',
  cursor: 'pointer',
  maxWidth: 130,
};

const numInput = {
  width: '100%',
  padding: '8px 10px',
  fontSize: 12,
  borderRadius: 8,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#f1f5f9',
};

const ctaSection = {
  textAlign: 'center',
  paddingTop: 8,
  paddingBottom: 16,
};

const ctaHint = {
  fontSize: 13,
  color: '#64748b',
  marginBottom: 16,
};

const ctaButton = {
  display: 'inline-block',
  padding: '16px 48px',
  fontSize: 14,
  fontWeight: 800,
  letterSpacing: '0.06em',
  color: '#fff',
  background: 'linear-gradient(90deg, #6366f1, #a855f7)',
  border: 'none',
  borderRadius: 14,
  cursor: 'pointer',
  boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
  transition: 'transform 0.15s, box-shadow 0.15s',
};
