// is.code — Portfolio · Grid com screenshots reais
const { useEffect: useEffectPF, useRef: useRefPF, useState: useStatePF } = React;

// ── DADOS ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: '01', client: 'angela barros ateliê',
    tag: 'e-commerce · moda', year: '2025', accent: '#FF9A6C',
    img: './assets/screencapture-angelabarrosatelie-br-2026-05-21-15_38_13 1.svg',
    url: 'https://angelabarrosatelie.com.br',
    result: { num: '+38%', label: 'taxa de conversão' },
  },
  {
    num: '02', client: 'antonnie',
    tag: 'e-commerce · moda', year: '2025', accent: '#C8FF6B',
    img: './assets/screencapture-antonnie-br-2026-05-21-15_39_29 1.svg',
    url: 'https://antonnie.com.br',
    result: { num: '3×', label: 'leads orgânicos / mês' },
  },
  {
    num: '03', client: 'ateliê bride',
    tag: 'e-commerce · jóias · noivas', year: '2025', accent: '#F5C6E0',
    img: './assets/screencapture-ateliebride-2026-05-21-15_43_01 1.svg',
    url: null,
    result: { num: '100%', label: 'identidade aplicada' },
  },
  {
    num: '04', client: 'imperator menswear',
    tag: 'e-commerce · moda masculina', year: '2026', accent: '#38BDF8',
    img: './assets/screencapture-imperatormenswear-au-2026-05-21-15_44_23 1.svg',
    url: null,
    result: { num: '0.9s', label: 'pagespeed 100' },
  },
  {
    num: '05', client: 'performando digital',
    tag: 'landing page · marketing', year: '2026', accent: '#A78BFA',
    img: './assets/screencapture-performandodigital-br-2026-05-21-15_43_39.png',
    url: 'https://performandodigital.com.br',
    result: { num: '+142%', label: 'leads em 60 dias' },
  },
  {
    num: '06', client: 'trindade filmes',
    tag: 'landing page · marketing', year: '2026', accent: '#A78BFA',
    img: 'assets/screencapture-trindadefilmes-2026-05-21-16_47_55.png',
    url: 'https://trindadefilmes.com',
    result: { num: '+142%', label: 'leads em 60 dias' },
  },
];

// ── CARD ─────────────────────────────────────────────────────────
function PfCard({ p, span }) {
  const [hov, setHov] = useStatePF(false);
  const imgRef = useRefPF(null);

  return (
    <div
      className={`pf-grid-card${span ? ' pf-span' : ''}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16,
        border: `1px solid ${hov ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)'}`,
        background: '#0D0D0D',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: span ? 'row' : 'column',
        transition: 'border-color 280ms, box-shadow 320ms, transform 320ms cubic-bezier(0.2,0.7,0.2,1)',
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov
          ? `0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px ${p.accent}22`
          : '0 4px 20px rgba(0,0,0,0.35)',
      }}
    >
      {/* screenshot window */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        height: span ? '100%' : 300,
        width: span ? '58%' : '100%',
        background: '#080808',
      }}>
        {/* top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 3,
          background: `linear-gradient(to right, transparent, ${p.accent} 40%, ${p.accent}88 70%, transparent)`,
          opacity: hov ? 1 : 0.3,
          transition: 'opacity 300ms',
        }} />

        <img
          ref={imgRef}
          src={p.img}
          alt={p.client}
          loading="lazy"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transform: hov ? 'translateY(calc(-100% + 300px))' : 'translateY(0)',
            transition: hov ? 'transform 20s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
            minHeight: '100%',
          }}
        />

        {/* gradient overlay bottom */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 2,
          background: 'linear-gradient(to top, #0D0D0D, transparent)',
          pointerEvents: 'none',
        }} />

        {/* badges */}
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 4,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '4px 10px', borderRadius: 999,
            fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: '0.08em', color: 'rgba(255,255,255,0.75)',
            textTransform: 'uppercase',
          }}>{p.tag}</span>
        </div>
        <div style={{
          position: 'absolute', top: 14, right: 14, zIndex: 4,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em',
        }}>{p.year}</div>

        {/* hover hint */}
        <div style={{
          position: 'absolute', bottom: 14, right: 14, zIndex: 4,
          opacity: hov ? 1 : 0,
          transition: 'opacity 300ms',
          display: 'flex', alignItems: 'center', gap: 5,
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color: p.accent, letterSpacing: '0.06em',
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          scrollando
        </div>
      </div>

      {/* info strip */}
      <div style={{
        padding: span ? '28px 28px 28px 32px' : '20px 22px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        flex: 1,
        justifyContent: span ? 'center' : undefined,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: 6,
            }}>cliente</div>
            <div style={{
              fontSize: span ? 'clamp(18px,2vw,26px)' : 'clamp(15px,1.4vw,18px)',
              fontWeight: 700, color: '#fff',
              letterSpacing: '-0.025em', lineHeight: 1.15,
            }}>{p.client}</div>
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5,
            color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em', flexShrink: 0,
          }}>{p.num}/{String(PROJECTS.length).padStart(2,'0')}</span>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* result */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '12px 14px',
          background: `${p.accent}0F`,
          border: `1px solid ${p.accent}22`,
          borderRadius: 10,
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 8,
              color: `${p.accent}88`, letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 2,
            }}>resultado</div>
            <div style={{
              fontSize: span ? 'clamp(28px,3vw,42px)' : 'clamp(24px,2.4vw,32px)',
              fontWeight: 900, color: p.accent,
              letterSpacing: '-0.03em', lineHeight: 1,
            }}>{p.result.num}</div>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5,
            color: 'rgba(255,255,255,0.38)', lineHeight: 1.5, flex: 1,
          }}>{p.result.label}</div>
        </div>

        {/* links */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <a href="https://wa.me/5515996823970?text=is.code" target="_blank" rel="noopener"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 500,
              color: hov ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.25)',
              transition: 'color 240ms', textDecoration: 'none',
            }}>
            quero um assim
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 17 17 7M8 7h9v9"/></svg>
          </a>
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 11, fontWeight: 500,
                color: hov ? p.accent : 'rgba(255,255,255,0.2)',
                transition: 'color 240ms', textDecoration: 'none',
              }}>
              ver site
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SECTION ───────────────────────────────────────────────────────
function Portfolio() {
  return (
    <section id="portfolio" style={{
      position: 'relative', background: '#080808', overflow: 'hidden',
      padding: 'clamp(72px,11vh,140px) 0 clamp(64px,9vh,120px)',
    }}>
      {/* subtle bg gradient */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 20% 30%, rgba(255,255,255,0.012), transparent)',
      }} />

      <div className="shell" style={{ position: 'relative', zIndex: 2 }}>
        {/* header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24, marginBottom: 48,
        }}>
          <div>
            <Eyebrow dark style={{ marginBottom: 18 }}>portfólio selecionado</Eyebrow>
            <h2 style={{
              color: '#fff', fontSize: 'clamp(28px,4vw,52px)',
              fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02, marginTop: 12,
            }}>
              projetos que<br/>
              <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.35)' }}>geram resultado</span>
              <span style={{ color: 'var(--accent,#C8FF6B)' }}>.</span>
            </h2>
          </div>
          <Button variant="outline-light" size="md"
            href="https://wa.me/5515996823970?text=is.code"
            iconRight={Icon.arrowUpRight(13)}>
            quero um projeto assim
          </Button>
        </div>

        {/* grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }} className="pf-grid">
          {/* first 4 in 2x2 */}
          {(PROJECTS.length % 2 !== 0 ? PROJECTS.slice(0, -1) : PROJECTS).map(p => (
  <PfCard key={p.num} p={p} />
))}
{PROJECTS.length % 2 !== 0 && (
  <PfCard p={PROJECTS[PROJECTS.length - 1]} span />
)}
        </div>
      </div>

      <style>{`
        .pf-grid-card.pf-span {
          grid-column: 1 / -1;
          min-height: 320px;
          max-height: 400px;
        }
        .pf-grid-card.pf-span > div:first-child {
          height: 100% !important;
          width: 58% !important;
        }
        @media (max-width: 768px) {
          .pf-grid { grid-template-columns: 1fr !important; }
          .pf-grid-card.pf-span { flex-direction: column !important; max-height: none !important; min-height: auto !important; }
          .pf-grid-card.pf-span > div:first-child { height: 280px !important; width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Portfolio });
