// is.code — Portfolio · Sticky Pin + GSAP Premium
const { useEffect: useEffectPF, useRef: useRefPF, useState: useStatePF } = React;

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// ── DADOS ─────────────────────────────────────────────────────────
// 💡 Para adicionar print real do site: defina img com a URL da imagem
//    (ex: img: './assets/screenshot-fazenda.jpg')
//    A imagem vai rolar pra cima automaticamente no hover!
const PROJECTS = [
  {
    num:'01', client:'fazenda serra verde',
    tag:'e-commerce', service:'loja virtual + checkout otimizado',
    resultNum:'+142%', resultLabel:'receita em 60 dias',
    year:'2026', bg:'#0D1208', accent:'#C8FF6B', mockup:'ecommerce',
    img: './assets/screencapture-performandodigital-br-2026-05-21-15_43_39.png', // ← cole aqui a URL do print do site
    url: null, // ← URL do site para abrir ao clicar
  },
  {
    num:'02', client:'clínica integra saúde',
    tag:'site + ia', service:'site institucional + agente whatsapp',
    resultNum:'100%', resultLabel:'agendamentos automatizados',
    year:'2025', bg:'#080C18', accent:'#5B6BFF', mockup:'clinic',
    img: 'assets/screencapture-angelabarrosatelie-br-2026-05-21-15_38_13 1.svg',
    url: null,
  },
  {
    num:'03', client:'ateliê bella moda',
    tag:'landing page', service:'landing page + recuperação de carrinho',
    resultNum:'+38%', resultLabel:'taxa de conversão',
    year:'2025', bg:'#150A06', accent:'#FF6B35', mockup:'fashion',
    img: 'assets/screencapture-ateliebride-2026-05-21-15_43_01 1.svg',
    url: null,
  },
  {
    num:'04', client:'top obras construção',
    tag:'site + seo', service:'site institucional + seo técnico',
    resultNum:'3×', resultLabel:'leads qualificados / mês',
    year:'2025', bg:'#07101A', accent:'#38BDF8', mockup:'construction',
    img: 'assets/screencapture-imperatormenswear-au-2026-05-21-15_44_23 1.svg',
    url: null,
  },
  {
    num:'05', client:'pet shop amigo fiel',
    tag:'e-commerce + ia', service:'loja virtual + atendimento 24/7',
    resultNum:'0.9s', resultLabel:'carregamento · pagespeed 100',
    year:'2026', bg:'#071410', accent:'#4ADE80', mockup:'petshop',
    img: 'assets/screencapture-antonnie-br-2026-05-21-15_39_29 1.svg',
    url: null,
  },
];

// ── CANVAS PARTÍCULAS ─────────────────────────────────────────────
function ParticleBg() {
  const ref = useRefPF(null);
  useEffectPF(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, raf;
    const N = 55;
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const pts = Array.from({length:N}, () => ({
      x:Math.random()*(W||1400), y:Math.random()*(H||800),
      r:Math.random()*1.4+0.3,
      vx:(Math.random()-0.5)*0.2, vy:(Math.random()-0.5)*0.14,
      a:Math.random()*0.45+0.05,
    }));
    if (window.gsap) {
      pts.forEach(p => gsap.to(p,{
        a:Math.random()*0.5+0.04, duration:2.5+Math.random()*3,
        repeat:-1, yoyo:true, ease:'sine.inOut', delay:Math.random()*2,
      }));
    }
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      for (let i=0;i<N;i++) {
        const pi=pts[i]; pi.x+=pi.vx; pi.y+=pi.vy;
        if(pi.x<0)pi.x=W; if(pi.x>W)pi.x=0;
        if(pi.y<0)pi.y=H; if(pi.y>H)pi.y=0;
        for (let j=i+1;j<N;j++) {
          const pj=pts[j],dx=pi.x-pj.x,dy=pi.y-pj.y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<130){
            ctx.beginPath();ctx.moveTo(pi.x,pi.y);ctx.lineTo(pj.x,pj.y);
            ctx.strokeStyle=`rgba(255,255,255,${(1-d/130)*0.038})`;
            ctx.lineWidth=0.6;ctx.stroke();
          }
        }
        ctx.beginPath();ctx.arc(pi.x,pi.y,pi.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${pi.a})`;ctx.fill();
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize',resize);
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);if(window.gsap)gsap.killTweensOf(pts);};
  },[]);
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',display:'block'}}/>;
}

// ── MOCKUPS ───────────────────────────────────────────────────────
function Mockup({type,accent:C='#C8FF6B'}) {
  if (type==='ecommerce') return (
    <svg viewBox="0 0 380 480" style={{width:'100%',height:'100%',display:'block'}} aria-hidden>
      <rect width="380" height="480" rx="14" fill="#0F0F0F"/>
      <rect x="0" y="0" width="380" height="42" rx="14" fill="#161616"/>
      <rect x="0" y="28" width="380" height="14" fill="#161616"/>
      <circle cx="18" cy="21" r="5" fill="#2a2a2a"/><circle cx="32" cy="21" r="5" fill="#2a2a2a"/><circle cx="46" cy="21" r="5" fill="#2a2a2a"/>
      <rect x="62" y="13" width="200" height="16" rx="5" fill="#1e1e1e"/>
      <rect x="334" y="13" width="32" height="16" rx="5" fill="#222"/>
      {[0,1,2].map(i=>(
        <g key={i}>
          <rect x={12+i*120} y="56" width="108" height="130" rx="8" fill="#171717"/>
          <rect x={12+i*120+8} y="168" width={[70,55,65][i]} height="8" rx="4" fill="#252525"/>
          <rect x={12+i*120+8} y="180" width="45" height="6" rx="3" fill={C} opacity="0.7"/>
        </g>
      ))}
      <rect x="12" y="200" width="356" height="1" fill="#1e1e1e"/>
      <rect x="12" y="210" width="140" height="10" rx="4" fill="#1e1e1e"/>
      <rect x="12" y="228" width="356" height="110" rx="8" fill="#141414"/>
      <rect x="24" y="240" width="80" height="80" rx="6" fill="#1c1c1c"/>
      <rect x="116" y="248" width="160" height="10" rx="4" fill="#222"/>
      <rect x="116" y="264" width="120" height="8" rx="4" fill="#1a1a1a"/>
      <rect x="116" y="280" width="60" height="8" rx="3" fill={C} opacity="0.8"/>
      <rect x="296" y="256" width="60" height="28" rx="14" fill={C}/>
      <rect x="12" y="354" width="356" height="56" rx="10" fill={C}/>
      <text x="190" y="388" textAnchor="middle" fontFamily="DM Sans" fontSize="14" fontWeight="800" fill="#0A0A0A">finalizar compra</text>
      <rect x="12" y="420" width="108" height="26" rx="6" fill="#161616"/>
      <rect x="128" y="420" width="108" height="26" rx="6" fill="#161616"/>
      <rect x="244" y="420" width="124" height="26" rx="6" fill="#161616"/>
      <text x="66" y="437" textAnchor="middle" fontFamily="DM Mono" fontSize="9" fill="#555">pix</text>
      <text x="182" y="437" textAnchor="middle" fontFamily="DM Mono" fontSize="9" fill="#555">cartão</text>
      <text x="306" y="437" textAnchor="middle" fontFamily="DM Mono" fontSize="9" fill="#555">boleto</text>
      <rect x="290" y="58" width="78" height="20" rx="10" fill="#1a1a1a"/>
      <circle cx="303" cy="68" r="4" fill={C} opacity="0.8"/>
      <text x="320" y="72" fontFamily="DM Mono" fontSize="9" fill="#888">0.9s · 100</text>
    </svg>
  );
  if (type==='clinic') return (
    <svg viewBox="0 0 380 480" style={{width:'100%',height:'100%',display:'block'}} aria-hidden>
      <rect width="380" height="480" rx="14" fill="#080D18"/>
      <rect x="0" y="0" width="380" height="60" rx="14" fill="#0D1220"/>
      <rect x="0" y="46" width="380" height="14" fill="#0D1220"/>
      <text x="20" y="36" fontFamily="DM Sans" fontWeight="900" fontSize="17" fill="#fff" letterSpacing="-0.5">clínica integra</text>
      <rect x="288" y="16" width="76" height="28" rx="14" fill={C}/>
      <text x="326" y="34" textAnchor="middle" fontFamily="DM Sans" fontSize="11" fontWeight="700" fill="#0A0A0A">agendar</text>
      <rect x="14" y="72" width="260" height="56" rx="12" fill="#111B2E"/>
      <rect x="14" y="72" width="4" height="56" rx="2" fill={C}/>
      <text x="26" y="96" fontFamily="DM Sans" fontWeight="600" fontSize="13" fill="#fff">olá! em que posso ajudar?</text>
      <text x="26" y="114" fontFamily="DM Mono" fontSize="9" fill="rgba(255,255,255,0.35)">agente is.code · online</text>
      <rect x="106" y="138" width="260" height="40" rx="12" fill="#151D2E"/>
      <text x="120" y="154" fontFamily="DM Sans" fontSize="12" fill="rgba(255,255,255,0.75)">quero agendar pra segunda</text>
      {[['seg 09:00','dra. ana lima','dermatologia'],['seg 10:30','dr. marcos','clínico geral'],['seg 14:00','dra. carla','nutrição']].map(([time,dr,spec],i)=>(
        <g key={i}>
          <rect x="14" y={192+i*76} width="352" height="64" rx="10" fill="#0E1828"/>
          <rect x="14" y={192+i*76} width="4" height="64" rx="2" fill={C} opacity={i===0?1:0.35}/>
          <text x="28" y={213+i*76} fontFamily="DM Mono" fontSize="10" fill={C} opacity={i===0?0.9:0.4}>{time}</text>
          <text x="28" y={228+i*76} fontFamily="DM Sans" fontWeight="600" fontSize="13" fill="#EEE">{dr}</text>
          <text x="28" y={244+i*76} fontFamily="DM Mono" fontSize="9" fill="rgba(255,255,255,0.35)">{spec}</text>
          {i===0 && <rect x="308" y={208+i*76} width="46" height="24" rx="12" fill={C}/>}
          {i===0 && <text x="331" y={224+i*76} textAnchor="middle" fontFamily="DM Sans" fontSize="10" fontWeight="700" fill="#0A0A0A">ok</text>}
        </g>
      ))}
      <rect x="14" y="428" width="352" height="38" rx="10" fill={C}/>
      <text x="190" y="452" textAnchor="middle" fontFamily="DM Sans" fontSize="13" fontWeight="800" fill="#0A0A0A">confirmar agendamento</text>
    </svg>
  );
  if (type==='fashion') return (
    <svg viewBox="0 0 380 480" style={{width:'100%',height:'100%',display:'block'}} aria-hidden>
      <defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1A0C06"/><stop offset="100%" stopColor="#0A0603"/></linearGradient></defs>
      <rect width="380" height="480" rx="14" fill="url(#fg)"/>
      <rect x="0" y="0" width="380" height="260" rx="14" fill="#140A04"/>
      <rect x="0" y="246" width="380" height="14" fill="#140A04"/>
      <ellipse cx="190" cy="130" rx="80" ry="100" fill={C} opacity="0.06"/>
      <path d="M130 50 L190 30 L250 50 L270 180 L240 250 L140 250 L110 180 Z" fill={C} opacity="0.07"/>
      <text x="190" y="160" textAnchor="middle" fontFamily="DM Sans" fontWeight="900" fontSize="52" fill={C} opacity="0.07" letterSpacing="-2">BELLA</text>
      <text x="190" y="240" textAnchor="middle" fontFamily="DM Mono" fontSize="9" fill={C} opacity="0.5" letterSpacing="5">ATELIÊ · 2025</text>
      <rect x="14" y="14" width="72" height="22" rx="11" fill="rgba(0,0,0,0.5)"/>
      <text x="50" y="29" textAnchor="middle" fontFamily="DM Mono" fontSize="9" fill="rgba(255,255,255,0.7)" letterSpacing="2">NOVO</text>
      <text x="20" y="290" fontFamily="DM Sans" fontWeight="700" fontSize="20" fill="#fff" letterSpacing="-0.8">vestido linho verão</text>
      <text x="20" y="314" fontFamily="DM Sans" fontSize="22" fontWeight="900" fill={C} letterSpacing="-0.5">r$ 489</text>
      <text x="110" y="314" fontFamily="DM Mono" fontSize="10" fill="rgba(255,255,255,0.35)">12× sem juros</text>
      {['#E8D5C0','#2E2822','#C8A882','#1A1512'].map((col,i)=>(
        <circle key={i} cx={20+i*26} cy="334" r="9" fill={col} stroke={i===0?C:'none'} strokeWidth="2"/>
      ))}
      {['PP','P','M','G','GG'].map((s,i)=>(
        <g key={i}>
          <rect x={20+i*64} y="354" width="52" height="28" rx="8" fill={i===2?C:'#1a1a1a'} stroke={i===2?'none':'#2a2a2a'} strokeWidth="1"/>
          <text x={46+i*64} y="372" textAnchor="middle" fontFamily="DM Mono" fontSize="11" fill={i===2?'#0a0a0a':'#555'}>{s}</text>
        </g>
      ))}
      <rect x="20" y="396" width="340" height="6" rx="3" fill="#1a1a1a"/>
      <rect x="20" y="396" width="220" height="6" rx="3" fill={C} opacity="0.7"/>
      <text x="20" y="416" fontFamily="DM Mono" fontSize="9" fill="rgba(255,255,255,0.35)">apenas 8 unidades disponíveis</text>
      <rect x="20" y="430" width="340" height="38" rx="10" fill={C}/>
      <text x="190" y="454" textAnchor="middle" fontFamily="DM Sans" fontSize="14" fontWeight="800" fill="#0A0A0A">adicionar ao carrinho</text>
    </svg>
  );
  if (type==='construction') return (
    <svg viewBox="0 0 380 480" style={{width:'100%',height:'100%',display:'block'}} aria-hidden>
      <defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#071018"/><stop offset="100%" stopColor="#030810"/></linearGradient></defs>
      <rect width="380" height="480" rx="14" fill="url(#cg)"/>
      {[0,1,2,3,4].map(i=><line key={i} x1={i*96} y1="0" x2={i*96} y2="480" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>)}
      <rect x="0" y="0" width="380" height="170" rx="14" fill="#0A1520"/>
      <rect x="0" y="156" width="380" height="14" fill="#0A1520"/>
      <text x="20" y="54" fontFamily="DM Sans" fontWeight="900" fontSize="28" fill="#fff" letterSpacing="-1.5">top obras</text>
      <text x="20" y="76" fontFamily="DM Mono" fontSize="10" fill="rgba(255,255,255,0.35)" letterSpacing="3">ENGENHARIA · SP</text>
      <rect x="20" y="96" width="110" height="32" rx="16" fill={C}/>
      <text x="75" y="117" textAnchor="middle" fontFamily="DM Sans" fontSize="12" fontWeight="700" fill="#0A0A0A">falar agora</text>
      {[{v:'47',l:'obras entregues',x:14,hi:false},{v:'3×',l:'mais leads/mês',x:202,hi:true}].map(({v,l,x,hi})=>(
        <g key={x}>
          <rect x={x} y="182" width="172" height="78" rx="10" fill="#0D1828"/>
          <text x={x+16} y="220" fontFamily="DM Sans" fontWeight="900" fontSize="30" fill={hi?C:'#fff'} letterSpacing="-1">{v}</text>
          <text x={x+16} y="246" fontFamily="DM Mono" fontSize="9" fill="rgba(255,255,255,0.35)">{l.toUpperCase()}</text>
        </g>
      ))}
      {[['residencial vila nova','condomínio · 24 unid.','entregue'],['comercial park center','salas · 8 andares','em obra'],['industrial frigor sul','galpão 4.200m²','entregue']].map(([title,sub,status],i)=>(
        <g key={i}>
          <rect x="14" y={276+i*62} width="352" height="52" rx="8" fill="#0A1624"/>
          <rect x="14" y={276+i*62} width="4" height="52" rx="2" fill={C} opacity={status==='entregue'?0.9:0.4}/>
          <text x="28" y={296+i*62} fontFamily="DM Sans" fontWeight="600" fontSize="13" fill="#EEE">{title}</text>
          <text x="28" y={312+i*62} fontFamily="DM Mono" fontSize="9" fill="rgba(255,255,255,0.35)">{sub}</text>
          <rect x="295" y={286+i*62} width="62" height="20" rx="10" fill={status==='entregue'?C+'22':'#1a2233'}/>
          <text x="326" y={299+i*62} textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill={status==='entregue'?C:'rgba(255,255,255,0.4)'}>{status}</text>
        </g>
      ))}
    </svg>
  );
  return (
    <svg viewBox="0 0 380 480" style={{width:'100%',height:'100%',display:'block'}} aria-hidden>
      <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#071410"/><stop offset="100%" stopColor="#040C08"/></linearGradient></defs>
      <rect width="380" height="480" rx="14" fill="url(#pg)"/>
      <rect x="0" y="0" width="380" height="60" rx="14" fill="#0B1A10"/>
      <rect x="0" y="46" width="380" height="14" fill="#0B1A10"/>
      <circle cx="30" cy="30" r="16" fill={C} opacity="0.15"/>
      <text x="30" y="35" textAnchor="middle" fontFamily="DM Sans" fontSize="16">🐾</text>
      <text x="56" y="27" fontFamily="DM Sans" fontWeight="900" fontSize="16" fill="#fff">amigo fiel</text>
      <text x="56" y="42" fontFamily="DM Mono" fontSize="8" fill="rgba(255,255,255,0.35)" letterSpacing="3">PET SHOP</text>
      <rect x="298" y="16" width="68" height="28" rx="14" fill={C}/>
      <text x="332" y="34" textAnchor="middle" fontFamily="DM Sans" fontSize="11" fontWeight="700" fill="#0A0A0A">carrinho</text>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <rect x={14+(i%2)*188} y={72+Math.floor(i/2)*150} width="176" height="138" rx="10" fill="#0F1E15"/>
          <rect x={14+(i%2)*188+10} y={72+Math.floor(i/2)*150+10} width="156" height="90" rx="6" fill={['#122010','#0D1A14','#162512','#0F1C12'][i]}/>
          <text x={14+(i%2)*188+88} y={72+Math.floor(i/2)*150+60} textAnchor="middle" fontSize="28">{['🐕','🐈','🦮','🐠'][i]}</text>
          <text x={14+(i%2)*188+10} y={72+Math.floor(i/2)*150+115} fontFamily="DM Sans" fontSize="11" fontWeight="600" fill="#ccc">{['ração premium','areia cristal','coleira refl.','aquário kit'][i]}</text>
          <text x={14+(i%2)*188+10} y={72+Math.floor(i/2)*150+129} fontFamily="DM Mono" fontSize="10" fill={C}>{['r$ 89','r$ 45','r$ 67','r$ 129'][i]}</text>
        </g>
      ))}
      <rect x="14" y="378" width="352" height="48" rx="10" fill="#0B1A10"/>
      <circle cx="34" cy="402" r="10" fill={C} opacity="0.2"/>
      <circle cx="34" cy="402" r="5" fill={C} opacity="0.8"/>
      <text x="52" y="397" fontFamily="DM Mono" fontSize="9" fill={C}>0.9s de carregamento</text>
      <text x="52" y="413" fontFamily="DM Mono" fontSize="9" fill="rgba(255,255,255,0.35)">pagespeed 100 · site is.code</text>
      <rect x="14" y="438" width="352" height="30" rx="10" fill="#0D2018"/>
      <circle cx="30" cy="453" r="8" fill={C} opacity="0.25"/>
      <text x="30" y="457" textAnchor="middle" fontFamily="DM Sans" fontSize="10">🤖</text>
      <text x="46" y="449" fontFamily="DM Sans" fontSize="11" fill="rgba(255,255,255,0.6)">atendimento automático 24/7</text>
      <text x="46" y="462" fontFamily="DM Mono" fontSize="8" fill={C} opacity="0.7">● online agora</text>
    </svg>
  );
}

// ── PORTFOLIO ─────────────────────────────────────────────────────
function Portfolio() {
  const wrapRef   = useRefPF(null);
  const trackRef  = useRefPF(null);
  const [active, setActive]     = useStatePF(0);
  const [progress, setProgress] = useStatePF(0);
  const cur = useRefPF(0);
  const tgt = useRefPF(0);
  const raf = useRefPF(null);

  useEffectPF(() => {
    const wrap  = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const lerp  = (a,b,t) => a+(b-a)*t;
    const clamp = (v,mn,mx) => Math.min(Math.max(v,mn),mx);
    const maxSc = () => Math.max(0, track.scrollWidth - wrap.offsetWidth + 56);
    const cardW = () => (track.children[0]?.offsetWidth||440) + 28;

    const tick = () => {
      cur.current = lerp(cur.current, tgt.current, 0.1);
      if (Math.abs(cur.current - tgt.current) > 0.2) {
        track.style.transform = `translateX(${-cur.current}px)`;
      }
      const idx = Math.round(cur.current / cardW());
      setActive(clamp(idx,0,PROJECTS.length-1));
      const mx = maxSc();
      setProgress(mx>0 ? clamp(cur.current/mx,0,1) : 0);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onWheel = (e) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.top > 80 || rect.bottom < window.innerHeight*0.4) return;
      const atS = tgt.current<=0 && e.deltaY<0;
      const atE = tgt.current>=maxSc() && e.deltaY>0;
      if (atS||atE) return;
      e.preventDefault();
      tgt.current = clamp(tgt.current + e.deltaY*1.9, 0, maxSc());
    };

    let tx=0;
    const onTS = (e) => { tx=e.touches[0].clientX; };
    const onTM = (e) => {
      const dx=(tx-e.touches[0].clientX)*2.2;
      tgt.current=clamp(tgt.current+dx,0,maxSc());
      tx=e.touches[0].clientX;
    };

    const onKey = (e) => {
      const rect=wrap.getBoundingClientRect();
      if(rect.top>0||rect.bottom<100) return;
      if(e.key==='ArrowRight'){e.preventDefault();tgt.current=clamp(tgt.current+cardW(),0,maxSc());}
      if(e.key==='ArrowLeft'){e.preventDefault();tgt.current=clamp(tgt.current-cardW(),0,maxSc());}
    };

    window.addEventListener('wheel', onWheel, {passive:false});
    window.addEventListener('keydown', onKey);
    wrap.addEventListener('touchstart',onTS,{passive:true});
    wrap.addEventListener('touchmove',onTM,{passive:true});
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('wheel',onWheel);
      window.removeEventListener('keydown',onKey);
      wrap.removeEventListener('touchstart',onTS);
      wrap.removeEventListener('touchmove',onTM);
    };
  },[]);

  // GSAP card entrance
  useEffectPF(() => {
    if (!window.gsap||!window.ScrollTrigger) return;
    const cards = document.querySelectorAll('.pf-card');
    cards.forEach((card,i) => {
      gsap.set(card,{opacity:0,y:48});
      ScrollTrigger.create({
        trigger:'#portfolio', start:'top 72%',
        onEnter:() => gsap.to(card,{opacity:1,y:0,duration:0.65,delay:i*0.09,ease:'power3.out'}),
        once:true,
      });
    });
    return () => ScrollTrigger.getAll().forEach(t=>t.kill());
  },[]);

  const goTo = (i) => {
    const track=trackRef.current,wrap=wrapRef.current;
    if(!track||!wrap) return;
    const cw=(track.children[0]?.offsetWidth||440)+28;
    const mx=Math.max(0,track.scrollWidth-wrap.offsetWidth+56);
    tgt.current=Math.min(i*cw,mx);
  };

  return (
    <section id="portfolio" style={{position:'relative',background:'#080808',overflow:'hidden'}}>
      <ParticleBg/>
      <div aria-hidden style={{
        position:'absolute',inset:0,pointerEvents:'none',
        background:'radial-gradient(ellipse 80% 55% at 28% 40%, rgba(255,255,255,0.016), transparent 65%)',
      }}/>

      {/* HEADER */}
      <div className="shell" style={{position:'relative',zIndex:2,paddingTop:'clamp(72px,11vh,140px)',paddingBottom:36}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
          <div>
            <Eyebrow dark style={{marginBottom:18}}>portfólio selecionado</Eyebrow>
            <h2 style={{
              color:'#fff',fontSize:'clamp(28px,4vw,56px)',
              fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.02,marginTop:12,
            }}>
              projetos que<br/>
              <span style={{fontWeight:300,fontStyle:'italic',color:'rgba(255,255,255,0.36)'}}>geram resultado</span>
              <span style={{color:'var(--accent,#C8FF6B)'}}>.</span>
            </h2>
          </div>
          {/* dot nav */}
          <div style={{display:'flex',alignItems:'center',gap:8,paddingBottom:6}}>
            {PROJECTS.map((_,i)=>(
              <button key={i} onClick={()=>goTo(i)} style={{
                width:i===active?30:8, height:8, borderRadius:999,
                background:i===active?'#fff':'rgba(255,255,255,0.18)',
                border:'none',cursor:'pointer',padding:0,
                transition:'all 380ms cubic-bezier(0.2,0.7,0.2,1)',
              }}/>
            ))}
          </div>
        </div>
        <div style={{
          marginTop:22,display:'flex',alignItems:'center',gap:10,
          fontFamily:'var(--font-mono)',fontSize:11,
          color:'rgba(255,255,255,0.26)',letterSpacing:'0.12em',textTransform:'uppercase',
        }}>
          <svg width="30" height="13" viewBox="0 0 30 13" fill="none" aria-hidden>
            <path d="M0 6.5h24M18 1l6 5.5-6 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          role para explorar
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{
        position:'relative',zIndex:2,
        margin:'0 var(--page-gutter)',
        height:2,background:'rgba(255,255,255,0.06)',borderRadius:999,marginBottom:28,
      }}>
        <div style={{
          height:'100%',borderRadius:999,
          background:'rgba(255,255,255,0.4)',
          width:`${progress*100}%`,
          transition:'width 50ms linear',
        }}/>
      </div>

      {/* TRACK */}
      <div ref={wrapRef} style={{position:'relative',zIndex:2,overflow:'hidden',paddingBottom:'clamp(56px,8vh,110px)'}}>
        <div ref={trackRef} style={{
          display:'flex',gap:28,
          paddingLeft:'var(--page-gutter)',paddingRight:'var(--page-gutter)',
          willChange:'transform',userSelect:'none',
        }}>
          {PROJECTS.map((p,i)=><PfCard key={p.num} p={p} i={i} active={active}/>)}
        </div>
      </div>

      {/* FOOTER */}
      <div className="shell" style={{
        position:'relative',zIndex:2,
        paddingBottom:'clamp(48px,7vh,96px)',
        display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16,
      }}>
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.1em',color:'rgba(255,255,255,0.22)',textTransform:'uppercase'}}>
          {String(active+1).padStart(2,'0')} / {String(PROJECTS.length).padStart(2,'0')} · {PROJECTS[active].client}
        </span>
        <Button variant="outline-light" size="md" href="https://wa.me/5515996823970?text=is.code" iconRight={Icon.arrowUpRight(13)}>
          quero um projeto assim
        </Button>
      </div>
    </section>
  );
}

// ── CARD ─────────────────────────────────────────────────────────
function PfCard({p,i,active}) {
  const [hov,setHov] = useStatePF(false);
  const isActive = i===active;
  return (
    <div
      className="pf-card"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        flexShrink:0,
        width:'clamp(310px,34vw,490px)',
        borderRadius:18,
        border:`1px solid ${hov?'rgba(255,255,255,0.15)':isActive?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.04)'}`,
        background:p.bg,
        overflow:'hidden',
        display:'flex',flexDirection:'column',
        transition:'border-color 280ms,transform 320ms cubic-bezier(0.2,0.7,0.2,1),box-shadow 320ms',
        transform:hov?'translateY(-8px)':isActive?'translateY(-3px)':'translateY(0)',
        boxShadow:hov
          ?`0 40px 80px rgba(0,0,0,0.55),0 0 0 1px ${p.accent}1A,0 0 50px ${p.accent}0D`
          :isActive?'0 20px 40px rgba(0,0,0,0.4)':'0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      {/* accent top line */}
      <div style={{
        height:2,
        background:`linear-gradient(to right,transparent,${p.accent} 35%,${p.accent}88 65%,transparent)`,
        opacity:hov?1:isActive?0.7:0.25,
        transition:'opacity 280ms',
      }}/>

      {/* mockup / screenshot */}
      {p.img ? (
        <div className="pf-img-wrap">
          <img src={p.img} alt={p.client} loading="lazy" />
          <div aria-hidden style={{
            position:'absolute',bottom:0,left:0,right:0,height:56,
            background:`linear-gradient(to top,${p.bg},transparent)`,
            pointerEvents:'none', zIndex:1,
          }}/>
          <div style={{
            position:'absolute',top:11,left:11,zIndex:2,
            background:'rgba(0,0,0,0.58)',backdropFilter:'blur(8px)',
            border:'1px solid rgba(255,255,255,0.1)',
            padding:'4px 10px',borderRadius:999,
            fontFamily:'var(--font-mono)',fontSize:9,
            letterSpacing:'0.08em',color:'rgba(255,255,255,0.72)',textTransform:'uppercase',
          }}>{p.tag}</div>
          <div style={{
            position:'absolute',top:11,right:11,zIndex:2,
            fontFamily:'var(--font-mono)',fontSize:9,
            color:'rgba(255,255,255,0.28)',letterSpacing:'0.06em',
          }}>{p.year}</div>
        </div>
      ) : (
        <div className="pf-mockup-wrap">
          <div className="pf-mockup-inner"><Mockup type={p.mockup} accent={p.accent}/></div>
          <div aria-hidden style={{
            position:'absolute',bottom:0,left:0,right:0,height:56,
            background:`linear-gradient(to top,${p.bg},transparent)`,
            pointerEvents:'none', zIndex:1,
          }}/>
          <div style={{
            position:'absolute',top:11,left:11,zIndex:2,
            background:'rgba(0,0,0,0.58)',backdropFilter:'blur(8px)',
            border:'1px solid rgba(255,255,255,0.1)',
            padding:'4px 10px',borderRadius:999,
            fontFamily:'var(--font-mono)',fontSize:9,
            letterSpacing:'0.08em',color:'rgba(255,255,255,0.72)',textTransform:'uppercase',
          }}>{p.tag}</div>
          <div style={{
            position:'absolute',top:11,right:11,zIndex:2,
            fontFamily:'var(--font-mono)',fontSize:9,
            color:'rgba(255,255,255,0.28)',letterSpacing:'0.06em',
          }}>{p.year}</div>
        </div>
      )}

      {/* body */}
      <div style={{padding:'20px 20px 18px',display:'flex',flexDirection:'column',gap:13,flex:1}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
          <div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'rgba(255,255,255,0.28)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:5}}>cliente</div>
            <div style={{fontSize:'clamp(14px,1.4vw,17px)',fontWeight:700,color:'#fff',letterSpacing:'-0.02em',lineHeight:1.2}}>{p.client}</div>
          </div>
          <span style={{fontFamily:'var(--font-mono)',fontSize:9.5,color:'rgba(255,255,255,0.18)',letterSpacing:'0.04em',flexShrink:0,paddingTop:2}}>
            {p.num}/{String(PROJECTS.length).padStart(2,'0')}
          </span>
        </div>

        <div style={{height:1,background:'rgba(255,255,255,0.05)'}}/>
        <div style={{fontSize:12.5,color:'rgba(255,255,255,0.4)',lineHeight:1.45}}>{p.service}</div>

        {/* result */}
        <div style={{
          marginTop:'auto',padding:'13px 15px',
          background:`${p.accent}0D`,border:`1px solid ${p.accent}20`,borderRadius:12,
          display:'flex',alignItems:'center',gap:14,
        }}>
          <div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:8.5,color:`${p.accent}80`,letterSpacing:'0.14em',textTransform:'uppercase',marginBottom:3}}>resultado</div>
            <div style={{fontSize:'clamp(22px,2.4vw,32px)',fontWeight:900,color:p.accent,letterSpacing:'-0.03em',lineHeight:1}}>{p.resultNum}</div>
          </div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:9.5,color:'rgba(255,255,255,0.36)',lineHeight:1.4,flex:1}}>{p.resultLabel}</div>
        </div>

        {/* cta */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
          <a href="https://wa.me/5515996823970?text=is.code" target="_blank" rel="noopener"
            style={{
              display:'inline-flex',alignItems:'center',gap:6,fontSize:12,fontWeight:500,
              color:hov?'rgba(255,255,255,0.8)':'rgba(255,255,255,0.28)',
              transition:'color 240ms',textDecoration:'none',
            }}>
            <span>quero um projeto assim</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 17 17 7M8 7h9v9"/></svg>
          </a>
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener"
              style={{
                display:'inline-flex',alignItems:'center',gap:5,fontSize:11,fontWeight:500,
                color:hov?p.accent:'rgba(255,255,255,0.2)',
                transition:'color 240ms',textDecoration:'none',flexShrink:0,
              }}>
              <span>ver site</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {Portfolio});
