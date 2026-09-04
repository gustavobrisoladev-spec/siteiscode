// is.code premium — app composition + tweaks
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "editorial",
  "accent": "#0A0A0A",
  "density": "cozy",
  "marqueePosition": "after-hero"
}/*EDITMODE-END*/;

// Map hex → soft alpha + readable foreground
function applyAccent(hex) {
  const root = document.documentElement;
  root.style.setProperty('--accent', hex);
  // soft = hex with low alpha
  const h = hex.replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h;
  const n = parseInt(x, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  root.style.setProperty('--accent-soft', `rgba(${r},${g},${b},0.14)`);
  // light vs dark: use luminance to pick a readable foreground
  const lum = r * 299 + g * 587 + b * 114;
  root.style.setProperty('--accent-fg', lum > 148000 ? '#0A0A0A' : '#FFFFFF');
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [loaded, setLoaded] = useStateA(false);

  useEffectA(() => {
    applyAccent(t.accent || '#0A0A0A');
    document.documentElement.setAttribute('data-density', t.density || 'cozy');
  }, [t.accent, t.density]);

  const Hero = t.hero === 'split' ? HeroSplit : HeroEditorial;

  return (
    <div>
      {!loaded && <SiteLoader onDone={() => setLoaded(true)} />}
      <TopNav />
      <Hero />

      {t.marqueePosition === 'after-hero' && <Marquee />}
      <StatsStrip />
      {t.marqueePosition === 'after-stats' && <Marquee />}

      <Services />
      <AiSpotlight />
      <Portfolio />
      <Method />
      <About />
      <Insights />
      <Faq />
      <CtaBlock />
      <Footer />
      <FloatingWhatsApp />

      <TweaksPanel title="tweaks">
        <TweakSection label="layout">
          <TweakRadio
            label="hero"
            value={t.hero}
            onChange={(v) => setTweak('hero', v)}
            options={[
              { value: 'editorial', label: 'editorial' },
              { value: 'split',     label: 'split + chat' },
            ]}
          />
          <TweakSelect
            label="marquee"
            value={t.marqueePosition}
            onChange={(v) => setTweak('marqueePosition', v)}
            options={[
              { value: 'after-hero',  label: 'depois do hero' },
              { value: 'after-stats', label: 'depois das stats' },
              { value: 'none',        label: 'sem marquee' },
            ]}
          />
          <TweakRadio
            label="densidade"
            value={t.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'cozy',    label: 'confortável' },
              { value: 'compact', label: 'compacto' },
            ]}
          />
        </TweakSection>

        <TweakSection label="acento">
          <TweakColor
            label="cor"
            value={t.accent}
            onChange={(v) => setTweak('accent', v)}
            options={['#0A0A0A', '#C8FF6B', '#5B6BFF', '#E65100', '#1F8A5B']}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
