// is.code premium — shared primitives
const { useState, useEffect, useRef } = React;

// ── BUTTON ───────────────────────────────────────────
function Button({ children, variant = 'primary', size = 'md', as = 'button', href, onClick, icon, iconRight, style = {} }) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 12, gap: 6 },
    md: { padding: '11px 18px', fontSize: 13, gap: 8 },
    lg: { padding: '15px 26px', fontSize: 14, gap: 10 },
    xl: { padding: '18px 32px', fontSize: 15, gap: 12 },
  };
  const variants = {
    primary: {
      background: hov ? 'var(--accent)' : 'var(--color-black)',
      color: hov ? 'var(--accent-fg, #fff)' : 'var(--color-white)',
      border: '1px solid var(--color-black)',
    },
    inverse: {
      background: hov ? 'var(--accent)' : 'var(--color-white)',
      color: hov ? 'var(--accent-fg, #0a0a0a)' : 'var(--color-black)',
      border: '1px solid var(--color-white)',
    },
    outline: {
      background: hov ? 'rgba(10,10,10,0.04)' : 'transparent',
      color: 'var(--color-black)',
      border: '1px solid var(--color-border-strong)',
    },
    'outline-light': {
      background: hov ? 'rgba(255,255,255,0.08)' : 'transparent',
      color: 'var(--color-white)',
      border: '1px solid rgba(255,255,255,0.25)',
    },
    ghost: {
      background: hov ? 'var(--color-bg-secondary)' : 'transparent',
      color: 'var(--color-fg-primary)',
      border: '1px solid transparent',
    },
  };
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-sans)', fontWeight: 500,
    letterSpacing: '-0.005em',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    transition: 'background 180ms ease-out, color 180ms ease-out, transform 120ms ease-out, border-color 180ms ease-out',
    transform: press ? 'scale(0.98)' : 'scale(1)',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    ...sizes[size],
    ...variants[variant],
    ...style,
  };
  const inner = (
    <>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconRight}</span>}
    </>
  );
  if (as === 'a' || href) {
    return (
      <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPress(false); }}
        onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
        style={base} onClick={onClick}>{inner}</a>
    );
  }
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={base}>{inner}</button>
  );
}

// ── PILL / TAG ───────────────────────────────────────
function Pill({ children, variant = 'mono', icon, style = {} }) {
  const variants = {
    mono: {
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
      background: 'var(--color-bg-secondary)', color: 'var(--color-fg-primary)',
      border: '1px solid var(--color-border)',
    },
    dot: {
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
      background: 'transparent', color: 'var(--color-fg-primary)',
      border: '1px solid var(--color-border)',
    },
    dark: {
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
      background: 'rgba(255,255,255,0.06)', color: 'var(--color-white)',
      border: '1px solid rgba(255,255,255,0.16)',
    },
    accent: {
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
      background: 'var(--accent-soft)', color: 'var(--color-fg-primary)',
      border: '1px solid var(--accent-soft)',
    },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 'var(--radius-full)',
      ...variants[variant], ...style,
    }}>
      {variant === 'dot' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent, currentColor)' }} />}
      {icon}
      {children}
    </span>
  );
}

// ── EYEBROW ──────────────────────────────────────────
function Eyebrow({ children, dark = false, style = {} }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 11,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: dark ? 'rgba(255,255,255,0.55)' : 'var(--color-fg-secondary)',
      display: 'inline-flex', alignItems: 'center', gap: 12,
      ...style,
    }}>
      <span style={{ width: 24, height: 1, background: 'currentColor', opacity: 0.55 }} />
      {children}
    </span>
  );
}

// ── LOGO ─────────────────────────────────────────────
function Logo({ dark = true, size = 26 }) {
  const src = dark ? 'assets/logo-dark.webp' : 'assets/logo-white.webp';
  return <img src={src} alt="is.code" style={{ height: size, width: 'auto' }} />;
}

// ── COUNTER (animated) ───────────────────────────────
function Counter({ to, suffix = '+', duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── ICONS (inline SVG, stroke-based, lucide-style) ───
const Icon = {
  arrow: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
  ),
  arrowUpRight: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>
  ),
  arrowDown: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
  ),
  whatsapp: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.711.306 1.265.489 1.697.626.713.226 1.362.194 1.875.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
  ),
  spark: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/></svg>
  ),
  bolt: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>
  ),
  bot: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="3"/><path d="M12 8V4M8 4h8M8 14h.01M16 14h.01M9 18h6"/></svg>
  ),
  store: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9 4 4h16l1 5M3 9v11h18V9M3 9h18M9 13h6"/></svg>
  ),
  globe: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
  ),
  target: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  check: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
  ),
  plus: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
  ),
  minus: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  ),
  menu: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h16M4 16h10"/></svg>
  ),
  close: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
  ),
  mail: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
  ),
  phone: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92V21a1 1 0 0 1-1.1 1A19 19 0 0 1 2 4.1 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.29 1L7.21 10.21a16 16 0 0 0 6.58 6.58l1.46-1.59a1 1 0 0 1 1-.29l4 1a1 1 0 0 1 .75 1z"/></svg>
  ),
  pin: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-7.58-8-13a8 8 0 1 1 16 0c0 5.42-8 13-8 13z"/><circle cx="12" cy="9" r="2.5"/></svg>
  ),
  instagram: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>
  ),
  facebook: (size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
};

// Export to window
Object.assign(window, { Button, Pill, Eyebrow, Logo, Counter, Icon });
