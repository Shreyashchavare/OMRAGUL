// src/pages/AuthPage.jsx
// Handles Login, Signup, and Forgot-Password views.
// Props:
//   onLogin  → called after successful sign-in / sign-up

import { useState } from 'react';
import { Brain, Check, Eye, EyeOff, Shield, Settings2, UserCircle } from 'lucide-react';

const ROLES = [
  { id: 'admin',      icon: Shield,     label: 'Admin',      subtitle: 'Full system control' },
  { id: 'controller', icon: Settings2,  label: 'Controller', subtitle: 'Manage models & docs' },
  { id: 'user',       icon: UserCircle, label: 'User',       subtitle: 'Chat & query' },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function AuthPage({ onLogin }) {
  const [view, setView]           = useState('login');   // 'login' | 'signup' | 'forgot'
  const [showPass, setShowPass]   = useState(false);
  const [resetDone, setResetDone] = useState(false);

  // form fields (kept simple — no real validation needed for demo)
  const [fields, setFields] = useState({ name: '', email: '', password: '', confirm: '', role: 'user' });
  const set = (k) => (e) => setFields((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = () => {
    if (view === 'forgot') { setResetDone(true); return; }
    onLogin(fields.role);
  };

  return (
    <div style={wrap}>
      {/* Background glow */}
      <div style={glow} />

      <div style={panel}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={logoBox}>
            <Brain size={23} color="#fff" />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 6, color: '#f1f5f9' }}>
            {view === 'login'  ? 'Welcome back'     :
             view === 'signup' ? 'Create account'   : 'Reset password'}
          </h2>
          <p style={{ color: '#64748b', fontSize: 13 }}>
            {view === 'login'  ? 'Sign in to VectorMind'  :
             view === 'signup' ? 'Start your free trial'  : "We'll send you a reset link"}
          </p>
        </div>

        {/* ── RESET DONE ───────────────────────────────────────────────────── */}
        {resetDone ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={successCircle}>
              <Check size={22} color="#10b981" />
            </div>
            <p style={{ color: '#10b981', fontWeight: 700, marginBottom: 6 }}>Reset link sent!</p>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>Check your email inbox.</p>
            <button
              onClick={() => { setResetDone(false); setView('login'); }}
              style={linkBtn}
            >
              ← Back to login
            </button>
          </div>

        ) : (
          /* ── FORMS ─────────────────────────────────────────────────────── */
          <>
            {/* Name — signup only */}
            {view === 'signup' && (
              <Input label="Full name" value={fields.name} onChange={set('name')} placeholder="Arjun Sharma" />
            )}

            {/* Role selector — login only */}
            {view === 'login' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 8 }}>
                  Sign in as
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {ROLES.map(({ id, icon: Icon, label, subtitle }) => {
                    const selected = fields.role === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setFields((p) => ({ ...p, role: id }))}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 14px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                          background: selected ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
                          border: selected ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
                          transition: 'all 0.15s',
                        }}
                      >
                        <div style={{
                          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                          background: selected ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Icon size={18} color={selected ? '#a5b4fc' : '#64748b'} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: selected ? '#e2e8f0' : '#94a3b8' }}>{label}</div>
                          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{subtitle}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Email */}
            <Input label="Email address" type="email" value={fields.email} onChange={set('email')} placeholder="you@example.com" />

            {/* Password */}
            {view !== 'forgot' && (
              <div style={{ position: 'relative', marginBottom: 12 }}>
                <Input
                  label="Password" type={showPass ? 'text' : 'password'}
                  value={fields.password} onChange={set('password')}
                  placeholder="••••••••"
                  noMargin
                />
                <button
                  onClick={() => setShowPass((p) => !p)}
                  style={{
                    position: 'absolute', right: 12, bottom: 10,
                    background: 'none', border: 'none', cursor: 'pointer', color: '#64748b',
                  }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            )}

            {/* Confirm password — signup only */}
            {view === 'signup' && (
              <Input label="Confirm password" type="password" value={fields.confirm} onChange={set('confirm')} placeholder="••••••••" />
            )}

            {/* Forgot link — login only */}
            {view === 'login' && (
              <div style={{ textAlign: 'right', marginBottom: 16, marginTop: -4 }}>
                <button onClick={() => setView('forgot')} style={linkBtn}>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button onClick={handleSubmit} style={submitBtn}>
              {view === 'login'  ? 'Sign In →'           :
               view === 'signup' ? 'Create Account →'    : 'Send Reset Link'}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
              <div style={divider} />
              <span style={{ color: '#475569', fontSize: 12, whiteSpace: 'nowrap' }}>or continue with</span>
              <div style={divider} />
            </div>

            {/* OAuth buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {['Google', 'GitHub'].map((p) => (
                <button key={p} onClick={() => onLogin(fields.role)} style={oauthBtn}>
                  {p}
                </button>
              ))}
            </div>

            {/* Toggle view */}
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: 13, marginTop: 20 }}>
              {view === 'login' ? (
                <>Don&apos;t have an account?{' '}
                  <button onClick={() => setView('signup')} style={linkBtn}>Sign up</button></>
              ) : view === 'signup' ? (
                <>Already have an account?{' '}
                  <button onClick={() => setView('login')} style={linkBtn}>Sign in</button></>
              ) : (
                <button onClick={() => setView('login')} style={linkBtn}>← Back to login</button>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ─── INPUT COMPONENT ──────────────────────────────────────────────────────────
function Input({ label, type = 'text', value, onChange, placeholder, noMargin }) {
  return (
    <div style={{ marginBottom: noMargin ? 0 : 12 }}>
      <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 5 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '11px 14px',
          borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.05)', color: '#e2e8f0', fontSize: 14,
        }}
      />
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const wrap = {
  minHeight: '100vh', background: '#05050a',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: 'var(--font)', position: 'relative',
};

const glow = {
  position: 'absolute', inset: 0, pointerEvents: 'none',
  background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(99,102,241,0.13), transparent)',
};

const panel = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 24, padding: '36px 32px',
  width: '100%', maxWidth: 420,
  position: 'relative', zIndex: 1,
};

const logoBox = {
  width: 48, height: 48, borderRadius: 14,
  background: 'linear-gradient(135deg,#6366f1,#a855f7)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  margin: '0 auto 16px',
};

const successCircle = {
  width: 48, height: 48, borderRadius: '50%',
  background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  margin: '0 auto 14px',
};

const submitBtn = {
  width: '100%', padding: '12px', borderRadius: 10, border: 'none',
  background: 'linear-gradient(135deg,#6366f1,#a855f7)',
  color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
  marginTop: 4,
};

const oauthBtn = {
  flex: 1, padding: '10px', borderRadius: 9,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.04)',
  color: '#94a3b8', cursor: 'pointer', fontSize: 13,
};

const linkBtn = {
  background: 'none', border: 'none',
  color: '#a5b4fc', cursor: 'pointer', fontSize: 13,
};

const divider = {
  flex: 1, height: 1, background: 'rgba(255,255,255,0.07)',
};
