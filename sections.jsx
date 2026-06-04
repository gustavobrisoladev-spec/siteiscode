// is.code premium — sections
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// ── THEME ─────────────────────────────────────────────────────────
function useTheme() {
  const [dark, setDark] = useStateS(() => {
    try { return localStorage.getItem('iscodeTheme') === 'dark'; } catch { return false; }
  });
  useEffectS(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('iscodeTheme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);
  return [dark, setDark];
}

function ThemeToggle() {
  const [dark, setDark] = useTheme();
  return (
    <button
      onClick={() => setDark(d => !d)}
      title={dark ? 'Modo claro' : 'Modo escuro'}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: '50%',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-secondary)',
        color: 'var(--color-fg-primary)',
        cursor: 'pointer', flexShrink: 0,
        transition: 'background 180ms, border-color 180ms, transform 200ms',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {dark
        ? /* sun */ <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        : /* moon */ <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      }
    </button>
  );
}

// ════════════════════════════════════════════════════════════════════
// NAV
// ════════════════════════════════════════════════════════════════════
function TopNav() {
  const [scrolled, setScrolled] = useStateS(false);
  const [mobileOpen, setMobileOpen] = useStateS(false);
  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { label: 'serviços', href: '#servicos' },
    { label: 'portfólio', href: '#portfolio' },
    { label: 'método', href: '#metodo' },
    { label: 'sobre', href: '#sobre' },
    { label: 'insights', href: '#insights' },
  ];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
      background: scrolled ? 'rgba(var(--nav-bg-rgb,248,248,246),0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      transition: 'background 220ms ease-out, border-color 220ms',
    }}>
      <div className="shell" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 68,
      }}>
        <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Logo dark size={26} />
        </a>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 36,
        }} className="nav-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: 13.5, fontWeight: 500, color: 'var(--color-fg-primary)',
              position: 'relative', padding: '4px 0',
            }}>{l.label}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-desktop">
          <ThemeToggle />
          <Button variant="ghost" size="sm" href="#contato">contato</Button>
          <Button variant="primary" size="sm" href="https://wa.me/5515996823970?text=is.code"
            iconRight={Icon.arrowUpRight(14)}>agendar conversa</Button>
        </div>

        <button className="nav-mobile" onClick={() => setMobileOpen(v => !v)} style={{
          display: 'none', padding: 8, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)',
        }}>
          {mobileOpen ? Icon.close(18) : Icon.menu(18)}
        </button>
        <div className="nav-mobile" style={{ display: 'none' }}><ThemeToggle /></div>
      </div>
      {mobileOpen && (
        <div className="nav-mobile" style={{
          display: 'none', padding: '12px var(--page-gutter) 24px',
          background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)',
          flexDirection: 'column', gap: 16,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em',
            }}>{l.label}</a>
          ))}
          <Button variant="primary" size="lg" href="https://wa.me/5515996823970?text=is.code"
            iconRight={Icon.arrowUpRight(14)} style={{ alignSelf: 'flex-start', marginTop: 8 }}>
            agendar conversa
          </Button>
        </div>
      )}
      <style>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: ${mobileOpen ? 'flex' : 'inline-flex'} !important; }
        }
      `}</style>
    </nav>
  );
}

// ════════════════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════════════════
const HERO_WORDS = ['presença', 'loja', 'marca', 'resultado'];

function HeroEditorial() {
  const [wi, setWi] = useStateS(0);
  const [typed, setTyped] = useStateS('');
  const [phase, setPhase] = useStateS('typing'); // typing | hold | deleting
  useEffectS(() => {
    const word = HERO_WORDS[wi];
    let t;
    if (phase === 'typing') {
      if (typed.length < word.length) {
        t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 95);
      } else {
        t = setTimeout(() => setPhase('hold'), 1800);
      }
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('deleting'), 200);
    } else if (phase === 'deleting') {
      if (typed.length > 0) {
        t = setTimeout(() => setTyped(word.slice(0, typed.length - 1)), 38);
      } else {
        setWi((wi + 1) % HERO_WORDS.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(t);
  }, [typed, phase, wi]);

  return (
    <header id="top" style={{
      position: 'relative',
      paddingTop: 'clamp(140px, 22vh, 220px)',
      paddingBottom: 'clamp(40px, 8vh, 96px)',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.04) 1px, transparent 1px)`,
        backgroundSize: 'calc(100% / 6) 100%',
        maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
      }} />

      <div className="shell" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Eyebrow>is.code / agência ia · e-commerce · sites</Eyebrow>
            <Pill variant="dot"><span style={{ marginRight: 4 }}>operando</span> 24/7</Pill>
          </div>

          <h1 className="display" style={{ marginTop: 0 }}>
            do zero ao digital.<br/>
            <span className="light">do digital ao</span> resultado<span className="punct">.</span>
          </h1>

          <div style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(16px, 1.5vw, 20px)',
            color: 'var(--color-fg-secondary)', letterSpacing: '-0.005em',
          }}>
            <span style={{ fontWeight: 500, color: 'var(--color-fg-primary)' }}>is.</span>
            <span className="cursor" style={{
              fontWeight: 500, color: 'var(--color-fg-primary)', minWidth: 200,
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: 2,
            }}>{typed}</span>
          </div>

          <p className="lead" style={{ maxWidth: 620 }}>
            a is.code desenvolve sites institucionais, landing pages e e-commerces completos —
            com layout exclusivo, configuração do início ao fim e tecnologia escolhida
            de acordo com o que cada negócio realmente precisa.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            <Button variant="primary" size="lg" href="https://wa.me/5515996823970?text=is.code"
              icon={Icon.whatsapp(14)}>
              falar com especialista
            </Button>
            <Button variant="outline" size="lg" href="#servicos" iconRight={Icon.arrowDown(14)}>
              ver como funciona
            </Button>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 24, marginTop: 32,
            flexWrap: 'wrap', color: 'var(--color-fg-secondary)', fontSize: 12.5,
          }}>
            <span className="mono" style={{ color: 'var(--color-fg-tertiary)' }}>v.2026 / itaporanga · sp</span>
            <span style={{ width: 1, height: 14, background: 'var(--color-border)' }} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {Icon.check(14)} entrega completa — do briefing ao go-live
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSplit() {
  return (
    <header id="top" style={{ paddingTop: 120, position: 'relative', overflow: 'hidden' }}>
      <div className="shell">
        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)',
          gap: 64, alignItems: 'center', paddingTop: 64, paddingBottom: 80,
        }} className="hero-split">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Eyebrow>is.code / agência ia · e-commerce · sites</Eyebrow>
            <h1 className="display">
              desenvolvimento<br/>
              <span className="light">que não para na</span> entrega<span className="punct">.</span>
            </h1>
            <p className="lead" style={{ maxWidth: 520 }}>
              sites, landing pages e e-commerces completos — layout exclusivo,
              configuração total e tecnologia certa para cada projeto,
              do briefing ao go-live.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              <Button variant="primary" size="lg" href="https://wa.me/5515996823970?text=is.code"
                icon={Icon.whatsapp(14)}>falar agora</Button>
              <Button variant="outline" size="lg" href="#servicos">explorar serviços</Button>
            </div>
          </div>
          <ChatPreview />
        </div>
      </div>
      <style>{`
        @media (max-width: 920px) {
          .hero-split { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </header>
  );
}

function ChatPreview() {
  const msgs = [
    { from: 'user', text: 'oi! vocês fazem entrega em itaporanga?' },
    { from: 'bot', text: 'oi, daniela! sim — entregamos toda quarta e sábado pela manhã. quer que eu reserve o próximo horário?' },
    { from: 'user', text: 'pode ser sábado às 10h' },
    { from: 'bot', text: 'reservado. mando o link de pagamento pix aqui mesmo. confirma o cep?' },
  ];
  return (
    <div style={{
      background: 'var(--color-bg-paper)', border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-2xl)', padding: 18, boxShadow: 'var(--shadow-lg)',
      display: 'flex', flexDirection: 'column', gap: 10, position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-black)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-white)' }}>{Icon.bot(16)}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>agente is.code</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--color-success)' }}>● online · responde em segundos</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Pill variant="mono">whatsapp</Pill>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '82%',
            background: m.from === 'user' ? 'var(--color-bg-secondary)' : 'var(--color-black)',
            color: m.from === 'user' ? 'var(--color-fg-primary)' : 'var(--color-white)',
            padding: '10px 14px', borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            fontSize: 13.5, lineHeight: 1.45,
          }}>{m.text}</div>
        ))}
        <div style={{
          alignSelf: 'flex-start', padding: '10px 14px', borderRadius: '16px 16px 16px 4px',
          background: 'var(--color-bg-secondary)', display: 'inline-flex', gap: 4,
        }}>
          {[0,1,2].map(i => <span key={i} style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--color-fg-tertiary)',
            animation: `blink 1.2s ${i*0.18}s infinite`,
          }} />)}
        </div>
      </div>
      <div style={{
        marginTop: 6, padding: 12, border: '1px solid var(--color-border)', borderRadius: 12,
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, background: 'var(--color-bg-secondary)',
      }}>
        <Stat small label="resposta" value="2s" />
        <Stat small label="taxa atend." value="100%" />
        <Stat small label="conversão" value="+38%" />
      </div>
    </div>
  );
}

function Stat({ label, value, small = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: small ? 18 : 32, fontWeight: 700, letterSpacing: '-0.02em' }}>{value}</span>
      <span className="mono" style={{ fontSize: small ? 10 : 11 }}>{label}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MARQUEE
// ════════════════════════════════════════════════════════════════════
function Marquee({ dark = false }) {
  const items = ['sites institucionais', 'e-commerce completo', 'landing pages', 'design exclusivo', 'seo técnico', 'layout personalizado', 'do briefing ao go-live', 'entrega completa'];
  const loop = [...items, ...items];
  return (
    <div className={`marquee ${dark ? 'marquee--dark' : ''}`} style={dark ? { background: 'var(--color-black)' } : {}}>
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span key={i} className="marquee__item">{item}</span>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// STATS STRIP
// ════════════════════════════════════════════════════════════════════
function StatsStrip() {
  const stats = [
    { value: 60, suffix: '+', label: 'clientes ativos' },
    { value: 120, suffix: '+', label: 'projetos concluídos' },
    { value: 8, suffix: ' anos', label: 'no mercado digital' },
    { value: 24, suffix: '/7', label: 'operação contínua' },
  ];
  return (
    <section className="divider-top divider-bottom" style={{ padding: '40px 0' }}>
      <div className="shell" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', gap: 8,
            borderLeft: i === 0 ? 'none' : '1px solid var(--color-border)',
            paddingLeft: i === 0 ? 0 : 24,
          }} className="stat-cell">
            <div style={{
              fontSize: 'clamp(34px, 4.6vw, 64px)', fontWeight: 700,
              letterSpacing: '-0.03em', lineHeight: 1,
              fontFeatureSettings: '"tnum"',
            }}>
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mono" style={{ fontSize: 11 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 720px) {
          .stat-cell { border-left: none !important; padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// SERVICES (4 cards, editorial)
// ════════════════════════════════════════════════════════════════════
const SERVICES = [
  {
    num: '01',
    icon: Icon.globe(20),
    tag: 'sites & landing pages',
    title: 'a vitrine do seu negócio não pode ser genérica.',
    desc: 'sites institucionais multipáginas e landing pages desenvolvidos do zero — design exclusivo, performance acima da média e estrutura preparada para crescer. wordpress ou código puro, conforme o projeto exige.',
    bullets: ['design exclusivo · nada de template', 'seo técnico desde o primeiro dia', 'performance abaixo de 1s de carregamento'],
  },
  {
    num: '02',
    icon: Icon.store(20),
    tag: 'e-commerce completo',
    title: 'sua loja pronta para vender — sem etapas faltando.',
    desc: 'implementação completa: layout personalizado, produtos cadastrados, pagamentos e frete configurados, banners criados. a plataforma certa é escolhida de acordo com o que o seu negócio precisa.',
    bullets: ['cadastro e organização de produtos', 'pagamentos, frete e e-mails configurados', 'loja entregue testada e pronta para operar'],
  },
  {
    num: '03',
    icon: Icon.target(20),
    tag: 'personalização de layout',
    title: 'sua plataforma já existe. só não representa quem você é.',
    desc: 'a is.code faz a personalização completa do layout do e-commerce existente — sem migração de plataforma, sem perda de histórico, sem impacto na operação. o resultado é uma loja que finalmente parece sua.',
    bullets: ['identidade visual aplicada em toda a loja', 'banners, vitrines e destaques criados', 'sem trocar de plataforma ou perder dados'],
  },
  {
    num: '04',
    icon: Icon.bot(20),
    tag: 'manutenção & evolução',
    title: 'seu digital evoluindo todo mês — sem virar dor de cabeça.',
    desc: 'novas páginas, ajustes de performance, atualizações de conteúdo e relatórios mensais. a is.code mantém a plataforma funcionando enquanto o negócio cresce.',
    bullets: ['evolução contínua do site ou loja', 'atualizações de conteúdo e produtos', 'relatório mensal de performance'],
  },
];

function Services() {
  return (
    <section id="servicos" className="section">
      <div className="shell">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 32, marginBottom: 56, flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 620 }}>
            <Eyebrow style={{ marginBottom: 20 }}>nossos serviços</Eyebrow>
            <h2 style={{ marginBottom: 16 }}>
              soluções completas para<br/>
              <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--color-fg-secondary)' }}>cada tipo de negócio.</span>
            </h2>
          </div>
          <div style={{ maxWidth: 360 }}>
            <p>da landing page ao e-commerce com centenas de produtos — a is.code entrega do zero ao go-live, sem etapas faltando e sem terceirizar o que é crítico.</p>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)',
          overflow: 'hidden', background: 'var(--color-bg-paper)',
        }} className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} {...s} idx={i} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ num, icon, tag, title, desc, bullets, idx }) {
  const [hov, setHov] = useStateS(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: 'clamp(28px, 3.4vw, 44px)',
        borderRight: idx % 2 === 0 ? '1px solid var(--color-border)' : 'none',
        borderBottom: idx < 2 ? '1px solid var(--color-border)' : 'none',
        position: 'relative', overflow: 'hidden',
        background: hov ? 'var(--color-bg-secondary)' : 'var(--color-bg-paper)',
        transition: 'background 240ms ease-out',
        minHeight: 360,
        display: 'flex', flexDirection: 'column',
      }}>
      <div style={{
        position: 'absolute', top: 20, right: 24,
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--color-fg-tertiary)', letterSpacing: '0.06em',
      }}>{num} / 04</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
        <span style={{
          width: 38, height: 38, borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-border-strong)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-fg-primary)',
        }}>{icon}</span>
        <Pill variant="mono">{tag}</Pill>
      </div>

      <h3 style={{ marginBottom: 14, textWrap: 'balance' }}>{title}</h3>
      <p style={{ marginBottom: 24, maxWidth: 460 }}>{desc}</p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
            <span style={{ color: 'var(--accent)' }}>{Icon.check(14)}</span>
            <span style={{ color: 'var(--color-fg-primary)' }}>{b}</span>
          </li>
        ))}
      </ul>

      <a href="https://wa.me/5515996823970?text=is.code"
        target="_blank" rel="noopener" style={{
        marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: 13, fontWeight: 500, color: 'var(--color-fg-primary)',
        transition: 'transform 200ms', transform: hov ? 'translateX(4px)' : 'none',
        alignSelf: 'flex-start',
      }}>
        <span>conversar sobre {tag}</span>
        <span style={{ display: 'inline-flex' }}>{Icon.arrowUpRight(14)}</span>
      </a>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// AI SPOTLIGHT — dark section
// ════════════════════════════════════════════════════════════════════
function AiSpotlight() {
  return (
    <section className="dark section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: 'calc(100% / 12) 100%',
        maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
      }} />
      <div className="shell" style={{ position: 'relative' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)',
          gap: 64, alignItems: 'center',
        }} className="spotlight-grid">

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Eyebrow dark>spotlight · desenvolvimento & e-commerce</Eyebrow>
            <h2 style={{ color: 'var(--color-white)' }}>
              desenvolvimento<br/>
              mediano custa<br/>
              caro —<br/>
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.55)' }}>a is.code entrega</span><span style={{ color: 'var(--accent, var(--color-white))' }}>.</span>
            </h2>
            <p style={{ maxWidth: 480, color: 'rgba(255,255,255,0.65)' }}>
              sites que não convertem, lojas entregues pela metade e projetos sem configuração completa
              têm um custo que vai além do financeiro — custam tempo, credibilidade e oportunidades.
              cada projeto da is.code é entregue do zero ao go-live, sem etapas faltando.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
              marginTop: 16, borderTop: '1px solid var(--color-border-dark)',
              paddingTop: 24,
            }}>
              {[
                { v: '0.9s', l: 'tempo de carregamento médio' },
                { v: '+38%', l: 'taxa de conversão pós-redesign' },
                { v: '100',  l: 'pontuação google pagespeed' },
              ].map((m, i) => (
                <div key={i} style={{
                  paddingLeft: i === 0 ? 0 : 20,
                  borderLeft: i === 0 ? 'none' : '1px solid var(--color-border-dark)',
                }}>
                  <div style={{
                    fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700,
                    color: 'var(--color-white)', letterSpacing: '-0.025em', lineHeight: 1,
                  }}>{m.v}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>{m.l}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
              <Button variant="inverse" size="lg" href="https://wa.me/5515996823970?text=is.code"
                icon={Icon.whatsapp(14)}>
                pedir orçamento
              </Button>
              <Button variant="outline-light" size="lg" href="#servicos">
                ver portfólio
              </Button>
            </div>
          </div>

          <BrowserPreview />
        </div>
      </div>
      <style>{`
        @media (max-width: 920px) {
          .spotlight-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function BrowserPreview() {
  return (
    <div style={{
      background: '#0E0E0E', border: '1px solid #1E1E1E', borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
    }}>
      {/* chrome */}
      <div style={{
        padding: '10px 14px', borderBottom: '1px solid #1E1E1E',
        display: 'flex', alignItems: 'center', gap: 8, background: '#0E0E0E',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3a3a3a' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3a3a3a' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3a3a3a' }} />
        <div style={{
          marginLeft: 12, flex: 1, background: '#181818', color: '#9CA3AF',
          borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
          fontSize: 11, letterSpacing: '0.04em',
        }}>https://sualoja.com.br/colecao-verao</div>
      </div>
      {/* mock store page */}
      <div style={{ background: '#FBFBF9', color: '#0A0A0A', padding: '20px 22px', minHeight: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 14, letterSpacing: '-0.02em' }}>sua.loja</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#6B6B6B' }}>
              <span>verão</span><span>novidades</span><span>outlet</span>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B6B6B', letterSpacing: '0.06em' }}>carrinho · 2</div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
        }}>
          {[0,1,2,3,4,5].map(i => <ProductCardMini key={i} idx={i} />)}
        </div>
        <div style={{
          marginTop: 18, padding: '10px 14px', background: '#0A0A0A', color: '#FFFFFF',
          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 12,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }} />
            checkout em 1 clique · pix · cartão · boleto
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.7 }}>0.9s · 100 / pagespeed</span>
        </div>
      </div>
    </div>
  );
}

function ProductCardMini({ idx }) {
  const shades = ['#E8E4DC', '#D4CFC4', '#2E2E2E', '#C2B69A', '#1A1A1A', '#EDE8E0'];
  const labels = ['camisa linho', 'tricô oversized', 'saia midi', 'bermuda alfaiataria', 'jaqueta couro', 'chemise seda'];
  const prices = ['r$ 289', 'r$ 459', 'r$ 219', 'r$ 339', 'r$ 1.290', 'r$ 379'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{
        aspectRatio: '4 / 5', background: shades[idx], borderRadius: 6, position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: 6,
      }}>
        {/* abstract clothing shape */}
        <svg viewBox="0 0 80 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }} aria-hidden>
          <path d={[
            'M20 20 L30 10 L50 10 L60 20 L70 30 L65 90 L15 90 L10 30 Z',
            'M15 25 L25 15 L55 15 L65 25 L70 50 L60 55 L55 90 L25 90 L20 55 L10 50 Z',
            'M25 30 L55 30 L60 95 L20 95 Z',
            'M20 30 L60 30 L55 65 L25 65 Z M25 65 L55 65 L60 95 L20 95 Z',
            'M15 20 L65 20 L60 45 L20 45 Z M20 45 L60 45 L65 95 L15 95 Z',
            'M25 18 L55 18 L62 32 L57 90 L23 90 L18 32 Z',
          ][idx]} fill="rgba(0,0,0,0.25)" />
        </svg>
        {idx === 4 && (
          <span style={{
            position: 'absolute', top: 6, left: 6,
            background: '#FFFFFF', color: '#0A0A0A',
            fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.06em',
            padding: '2px 6px', borderRadius: 4,
          }}>novo</span>
        )}
      </div>
      <div style={{ fontSize: 10.5, color: '#0A0A0A', letterSpacing: '-0.005em' }}>{labels[idx]}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B6B6B' }}>{prices[idx]}</div>
    </div>
  );
}

function Terminal() {
  const [step, setStep] = useStateS(0);
  useEffectS(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 5), 1900);
    return () => clearInterval(id);
  }, []);
  const lines = [
    { kind: 'cmd',  text: 'is.code agent --listen whatsapp' },
    { kind: 'ok',   text: '✓ conectado · sessão ativa em 0.4s' },
    { kind: 'evt',  text: '→ msg recebida [marcelo · 22:14]: vocês entregam sábado?' },
    { kind: 'reasoning', text: '… consultando catálogo e calendário …' },
    { kind: 'send', text: '← resposta enviada: "sim! sábado 10h–14h. quer que eu reserve?"' },
  ];
  const colors = {
    cmd: '#FFFFFF', ok: '#4ADE80', evt: '#FCD34D', reasoning: '#9CA3AF', send: '#60A5FA',
  };
  return (
    <div style={{
      background: '#0E0E0E', border: '1px solid #1E1E1E', borderRadius: 14,
      overflow: 'hidden', fontFamily: 'var(--font-mono)', fontSize: 12.5,
      boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
    }}>
      <div style={{
        padding: '10px 14px', borderBottom: '1px solid #1E1E1E',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3a3a3a' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3a3a3a' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3a3a3a' }} />
        <span style={{ marginLeft: 10, fontSize: 11, color: '#6B6B6B' }}>is.code · agent runtime</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#4ADE80', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }} /> live
        </span>
      </div>
      <div style={{ padding: '20px 18px', color: '#E0E0E0', lineHeight: 2, minHeight: 240 }}>
        {lines.map((l, i) => (
          <div key={i} style={{
            opacity: step >= i ? 1 : 0.15,
            transition: 'opacity 360ms',
            color: colors[l.kind] || '#E0E0E0',
          }}>
            <span style={{ color: '#4A4A4A', marginRight: 12 }}>
              {l.kind === 'cmd' ? '$' : l.kind === 'ok' ? ' ' : l.kind === 'evt' ? ' ' : l.kind === 'send' ? ' ' : ' '}
            </span>
            {l.text}
            {step === i && <span className="cursor" />}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { TopNav, HeroEditorial, HeroSplit, Marquee, StatsStrip, Services, AiSpotlight });
