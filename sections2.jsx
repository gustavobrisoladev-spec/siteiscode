// is.code premium — sections part 2
const { useState: useStateS2, useEffect: useEffectS2 } = React;

// ════════════════════════════════════════════════════════════════════
// METHOD / PROCESS
// ════════════════════════════════════════════════════════════════════
const STEPS = [
  {
    n: '01',
    label: 'diagnóstico',
    title: 'mapeamos onde você perde venda hoje.',
    desc: 'conversa de 30 min, análise do funil, identificação de gargalos no atendimento e na conversão. saída: um plano com 3 a 5 oportunidades priorizadas.',
    span: 'semana 1',
  },
  {
    n: '02',
    label: 'desenho',
    title: 'projetamos o sistema antes de codar.',
    desc: 'fluxos conversacionais, jornada no site, integrações com whatsapp/instagram/erp. validamos com você em protótipo antes de implementar.',
    span: 'semana 1–2',
  },
  {
    n: '03',
    label: 'implementação',
    title: 'sprints curtos, entregas semanais.',
    desc: 'desenvolvimento incremental, com revisão de cada peça em produção. zero "big bang" — você acompanha tudo em tempo real.',
    span: 'semana 2–5',
  },
  {
    n: '04',
    label: 'operação',
    title: 'painel em tempo real e melhoria contínua.',
    desc: 'visibilidade total sobre o que a ia está fazendo: atendimentos, conversões, gargalos. ajustes mensais com base em dados, não em achismo.',
    span: 'contínuo',
  },
];

function Method() {
  return (
    <section id="metodo" className="section divider-top">
      <div className="shell">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
          <div>
            <Eyebrow style={{ marginBottom: 20 }}>como trabalhamos</Eyebrow>
            <h2 style={{ maxWidth: 760, marginBottom: 12 }}>
              um método em quatro tempos — direto<br/>
              ao ponto, do diagnóstico à operação<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
          </div>
          <Pill variant="mono">~4 semanas para o primeiro agente em produção</Pill>
        </div>

        <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
          {STEPS.map((s, i) => <MethodRow key={s.n} step={s} last={i === STEPS.length - 1} />)}
        </ol>
      </div>
    </section>
  );
}

function MethodRow({ step, last }) {
  const [hov, setHov] = useStateS2(false);
  return (
    <li
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '88px minmax(0, 220px) minmax(0, 1fr) 120px',
        gap: 32, alignItems: 'baseline',
        padding: '32px 0',
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        position: 'relative',
        cursor: 'default',
      }}
      className="method-row">
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 13,
        color: hov ? 'var(--color-fg-primary)' : 'var(--color-fg-tertiary)',
        letterSpacing: '0.04em', transition: 'color 220ms',
      }}>
        {step.n}
      </div>
      <div>
        <div style={{
          fontSize: 14, fontWeight: 600, marginBottom: 4,
          letterSpacing: '-0.005em',
        }}>{step.label}</div>
        <div className="mono" style={{ fontSize: 11 }}>{step.span}</div>
      </div>
      <div style={{ maxWidth: 720 }}>
        <h3 style={{
          fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 500,
          letterSpacing: '-0.02em', marginBottom: 10,
          color: 'var(--color-fg-primary)',
          textWrap: 'balance',
        }}>{step.title}</h3>
        <p style={{ maxWidth: 580, fontSize: 14.5 }}>{step.desc}</p>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'flex-end', alignSelf: 'center',
        opacity: hov ? 1 : 0.35, transition: 'opacity 220ms',
      }}>
        <span style={{
          width: 44, height: 44, borderRadius: '50%',
          border: '1px solid var(--color-border-strong)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transform: hov ? 'translateX(0)' : 'translateX(-4px)',
          transition: 'transform 220ms',
        }}>{Icon.arrow(16)}</span>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .method-row {
            grid-template-columns: 60px 1fr !important;
            grid-template-rows: auto auto !important;
            gap: 12px 20px !important;
          }
          .method-row > *:nth-child(2) { grid-column: 1 / -1; }
          .method-row > *:nth-child(3) { grid-column: 1 / -1; }
          .method-row > *:nth-child(4) { display: none !important; }
        }
      `}</style>
    </li>
  );
}

// ════════════════════════════════════════════════════════════════════
// ABOUT
// ════════════════════════════════════════════════════════════════════
function About() {
  return (
    <section id="sobre" className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="shell">
        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)',
          gap: 80, alignItems: 'center',
        }} className="about-grid">
          <FounderPortrait />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Eyebrow>sobre / fundador</Eyebrow>
            <h2 style={{ textWrap: 'balance' }}>
              tecnologia de quem está do seu lado<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
            <p style={{ maxWidth: 540 }}>
              a is.code nasceu com uma ideia simples: trazer pra pequenos e médios
              negócios o mesmo padrão de engenharia, design e estratégia que grandes
              marcas usam — sem o preço, e sem o jargão.
            </p>
            <p style={{ maxWidth: 540 }}>
              do briefing à operação, você fala direto com quem está construindo.
              <span style={{ color: 'var(--color-fg-primary)', fontWeight: 500 }}> sem intermediário, sem prazo elástico, sem caixa preta.</span>
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12,
              marginTop: 12,
            }}>
              {[
                { k: 'foco',        v: 'sites · e-commerce · automações' },
                { k: 'integrações', v: 'whatsapp · instagram · shopify · meta · pix' },
                { k: 'modelos',     v: 'projeto fechado ou retainer mensal' },
                { k: 'base',        v: 'itaporanga · sp · brasil' },
              ].map((row, i) => (
                <div key={i} style={{
                  paddingTop: 16, borderTop: '1px solid var(--color-border)',
                }}>
                  <div className="mono" style={{ fontSize: 10.5, marginBottom: 6 }}>{row.k}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--color-fg-primary)', lineHeight: 1.45 }}>{row.v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" href="https://wa.me/5515996823970?text=is.code"
                icon={Icon.whatsapp(14)}>conversar comigo</Button>
              <Button variant="outline" size="lg" href="#contato">enviar briefing</Button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 920px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

function FounderPortrait() {
  return (
    <div style={{ position: 'relative', aspectRatio: '4 / 5', maxWidth: 460, width: '100%' }}>
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 'var(--radius-2xl)', overflow: 'hidden',
        background: '#0A0A0A',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <img src="assets/founder.jpg" alt="fundador da is.code" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: 'center top',
          filter: 'grayscale(8%) contrast(1.02)',
        }} />
        {/* subtle bottom gradient for label */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 40%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute', left: 20, bottom: 20, right: 20,
          background: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 12, padding: 14,
          color: 'var(--color-white)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>fundador / is.code</span>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>quem desenha é quem entrega.</span>
          </div>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }} />
            disponível
          </span>
        </div>

        <span style={{
          position: 'absolute', top: 16, left: 16,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em',
        }}>retrato / 2026</span>
      </div>

      <div style={{
        position: 'absolute', top: 28, right: -16,
        background: 'var(--color-bg-paper)', border: '1px solid var(--color-border)',
        padding: '8px 14px', borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
        boxShadow: 'var(--shadow-sm)',
      }}>● aceitando 2 novos projetos</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// INSIGHTS / BLOG
// ════════════════════════════════════════════════════════════════════
const POSTS = [
  {
    date: '03 mar 2026',
    cat: 'e-commerce',
    title: 'checkout em 1 clique: o detalhe que dobra a sua conversão.',
    excerpt: 'estudos de caso mostram que reduzir 4 etapas para 1 no checkout muda completamente o resultado. veja como aplicar.',
    read: '5 min',
  },
  {
    date: '14 fev 2026',
    cat: 'sites',
    title: 'por que seu site bonito não vende — e como mudar isso.',
    excerpt: 'um site que não converte é só custo. três princípios de design e copy que separam vitrine de máquina de vendas.',
    read: '5 min',
  },
  {
    date: '02 fev 2026',
    cat: 'ia',
    title: 'quando faz sentido (e quando não) plugar ia no seu site.',
    excerpt: 'a ia não resolve tudo. explicamos em que estágio do negócio ela vira diferencial e quando ainda é cedo demais.',
    read: '4 min',
  },
];

function Insights() {
  return (
    <section id="insights" className="section divider-top">
      <div className="shell">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <div>
            <Eyebrow style={{ marginBottom: 20 }}>insights</Eyebrow>
            <h2 style={{ maxWidth: 720 }}>
              o que estamos aprendendo<br/>
              sobre ia, vendas e produto<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
          </div>
          <Button variant="outline" size="md" href="#" iconRight={Icon.arrowUpRight(14)}>todos os artigos</Button>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }} className="insights-grid">
          {POSTS.map((p, i) => <PostCard key={i} {...p} idx={i} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 920px) {
          .insights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function PostCard({ date, cat, title, excerpt, read, idx }) {
  const [hov, setHov] = useStateS2(false);
  return (
    <a href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)',
        overflow: 'hidden', background: 'var(--color-bg-paper)',
        transition: 'transform 220ms, box-shadow 220ms, border-color 220ms',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        borderColor: hov ? 'var(--color-border-strong)' : 'var(--color-border)',
      }}>
      <div style={{
        aspectRatio: '16 / 10', position: 'relative', overflow: 'hidden',
        background: ['#0A0A0A', '#1A1A1A', '#0A0A0A'][idx],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* abstract cover */}
        <PostCover idx={idx} />
        <span style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(255,255,255,0.95)', color: 'var(--color-black)',
          padding: '4px 10px', borderRadius: 'var(--radius-full)',
          fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em',
        }}>{cat}</span>
      </div>
      <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--color-fg-tertiary)' }}>
          {date} · {read} de leitura
        </div>
        <h4 style={{ fontSize: 19, lineHeight: 1.25, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--color-fg-primary)', textWrap: 'balance' }}>{title}</h4>
        <p style={{ fontSize: 13.5 }}>{excerpt}</p>
        <span style={{
          marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 500, color: 'var(--color-fg-primary)',
          transform: hov ? 'translateX(4px)' : 'none',
          transition: 'transform 200ms', paddingTop: 12,
        }}><span>ler artigo</span>{Icon.arrowUpRight(13)}</span>
      </div>
    </a>
  );
}

function PostCover({ idx }) {
  if (idx === 0) {
    return (
      <svg viewBox="0 0 320 200" style={{ width: '100%', height: '100%' }} aria-hidden>
        <text x="20" y="120" fontFamily="DM Sans" fontWeight="900" fontSize="120"
          fill="rgba(255,255,255,0.04)" letterSpacing="-6">ai</text>
        <g stroke="rgba(255,255,255,0.4)" fill="none" strokeWidth="1">
          <circle cx="220" cy="100" r="6"/>
          <circle cx="260" cy="60" r="6"/>
          <circle cx="260" cy="140" r="6"/>
          <circle cx="300" cy="100" r="6"/>
          <line x1="220" y1="100" x2="260" y2="60"/>
          <line x1="220" y1="100" x2="260" y2="140"/>
          <line x1="260" y1="60"  x2="300" y2="100"/>
          <line x1="260" y1="140" x2="300" y2="100"/>
        </g>
        <text x="20" y="180" fontFamily="DM Mono" fontSize="11" fill="rgba(255,255,255,0.45)" letterSpacing="2">// ia · e-commerce</text>
      </svg>
    );
  }
  if (idx === 1) {
    return (
      <svg viewBox="0 0 320 200" style={{ width: '100%', height: '100%' }} aria-hidden>
        <rect x="40" y="50" width="140" height="40" rx="20" fill="rgba(255,255,255,0.08)"/>
        <rect x="60" y="100" width="180" height="40" rx="20" fill="rgba(255,255,255,0.16)"/>
        <rect x="40" y="150" width="100" height="30" rx="15" fill="rgba(255,255,255,0.08)"/>
        <text x="20" y="40" fontFamily="DM Mono" fontSize="11" fill="rgba(255,255,255,0.45)" letterSpacing="2">// chat</text>
        <circle cx="260" cy="160" r="20" fill="none" stroke="rgba(255,255,255,0.35)"/>
        <path d="M252 160 L258 166 L268 154" stroke="rgba(255,255,255,0.8)" fill="none" strokeWidth="1.5"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 200" style={{ width: '100%', height: '100%' }} aria-hidden>
      <text x="160" y="120" fontFamily="DM Sans" fontWeight="900" fontSize="80"
        fill="rgba(255,255,255,0.06)" textAnchor="middle" letterSpacing="-4">+38%</text>
      <g stroke="rgba(255,255,255,0.45)" fill="none" strokeWidth="1.5">
        <path d="M20 170 L80 140 L130 150 L180 100 L240 80 L300 40"/>
        <circle cx="300" cy="40" r="4" fill="rgba(255,255,255,0.85)"/>
      </g>
      <text x="20" y="190" fontFamily="DM Mono" fontSize="11" fill="rgba(255,255,255,0.45)" letterSpacing="2">// conversão</text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════
// FAQ
// ════════════════════════════════════════════════════════════════════
const FAQ = [
  { q: 'em quanto tempo vejo resultado?',
    a: 'o primeiro agente entra em produção em ~4 semanas. ganhos de tempo de resposta e taxa de conversão aparecem nas primeiras 2 semanas após go-live; aumento de receita costuma estabilizar entre o segundo e o terceiro mês.' },
  { q: 'a ia substitui meu time de atendimento?',
    a: 'não. ela absorve a parte repetitiva — dúvidas frequentes, orçamentos, agendamentos, recuperação de carrinho — e libera seu time para vendas complexas, pós-venda e relacionamento.' },
  { q: 'minha empresa é pequena. faz sentido?',
    a: 'sim. nossos projetos começam em escala compatível com pequenos times. o roi costuma aparecer mais rápido em operações menores, justamente porque o gargalo é mais nítido.' },
  { q: 'vocês fazem manutenção depois do projeto?',
    a: 'fazemos. você pode operar sozinho ou nos contratar em retainer mensal — com painel, ajuste de fluxos e relatório de oportunidades.' },
  { q: 'preciso entender de tecnologia para tocar isso?',
    a: 'não. entregamos painel intuitivo onde você acompanha tudo em tempo real: atendimentos, conversões, gargalos e oportunidades. você no controle — sem precisar ser técnico.' },
];

function Faq() {
  const [open, setOpen] = useStateS2(0);
  return (
    <section className="section divider-top">
      <div className="shell faq-grid" style={{
        display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.4fr)',
        gap: 64,
      }}>
        <div>
          <Eyebrow style={{ marginBottom: 20 }}>perguntas</Eyebrow>
          <h2 style={{ textWrap: 'balance' }}>
            o que costumam<br/>perguntar antes<br/>de fechar<span style={{ color: 'var(--accent)' }}>.</span>
          </h2>
          <p style={{ maxWidth: 320, marginTop: 16 }}>
            não achou sua resposta? mande no whatsapp — respondemos como gente, em poucos minutos.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQ.map((item, i) => (
            <details key={i} open={open === i} onClick={(e) => { e.preventDefault(); setOpen(open === i ? -1 : i); }}
              style={{
                borderTop: '1px solid var(--color-border)',
                borderBottom: i === FAQ.length - 1 ? '1px solid var(--color-border)' : 'none',
                padding: '20px 4px',
              }}>
              <summary style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 16, cursor: 'pointer', listStyle: 'none',
                fontSize: 'clamp(18px, 1.6vw, 22px)', fontWeight: 500,
                letterSpacing: '-0.015em',
              }}>
                <span>{item.q}</span>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid var(--color-border-strong)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 220ms, background 220ms',
                  background: open === i ? 'var(--color-black)' : 'transparent',
                  color: open === i ? 'var(--color-white)' : 'var(--color-fg-primary)',
                  flexShrink: 0,
                }}>
                  {open === i ? Icon.minus(14) : Icon.plus(14)}
                </span>
              </summary>
              {open === i && (
                <div style={{ paddingTop: 14, paddingRight: 48, maxWidth: 720 }} className="fade-up">
                  <p>{item.a}</p>
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// CTA
// ════════════════════════════════════════════════════════════════════
function CtaBlock() {
  return (
    <section className="dark section" id="contato" style={{ position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05), transparent 55%)',
      }} />
      <div className="shell" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, maxWidth: 960 }}>
          <Pill variant="dark"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block', marginRight: 6 }} />resposta em até 1 dia útil</Pill>
          <h2 style={{
            color: 'var(--color-white)',
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0,
          }}>
            vamos<br/>
            <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>conversar</span>
            <span style={{ color: 'var(--accent, var(--color-white))' }}>.</span>
          </h2>
          <p style={{ maxWidth: 520, color: 'rgba(255,255,255,0.7)', fontSize: 17, fontWeight: 300 }}>
            conta o que está te travando hoje — gargalo de atendimento, site que não vende,
            carrinho abandonado. devolvemos um diagnóstico com 3 oportunidades concretas em 1 dia útil.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            <Button variant="inverse" size="xl" href="https://wa.me/5515996823970?text=is.code"
              icon={Icon.whatsapp(16)}>chamar no whatsapp</Button>
            <Button variant="outline-light" size="xl" href="mailto:contato@iscode.com.br"
              icon={Icon.mail(14)}>enviar e-mail</Button>
          </div>

          <div style={{
            marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
            width: '100%', maxWidth: 720, paddingTop: 32,
            borderTop: '1px solid var(--color-border-dark)',
          }} className="cta-footer-grid">
            <ContactCell icon={Icon.pin(16)} label="endereço" value="itaporanga · sp" />
            <ContactCell icon={Icon.phone(16)} label="contato" value="+55 15 99682·3970" />
            <ContactCell icon={Icon.mail(16)} label="email" value="contato@iscode.com.br" />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .cta-footer-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}

function ContactCell({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.18)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-white)',
      }}>{icon}</span>
      <span className="mono" style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
      <span style={{ color: 'var(--color-white)', fontSize: 15, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{
      background: 'var(--color-black)', color: 'var(--color-white)',
      borderTop: '1px solid var(--color-border-dark)',
      paddingTop: 48, paddingBottom: 32,
    }}>
      <div className="shell" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 40,
        }} className="footer-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <Logo dark={false} size={76} />
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13.5, lineHeight: 1.55 }}>
              a tecnologia que grandes empresas usam — agora ao alcance do seu negócio.
            </p>
          </div>
          <FooterCol title="navegação" items={[
            { l: 'home', h: '#top' },
            { l: 'serviços', h: '#servicos' },
            { l: 'método', h: '#metodo' },
            { l: 'sobre', h: '#sobre' },
            { l: 'insights', h: '#insights' },
          ]} />
          <FooterCol title="serviços" items={[
            { l: 'agentes de ia', h: '#servicos' },
            { l: 'sites & landing', h: '#servicos' },
            { l: 'e-commerce', h: '#servicos' },
            { l: 'ia para vendas', h: '#servicos' },
            { l: 'automações', h: '#servicos' },
          ]} />
          <FooterCol title="contato" items={[
            { l: 'whatsapp', h: 'https://wa.me/5515996823970?text=is.code' },
            { l: 'contato@iscode.com.br', h: 'mailto:contato@iscode.com.br' },
            { l: 'instagram', h: 'https://www.instagram.com/is.codes.ai/' },
            { l: 'facebook', h: 'https://www.facebook.com/profile.php?id=61565781597618' },
          ]} />
        </div>

        <div style={{
          paddingTop: 24, borderTop: '1px solid var(--color-border-dark)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 16, flexWrap: 'wrap',
        }}>
          <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
            © 2026 is.code · itaporanga · sp · brasil
          </span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="https://www.instagram.com/is.codes.ai/" target="_blank" rel="noopener" aria-label="instagram"
              style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {Icon.instagram(14)}
            </a>
            <a href="https://www.facebook.com/profile.php?id=61565781597618" target="_blank" rel="noopener" aria-label="facebook"
              style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {Icon.facebook(14)}
            </a>
            <a href="https://wa.me/5515996823970?text=is.code" target="_blank" rel="noopener" aria-label="whatsapp"
              style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {Icon.whatsapp(14)}
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{title}</span>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <li key={i}>
            <a href={it.h} target={it.h.startsWith('http') ? '_blank' : undefined} rel="noopener"
              style={{ fontSize: 13.5, color: 'var(--color-white)' }}>{it.l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// FLOATING WHATSAPP
// ════════════════════════════════════════════════════════════════════
function FloatingWhatsApp() {
  const [show, setShow] = useStateS2(false);
  useEffectS2(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a href="https://wa.me/5515996823970?text=is.code" target="_blank" rel="noopener"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 80,
        background: 'var(--color-black)', color: 'var(--color-white)',
        padding: '14px 18px', borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-lg)',
        display: 'inline-flex', alignItems: 'center', gap: 10,
        fontSize: 13, fontWeight: 500,
        transform: show ? 'translateY(0)' : 'translateY(80px)',
        opacity: show ? 1 : 0,
        transition: 'transform 280ms cubic-bezier(0.2,0.7,0.2,1), opacity 220ms',
        pointerEvents: show ? 'auto' : 'none',
      }}>
      {Icon.whatsapp(16)} <span>chamar no whatsapp</span>
    </a>
  );
}

Object.assign(window, { Method, About, Insights, Faq, CtaBlock, Footer, FloatingWhatsApp });
